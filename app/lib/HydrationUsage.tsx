import { useState, useEffect } from 'react';

/**
 * Hydration Usage Analysis
 * 
 * This utility helps track and analyze component hydration patterns
 * throughout the application, focusing on when and how components are hydrated.
 * 
 * The data collected here can inform progressive hydration strategies
 * and help optimize the application's performance.
 */

// Component categories for analysis
export type ComponentCategory = 
  | 'cart'
  | 'checkout'
  | 'product'
  | 'navigation'
  | 'marketing'
  | 'account'
  | 'search'
  | 'footer'
  | 'header'
  | 'other';

// Hydration event data structure
export interface HydrationEvent {
  componentId: string;
  componentName: string;
  timestamp: number;
  strategy: string;
  category: ComponentCategory;
  renderTime?: number;
  visibleTime?: number;
  interactionTime?: number;
}

// Global storage for hydration events
let hydrationEvents: HydrationEvent[] = [];

/**
 * Log a component hydration event
 */
export function logHydrationEvent(event: HydrationEvent) {
  hydrationEvents.push(event);
  
  // Log in development for debugging
  if (process.env.NODE_ENV === 'development') {
    console.log(`[HydrationAnalysis] Component hydrated: ${event.componentName} (${event.strategy})`);
  }
  
  // Store in localStorage for persistence
  if (typeof window !== 'undefined') {
    try {
      const existingData = localStorage.getItem('hydration-analysis') || '[]';
      const parsedData = JSON.parse(existingData);
      localStorage.setItem('hydration-analysis', JSON.stringify([...parsedData, event]));
    } catch (e) {
      console.error('Failed to store hydration data:', e);
    }
  }
}

/**
 * Get all recorded hydration events
 */
export function getHydrationEvents(): HydrationEvent[] {
  return hydrationEvents;
}

/**
 * Clear all recorded hydration events
 */
export function clearHydrationEvents() {
  hydrationEvents = [];
  if (typeof window !== 'undefined') {
    localStorage.removeItem('hydration-analysis');
  }
}

/**
 * Hook to analyze component usage patterns
 */
export function useHydrationAnalysis(
  componentId: string,
  componentName: string,
  category: ComponentCategory,
  strategy: string
) {
  const [hydrated, setHydrated] = useState(false);
  const [visible, setVisible] = useState(false);
  const [interacted, setInteracted] = useState(false);
  
  // Record hydration time
  useEffect(() => {
    const timestamp = Date.now();
    setHydrated(true);
    
    logHydrationEvent({
      componentId,
      componentName,
      timestamp,
      strategy,
      category,
    });
    
    // Setup visibility tracking
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && !visible) {
          setVisible(true);
          logHydrationEvent({
            componentId,
            componentName,
            timestamp: Date.now(),
            strategy: `${strategy}:visible`,
            category,
            visibleTime: Date.now() - timestamp,
          });
        }
      },
      { threshold: 0.1 }
    );
    
    // Get the element to observe
    const element = document.getElementById(componentId);
    if (element) {
      observer.observe(element);
    }
    
    return () => {
      if (element) {
        observer.unobserve(element);
      }
    };
  }, [componentId, componentName, category, strategy, visible]);
  
  // Function to track interactions
  const trackInteraction = () => {
    if (!interacted) {
      setInteracted(true);
      const initialEvent = hydrationEvents.find(e => e.componentId === componentId);
      const initialTimestamp = initialEvent?.timestamp || Date.now();
      
      logHydrationEvent({
        componentId,
        componentName,
        timestamp: Date.now(),
        strategy: `${strategy}:interaction`,
        category,
        interactionTime: Date.now() - initialTimestamp,
      });
    }
  };
  
  return {
    trackInteraction,
    hydrated,
    visible,
    interacted,
  };
}

/**
 * Analyze hydration data and provide optimization recommendations
 */
export function analyzeHydrationData() {
  const events = getHydrationEvents();
  
  // Group by category
  const byCategory = events.reduce((acc, event) => {
    acc[event.category] = acc[event.category] || [];
    acc[event.category].push(event);
    return acc;
  }, {} as Record<ComponentCategory, HydrationEvent[]>);
  
  // Identify components that were hydrated but never viewed
  const wastedHydrations = events.filter(
    e => e.strategy.includes('onMount') && !events.some(
      e2 => e2.componentId === e.componentId && e2.strategy.includes('visible')
    )
  );
  
  // Identify components with delayed interaction needs
  const delayedInteractions = events.filter(
    e => e.interactionTime && e.interactionTime > 5000
  );
  
  return {
    byCategory,
    wastedHydrations,
    delayedInteractions,
    totalEvents: events.length,
    recommendations: {
      deferHydration: wastedHydrations.map(e => e.componentName),
      earlyHydration: events
        .filter(e => e.interactionTime && e.interactionTime < 1000)
        .map(e => e.componentName),
      interactionHydration: delayedInteractions.map(e => e.componentName),
    }
  };
} 