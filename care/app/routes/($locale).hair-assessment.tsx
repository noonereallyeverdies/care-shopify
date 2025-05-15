import { LoaderFunctionArgs } from '@shopify/remix-oxygen';
import { HairAssessment } from '~/components/HairAssessment';

export async function loader({ params, context }: LoaderFunctionArgs) {
  return {
    title: 'Hair Assessment | Care-atin',
    description: 'Take our personalized hair assessment to discover your optimal Care-atin protocol.',
  };
}

export default function AssessmentPage() {
  return (
    <div className="assessment-page">
      <HairAssessment />
    </div>
  );
}

export function meta() {
  return [
    { title: 'Hair Assessment | Care-atin' },
    { 
      description: 'Take our personalized hair assessment to discover your optimal Care-atin protocol. Get customized recommendations based on your unique hair profile.' 
    },
    { name: 'keywords', content: 'hair assessment, hair analysis, personalized hair care, hair loss quiz' },
    { property: 'og:title', content: 'Hair Assessment | Care-atin' },
    { property: 'og:description', content: 'Discover your personalized hair care protocol with our comprehensive assessment' },
    { property: 'og:type', content: 'website' },
  ];
}
