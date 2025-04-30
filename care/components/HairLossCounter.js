/**
 * Hair Loss Counter Component
 * 
 * This component visualizes hair loss in real-time to create a powerful
 * pattern interrupt and loss aversion trigger. It shows a counter that
 * increases at the rate of average daily hair loss.
 */

class HairLossCounter {
  constructor(options = {}) {
    // Configuration with defaults
    this.config = {
      containerId: options.containerId || 'hair-loss-counter',
      lossRate: options.lossRate || 100, // hairs lost per day
      startingCount: options.startingCount || 0,
      updateInterval: options.updateInterval || 200, // ms between updates
      stopOnAction: options.stopOnAction || true,
      actionButtonId: options.actionButtonId || 'take-quiz-button',
      animationDuration: options.animationDuration || 800, // ms for count animation
      showComparison: options.showComparison || true,
      comparisonText: options.comparisonText || 'The average woman loses 4,500 hairs per month without treatment.'
    };

    // State
    this.state = {
      currentCount: this.config.startingCount,
      isRunning: false,
      startTime: null,
      pauseTime: null,
      intervalId: null
    };

    // Calculated values
    this.hairLossPerMillisecond = this.config.lossRate / (24 * 60 * 60 * 1000);
  }

  /**
   * Initialize the counter
   */
  init() {
    // Create container if it doesn't exist
    this.container = document.getElementById(this.config.containerId);
    if (!this.container) {
      console.error(`Counter container #${this.config.containerId} not found.`);
      return;
    }

    // Create counter elements
    this.render();

    // Setup event listeners
    if (this.config.stopOnAction) {
      const actionButton = document.getElementById(this.config.actionButtonId);
      if (actionButton) {
        actionButton.addEventListener('click', () => this.stop());
      }
    }

    // Start counter
    this.start();

    // For demo purposes, let's add visible controls
    this.addControls();
  }

  /**
   * Render the counter UI
   */
  render() {
    this.container.innerHTML = `
      <div class="hair-loss-counter">
        <div class="counter-header">
          <h3>Hair Loss in Real-Time</h3>
        </div>
        <div class="counter-body">
          <div class="counter-value">
            <span id="counter-number">${Math.floor(this.state.currentCount)}</span>
            <span class="counter-label">hair strands lost</span>
          </div>
          ${this.config.showComparison ? `
            <div class="counter-comparison">
              <p>${this.config.comparisonText}</p>
            </div>
          ` : ''}
        </div>
      </div>
    `;

    // Add styling
    const style = document.createElement('style');
    style.textContent = `
      .hair-loss-counter {
        font-family: 'Helvetica Neue', Arial, sans-serif;
        background: linear-gradient(135deg, #fff, #f8f8f8);
        border-radius: 8px;
        box-shadow: 0 4px 12px rgba(0,0,0,0.05);
        padding: 24px;
        margin: 20px 0;
        max-width: 100%;
        position: relative;
        overflow: hidden;
      }
      
      .counter-header h3 {
        font-size: 18px;
        font-weight: 600;
        margin: 0 0 16px;
        color: #333;
      }
      
      .counter-body {
        display: flex;
        flex-direction: column;
        align-items: center;
      }
      
      .counter-value {
        display: flex;
        flex-direction: column;
        align-items: center;
        margin-bottom: 16px;
      }
      
      #counter-number {
        font-size: 48px;
        font-weight: 700;
        color: #d23;
        margin: 0;
        transition: color 0.3s ease;
      }
      
      .counter-label {
        font-size: 14px;
        color: #666;
        margin-top: 4px;
      }
      
      .counter-comparison {
        background: rgba(210,34,51,0.05);
        border-left: 3px solid #d23;
        padding: 12px 16px;
        margin-top: 8px;
        font-size: 14px;
        line-height: 1.5;
        color: #555;
        width: 100%;
        box-sizing: border-box;
      }
      
      .counter-comparison p {
        margin: 0;
      }
      
      .counter-controls {
        display: flex;
        justify-content: center;
        margin-top: 16px;
        gap: 8px;
      }
      
      .counter-controls button {
        background: #f1f1f1;
        border: none;
        border-radius: 4px;
        padding: 8px 12px;
        font-size: 12px;
        cursor: pointer;
        transition: background 0.2s ease;
      }
      
      .counter-controls button:hover {
        background: #e1e1e1;
      }
      
      @media (max-width: 768px) {
        .hair-loss-counter {
          padding: 16px;
        }
        
        #counter-number {
          font-size: 36px;
        }
      }
    `;
    document.head.appendChild(style);

    // Store reference to number element
    this.counterNumberElement = document.getElementById('counter-number');
  }

  /**
   * Start the counter
   */
  start() {
    if (this.state.isRunning) return;
    
    this.state.isRunning = true;
    this.state.startTime = Date.now() - (this.state.pauseTime || 0);
    
    this.state.intervalId = setInterval(() => {
      const elapsedTime = Date.now() - this.state.startTime;
      const newCount = this.config.startingCount + (elapsedTime * this.hairLossPerMillisecond);
      
      // Update counter with animation
      this.updateCounter(newCount);
      
      // Update color intensity based on count
      this.updateColorIntensity(newCount);
    }, this.config.updateInterval);
  }

  /**
   * Stop the counter
   */
  stop() {
    if (!this.state.isRunning) return;
    
    this.state.isRunning = false;
    this.state.pauseTime = Date.now() - this.state.startTime;
    clearInterval(this.state.intervalId);
    
    // Optional: Add a stopping animation/message
    this.container.querySelector('.counter-header h3').textContent = 'Hair Loss Paused';
    
    // Add CTA
    const counterBody = this.container.querySelector('.counter-body');
    const cta = document.createElement('div');
    cta.className = 'counter-cta';
    cta.innerHTML = `
      <p>Take action now to prevent losing more.</p>
      <a href="#quiz" class="counter-button">Find Your Solution</a>
    `;
    
    // Add CTA styling
    const style = document.createElement('style');
    style.textContent = `
      .counter-cta {
        margin-top: 16px;
        text-align: center;
        padding: 12px;
        background: rgba(210,34,51,0.03);
        border-radius: 6px;
        width: 100%;
      }
      
      .counter-cta p {
        margin: 0 0 12px;
        font-size: 14px;
        color: #333;
      }
      
      .counter-button {
        display: inline-block;
        background: #d23;
        color: white;
        padding: 10px 24px;
        border-radius: 4px;
        text-decoration: none;
        font-weight: 600;
        font-size: 14px;
        transition: background 0.2s ease;
      }
      
      .counter-button:hover {
        background: #c12;
      }
    `;
    document.head.appendChild(style);
    
    counterBody.appendChild(cta);
  }

  /**
   * Reset the counter
   */
  reset() {
    this.stop();
    this.state.currentCount = this.config.startingCount;
    this.state.startTime = null;
    this.state.pauseTime = null;
    this.render();
  }

  /**
   * Update the counter value with animation
   */
  updateCounter(newCount) {
    const start = this.state.currentCount;
    const end = newCount;
    const duration = this.config.animationDuration;
    const startTime = performance.now();
    
    const animate = (currentTime) => {
      const elapsedTime = currentTime - startTime;
      const progress = Math.min(elapsedTime / duration, 1);
      const currentValue = start + (end - start) * progress;
      
      this.state.currentCount = currentValue;
      this.counterNumberElement.textContent = Math.floor(currentValue);
      
      if (progress < 1) {
        requestAnimationFrame(animate);
      }
    };
    
    requestAnimationFrame(animate);
  }

  /**
   * Update color intensity based on count
   */
  updateColorIntensity(count) {
    // Increase color intensity as count grows
    const baseColor = 210; // Red hue in RGB
    const intensity = Math.min(100, 50 + (count / 100));
    
    this.counterNumberElement.style.color = `rgb(${baseColor}, ${34 - (count/500)}, ${51 - (count/500)})`;
  }

  /**
   * Add controls for demo purposes
   */
  addControls() {
    const controlsDiv = document.createElement('div');
    controlsDiv.className = 'counter-controls';
    controlsDiv.innerHTML = `
      <button id="counter-start">Start</button>
      <button id="counter-stop">Stop</button>
      <button id="counter-reset">Reset</button>
    `;
    
    this.container.appendChild(controlsDiv);
    
    document.getElementById('counter-start').addEventListener('click', () => this.start());
    document.getElementById('counter-stop').addEventListener('click', () => this.stop());
    document.getElementById('counter-reset').addEventListener('click', () => this.reset());
  }
}

// Usage:
// const hairLossCounter = new HairLossCounter({
//   containerId: 'hair-loss-counter',
//   lossRate: 150, // 150 hairs lost per day
//   actionButtonId: 'take-quiz-button'
// });
// hairLossCounter.init();

export default HairLossCounter; 