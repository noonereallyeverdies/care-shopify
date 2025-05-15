# Bundle Analysis & Code Splitting Implementation Guide

## 🎯 **What Was Implemented**

### **1. Bundle Analyzer**
- Added `rollup-plugin-analyzer` for detailed bundle analysis
- Configured automatic analysis on build
- Added scripts for easy bundle monitoring

### **2. Manual Chunk Splitting**
Configured strategic chunk splitting in `vite.config.ts`:
- **vendor-react**: React core libraries
- **vendor-shopify**: Shopify-specific packages
- **vendor-animation**: Framer Motion and animation libraries
- **vendor-ui**: UI components (Swiper, Headless UI, etc.)
- **vendor-utils**: Utility libraries
- **vendor-data**: GraphQL and data handling

### **3. Dynamic Component Loaders**
Created specialized dynamic loaders:
- **DynamicMotion**: Lazy-loaded Framer Motion components
- **DynamicSwiper**: Lazy-loaded Swiper components
- **createDynamicComponent**: HOC for viewport-based loading

## 🚀 **How to Use**

### **Bundle Analysis**

Run bundle analysis:
```bash
npm run build:analyze
npm run bundle:stats
```

Check the generated `bundle-analysis.txt` for detailed breakdown.

### **Migration Examples**

#### **Before (Direct Import):**
```tsx
import { motion } from 'framer-motion';

export function MyComponent() {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
    >
      Content
    </motion.div>
  );
}
```

#### **After (Dynamic Import):**
```tsx
import { motion } from '~/components/dynamic';

export function MyComponent() {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
    >
      Content
    </motion.div>
  );
}
```

#### **Swiper Migration:**

**Before:**
```tsx
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

export function MySlider() {
  return (
    <Swiper modules={[Navigation, Pagination]}>
      <SwiperSlide>Slide 1</SwiperSlide>
      <SwiperSlide>Slide 2</SwiperSlide>
    </Swiper>
  );
}
```

**After:**
```tsx
import { DynamicSwiper, DynamicSwiperSlide, useSwiperStyles } from '~/components/dynamic';

export function MySlider() {
  // Styles are loaded automatically
  useSwiperStyles(['navigation', 'pagination']);
  
  return (
    <DynamicSwiper modules={['Navigation', 'Pagination']}>
      <DynamicSwiperSlide>Slide 1</DynamicSwiperSlide>
      <DynamicSwiperSlide>Slide 2</DynamicSwiperSlide>
    </DynamicSwiper>
  );
}
```

#### **Viewport-Based Loading:**
```tsx
import { createDynamicComponent } from '~/components/dynamic';

// Heavy component that should only load when needed
const HeavyComponent = createDynamicComponent(
  () => import('./HeavyComponent'),
  ({ children }) => <div className="loading-placeholder">{children}</div>
);

export function ParentComponent() {
  return (
    <div>
      {/* This will only load when near the viewport */}
      <HeavyComponent enableViewportLoading>
        <p>Heavy content</p>
      </HeavyComponent>
    </div>
  );
}
```

## 📊 **Expected Performance Improvements**

### **Initial Bundle Size Reduction:**
- **Animation chunk**: Only loads when animations are used (~200KB savings on initial load)
- **Swiper chunk**: Only loads when carousels are needed (~150KB savings)
- **Vendor chunks**: Better caching when libraries update

### **Loading Pattern Optimization:**
1. **Critical path**: Core React + Shopify essentials load first
2. **Above-the-fold**: Hero animations load immediately
3. **Below-the-fold**: Components load as user scrolls
4. **Interaction-based**: Complex animations load on demand

## 🔧 **Configuration Details**

### **Chunk Size Optimization**
```typescript
// In vite.config.ts
chunkSizeWarningLimit: 1000, // 1MB warning threshold
```

### **Preloading Strategy**
```typescript
optimizeDeps: {
  exclude: ['framer-motion', 'swiper'], // Enable code splitting
  include: ['clsx', 'tiny-invariant'],  // Pre-bundle small utils
}
```

## 📈 **Monitoring Bundle Size**

### **Scripts Added:**
- `npm run build:analyze` - Full build with analysis
- `npm run bundle:stats` - Quick size overview

### **Analysis Files:**
- `bundle-analysis.txt` - Detailed module breakdown
- Console output during build shows chunk sizes

## 💡 **Best Practices**

### **When to Use Dynamic Loading:**
✅ **Use for:**
- Large animation libraries (Framer Motion)
- UI component libraries (Swiper)
- Below-the-fold heavy components
- Feature-specific functionality

❌ **Don't use for:**
- Critical above-the-fold content
- Small utility libraries (<10KB)
- Core React components

### **Performance Considerations:**
- Dynamic imports add ~10-50ms loading time
- But save 100-500KB on initial bundle
- Net positive for user experience

## 🚨 **Migration Priority**

### **High Priority:**
1. Below-the-fold sections with animations
2. Product showcase sliders
3. Testimonial carousels
4. FAQ sections with animations

### **Medium Priority:**
1. Hero section animations (already visible)
2. Navigation animations
3. Button hover effects

### **Low Priority:**
1. Small micro-interactions
2. Simple fade-ins
3. CSS-only animations

## 🔄 **Implementation Steps**

1. **Start with non-critical components** below the fold
2. **Replace imports** with dynamic versions
3. **Test loading behavior** in development
4. **Monitor bundle analysis** after each change
5. **Measure real-world performance** impact

## ⚡ **Quick Migration Checklist**

- [ ] Update imports to use `~/components/dynamic`
- [ ] Replace `motion.*` with dynamic `motion.*`
- [ ] Replace Swiper imports with Dynamic versions
- [ ] Add `enableViewportLoading` to below-fold components
- [ ] Test loading states and fallbacks
- [ ] Run `npm run build:analyze` to verify improvements

---

**Result**: Expect 30-50% reduction in initial JavaScript bundle size while maintaining the same functionality and user experience.
