import { motion } from 'framer-motion';

// Placeholder data - replace with actual images and text
const beforeAfterData = {
  title: "Visible Transformations",
  subtitle: "See the real results achieved with consistent use of Care-atin.",
  examples: [
    {
      beforeImage: "/placeholder-before-1.jpg",
      afterImage: "/placeholder-after-1.jpg",
      caption: "Fuller hairline after 90 days.",
      beforeLabel: "Day 0",
      afterLabel: "Day 90"
    },
    // Add more examples if needed
    // {
    //   beforeImage: "/placeholder-before-2.jpg",
    //   afterImage: "/placeholder-after-2.jpg",
    //   caption: "Increased density in the crown area.",
    //   beforeLabel: "Start",
    //   afterLabel: "4 Months"
    // },
  ]
};

// Animation variants
const sectionVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { duration: 0.5, delay: 0.1 } }
};

const itemVariants = {
  hidden: { y: 20, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: {
      duration: 0.6,
      ease: "easeOut"
    }
  }
};

export function BeforeAfter() {
  // For now, just display the first example
  const example = beforeAfterData.examples[0]; 

  return (
    <motion.section
      className="before-after-section section-padding"
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.2 }}
      variants={sectionVariants}
      style={{ 
        padding: 'var(--space-xl) var(--space-md)',
        textAlign: 'center' 
      }}
    >
      <motion.h2 variants={itemVariants} style={{ marginBottom: 'var(--space-sm)', fontSize: 'var(--text-heading)' }}>
        {beforeAfterData.title}
      </motion.h2>
      <motion.p variants={itemVariants} style={{ marginBottom: 'var(--space-lg)', maxWidth: '600px', margin: '0 auto var(--space-lg) auto', fontSize: 'var(--text-body)' }}>
        {beforeAfterData.subtitle}
      </motion.p>

      {example && (
        <motion.div 
          className="comparison-container"
          variants={itemVariants} // Animate the whole comparison block
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', // Responsive columns
            gap: 'var(--space-lg)',
            alignItems: 'start',
            maxWidth: '800px', // Limit width for better side-by-side view
            margin: '0 auto' // Center the container
          }}
        >
          {/* Before Image Column */}
          <div className="before-column">
            <h3 style={{ marginBottom: 'var(--space-xs)', fontSize: 'var(--text-subheading)' }}>{example.beforeLabel}</h3>
            <img 
              src={example.beforeImage}
              alt={`Before - ${example.caption}`}
              style={{ width: '100%', height: 'auto', borderRadius: '8px', border: '1px solid var(--color-border, #eee)' }}
            />
          </div>

          {/* After Image Column */}
          <div className="after-column">
            <h3 style={{ marginBottom: 'var(--space-xs)', fontSize: 'var(--text-subheading)' }}>{example.afterLabel}</h3>
            <img 
              src={example.afterImage}
              alt={`After - ${example.caption}`}
              style={{ width: '100%', height: 'auto', borderRadius: '8px', border: '1px solid var(--color-border, #eee)' }}
            />
          </div>
        </motion.div>
      )}
      
      {/* Optional: Add controls here later if implementing a slider/gallery */}
      
      {example && (
         <motion.p variants={itemVariants} style={{ marginTop: 'var(--space-md)', fontStyle: 'italic', fontSize: 'var(--text-body-sm)' }}>
           {example.caption}
         </motion.p>
      )}

    </motion.section>
  );
} 