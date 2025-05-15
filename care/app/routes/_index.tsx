import { type LoaderFunctionArgs } from '@shopify/remix-oxygen';
import { useLoaderData } from '@remix-run/react';
import { Image } from '@shopify/hydrogen';

// Simple loader for now
export async function loader({ context }: LoaderFunctionArgs) {
  return {
    shop: context.storefront.getShopPrimaryDomain(),
  };
}

export default function Homepage() {
  const data = useLoaderData<typeof loader>();

  return (
    <div className="homepage">
      {/* Hero Section */}
      <section className="hero bg-gradient-to-r from-primary/10 to-secondary/10 py-20">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-5xl md:text-6xl font-manrope font-bold mb-6">
            care<span className="text-primary">•</span>atin
          </h1>
          <p className="text-xl md:text-2xl text-gray-600 mb-8 max-w-3xl mx-auto">
            Revolutionary hair wellness technology that transforms your hair from the inside out
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="btn-primary text-lg px-8 py-3">
              Shop Now
            </button>
            <button className="border-2 border-primary text-primary hover:bg-primary hover:text-white px-8 py-3 rounded-md transition-all duration-200">
              Learn More
            </button>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-manrope font-bold text-center mb-12">
            Why Choose care•atin?
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 className="text-xl font-manrope font-semibold mb-2">Science-Backed</h3>
              <p className="text-gray-600">Clinically proven formulations with natural ingredients</p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-secondary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-secondary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </div>
              <h3 className="text-xl font-manrope font-semibold mb-2">Fast Results</h3>
              <p className="text-gray-600">See visible improvements in just 2-4 weeks</p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                </svg>
              </div>
              <h3 className="text-xl font-manrope font-semibold mb-2">All Hair Types</h3>
              <p className="text-gray-600">Suitable for every hair type and texture</p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-manrope font-bold mb-6">
            Ready to Transform Your Hair?
          </h2>
          <p className="text-lg text-gray-600 mb-8 max-w-2xl mx-auto">
            Join thousands of satisfied customers who have discovered the power of care•atin
          </p>
          <button className="btn-primary text-lg px-8 py-3">
            Start Your Journey
          </button>
        </div>
      </section>
    </div>
  );
}
