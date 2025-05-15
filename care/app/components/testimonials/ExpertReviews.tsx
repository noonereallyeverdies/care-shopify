import React from 'react';

// TODO: Fetch and map multiple expert reviews
// TODO: Ensure image paths like '/images/experts/dr-smith.jpg' are correct and images exist

const experts = [
  {
    name: "Dr. Jennifer Smith",
    credentials: "Board-Certified Dermatologist, Hair Loss Specialist",
    quote: "The combination of red light therapy with targeted delivery is what sets this device apart. My patients have seen remarkable improvements in follicular health.",
    image: "/images/experts/dr-smith.jpg" // Placeholder - ensure this image exists
  },
  {
    name: "Dr. Anya Sharma",
    credentials: "Trichologist, Clinical Hair Researcher",
    quote: "I've reviewed the clinical data, and the technology used in Care•atin is grounded in solid scientific principles for androgenetic alopecia and hair thinning.",
    image: "/images/experts/dr-sharma.jpg" // Placeholder - ensure this image exists
  }
];

// Updated function using user's simplified JSX structure
export function ExpertReviews() {
  return (
    <div className="space-y-8">
      <h3 className="text-xl font-semibold text-neutral-700 mb-4">Expert Endorsed</h3> {/* Updated heading */}
      
      {experts.map((expert, index) => (
        <div key={index} className="flex items-start p-6 bg-neutral-50 rounded-lg border border-neutral-100 shadow-sm"> {/* Simplified card styles */}
          <img 
            src={expert.image} 
            alt={expert.name} 
            className="w-16 h-16 rounded-full mr-4 object-cover flex-shrink-0" // Added object-cover and flex-shrink
          />
          <div className="flex-grow">
            <h4 className="font-medium text-lg text-neutral-800">{expert.name}</h4>
            <p className="text-sm text-neutral-600 mb-2">{expert.credentials}</p>
            {/* Simplified quote rendering */}
            <div className="relative italic text-neutral-700 pl-4 pr-2"> 
              <span className="absolute left-0 top-0 text-3xl font-serif text-rose-300 -mt-1">"</span>
              {expert.quote}
              <span className="absolute right-0 bottom-0 text-3xl font-serif text-rose-300">"</span>
            </div>
          </div>
        </div>
      ))}
      
      {/* Apple-style "Learn more" link */}
      <a href="#" className="inline-block text-rose-600 hover:text-rose-800 text-sm mt-4 transition-colors duration-200">
        Read more expert opinions →
      </a>
    </div>
  );
}