'use client'

import { useState, useEffect } from 'react'
import Image from 'next/image'
import toast, { Toaster } from 'react-hot-toast'

interface Product {
  id: number
  name: string
  nameRu: string
  description: string
  descriptionRu: string
  price: number
  image: string
  badge?: string
  badgeRu?: string
}

const products: Product[] = [
  {
    id: 1,
    name: "Original Lightly Salted Salmon",
    nameRu: "Семга оригинальная слабосоленая",
    description: "Fresh Norwegian premium-grade salmon, cured using traditional two-stage dry salting technique. Delicate structure, noble richness and refined taste with natural sweet notes.",
    descriptionRu: "Свежая норвежская сёмга премиум-класса, выдержанная по двухэтапной технологии сухого посола. Тонкая структура, благородная жирность и деликатный вкус с естественными сладковатыми нотами.",
    price: 180,
    image: "/fish_1.jpg",
    badge: "Traditional",
    badgeRu: "Традиционная"
  },
  {
    id: 2,
    name: "Salmon with Citrus",
    nameRu: "Семга с цитрусом",
    description: "Premium Norwegian salmon prepared using our signature dry salting method with fresh lemon zest added at the final stage. The citrus subtly transforms the texture, giving it softness and freshness. The taste is structured, with a bright yet refined aromatic accent.",
    descriptionRu: "Премиальная норвежская сёмга, приготовленная по авторскому методу сухого посола с добавлением свежей лимонной цедры на финальном этапе. Цитрус тонко трансформирует текстуру, придавая ей мягкость и свежесть. Вкус — структурированный, с ярким, но утончённым ароматическим акцентом.",
    price: 180,
    image: "/fish_2.jpg",
    badge: "Signature",
    badgeRu: "Фирменная"
  },
  {
    id: 3,
    name: "Cold-Smoked Salmon",
    nameRu: "Семга подкопченная",
    description: "Premium Norwegian salmon that underwent two-stage dry salting and gentle cold smoking on natural wood chips. Dense texture, expressive oiliness and noble smoky profile. Balanced product with depth of flavor and mature aftertaste.",
    descriptionRu: "Норвежская сёмга высшего качества, прошедшая двухступенчатый сухой посол и щадящее холодное копчение на натуральной щепе. Плотная текстура, выразительная маслянистость и благородный дымный профиль. Сбалансированный продукт с глубиной вкуса и зрелым послевкусием.",
    price: 180,
    image: "/fish_3.jpg",
    badge: "Artisan",
    badgeRu: "Ремесленная"
  },
  {
    id: 4,
    name: "Premium Sashimi Salmon",
    nameRu: "Премиальная сёмга для сашими",
    description: "Premium Norwegian salmon of the highest grade, selected and prepared according to strict Japanese sashimi standards. Minimal processing to preserve natural texture and flavor. Perfect for raw consumption — pure, concentrated ocean taste with silky structure.",
    descriptionRu: "Норвежская сёмга высшего сорта, отобранная и приготовленная по строгим японским стандартам сашими. Минимальная обработка для сохранения натуральной текстуры и вкуса. Идеально подходит для употребления в сыром виде — чистый, концентрированный вкус океана с шелковистой структурой.",
    price: 220,
    image: "/fish_4.jpg",
    badge: "Premium",
    badgeRu: "Премиум"
  }
]

interface CartItem {
  id: number
  quantity: number
}

type Language = 'en' | 'ru'

export default function FishShop() {
  const [cart, setCart] = useState<CartItem[]>([])
  const [isCartOpen, setIsCartOpen] = useState(false)
  const [language, setLanguage] = useState<Language>('ru')
  const [loading, setLoading] = useState(true)
  const [isInTelegram, setIsInTelegram] = useState(false)
  const [isTogglingCart, setIsTogglingCart] = useState(false)

  const t = {
    en: {
      title: "Sunbeam Fish Shop",
      subtitle: "Premium Norwegian Salmon",
      description: "Experience the authentic taste of Norway with our premium salmon collection",
      positioning: "We are a small artisanal production specializing in creating lightly salted salmon and gourmet delicacies. Our goal is to restore depth and honesty to taste. We work with first-class ingredients, use our own preparation methods, and strive to create products that speak for themselves — clean, expressive, balanced. We don't just salt fish — we create a gastronomic experience that is understandable, warm, and rich. In the future, we will open our own location — a place where you can not just buy, but taste, feel, and take home a flavor that makes you want to come back.",
      addToCart: "Add to Cart",
      cart: "Cart",
      total: "Total",
      order: "Order via WhatsApp",
      currency: "฿",
      perGram: "/100g",
      empty: "Your cart is empty",
      values: "Our Values",
      tasteAsMeaning: "Taste as Purpose",
      tasteAsMeaningDesc: "We perfect every product to ideal taste. This isn't mass production — it's gastronomy in small form.",
      honestyToProduct: "Honesty to Product",
      honestyToProductDesc: "Only premium ingredients. Only signature methods. No compromises in taste, texture and experience.",
      handcraftWork: "Handcraft and Craftsmanship",
      handcraftWorkDesc: "Every stage — from curing to packaging — under control. This is living work, not a conveyor belt.",
      respectTime: "Respect for Time and Season",
      respectTimeDesc: "We don't rush. Every flavor has its own rhythm and maturity. We follow this.",
      homeFeeling: "Home Feeling, Without the Mundane",
      homeFeelingDesc: "The warmth that food gives — real, not from advertising. This is what you can feel immediately.",
      personalApproach: "Personal Approach",
      personalApproachDesc: "We know our customers and their preferences. Every order is prepared with care and attention to individual needs.",
      contact: "Contact Us",
      email: "Email",
      whatsapp: "WhatsApp",
      telegram: "Telegram",
      orderInfo: "Order via WhatsApp for direct contact",
      orderSuccess: "Order prepared! Redirecting to WhatsApp...",
      itemAdded: "Added to cart!",
      itemRemoved: "Removed from cart",
      welcomeBack: "Welcome back"
    },
    ru: {
      title: "Рыбный магазин Sunbeam",
      subtitle: "Премиальная норвежская семга",
      description: "Попробуйте подлинный вкус Норвегии с нашей премиальной коллекцией семги",
      positioning: "Мы — небольшое ремесленное производство, специализирующееся на создании слабосолёной сёмги и гастрономических деликатесов. Наша цель — вернуть вкусу его глубину и честность. Мы работаем с первоклассным сырьём, используем собственные методы приготовления и стремимся создавать продукты, которые говорят за себя — чистые, выразительные, сбалансированные. Мы не просто солим рыбу — мы создаём гастрономический опыт, понятный, тёплый и насыщенный. В будущем мы откроем собственную точку — место, где можно не просто купить, а попробовать, почувствовать и взять с собой вкус, за которым хочется вернуться.",
      addToCart: "В корзину",
      cart: "Корзина",
      total: "Итого",
      order: "Заказать через WhatsApp",
      currency: "฿",
      perGram: "/100г",
      empty: "Ваша корзина пуста",
      values: "Ценности компании",
      tasteAsMeaning: "Вкус как смысл",
      tasteAsMeaningDesc: "Каждый продукт мы доводим до идеала по вкусу. Это не производство ради объёма — это гастрономия в малой форме.",
      honestyToProduct: "Честность к продукту",
      honestyToProductDesc: "Только премиальное сырьё. Только авторские методы. Никаких компромиссов во вкусе, текстуре и ощущении.",
      handcraftWork: "Ручная работа и ремесло",
      handcraftWorkDesc: "Каждый этап — от засолки до упаковки — под контролем. Это живая работа, а не конвейер.",
      respectTime: "Уважение к времени и сезону",
      respectTimeDesc: "Мы не спешим. У каждого вкуса есть свой ритм и своя зрелость. Мы следуем этому.",
      homeFeeling: "Ощущение дома, без бытового",
      homeFeelingDesc: "Тепло, которое даёт еда — настоящее, не из рекламы. Это то, что можно почувствовать сразу.",
      personalApproach: "Персональный подход",
      personalApproachDesc: "Мы знаем наших клиентов и их предпочтения. Каждый заказ готовится с заботой и вниманием к индивидуальным потребностям.",
      contact: "Связаться с нами",
      email: "Электронная почта",
      whatsapp: "WhatsApp",
      telegram: "Telegram",
      orderInfo: "Заказывайте через WhatsApp для прямого контакта",
      orderSuccess: "Заказ подготовлен! Перенаправление в WhatsApp...",
      itemAdded: "Добавлено в корзину!",
      itemRemoved: "Удалено из корзины",
      welcomeBack: "Добро пожаловать"
    }
  }

  // Initialize component
  useEffect(() => {
    const initializeApp = () => {
      // Telegram WebApp setup - only if actually running in Telegram
      if (typeof window !== 'undefined' && window.Telegram?.WebApp) {
        const tg = window.Telegram.WebApp

        // Check if we're actually in a Telegram WebApp (has initData or user)
        if (tg.initData || tg.initDataUnsafe?.user) {
          setIsInTelegram(true)
          tg.ready()
          tg.expand()

          // Detect language from Telegram
          const userLang = tg.initDataUnsafe?.user?.language_code
          if (userLang === 'en') {
            setLanguage('en')
          } else {
            setLanguage('ru') // Default to Russian
          }

          // Running in Telegram WebApp

                    // Set up main button for Telegram
          if (tg.MainButton) {
            tg.MainButton.setText('🛒 Open Cart')
            tg.MainButton.color = '#f59e0b'
            tg.MainButton.show()

            // Set up click handler
            tg.MainButton.onClick(() => {
              if (!isTogglingCart) {
                setIsTogglingCart(true);
                setIsCartOpen(true);
                setTimeout(() => setIsTogglingCart(false), 100);
              }
            })
          }
        }
      }

      // Load saved language and cart
      const savedLanguage = localStorage.getItem('language') as Language
      if (savedLanguage) {
        setLanguage(savedLanguage)
      }

      const savedCart = localStorage.getItem('cart')
      if (savedCart) {
        setCart(JSON.parse(savedCart))
      }

      setLoading(false)

      // Welcome message
      setTimeout(() => {
        toast.success(t[language].welcomeBack)
      }, 500)
    }

    initializeApp()
  }, [])

  // Save to localStorage when cart or language changes
  useEffect(() => {
    if (!loading) {
      localStorage.setItem('cart', JSON.stringify(cart))

      // Update Telegram main button
      if (window.Telegram?.WebApp?.MainButton) {
        const totalItems = getTotalItems()
        if (totalItems > 0) {
          window.Telegram.WebApp.MainButton.setText(`🛒 Cart (${totalItems})`)
          window.Telegram.WebApp.MainButton.show()
        } else {
          window.Telegram.WebApp.MainButton.setText('🛒 Cart')
          window.Telegram.WebApp.MainButton.show()
        }
      }
    }
  }, [cart, loading])

  useEffect(() => {
    if (!loading) {
      localStorage.setItem('language', language)
    }
  }, [language, loading])

  // Cart functions
  const addToCart = (productId: number) => {
    setCart(prev => {
      const existing = prev.find(item => item.id === productId)
      if (existing) {
        return prev.map(item =>
          item.id === productId
            ? { ...item, quantity: item.quantity + 1 }
            : item
        )
      }
      return [...prev, { id: productId, quantity: 1 }]
    })

    // Haptic feedback
    if (window.Telegram?.WebApp?.HapticFeedback) {
      window.Telegram.WebApp.HapticFeedback.impactOccurred('light')
    }

    toast.success(t[language].itemAdded)
  }

  const removeFromCart = (productId: number) => {
    setCart(prev => {
      const existing = prev.find(item => item.id === productId)
      if (existing && existing.quantity > 1) {
        return prev.map(item =>
          item.id === productId
            ? { ...item, quantity: item.quantity - 1 }
            : item
        )
      }
      return prev.filter(item => item.id !== productId)
    })

    // Haptic feedback
    if (window.Telegram?.WebApp?.HapticFeedback) {
      window.Telegram.WebApp.HapticFeedback.impactOccurred('light')
    }

    toast.success(t[language].itemRemoved)
  }

  const getTotalPrice = () => {
    return cart.reduce((total, item) => {
      const product = products.find(p => p.id === item.id)
      return total + (product ? product.price * item.quantity : 0)
    }, 0)
  }

  const getTotalItems = () => {
    return cart.reduce((total, item) => total + item.quantity, 0)
  }

  const getCartItemQuantity = (productId: number) => {
    const item = cart.find(item => item.id === productId)
    return item ? item.quantity : 0
  }

  const handleOrder = () => {
    if (cart.length === 0) return

    const orderText = cart.map((item, index) => {
      const product = products.find(p => p.id === item.id)
      const productName = language === 'en' ? product?.name : product?.nameRu
      return `${index + 1}. ${productName} x${item.quantity} - ฿${product ? product.price * item.quantity : 0}`
    }).join('\n')

    const totalPrice = getTotalPrice()

    const message = language === 'en'
      ? `*Order from Sunbeam Fish Shop*\n\n*Items:*\n${orderText}\n\n*Total: ฿${totalPrice}*\n\nThank you for your order!`
      : `*Заказ из рыбного магазина Sunbeam*\n\n*Товары:*\n${orderText}\n\n*Итого: ฿${totalPrice}*\n\nСпасибо за ваш заказ!`

    const whatsappUrl = `https://wa.me/66650673689?text=${encodeURIComponent(message)}`

    toast.success(t[language].orderSuccess)

    // Clear cart and close modal first
    setCart([])
    setIsCartOpen(false)

    setTimeout(() => {
      if (isInTelegram && typeof window !== 'undefined' && window.Telegram?.WebApp) {
        // For Telegram mini app, use openTelegramLink or openLink
        try {
          window.Telegram.WebApp.openTelegramLink(whatsappUrl)
        } catch (e) {
          try {
            window.Telegram.WebApp.openLink(whatsappUrl)
          } catch (e2) {
            // Fallback to regular window.open
            window.open(whatsappUrl, '_blank')
          }
        }
      } else {
        // For regular web browsers
        window.open(whatsappUrl, '_blank')
      }
    }, 500)
  }

  const cartItemsCount = getTotalItems()

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center sunbeam-hero">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-warm-300 border-t-warm-600 rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-warm-600">Loading...</p>
        </div>
      </div>
    )
  }

  return (
    <main className="min-h-screen sunbeam-hero">
      {/* Top Navigation Bar */}
      <nav className="fixed top-0 left-0 right-0 z-50 glass-warm border-b border-warm-200/30 backdrop-blur-md">
        <div className="container mx-auto px-4 py-3 flex justify-end items-center">
          {/* Right Side - Phone, Cart (Web) and Language Toggle */}
          <div className="flex items-center gap-3">
            {/* Phone */}
            <a
              href="https://wa.me/66650673689"
              className="glass-warm px-3 py-2 rounded-lg text-sm font-medium hover:scale-105 transition-transform text-warm-800"
            >
              📞 +66650673689
            </a>

            {!isInTelegram && (
              <button
                onClick={(e) => {
                  e.preventDefault();
                  e.stopPropagation();
                  if (!isTogglingCart) {
                    setIsTogglingCart(true);
                    setIsCartOpen(true);
                    setTimeout(() => setIsTogglingCart(false), 100);
                  }
                }}
                disabled={isTogglingCart}
                className="logo-button flex items-center gap-2 px-4 py-2 text-sm"
              >
                🛒 {t[language].cart}
                {cart.length > 0 && (
                  <span className="bg-warm-100 text-warm-800 rounded-lg px-2 py-1 text-xs font-bold min-w-[1.5rem]">
                    {getTotalItems()}
                  </span>
                )}
              </button>
            )}
            {/* Language Toggle */}
            <button
              onClick={() => setLanguage(language === 'en' ? 'ru' : 'en')}
              className="glass-warm px-3 py-2 rounded-lg text-sm font-medium hover:scale-105 transition-transform"
            >
              {language === 'en' ? '🇷🇺 RU' : '🇬🇧 EN'}
            </button>
          </div>
        </div>
      </nav>

      {/* Header */}
      <header className="container mx-auto px-4 py-8 text-center mt-20">
        <div className="fish-float mb-6">
          <Image
            src="/logo.jpeg"
            alt="Sunbeam Logo"
            width={120}
            height={120}
            className="mx-auto logo-card p-2 rounded-full"
            priority
          />
        </div>
        <h1 className="text-4xl md:text-6xl font-bold logo-text mb-4">
          {t[language].title}
        </h1>
        <p className="text-xl md:text-2xl text-warm-700 mb-2 font-semibold">
          {t[language].subtitle}
        </p>
        <p className="text-warm-600 max-w-2xl mx-auto">
          {t[language].description}
        </p>
      </header>

      {/* Products Grid */}
      <section id="products" className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-6 max-w-6xl mx-auto">
          {products.map((product) => {
            const quantity = getCartItemQuantity(product.id)
            return (
              <div key={product.id} className="logo-card p-6 rounded-xl fish-float min-h-[400px] flex flex-col">
                <div className="relative mb-4 flex-shrink-0">
                  <Image
                    src={product.image}
                    alt={language === 'en' ? product.name : product.nameRu}
                    width={400}
                    height={300}
                    className="w-full h-48 sm:h-56 object-cover rounded-lg"
                  />
                  {product.badge && (
                    <span className="absolute top-2 right-2 sunbeam-badge">
                      {language === 'en' ? product.badge : product.badgeRu}
                    </span>
                  )}
                </div>

                <div className="flex flex-col flex-grow">
                  <h3 className="text-lg sm:text-xl font-bold text-warm-800 mb-3">
                    {language === 'en' ? product.name : product.nameRu}
                  </h3>

                  <p className="text-warm-600 mb-4 text-sm sm:text-base leading-relaxed flex-grow">
                    {language === 'en' ? product.description : product.descriptionRu}
                  </p>

                  <div className="flex items-center justify-between mt-auto">
                    <span className="product-price text-lg sm:text-xl">
                      ฿{product.price}{t[language].perGram}
                    </span>

                    {quantity > 0 ? (
                      <div className="flex items-center">
                        <button
                          onClick={() => removeFromCart(product.id)}
                          className="quantity-button"
                        >
                          −
                        </button>
                        <span className="quantity-display">{quantity}</span>
                        <button
                          onClick={() => addToCart(product.id)}
                          className="quantity-button"
                        >
                          +
                        </button>
                      </div>
                    ) : (
                      <button
                        onClick={() => addToCart(product.id)}
                        className="logo-button text-sm sm:text-base px-4 py-2"
                        aria-label={`${t[language].addToCart}: ${language === 'en' ? product.name : product.nameRu}`}
                      >
                        {t[language].addToCart}
                      </button>
                    )}
                  </div>
                </div>
              </div>
            )
          })}
        </div>
      </section>

      {/* About Us / Positioning Section */}
      <section className="container mx-auto px-4 py-16">
        <div className="max-w-5xl mx-auto text-center">
          <div className="glass-warm p-8 rounded-2xl">
            <div className="max-w-4xl mx-auto">
              <p className="text-warm-800 leading-relaxed text-base md:text-lg font-medium text-justify md:text-center">
                {t[language].positioning}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section id="values" className="container mx-auto px-4 py-16">
        <h2 className="section-title">{t[language].values}</h2>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
          <div className="feature-card text-center">
            <div className="w-16 h-16 mx-auto mb-4 bg-gradient-to-br from-sunbeam-400 to-sunbeam-600 rounded-full flex items-center justify-center">
              <span className="text-2xl">🎯</span>
            </div>
            <h3 className="text-xl font-bold text-warm-800 mb-2">{t[language].tasteAsMeaning}</h3>
            <p className="text-warm-600 text-sm leading-relaxed">{t[language].tasteAsMeaningDesc}</p>
          </div>

          <div className="feature-card text-center">
            <div className="w-16 h-16 mx-auto mb-4 bg-gradient-to-br from-warm-400 to-warm-600 rounded-full flex items-center justify-center">
              <span className="text-2xl">💎</span>
            </div>
            <h3 className="text-xl font-bold text-warm-800 mb-2">{t[language].honestyToProduct}</h3>
            <p className="text-warm-600 text-sm leading-relaxed">{t[language].honestyToProductDesc}</p>
          </div>

          <div className="feature-card text-center">
            <div className="w-16 h-16 mx-auto mb-4 bg-gradient-to-br from-primary-400 to-primary-600 rounded-full flex items-center justify-center">
              <span className="text-2xl">🖐</span>
            </div>
            <h3 className="text-xl font-bold text-warm-800 mb-2">{t[language].handcraftWork}</h3>
            <p className="text-warm-600 text-sm leading-relaxed">{t[language].handcraftWorkDesc}</p>
          </div>

          <div className="feature-card text-center">
            <div className="w-16 h-16 mx-auto mb-4 bg-gradient-to-br from-sunbeam-500 to-sunbeam-700 rounded-full flex items-center justify-center">
              <span className="text-2xl">⏰</span>
            </div>
            <h3 className="text-xl font-bold text-warm-800 mb-2">{t[language].respectTime}</h3>
            <p className="text-warm-600 text-sm leading-relaxed">{t[language].respectTimeDesc}</p>
          </div>

          <div className="feature-card text-center">
            <div className="w-16 h-16 mx-auto mb-4 bg-gradient-to-br from-warm-500 to-warm-700 rounded-full flex items-center justify-center">
              <span className="text-2xl">🏠</span>
            </div>
            <h3 className="text-xl font-bold text-warm-800 mb-2">{t[language].homeFeeling}</h3>
            <p className="text-warm-600 text-sm leading-relaxed">{t[language].homeFeelingDesc}</p>
          </div>

          <div className="feature-card text-center">
            <div className="w-16 h-16 mx-auto mb-4 bg-gradient-to-br from-primary-500 to-primary-700 rounded-full flex items-center justify-center">
              <span className="text-2xl">👤</span>
            </div>
            <h3 className="text-xl font-bold text-warm-800 mb-2">{t[language].personalApproach}</h3>
            <p className="text-warm-600 text-sm leading-relaxed">{t[language].personalApproachDesc}</p>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="container mx-auto px-4 py-16">
        <h2 className="section-title">{t[language].contact}</h2>
        <div className="glass-warm max-w-md mx-auto p-6 rounded-xl text-center">
          <div className="space-y-4">
            <div>
              <p className="text-warm-600 font-medium">{t[language].email}</p>
              <a
                href="mailto:sunbeam.th.co@gmail.com"
                className="text-warm-700 hover:text-warm-800 transition-colors"
              >
                sunbeam.th.co@gmail.com
              </a>
            </div>

            <div>
              <p className="text-warm-600 font-medium">{t[language].whatsapp}</p>
              <a
                href="https://wa.me/66650673689"
                className="text-warm-700 hover:text-warm-800 transition-colors"
              >
                +66650673689
              </a>
            </div>

            <p className="text-warm-500 text-sm mt-4">
              {t[language].orderInfo}
            </p>
          </div>
        </div>
      </section>

            {/* Cart Modal */}
      {isCartOpen && (
        <div
          className={`fixed inset-0 bg-black/70 flex z-50 ${isInTelegram ? 'items-end' : 'items-center justify-center p-4'}`}
          onClick={(e) => {
            if (e.target === e.currentTarget && !isTogglingCart) {
              setIsTogglingCart(true);
              setIsCartOpen(false);
              setTimeout(() => setIsTogglingCart(false), 100);
            }
          }}
        >
                              <div
            className={`cart-modal-container ${isInTelegram ? 'w-full h-[90vh] rounded-t-3xl' : 'w-full max-w-md mx-auto rounded-2xl max-h-[85vh]'} shadow-2xl overflow-hidden`}
            style={{
              background: 'linear-gradient(135deg, #fefdf8, #fffbeb)',
              border: '1px solid rgba(245, 158, 11, 0.2)',
              backdropFilter: 'blur(12px)'
            }}
            onClick={(e) => e.stopPropagation()}
          >
            <div className={`${isInTelegram ? 'h-full flex flex-col' : ''}`}>
              {/* Header */}
              <div className={`flex justify-between items-center border-b border-warm-200 ${isInTelegram ? 'p-4 pb-4' : 'p-6 mb-6 pb-4'}`}>
                <h2 className="text-2xl font-bold text-warm-800">{t[language].cart}</h2>
                <button
                  onClick={(e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    if (!isTogglingCart) {
                      setIsTogglingCart(true);
                      setIsCartOpen(false);
                      setTimeout(() => setIsTogglingCart(false), 100);
                    }
                  }}
                  disabled={isTogglingCart}
                  className="text-warm-600 hover:text-warm-800 text-3xl font-bold w-10 h-10 flex items-center justify-center rounded-full hover:bg-warm-100"
                >
                  ×
                </button>
              </div>

              {/* Content */}
              <div className={`${isInTelegram ? 'flex-1 flex flex-col p-4 overflow-hidden' : 'p-6'}`}>
                {cart.length === 0 ? (
                  <div className={`text-center ${isInTelegram ? 'flex-1 flex items-center justify-center' : 'py-8'}`}>
                    <p className="text-warm-600 text-lg">{t[language].empty}</p>
                  </div>
                ) : (
                  <>
                    {/* Cart Items */}
                    <div className={`space-y-4 overflow-y-auto ${isInTelegram ? 'flex-1 mb-4' : 'mb-6 max-h-[50vh]'}`}>
                      {cart.map((item) => {
                        const product = products.find(p => p.id === item.id)
                        if (!product) return null

                        return (
                          <div key={item.id} className={`bg-warm-50/80 rounded-lg border border-warm-200/50 ${isInTelegram ? 'p-3' : 'p-4'}`}>
                            <div className={`${isInTelegram ? 'mb-2' : 'mb-3'}`}>
                              <h3 className={`font-semibold text-warm-800 leading-tight ${isInTelegram ? 'text-sm' : 'text-base'}`}>
                                {language === 'en' ? product.name : product.nameRu}
                              </h3>
                              <p className={`text-warm-600 mt-1 ${isInTelegram ? 'text-xs' : 'text-sm'}`}>
                                ฿{product.price} × {item.quantity} = <span className="font-semibold">฿{product.price * item.quantity}</span>
                              </p>
                            </div>

                            <div className="flex items-center justify-center">
                              <button
                                onClick={() => removeFromCart(item.id)}
                                className={`bg-warm-200 hover:bg-warm-300 text-warm-800 rounded-lg flex items-center justify-center font-bold ${isInTelegram ? 'w-8 h-8 text-base' : 'w-8 h-8'}`}
                              >
                                −
                              </button>
                              <span className={`font-bold text-warm-800 min-w-[2rem] text-center ${isInTelegram ? 'mx-4 text-lg' : 'mx-4 text-lg'}`}>
                                {item.quantity}
                              </span>
                              <button
                                onClick={() => addToCart(item.id)}
                                className={`bg-warm-200 hover:bg-warm-300 text-warm-800 rounded-lg flex items-center justify-center font-bold ${isInTelegram ? 'w-8 h-8 text-base' : 'w-8 h-8'}`}
                              >
                                +
                              </button>
                            </div>
                          </div>
                        )
                      })}
                    </div>

                    {/* Footer */}
                    <div className={`border-t border-warm-200 ${isInTelegram ? 'pt-4 bg-warm-50/50' : 'pt-4'}`}>
                      <div className="flex justify-between items-center mb-4">
                        <span className="text-xl font-bold text-warm-800">{t[language].total}:</span>
                        <span className="text-xl font-bold text-warm-800">฿{getTotalPrice()}</span>
                      </div>

                      <button
                        onClick={handleOrder}
                        className={`w-full bg-gradient-to-r from-warm-500 to-warm-600 hover:from-warm-600 hover:to-warm-700 text-white font-bold rounded-lg text-lg transition-all duration-200 ${isInTelegram ? 'py-4 px-6' : 'py-3 px-6'}`}
                      >
                        {t[language].order}
                      </button>
                    </div>
                  </>
                )}
              </div>
            </div>
          </div>
        </div>
      )}

      <Toaster
        position="top-center"
        toastOptions={{
          duration: 2000,
          style: {
            background: '#fefdf8',
            color: '#92400e',
            border: '1px solid #fbbf24'
          }
        }}
      />
    </main>
  )
}
