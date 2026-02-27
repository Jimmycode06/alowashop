import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Terms of Service | ALOWA',
  description: 'Terms of Service for ALOWA wellness products and website.',
}

export default function TermsOfServicePage() {
  return (
    <div className="max-w-4xl mx-auto px-4 py-12 md:py-16">
      <h1 className="text-3xl md:text-4xl font-display font-normal text-gray-900 mb-8 tracking-wide">
        Terms of Service
      </h1>

      <p className="text-gray-600 leading-relaxed mb-8">
        The ALOWA trademark is operated by a European-based entity. By accessing and using this website and our products, you agree to the following terms and conditions.
      </p>

      <div className="space-y-8 text-gray-700 leading-relaxed">
        <section>
          <h2 className="text-xl font-semibold text-gray-900 mb-3">1. Acceptance of Terms</h2>
          <p>By using the ALOWA website and purchasing or using our products, you accept these Terms of Service. If you do not agree with any part of these terms, please do not use our services.</p>
        </section>

        <hr className="border-gray-200" />

        <section>
          <h2 className="text-xl font-semibold text-gray-900 mb-3">2. Use of Website & Products</h2>
          <p className="mb-3">ALOWA products are wellness accessories designed for personal use. They are not intended to diagnose, treat, cure, or prevent any medical condition. Use our website and products in accordance with their intended purpose and applicable laws in your jurisdiction.</p>
          <p>You may not use our website or products for any unlawful purpose or in any way that could harm, disable, or impair the service.</p>
        </section>

        <hr className="border-gray-200" />

        <section>
          <h2 className="text-xl font-semibold text-gray-900 mb-3">3. Intellectual Property</h2>
          <p>All content on this website, including but not limited to the ALOWA name, logo, designs, text, images, and graphics, is the property of the European-based entity operating the ALOWA trademark and is protected by intellectual property laws. You may not reproduce, distribute, or use any content without prior written permission.</p>
        </section>

        <hr className="border-gray-200" />

        <section>
          <h2 className="text-xl font-semibold text-gray-900 mb-3">4. Orders, Payment & Shipping</h2>
          <p className="mb-3">By placing an order, you agree to provide accurate information and to pay the full amount due. We reserve the right to refuse or cancel orders. Shipping and delivery are subject to our shipping policy and your location.</p>
          <p>Prices are displayed in the currency indicated on the website and may be subject to change without prior notice.</p>
        </section>

        <hr className="border-gray-200" />

        <section>
          <h2 className="text-xl font-semibold text-gray-900 mb-3">5. Returns & Refunds</h2>
          <p>Returns and refunds are handled in accordance with our return policy. Please refer to the relevant section on our website or contact our support team at <a href="mailto:support@wearealowa.com" className="text-primary-600 hover:underline">support@wearealowa.com</a> for details.</p>
        </section>

        <hr className="border-gray-200" />

        <section>
          <h2 className="text-xl font-semibold text-gray-900 mb-3">6. Limitation of Liability</h2>
          <p>To the fullest extent permitted by law, the European-based entity operating the ALOWA trademark shall not be liable for any indirect, incidental, special, or consequential damages arising from your use of our website or products. Our liability is limited to the amount you paid for the product or service in question.</p>
        </section>

        <hr className="border-gray-200" />

        <section>
          <h2 className="text-xl font-semibold text-gray-900 mb-3">7. Governing Law</h2>
          <p>These Terms of Service are governed by the laws of the European Union and the member state in which the entity operating the ALOWA trademark is established. Any disputes shall be subject to the exclusive jurisdiction of the courts of that jurisdiction.</p>
        </section>

        <hr className="border-gray-200" />

        <section>
          <h2 className="text-xl font-semibold text-gray-900 mb-3">8. Changes to Terms</h2>
          <p>We may update these Terms of Service from time to time. The updated version will be posted on this page with a revised effective date. Your continued use of the website and products after changes constitutes acceptance of the new terms.</p>
        </section>

        <hr className="border-gray-200" />

        <section>
          <h2 className="text-xl font-semibold text-gray-900 mb-3">9. Contact</h2>
          <p>For questions regarding these Terms of Service, please contact us at <a href="mailto:support@wearealowa.com" className="text-primary-600 hover:underline">support@wearealowa.com</a>. The ALOWA trademark is operated by a European-based entity.</p>
        </section>
      </div>
    </div>
  )
}
