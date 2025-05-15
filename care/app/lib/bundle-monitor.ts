/**
 * Bundle Size Monitoring and Analysis
 * 
 * Provides comprehensive bundle analysis, monitoring, and CI/CD integration
 * for tracking bundle size over time and preventing regressions.
 */

import { BundleAnalyzerPlugin } from 'webpack-bundle-analyzer';
import { existsSync, readFileSync, writeFileSync } from 'fs';
import { join } from 'path';

// Bundle size thresholds (in bytes)
export const BUNDLE_SIZE_BUDGETS = {
  // JavaScript bundles
  jsMain: 300 * 1024,      // 300KB main bundle
  jsVendor: 200 * 1024,    // 200KB vendor bundle
  jsChunks: 150 * 1024,    // 150KB per chunk
  jsTotalMax: 800 * 1024,  // 800KB total JS
  
  // CSS bundles
  cssMain: 50 * 1024,      // 50KB main CSS
  cssTotal: 100 * 1024,    // 100KB total CSS
  
  // Assets
  imagesTotal: 2 * 1024 * 1024,  // 2MB total images
  fontsTotal: 500 * 1024,        // 500KB total fonts
  
  // Overall bundle
  totalSize: 1.5 * 1024 * 1024,  // 1.5MB total bundle
  
  // Gzipped sizes (more realistic for network transfer)
  gzippedTotal: 500 * 1024,      // 500KB gzipped total
};

interface BundleAsset {
  name: string;
  size: number;
  type: 'js' | 'css' | 'image' | 'font' | 'other';
  gzipSize?: number;
  chunks?: string[];
}

interface BundleAnalysis {
  assets: BundleAsset[];
  chunks: Record<string, {
    size: number;
    assets: string[];
    modules: string[];
  }>;
  totalSize: number;
  totalGzipSize: number;
  breakdown: {
    js: number;
    css: number;
    images: number;
    fonts: number;
    other: number;
  };
  budgetStatus: {
    asset: string;
    budget: number;
    actual: number;
    status: 'pass' | 'warn' | 'fail';
    percentage: number;
  }[];
  timestamp: number;
  commit?: string;
  branch?: string;
}

interface BundleHistory {
  builds: BundleAnalysis[];
  trends: {
    totalSize: { timestamp: number; size: number }[];
    jsSize: { timestamp: number; size: number }[];
    cssSize: { timestamp: number; size: number }[];
  };
}

/**
 * Bundle Size Monitor Class
 */
export class BundleSizeMonitor {
  private buildDir: string;
  private outputDir: string;
  private historyFile: string;

  constructor(buildDir = 'dist', outputDir = 'bundle-analysis') {
    this.buildDir = buildDir;
    this.outputDir = outputDir;
    this.historyFile = join(outputDir, 'bundle-history.json');
    
    // Create output directory if it doesn't exist
    if (!existsSync(outputDir)) {
      require('fs').mkdirSync(outputDir, { recursive: true });
    }
  }

  /**
   * Analyze current bundle
   */
  async analyzeBundles(): Promise<BundleAnalysis> {
    const assets = await this.scanBuildAssets();
    const chunks = await this.analyzeChunks();
    const breakdown = this.calculateBreakdown(assets);
    const budgetStatus = this.checkBudgets(assets, breakdown);
    
    const analysis: BundleAnalysis = {
      assets,
      chunks,
      totalSize: breakdown.js + breakdown.css + breakdown.images + breakdown.fonts + breakdown.other,
      totalGzipSize: assets.reduce((sum, asset) => sum + (asset.gzipSize || 0), 0),
      breakdown,
      budgetStatus,
      timestamp: Date.now(),
      commit: await this.getGitCommit(),
      branch: await this.getGitBranch(),
    };

    // Update history
    await this.updateHistory(analysis);
    
    // Generate reports
    await this.generateReports(analysis);
    
    return analysis;
  }

  /**
   * Scan build directory for assets
   */
  private async scanBuildAssets(): Promise<BundleAsset[]> {
    const assets: BundleAsset[] = [];
    
    if (!existsSync(this.buildDir)) {
      throw new Error(`Build directory ${this.buildDir} not found`);
    }

    const scanDirectory = (dir: string, basePath = '') => {
      const items = require('fs').readdirSync(dir);
      
      for (const item of items) {
        const fullPath = join(dir, item);
        const relativePath = join(basePath, item);
        const stats = require('fs').statSync(fullPath);
        
        if (stats.isDirectory()) {
          scanDirectory(fullPath, relativePath);
        } else if (stats.isFile()) {
          const asset: BundleAsset = {
            name: relativePath,
            size: stats.size,
            type: this.getAssetType(item),
          };
          
          // Calculate gzip size for text-based assets
          if (asset.type === 'js' || asset.type === 'css') {
            asset.gzipSize = await this.calculateGzipSize(fullPath);
          }
          
          assets.push(asset);
        }
      }
    };

    scanDirectory(this.buildDir);
    return assets;
  }

  /**
   * Analyze chunks and modules
   */
  private async analyzeChunks(): Promise<Record<string, any>> {
    const chunks: Record<string, any> = {};
    
    // Try to read Vite build manifest or Webpack stats
    const manifestPaths = [
      join(this.buildDir, '.vite', 'manifest.json'),
      join(this.buildDir, 'manifest.json'),
      join(this.buildDir, 'stats.json'),
    ];
    
    for (const manifestPath of manifestPaths) {
      if (existsSync(manifestPath)) {
        try {
          const manifest = JSON.parse(readFileSync(manifestPath, 'utf8'));
          
          // Parse Vite manifest
          if (manifest.version || manifestPath.includes('vite')) {
            Object.entries(manifest).forEach(([key, entry]: [string, any]) => {
              chunks[key] = {
                size: 0, // Will be calculated from assets
                assets: entry.assets || [entry.file],
                modules: entry.imports || [],
              };
            });
          }
          // Parse Webpack stats
          else if (manifest.chunks) {
            manifest.chunks.forEach((chunk: any) => {
              chunks[chunk.name || chunk.id] = {
                size: chunk.size,
                assets: chunk.files || [],
                modules: chunk.modules?.map((m: any) => m.name) || [],
              };
            });
          }
          
          break;
        } catch (error) {
          console.warn(`Failed to parse manifest at ${manifestPath}:`, error);
        }
      }
    }
    
    return chunks;
  }

  /**
   * Calculate size breakdown by asset type
   */
  private calculateBreakdown(assets: BundleAsset[]) {
    const breakdown = {
      js: 0,
      css: 0,
      images: 0,
      fonts: 0,
      other: 0,
    };

    assets.forEach(asset => {
      breakdown[asset.type] += asset.size;
    });

    return breakdown;
  }

  /**
   * Check against bundle size budgets
   */
  private checkBudgets(assets: BundleAsset[], breakdown: any) {
    const budgetStatus = [];
    
    // Check JavaScript total
    budgetStatus.push({
      asset: 'JavaScript Total',
      budget: BUNDLE_SIZE_BUDGETS.jsTotalMax,
      actual: breakdown.js,
      status: this.getBudgetStatus(breakdown.js, BUNDLE_SIZE_BUDGETS.jsTotalMax),
      percentage: (breakdown.js / BUNDLE_SIZE_BUDGETS.jsTotalMax) * 100,
    });

    // Check CSS total
    budgetStatus.push({
      asset: 'CSS Total',
      budget: BUNDLE_SIZE_BUDGETS.cssTotal,
      actual: breakdown.css,
      status: this.getBudgetStatus(breakdown.css, BUNDLE_SIZE_BUDGETS.cssTotal),
      percentage: (breakdown.css / BUNDLE_SIZE_BUDGETS.cssTotal) * 100,
    });

    // Check total bundle size
    const totalSize = Object.values(breakdown).reduce((sum, size) => sum + size, 0);
    budgetStatus.push({
      asset: 'Total Bundle',
      budget: BUNDLE_SIZE_BUDGETS.totalSize,
      actual: totalSize,
      status: this.getBudgetStatus(totalSize, BUNDLE_SIZE_BUDGETS.totalSize),
      percentage: (totalSize / BUNDLE_SIZE_BUDGETS.totalSize) * 100,
    });

    // Check individual large assets
    const jsAssets = assets.filter(a => a.type === 'js').sort((a, b) => b.size - a.size);
    const mainJs = jsAssets[0];
    if (mainJs) {
      budgetStatus.push({
        asset: `Main JS (${mainJs.name})`,
        budget: BUNDLE_SIZE_BUDGETS.jsMain,
        actual: mainJs.size,
        status: this.getBudgetStatus(mainJs.size, BUNDLE_SIZE_BUDGETS.jsMain),
        percentage: (mainJs.size / BUNDLE_SIZE_BUDGETS.jsMain) * 100,
      });
    }

    return budgetStatus;
  }

  /**
   * Get budget status
   */
  private getBudgetStatus(actual: number, budget: number): 'pass' | 'warn' | 'fail' {
    const percentage = (actual / budget) * 100;
    if (percentage <= 80) return 'pass';
    if (percentage <= 100) return 'warn';
    return 'fail';
  }

  /**
   * Update bundle history
   */
  private async updateHistory(analysis: BundleAnalysis): Promise<void> {
    let history: BundleHistory;
    
    if (existsSync(this.historyFile)) {
      history = JSON.parse(readFileSync(this.historyFile, 'utf8'));
    } else {
      history = {
        builds: [],
        trends: {
          totalSize: [],
          jsSize: [],
          cssSize: [],
        },
      };
    }

    // Add current analysis
    history.builds.push(analysis);
    
    // Update trends
    history.trends.totalSize.push({
      timestamp: analysis.timestamp,
      size: analysis.totalSize,
    });
    history.trends.jsSize.push({
      timestamp: analysis.timestamp,
      size: analysis.breakdown.js,
    });
    history.trends.cssSize.push({
      timestamp: analysis.timestamp,
      size: analysis.breakdown.css,
    });

    // Keep only last 100 builds
    if (history.builds.length > 100) {
      history.builds = history.builds.slice(-100);
    }

    // Keep only last 100 trend points
    Object.keys(history.trends).forEach(key => {
      const trend = history.trends[key as keyof typeof history.trends];
      if (trend.length > 100) {
        history.trends[key as keyof typeof history.trends] = trend.slice(-100);
      }
    });

    writeFileSync(this.historyFile, JSON.stringify(history, null, 2));
  }

  /**
   * Generate analysis reports
   */
  private async generateReports(analysis: BundleAnalysis): Promise<void> {
    // Generate JSON report
    const jsonReport = join(this.outputDir, 'bundle-analysis.json');
    writeFileSync(jsonReport, JSON.stringify(analysis, null, 2));

    // Generate HTML report
    const htmlReport = await this.generateHtmlReport(analysis);
    writeFileSync(join(this.outputDir, 'bundle-report.html'), htmlReport);

    // Generate CSV report for CI/CD
    const csvReport = this.generateCsvReport(analysis);
    writeFileSync(join(this.outputDir, 'bundle-analysis.csv'), csvReport);

    // Generate markdown summary
    const markdownReport = this.generateMarkdownReport(analysis);
    writeFileSync(join(this.outputDir, 'bundle-summary.md'), markdownReport);

    console.log(`📊 Bundle analysis complete. Reports saved to ${this.outputDir}/`);
  }

  /**
   * Generate HTML report
   */
  private async generateHtmlReport(analysis: BundleAnalysis): Promise<string> {
    return `
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Bundle Size Analysis Report</title>
    <script src="https://cdn.jsdelivr.net/npm/chart.js"></script>
    <style>
        body { font-family: Arial, sans-serif; margin: 0; padding: 20px; background: #f5f5f5; }
        .container { max-width: 1200px; margin: 0 auto; }
        .card { background: white; border-radius: 8px; padding: 20px; margin-bottom: 20px; box-shadow: 0 2px 4px rgba(0,0,0,0.1); }
        .header { text-align: center; background: #1a1a1a; color: white; padding: 30px; border-radius: 8px; }
        .metrics { display: grid; grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); gap: 20px; }
        .metric { text-align: center; }
        .metric-value { font-size: 2em; font-weight: bold; margin-bottom: 5px; }
        .metric-label { color: #666; font-size: 0.9em; }
        .budget-item { display: flex; justify-content: space-between; align-items: center; padding: 10px; border-radius: 5px; margin-bottom: 10px; }
        .budget-pass { background: #d4edda; }
        .budget-warn { background: #fff3cd; }
        .budget-fail { background: #f8d7da; }
        .chart-container { width: 100%; height: 400px; }
        table { width: 100%; border-collapse: collapse; }
        th, td { padding: 12px; text-align: left; border-bottom: 1px solid #ddd; }
        th { background: #f8f9fa; font-weight: 600; }
        .size { font-family: monospace; }
    </style>
</head>
<body>
    <div class="container">
        <div class="header">
            <h1>📦 Bundle Size Analysis Report</h1>
            <p>Generated on ${new Date(analysis.timestamp).toLocaleString()}</p>
            ${analysis.commit ? `<p>Commit: <code>${analysis.commit}</code></p>` : ''}
        </div>

        <div class="card">
            <h2>📊 Size Overview</h2>
            <div class="metrics">
                <div class="metric">
                    <div class="metric-value">${this.formatBytes(analysis.totalSize)}</div>
                    <div class="metric-label">Total Size</div>
                </div>
                <div class="metric">
                    <div class="metric-value">${this.formatBytes(analysis.totalGzipSize)}</div>
                    <div class="metric-label">Gzipped Size</div>
                </div>
                <div class="metric">
                    <div class="metric-value">${this.formatBytes(analysis.breakdown.js)}</div>
                    <div class="metric-label">JavaScript</div>
                </div>
                <div class="metric">
                    <div class="metric-value">${this.formatBytes(analysis.breakdown.css)}</div>
                    <div class="metric-label">CSS</div>
                </div>
                <div class="metric">
                    <div class="metric-value">${analysis.assets.length}</div>
                    <div class="metric-label">Total Assets</div>
                </div>
            </div>
        </div>

        <div class="card">
            <h2>📈 Bundle Breakdown</h2>
            <div class="chart-container">
                <canvas id="breakdownChart"></canvas>
            </div>
        </div>

        <div class="card">
            <h2>🎯 Budget Status</h2>
            ${analysis.budgetStatus.map(budget => `
                <div class="budget-item budget-${budget.status}">
                    <span><strong>${budget.asset}</strong></span>
                    <span class="size">
                        ${this.formatBytes(budget.actual)} / ${this.formatBytes(budget.budget)}
                        (${budget.percentage.toFixed(1)}%)
                    </span>
                </div>
            `).join('')}
        </div>

        <div class="card">
            <h2>📋 Asset Details</h2>
            <table>
                <thead>
                    <tr>
                        <th>Asset</th>
                        <th>Type</th>
                        <th>Size</th>
                        <th>Gzipped</th>
                    </tr>
                </thead>
                <tbody>
                    ${analysis.assets
                      .sort((a, b) => b.size - a.size)
                      .map(asset => `
                        <tr>
                            <td><code>${asset.name}</code></td>
                            <td>${asset.type.toUpperCase()}</td>
                            <td class="size">${this.formatBytes(asset.size)}</td>
                            <td class="size">${asset.gzipSize ? this.formatBytes(asset.gzipSize) : '-'}</td>
                        </tr>
                    `).join('')}
                </tbody>
            </table>
        </div>
    </div>

    <script>
        // Breakdown chart
        const ctx = document.getElementById('breakdownChart').getContext('2d');
        new Chart(ctx, {
            type: 'doughnut',
            data: {
                labels: ['JavaScript', 'CSS', 'Images', 'Fonts', 'Other'],
                datasets: [{
                    data: [
                        ${analysis.breakdown.js},
                        ${analysis.breakdown.css},
                        ${analysis.breakdown.images},
                        ${analysis.breakdown.fonts},
                        ${analysis.breakdown.other}
                    ],
                    backgroundColor: [
                        '#FF6384',
                        '#36A2EB',
                        '#FFCE56',
                        '#4BC0C0',
                        '#9966FF'
                    ]
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                    tooltip: {
                        callbacks: {
                            label: function(context) {
                                const value = context.parsed;
                                const total = context.dataset.data.reduce((a, b) => a + b, 0);
                                const percentage = ((value / total) * 100).toFixed(1);
                                return context.label + ': ' + ${JSON.stringify(`${this.formatBytes(0)}`).replace('0 B', '')} + value.toLocaleString() + ' bytes (' + percentage + '%)';
                            }
                        }
                    }
                }
            }
        });
    </script>
</body>
</html>`;
  }

  /**
   * Generate CSV report for CI/CD
   */
  private generateCsvReport(analysis: BundleAnalysis): string {
    const rows = [
      ['Metric', 'Value', 'Budget', 'Status'],
      ['Total Size', analysis.totalSize.toString(), BUNDLE_SIZE_BUDGETS.totalSize.toString(), ''],
      ['JavaScript', analysis.breakdown.js.toString(), BUNDLE_SIZE_BUDGETS.jsTotalMax.toString(), ''],
      ['CSS', analysis.breakdown.css.toString(), BUNDLE_SIZE_BUDGETS.cssTotal.toString(), ''],
      ['Images', analysis.breakdown.images.toString(), BUNDLE_SIZE_BUDGETS.imagesTotal.toString(), ''],
      ...analysis.budgetStatus.map(budget => [
        budget.asset,
        budget.actual.toString(),
        budget.budget.toString(),
        budget.status,
      ]),
    ];

    return rows.map(row => row.join(',')).join('\n');
  }

  /**
   * Generate markdown summary
   */
  private generateMarkdownReport(analysis: BundleAnalysis): string {
    const failedBudgets = analysis.budgetStatus.filter(b => b.status === 'fail');
    const warningBudgets = analysis.budgetStatus.filter(b => b.status === 'warn');

    return `# 📦 Bundle Size Analysis

Generated on: ${new Date(analysis.timestamp).toLocaleString()}
${analysis.commit ? `Commit: \`${analysis.commit}\`` : ''}

## 📊 Summary

- **Total Size**: ${this.formatBytes(analysis.totalSize)}
- **Gzipped Size**: ${this.formatBytes(analysis.totalGzipSize)}
- **JavaScript**: ${this.formatBytes(analysis.breakdown.js)}
- **CSS**: ${this.formatBytes(analysis.breakdown.css)}
- **Total Assets**: ${analysis.assets.length}

## 🎯 Budget Status

${failedBudgets.length > 0 ? `### ❌ Failed Budgets\n${failedBudgets.map(b => 
  `- **${b.asset}**: ${this.formatBytes(b.actual)} / ${this.formatBytes(b.budget)} (${b.percentage.toFixed(1)}%)`
).join('\n')}\n` : ''}

${warningBudgets.length > 0 ? `### ⚠️ Warning Budgets\n${warningBudgets.map(b => 
  `- **${b.asset}**: ${this.formatBytes(b.actual)} / ${this.formatBytes(b.budget)} (${b.percentage.toFixed(1)}%)`
).join('\n')}\n` : ''}

${analysis.budgetStatus.filter(b => b.status === 'pass').length > 0 ? `### ✅ Passed Budgets\n${analysis.budgetStatus.filter(b => b.status === 'pass').map(b => 
  `- **${b.asset}**: ${this.formatBytes(b.actual)} / ${this.formatBytes(b.budget)} (${b.percentage.toFixed(1)}%)`
).join('\n')}\n` : ''}

## 📈 Breakdown

| Type | Size | Percentage |
|------|------|------------|
| JavaScript | ${this.formatBytes(analysis.breakdown.js)} | ${((analysis.breakdown.js / analysis.totalSize) * 100).toFixed(1)}% |
| CSS | ${this.formatBytes(analysis.breakdown.css)} | ${((analysis.breakdown.css / analysis.totalSize) * 100).toFixed(1)}% |
| Images | ${this.formatBytes(analysis.breakdown.images)} | ${((analysis.breakdown.images / analysis.totalSize) * 100).toFixed(1)}% |
| Fonts | ${this.formatBytes(analysis.breakdown.fonts)} | ${((analysis.breakdown.fonts / analysis.totalSize) * 100).toFixed(1)}% |
| Other | ${this.formatBytes(analysis.breakdown.other)} | ${((analysis.breakdown.other / analysis.totalSize) * 100).toFixed(1)}% |

## 🔍 Largest Assets

${analysis.assets
  .sort((a, b) => b.size - a.size)
  .slice(0, 10)
  .map((asset, i) => `${i + 1}. \`${asset.name}\` - ${this.formatBytes(asset.size)}`)
  .join('\n')}

---

*For detailed analysis, view the full HTML report.*
`;
  }

  /**
   * Utility methods
   */

  private getAssetType(filename: string): 'js' | 'css' | 'image' | 'font' | 'other' {
    const ext = filename.split('.').pop()?.toLowerCase();
    
    if (['js', 'mjs', 'jsx', 'ts', 'tsx'].includes(ext || '')) return 'js';
    if (['css', 'scss', 'sass', 'less'].includes(ext || '')) return 'css';
    if (['jpg', 'jpeg', 'png', 'gif', 'svg', 'webp', 'avif'].includes(ext || '')) return 'image';
    if (['woff', 'woff2', 'ttf', 'eot', 'otf'].includes(ext || '')) return 'font';
    
    return 'other';
  }

  private async calculateGzipSize(filePath: string): Promise<number> {
    try {
      const { gzipSync } = await import('zlib');
      const content = readFileSync(filePath);
      return gzipSync(content).length;
    } catch (error) {
      console.warn(`Failed to calculate gzip size for ${filePath}:`, error);
      return 0;
    }
  }

  private formatBytes(bytes: number): string {
    const sizes = ['B', 'KB', 'MB', 'GB'];
    if (bytes === 0) return '0 B';
    const i = Math.floor(Math.log(bytes) / Math.log(1024));
    return Math.round(bytes / Math.pow(1024, i) * 100) / 100 + ' ' + sizes[i];
  }

  private async getGitCommit(): Promise<string | undefined> {
    try {
      return process.env.GITHUB_SHA || 
             process.env.CI_COMMIT_SHA || 
             process.env.VERCEL_GIT_COMMIT_SHA;
    } catch {
      return undefined;
    }
  }

  private async getGitBranch(): Promise<string | undefined> {
    try {
      return process.env.GITHUB_REF_NAME || 
             process.env.CI_COMMIT_REF_NAME || 
             process.env.VERCEL_GIT_COMMIT_REF;
    } catch {
      return undefined;
    }
  }

  /**
   * Check if bundles exceed thresholds
   */
  public validateBudgets(analysis: BundleAnalysis): { passed: boolean; violations: any[] } {
    const violations = analysis.budgetStatus.filter(budget => budget.status === 'fail');
    return {
      passed: violations.length === 0,
      violations,
    };
  }

  /**
   * Compare with previous build
   */
  public async compareWithPrevious(): Promise<any> {
    if (!existsSync(this.historyFile)) {
      return null;
    }

    const history: BundleHistory = JSON.parse(readFileSync(this.historyFile, 'utf8'));
    if (history.builds.length < 2) {
      return null;
    }

    const current = history.builds[history.builds.length - 1];
    const previous = history.builds[history.builds.length - 2];

    return {
      totalSizeDiff: current.totalSize - previous.totalSize,
      totalSizePercentDiff: ((current.totalSize - previous.totalSize) / previous.totalSize) * 100,
      jsDiff: current.breakdown.js - previous.breakdown.js,
      cssDiff: current.breakdown.css - previous.breakdown.css,
      jsPercentDiff: ((current.breakdown.js - previous.breakdown.js) / previous.breakdown.js) * 100,
      cssPercentDiff: ((current.breakdown.css - previous.breakdown.css) / previous.breakdown.css) * 100,
    };
  }
}

// CLI usage
export async function runBundleAnalysis(): Promise<void> {
  const monitor = new BundleSizeMonitor();
  
  try {
    console.log('🔍 Analyzing bundle sizes...');
    const analysis = await monitor.analyzeBundles();
    
    // Validate budgets
    const validation = monitor.validateBudgets(analysis);
    
    if (!validation.passed) {
      console.error('\n❌ Bundle size budget violations:');
      validation.violations.forEach(violation => {
        console.error(`  - ${violation.asset}: ${monitor.formatBytes(violation.actual)} / ${monitor.formatBytes(violation.budget)} (${violation.percentage.toFixed(1)}%)`);
      });
      process.exit(1);
    } else {
      console.log('✅ All bundle size budgets passed!');
    }
    
    // Compare with previous
    const comparison = await monitor.compareWithPrevious();
    if (comparison) {
      console.log('\n📊 Size comparison with previous build:');
      console.log(`  Total: ${comparison.totalSizeDiff > 0 ? '+' : ''}${monitor.formatBytes(Math.abs(comparison.totalSizeDiff))} (${comparison.totalSizePercentDiff > 0 ? '+' : ''}${comparison.totalSizePercentDiff.toFixed(1)}%)`);
      console.log(`  JS: ${comparison.jsDiff > 0 ? '+' : ''}${monitor.formatBytes(Math.abs(comparison.jsDiff))} (${comparison.jsPercentDiff > 0 ? '+' : ''}${comparison.jsPercentDiff.toFixed(1)}%)`);
      console.log(`  CSS: ${comparison.cssDiff > 0 ? '+' : ''}${monitor.formatBytes(Math.abs(comparison.cssDiff))} (${comparison.cssPercentDiff > 0 ? '+' : ''}${comparison.cssPercentDiff.toFixed(1)}%)`);
    }
    
    console.log(`\n📋 Full report available at: bundle-analysis/bundle-report.html`);
    
  } catch (error) {
    console.error('❌ Bundle analysis failed:', error);
    process.exit(1);
  }
}

// Export for use in build scripts
export default BundleSizeMonitor;