import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Shipping & Delivery | ALOWA',
  description: 'ALOWA shipping and delivery information. Order fulfillment, processing times, and service regions.',
}

export default function ShippingDeliveryPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 py-12 md:py-16">
      <h1 className="text-3xl md:text-4xl font-display font-normal text-gray-900 mb-8 tracking-wide">
        Shipping & Delivery Information
      </h1>

      <div className="space-y-8 text-gray-700 leading-relaxed">
        <section>
          <h2 className="text-xl font-semibold text-gray-900 mb-4">Order Fulfillment & Warehousing</h2>
          <p className="mb-3">ALOWA orders are prepared and shipped from our international fulfillment centers located in the United States, the United Kingdom, and Asia, depending on product availability at the time of purchase.</p>
          <p className="mb-3">To ensure faster processing and efficient delivery, orders are automatically routed through our logistics system to the warehouse where the selected item is currently in stock. As a result, your shipment may originate from a location different from your country of residence.</p>
          <p>Inventory levels are reviewed regularly to maintain consistent product quality and availability.</p>
        </section>

        <hr className="border-gray-200" />

        <section>
          <h2 className="text-xl font-semibold text-gray-900 mb-4">Processing & Shipping Times</h2>
          <p className="mb-3">Orders are typically processed within 1–3 business days before shipment.</p>
          <p className="mb-3">During periods of increased demand, promotional events, or limited stock availability, processing times may extend up to 7–10 business days.</p>
          <p className="mb-3">Estimated delivery times generally range between 5–10 business days, depending on the destination and carrier conditions. Delivery estimates exclude weekends, public holidays, and potential carrier-related delays beyond our control.</p>
          <p>Final delivery timelines are displayed at checkout.</p>
        </section>

        <hr className="border-gray-200" />

        <section>
          <h2 className="text-xl font-semibold text-gray-900 mb-4">Temporary Shipping Conditions</h2>
          <p>Due to fluctuations in global demand and ongoing logistics constraints, occasional shipping delays may occur. We appreciate your patience and understanding while our fulfillment partners work to ensure timely delivery.</p>
        </section>

        <hr className="border-gray-200" />

        <section>
          <h2 className="text-xl font-semibold text-gray-900 mb-4">Service Availability & Geographic Restrictions</h2>
          <p className="mb-3">Products available on this website are currently intended for customers located in approved service regions, including the United States, Canada, the United Kingdom, Australia, and other supported international markets.</p>
          <p className="mb-3">Orders placed for delivery to restricted territories may be declined or cancelled in accordance with our distribution policies.</p>
          <p>By placing an order through this website, customers confirm that the shipping destination complies with our supported delivery regions.</p>
        </section>

        <hr className="border-gray-200" />

        <section>
          <h2 className="text-xl font-semibold text-gray-900 mb-4">Important Notice</h2>
          <p>Shipping times represent estimated delivery windows only and may vary depending on carrier operations, customs processing, or unforeseen logistical circumstances.</p>
        </section>

        <hr className="border-gray-200" />

        <section>
          <h2 className="text-xl font-semibold text-gray-900 mb-4">Questions?</h2>
          <p>For any questions about shipping or delivery, contact us at <a href="mailto:support@wearealowa.com" className="text-primary-600 hover:underline">support@wearealowa.com</a>.</p>
        </section>
      </div>
    </div>
  )
}
