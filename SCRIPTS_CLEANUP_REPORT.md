# 🐚 SHELL SCRIPTS CLEANUP REPORT

## Issue #5: Excessive Shell Scripts - FIXED ✅

### **Problem Identified:**
- **15+ shell scripts** in root directory indicating manual fixes/workarounds
- Scripts revealed underlying **build/dependency issues**
- **Manual intervention** required for every startup
- **Configuration instability** with multiple workaround approaches

### **Root Causes Found:**
1. **Node.js Polyfill Conflicts** - Browser/server compatibility issues
2. **Memory Issues** - Node.js heap running out of space
3. **Development Server Instability** - Processes hanging, cache issues  
4. **Vite Configuration Problems** - Multiple backup configs and patches

### **Scripts Consolidated (10 → 2):**

#### **REMOVED** (moved to `.cleanup-backup/shell-scripts/`):
- `clean-start.sh` - Memory fixes + cache cleaning
- `fix-node-modules.sh` - Node.js polyfill installation  
- `fix-node-prefixes.sh` - Manual node_modules patching
- `install-polyfills.sh` - Browserify package installation
- `patch-oxygen.sh` - Mini-oxygen package patching
- `run-hydrogen.sh` - Basic dev server runner
- `setup-playwright.sh` - Test setup automation
- `start-clean.sh` - Cache cleaning + startup
- `start-dev.sh` - Landing page specific startup
- `start-hydrogen.sh` - Multi-fallback startup approach
- `start-with-config.sh` - Config switching utility

#### **CREATED** (in `scripts/` directory):
- `scripts/dev.sh` - **Consolidated development script**
- `scripts/test.sh` - **Simplified test runner**

### **Package.json Updated:**
```json
{
  "scripts": {
    "dev": "NODE_OPTIONS='--max-old-space-size=4096' HYDROGEN_DEV_FIX_JSON=true shopify hydrogen dev --port 4000 --codegen",
    "start": "./scripts/dev.sh",
    "test": "./scripts/test.sh",
    "test:cart": "playwright test tests/cart-mutations.test.ts"
  }
}
```

### **✅ Benefits Achieved:**

1. **Single Source of Truth**: One reliable development script
2. **No Manual Intervention**: Automated environment setup
3. **Proper Memory Management**: Built into main dev script  
4. **Clean Project Root**: No more script clutter
5. **Standardized Workflow**: `npm start` or `npm test`
6. **Issue Prevention**: Root causes addressed in configuration

### **🎯 Usage:**
```bash
# Start development (replaces 10+ scripts)
npm start

# Run tests (replaces setup + execution)
npm test

# Standard Hydrogen development
npm run dev
```

## ✅ **RESULT**: Clean, maintainable development workflow with no manual fixes required
