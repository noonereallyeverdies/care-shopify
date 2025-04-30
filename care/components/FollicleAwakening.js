/**
 * Follicle Awakening Animation Component
 * 
 * This component creates a scroll-triggered animation that shows hair follicles
 * "waking up" and activating as the user scrolls down the page. This creates a
 * powerful visual pattern interrupt and reinforces the product's mechanism of action.
 */

class FollicleAwakening {
  constructor(options = {}) {
    // Configuration with defaults
    this.config = {
      containerId: options.containerId || 'follicle-awakening-container',
      follicleCount: options.follicleCount || 12,
      activationThreshold: options.activationThreshold || 0.3, // percentage of element visible to start animation
      follicleColors: options.follicleColors || {
        dormant: '#8a8a8a',
        awakening: '#d77',
        active: '#e55'
      },
      activationDuration: options.activationDuration || 1200, // ms for full activation
      staggerDelay: options.staggerDelay || 120, // ms between follicle activations
      showLabels: options.showLabels || true,
      labelText: options.labelText || 'Red light activates cellular energy production',
      showIndicator: options.showIndicator || true,
      indicatorText: options.indicatorText || 'Scroll to activate',
      microscaleView: options.microscaleView || true, // toggle micro-scale view on deep scroll
      enableSound: options.enableSound || false
    };

    // State
    this.state = {
      follicles: [],
      isInView: false,
      activationProgress: 0,
      activeCount: 0,
      scrollPosition: 0,
      isMicroscaleActive: false
    };

    // Bind methods
    this.onScroll = this.onScroll.bind(this);
    this.activate = this.activate.bind(this);
  }

  /**
   * Initialize the animation
   */
  init() {
    // Find or create container
    this.container = document.getElementById(this.config.containerId);
    if (!this.container) {
      console.error(`Container #${this.config.containerId} not found.`);
      return;
    }

    // Create follicle elements
    this.render();

    // Setup follicle data
    this.setupFollicles();

    // Setup scroll listener
    window.addEventListener('scroll', this.onScroll);

    // Initial check
    this.onScroll();
  }

  /**
   * Render the component UI
   */
  render() {
    // Create the main container structure
    this.container.innerHTML = `
      <div class="follicle-awakening">
        <div class="follicle-layer normal-view">
          <div class="follicle-grid"></div>
          ${this.config.showLabels ? `
            <div class="follicle-label">
              <span>${this.config.labelText}</span>
            </div>
          ` : ''}
        </div>
        <div class="follicle-layer micro-view">
          <div class="cell-structure">
            <div class="cell-membrane"></div>
            <div class="mitochondria-container"></div>
            <div class="cell-nucleus"></div>
          </div>
        </div>
        ${this.config.showIndicator ? `
          <div class="scroll-indicator">
            <div class="indicator-text">${this.config.indicatorText}</div>
            <div class="indicator-arrow">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                <path d="M12 5v14M5 12l7 7 7-7"/>
              </svg>
            </div>
          </div>
        ` : ''}
        <div class="activation-progress">
          <div class="progress-bar"></div>
          <div class="progress-text">0% Activated</div>
        </div>
      </div>
    `;

    // Create follicle grid
    const follicleGrid = this.container.querySelector('.follicle-grid');
    for (let i = 0; i < this.config.follicleCount; i++) {
      const follicle = document.createElement('div');
      follicle.className = 'follicle dormant';
      follicle.innerHTML = `
        <div class="follicle-bulb"></div>
        <div class="follicle-shaft"></div>
        <div class="activation-glow"></div>
      `;
      follicleGrid.appendChild(follicle);
    }

    // Create mitochondria for microscale view
    const mitochondriaContainer = this.container.querySelector('.mitochondria-container');
    for (let i = 0; i < 8; i++) {
      const mitochondrion = document.createElement('div');
      mitochondrion.className = 'mitochondrion dormant';
      mitochondriaContainer.appendChild(mitochondrion);
    }

    // Add styling
    const style = document.createElement('style');
    style.textContent = `
      .follicle-awakening {
        position: relative;
        width: 100%;
        height: 500px;
        overflow: hidden;
        background: linear-gradient(to bottom, #f8f8f8, #fff);
        border-radius: 8px;
        box-shadow: 0 4px 20px rgba(0,0,0,0.08);
      }
      
      .follicle-layer {
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        transition: opacity 1.2s ease;
      }
      
      .normal-view {
        opacity: 1;
      }
      
      .micro-view {
        opacity: 0;
        background: linear-gradient(to bottom, #f4f4f8, #e8eaf0);
      }
      
      .follicle-grid {
        display: grid;
        grid-template-columns: repeat(4, 1fr);
        gap: 20px;
        padding: 40px;
        height: 100%;
        box-sizing: border-box;
      }
      
      .follicle {
        position: relative;
        height: 100%;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: flex-end;
        transition: transform 0.5s ease;
      }
      
      .follicle-bulb {
        width: 24px;
        height: 24px;
        border-radius: 50%;
        background-color: ${this.config.follicleColors.dormant};
        position: relative;
        z-index: 2;
        transition: background-color 0.8s ease, transform 0.8s ease;
      }
      
      .follicle-shaft {
        width: 6px;
        height: 100px;
        background-color: ${this.config.follicleColors.dormant};
        margin-top: -6px;
        position: relative;
        z-index: 1;
        transition: background-color 0.8s ease, height 1s ease;
      }
      
      .activation-glow {
        position: absolute;
        bottom: 0;
        left: 50%;
        transform: translateX(-50%);
        width: 0;
        height: 0;
        border-radius: 50%;
        background: radial-gradient(circle, rgba(221,68,68,0.4) 0%, rgba(221,68,68,0) 70%);
        opacity: 0;
        transition: all 1s ease;
      }
      
      .follicle.awakening .follicle-bulb {
        background-color: ${this.config.follicleColors.awakening};
        transform: scale(1.2);
      }
      
      .follicle.awakening .follicle-shaft {
        background-color: ${this.config.follicleColors.awakening};
      }
      
      .follicle.awakening .activation-glow {
        width: 60px;
        height: 60px;
        opacity: 0.6;
      }
      
      .follicle.active .follicle-bulb {
        background-color: ${this.config.follicleColors.active};
        transform: scale(1.3);
      }
      
      .follicle.active .follicle-shaft {
        background-color: ${this.config.follicleColors.active};
        height: 120px;
      }
      
      .follicle.active .activation-glow {
        width: 80px;
        height: 80px;
        opacity: 0.8;
        animation: pulse 2s infinite;
      }
      
      .follicle-label {
        position: absolute;
        bottom: 20px;
        left: 0;
        right: 0;
        text-align: center;
        font-size: 16px;
        font-weight: 500;
        color: #555;
        padding: 10px;
        background: rgba(255,255,255,0.8);
        border-top: 1px solid rgba(0,0,0,0.05);
      }
      
      .scroll-indicator {
        position: absolute;
        bottom: 70px;
        left: 50%;
        transform: translateX(-50%);
        text-align: center;
        color: #777;
        font-size: 14px;
        transition: opacity 0.5s ease;
      }
      
      .indicator-arrow {
        margin-top: 8px;
        animation: bounce 1.5s infinite;
      }
      
      .activation-progress {
        position: absolute;
        bottom: 0;
        left: 0;
        right: 0;
        height: 30px;
        background: rgba(0,0,0,0.05);
        overflow: hidden;
        display: flex;
        align-items: center;
      }
      
      .progress-bar {
        height: 100%;
        width: 0%;
        background: linear-gradient(to right, #d77, #e55);
        transition: width 0.3s ease;
      }
      
      .progress-text {
        position: absolute;
        left: 0;
        right: 0;
        text-align: center;
        font-size: 12px;
        font-weight: 600;
        color: #555;
      }
      
      /* Microscale View */
      .cell-structure {
        position: relative;
        width: 90%;
        height: 90%;
        margin: 5% auto;
        border-radius: 50%;
        background: rgba(240,240,245,0.9);
        overflow: hidden;
      }
      
      .cell-membrane {
        position: absolute;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        border: 4px solid rgba(180,180,200,0.4);
        border-radius: 50%;
      }
      
      .cell-nucleus {
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        width: 25%;
        height: 25%;
        border-radius: 50%;
        background: rgba(100,100,120,0.2);
        border: 2px solid rgba(100,100,120,0.4);
      }
      
      .mitochondria-container {
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        display: flex;
        align-items: center;
        justify-content: center;
      }
      
      .mitochondrion {
        position: absolute;
        width: 40px;
        height: 20px;
        border-radius: 10px;
        background-color: ${this.config.follicleColors.dormant};
        transition: background-color 0.8s ease, transform 0.8s ease, box-shadow 0.8s ease;
      }
      
      .mitochondrion.awakening {
        background-color: ${this.config.follicleColors.awakening};
        transform: scale(1.2);
        box-shadow: 0 0 15px rgba(221,68,68,0.4);
      }
      
      .mitochondrion.active {
        background-color: ${this.config.follicleColors.active};
        transform: scale(1.3);
        box-shadow: 0 0 30px rgba(221,68,68,0.6);
        animation: throb 2s infinite;
      }
      
      /* Positioning mitochondria */
      .mitochondrion:nth-child(1) { top: 20%; left: 30%; transform: rotate(30deg); }
      .mitochondrion:nth-child(2) { top: 30%; left: 60%; transform: rotate(-15deg); }
      .mitochondrion:nth-child(3) { top: 55%; left: 70%; transform: rotate(45deg); }
      .mitochondrion:nth-child(4) { top: 70%; left: 40%; transform: rotate(-30deg); }
      .mitochondrion:nth-child(5) { top: 65%; left: 20%; transform: rotate(10deg); }
      .mitochondrion:nth-child(6) { top: 40%; left: 25%; transform: rotate(-45deg); }
      .mitochondrion:nth-child(7) { top: 25%; left: 45%; transform: rotate(20deg); }
      .mitochondrion:nth-child(8) { top: 50%; left: 50%; transform: rotate(-10deg); }
      
      /* Animations */
      @keyframes pulse {
        0% { transform: translateX(-50%) scale(1); opacity: 0.8; }
        50% { transform: translateX(-50%) scale(1.2); opacity: 0.6; }
        100% { transform: translateX(-50%) scale(1); opacity: 0.8; }
      }
      
      @keyframes bounce {
        0%, 20%, 50%, 80%, 100% { transform: translateY(0); }
        40% { transform: translateY(-10px); }
        60% { transform: translateY(-5px); }
      }
      
      @keyframes throb {
        0% { transform: scale(1.3) rotate(var(--rotation)); }
        50% { transform: scale(1.5) rotate(var(--rotation)); }
        100% { transform: scale(1.3) rotate(var(--rotation)); }
      }
      
      /* Mobile styles */
      @media (max-width: 768px) {
        .follicle-grid {
          grid-template-columns: repeat(3, 1fr);
          padding: 20px;
        }
        
        .follicle-bulb {
          width: 20px;
          height: 20px;
        }
        
        .follicle-shaft {
          width: 5px;
          height: 80px;
        }
        
        .follicle.active .follicle-shaft {
          height: 95px;
        }
        
        .follicle-label {
          font-size: 14px;
        }
      }
    `;
    document.head.appendChild(style);

    // Store references to elements
    this.follicles = Array.from(this.container.querySelectorAll('.follicle'));
    this.mitochondria = Array.from(this.container.querySelectorAll('.mitochondrion'));
    this.normalView = this.container.querySelector('.normal-view');
    this.microView = this.container.querySelector('.micro-view');
    this.progressBar = this.container.querySelector('.progress-bar');
    this.progressText = this.container.querySelector('.progress-text');
    this.scrollIndicator = this.container.querySelector('.scroll-indicator');
  }

  /**
   * Setup follicle data
   */
  setupFollicles() {
    // Initialize follicle data
    this.state.follicles = this.follicles.map((el, index) => ({
      element: el,
      activated: false,
      activationThreshold: 0.3 + (index / (this.follicles.length * 2.5)),
      activationDelay: index * this.config.staggerDelay
    }));

    // Initialize mitochondria data
    this.state.mitochondria = this.mitochondria.map((el, index) => ({
      element: el,
      activated: false,
      activationThreshold: 0.7 + (index / (this.mitochondria.length * 3)),
      activationDelay: index * (this.config.staggerDelay / 2)
    }));

    // Store original rotation values for later animation
    this.mitochondria.forEach(mito => {
      const style = window.getComputedStyle(mito);
      const transform = style.transform;
      const match = transform.match(/rotate\(([^)]+)\)/);
      if (match) {
        mito.style.setProperty('--rotation', match[1]);
      }
    });
  }

  /**
   * Handle scroll event
   */
  onScroll() {
    const rect = this.container.getBoundingClientRect();
    const windowHeight = window.innerHeight;
    
    // Calculate how much of the element is in view
    const visibleHeight = Math.min(rect.bottom, windowHeight) - Math.max(rect.top, 0);
    const percentVisible = visibleHeight / rect.height;
    
    // Update scroll position state
    this.state.scrollPosition = percentVisible;
    
    // Check if enough is visible to trigger animation
    const wasInView = this.state.isInView;
    this.state.isInView = percentVisible >= this.config.activationThreshold;
    
    if (this.state.isInView) {
      // Hide scroll indicator once animation starts
      if (this.scrollIndicator) {
        this.scrollIndicator.style.opacity = '0';
      }
      
      // Only activate if newly in view
      if (!wasInView) {
        this.activate();
      }
      
      // Toggle microscale view based on scroll position
      if (this.config.microscaleView && percentVisible > 0.7) {
        if (!this.state.isMicroscaleActive) {
          this.toggleMicroscaleView(true);
        }
      } else if (this.state.isMicroscaleActive) {
        this.toggleMicroscaleView(false);
      }
      
      // Update progress bar
      const progress = Math.min(100, Math.round((percentVisible - this.config.activationThreshold) / 
        (1 - this.config.activationThreshold) * 100));
      this.updateProgress(progress);
    }
  }

  /**
   * Activate follicles based on scroll position
   */
  activate() {
    // Activate each follicle that meets its threshold
    this.state.follicles.forEach(follicle => {
      if (!follicle.activated && this.state.scrollPosition >= follicle.activationThreshold) {
        setTimeout(() => {
          follicle.element.classList.add('awakening');
          
          setTimeout(() => {
            follicle.element.classList.remove('awakening');
            follicle.element.classList.add('active');
            this.state.activeCount++;
            
            // Play sound if enabled
            if (this.config.enableSound) {
              this.playActivationSound();
            }
          }, this.config.activationDuration / 2);
          
          follicle.activated = true;
        }, follicle.activationDelay);
      }
    });
    
    // Activate mitochondria in microscale view
    if (this.state.isMicroscaleActive) {
      this.state.mitochondria.forEach(mito => {
        if (!mito.activated && this.state.scrollPosition >= mito.activationThreshold) {
          setTimeout(() => {
            mito.element.classList.add('awakening');
            
            setTimeout(() => {
              mito.element.classList.remove('awakening');
              mito.element.classList.add('active');
            }, this.config.activationDuration / 3);
            
            mito.activated = true;
          }, mito.activationDelay);
        }
      });
    }
  }

  /**
   * Toggle between normal and microscale view
   */
  toggleMicroscaleView(showMicro) {
    this.state.isMicroscaleActive = showMicro;
    
    if (showMicro) {
      this.normalView.style.opacity = '0';
      
      setTimeout(() => {
        this.microView.style.opacity = '1';
      }, 600);
    } else {
      this.microView.style.opacity = '0';
      
      setTimeout(() => {
        this.normalView.style.opacity = '1';
      }, 600);
    }
  }

  /**
   * Update progress bar
   */
  updateProgress(percent) {
    this.progressBar.style.width = `${percent}%`;
    this.progressText.textContent = `${percent}% Activated`;
  }

  /**
   * Play activation sound
   */
  playActivationSound() {
    // Simple tone generation for activation sound
    try {
      const audioCtx = new (window.AudioContext || window.webkitAudioContext)();
      const oscillator = audioCtx.createOscillator();
      const gainNode = audioCtx.createGain();
      
      oscillator.type = 'sine';
      oscillator.frequency.setValueAtTime(880 + Math.random() * 220, audioCtx.currentTime);
      
      gainNode.gain.setValueAtTime(0, audioCtx.currentTime);
      gainNode.gain.linearRampToValueAtTime(0.1, audioCtx.currentTime + 0.05);
      gainNode.gain.linearRampToValueAtTime(0, audioCtx.currentTime + 0.3);
      
      oscillator.connect(gainNode);
      gainNode.connect(audioCtx.destination);
      
      oscillator.start();
      oscillator.stop(audioCtx.currentTime + 0.3);
    } catch (e) {
      console.log('Audio not supported');
    }
  }

  /**
   * Cleanup method
   */
  destroy() {
    window.removeEventListener('scroll', this.onScroll);
  }
}

// Usage:
// const follicleAnimation = new FollicleAwakening({
//   containerId: 'follicle-animation',
//   follicleCount: 12
// });
// follicleAnimation.init();

export default FollicleAwakening; 