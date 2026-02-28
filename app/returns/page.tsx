import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Returns | ALOWA',
  description: 'ALOWA returns policy. Request a return by email and receive step-by-step instructions.',
}

export default function ReturnsPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 py-12 md:py-16">
      <h1 className="text-3xl md:text-4xl font-display font-normal text-gray-900 mb-8 tracking-wide">
        Returns
      </h1>

      <div className="space-y-8 text-gray-700 leading-relaxed">
        <section>
          <p className="mb-4">
            We want you to be completely satisfied with your ALOWA purchase. If you need to return an item, the process is simple.
          </p>
          <p className="mb-4">
            Send us a return request by email at{' '}
            <a href="mailto:support@wearealowa.com" className="text-primary-600 hover:underline font-medium">
              support@wearealowa.com
            </a>
            , and we will reply with detailed instructions to complete your return.
          </p>
          <p>
            Our team typically responds within 1–2 business days. Please include your order number in your message for faster processing.
          </p>
        </section>

        <hr className="border-gray-200" />

        <section>
          <h2 className="text-xl font-semibold text-gray-900 mb-4">Questions?</h2>
          <p>
            For any questions about returns or refunds, contact us at{' '}
            <a href="mailto:support@wearealowa.com" className="text-primary-600 hover:underline">support@wearealowa.com</a>.
          </p>
        </section>
      </div>
    </div>
  )
}
