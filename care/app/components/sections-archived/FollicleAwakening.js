/**
 * FollicleAwakening.js - Follicle Awakening Animation
 * This class creates an educational visualization of how red light therapy reactivates hair follicles
 * through three distinct stages: penetration, activation, and regeneration
 */

export class FollicleAwakening {
  constructor(canvas, options = {}) {
    this.canvas = canvas;
    this.ctx = canvas.getContext('2d');
    
    // Default options with customizable overrides
    this.options = {
      follicleCount: options.follicleCount || 10,
      autoScroll: options.autoScroll !== undefined ? options.autoScroll : true,
      speed: options.speed || 0.002,
      stageColors: {
        penetration: '#FF5A5A',    // Bright red for penetration
        mitochondria: '#FFA500',   // Orange for energy/mitochondria
        regeneration: '#4CAF50'    // Green for growth/regeneration
      }
    };
    
    // Animation properties
    this.animationProgress = 0;
    this.currentStage = 0;
    this.animationFrame = null;
    this.lastTimestamp = 0;
    
    // Initialize follicles
    this.follicles = [];
    this.lightSource = { x: 0, y: 0 };
    
    // Resize canvas to match container
    this.resize();
    
    // Start the animation
    this.init();
    this.animate();
    
    // Add resize listener
    window.addEventListener('resize', this.resize.bind(this));
  }
  
  init() {
    // Create follicles
    this.createFollicles();
    
    // Position light source at the top center
    this.lightSource = {
      x: this.canvas.width / 2,
      y: this.canvas.height * 0.15
    };
  }
  
  createFollicles() {
    const rows = 2;
    const folliclesPerRow = Math.ceil(this.options.follicleCount / rows);
    
    this.follicles = [];
    
    // Create follicles in a grid pattern
    for (let row = 0; row < rows; row++) {
      for (let col = 0; col < folliclesPerRow; col++) {
        if (this.follicles.length >= this.options.follicleCount) break;
        
        // Calculate x position with slight randomness
        const x = this.canvas.width * (0.2 + (0.6 * col / (folliclesPerRow - 1 || 1)));
        
        // Calculate y position (lower rows have higher y values)
        const y = this.canvas.height * (0.5 + row * 0.15);
        
        // Randomize follicle properties
        this.follicles.push({
          x,
          y,
          size: 15 + Math.random() * 10,        // Varied sizes
          activationThreshold: 0.3 + Math.random() * 0.4,  // When light activates it
          mitochondriaCount: 3 + Math.floor(Math.random() * 4),
          hairLength: 0,  // For growth stage
          energy: 0,      // Energy level (0-1)
          activated: false,
          mitochondriaActivated: false
        });
      }
    }
  }
  
  resize() {
    // Get the DPR for high-resolution displays
    const dpr = window.devicePixelRatio || 1;
    
    // Set canvas dimensions
    const rect = this.canvas.getBoundingClientRect();
    this.canvas.width = rect.width * dpr;
    this.canvas.height = rect.height * dpr;
    
    // Scale all drawing operations
    this.ctx.scale(dpr, dpr);
    this.canvas.style.width = `${rect.width}px`;
    this.canvas.style.height = `${rect.height}px`;
    
    // Reinitialize when resized
    this.init();
  }
  
  animate(timestamp = 0) {
    // Calculate delta time for smooth animations
    const deltaTime = timestamp - this.lastTimestamp;
    this.lastTimestamp = timestamp;
    
    // Auto-scroll animation if enabled
    if (this.options.autoScroll) {
      this.animationProgress += this.options.speed * (deltaTime || 16.67);
      
      // Loop back to beginning
      if (this.animationProgress > 1) {
        this.animationProgress = 0;
      }
    }
    
    // Clear canvas
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    
    // Draw all elements based on current progress
    this.draw();
    
    // Continue animation loop
    this.animationFrame = requestAnimationFrame(this.animate.bind(this));
  }
  
  draw() {
    // Determine current stage based on progress
    // Stage 0: Penetration (0-0.33)
    // Stage 1: Mitochondria Activation (0.33-0.66)
    // Stage 2: Hair Regeneration (0.66-1.0)
    const stage = Math.min(2, Math.floor(this.animationProgress * 3));
    
    if (stage !== this.currentStage) {
      this.currentStage = stage;
      this.updateEducationalUI(stage);
    }
    
    // Draw all elements based on current stage
    this.drawBackground();
    
    // Stage 0: Penetration - draw light source and beams
    if (this.animationProgress <= 0.5) {
      this.drawPenetrationStage();
    }
    
    // Stage 1: Mitochondria Activation - draw mitochondria activity
    if (this.animationProgress >= 0.25) {
      this.drawMitochondriaStage();
    }
    
    // Stage 2: Hair Regeneration - draw hair growth
    if (this.animationProgress >= 0.6) {
      this.drawRegenerationStage();
    }
    
    // Draw follicles on top
    this.follicles.forEach(follicle => {
      this.drawFollicle(follicle);
    });
    
    // Draw stage indicators
    this.drawStageIndicators();
  }
  
  drawBackground() {
    // Subtle gradient background
    const gradient = this.ctx.createLinearGradient(0, 0, 0, this.canvas.height);
    gradient.addColorStop(0, '#f8f9fa');
    gradient.addColorStop(1, '#e9ecef');
    
    this.ctx.fillStyle = gradient;
    this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);
    
    // Draw subtle scalp texture
    this.ctx.fillStyle = 'rgba(230, 225, 220, 0.3)';
    for (let i = 0; i < 200; i++) {
      const x = Math.random() * this.canvas.width;
      const y = Math.random() * this.canvas.height * 0.7 + this.canvas.height * 0.3;
      const size = Math.random() * 2 + 1;
      
      this.ctx.beginPath();
      this.ctx.arc(x, y, size, 0, Math.PI * 2);
      this.ctx.fill();
    }
  }
  
  drawPenetrationStage() {
    // Draw light source with glow
    const sourceRadius = 15;
    const glowRadius = 40;
    
    // Outer glow
    const glowGradient = this.ctx.createRadialGradient(
      this.lightSource.x, this.lightSource.y, sourceRadius,
      this.lightSource.x, this.lightSource.y, glowRadius
    );
    glowGradient.addColorStop(0, 'rgba(255, 0, 0, 0.5)');
    glowGradient.addColorStop(1, 'rgba(255, 0, 0, 0)');
    
    this.ctx.fillStyle = glowGradient;
    this.ctx.beginPath();
    this.ctx.arc(this.lightSource.x, this.lightSource.y, glowRadius, 0, Math.PI * 2);
    this.ctx.fill();
    
    // Inner light source
    this.ctx.fillStyle = '#ff3333';
    this.ctx.beginPath();
    this.ctx.arc(this.lightSource.x, this.lightSource.y, sourceRadius, 0, Math.PI * 2);
    this.ctx.fill();
    
    // Add shine effect
    this.ctx.fillStyle = 'rgba(255, 255, 255, 0.7)';
    this.ctx.beginPath();
    this.ctx.arc(
      this.lightSource.x - sourceRadius * 0.3, 
      this.lightSource.y - sourceRadius * 0.3, 
      sourceRadius * 0.4, 0, Math.PI * 2
    );
    this.ctx.fill();
    
    // Calculate beam progress based on animation
    const beamProgress = Math.min(1, this.animationProgress * 3);
    
    // Draw light beams to each follicle
    this.follicles.forEach((follicle, index) => {
      // Stagger beam animations
      const individualBeamProgress = Math.max(0, Math.min(1, 
        (beamProgress - index * 0.05) * 1.5
      ));
      
      if (individualBeamProgress > 0) {
        // Start and end points
        const startX = this.lightSource.x;
        const startY = this.lightSource.y;
        
        // Calculate progression point along the beam
        const endX = follicle.x;
        const endY = follicle.y - follicle.size;
        
        const progressX = startX + (endX - startX) * individualBeamProgress;
        const progressY = startY + (endY - startY) * individualBeamProgress;
        
        // Draw beam with width and gradient
        const beamWidth = 3;
        
        // Create gradient for beam
        const beamGradient = this.ctx.createLinearGradient(startX, startY, progressX, progressY);
        beamGradient.addColorStop(0, 'rgba(255, 60, 60, 0.9)');
        beamGradient.addColorStop(1, 'rgba(255, 60, 60, 0.4)');
        
        this.ctx.strokeStyle = beamGradient;
        this.ctx.lineWidth = beamWidth;
        
        // Add line glow effect
        this.ctx.shadowColor = 'rgba(255, 0, 0, 0.5)';
        this.ctx.shadowBlur = 10;
        
        // Draw the beam
        this.ctx.beginPath();
        this.ctx.moveTo(startX, startY);
        this.ctx.lineTo(progressX, progressY);
        this.ctx.stroke();
        
        // Reset shadow
        this.ctx.shadowColor = 'transparent';
        this.ctx.shadowBlur = 0;
        
        // Add wave effect along beam
        if (individualBeamProgress > 0.2) {
          const particleCount = Math.floor(individualBeamProgress * 5);
          
          for (let i = 0; i < particleCount; i++) {
            const particleProgress = (i / particleCount) * individualBeamProgress;
            const waveX = startX + (endX - startX) * particleProgress;
            const waveY = startY + (endY - startY) * particleProgress;
            
            // Random wave offset
            const offset = Math.sin(particleProgress * 10 + Date.now() * 0.005) * 3;
            
            const perpX = -(endY - startY);
            const perpY = (endX - startX);
            const length = Math.sqrt(perpX * perpX + perpY * perpY);
            
            const normalX = perpX / length * offset;
            const normalY = perpY / length * offset;
            
            const particleSize = 2 + Math.random() * 3;
            
            this.ctx.fillStyle = 'rgba(255, 180, 180, 0.7)';
            this.ctx.beginPath();
            this.ctx.arc(waveX + normalX, waveY + normalY, particleSize, 0, Math.PI * 2);
            this.ctx.fill();
          }
        }
        
        // Update follicle energy based on beam progress
        if (individualBeamProgress >= 1) {
          follicle.energy = Math.min(1, follicle.energy + 0.01);
          
          if (follicle.energy >= follicle.activationThreshold && !follicle.activated) {
            follicle.activated = true;
          }
        }
      }
    });
  }
  
  drawMitochondriaStage() {
    const mitochondriaProgress = Math.max(0, Math.min(1, 
      (this.animationProgress - 0.25) * 3
    ));
    
    this.follicles.forEach(follicle => {
      if (follicle.activated && mitochondriaProgress > 0) {
        // Draw energy particles moving within the follicle
        for (let i = 0; i < follicle.mitochondriaCount; i++) {
          const angle = (Date.now() * 0.001 + i * 1.5) % (Math.PI * 2);
          const radius = follicle.size * 0.6 * mitochondriaProgress;
          
          const mitochondriaX = follicle.x + Math.cos(angle) * radius;
          const mitochondriaY = follicle.y + Math.sin(angle) * radius;
          
          // Draw mitochondria as small energy centers
          this.ctx.fillStyle = this.options.stageColors.mitochondria;
          this.ctx.beginPath();
          this.ctx.ellipse(
            mitochondriaX, mitochondriaY, 
            5, 3,
            angle, 0, Math.PI * 2
          );
          this.ctx.fill();
          
          // Add energy glow
          this.ctx.fillStyle = 'rgba(255, 215, 0, 0.3)';
          this.ctx.beginPath();
          this.ctx.arc(mitochondriaX, mitochondriaY, 8, 0, Math.PI * 2);
          this.ctx.fill();
          
          // Energy particles
          if (mitochondriaProgress > 0.5) {
            for (let j = 0; j < 3; j++) {
              const particleAngle = angle + Math.random() * 0.5;
              const particleDistance = radius * (0.3 + Math.random() * 0.7);
              
              const px = follicle.x + Math.cos(particleAngle) * particleDistance;
              const py = follicle.y + Math.sin(particleAngle) * particleDistance;
              
              this.ctx.fillStyle = 'rgba(255, 255, 150, 0.7)';
              this.ctx.beginPath();
              this.ctx.arc(px, py, 1 + Math.random() * 2, 0, Math.PI * 2);
              this.ctx.fill();
            }
          }
        }
      }
    });
  }
  
  drawRegenerationStage() {
    const regenerationProgress = Math.max(0, Math.min(1, 
      (this.animationProgress - 0.6) * 2.5
    ));
    
    this.follicles.forEach(follicle => {
      if (follicle.activated) {
        // Set hair growth based on progress
        follicle.hairLength = regenerationProgress * follicle.size * 2.5;
      }
    });
  }
  
  drawFollicle(follicle) {
    // Base follicle color depends on activation state
    let follicleColor;
    
    if (!follicle.activated) {
      follicleColor = '#8B4513';  // Brown inactive follicle
    } else if (this.animationProgress < 0.6) {
      // Transition from red to orange during mitochondria activation
      const t = Math.max(0, (this.animationProgress - 0.33) * 3);
      const r = 139 + t * (255 - 139);
      const g = 69 + t * (165 - 69);
      const b = 19 + t * (0 - 19);
      follicleColor = `rgb(${r}, ${g}, ${b})`;
    } else {
      // Green in regeneration stage
      follicleColor = this.options.stageColors.regeneration;
    }
    
    // Draw follicle with 3D effect
    const gradient = this.ctx.createRadialGradient(
      follicle.x - follicle.size * 0.3, follicle.y - follicle.size * 0.3, 0,
      follicle.x, follicle.y, follicle.size
    );
    gradient.addColorStop(0, lightenColor(follicleColor, 30));
    gradient.addColorStop(0.7, follicleColor);
    gradient.addColorStop(1, darkenColor(follicleColor, 20));
    
    this.ctx.fillStyle = gradient;
    this.ctx.beginPath();
    this.ctx.arc(follicle.x, follicle.y, follicle.size, 0, Math.PI * 2);
    this.ctx.fill();
    
    // Add highlight for 3D effect
    this.ctx.fillStyle = 'rgba(255, 255, 255, 0.3)';
    this.ctx.beginPath();
    this.ctx.arc(
      follicle.x - follicle.size * 0.3, 
      follicle.y - follicle.size * 0.3, 
      follicle.size * 0.4, 0, Math.PI * 2
    );
    this.ctx.fill();
    
    // Draw hair in regeneration stage
    if (follicle.hairLength > 0) {
      // Hair color with slight variation
      const hue = Math.random() > 0.5 ? 30 : 20;  // Brown/dark blonde
      const hairColor = `hsl(${hue}, 30%, 20%)`;
      
      const hairWidth = 2 + Math.min(3, follicle.hairLength * 0.1);
      const hairCount = Math.floor(1 + follicle.hairLength * 0.1);
      
      for (let i = 0; i < hairCount; i++) {
        const angle = (Math.PI / 2) + (i - hairCount / 2) * 0.1;
        const hairX = follicle.x + Math.cos(angle) * follicle.size;
        const hairY = follicle.y + Math.sin(angle) * follicle.size;
        const hairEndX = hairX + Math.cos(angle) * follicle.hairLength;
        const hairEndY = hairY + Math.sin(angle) * follicle.hairLength;
        
        const hairGradient = this.ctx.createLinearGradient(
          hairX, hairY, hairEndX, hairEndY
        );
        
        hairGradient.addColorStop(0, darkenColor(hairColor, 10));
        hairGradient.addColorStop(1, lightenColor(hairColor, 20));
        
        this.ctx.strokeStyle = hairGradient;
        this.ctx.lineWidth = hairWidth;
        this.ctx.lineCap = 'round';
        
        this.ctx.beginPath();
        this.ctx.moveTo(hairX, hairY);
        this.ctx.lineTo(hairEndX, hairEndY);
        this.ctx.stroke();
      }
    }
  }
  
  drawStageIndicators() {
    const indicatorCount = 3;
    const indicatorSize = 10;
    const spacing = 25;
    const y = this.canvas.height * 0.9;
    const totalWidth = (indicatorCount - 1) * spacing;
    const startX = (this.canvas.width - totalWidth) / 2;
    
    // Current stage based on progress
    const currentStage = Math.floor(this.animationProgress * 3);
    
    for (let i = 0; i < indicatorCount; i++) {
      const x = startX + i * spacing;
      
      // Active/inactive colors
      const isActive = i <= currentStage;
      const color = isActive 
        ? getStageColor(i, this.options.stageColors)
        : '#D1D5DB';
      
      // Draw indicator with glow effect for active stage
      if (isActive) {
        this.ctx.shadowColor = color;
        this.ctx.shadowBlur = 8;
      }
      
      this.ctx.fillStyle = color;
      this.ctx.beginPath();
      this.ctx.arc(x, y, indicatorSize, 0, Math.PI * 2);
      this.ctx.fill();
      
      // Reset shadow
      this.ctx.shadowColor = 'transparent';
      this.ctx.shadowBlur = 0;
      
      // Draw connecting line except for last indicator
      if (i < indicatorCount - 1) {
        this.ctx.strokeStyle = '#D1D5DB';
        this.ctx.lineWidth = 2;
        this.ctx.beginPath();
        this.ctx.moveTo(x + indicatorSize, y);
        this.ctx.lineTo(x + spacing - indicatorSize, y);
        this.ctx.stroke();
      }
    }
  }
  
  updateEducationalUI(stage) {
    // This function will update any HTML elements on the page
    // It's intended to be overridden or configured by the implementing page
    
    const stageData = {
      0: {
        title: 'Step 1: Penetration',
        subtitle: '630-660nm Red Light',
        description: 'The specific red light wavelength penetrates the scalp and reaches the hair follicles'
      },
      1: {
        title: 'Step 2: Mitochondrial Activation',
        subtitle: 'Cellular Energy Production',
        description: 'Red light activates mitochondria, increasing ATP production and cellular energy'
      },
      2: {
        title: 'Step 3: Hair Regeneration',
        subtitle: 'Follicle Reactivation',
        description: 'Energized follicles begin the process of producing new, healthy hair growth'
      }
    };
    
    // Update UI elements if they exist (these would be DOM elements)
    const data = stageData[stage];
    
    // Set stage indicators (example - implementation will depend on page structure)
    const indicators = document.querySelectorAll('.stage-indicator');
    if (indicators && indicators.length) {
      indicators.forEach((indicator, i) => {
        if (i === stage) {
          indicator.classList.add('active');
        } else {
          indicator.classList.remove('active');
        }
      });
    }
    
    // Set title and subtitle with proper spacing
    const titleElement = document.querySelector('.stage-title');
    if (titleElement) {
      titleElement.textContent = data.title;
    }
    
    const subtitleElement = document.querySelector('.stage-subtitle');
    if (subtitleElement) {
      subtitleElement.textContent = data.subtitle;
    }
    
    // Update description
    const descriptionElement = document.querySelector('.stage-description');
    if (descriptionElement) {
      descriptionElement.textContent = data.description;
    }
  }
  
  // Public method to update progress from external control
  updateProgress(progress) {
    this.animationProgress = Math.max(0, Math.min(1, progress));
  }
  
  // Clean up resources
  destroy() {
    if (this.animationFrame) {
      cancelAnimationFrame(this.animationFrame);
    }
    
    window.removeEventListener('resize', this.resize);
  }
}

// Utility functions

function getStageColor(stage, colorOptions) {
  const colors = [
    colorOptions.penetration,
    colorOptions.mitochondria,
    colorOptions.regeneration
  ];
  
  return colors[stage] || '#CBD5E1';
}

function lightenColor(color, percent) {
  const num = parseInt(color.replace('#', ''), 16);
  const amt = Math.round(2.55 * percent);
  const R = Math.min(255, (num >> 16) + amt);
  const G = Math.min(255, ((num >> 8) & 0x00FF) + amt);
  const B = Math.min(255, (num & 0x0000FF) + amt);
  
  return `rgb(${R}, ${G}, ${B})`;
}

function darkenColor(color, percent) {
  const num = parseInt(color.replace('#', ''), 16);
  const amt = Math.round(2.55 * percent);
  const R = Math.max(0, (num >> 16) - amt);
  const G = Math.max(0, ((num >> 8) & 0x00FF) - amt);
  const B = Math.max(0, (num & 0x0000FF) - amt);
  
  return `rgb(${R}, ${G}, ${B})`;
} 