/**
 * Mobile Navigation Component
 * 
 * A thumb-friendly mobile navigation component that follows the natural
 * ergonomics of one-handed phone use. This component ensures all primary
 * actions are in the "safe" thumb zone and includes haptic feedback.
 */

class MobileNavigation {
  constructor(options = {}) {
    // Configuration with defaults
    this.config = {
      containerId: options.containerId || 'mobile-nav-container',
      activeItem: options.activeItem || 0,
      showLabels: options.showLabels || true,
      enableHaptic: options.enableHaptic || true,
      quizButtonText: options.quizButtonText || 'Take the Quiz',
      accentColor: options.accentColor || '#d23',
      navigationItems: options.navigationItems || [
        { icon: 'home', label: 'Home', link: '#home' },
        { icon: 'science', label: 'Science', link: '#science' },
        { icon: 'quiz', label: 'Quiz', link: '#quiz' },
        { icon: 'results', label: 'Results', link: '#results' },
        { icon: 'shop', label: 'Shop', link: '#shop' }
      ]
    };

    // State
    this.state = {
      isVisible: true,
      lastScrollY: 0,
      hideOnScrollDown: true,
      activeItem: this.config.activeItem
    };

    // Bind methods
    this.onScroll = this.onScroll.bind(this);
    this.onNavItemClick = this.onNavItemClick.bind(this);
    this.triggerHaptic = this.triggerHaptic.bind(this);
  }

  /**
   * Initialize the navigation
   */
  init() {
    // Find container
    this.container = document.getElementById(this.config.containerId);
    if (!this.container) {
      console.error(`Navigation container #${this.config.containerId} not found.`);
      return;
    }

    // Create navigation elements
    this.render();

    // Setup event listeners
    window.addEventListener('scroll', this.onScroll);
    this.navItems = this.container.querySelectorAll('.nav-item');
    this.navItems.forEach((item, index) => {
      item.addEventListener('click', (e) => this.onNavItemClick(e, index));
    });

    this.quizButton = this.container.querySelector('.quiz-button');
    if (this.quizButton) {
      this.quizButton.addEventListener('click', () => {
        this.triggerHaptic('medium');
      });
    }
  }

  /**
   * Render the navigation UI
   */
  render() {
    // Create SVG icon definitions
    const icons = {
      home: '<svg xmlns="http://www.w3.org/2000/svg" height="24" viewBox="0 0 24 24" width="24"><path d="M0 0h24v24H0z" fill="none"/><path d="M10 20v-6h4v6h5v-8h3L12 3 2 12h3v8z"/></svg>',
      science: '<svg xmlns="http://www.w3.org/2000/svg" height="24" viewBox="0 0 24 24" width="24"><path d="M0 0h24v24H0z" fill="none"/><path d="M19.8 18.4L14 10.67V6.5l1.35-1.69c.26-.33.03-.81-.39-.81H9.04c-.42 0-.65.48-.39.81L10 6.5v4.17L4.2 18.4c-.26.33-.03.81.39.81h14.82c.42 0 .65-.48.39-.81zM7 9.67V8.5h10v1.17l2 2.53V8.5C19 6.57 17.43 5 15.5 5h-7C6.57 5 5 6.57 5 8.5v3.7l2-2.53z"/></svg>',
      quiz: '<svg xmlns="http://www.w3.org/2000/svg" height="24" viewBox="0 0 24 24" width="24"><path d="M0 0h24v24H0z" fill="none"/><path d="M11 18h2v-2h-2v2zm1-16C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zm0-14c-2.21 0-4 1.79-4 4h2c0-1.1.9-2 2-2s2 .9 2 2c0 2-3 1.75-3 5h2c0-2.25 3-2.5 3-5 0-2.21-1.79-4-4-4z"/></svg>',
      results: '<svg xmlns="http://www.w3.org/2000/svg" height="24" viewBox="0 0 24 24" width="24"><path d="M0 0h24v24H0z" fill="none"/><path d="M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zM9 17H7v-7h2v7zm4 0h-2V7h2v10zm4 0h-2v-4h2v4z"/></svg>',
      shop: '<svg xmlns="http://www.w3.org/2000/svg" height="24" viewBox="0 0 24 24" width="24"><path d="M0 0h24v24H0z" fill="none"/><path d="M7 18c-1.1 0-1.99.9-1.99 2S5.9 22 7 22s2-.9 2-2-.9-2-2-2zM1 2v2h2l3.6 7.59-1.35 2.45c-.16.28-.25.61-.25.96 0 1.1.9 2 2 2h12v-2H7.42c-.14 0-.25-.11-.25-.25l.03-.12.9-1.63h7.45c.75 0 1.41-.41 1.75-1.03l3.58-6.49c.08-.14.12-.31.12-.48 0-.55-.45-1-1-1H5.21l-.94-2H1zm16 16c-1.1 0-1.99.9-1.99 2s.89 2 1.99 2 2-.9 2-2-.9-2-2-2z"/></svg>'
    };

    // Create navigation HTML
    this.container.innerHTML = `
      <div class="mobile-nav-wrapper">
        <div class="mobile-nav mobile-nav-fixed bottom-safe-area">
          <div class="nav-items">
            ${this.config.navigationItems.map((item, index) => `
              <a href="${item.link}" class="nav-item ${index === this.state.activeItem ? 'active' : ''} touch-target">
                <div class="nav-icon">${icons[item.icon] || icons.home}</div>
                ${this.config.showLabels ? `<div class="nav-label">${item.label}</div>` : ''}
              </a>
            `).join('')}
          </div>
          <div class="quiz-button-container thumb-zone-safe">
            <a href="#quiz" class="quiz-button touch-target touch-target-lg">
              ${this.config.quizButtonText}
            </a>
          </div>
        </div>
      </div>
    `;

    // Add styling
    const style = document.createElement('style');
    style.textContent = `
      .mobile-nav-wrapper {
        height: 64px; /* Fixed height to maintain layout when nav is hidden */
      }
      
      .mobile-nav {
        background-color: #fff;
        box-shadow: 0 -4px 10px rgba(0, 0, 0, 0.07);
        transition: transform 0.3s ease;
      }
      
      .mobile-nav.hidden {
        transform: translateY(100%);
      }
      
      .nav-items {
        display: flex;
        justify-content: space-between;
        width: 100%;
        max-width: 480px;
        margin: 0 auto;
      }
      
      .nav-item {
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        color: #555;
        text-decoration: none;
        padding: 8px 0;
        transition: color 0.2s ease;
        flex: 1;
      }
      
      .nav-item.active {
        color: ${this.config.accentColor};
      }
      
      .nav-icon {
        height: 24px;
        width: 24px;
        display: flex;
        align-items: center;
        justify-content: center;
        margin-bottom: 4px;
      }
      
      .nav-icon svg {
        fill: currentColor;
      }
      
      .nav-label {
        font-size: 10px;
        font-weight: 500;
        text-transform: uppercase;
        letter-spacing: 0.5px;
      }
      
      .quiz-button-container {
        position: absolute;
        left: 50%;
        top: 0;
        transform: translate(-50%, -50%);
      }
      
      .quiz-button {
        background-color: ${this.config.accentColor};
        color: white;
        border-radius: 24px;
        padding: 12px 24px;
        font-size: 14px;
        font-weight: 600;
        text-decoration: none;
        box-shadow: 0 4px 12px rgba(210, 34, 51, 0.3);
        transition: transform 0.2s ease, box-shadow 0.2s ease;
        transform-origin: center bottom;
        z-index: 1001;
      }
      
      .quiz-button:active {
        transform: translate(-50%, -48%) scale(0.97);
        box-shadow: 0 2px 8px rgba(210, 34, 51, 0.3);
      }
      
      /* Only show when mobile */
      @media (min-width: 992px) {
        .mobile-nav-wrapper {
          display: none;
        }
      }
    `;
    document.head.appendChild(style);
  }

  /**
   * Handle scroll event to show/hide navigation
   */
  onScroll() {
    if (!this.state.hideOnScrollDown) return;
    
    const currentScrollY = window.scrollY;
    const mobileNav = this.container.querySelector('.mobile-nav');
    
    if (currentScrollY > this.state.lastScrollY + 50) {
      // Scrolling down - hide navigation
      if (this.state.isVisible) {
        this.state.isVisible = false;
        mobileNav.classList.add('hidden');
      }
    } else if (currentScrollY < this.state.lastScrollY - 10) {
      // Scrolling up - show navigation
      if (!this.state.isVisible) {
        this.state.isVisible = true;
        mobileNav.classList.remove('hidden');
      }
    }
    
    this.state.lastScrollY = currentScrollY;
  }

  /**
   * Handle navigation item click
   */
  onNavItemClick(e, index) {
    // Update active state
    this.state.activeItem = index;
    
    this.navItems.forEach((item, i) => {
      if (i === index) {
        item.classList.add('active');
      } else {
        item.classList.remove('active');
      }
    });
    
    // Trigger haptic feedback
    this.triggerHaptic('light');
  }

  /**
   * Trigger haptic feedback if available
   * @param {string} intensity - 'light', 'medium', or 'heavy'
   */
  triggerHaptic(intensity = 'light') {
    if (!this.config.enableHaptic) return;
    
    // Check for Navigator Vibrate API support
    if (navigator.vibrate) {
      switch (intensity) {
        case 'light':
          navigator.vibrate(10);
          break;
        case 'medium':
          navigator.vibrate(25);
          break;
        case 'heavy':
          navigator.vibrate([15, 10, 30]);
          break;
        default:
          navigator.vibrate(10);
      }
    }
  }

  /**
   * Set active navigation item
   * @param {number} index - Index of the item to set active
   */
  setActiveItem(index) {
    if (index >= 0 && index < this.navItems.length) {
      this.onNavItemClick(null, index);
    }
  }

  /**
   * Show/hide the navigation
   * @param {boolean} visible - Whether the navigation should be visible
   */
  setVisible(visible) {
    this.state.isVisible = visible;
    const mobileNav = this.container.querySelector('.mobile-nav');
    
    if (visible) {
      mobileNav.classList.remove('hidden');
    } else {
      mobileNav.classList.add('hidden');
    }
  }

  /**
   * Enable/disable auto-hide on scroll
   * @param {boolean} enable - Whether to enable auto-hide
   */
  setAutoHide(enable) {
    this.state.hideOnScrollDown = enable;
    
    if (!enable) {
      this.setVisible(true);
    }
  }

  /**
   * Cleanup method
   */
  destroy() {
    window.removeEventListener('scroll', this.onScroll);
    
    this.navItems.forEach(item => {
      item.removeEventListener('click', this.onNavItemClick);
    });
    
    if (this.quizButton) {
      this.quizButton.removeEventListener('click', this.triggerHaptic);
    }
  }
}

// Usage:
// const mobileNav = new MobileNavigation({
//   containerId: 'mobile-nav',
//   activeItem: 0,
//   quizButtonText: 'Hair Quiz'
// });
// mobileNav.init();

export default MobileNavigation; 