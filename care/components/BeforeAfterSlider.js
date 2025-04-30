/**
 * Before/After Slider Component
 * 
 * An interactive slider that allows users to compare before and after results
 * with a draggable divider. This component creates a powerful visual pattern interrupt
 * and provides tangible evidence of results in an editorial-style presentation.
 */

class BeforeAfterSlider {
  constructor(options = {}) {
    // Configuration with defaults
    this.config = {
      containerId: options.containerId || 'before-after-container',
      beforeImage: options.beforeImage || 'images/before.jpg',
      afterImage: options.afterImage || 'images/after.jpg',
      startPosition: options.startPosition || 50, // percent from left
      orientation: options.orientation || 'horizontal', // horizontal or vertical
      showLabels: options.showLabels || true,
      beforeLabel: options.beforeLabel || 'Before',
      afterLabel: options.afterLabel || 'After',
      beforeLabelPosition: options.beforeLabelPosition || 'top-left',
      afterLabelPosition: options.afterLabelPosition || 'top-right',
      showDragHint: options.showDragHint || true,
      dragHintText: options.dragHintText || 'Drag to reveal results',
      showStats: options.showStats || true,
      statsText: options.statsText || '93% of users reported visible improvement after 90 days',
      showAdditionalInfo: options.showAdditionalInfo || true,
      additionalInfoText: options.additionalInfoText || 'Results after 90 days of consistent use. Individual results may vary.'
    };

    // State
    this.state = {
      isDragging: false,
      currentPosition: this.config.startPosition,
      touchStartX: 0,
      touchStartY: 0
    };
  }

  /**
   * Initialize the slider
   */
  init() {
    // Find container
    this.container = document.getElementById(this.config.containerId);
    if (!this.container) {
      console.error(`Slider container #${this.config.containerId} not found.`);
      return;
    }

    // Create slider elements
    this.render();

    // Setup event listeners
    this.setupEventListeners();
  }

  /**
   * Render the slider UI
   */
  render() {
    // Create slider structure
    this.container.innerHTML = `
      <div class="before-after-slider ${this.config.orientation === 'vertical' ? 'vertical' : 'horizontal'}">
        <div class="before-image">
          <img src="${this.config.beforeImage}" alt="Before treatment" />
          ${this.config.showLabels ? `
            <div class="image-label before-label ${this.config.beforeLabelPosition}">
              ${this.config.beforeLabel}
            </div>
          ` : ''}
        </div>
        <div class="after-image">
          <img src="${this.config.afterImage}" alt="After treatment" />
          ${this.config.showLabels ? `
            <div class="image-label after-label ${this.config.afterLabelPosition}">
              ${this.config.afterLabel}
            </div>
          ` : ''}
        </div>
        <div class="slider-handle">
          <div class="handle-line"></div>
          <div class="handle-circle">
            ${this.config.orientation === 'horizontal' ? 
              '<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="9 18 15 12 9 6"></polyline><polyline points="15 18 21 12 15 6"></polyline></svg>' : 
              '<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="6 9 12 15 18 9"></polyline><polyline points="6 15 12 21 18 15"></polyline></svg>'
            }
          </div>
          ${this.config.showDragHint ? `
            <div class="drag-hint">
              ${this.config.dragHintText}
            </div>
          ` : ''}
        </div>
        ${this.config.showStats ? `
          <div class="stats-overlay">
            <div class="stats-text">${this.config.statsText}</div>
          </div>
        ` : ''}
      </div>
      ${this.config.showAdditionalInfo ? `
        <div class="additional-info">
          <p>${this.config.additionalInfoText}</p>
        </div>
      ` : ''}
    `;

    // Add styling
    const style = document.createElement('style');
    style.textContent = `
      .before-after-slider {
        position: relative;
        width: 100%;
        height: 0;
        padding-bottom: 56.25%; /* 16:9 aspect ratio */
        overflow: hidden;
        border-radius: 0; /* Removed border radius for editorial look */
        box-shadow: 0 20px 40px rgba(0,0,0,0.12); /* More sophisticated shadow */
        user-select: none;
        touch-action: none;
        background-color: #000000; /* Black background */
      }
      
      .before-after-slider.vertical {
        padding-bottom: 150%; /* Taller for vertical orientation */
      }
      
      .before-image,
      .after-image {
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        overflow: hidden;
      }
      
      .before-image img,
      .after-image img {
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        object-fit: cover;
        transition: transform 0.3s cubic-bezier(0.25, 0.1, 0.25, 1); /* More refined transition */
      }
      
      .before-after-slider.horizontal .after-image {
        width: ${this.config.startPosition}%;
        overflow: hidden;
      }
      
      .before-after-slider.vertical .after-image {
        height: ${this.config.startPosition}%;
        overflow: hidden;
      }
      
      .slider-handle {
        position: absolute;
        z-index: 10;
        transform: translate(-50%, -50%);
        cursor: pointer;
      }
      
      .before-after-slider.horizontal .slider-handle {
        top: 50%;
        left: ${this.config.startPosition}%;
        height: 100%;
      }
      
      .before-after-slider.vertical .slider-handle {
        left: 50%;
        top: ${this.config.startPosition}%;
        width: 100%;
      }
      
      .handle-line {
        position: absolute;
        background: #FFFFFF; /* White line */
        box-shadow: 0 0 10px rgba(0,0,0,0.15);
      }
      
      .before-after-slider.horizontal .handle-line {
        width: 1px; /* Thinner for elegance */
        height: 100%;
        left: 50%;
        transform: translateX(-50%);
      }
      
      .before-after-slider.vertical .handle-line {
        height: 1px; /* Thinner for elegance */
        width: 100%;
        top: 50%;
        transform: translateY(-50%);
      }
      
      .handle-circle {
        position: absolute;
        width: 36px; /* Slightly smaller */
        height: 36px;
        background: #FF0000; /* Red accent */
        border-radius: 50%;
        display: flex;
        align-items: center;
        justify-content: center;
        color: white;
        transform: translate(-50%, -50%);
        box-shadow: 0 2px 6px rgba(0,0,0,0.2);
        transition: transform 0.2s ease-out;
      }
      
      .before-after-slider.horizontal .handle-circle {
        left: 50%;
        top: 50%;
      }
      
      .before-after-slider.vertical .handle-circle {
        left: 50%;
        top: 50%;
      }
      
      .handle-circle:hover {
        transform: translate(-50%, -50%) scale(1.05);
      }
      
      .image-label {
        position: absolute;
        background-color: rgba(0, 0, 0, 0.7); /* Dark background */
        color: #FFFFFF; /* White text */
        padding: 6px 12px;
        font-size: 12px;
        font-weight: 500;
        letter-spacing: 0.05em; /* Added letter spacing for refinement */
        text-transform: uppercase;
        border-radius: 0; /* Removed border radius */
        z-index: 5;
      }
      
      .before-label {
        background-color: rgba(0, 0, 0, 0.7); /* Dark background */
      }
      
      .after-label {
        background-color: rgba(0, 0, 0, 0.7); /* Dark background */
      }
      
      .top-left {
        top: 16px;
        left: 16px;
      }
      
      .top-right {
        top: 16px;
        right: 16px;
      }
      
      .bottom-left {
        bottom: 16px;
        left: 16px;
      }
      
      .bottom-right {
        bottom: 16px;
        right: 16px;
      }
      
      .drag-hint {
        position: absolute;
        bottom: 16px;
        left: 50%;
        transform: translateX(-50%);
        background-color: rgba(0, 0, 0, 0.8);
        color: white;
        padding: 8px 16px;
        border-radius: 0; /* Removed border radius */
        font-size: 12px;
        font-weight: 500;
        white-space: nowrap;
        opacity: 0.9;
        transition: opacity 0.3s ease-out;
        letter-spacing: 0.05em; /* Refined letter spacing */
      }
      
      .stats-overlay {
        position: absolute;
        top: 0;
        right: 0;
        padding: 16px;
        max-width: 240px;
        z-index: 5;
      }
      
      .stats-text {
        background-color: rgba(255, 0, 0, 0.8); /* Red accent with transparency */
        color: white;
        padding: 12px 16px;
        font-size: 14px;
        line-height: 1.4;
        font-weight: 500;
        border-radius: 0; /* Removed border radius */
        text-align: right;
      }
      
      .additional-info {
        margin-top: 16px;
        text-align: right;
        color: #000000; /* Black text */
        font-size: 12px;
        font-style: italic;
        opacity: 0.7;
      }
      
      /* For mobile screens */
      @media (max-width: 768px) {
        .stats-overlay {
          max-width: 180px;
        }
        
        .stats-text {
          font-size: 12px;
          padding: 8px 12px;
        }
        
        .image-label {
          padding: 4px 8px;
          font-size: 10px;
        }
        
        .handle-circle {
          width: 30px;
          height: 30px;
        }
      }
    `;

    // Append style
    this.container.appendChild(style);

    // Cache DOM references
    this.slider = this.container.querySelector('.before-after-slider');
    this.beforeImage = this.container.querySelector('.before-image');
    this.afterImage = this.container.querySelector('.after-image');
    this.sliderHandle = this.container.querySelector('.slider-handle');
    this.dragHint = this.container.querySelector('.drag-hint');

    // Set initial position
    this.updateSliderPosition(this.state.currentPosition);
  }

  /**
   * Set up event listeners
   */
  setupEventListeners() {
    // Mouse events
    this.sliderHandle.addEventListener('mousedown', this.onDragStart.bind(this));
    document.addEventListener('mousemove', this.onDrag.bind(this));
    document.addEventListener('mouseup', this.onDragEnd.bind(this));
    
    // Touch events
    this.sliderHandle.addEventListener('touchstart', this.onTouchStart.bind(this));
    document.addEventListener('touchmove', this.onTouchMove.bind(this));
    document.addEventListener('touchend', this.onTouchEnd.bind(this));
    
    // Container click
    this.slider.addEventListener('click', this.onClick.bind(this));
    
    // Hide drag hint after first interaction
    this.slider.addEventListener('mousemove', this.hideDragHint.bind(this), { once: true });
    this.slider.addEventListener('touchmove', this.hideDragHint.bind(this), { once: true });
  }

  /**
   * Handle drag start
   */
  onDragStart(e) {
    e.preventDefault();
    this.state.isDragging = true;
    
    // Add active class for styling
    this.sliderHandle.classList.add('active');
    this.slider.classList.add('dragging');
    
    // Hide drag hint
    this.hideDragHint();
  }

  /**
   * Handle drag
   */
  onDrag(e) {
    if (!this.state.isDragging) return;
    e.preventDefault();
    
    const sliderRect = this.slider.getBoundingClientRect();
    
    if (this.config.orientation === 'horizontal') {
      // Calculate horizontal position
      const newPosition = ((e.clientX - sliderRect.left) / sliderRect.width) * 100;
      this.updateSliderPosition(newPosition);
    } else {
      // Calculate vertical position
      const newPosition = ((e.clientY - sliderRect.top) / sliderRect.height) * 100;
      this.updateSliderPosition(newPosition);
    }
  }

  /**
   * Handle drag end
   */
  onDragEnd(e) {
    if (!this.state.isDragging) return;
    
    this.state.isDragging = false;
    this.sliderHandle.classList.remove('active');
    this.slider.classList.remove('dragging');
  }

  /**
   * Handle touch start
   */
  onTouchStart(e) {
    e.preventDefault();
    const touch = e.touches[0];
    this.state.touchStartX = touch.clientX;
    this.state.touchStartY = touch.clientY;
    this.state.isDragging = true;
    
    // Add active class for styling
    this.sliderHandle.classList.add('active');
    this.slider.classList.add('dragging');
    
    // Hide drag hint
    this.hideDragHint();
  }

  /**
   * Handle touch move
   */
  onTouchMove(e) {
    if (!this.state.isDragging) return;
    e.preventDefault();
    
    const touch = e.touches[0];
    const sliderRect = this.slider.getBoundingClientRect();
    
    if (this.config.orientation === 'horizontal') {
      // Calculate horizontal position
      const newPosition = ((touch.clientX - sliderRect.left) / sliderRect.width) * 100;
      this.updateSliderPosition(newPosition);
    } else {
      // Calculate vertical position
      const newPosition = ((touch.clientY - sliderRect.top) / sliderRect.height) * 100;
      this.updateSliderPosition(newPosition);
    }
  }

  /**
   * Handle touch end
   */
  onTouchEnd(e) {
    this.state.isDragging = false;
    this.sliderHandle.classList.remove('active');
    this.slider.classList.remove('dragging');
  }

  /**
   * Handle click on slider
   */
  onClick(e) {
    const sliderRect = this.slider.getBoundingClientRect();
    
    if (this.config.orientation === 'horizontal') {
      // Calculate horizontal position
      const newPosition = ((e.clientX - sliderRect.left) / sliderRect.width) * 100;
      this.updateSliderPosition(newPosition);
    } else {
      // Calculate vertical position
      const newPosition = ((e.clientY - sliderRect.top) / sliderRect.height) * 100;
      this.updateSliderPosition(newPosition);
    }
    
    // Hide drag hint
    this.hideDragHint();
  }

  /**
   * Update the slider position
   */
  updateSliderPosition(newPosition) {
    // Constrain position between 0 and 100
    const position = Math.max(0, Math.min(100, newPosition));
    this.state.currentPosition = position;
    
    if (this.config.orientation === 'horizontal') {
      // Update horizontal slider position
      this.sliderHandle.style.left = `${position}%`;
      this.afterImage.style.width = `${position}%`;
    } else {
      // Update vertical slider position
      this.sliderHandle.style.top = `${position}%`;
      this.afterImage.style.height = `${position}%`;
    }
  }

  /**
   * Hide the drag hint
   */
  hideDragHint() {
    if (this.dragHint) {
      this.dragHint.style.opacity = '0';
      setTimeout(() => {
        if (this.dragHint) {
          this.dragHint.style.display = 'none';
        }
      }, 300);
    }
  }
}

// Usage:
// const slider = new BeforeAfterSlider({
//   containerId: 'before-after-container',
//   beforeImage: 'images/before.jpg',
//   afterImage: 'images/after.jpg',
//   statsText: '93% of users saw visible improvement after 8 weeks'
// });
// slider.init();

export default BeforeAfterSlider; 