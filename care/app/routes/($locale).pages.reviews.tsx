import React, {useState} from 'react';
import {defer, type LoaderFunctionArgs} from '@shopify/remix-oxygen';
import {useLoaderData} from '@remix-run/react';
import {Seo} from '@shopify/hydrogen';
import {motion} from 'framer-motion';
import {Star, ChevronDown, ChevronUp, Filter} from 'lucide-react';

// Import components
import {PageHeader, Section} from '~/components/Text';
import {ReviewCard} from '~/components/ReviewCard';
import {Link} from '~/components/Link';

// Define loader for SEO
export async function loader({context}: LoaderFunctionArgs) {
  const {storefront} = context;
  const seo = seoPayload.page({title: 'Customer Reviews - Care•Atin', url: '/pages/reviews'});

  return defer({seo});
}

// Sample review data
const reviews = [
  {
    id: 'review1',
    name: 'Jennifer K.',
    location: 'Chicago, IL',
    age: 42,
    hairType: 'Fine, Postpartum Thinning',
    rating: 5,
    title: 'Life-changing results after trying everything else',
    review: "I tried everything from specialized shampoos to expensive salon treatments after my second pregnancy left my hair noticeably thinner. Nothing worked until I found care•atin. My shedding reduced by 60% in just 6 weeks, and by month 3, my hairdresser commented on how much thicker my hair was looking. The before/after photos don't lie - my part line is much less visible and I finally feel confident enough to wear my hair down again. I love that it only takes 8 minutes a few times a week, making it easy to fit into my busy mom schedule. Worth every penny!",
    verifiedPurchase: true,
    datePosted: '2023-09-15',
    usedFor: '4 months',
    hairDensityImprovement: '78%',
    sheddingReduction: '60%',
    imageBefore: '/images/reviews/jennifer-before.jpg',
    imageAfter: '/images/reviews/jennifer-after.jpg',
    tags: ['Postpartum', 'Visible Improvement', 'Easy To Use']
  },
  {
    id: 'review2',
    name: 'Michael R.',
    location: 'Boston, MA',
    age: 38,
    hairType: 'Thick, Male Pattern Thinning',
    rating: 5,
    title: 'Skeptical at first, now a believer',
    review: "I was starting to notice my crown thinning at 38, and being in the medical field, I researched extensively before trying care•atin. The scientific studies were convincing enough for me to give it a try. I was skeptical at first but decided to document my journey with photos. After 12 weeks of consistent use, the difference is remarkable. My crown has filled in significantly, and my barber actually noticed the improvement before I pointed it out. No side effects, no mess, and the app reminders help me stay consistent. This is now a permanent part of my grooming routine.",
    verifiedPurchase: true,
    datePosted: '2023-08-22',
    usedFor: '3 months',
    hairDensityImprovement: '32%',
    sheddingReduction: '45%',
    imageBefore: '/images/reviews/michael-before.jpg',
    imageAfter: '/images/reviews/michael-after.jpg',
    tags: ['Male Pattern', 'Crown Area', 'Clinically Proven']
  },
  {
    id: 'review3',
    name: 'Sarah T.',
    location: 'Denver, CO',
    age: 35,
    hairType: 'Curly, Stress-induced Thinning',
    rating: 5,
    title: 'My hairdresser noticed the difference',
    review: "After going through a stressful period at work, I noticed my curls were looking significantly thinner and my scalp was becoming visible. I tried care•atin after a friend recommended it, and I'm so glad I did. After about 8 weeks, I started noticing baby hairs appearing along my hairline. At my 3-month salon appointment, my hairdresser asked what I was doing differently because my hair was noticeably thicker. That's when I knew it wasn't just in my head! I love that I can use my own natural oils with the device, and the gentle massage feels amazing on my scalp. My curls are bouncy and full again!",
    verifiedPurchase: true,
    datePosted: '2023-10-05',
    usedFor: '5 months',
    hairDensityImprovement: '45%',
    sheddingReduction: '70%',
    imageBefore: '/images/reviews/sarah-before.jpg',
    imageAfter: '/images/reviews/sarah-after.jpg',
    tags: ['Curly Hair', 'Stress-related', 'New Growth']
  },
  {
    id: 'review4',
    name: 'David L.',
    location: 'Seattle, WA',
    age: 44,
    hairType: 'Medium, Receding Hairline',
    rating: 4,
    title: 'Steady improvement for receding hairline',
    review: "I've been using care•atin for about 6 months now, focusing mainly on my receding temples. While I haven't seen dramatic regrowth in those areas (which is why I gave 4 stars), I have noticed a significant slowing of hair loss and some baby hairs starting to come in. The overall quality and thickness of my existing hair has improved dramatically - it looks healthier and feels stronger. I appreciate the rechargeable design and how easy it is to use. I'd recommend setting realistic expectations if you have long-term hair loss, but it's definitely making a positive difference for me.",
    verifiedPurchase: true,
    datePosted: '2023-07-18',
    usedFor: '6 months',
    hairDensityImprovement: '22%',
    sheddingReduction: '55%',
    imageBefore: '/images/reviews/david-before.jpg',
    imageAfter: '/images/reviews/david-after.jpg',
    tags: ['Receding Hairline', 'Hair Quality', 'Long-term Use']
  },
  {
    id: 'review5',
    name: 'Elise M.',
    location: 'Miami, FL',
    age: 39,
    hairType: 'Fine, Overall Thinning',
    rating: 5,
    title: 'Finally comfortable wearing my hair down again',
    review: "After trying countless products that promised results but delivered nothing, I was hesitant to try yet another hair solution. But care•atin has been different from the start. The scientific approach made sense to me, and the 60-day guarantee gave me confidence to try it. I'm so glad I did! The difference in my part line and overall thickness was undeniable after about 10 weeks. I finally felt confident enough to wear my hair down again after years of hiding it in ponytails and updos. The device is beautifully designed - it looks like a premium beauty tool, not a medical device. It's also incredibly easy to use and the battery life is excellent.",
    verifiedPurchase: true,
    datePosted: '2023-11-12',
    usedFor: '4 months',
    hairDensityImprovement: '35%',
    sheddingReduction: '50%',
    imageBefore: '/images/reviews/elise-before.jpg',
    imageAfter: '/images/reviews/elise-after.jpg',
    tags: ['Fine Hair', 'Visible Results', 'Premium Design']
  },
  {
    id: 'review6',
    name: 'James H.',
    location: 'Austin, TX',
    age: 32,
    hairType: 'Thick, Early Thinning',
    rating: 5,
    title: 'Caught it early and maintained my hair',
    review: "I noticed my hair starting to thin slightly at the crown and decided to be proactive rather than waiting until it got worse. After researching options, I chose care•atin because it had no side effects and seemed the most scientifically sound. After 3 months of consistent use, not only has the thinning stopped, but the area has filled in and looks just as thick as the rest of my hair. The massage function feels great, and I actually look forward to my treatment time - it's become a nice mindfulness break in my day. The app tracking features are helpful for staying consistent. I'm planning to continue using it indefinitely as preventative maintenance.",
    verifiedPurchase: true,
    datePosted: '2023-10-29',
    usedFor: '3 months',
    hairDensityImprovement: '25%',
    sheddingReduction: '30%',
    imageBefore: '/images/reviews/james-before.jpg',
    imageAfter: '/images/reviews/james-after.jpg',
    tags: ['Early Intervention', 'Preventative', 'Relaxing']
  },
  {
    id: 'review7',
    name: 'Maria L.',
    location: 'San Diego, CA',
    age: 46,
    hairType: 'Wavy, Menopausal Thinning',
    rating: 5,
    title: 'Surprised by how well this works for hormonal thinning',
    review: "Perimenopause hit my hair hard - I was losing handfuls in the shower and my once-thick waves were looking flat and sparse. After 4 months with care•atin, I'm absolutely amazed by the transformation. My shedding is down by at least 60%, and I have new growth all over, especially at my temples which had started to recede. What I particularly love is how this treatment works with my natural hair cycle rather than using harsh chemicals. I use it with a light rosemary oil and the combination seems to work wonderfully. I've already recommended it to several friends experiencing similar issues.",
    verifiedPurchase: true,
    datePosted: '2023-09-02',
    usedFor: '4 months',
    hairDensityImprovement: '42%',
    sheddingReduction: '60%',
    imageBefore: '/images/reviews/maria-before.jpg',
    imageAfter: '/images/reviews/maria-after.jpg',
    tags: ['Hormonal', 'Temples', 'Natural Approach']
  },
  {
    id: 'review8',
    name: 'Robert J.',
    location: 'Philadelphia, PA',
    age: 50,
    hairType: 'Coarse, Advanced Thinning',
    rating: 4,
    title: 'Good results even with longstanding loss',
    review: "I've been experiencing hair loss for nearly 15 years and had resigned myself to it being too late for treatment. I tried care•atin more out of curiosity than expectation after reading about the science. While I haven't experienced dramatic regrowth, I have noticed a significant improvement in the quality of my existing hair and some modest thickening overall. The hair I do have looks healthier, feels stronger, and styles better. I'm giving 4 stars only because the results for advanced, long-term hair loss are naturally more modest, but I'm still very pleased with the improvement and will continue using the device.",
    verifiedPurchase: true,
    datePosted: '2023-08-10',
    usedFor: '5 months',
    hairDensityImprovement: '18%',
    sheddingReduction: '40%',
    imageBefore: '/images/reviews/robert-before.jpg',
    imageAfter: '/images/reviews/robert-after.jpg',
    tags: ['Advanced Loss', 'Hair Quality', 'Realistic Expectations']
  }
];

// Filter options
const filterOptions = {
  ratings: [5, 4, 3, 2, 1],
  hairTypes: ['Fine', 'Medium', 'Thick', 'Curly', 'Wavy', 'Coarse'],
  concerns: ['Postpartum', 'Male Pattern', 'Stress-induced', 'Receding Hairline', 'Overall Thinning', 'Early Thinning', 'Menopausal', 'Advanced Thinning'],
  usageDuration: ['1-3 months', '4-6 months', '7-12 months', 'Over 1 year']
};

// Review statistics
const reviewStats = {
  totalReviews: reviews.length,
  averageRating: (reviews.reduce((acc, review) => acc + review.rating, 0) / reviews.length).toFixed(1),
  ratingBreakdown: {
    5: reviews.filter(r => r.rating === 5).length,
    4: reviews.filter(r => r.rating === 4).length,
    3: reviews.filter(r => r.rating === 3).length,
    2: reviews.filter(r => r.rating === 2).length,
    1: reviews.filter(r => r.rating === 1).length
  },
  verifiedPurchases: reviews.filter(r => r.verifiedPurchase).length,
  withPhotos: reviews.filter(r => r.imageBefore && r.imageAfter).length
};

// Reviews Page Component
export default function ReviewsPage() {
  const {seo} = useLoaderData<typeof loader>();
  const [currentSort, setCurrentSort] = useState('newest');
  const [showFilters, setShowFilters] = useState(false);
  const [activeFilters, setActiveFilters] = useState({
    ratings: [],
    hairTypes: [],
    concerns: [],
    usageDuration: []
  });

  // Sort reviews based on current sort option
  const sortedReviews = [...reviews].sort((a, b) => {
    switch (currentSort) {
      case 'newest':
        return new Date(b.datePosted).getTime() - new Date(a.datePosted).getTime();
      case 'highest':
        return b.rating - a.rating;
      case 'lowest':
        return a.rating - b.rating;
      case 'helpful':
        // This would normally be based on some "helpful votes" value
        // For this example, we'll just use a random sort
        return 0.5 - Math.random();
      default:
        return 0;
    }
  });

  // Filter reviews
  const filteredReviews = sortedReviews.filter(review => {
    // If no filters are active, show all reviews
    if (Object.values(activeFilters).every(filters => filters.length === 0)) {
      return true;
    }

    let passesFilters = true;

    // Rating filter
    if (activeFilters.ratings.length > 0) {
      passesFilters = passesFilters && activeFilters.ratings.includes(review.rating);
    }

    // Hair type filter
    if (activeFilters.hairTypes.length > 0) {
      passesFilters = passesFilters && activeFilters.hairTypes.some(type => 
        review.hairType.toLowerCase().includes(type.toLowerCase())
      );
    }

    // Concerns filter
    if (activeFilters.concerns.length > 0) {
      passesFilters = passesFilters && activeFilters.concerns.some(concern => 
        review.hairType.toLowerCase().includes(concern.toLowerCase())
      );
    }

    // Usage duration filter
    if (activeFilters.usageDuration.length > 0) {
      const months = parseInt(review.usedFor.split(' ')[0]);
      
      return passesFilters && activeFilters.usageDuration.some(duration => {
        if (duration === '1-3 months' && months >= 1 && months <= 3) return true;
        if (duration === '4-6 months' && months >= 4 && months <= 6) return true;
        if (duration === '7-12 months' && months >= 7 && months <= 12) return true;
        if (duration === 'Over 1 year' && months > 12) return true;
        return false;
      });
    }

    return passesFilters;
  });

  // Toggle filter selection
  const toggleFilter = (category, value) => {
    setActiveFilters(prev => {
      const newFilters = {...prev};
      if (newFilters[category].includes(value)) {
        newFilters[category] = newFilters[category].filter(v => v !== value);
      } else {
        newFilters[category] = [...newFilters[category], value];
      }
      return newFilters;
    });
  };

  // Clear all filters
  const clearFilters = () => {
    setActiveFilters({
      ratings: [],
      hairTypes: [],
      concerns: [],
      usageDuration: []
    });
  };

  // Count total active filters
  const activeFilterCount = Object.values(activeFilters).reduce(
    (count, filters) => count + filters.length, 
    0
  );

  return (
    <>
      <Seo type="page" data={seo} />
      
      {/* Page Header */}
      <PageHeader
        heading="Customer Reviews"
        className="text-3xl md:text-5xl font-light text-primary py-16 md:py-20 lg:py-24 text-center bg-contrast"
      />

      {/* Review Summary Section */}
      <Section padding="all" className="py-12 md:py-16 bg-primary/5">
        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-2 gap-8 items-center">
            {/* Left side: Rating stats */}
            <div>
              <h2 className="text-2xl md:text-3xl font-light text-primary mb-6">
                What Our Customers Say
              </h2>
              
              <div className="flex items-center mb-6">
                <div className="flex items-baseline mr-3">
                  <span className="text-4xl font-light">{reviewStats.averageRating}</span>
                  <span className="text-lg text-neutral-500">/5</span>
                </div>
                <div className="flex items-center">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <Star
                      key={star}
                      className={`w-5 h-5 ${star <= Math.round(parseFloat(reviewStats.averageRating)) ? 'text-amber-400 fill-amber-400' : 'text-neutral-300'}`}
                    />
                  ))}
                </div>
                <span className="ml-3 text-sm text-neutral-500">
                  Based on {reviewStats.totalReviews} reviews
                </span>
              </div>
              
              <div className="space-y-2">
                {[5, 4, 3, 2, 1].map(rating => (
                  <div key={rating} className="flex items-center">
                    <div className="flex items-center w-24">
                      <span className="mr-1">{rating}</span>
                      <Star className="w-4 h-4 text-amber-400 fill-amber-400" />
                    </div>
                    <div className="flex-1 h-2 bg-neutral-200 rounded-full overflow-hidden">
                      <div 
                        className="h-full bg-amber-400 rounded-full" 
                        style={{ 
                          width: `${(reviewStats.ratingBreakdown[rating] / reviewStats.totalReviews) * 100}%` 
                        }}
                      ></div>
                    </div>
                    <span className="ml-3 text-sm text-neutral-500 w-10">
                      {reviewStats.ratingBreakdown[rating]}
                    </span>
                  </div>
                ))}
              </div>
              
              <div className="mt-8 space-y-2">
                <div className="flex items-center">
                  <div className="w-6 h-6 rounded-full flex items-center justify-center bg-rose-100 text-rose-600 mr-2">
                    ✓
                  </div>
                  <span className="text-neutral-700">{reviewStats.verifiedPurchases} verified purchases</span>
                </div>
                <div className="flex items-center">
                  <div className="w-6 h-6 rounded-full flex items-center justify-center bg-rose-100 text-rose-600 mr-2">
                    📷
                  </div>
                  <span className="text-neutral-700">{reviewStats.withPhotos} reviews with photos</span>
                </div>
              </div>
            </div>
            
            {/* Right side: CTA */}
            <div className="bg-white rounded-xl p-6 md:p-8 shadow-sm">
              <h3 className="text-xl font-medium text-primary mb-4">
                Share Your Experience
              </h3>
              <p className="text-neutral-700 mb-6">
                We'd love to hear about your journey with care•atin. Your feedback helps us improve and assists others in their decision-making process.
              </p>
              <Link 
                to="#"
                className="inline-flex items-center justify-center px-6 py-3 rounded-full bg-rose-600 text-white font-medium hover:bg-rose-700 transition-colors w-full md:w-auto"
              >
                Write a Review
              </Link>
            </div>
          </div>
        </div>
      </Section>
      
      {/* Reviews Listing Section */}
      <Section padding="all" className="py-12 md:py-16">
        <div className="max-w-6xl mx-auto">
          {/* Controls: Sort and Filter */}
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
            {/* Sort dropdown */}
            <div className="flex items-center">
              <span className="text-sm text-neutral-700 mr-2">Sort by:</span>
              <select
                value={currentSort}
                onChange={(e) => setCurrentSort(e.target.value)}
                className="border border-neutral-300 rounded-md py-2 px-3 text-sm focus:outline-none focus:ring-2 focus:ring-rose-500"
              >
                <option value="newest">Newest</option>
                <option value="highest">Highest Rated</option>
                <option value="lowest">Lowest Rated</option>
                <option value="helpful">Most Helpful</option>
              </select>
            </div>
            
            {/* Filter toggle */}
            <button
              onClick={() => setShowFilters(!showFilters)}
              className="flex items-center text-sm font-medium text-neutral-800 hover:text-rose-600 transition-colors"
            >
              <Filter className="w-4 h-4 mr-2" />
              Filter Reviews
              {activeFilterCount > 0 && (
                <span className="ml-2 px-2 py-0.5 bg-rose-100 text-rose-600 rounded-full text-xs">
                  {activeFilterCount}
                </span>
              )}
              {showFilters ? (
                <ChevronUp className="w-4 h-4 ml-2" />
              ) : (
                <ChevronDown className="w-4 h-4 ml-2" />
              )}
            </button>
          </div>
          
          {/* Filter panel */}
          {showFilters && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="bg-neutral-50 rounded-lg p-6 mb-8"
            >
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-lg font-medium text-primary">Filter Reviews</h3>
                {activeFilterCount > 0 && (
                  <button
                    onClick={clearFilters}
                    className="text-sm text-rose-600 hover:text-rose-700 transition-colors"
                  >
                    Clear all filters
                  </button>
                )}
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                {/* Rating filter */}
                <div>
                  <h4 className="text-sm font-medium text-neutral-900 mb-2">Rating</h4>
                  <div className="space-y-2">
                    {filterOptions.ratings.map(rating => (
                      <label key={rating} className="flex items-center text-sm text-neutral-700 cursor-pointer">
                        <input
                          type="checkbox"
                          checked={activeFilters.ratings.includes(rating)}
                          onChange={() => toggleFilter('ratings', rating)}
                          className="mr-2 h-4 w-4 rounded border-neutral-300 text-rose-600 focus:ring-rose-500"
                        />
                        <div className="flex items-center">
                          {rating}
                          <Star className="w-4 h-4 text-amber-400 fill-amber-400 ml-1" />
                          <span className="ml-1 text-neutral-500">
                            ({reviewStats.ratingBreakdown[rating]})
                          </span>
                        </div>
                      </label>
                    ))}
                  </div>
                </div>
                
                {/* Hair Type filter */}
                <div>
                  <h4 className="text-sm font-medium text-neutral-900 mb-2">Hair Type</h4>
                  <div className="space-y-2">
                    {filterOptions.hairTypes.map(type => (
                      <label key={type} className="flex items-center text-sm text-neutral-700 cursor-pointer">
                        <input
                          type="checkbox"
                          checked={activeFilters.hairTypes.includes(type)}
                          onChange={() => toggleFilter('hairTypes', type)}
                          className="mr-2 h-4 w-4 rounded border-neutral-300 text-rose-600 focus:ring-rose-500"
                        />
                        {type}
                      </label>
                    ))}
                  </div>
                </div>
                
                {/* Concerns filter */}
                <div>
                  <h4 className="text-sm font-medium text-neutral-900 mb-2">Concerns</h4>
                  <div className="space-y-2">
                    {filterOptions.concerns.map(concern => (
                      <label key={concern} className="flex items-center text-sm text-neutral-700 cursor-pointer">
                        <input
                          type="checkbox"
                          checked={activeFilters.concerns.includes(concern)}
                          onChange={() => toggleFilter('concerns', concern)}
                          className="mr-2 h-4 w-4 rounded border-neutral-300 text-rose-600 focus:ring-rose-500"
                        />
                        {concern}
                      </label>
                    ))}
                  </div>
                </div>
                
                {/* Usage Duration filter */}
                <div>
                  <h4 className="text-sm font-medium text-neutral-900 mb-2">Usage Duration</h4>
                  <div className="space-y-2">
                    {filterOptions.usageDuration.map(duration => (
                      <label key={duration} className="flex items-center text-sm text-neutral-700 cursor-pointer">
                        <input
                          type="checkbox"
                          checked={activeFilters.usageDuration.includes(duration)}
                          onChange={() => toggleFilter('usageDuration', duration)}
                          className="mr-2 h-4 w-4 rounded border-neutral-300 text-rose-600 focus:ring-rose-500"
                        />
                        {duration}
                      </label>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>
          )}
          
          {/* Reviews grid */}
          {filteredReviews.length > 0 ? (
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-12">
              {filteredReviews.map((review, index) => (
                <motion.div
                  key={review.id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                >
                  <ReviewCard review={review} />
                </motion.div>
              ))}
            </div>
          ) : (
            <div className="text-center py-16">
              <h3 className="text-lg font-medium text-neutral-900 mb-2">No reviews match your filters</h3>
              <p className="text-neutral-600 mb-4">Try adjusting your filter criteria to see more reviews.</p>
              <button
                onClick={clearFilters}
                className="inline-flex items-center justify-center px-4 py-2 rounded-md bg-rose-600 text-white font-medium hover:bg-rose-700 transition-colors"
              >
                Clear all filters
              </button>
            </div>
          )}
          
          {/* Write a review CTA */}
          <div className="bg-neutral-50 rounded-xl p-8 text-center">
            <h3 className="text-xl font-medium text-primary mb-4">
              Have you used care•atin?
            </h3>
            <p className="text-neutral-700 mb-6 max-w-2xl mx-auto">
              Share your experience with our community. Your honest feedback helps us improve our products and helps others make informed decisions about their hair care journey.
            </p>
            <Link 
              to="#"
              className="inline-flex items-center justify-center px-6 py-3 rounded-full bg-rose-600 text-white font-medium hover:bg-rose-700 transition-colors"
            >
              Write a Review
            </Link>
          </div>
        </div>
      </Section>
    </>
  );
}

// Helper for SEO
const seoPayload = {
  page: ({title, url}: {title: string; url: string}) => ({
    title,
    url,
    handle: url.substring(url.lastIndexOf('/') + 1),
  }),
};
