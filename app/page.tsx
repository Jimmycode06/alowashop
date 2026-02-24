import Link from 'next/link'
import Image from 'next/image'
import ProductCard from '@/components/ProductCard'

export default function Home() {
  return (
    <div className="flex flex-col overflow-hidden">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-primary-600 via-primary-700 to-primary-900 text-white overflow-hidden">
        {/* Hero Image - Full Width */}
        <div className="relative w-full aspect-video overflow-hidden bg-gradient-to-br from-primary-600 via-primary-700 to-primary-900">
          <Image
            src="/images/hero-banner.jpg"
            alt="ALOWA Magnetic Therapy Ring"
            fill
            className="object-cover"
            priority
            sizes="100vw"
          />
        </div>

        {/* Text Content */}
        <div className="relative py-24 md:py-32 px-4">
          {/* Animated Background Elements */}
          <div className="absolute inset-0 overflow-hidden">
            <div className="absolute -top-40 -right-40 w-80 h-80 bg-primary-400 rounded-full mix-blend-multiply filter blur-xl opacity-30 animate-pulse-slow"></div>
            <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-primary-500 rounded-full mix-blend-multiply filter blur-xl opacity-30 animate-pulse-slow" style={{ animationDelay: '2s' }}></div>
          </div>
          
          <div className="max-w-7xl mx-auto text-center relative z-10">
            <div className="animate-fade-in">
              <h1 className="text-5xl md:text-7xl font-display font-normal mb-6 leading-tight tracking-wide">
                EXPERIENCE NATURAL
                <br />
                <span className="text-white/90">
                  PAIN RELIEF
                </span>
              </h1>
            <p className="text-xl md:text-2xl mb-10 text-primary-100 max-w-3xl mx-auto leading-relaxed">
              Discover the healing power of magnetotherapy with our premium magnetic therapy ring. 
              Scientifically designed to improve circulation and reduce discomfort naturally.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <Link
                href="/product"
                className="group relative px-8 py-4 bg-white text-primary-700 rounded-xl font-semibold text-lg hover:scale-105 transition-all duration-300 shadow-2xl hover:shadow-glow-lg overflow-hidden"
              >
                <span className="relative z-10">Shop Now</span>
                <div className="absolute inset-0 bg-gradient-to-r from-primary-50 to-white opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              </Link>
              <Link
                href="/product"
                className="px-8 py-4 border-2 border-white/30 text-white rounded-xl font-semibold text-lg hover:bg-white/10 backdrop-blur-sm transition-all duration-300 hover:scale-105"
              >
                Learn More
              </Link>
            </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 px-4 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16 animate-slide-up">
            <h2 className="text-4xl md:text-5xl font-display font-normal mb-4 text-gray-900">
              Why Choose Our
              <span className="text-gray-700"> Magnetic Ring?</span>
            </h2>
            <p className="text-gray-600 text-lg max-w-2xl mx-auto">
              Experience the difference with our premium quality magnetic therapy solution
            </p>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                icon: (
                  <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                ),
                title: 'Natural Relief',
                description: 'Harness the power of magnetic fields to naturally reduce pain and inflammation without medication.',
              },
              {
                icon: (
                  <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                  </svg>
                ),
                title: 'Improved Circulation',
                description: 'Enhance blood flow and oxygen delivery to tissues for better overall health and faster recovery.',
              },
              {
                icon: (
                  <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                ),
                title: '24/7 Comfort',
                description: 'Wear it comfortably all day long. Lightweight, adjustable, and designed for everyday use.',
              },
            ].map((feature, index) => (
              <div
                key={index}
                className="group relative bg-white p-8 rounded-lg border border-gray-200 shadow-sm hover:shadow-md transition-all duration-300 hover:-translate-y-1"
              >
                <div className="relative w-16 h-16 rounded-lg bg-gray-100 flex items-center justify-center mx-auto mb-6 text-gray-700 group-hover:bg-gray-200 transition-colors duration-300">
                  {feature.icon}
                </div>
                <h3 className="text-xl font-display font-normal mb-3 text-center text-gray-900">{feature.title}</h3>
                <p className="text-gray-600 text-center leading-relaxed text-sm">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Product Preview */}
      <section className="py-20 px-4 bg-gray-50">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-display font-normal mb-4 text-gray-900">
              Our Premium
              <span className="text-gray-700"> Magnetic Ring</span>
            </h2>
            <p className="text-gray-600 text-lg max-w-2xl mx-auto">
              Discover the perfect blend of science and wellness
            </p>
          </div>
          <div className="flex justify-center">
            <ProductCard />
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-20 px-4 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-display font-normal mb-4 text-gray-900">
              What Our Customers
              <span className="text-gray-700"> Say</span>
            </h2>
            <p className="text-gray-600 text-lg max-w-2xl mx-auto">
              Join over <span className="font-semibold text-gray-900">28,000+</span> satisfied customers experiencing natural relief
            </p>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                name: 'Sarah M.',
                location: 'California',
                age: '42',
                rating: 5,
                text: '"This ring has been a game-changer for my arthritis pain. I wear it daily and notice a significant difference. ALOWA has truly improved my quality of life!"',
                title: 'Life Changer',
                image: '/images/sarah.png'
              },
              {
                name: 'Michael R.',
                location: 'Texas',
                age: '38',
                rating: 5,
                text: '"Great quality and comfortable to wear. My circulation has improved noticeably since using this ring. Highly recommend ALOWA!"',
                title: 'Amazing Results'
              },
              {
                name: 'Jennifer L.',
                location: 'New York',
                age: '35',
                rating: 5,
                text: '"Excellent product! The magnetic therapy really works. I was skeptical at first, but ALOWA exceeded my expectations. A must-have!"',
                title: 'Exceeded Expectations'
              },
            ].map((testimonial, index) => (
              <div
                key={index}
                className="relative bg-white p-8 rounded-lg border border-gray-200 shadow-sm hover:shadow-md transition-all duration-300 hover:-translate-y-1"
              >
                <div className="absolute top-4 right-4 bg-gray-100 px-3 py-1 rounded-full text-xs font-medium text-gray-700">
                  {testimonial.title}
                </div>
                <div className="flex mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <svg key={i} className="w-5 h-5 text-gray-400" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                  ))}
                </div>
                <p className="text-gray-700 mb-6 text-base leading-relaxed italic">
                  {testimonial.text}
                </p>
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-full overflow-hidden flex-shrink-0 bg-gray-200 relative">
                    {testimonial.image ? (
                      <Image src={testimonial.image} alt={testimonial.name} fill className="object-cover" />
                    ) : (
                      <span className="absolute inset-0 flex items-center justify-center text-gray-700 font-semibold text-base">{testimonial.name.charAt(0)}</span>
                    )}
                  </div>
                  <div>
                    <p className="font-semibold text-gray-900">{testimonial.name}</p>
                    <p className="text-sm text-gray-600">{testimonial.age} • {testimonial.location}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}
