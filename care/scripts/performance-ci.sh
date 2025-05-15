#!/bin/bash

# Performance CI/CD Integration Script
# This script runs performance checks and budget validation in CI/CD pipelines

set -e

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# Configuration
LIGHTHOUSE_CONFIG_PATH="./lighthouse.config.js"
BUNDLE_ANALYSIS_PATH="./bundle-analysis"
PERFORMANCE_REPORTS_PATH="./performance-reports"

# Functions
print_header() {
    echo -e "${BLUE}=================================${NC}"
    echo -e "${BLUE}  Performance CI/CD Pipeline     ${NC}"
    echo -e "${BLUE}=================================${NC}\n"
}

print_success() {
    echo -e "${GREEN}✅ $1${NC}"
}

print_warning() {
    echo -e "${YELLOW}⚠️  $1${NC}"
}

print_error() {
    echo -e "${RED}❌ $1${NC}"
}

print_info() {
    echo -e "${BLUE}ℹ️  $1${NC}"
}

# Create directories
create_directories() {
    print_info "Creating performance report directories..."
    mkdir -p "$PERFORMANCE_REPORTS_PATH"
    mkdir -p "$BUNDLE_ANALYSIS_PATH"
    print_success "Directories created"
}

# Install dependencies
install_dependencies() {
    print_info "Installing performance monitoring dependencies..."
    
    # Install Lighthouse CI if not present
    if ! command -v lhci &> /dev/null; then
        npm install -g @lhci/cli@latest
    fi
    
    # Install bundlesize if not present
    if ! npm list bundlesize &> /dev/null; then
        npm install --save-dev bundlesize
    fi
    
    print_success "Dependencies installed"
}

# Run bundle size analysis
analyze_bundle_size() {
    print_info "Analyzing bundle sizes..."
    
    # Run bundle analysis
    npm run build:analyze
    
    # Run bundlesize check
    if npm run bundle:check; then
        print_success "Bundle size check passed"
    else
        print_error "Bundle size check failed"
        return 1
    fi
    
    # Generate bundle report
    node -e "
        const { BundleSizeMonitor } = require('./app/lib/bundle-monitor.ts');
        const monitor = new BundleSizeMonitor();
        monitor.analyzeBundles().then(analysis => {
            const validation = monitor.validateBudgets(analysis);
            if (!validation.passed) {
                console.error('Bundle size budget violations:');
                validation.violations.forEach(v => console.error(\`  \${v.asset}: \${v.actual} / \${v.budget}\`));
                process.exit(1);
            }
        }).catch(err => {
            console.error('Bundle analysis failed:', err);
            process.exit(1);
        });
    "
    
    print_success "Bundle size analysis complete"
}

# Run Lighthouse CI
run_lighthouse_ci() {
    print_info "Running Lighthouse CI..."
    
    # Create Lighthouse config if it doesn't exist
    if [ ! -f "$LIGHTHOUSE_CONFIG_PATH" ]; then
        cat > "$LIGHTHOUSE_CONFIG_PATH" << EOF
module.exports = {
  ci: {
    collect: {
      url: process.env.PREVIEW_URL || 'http://localhost:3000',
      numberOfRuns: 3,
      settings: {
        preset: 'desktop',
        chromeFlags: '--no-sandbox --headless --disable-gpu',
      },
    },
    assert: {
      budgetsFile: './performance-budgets.json',
      assertions: {
        'categories:performance': ['warn', { minScore: 0.8 }],
        'categories:accessibility': ['error', { minScore: 0.9 }],
        'categories:best-practices': ['warn', { minScore: 0.9 }],
        'categories:seo': ['warn', { minScore: 0.9 }],
        
        // Core Web Vitals
        'largest-contentful-paint': ['error', { maxNumericValue: 2500 }],
        'cumulative-layout-shift': ['error', { maxNumericValue: 0.1 }],
        'first-contentful-paint': ['warn', { maxNumericValue: 1800 }],
        'speed-index': ['warn', { maxNumericValue: 3400 }],
        'total-blocking-time': ['warn', { maxNumericValue: 200 }],
        
        // Bundle size
        'unused-javascript': ['warn', { maxNumericValue: 20000 }],
        'unused-css-rules': ['warn', { maxNumericValue: 20000 }],
        'uses-optimized-images': 'error',
        'modern-image-formats': 'warn',
        'uses-text-compression': 'error',
      },
    },
    upload: {
      target: 'temporary-public-storage',
    },
  },
};
EOF
    fi
    
    # Run Lighthouse CI
    if lhci autorun; then
        print_success "Lighthouse CI passed"
    else
        print_error "Lighthouse CI failed"
        return 1
    fi
}

# Generate performance budgets file
generate_performance_budgets() {
    print_info "Generating performance budgets configuration..."
    
    cat > "./performance-budgets.json" << EOF
[
  {
    "path": "/*",
    "timings": [
      {
        "metric": "first-contentful-paint",
        "budget": 1800
      },
      {
        "metric": "largest-contentful-paint",
        "budget": 2500
      },
      {
        "metric": "speed-index",
        "budget": 3400
      },
      {
        "metric": "cumulative-layout-shift",
        "budget": 0.1
      },
      {
        "metric": "total-blocking-time",
        "budget": 200
      }
    ],
    "resourceSizes": [
      {
        "resourceType": "total",
        "budget": 1500
      },
      {
        "resourceType": "script",
        "budget": 800
      },
      {
        "resourceType": "stylesheet",
        "budget": 100
      },
      {
        "resourceType": "image",
        "budget": 2000
      },
      {
        "resourceType": "font",
        "budget": 500
      }
    ],
    "resourceCounts": [
      {
        "resourceType": "total",
        "budget": 100
      },
      {
        "resourceType": "third-party",
        "budget": 20
      }
    ]
  }
]
EOF
    
    print_success "Performance budgets configuration generated"
}

# Create bundlesize configuration
create_bundlesize_config() {
    print_info "Creating bundlesize configuration..."
    
    # Add bundlesize config to package.json if not present
    node -e "
        const fs = require('fs');
        const pkg = JSON.parse(fs.readFileSync('package.json', 'utf8'));
        
        if (!pkg.bundlesize) {
            pkg.bundlesize = [
                {
                    'path': './dist/**/*.js',
                    'maxSize': '300 KB',
                    'compression': 'gzip'
                },
                {
                    'path': './dist/**/*.css',
                    'maxSize': '50 KB',
                    'compression': 'gzip'
                },
                {
                    'path': './dist/**/*',
                    'maxSize': '1.5 MB'
                }
            ];
            
            fs.writeFileSync('package.json', JSON.stringify(pkg, null, 2));
            console.log('Added bundlesize configuration to package.json');
        }
    "
    
    print_success "Bundlesize configuration created"
}

# Run Core Web Vitals monitoring
setup_web_vitals_monitoring() {
    print_info "Setting up Core Web Vitals monitoring..."
    
    # Create web vitals test script
    cat > "./scripts/test-web-vitals.js" << 'EOF'
const { initializeWebVitalsMonitoring } = require('../app/lib/core-web-vitals');

// Initialize monitoring with test configuration
const monitor = initializeWebVitalsMonitoring({
  debug: true,
  sampleRate: 1.0,
  customEndpoint: process.env.WEB_VITALS_ENDPOINT,
  googleAnalytics: false, // Disable GA in CI
});

console.log('Web Vitals monitoring initialized for CI testing');

// Simulate some metrics for testing
setTimeout(() => {
  console.log('Metrics summary:', monitor.getMetricsSummary());
  monitor.cleanup();
  process.exit(0);
}, 5000);
EOF
    
    print_success "Core Web Vitals monitoring setup complete"
}

# Generate performance report
generate_performance_report() {
    print_info "Generating comprehensive performance report..."
    
    # Get current timestamp
    TIMESTAMP=$(date +"%Y%m%d_%H%M%S")
    REPORT_DIR="${PERFORMANCE_REPORTS_PATH}/${TIMESTAMP}"
    mkdir -p "$REPORT_DIR"
    
    # Copy Lighthouse reports
    if [ -d ".lighthouseci" ]; then
        cp -r .lighthouseci/* "$REPORT_DIR/"
    fi
    
    # Copy bundle analysis
    if [ -d "$BUNDLE_ANALYSIS_PATH" ]; then
        cp -r "$BUNDLE_ANALYSIS_PATH"/* "$REPORT_DIR/"
    fi
    
    # Generate summary report
    cat > "${REPORT_DIR}/performance-summary.md" << EOF
# Performance Report - ${TIMESTAMP}

## Summary

This report contains performance analysis for the Care-atin Shopify store.

### Generated Reports

- **Lighthouse Report**: \`lighthouse-report.html\`
- **Bundle Analysis**: \`bundle-report.html\`
- **Bundle History**: \`bundle-history.json\`

### Key Metrics

- **Build**: \`${GITHUB_SHA:-$(git rev-parse HEAD)}\`
- **Branch**: \`${GITHUB_REF_NAME:-$(git branch --show-current)}\`
- **Environment**: \`${NODE_ENV:-development}\`
- **Generated**: $(date)

### Performance Checks

#### Bundle Size
- Main JavaScript: Check \`bundle-analysis.json\`
- Main CSS: Check \`bundle-analysis.json\`
- Total Bundle: Check \`bundle-analysis.json\`

#### Core Web Vitals
- LCP (Largest Contentful Paint): Target < 2.5s
- FID (First Input Delay): Target < 100ms
- CLS (Cumulative Layout Shift): Target < 0.1

### Action Items

Review the detailed reports above for specific optimization recommendations.
EOF
    
    print_success "Performance report generated at ${REPORT_DIR}"
}

# Upload to GitHub Actions artifacts (if in GitHub Actions)
upload_artifacts() {
    if [ "$GITHUB_ACTIONS" = "true" ]; then
        print_info "Uploading performance artifacts..."
        echo "PERFORMANCE_REPORT_PATH=${PERFORMANCE_REPORTS_PATH}" >> $GITHUB_OUTPUT
    fi
}

# Main execution
main() {
    print_header
    
    # Check if we're in a CI environment
    if [ -z "$CI" ] && [ -z "$GITHUB_ACTIONS" ] && [ -z "$VERCEL" ]; then
        print_warning "Not running in CI environment. Some checks may be skipped."
    fi
    
    # Run performance checks
    create_directories
    install_dependencies
    create_bundlesize_config
    generate_performance_budgets
    
    # Build the application if not already built
    if [ ! -d "dist" ] && [ ! -d "build" ]; then
        print_info "Building application..."
        npm run build
        print_success "Application built"
    fi
    
    # Run performance analyses
    analyze_bundle_size
    setup_web_vitals_monitoring
    
    # Run Lighthouse CI only if preview URL is available
    if [ -n "$PREVIEW_URL" ] || [ -n "$DEPLOYMENT_URL" ]; then
        export PREVIEW_URL=${PREVIEW_URL:-$DEPLOYMENT_URL}
        run_lighthouse_ci
    else
        print_warning "No preview URL provided. Skipping Lighthouse CI."
    fi
    
    # Generate reports
    generate_performance_report
    upload_artifacts
    
    print_success "Performance CI/CD pipeline completed successfully!"
}

# Handle script arguments
case "${1:-}" in
    "bundle-only")
        create_directories
        analyze_bundle_size
        ;;
    "lighthouse-only")
        create_directories
        install_dependencies
        generate_performance_budgets
        run_lighthouse_ci
        ;;
    "reports-only")
        generate_performance_report
        ;;
    *)
        main
        ;;
esac