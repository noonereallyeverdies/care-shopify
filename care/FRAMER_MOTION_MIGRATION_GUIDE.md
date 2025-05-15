# Framer Motion to CSS Migration Guide

## 🔄 Common Migration Patterns

### **1. Simple Fade Animations**

#### Before (Framer Motion):
```tsx
<motion.div
  initial={{ opacity: 0 }}
  animate={{ opacity: 1 }}
  transition={{ duration: 0.6 }}
>
  Content
</motion.div>
```

#### After (CSS):
```tsx
<div className="animate-fade-in">
  Content
</div>
```

### **2. Slide Animations**

#### Before (Framer Motion):
```tsx
<motion.div
  initial={{ y: 20, opacity: 0 }}
  animate={{ y: 0, opacity: 1 }}
  transition={{ duration: 0.6 }}
>
  Content
</motion.div>
```

#### After (CSS):
```tsx
<div className="animate-slide-up">
  Content
</div>
```

### **3. Hover Effects**

#### Before (Framer Motion):
```tsx
<motion.button
  whileHover={{ scale: 1.05 }}
  whileTap={{ scale: 0.98 }}
  transition={{ duration: 0.2 }}
>
  Button
</motion.button>
```

#### After (CSS):
```tsx
<button className="animate-scale-button">
  Button
</button>
```

### **4. Staggered Children**

#### Before (Framer Motion):
```tsx
<motion.div variants={containerVariants}>
  {items.map((item, i) => (
    <motion.div key={i} variants={itemVariants}>
      {item}
    </motion.div>
  ))}
</motion.div>
```

#### After (CSS):
```tsx
<div className="animate-stagger">
  {items.map((item, i) => (
    <div key={i}>{item}</div>
  ))}
</div>
```

### **5. Accordion/Toggle**

#### Before (Framer Motion):
```tsx
<AnimatePresence>
  {isOpen && (
    <motion.div
      initial={{ height: 0, opacity: 0 }}
      animate={{ height: "auto", opacity: 1 }}
      exit={{ height: 0, opacity: 0 }}
      transition={{ duration: 0.3 }}
    >
      Content
    </motion.div>
  )}
</AnimatePresence>
```

#### After (CSS):
```tsx
<div 
  className={`accordion-content ${isOpen ? 'open' : ''}`}
  style={{
    maxHeight: isOpen ? '1000px' : '0',
    transition: 'max-height 0.3s ease, opacity 0.3s ease',
    overflow: 'hidden',
    opacity: isOpen ? 1 : 0
  }}
>
  Content
</div>
```

### **6. Scale with Shadow**

#### Before (Framer Motion):
```tsx
<motion.div
  whileHover={{ 
    scale: 1.05,
    boxShadow: "0 10px 20px rgba(0,0,0,0.1)"
  }}
>
  Card
</motion.div>
```

#### After (CSS):
```tsx
<div className="animate-scale-hover animate-shadow-lift">
  Card
</div>
```

## 🎯 When to Keep Framer Motion

### **Complex Animations** (Keep Framer Motion):

1. **Scroll-triggered Animations**
```tsx
// Keep this - requires useScroll and useTransform
const { scrollYProgress } = useScroll();
const y = useTransform(scrollYProgress, [0, 1], [0, -100]);
```

2. **Complex State Sequences**
```tsx
// Keep this - complex orchestration
const controls = useAnimation();
useEffect(() => {
  controls.start("visible");
}, []);
```

3. **Physics-based Springs**
```tsx
// Keep this - natural physics
<motion.div
  animate={{ x: 100 }}
  transition={{ type: "spring", stiffness: 300, damping: 30 }}
>
```

4. **Gesture-based Interactions**
```tsx
// Keep this - complex drag behavior
<motion.div
  drag="x"
  dragConstraints={{ left: 0, right: 300 }}
  onDragEnd={(event, info) => {}}
>
```

## 🛠️ Migration Strategy

### **Phase 1: Low Risk Components**
- Buttons with simple hover effects
- Basic fade-in animations
- Simple scale interactions
- Basic accordions

### **Phase 2: Medium Complexity**
- Product cards with combined effects
- Hero sections with staggered content
- Tab transitions
- Modal enter/exit

### **Phase 3: Keep Complex**
- Scroll parallax effects
- Complex gesture interactions
- Multi-step form animations
- Advanced physics simulations

## 📊 Performance Benefits

### **Bundle Size Reduction**
- **Simple Button**: 50KB → 0KB (pure CSS)
- **Accordion**: 30KB → 0KB (CSS transition)
- **Product Card**: 60KB → 0KB (CSS hover)

### **Runtime Performance**
- **CSS animations**: GPU accelerated
- **No JavaScript overhead**: Direct browser optimization
- **Better mobile performance**: Lower battery usage

## 🔧 Implementation Tips

### **1. Use CSS Custom Properties**
```css
:root {
  --animation-duration: 0.3s;
  --animation-timing: ease-out;
}

.custom-animation {
  transition: transform var(--animation-duration) var(--animation-timing);
}
```

### **2. Combine with Intersection Observer**
```tsx
// Use the custom hook for revealing animations
const { ref, isInView } = useInView();

return (
  <div ref={ref} className={`reveal ${isInView ? 'visible' : ''}`}>
    Content
  </div>
);
```

### **3. Progressive Enhancement**
```tsx
// Start with CSS, add JS for complex interactions
<div className="animate-on-hover js-enhanced">
  <button onclick="enhanceAnimation()">Click me</button>
</div>
```

## ✅ Migration Checklist

### **Before Starting**
- [ ] Audit all Framer Motion usage
- [ ] Categorize by complexity
- [ ] Create performance baseline

### **During Migration**
- [ ] Convert simple animations first
- [ ] Test on multiple devices
- [ ] Maintain visual parity
- [ ] Monitor bundle size

### **After Migration**
- [ ] Performance testing
- [ ] Accessibility verification
- [ ] User experience validation
- [ ] Documentation updates

## 📈 Success Metrics

### **Technical**
- 60%+ reduction in animation-related bundle size
- Improved First Contentful Paint
- Better Core Web Vitals scores
- Reduced JavaScript execution time

### **User Experience**
- Maintained animation quality
- Improved performance on slower devices
- Better battery life on mobile
- Smoother scrolling experience

## 🚨 Common Pitfalls

### **1. Hardware Acceleration**
```css
/* Ensure GPU acceleration */
.animate-transform {
  will-change: transform;
  transform: translateZ(0); /* Force hardware acceleration */
}
```

### **2. Accessibility**
```css
/* Respect user preferences */
@media (prefers-reduced-motion: reduce) {
  * {
    animation-duration: 0.01ms !important;
    transition-duration: 0.01ms !important;
  }
}
```

### **3. Performance Monitoring**
```javascript
// Monitor performance impact
const observer = new PerformanceObserver((list) => {
  for (const entry of list.getEntries()) {
    console.log('Animation performance:', entry);
  }
});
observer.observe({ entryTypes: ['measure'] });
```

## 🔗 Resources

- [CSS Animation Performance](https://web.dev/animations/)
- [Hardware Acceleration Guide](https://www.smashingmagazine.com/2016/12/gpu-animation-doing-it-right/)
- [Accessibility Best Practices](https://developer.mozilla.org/en-US/docs/Web/CSS/@media/prefers-reduced-motion)

## 📝 Migration Tracking

| Component | Complexity | Status | Bundle Savings |
|-----------|------------|--------|----------------|
| CTAButton | Simple | ✅ Complete | ~50KB |
| Accordion | Simple | ✅ Complete | ~30KB |
| ProductCard | Medium | 🔄 In Progress | ~60KB |
| HeroSection | Medium | ⏳ Planned | ~40KB |
| ScrollEffects | Complex | ❌ Keep Framer | N/A |

---

**Remember**: The goal is to optimize performance while maintaining the user experience. Start with simple animations and gradually work up to more complex ones. Always test the results and measure the performance impact.
