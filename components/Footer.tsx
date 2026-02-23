import Link from 'next/link'

export default function Footer() {
  return (
    <footer className="bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 text-gray-300 mt-20">
      <div className="max-w-7xl mx-auto px-4 py-16">
        <div className="grid md:grid-cols-4 gap-12">
          <div>
            <h3 className="text-3xl font-display font-normal text-white mb-4 tracking-wider">
              ALOWA
            </h3>
            <p className="text-sm leading-relaxed text-gray-400">
              Your trusted source for premium magnetic therapy products. 
              Experience natural pain relief and improved wellness.
            </p>
          </div>
          
          <div>
            <h4 className="text-white font-bold mb-6 text-lg">Shop</h4>
            <ul className="space-y-3 text-sm">
              <li>
                <Link href="/product" className="hover:text-primary-400 transition-colors duration-300 hover:translate-x-1 inline-block">
                  Magnetic Ring
                </Link>
              </li>
              <li>
                <Link href="/cart" className="hover:text-primary-400 transition-colors duration-300 hover:translate-x-1 inline-block">
                  Shopping Cart
                </Link>
              </li>
            </ul>
          </div>
          
          <div>
            <h4 className="text-white font-bold mb-6 text-lg">Support</h4>
            <ul className="space-y-3 text-sm">
              <li>
                <a href="#" className="hover:text-primary-400 transition-colors duration-300 hover:translate-x-1 inline-block">
                  Shipping Info
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-primary-400 transition-colors duration-300 hover:translate-x-1 inline-block">
                  Returns
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-primary-400 transition-colors duration-300 hover:translate-x-1 inline-block">
                  Contact Us
                </a>
              </li>
            </ul>
          </div>
          
          <div>
            <h4 className="text-white font-bold mb-6 text-lg">Legal</h4>
            <ul className="space-y-3 text-sm">
              <li>
                <a href="#" className="hover:text-primary-400 transition-colors duration-300 hover:translate-x-1 inline-block">
                  Privacy Policy
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-primary-400 transition-colors duration-300 hover:translate-x-1 inline-block">
                  Terms of Service
                </a>
              </li>
            </ul>
          </div>
        </div>
        
        <div className="border-t border-gray-700/50 mt-12 pt-8 text-center">
          <p className="text-sm text-gray-400">
            &copy; {new Date().getFullYear()} <span className="text-primary-400 font-semibold">ALOWA</span>. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  )
}
