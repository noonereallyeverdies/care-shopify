# Framer Motion Usage Audit & Optimization Plan

## 📊 Current Usage Analysis

### **Scope of Usage**
- **Files using Framer Motion**: 77 files
- **Total Bundle Size Impact**: ~400KB (uncompressed)
- **Types of animations**: Simple transitions, hover effects, scroll-based, complex sequences

### **Animation Categories Found**

#### 1. **Simple Animations** (Can be replaced with CSS)
- **Fade ins/outs**: `opacity: 0 → 1`
- **Slide animations**: `y: 20 → 0`
- **Scale effects**: `scale: 1 → 1.05`
- **Rotation**: `rotate: 0 → 180`
- **Basic hovers**: Scale and shadow changes

#### 2. **Complex Animations** (Should keep Framer Motion)
- **Scroll-triggered animations**: `useScroll`, `useTransform`
- **AnimatePresence**: Complex enter/exit transitions
- **Staggered animations**: Children animating in sequence
- **Physics-based animations**: Spring animations
- **Complex state transitions**: Multi-step animations

#### 3. **Medium Complexity** (Evaluate case-by-case)
- **Accordion animations**: Height animations
- **Hero section**: Coordinated animations
- **Product card interactions**: Combined effects

## 🎯 Optimization Strategy

### Phase 1: Replace Simple Animations with CSS

#### **Target Components for CSS Conversion**:
1. **Simple Hover Effects**
   - `CTAButton.tsx` - Scale and shadow effects
   - `ProductCard.tsx` - Basic hover animations
   - Basic link hover states

2. **Fade Transitions**
   - Simple opacity changes on mount
   - Basic visibility toggles

3. **Basic Transforms**
   - Simple scale, rotate, translate effects

### Phase 2: Optimize Framer Motion Usage

#### **Keep Framer Motion for**:
1. **Scroll-based animations**
   - `HeroSection-Enhanced.tsx` - Parallax effects
   - `ScrollProgress.tsx` - Progress indicators
   - `SocialProofBanner.tsx` - Scroll transforms

2. **Complex State Management**
   - `HairAssessment.tsx` - Multi-step form animations
   - `FaqSection.tsx` - Dynamic accordion animations
   - `VisualScienceSection.tsx` - Tab switching

3. **Advanced Features**
   - `AnimatePresence` for enter/exit transitions
   - `useAnimation` for programmatic control
   - Stagger animations for lists

### Phase 3: Bundle Optimization

#### **Code Splitting Strategy**:
1. **Lazy load Framer Motion** for non-critical animations
2. **Tree shake** unused Framer Motion features
3. **Split animations** by complexity

## 🔧 Implementation Plan

### Step 1: Create CSS Animation Utilities

Create a CSS animation system to replace simple Framer Motion usage:

```css
/* Animation utilities to replace simple Framer Motion usage */
.animate-fade-in {
  animation: fadeIn 0.6s ease-out forwards;
  opacity: 0;
}

.animate-slide-up {
  animation: slideUp 0.6s ease-out forwards;
  transform: translateY(20px);
  opacity: 0;
}

.animate-scale-hover:hover {
  transform: scale(1.05);
  transition: transform 0.3s ease;
}

@keyframes fadeIn {
  to {
    opacity: 1;
  }
}

@keyframes slideUp {
  to {
    transform: translateY(0);
    opacity: 1;
  }
}
```

### Step 2: Lazy Load Framer Motion

Create a dynamic import system for Framer Motion:

```typescript
// components/dynamic/MotionWrapper.tsx
import { lazy, Suspense } from 'react';

const FramerMotion = lazy(() => import('./FramerMotionComponents'));

export function MotionWrapper({ children, fallback = null }) {
  return (
    <Suspense fallback={fallback}>
      <FramerMotion>{children}</FramerMotion>
    </Suspense>
  );
}
```

### Step 3: Audit and Replace Simple Animations

#### **Priority Components for Conversion**:

1. **CTAButton** - Replace with CSS hover effects
2. **Simple accordions** - Use CSS transitions
3. **Basic fade animations** - CSS keyframes
4. **Product card hovers** - CSS transforms

## 📈 Expected Performance Gains

### Bundle Size Reduction:
- **Before**: ~400KB Framer Motion
- **After**: ~150KB (keep only complex animations)
- **Savings**: ~250KB (~62% reduction)

### Performance Benefits:
- **Reduced JavaScript bundle size**
- **Faster initial page load**
- **Better Core Web Vitals scores**
- **Improved mobile performance**

### Animation Performance:
- **CSS animations**: GPU-accelerated
- **Reduced JavaScript overhead**
- **Better frame rates**
- **Lower memory usage**

## ⚡ Quick Wins (Immediate Actions)

### 1. Update Vite Config
```typescript
// Remove framer-motion from optimization excludes
optimizeDeps: {
  exclude: ['swiper'], // Remove framer-motion
}
```

### 2. Create CSS Animation Library
- Add utility classes for common animations
- Implement smooth transitions
- Optimize for performance

### 3. Identify Low-Impact Replacements
- Simple hover effects
- Basic fade transitions
- Scale animations

## 🔄 Migration Timeline

### Week 1: Setup & Analysis
- Create CSS animation utilities
- Set up dynamic loading system
- Audit all Framer Motion usage

### Week 2: Simple Replacements
- Replace basic hover effects
- Convert simple transitions
- Update button interactions

### Week 3: Medium Complexity
- Optimize accordion animations
- Improve loading animations
- Refactor card interactions

### Week 4: Testing & Optimization
- Performance testing
- Bundle analysis
- Final optimizations

## 📋 Success Metrics

### Bundle Size:
- [ ] Reduce total bundle size by 250KB
- [ ] Framer Motion usage reduced by 60%
- [ ] Maintain all animation functionality

### Performance:
- [ ] Improve First Contentful Paint
- [ ] Better JavaScript execution time
- [ ] Smoother animations (60fps)

### Developer Experience:
- [ ] Maintain animation quality
- [ ] Preserve complex features
- [ ] Easier maintenance
