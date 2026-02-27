import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Product Information | ALOWA',
  description: 'ALOWA product transparency and information. Wellness accessories, responsible communication.',
}

export default function ProductInformationPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 py-12 md:py-16">
      <h1 className="text-3xl md:text-4xl font-display font-normal text-gray-900 mb-2 tracking-wide">
        Product Information
      </h1>
      <p className="text-lg text-primary-600 font-medium mb-8">
        ALOWA — Product Transparency & Information
      </p>
      <p className="text-gray-600 leading-relaxed mb-10">
        At ALOWA, we aim to present our products with clarity, transparency, and responsible communication.
        Our language and visual presentation are designed to accurately reflect the nature of our products as wellness accessories, without medical positioning or claims.
      </p>

      <div className="space-y-8 text-gray-700 leading-relaxed">
        <section>
          <h2 className="text-xl font-semibold text-gray-900 mb-3">1. Product Positioning</h2>
          <p className="mb-3">ALOWA products are designed as non-medical wellness accessories.</p>
          <p className="mb-3">They are created to support everyday comfort, relaxation, and mindful routines as part of a balanced lifestyle. Descriptions of potential benefits refer to personal wellness experiences such as relaxation, improved daily comfort, or enhanced well-being habits.</p>
          <p className="mb-3">Individual experiences may vary from person to person.</p>
          <p className="font-semibold text-gray-900">ALOWA products are not intended to diagnose, treat, cure, or prevent any medical condition.</p>
        </section>

        <hr className="border-gray-200" />

        <section>
          <h2 className="text-xl font-semibold text-gray-900 mb-3">2. Reviews & Testimonials</h2>
          <p className="mb-3">Customer reviews and testimonials represent individual user experiences.</p>
          <p className="mb-3">Results and perceptions may differ depending on personal use, lifestyle, and expectations.</p>
          <p>When content is shared in collaboration with partners, creators, or ambassadors, it is presented in accordance with applicable advertising and consumer transparency standards.</p>
        </section>

        <hr className="border-gray-200" />

        <section>
          <h2 className="text-xl font-semibold text-gray-900 mb-3">3. Images & Product Representation</h2>
          <p className="mb-3">Images and videos displayed on our website or marketing materials are intended to illustrate typical product use, including everyday wear and lifestyle contexts.</p>
          <p className="mb-3">Visual content is created for illustrative purposes and should not be interpreted as guaranteed or universal outcomes.</p>
          <p>Experiences shown may not reflect the experience of every user.</p>
        </section>

        <hr className="border-gray-200" />

        <section>
          <h2 className="text-xl font-semibold text-gray-900 mb-3">4. Brand Origin & Materials</h2>
          <p className="mb-3">ALOWA is a US-based wellness brand, with product design developed in the United States and manufacturing carried out through international production partners.</p>
          <p>Information regarding materials, components, and product characteristics is shared transparently based on currently available data. Where testing or additional documentation is ongoing, distinctions are made between verified information and future updates.</p>
        </section>

        <hr className="border-gray-200" />

        <section>
          <h2 className="text-xl font-semibold text-gray-900 mb-3">5. Responsible Communication</h2>
          <p>ALOWA communicates its products within the scope of general wellness and lifestyle support. No medical or therapeutic claims are made, and our products are intended to complement — not replace — professional medical advice or treatment.</p>
        </section>

        <hr className="border-gray-200" />

        <section>
          <h2 className="text-xl font-semibold text-gray-900 mb-3">Contact</h2>
          <p>For questions about our products or this information, contact us at <a href="mailto:support@wearealowa.com" className="text-primary-600 hover:underline">support@wearealowa.com</a>.</p>
        </section>
      </div>
    </div>
  )
}
