import { motion } from "framer-motion";
import { useState } from "react";
import { Mail, Check, ArrowRight } from "lucide-react";

export function JournalSignup() {
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    
    // Simulate API call for demo
    setTimeout(() => {
      setLoading(false);
      if (email.includes('@') && email.includes('.')) {
        setSubmitted(true);
      } else {
        setError("Please enter a valid email address");
      }
    }, 1500);
  };

  return (
    <section className="py-16 bg-neutral-50 relative overflow-hidden">
      {/* Decorative elements */}
      <div className="absolute top-0 right-0 w-64 h-64 bg-rose-100 rounded-full opacity-20 blur-3xl transform translate-x-1/3 -translate-y-1/3"></div>
      <div className="absolute bottom-0 left-0 w-64 h-64 bg-rose-100 rounded-full opacity-20 blur-3xl transform -translate-x-1/3 translate-y-1/3"></div>
      
      <div className="container mx-auto px-6">
        <motion.div 
          className="max-w-4xl mx-auto bg-white rounded-2xl shadow-md overflow-hidden"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <div className="grid grid-cols-1 md:grid-cols-2">
            {/* Left column - image */}
            <div className="hidden md:block relative">
              <div className="absolute inset-0 bg-rose-600/10 backdrop-filter backdrop-blur-sm z-10"></div>
              <img 
                src="/images/woman-with-healthy-hair.jpg" 
                alt="Woman with healthy hair" 
                className="object-cover h-full w-full" 
                loading="lazy"
              />
              
              {/* Testimonial overlay - creates social proof */}
              <div className="absolute bottom-6 left-6 right-6 bg-white/90 backdrop-blur-sm p-4 rounded-lg shadow-sm z-20">
                <div className="flex items-center mb-2">
                  {[...Array(5)].map((_, i) => (
                    <svg key={i} className="w-4 h-4 text-rose-500 fill-current" viewBox="0 0 24 24">
                      <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
                    </svg>
                  ))}
                </div>
                <p className="text-sm text-neutral-700 italic">
                  "The care•atin newsletter has been my weekly dose of hair wisdom. I've learned so much about caring for my hair!"
                </p>
                <p className="text-xs font-medium mt-2">
                  — sarah m., member since 2022
                </p>
              </div>
            </div>
            
            {/* Right column - form */}
            <div className="p-8 md:p-10 flex flex-col justify-center">
              {!submitted ? (
                <>
                  <div className="mb-8">
                    <div className="bg-rose-100 w-12 h-12 rounded-full flex items-center justify-center mb-4">
                      <Mail className="w-6 h-6 text-rose-600" />
                    </div>
                    <h2 className="text-2xl md:text-3xl font-medium text-neutral-900 mb-3">join our community</h2>
                    <p className="text-neutral-600">
                      Get exclusive hair tips, early access to new products, and member-only discounts. Be part of a community that understands your hair journey.
                    </p>
                  </div>
                  
                  {/* Benefits - creates value proposition */}
                  <div className="mb-6">
                    <div className="flex items-start gap-2 mb-2">
                      <Check className="w-5 h-5 text-rose-500 flex-shrink-0 mt-0.5" />
                      <p className="text-sm text-neutral-700">Personalized hair care advice from experts</p>
                    </div>
                    <div className="flex items-start gap-2 mb-2">
                      <Check className="w-5 h-5 text-rose-500 flex-shrink-0 mt-0.5" />
                      <p className="text-sm text-neutral-700">Exclusive 15% off your first purchase</p>
                    </div>
                    <div className="flex items-start gap-2">
                      <Check className="w-5 h-5 text-rose-500 flex-shrink-0 mt-0.5" />
                      <p className="text-sm text-neutral-700">Early access to new products and research</p>
                    </div>
                  </div>
                  
                  <form onSubmit={handleSubmit}>
                    <div className="mb-4">
                      <label htmlFor="email" className="block text-sm font-medium text-neutral-700 mb-1">
                        Your email
                      </label>
                      <input 
                        type="email" 
                        id="email" 
                        className={`w-full px-4 py-3 rounded-lg border ${error ? 'border-red-300 bg-red-50' : 'border-neutral-300'} focus:outline-none focus:ring-2 focus:ring-rose-500 focus:border-transparent transition-colors`}
                        placeholder="Enter your email address"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                      />
                      {error && <p className="mt-1 text-sm text-red-600">{error}</p>}
                    </div>
                    
                    <button 
                      type="submit"
                      className="w-full bg-rose-500 hover:bg-rose-600 text-white font-medium py-3 px-4 rounded-lg transition-colors flex items-center justify-center gap-2"
                      disabled={loading}
                    >
                      {loading ? (
                        <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                        </svg>
                      ) : (
                        <>
                          Join Now <ArrowRight className="w-4 h-4" />
                        </>
                      )}
                    </button>
                  </form>
                  
                  <p className="text-xs text-neutral-500 mt-4 text-center">
                    We respect your privacy and will never share your information. Unsubscribe anytime.
                  </p>
                </>
              ) : (
                // Success state
                <div className="text-center py-8">
                  <div className="w-16 h-16 bg-rose-100 rounded-full flex items-center justify-center mx-auto mb-6">
                    <Check className="w-8 h-8 text-rose-600" />
                  </div>
                  <h3 className="text-2xl font-medium text-neutral-900 mb-2">Welcome to the family!</h3>
                  <p className="text-neutral-600 mb-6">
                    Your journey to healthier, more beautiful hair starts now. Check your inbox for a special welcome gift.
                  </p>
                  <div className="inline-block bg-rose-50 px-4 py-3 rounded-lg">
                    <p className="text-sm text-rose-600 font-medium">
                      HAIRLOVE15 — 15% off your first order
                    </p>
                  </div>
                </div>
              )}
              
              {/* Community size indicator - creates belonging cues */}
              <div className="mt-8 pt-6 border-t border-neutral-100 flex items-center justify-center">
                <div className="flex -space-x-2 mr-3">
                  {[1, 2, 3, 4].map((_, i) => (
                    <div key={i} className="w-6 h-6 rounded-full bg-neutral-300 border border-white overflow-hidden">
                      <img src={`/images/testimonial-${i+1}.jpg`} alt="Community member" className="w-full h-full object-cover" loading="lazy" />
                    </div>
                  ))}
                </div>
                <p className="text-sm text-neutral-600">
                  Join <span className="font-medium">14,000+</span> members in our hair care journey
                </p>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
} 