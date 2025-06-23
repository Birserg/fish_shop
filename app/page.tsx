'use client'

import { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ShoppingCart, Phone, MapPin, Star, Truck, Sun, Heart, Clock, Shield, Sparkles, Fish } from 'lucide-react'
import toast from 'react-hot-toast'

// Fish products data
const fishProducts = [
  {
    id: 1,
    name: 'Fresh Salmon',
    price: 24.99,
    image: 'https://images.unsplash.com/photo-1519708227418-c8fd9a32b7a2?w=400',
    description: 'Wild-caught Alaskan salmon, perfect for grilling or baking',
    rating: 4.8,
    inStock: true,
    badge: 'Best Seller'
  },
  {
    id: 2,
    name: 'Atlantic Cod',
    price: 18.99,
    image: 'https://images.unsplash.com/photo-1565557623262-b51c2513a641?w=400',
    description: 'Fresh Atlantic cod fillets, mild and flaky',
    rating: 4.6,
    inStock: true,
    badge: 'Fresh'
  },
  {
    id: 3,
    name: 'Tuna Steak',
    price: 32.99,
    image: 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=400',
    description: 'Premium yellowfin tuna steaks, perfect for sushi',
    rating: 4.9,
    inStock: true,
    badge: 'Premium'
  },
  {
    id: 4,
    name: 'Sea Bass',
    price: 28.99,
    image: 'https://images.unsplash.com/photo-1565557623262-b51c2513a641?w=400',
    description: 'Mediterranean sea bass, delicate and flavorful',
    rating: 4.7,
    inStock: false,
    badge: 'Limited'
  }
]

export default function Home() {
  const [cart, setCart] = useState<typeof fishProducts>([])
  const [isTelegramApp, setIsTelegramApp] = useState(false)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    // Check if running in Telegram
    if (typeof window !== 'undefined' && window.Telegram?.WebApp) {
      setIsTelegramApp(true)
      window.Telegram.WebApp.ready()
      window.Telegram.WebApp.expand()
    }

    // Simulate loading
    setTimeout(() => setIsLoading(false), 1000)
  }, [])

  const addToCart = (product: typeof fishProducts[0]) => {
    setCart([...cart, product])
    toast.success(`${product.name} added to cart!`, {
      style: {
        background: '#f59e0b',
        color: '#fff',
      },
      iconTheme: {
        primary: '#fff',
        secondary: '#f59e0b',
      },
    })
  }

  const removeFromCart = (productId: number) => {
    const index = cart.findIndex(item => item.id === productId)
    if (index > -1) {
      const newCart = [...cart]
      newCart.splice(index, 1)
      setCart(newCart)
      toast.success('Item removed from cart!')
    }
  }

  const getTotalPrice = () => {
    return cart.reduce((total, item) => total + item.price, 0)
  }

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-sunbeam-50 to-orange-100 flex items-center justify-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ opacity: 1, scale: 1 }}
          className="text-center"
        >
          <div className="w-16 h-16 border-4 border-sunbeam-200 border-t-sunbeam-600 rounded-full animate-spin mx-auto mb-4"></div>
          <h2 className="text-2xl font-bold text-gray-800">Loading Sunbeam...</h2>
        </motion.div>
      </div>
    )
  }

  return (
    <div className={`min-h-screen ${isTelegramApp ? 'telegram-app' : 'bg-gradient-to-br from-sunbeam-50 via-orange-50 to-yellow-50'}`}>
      {/* Header */}
      <motion.header
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6 }}
        className="header-glass sticky top-0 z-50"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <motion.div
              className="flex items-center space-x-3"
              whileHover={{ scale: 1.05 }}
              transition={{ type: "spring", stiffness: 400, damping: 10 }}
            >
              <div className="relative w-12 h-12 pulse-glow">
                <img
                  src="/logo.jpeg"
                  alt="Sunbeam Logo"
                  className="w-full h-full object-contain rounded-xl shadow-lg"
                />
              </div>
              <div>
                <h1 className="text-2xl font-bold gradient-text">Sunbeam</h1>
                <p className="text-xs text-gray-500 -mt-1">Fresh Seafood</p>
              </div>
            </motion.div>
            <div className="flex items-center space-x-6">
              <motion.div
                className="relative cursor-pointer"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
              >
                <ShoppingCart className="h-7 w-7 text-gray-600 hover:text-sunbeam-600 transition-colors" />
                <AnimatePresence>
                  {cart.length > 0 && (
                    <motion.span
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      exit={{ scale: 0 }}
                      className="cart-badge"
                    >
                      {cart.length}
                    </motion.span>
                  )}
                </AnimatePresence>
              </motion.div>
              <div className="hidden sm:flex items-center space-x-2 text-sm text-gray-600 bg-white/50 px-3 py-2 rounded-full">
                <Phone className="h-4 w-4 text-sunbeam-600" />
                <span className="font-medium">+1 (555) 123-4567</span>
              </div>
            </div>
          </div>
        </div>
      </motion.header>

      {/* Hero Section */}
      <section className="relative py-24 px-4 sm:px-6 lg:px-8 overflow-hidden">
        <div className="absolute inset-0 hero-gradient opacity-90"></div>
        <div className="relative max-w-7xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="mb-8"
          >
            <motion.h2
              className="text-5xl sm:text-7xl font-bold text-gray-900 mb-6 leading-tight"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              Fresh Fish{' '}
              <span className="gradient-text">Delivered</span>
            </motion.h2>
            <motion.p
              className="text-xl sm:text-2xl text-gray-700 mb-8 max-w-4xl mx-auto leading-relaxed"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
            >
              Premium quality fish and seafood delivered fresh to your door.
              From ocean to table in hours, not days.
            </motion.p>
          </motion.div>
          <motion.div
            className="flex flex-col sm:flex-row gap-6 justify-center items-center"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
          >
            <motion.button
              className="btn-primary"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Sparkles className="w-5 h-5 mr-2" />
              Order Now
            </motion.button>
            <motion.button
              className="btn-secondary"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              View Menu
            </motion.button>
          </motion.div>
        </div>

        {/* Floating elements */}
        <motion.div
          className="absolute top-20 left-10 text-sunbeam-400 opacity-20"
          animate={{ y: [0, -20, 0] }}
          transition={{ duration: 3, repeat: Infinity }}
        >
          <Fish className="w-8 h-8" />
        </motion.div>
        <motion.div
          className="absolute bottom-20 right-10 text-sunbeam-400 opacity-20"
          animate={{ y: [0, 20, 0] }}
          transition={{ duration: 4, repeat: Infinity }}
        >
          <Fish className="w-6 h-6" />
        </motion.div>
      </section>

      {/* Products Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h3 className="text-4xl font-bold text-gray-900 mb-4">
              Our Fresh Selection
            </h3>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Handpicked from the finest waters, delivered with care
            </p>
          </motion.div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {fishProducts.map((product, index) => (
              <motion.div
                key={product.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="product-card group"
              >
                <div className="relative overflow-hidden">
                  <img
                    src={product.image}
                    alt={product.name}
                    className="product-image"
                  />
                  {product.badge && (
                    <div className="absolute top-3 left-3 bg-gradient-to-r from-sunbeam-500 to-orange-500 text-white px-3 py-1 rounded-full text-xs font-semibold shadow-lg">
                      {product.badge}
                    </div>
                  )}
                  {!product.inStock && (
                    <div className="absolute top-3 right-3 bg-red-500 text-white px-3 py-1 rounded-full text-xs font-semibold shadow-lg">
                      Out of Stock
                    </div>
                  )}
                  <motion.div
                    className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center"
                    whileHover={{ scale: 1.05 }}
                  >
                    <Heart className="w-8 h-8 text-white" />
                  </motion.div>
                </div>
                <div className="p-6">
                  <div className="flex justify-between items-start mb-3">
                    <h4 className="text-xl font-bold text-gray-900">{product.name}</h4>
                    <div className="flex items-center space-x-1 bg-yellow-100 px-2 py-1 rounded-full">
                      <Star className="h-4 w-4 text-yellow-500 fill-current" />
                      <span className="text-sm font-semibold text-yellow-700">{product.rating}</span>
                    </div>
                  </div>
                  <p className="text-gray-600 text-sm mb-4 leading-relaxed">{product.description}</p>
                  <div className="flex justify-between items-center">
                    <span className="text-3xl font-bold gradient-text">${product.price}</span>
                    <motion.button
                      onClick={() => addToCart(product)}
                      disabled={!product.inStock}
                      className="bg-gradient-to-r from-sunbeam-500 to-sunbeam-600 text-white px-6 py-3 rounded-xl text-sm font-semibold hover:from-sunbeam-600 hover:to-sunbeam-700 transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl disabled:bg-gray-300 disabled:cursor-not-allowed disabled:transform-none"
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      Add to Cart
                    </motion.button>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Cart Section */}
      <AnimatePresence>
        {cart.length > 0 && (
          <motion.section
            initial={{ y: 100, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 100, opacity: 0 }}
            className="fixed bottom-0 left-0 right-0 bg-white/95 backdrop-blur-md border-t border-gray-200 shadow-2xl p-6 z-40"
          >
            <div className="max-w-7xl mx-auto">
              <div className="flex justify-between items-center">
                <div>
                  <p className="text-sm text-gray-600">Cart ({cart.length} items)</p>
                  <p className="text-2xl font-bold gradient-text">${getTotalPrice().toFixed(2)}</p>
                </div>
                <div className="flex space-x-3">
                  <motion.button
                    onClick={() => setCart([])}
                    className="px-6 py-3 text-gray-600 border-2 border-gray-300 rounded-xl hover:bg-gray-50 transition-all duration-300 font-semibold"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    Clear
                  </motion.button>
                  <motion.button
                    className="bg-gradient-to-r from-green-500 to-green-600 text-white px-8 py-3 rounded-xl font-semibold hover:from-green-600 hover:to-green-700 transition-all duration-300 shadow-lg hover:shadow-xl"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    Checkout
                  </motion.button>
                </div>
              </div>
            </div>
          </motion.section>
        )}
      </AnimatePresence>

      {/* Features Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-white">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h3 className="text-4xl font-bold text-gray-900 mb-4">
              Why Choose Sunbeam?
            </h3>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              We're committed to bringing you the freshest seafood with exceptional service
            </p>
          </motion.div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                icon: Truck,
                title: "Lightning Fast Delivery",
                description: "Same-day delivery for orders placed before 2 PM",
                color: "from-blue-500 to-blue-600"
              },
              {
                icon: Sun,
                title: "Fresh Quality Guaranteed",
                description: "Sourced directly from local fishermen and markets",
                color: "from-sunbeam-500 to-sunbeam-600"
              },
              {
                icon: Shield,
                title: "Best Prices & Quality",
                description: "Competitive prices with no hidden fees",
                color: "from-green-500 to-green-600"
              }
            ].map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.2 }}
                viewport={{ once: true }}
                className="text-center group"
              >
                <motion.div
                  className={`bg-gradient-to-br ${feature.color} text-white p-6 rounded-3xl shadow-xl mx-auto mb-6 w-20 h-20 flex items-center justify-center group-hover:scale-110 transition-transform duration-300`}
                  whileHover={{ rotate: 5 }}
                >
                  <feature.icon className="h-10 w-10" />
                </motion.div>
                <h4 className="text-2xl font-bold text-gray-900 mb-4">{feature.title}</h4>
                <p className="text-gray-600 leading-relaxed">{feature.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gradient-to-br from-gray-900 to-gray-800 text-white py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <motion.div
                className="flex items-center space-x-3 mb-6"
                whileHover={{ scale: 1.05 }}
              >
                <div className="relative w-10 h-10">
                  <img
                    src="/logo.jpeg"
                    alt="Sunbeam Logo"
                    className="w-full h-full object-contain rounded-lg"
                  />
                </div>
                <div>
                  <span className="text-2xl font-bold">Sunbeam</span>
                  <p className="text-sm text-gray-400">Fresh Seafood</p>
                </div>
              </motion.div>
              <p className="text-gray-400 leading-relaxed">
                Fresh seafood delivered to your door with care and quality you can trust.
              </p>
            </div>
            <div>
              <h4 className="text-lg font-semibold mb-6 text-sunbeam-400">Contact</h4>
              <div className="space-y-3 text-gray-400">
                <div className="flex items-center space-x-2">
                  <Phone className="h-4 w-4 text-sunbeam-400" />
                  <span>+1 (555) 123-4567</span>
                </div>
                <div className="flex items-center space-x-2">
                  <MapPin className="h-4 w-4 text-sunbeam-400" />
                  <span>123 Ocean Ave, Seaport City</span>
                </div>
                <p>info@sunbeam.com</p>
              </div>
            </div>
            <div>
              <h4 className="text-lg font-semibold mb-6 text-sunbeam-400">Hours</h4>
              <div className="space-y-3 text-gray-400">
                <div className="flex items-center space-x-2">
                  <Clock className="h-4 w-4 text-sunbeam-400" />
                  <div>
                    <p className="font-medium">Mon-Fri: 8AM - 8PM</p>
                    <p className="font-medium">Sat: 9AM - 6PM</p>
                    <p className="font-medium">Sun: 10AM - 4PM</p>
                  </div>
                </div>
              </div>
            </div>
            <div>
              <h4 className="text-lg font-semibold mb-6 text-sunbeam-400">Follow Us</h4>
              <div className="flex space-x-4">
                {['Facebook', 'Instagram', 'Twitter'].map((social) => (
                  <motion.a
                    key={social}
                    href="#"
                    className="text-gray-400 hover:text-sunbeam-400 transition-colors duration-300 p-2 rounded-full hover:bg-white/10"
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                  >
                    {social}
                  </motion.a>
                ))}
              </div>
            </div>
          </div>
          <motion.div
            className="border-t border-gray-700 mt-12 pt-8 text-center text-gray-400"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <p>&copy; 2024 Sunbeam. All rights reserved. Made with ❤️ for fresh seafood lovers.</p>
          </motion.div>
        </div>
      </footer>
    </div>
  )
}

