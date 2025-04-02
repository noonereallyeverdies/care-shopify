import { Link } from "@remix-run/react";

const PRODUCT_COLORS = {
  'Rose Gold': {
    bg: 'bg-rose-100',
    text: 'text-rose-900',
    border: 'border-rose-200',
    hex: '#FFB4B4'
  },
  'Midnight Black': {
    bg: 'bg-gray-900',
    text: 'text-white',
    border: 'border-gray-700',
    hex: '#1F2937'
  },
  'Ocean Blue': {
    bg: 'bg-blue-100',
    text: 'text-blue-900',
    border: 'border-blue-200',
    hex: '#93C5FD'
  }
};

export default function ProductHandle() {
  return (
    <section className="w-full gap-4 md:gap-8 grid px-6 md:px-8 lg:px-12">
      <div className="grid items-start gap-6 lg:gap-20 md:grid-cols-2 lg:grid-cols-3">
        <div className="grid gap-4 lg:col-span-2">
          <div className="grid gap-4">
            {/* ... existing product image gallery ... */}
          </div>
        </div>

        <div className="grid gap-8 md:sticky md:top-[8rem]">
          {/* ... existing product title and price ... */}

          <div className="grid gap-8">
            <div className="prose prose-sm">
              <div className="space-y-8">
                {/* Benefits Section */}
                <div className="bg-primary/5 rounded-2xl p-6 space-y-4">
                  <h3 className="text-xl font-medium text-primary">Product Benefits</h3>
                  <div className="grid gap-4">
                    <div className="flex items-start gap-3">
                      <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center shrink-0">
                        <span className="text-primary">✨</span>
                      </div>
                      <div>
                        <h4 className="font-medium text-primary">Visible Hair Growth</h4>
                        <p className="text-primary/80">Stimulates hair follicles to promote fuller, thicker hair with regular use.</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center shrink-0">
                        <span className="text-primary">🌱</span>
                      </div>
                      <div>
                        <h4 className="font-medium text-primary">Scalp Rejuvenation</h4>
                        <p className="text-primary/80">Reduces scalp irritation and promotes healthy skin for better hair retention.</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center shrink-0">
                        <span className="text-primary">💫</span>
                      </div>
                      <div>
                        <h4 className="font-medium text-primary">Advanced Red Light Therapy</h4>
                        <p className="text-primary/80">Safe, non-invasive treatment that improves overall hair and scalp health.</p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Usage Instructions */}
                <div className="bg-contrast rounded-2xl p-6 space-y-4 border border-primary/10">
                  <h3 className="text-xl font-medium text-primary flex items-center gap-2">
                    <span className="w-6 h-6">📖</span>
                    Usage Instructions
                  </h3>
                  <ol className="list-decimal list-inside space-y-2 text-primary/80">
                    <li>Start by parting your hair to expose the scalp</li>
                    <li>Gently place the Photonique Touch™ on your scalp</li>
                    <li>Turn on the red light therapy feature</li>
                    <li>Move the device slowly across your scalp in a circular motion for 5-10 minutes</li>
                    <li>Use 2-3 times per week</li>
                  </ol>
                  <p className="text-sm text-primary/60 italic">For optimal results, use on clean, dry hair.</p>
                </div>

                {/* What's in the Box */}
                <div className="bg-contrast rounded-2xl p-6 space-y-4 border border-primary/10">
                  <h3 className="text-xl font-medium text-primary flex items-center gap-2">
                    <span className="w-6 h-6">📦</span>
                    In the Package
                  </h3>
                  <ul className="space-y-2">
                    <li className="flex items-center gap-2">
                      <span className="w-5 h-5 rounded-full bg-primary/10 flex items-center justify-center text-xs">✓</span>
                      <span className="text-primary/80">Photonique Touch™ device</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <span className="w-5 h-5 rounded-full bg-primary/10 flex items-center justify-center text-xs">✓</span>
                      <span className="text-primary/80">USB-C charging cable</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <span className="w-5 h-5 rounded-full bg-primary/10 flex items-center justify-center text-xs">✓</span>
                      <span className="text-primary/80">Comprehensive user manual</span>
                    </li>
                  </ul>
                </div>

                {/* Materials */}
                <div className="bg-contrast rounded-2xl p-6 space-y-4 border border-primary/10">
                  <h3 className="text-xl font-medium text-primary flex items-center gap-2">
                    <span className="w-6 h-6">🛠️</span>
                    Premium Materials
                  </h3>
                  <div className="space-y-3">
                    <div>
                      <h4 className="font-medium text-primary">Device Body</h4>
                      <p className="text-primary/80">Premium aluminum alloy for durability and elegance</p>
                    </div>
                    <div>
                      <h4 className="font-medium text-primary">Massage Heads</h4>
                      <p className="text-primary/80">Medical-grade stainless steel and biomimetic polymer for comfortable oil application</p>
                    </div>
                    <div>
                      <h4 className="font-medium text-primary">Comb Cover</h4>
                      <p className="text-primary/80">Soft, medical-grade silicone for gentle hygienic care</p>
                    </div>
                  </div>
                </div>

                {/* Shipping Info */}
                <div className="bg-contrast rounded-2xl p-6 space-y-4 border border-primary/10">
                  <h3 className="text-xl font-medium text-primary flex items-center gap-2">
                    <span className="w-6 h-6">🚚</span>
                    Shipping Information
                  </h3>
                  <p className="text-primary/80">When can I expect to receive my Care-atin package—are there currently processing or shipping delays?</p>
                  <Link
                    to="/policies/shipping"
                    className="inline-flex items-center gap-2 text-primary hover:text-primary/80 transition-colors"
                  >
                    <span>Learn more about shipping</span>
                    <span>→</span>
                  </Link>
                </div>

                {/* Returns & Warranty */}
                <div className="bg-contrast rounded-2xl p-6 space-y-4 border border-primary/10">
                  <h3 className="text-xl font-medium text-primary flex items-center gap-2">
                    <span className="w-6 h-6">💝</span>
                    Returns & Warranty
                  </h3>
                  <p className="text-primary/80">We love our customers and want you to love your purchases without the stress of being stuck with an item you don't like. We understand the difficulties of shopping online and will ensure to provide top notch service so you will always be happy shopping with us!</p>
                  <Link
                    to="/policies/returns"
                    className="inline-flex items-center gap-2 text-primary hover:text-primary/80 transition-colors"
                  >
                    <span>Learn more about our return policy</span>
                    <span>→</span>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
} 