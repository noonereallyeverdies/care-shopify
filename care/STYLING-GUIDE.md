# care•atin Styling Guide

This document provides guidelines for maintaining consistent styling and brand identity across the care•atin website. Following these guidelines will ensure a cohesive user experience and strengthen the brand.

## Brand Typography

We use a combination of serif and sans-serif fonts to convey a premium yet approachable feel:

- **Headings**: Use `brand-heading` class for all headings (h1-h6)
  - Font family: 'New York', 'IBMPlexSerif', 'Palatino'
  - Font weight: Light (300)
  - Capitalization: lowercase
  - Tracking: tight

- **Body Text**: Use `brand-body` class for all paragraph text
  - Font family: 'SF Pro Display', 'Inter', sans-serif
  - Font weight: Normal (400)
  - Line height: Relaxed

- **Brand Dot**: Use `brand-dot` class for the interpunct in "care•atin"
  - Color: rose-500 (#f43f5e)
  - Size: text-sm
  - Position: align-text-top

Example:
```jsx
<h2 className="brand-heading">your 90-day transformation</h2>
<p className="brand-body">care<span className="brand-dot">•</span>atin helps you achieve healthier hair</p>
```

## Color Palette

- **Primary Brand Color**: rose-500 (#f43f5e)
- **Primary Text**: neutral-800 (#262626)
- **Secondary Text**: neutral-600 (#525252)
- **Tertiary Text**: neutral-500 (#737373)
- **Background Colors**:
  - Main: white (#ffffff)
  - Contrast: neutral-50 (#fafafa)
  - Dark: neutral-900 (#171717)

## Component Library

We've created standardized components to maintain consistency:

### Button

Use the `Button` and `ButtonLink` components from `~/components/ui/buttons/Button.tsx`:

```jsx
// Regular button
<Button variant="primary" size="md">Click Me</Button>

// Link styled as button
<ButtonLink variant="outline" to="/products">View Products</ButtonLink>
```

Variants:
- primary (rose background)
- secondary (dark background)
- outline (transparent with border)
- text (text only)

Sizes:
- sm (small)
- md (medium)
- lg (large)

### Card

Use the `Card` component system from `~/components/ui/layouts/Card.tsx`:

```jsx
<Card variant="elevated" padding="md" hoverable>
  <CardHeader>Card Title</CardHeader>
  <CardContent>Card content goes here</CardContent>
  <CardFooter align="between">
    <span>Left aligned text</span>
    <Button>Action</Button>
  </CardFooter>
</Card>
```

Variants:
- default (white with light border)
- outlined (white with rose border)
- elevated (white with shadow)
- flat (light background)

## Layout & Spacing

- Use the `section-spacing` class for consistent vertical spacing between sections
- Use the `container` class for consistent width constraints
- Use the `standard-grid` class for grid layouts with consistent gap values

## Article Styling

For blog articles, ensure the `article.css` stylesheet is imported and the content container has the `article` class:

```jsx
<div 
  dangerouslySetInnerHTML={{__html: contentHtml}}
  className="article prose prose-stone max-w-3xl mx-auto"
/>
```

## Accessibility Guidelines

- Ensure proper heading hierarchy (h1 → h2 → h3) on all pages
- Provide descriptive alt text for all images
- Maintain a color contrast ratio of at least 4.5:1 for text
- Add `aria-label` attributes to links and buttons that don't have visible text
- Use semantic HTML elements whenever possible

## Mobile Responsiveness

- Use mobile-first approach with Tailwind breakpoints
- Ensure touch targets are at least 44×44 pixels
- Test navigation on mobile devices regularly
- Use appropriate text sizes for mobile (minimum 16px)

## Animation Guidelines

- Use the `hover-lift` class for consistent hover effects
- Keep animations subtle and purposeful
- Ensure animations can be disabled for users with vestibular disorders

## File Organization

- Component-specific styles should be kept with the component
- Global styles are in `app/styles/app.css`
- Article-specific styles are in `app/styles/article.css`

## Testing Changes

When making styling changes, test across:
- Mobile, tablet, and desktop viewports
- Different browsers (Chrome, Safari, Firefox)
- Dark mode if supported
- Check accessibility with a tool like Lighthouse

By following this guide, we maintain the care•atin brand identity and ensure a consistent, high-quality user experience across all touchpoints. 