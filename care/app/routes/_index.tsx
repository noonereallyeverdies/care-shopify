import { defer, type LoaderFunctionArgs } from '@shopify/remix-oxygen';
import { useLoaderData, type MetaFunction } from '@remix-run/react';

// Import the planned section components (create these next)
// import { HeroSection } from '~/components/HeroSection';
// import { ProblemSolution } from '~/components/ProblemSolution';
// import { HowItWorksSnippet } from '~/components/HowItWorksSnippet';
// import { DeviceSpotlight } from '~/components/DeviceSpotlight';
// import { TestimonialSlider } from '~/components/TestimonialSlider';
// import { BeforeAfter } from '~/components/BeforeAfter';
// import { SocialProofLogos } from '~/components/SocialProofLogos';
// import { FinalCta } from '~/components/FinalCta';

export const meta: MetaFunction = () => {
  return [
    { title: 'Care-atin | Red Light Therapy for Hair Growth' },
    {
      name: 'description',
      content:
        'Revitalize your hair with Care-atin\'s science-backed Red Light Therapy device. Promote healthier, fuller hair naturally.',
    },
  ];
};

// Loader to fetch data needed specifically for the landing page sections
// For now, just fetching basic product info for DeviceSpotlight
export async function loader({ context }: LoaderFunctionArgs) {
  const { storefront } = context;
  // Example: Fetch a specific product by handle (replace 'care-atin-rlt-device' with actual handle)
  const { product } = await storefront.query(PRODUCT_QUERY, {
    variables: {
      handle: 'care-atin-rlt-device', // Replace with your actual product handle
      country: storefront.i18n.country,
      language: storefront.i18n.language,
    },
  });

  if (!product?.id) {
    console.warn(`Product with handle 'care-atin-rlt-device' not found.`);
    // Handle case where product isn't found - maybe throw redirect or return null
  }

  return defer({ product });
}

export default function Homepage() {
  const { product } = useLoaderData<typeof loader>();

  return (
    <div className="homepage">
      {/* <HeroSection /> */}
      {/* <ProblemSolution /> */}
      {/* <HowItWorksSnippet /> */}
      {/* Pass product data to the DeviceSpotlight component */}
      {/* {product ? <DeviceSpotlight product={product} /> : <p>Device information loading...</p>} */}
      {/* <TestimonialSlider /> */}
      {/* <BeforeAfter /> */}
      {/* <SocialProofLogos /> */}
      {/* <FinalCta /> */}
      {/* Add other sections as they are built */}
      {/* <SocialProofLogos /> */}
      {/* <FinalCta /> */}
      <div>Homepage Content Placeholder (Sections commented out)</div>
    </div>
  );
}

// Basic GraphQL query to fetch product info
// Needs refinement based on exactly what data DeviceSpotlight requires
const PRODUCT_QUERY = `#graphql
  query HomepageProductQuery(
    $handle: String!
    $country: CountryCode
    $language: LanguageCode
  ) @inContext(country: $country, language: $language) {
    product(handle: $handle) {
      id
      title
      descriptionHtml
      featuredImage {
        url
        altText
        width
        height
      }
      variants(first: 1) {
        nodes {
          id
          price {
            amount
            currencyCode
          }
        }
      }
    }
  }
`; 