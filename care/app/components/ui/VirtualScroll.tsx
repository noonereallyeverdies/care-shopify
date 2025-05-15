import React, {
  useState,
  useEffect,
  useRef,
  useCallback,
  useMemo,
  CSSProperties,
} from 'react';
import { cn } from '~/lib/utils';

interface VirtualScrollProps<T> {
  /** Array of items to virtualize */
  items: T[];
  /** Height of each item in pixels */
  itemHeight: number;
  /** Height of the container in pixels */
  containerHeight: number;
  /** Function to render each item */
  renderItem: (item: T, index: number) => React.ReactNode;
  /** Number of items to render outside viewport (buffer) */
  overscan?: number;
  /** CSS class for container */
  className?: string;
  /** CSS class for each item wrapper */
  itemClassName?: string;
  /** Callback when scroll position changes */
  onScroll?: (scrollTop: number) => void;
  /** Whether to use native scrolling or custom */
  useNativeScroll?: boolean;
  /** Dynamic height calculation */
  estimateHeight?: (index: number, item: T) => number;
  /** Whether items have dynamic heights */
  dynamicHeight?: boolean;
  /** Loading indicator */
  loading?: boolean;
  /** Empty state component */
  emptyState?: React.ReactNode;
  /** Error state component */
  errorState?: React.ReactNode;
  /** Whether to enable horizontal scrolling */
  horizontal?: boolean;
  /** Width for horizontal scrolling */
  itemWidth?: number;
  /** Container width for horizontal scrolling */
  containerWidth?: number;
}

interface ItemPosition {
  index: number;
  start: number;
  size: number;
  end: number;
}

/**
 * VirtualScroll Component
 * 
 * Efficient virtualization for large lists by only rendering visible items.
 * Features:
 * - Fixed and dynamic height support
 * - Horizontal and vertical scrolling
 * - Configurable overscan for smooth scrolling
 * - TypeScript support with generics
 * - Memory efficient for thousands of items
 * - Smooth scrolling with buffer zones
 */
export function VirtualScroll<T>({
  items,
  itemHeight,
  containerHeight,
  renderItem,
  overscan = 5,
  className,
  itemClassName,
  onScroll,
  useNativeScroll = true,
  estimateHeight,
  dynamicHeight = false,
  loading = false,
  emptyState,
  errorState,
  horizontal = false,
  itemWidth,
  containerWidth,
}: VirtualScrollProps<T>) {
  const [scrollOffset, setScrollOffset] = useState(0);
  const [itemPositions, setItemPositions] = useState<ItemPosition[]>([]);
  const [measuredHeights, setMeasuredHeights] = useState<Map<number, number>>(
    new Map()
  );
  
  const containerRef = useRef<HTMLDivElement>(null);
  const itemRefs = useRef<Map<number, HTMLDivElement>>(new Map());

  // Calculate item positions for dynamic heights
  const updateItemPositions = useCallback(() => {
    if (!dynamicHeight && !estimateHeight) {
      // Fixed height - simple calculation
      const positions: ItemPosition[] = items.map((_, index) => ({
        index,
        start: index * itemHeight,
        size: itemHeight,
        end: (index + 1) * itemHeight,
      }));
      setItemPositions(positions);
      return;
    }

    // Dynamic height - calculate based on measured or estimated heights
    const positions: ItemPosition[] = [];
    let currentOffset = 0;

    items.forEach((item, index) => {
      const measuredHeight = measuredHeights.get(index);
      const height = measuredHeight || 
                   estimateHeight?.(index, item) || 
                   itemHeight;

      positions.push({
        index,
        start: currentOffset,
        size: height,
        end: currentOffset + height,
      });

      currentOffset += height;
    });

    setItemPositions(positions);
  }, [items, itemHeight, dynamicHeight, estimateHeight, measuredHeights]);

  // Update positions when items or heights change
  useEffect(() => {
    updateItemPositions();
  }, [updateItemPositions]);

  // Total size calculation
  const totalSize = useMemo(() => {
    if (itemPositions.length === 0) return 0;
    return itemPositions[itemPositions.length - 1].end;
  }, [itemPositions]);

  // Find visible range
  const visibleRange = useMemo(() => {
    if (itemPositions.length === 0) return { start: 0, end: 0 };

    const containerSize = horizontal ? containerWidth! : containerHeight;
    const start = scrollOffset;
    const end = scrollOffset + containerSize;

    let startIndex = 0;
    let endIndex = items.length - 1;

    // Binary search for start index
    let low = 0;
    let high = itemPositions.length - 1;
    while (low <= high) {
      const mid = Math.floor((low + high) / 2);
      const position = itemPositions[mid];
      if (position.end <= start) {
        low = mid + 1;
      } else {
        high = mid - 1;
        startIndex = mid;
      }
    }

    // Binary search for end index
    low = startIndex;
    high = itemPositions.length - 1;
    while (low <= high) {
      const mid = Math.floor((low + high) / 2);
      const position = itemPositions[mid];
      if (position.start < end) {
        low = mid + 1;
        endIndex = mid;
      } else {
        high = mid - 1;
      }
    }

    // Apply overscan
    const overscanStart = Math.max(0, startIndex - overscan);
    const overscanEnd = Math.min(items.length - 1, endIndex + overscan);

    return { start: overscanStart, end: overscanEnd };
  }, [
    itemPositions,
    scrollOffset,
    containerHeight,
    containerWidth,
    horizontal,
    items.length,
    overscan,
  ]);

  // Handle scroll events
  const handleScroll = useCallback(
    (event: React.UIEvent<HTMLDivElement>) => {
      const scrollTop = event.currentTarget.scrollTop;
      const scrollLeft = event.currentTarget.scrollLeft;
      const newOffset = horizontal ? scrollLeft : scrollTop;
      
      setScrollOffset(newOffset);
      onScroll?.(newOffset);
    },
    [horizontal, onScroll]
  );

  // Measure item height after render (for dynamic heights)
  const measureItem = useCallback(
    (index: number, element: HTMLDivElement) => {
      if (!dynamicHeight) return;

      const rect = element.getBoundingClientRect();
      const height = horizontal ? rect.width : rect.height;
      
      setMeasuredHeights((prev) => {
        const next = new Map(prev);
        next.set(index, height);
        return next;
      });
    },
    [dynamicHeight, horizontal]
  );

  // Ref callback for measuring items
  const setItemRef = useCallback(
    (index: number) => (element: HTMLDivElement | null) => {
      if (element) {
        itemRefs.current.set(index, element);
        measureItem(index, element);
      } else {
        itemRefs.current.delete(index);
      }
    },
    [measureItem]
  );

  // Calculate styles
  const containerStyle: CSSProperties = {
    height: horizontal ? '100%' : containerHeight,
    width: horizontal ? containerWidth : '100%',
    overflow: 'auto',
    position: 'relative',
  };

  const innerStyle: CSSProperties = horizontal
    ? {
        height: '100%',
        width: totalSize,
        position: 'relative',
      }
    : {
        height: totalSize,
        width: '100%',
        position: 'relative',
      };

  // Loading state
  if (loading) {
    return (
      <div
        className={cn('flex items-center justify-center', className)}
        style={{ height: containerHeight }}
      >
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900" />
      </div>
    );
  }

  // Empty state
  if (items.length === 0 && emptyState) {
    return (
      <div
        className={cn('flex items-center justify-center', className)}
        style={{ height: containerHeight }}
      >
        {emptyState}
      </div>
    );
  }

  // Error state
  if (errorState) {
    return (
      <div
        className={cn('flex items-center justify-center', className)}
        style={{ height: containerHeight }}
      >
        {errorState}
      </div>
    );
  }

  // Render visible items
  const visibleItems = [];
  for (let i = visibleRange.start; i <= visibleRange.end; i++) {
    const item = items[i];
    const position = itemPositions[i];
    
    if (!item || !position) continue;

    const itemStyle: CSSProperties = horizontal
      ? {
          position: 'absolute',
          left: position.start,
          width: position.size,
          height: '100%',
        }
      : {
          position: 'absolute',
          top: position.start,
          height: position.size,
          width: '100%',
        };

    visibleItems.push(
      <div
        key={i}
        ref={dynamicHeight ? setItemRef(i) : undefined}
        style={itemStyle}
        className={itemClassName}
      >
        {renderItem(item, i)}
      </div>
    );
  }

  return (
    <div
      ref={containerRef}
      style={containerStyle}
      onScroll={handleScroll}
      className={cn('virtual-scroll-container', className)}
    >
      <div style={innerStyle} className="virtual-scroll-inner">
        {visibleItems}
      </div>
    </div>
  );
}

// Hook for virtual scrolling with additional utilities
export function useVirtualScroll<T>({
  items,
  itemHeight,
  containerHeight,
  overscan = 5,
}: Pick<VirtualScrollProps<T>, 'items' | 'itemHeight' | 'containerHeight' | 'overscan'>) {
  const [scrollOffset, setScrollOffset] = useState(0);

  const totalHeight = items.length * itemHeight;
  const startIndex = Math.max(0, Math.floor(scrollOffset / itemHeight) - overscan);
  const endIndex = Math.min(
    items.length - 1,
    Math.floor((scrollOffset + containerHeight) / itemHeight) + overscan
  );
  const visibleItems = items.slice(startIndex, endIndex + 1);

  const scrollToIndex = useCallback(
    (index: number, align: 'start' | 'center' | 'end' = 'start') => {
      let offset = index * itemHeight;
      
      if (align === 'center') {
        offset -= (containerHeight - itemHeight) / 2;
      } else if (align === 'end') {
        offset -= containerHeight - itemHeight;
      }
      
      offset = Math.max(0, Math.min(offset, totalHeight - containerHeight));
      setScrollOffset(offset);
    },
    [itemHeight, containerHeight, totalHeight]
  );

  return {
    scrollOffset,
    setScrollOffset,
    visibleItems,
    startIndex,
    endIndex,
    totalHeight,
    scrollToIndex,
  };
}

// Grid virtualization for 2D layouts
interface VirtualGridProps<T> {
  items: T[];
  itemWidth: number;
  itemHeight: number;
  containerWidth: number;
  containerHeight: number;
  renderItem: (item: T, index: number, row: number, col: number) => React.ReactNode;
  gap?: number;
  overscan?: number;
  className?: string;
}

export function VirtualGrid<T>({
  items,
  itemWidth,
  itemHeight,
  containerWidth,
  containerHeight,
  renderItem,
  gap = 0,
  overscan = 2,
  className,
}: VirtualGridProps<T>) {
  const [scrollTop, setScrollTop] = useState(0);
  const [scrollLeft, setScrollLeft] = useState(0);

  const itemsPerRow = Math.floor(containerWidth / (itemWidth + gap));
  const totalRows = Math.ceil(items.length / itemsPerRow);
  const totalHeight = totalRows * (itemHeight + gap) - gap;
  const totalWidth = itemsPerRow * (itemWidth + gap) - gap;

  const startRow = Math.max(0, Math.floor(scrollTop / (itemHeight + gap)) - overscan);
  const endRow = Math.min(
    totalRows - 1,
    Math.floor((scrollTop + containerHeight) / (itemHeight + gap)) + overscan
  );

  const visibleItems = [];
  for (let row = startRow; row <= endRow; row++) {
    for (let col = 0; col < itemsPerRow; col++) {
      const index = row * itemsPerRow + col;
      if (index >= items.length) break;

      const item = items[index];
      const x = col * (itemWidth + gap);
      const y = row * (itemHeight + gap);

      visibleItems.push(
        <div
          key={index}
          style={{
            position: 'absolute',
            left: x,
            top: y,
            width: itemWidth,
            height: itemHeight,
          }}
        >
          {renderItem(item, index, row, col)}
        </div>
      );
    }
  }

  return (
    <div
      className={cn('virtual-grid-container', className)}
      style={{
        width: containerWidth,
        height: containerHeight,
        overflow: 'auto',
        position: 'relative',
      }}
      onScroll={(e) => {
        setScrollTop(e.currentTarget.scrollTop);
        setScrollLeft(e.currentTarget.scrollLeft);
      }}
    >
      <div
        style={{
          position: 'relative',
          width: totalWidth,
          height: totalHeight,
        }}
      >
        {visibleItems}
      </div>
    </div>
  );
}

// Performance monitoring for virtual scrolling
export class VirtualScrollMonitor {
  private renderCount = 0;
  private scrollEvents = 0;
  private lastFrameTime = 0;
  private frameDrops = 0;

  recordRender(visibleItemCount: number) {
    this.renderCount++;
    
    // Check for frame drops
    const now = performance.now();
    if (this.lastFrameTime > 0 && now - this.lastFrameTime > 32) {
      this.frameDrops++;
    }
    this.lastFrameTime = now;
  }

  recordScroll() {
    this.scrollEvents++;
  }

  getStats() {
    return {
      renderCount: this.renderCount,
      scrollEvents: this.scrollEvents,
      frameDrops: this.frameDrops,
      averageFrameTime: this.lastFrameTime / this.renderCount,
    };
  }

  reset() {
    this.renderCount = 0;
    this.scrollEvents = 0;
    this.frameDrops = 0;
    this.lastFrameTime = 0;
  }
}