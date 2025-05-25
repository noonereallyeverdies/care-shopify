# Section Layout Guidelines

This guide provides best practices for maintaining consistent layouts across all sections of the website.

## Common Issues

- Text alignment inconsistencies
- Responsive spacing issues
- Improper content width constraints
- Animation positioning problems

## Solutions

We've implemented several components to standardize layouts across the site:

### SectionContainer

Use this wrapper for all section components to ensure consistent padding, positioning, and animation.

```tsx
import { SectionContainer } from '~/components/ui/SectionContainer';

export function MySection() {
  return (
    <SectionContainer bgColor="bg-white">
      {/* Section content */}
    </SectionContainer>
  );
}
```

**Props:**
- `bgColor`: Background color class (default: "bg-white")
- `className`: Additional classes
- `withContainer`: Whether to include a container div (default: true)
- `animate`: Whether to add fade-in animation (default: true)
- `maxWidth`: Container max-width (default: "max-w-7xl")

### SectionHeadingContainer

Use this for section headings to ensure consistent spacing and centering.

```tsx
<SectionHeadingContainer maxWidth="max-w-2xl">
  <h2 className="text-3xl md:text-4xl font-serif font-light lowercase">
    Section Title
  </h2>
  <p className="text-lg md:text-xl text-neutral-700 leading-relaxed">
    Section description text goes here.
  </p>
</SectionHeadingContainer>
```

**Props:**
- `className`: Additional classes
- `maxWidth`: Content max-width (default: "max-w-3xl")

### EnhancedSectionHeading

For sections that use the SectionHeading component, use the EnhancedSectionHeading which automatically wraps it in a SectionHeadingContainer.

```tsx
<EnhancedSectionHeading
  title="Section Title"
  subtitle="This subtitle will be properly centered with consistent styling"
  maxWidth="max-w-3xl"
/>
```

**Props:**
- All props from SectionHeading
- `maxWidth`: Content max-width for the container (default: "max-w-3xl")
- `containerClassName`: Additional classes for the container

### ScrollContainer

Use this for elements with scroll-triggered animations to ensure proper positioning.

```tsx
import { ScrollContainer } from '~/components/ui/ScrollContainer';

<ScrollContainer>
  <motion.div whileInView={{ opacity: 1 }}>
    {/* Animated content */}
  </motion.div>
</ScrollContainer>
```

## Best Practices

1. Always use `SectionContainer` for outer section wrappers
2. Use `SectionHeadingContainer` for title/description areas
3. Set appropriate `maxWidth` constraints based on content needs
4. Use responsive classes (sm:, md:, lg:) for adaptive layouts
5. Ensure text-heavy sections have readable line lengths (max-w-xl to max-w-3xl)
6. Wrap scroll-triggered animations in `ScrollContainer` or add `position: relative`

## Troubleshooting Section Headers

### Common Subheader Issues

If subheaders appear misaligned or not properly centered:

1. **Use EnhancedSectionHeading**: Replace direct `SectionHeading` usage with `EnhancedSectionHeading`
2. **Set Appropriate Width**: Use `maxWidth="max-w-3xl"` (or another appropriate width)
3. **Check Container Alignment**: Ensure parent containers don't override text alignment
4. **Responsive Adjustments**: Use different widths for different screen sizes if needed

### Example Before/After

**Before (Problematic):**
```tsx
<section>
  <SectionHeading
    title="Section Title"
    subtitle="This subtitle might not be properly centered"
  />
</section>
```

**After (Fixed):**
```tsx
<SectionContainer>
  <EnhancedSectionHeading
    title="Section Title"
    subtitle="This subtitle will be properly centered with consistent width"
    maxWidth="max-w-3xl"
  />
</SectionContainer>
```

## Troubleshooting

If you encounter layout issues:

1. Check if the section uses our container components
2. Verify proper max-width constraints are applied
3. Ensure margins are balanced (mx-auto for centered content)
4. For animation issues, check if the container has position: relative
5. Test across all viewport sizes to ensure responsive behavior 