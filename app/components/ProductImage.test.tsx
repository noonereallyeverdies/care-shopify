import {render, screen} from '@testing-library/react';
import {ProductImage} from '~/components/ProductImage';
import {describe, it, expect, vi} from 'vitest';

describe('ProductImage Component', () => {
  const mockImage = {
    url: 'https://example.com/image.jpg',
    altText: 'Product image',
    width: 800,
    height: 600,
  };

  it('renders with proper image attributes', () => {
    render(<ProductImage image={mockImage} />);
    
    const image = screen.getByRole('img');
    expect(image).toHaveAttribute('src', mockImage.url);
    expect(image).toHaveAttribute('alt', mockImage.altText);
    expect(image).toHaveAttribute('width', mockImage.width.toString());
    expect(image).toHaveAttribute('height', mockImage.height.toString());
  });

  it('uses defaults when dimensions are missing', () => {
    const imageMissingDimensions = {
      url: 'https://example.com/image.jpg',
      altText: 'Product image',
      // No width or height
    };
    
    render(<ProductImage image={imageMissingDimensions} />);
    
    const image = screen.getByRole('img');
    expect(image).toHaveAttribute('width', '800'); // Default width
    expect(image).toHaveAttribute('height', '800'); // Default height
  });

  it('uses empty alt text when altText is missing', () => {
    const imageMissingAlt = {
      url: 'https://example.com/image.jpg',
      width: 800,
      height: 600,
      // No altText
    };
    
    render(<ProductImage image={imageMissingAlt} />);
    
    const image = screen.getByRole('img');
    expect(image).toHaveAttribute('alt', '');
  });

  it('applies loading attribute correctly based on isAboveFold prop', () => {
    // Test with isAboveFold=true
    render(<ProductImage image={mockImage} isAboveFold={true} />);
    let image = screen.getByRole('img');
    expect(image).toHaveAttribute('loading', 'eager');
    
    // Cleanup and re-render with isAboveFold=false
    screen.unmount();
    render(<ProductImage image={mockImage} isAboveFold={false} />);
    image = screen.getByRole('img');
    expect(image).toHaveAttribute('loading', 'lazy');
    
    // Cleanup and re-render with default isAboveFold (should be false)
    screen.unmount();
    render(<ProductImage image={mockImage} />);
    image = screen.getByRole('img');
    expect(image).toHaveAttribute('loading', 'lazy');
  });

  it('applies custom className when provided', () => {
    const customClass = 'custom-image-class';
    render(<ProductImage image={mockImage} className={customClass} />);
    
    const image = screen.getByRole('img');
    expect(image).toHaveClass(customClass);
  });

  it('applies sizes attribute correctly', () => {
    const customSizes = '(min-width: 1024px) 33vw, 100vw';
    render(<ProductImage image={mockImage} sizes={customSizes} />);
    
    const image = screen.getByRole('img');
    expect(image).toHaveAttribute('sizes', customSizes);
  });

  it('uses default sizes when not provided', () => {
    render(<ProductImage image={mockImage} />);
    
    const image = screen.getByRole('img');
    expect(image).toHaveAttribute('sizes', '(min-width: 768px) 50vw, 100vw');
  });
});
