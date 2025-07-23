'use client'

import { useState, useEffect } from 'react'
import Image from 'next/image'
import toast, { Toaster } from 'react-hot-toast'
import { track } from '@vercel/analytics'

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
  type: 'fish' | 'meat'
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
    badgeRu: "Традиционная",
    type: 'fish'
  },
  {
    id: 2,
    name: "Salmon with Citrus",
    nameRu: "Семга с цитрусом",
    description: "Premium Norwegian salmon prepared using our signature dry salting method with fresh lemon zest added at the final stage. The citrus subtly transforms the texture, giving it softness and freshness. The taste is structured, with a bright yet refined aromatic accent.",
    descriptionRu: "Премиальная норвежская сёмга, приготовленная по авторскому методу сухого посола с добавлением свежей лимонной цедры на финальном этапе. Цитрус тонко трансформирует текстуру, придавая ей мягкость и свежесть. Вкус - структурированный, с ярким, но утончённым ароматическим акцентом.",
    price: 180,
    image: "/fish_2.jpg",
    badge: "Signature",
    badgeRu: "Фирменная",
    type: 'fish'
  },
  {
    id: 3,
    name: "Cold-Smoked Salmon",
    nameRu: "Семга подкопченная",
    description: "Premium Norwegian salmon that underwent two-stage dry salting and gentle cold smoking on natural wood chips. Dense texture, expressive oiliness and noble smoky profile. Balanced product with depth of flavor and mature aftertaste.",
    descriptionRu: "Норвежская сёмга высшего качества, прошедшая двухступенчатый сухой посол и щадящее холодное копчение на натуральной щепе. Плотная текстура, выразительная маслянистость и благородный дымный профиль. Сбалансированный продукт с глубиной вкуса и зрелым послевкусием.",
    price: 180,
    image: "/smoked_fish.jpg",
    badge: "Artisan",
    badgeRu: "Ремесленная",
    type: 'fish'
  },
  {
    id: 4,
    name: "Premium Sashimi Salmon",
    nameRu: "Премиальная сёмга для сашими",
    description: "Premium Norwegian salmon of the highest grade, selected and prepared according to strict Japanese sashimi standards. Minimal processing to preserve natural texture and flavor. Perfect for raw consumption - pure, concentrated ocean taste with silky structure.",
    descriptionRu: "Норвежская сёмга высшего сорта, отобранная и приготовленная по строгим японским стандартам сашими. Минимальная обработка для сохранения натуральной текстуры и вкуса. Идеально подходит для употребления в сыром виде - чистый, концентрированный вкус океана с шелковистой структурой.",
    price: 220,
    image: "/fish_4.jpg",
    badge: "Premium",
    badgeRu: "Премиум",
    type: 'fish'
  },
  {
    id: 5,
    name: "Top Blade Steak",
    nameRu: "Топ Блейд Стейк",
    description: "Juicy and aromatic steak from the shoulder part of beef. Features a bright meaty flavor, moderate marbling and rich texture. When properly prepared, it becomes tender and soft, especially good in medium rare cooking. Suitable for grilling, pan-frying or baking. Perfect choice for connoisseurs of real meaty taste.",
    descriptionRu: "Сочный и ароматный стейк из лопаточной части говядины. Отличается ярким мясным вкусом, умеренной мраморностью и насыщенной текстурой. При правильном приготовлении становится мягким и нежным, особенно хорош в прожарке medium rare. Подходит для жарки на гриле, сковороде или запекания. Идеальный выбор для ценителей настоящего мясного вкуса.",
    price: 500,
    image: "/steak.jpg",
    badge: "Fresh",
    badgeRu: "Свежий",
    type: 'meat'
  },
  {
    id: 6,
    name: "Burger Patty",
    nameRu: "Котлета для бургера",
    description: "Juicy, meaty patty made from 100% beef - no additives, just pure meat flavor. Perfectly balanced fat content for even cooking and rich taste. Retains juiciness inside and forms an appetizing crust outside. Created specifically for classic and signature burger recipes.",
    descriptionRu: "Сочная, мясистая котлета из 100% говядины — без добавок, только чистый вкус мяса. Идеально сбалансирована по жирности для равномерной прожарки и насыщенного вкуса. Сохраняет сочность внутри и образует аппетитную корочку снаружи. Создана специально для классических и авторских рецептов бургеров.",
    price: 200,
    image: "/cutlet.jpg",
    badge: "100% Beef",
    badgeRu: "100% Говядина",
    type: 'meat'
  }
]

interface CartItem {
  id: number
  quantity: number
  weight: number // weight in grams for each item
}

type Language = 'en' | 'ru'

export default function FishShop() {
  const [cart, setCart] = useState<CartItem[]>([])
  const [isCartOpen, setIsCartOpen] = useState(false)
  const [language, setLanguage] = useState<Language>('ru')
  const [isInTelegram, setIsInTelegram] = useState(false)
  const [isTogglingCart, setIsTogglingCart] = useState(false)
  const [showOrderForm, setShowOrderForm] = useState(false)
  const [customerDetails, setCustomerDetails] = useState({
    whatsapp: '',
    location: '',
    mapsUrl: ''
  })
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null)
  const [selectedWeight, setSelectedWeight] = useState(300)
  const [isMounted, setIsMounted] = useState(false)
  const [isHydrated, setIsHydrated] = useState(false)

  const t = {
    en: {
      title: "Sunbeam",
      subtitle: "Premium Norwegian Salmon",
      description: "Experience the authentic taste of Norway with our premium salmon collection",
      positioning: "We are a small team that knows what good salmon is all about. We prepare it using a proven recipe - with attention to every detail and respect for quality. Our lightly salted and smoked salmon is what true connoisseurs seek: rich flavor, perfect texture, and nothing unnecessary.",
      addToCart: "Add to Cart",
      orderButton: "Order",
      orderMore: "Order More",
      cart: "Cart",
      total: "Total",
      order: "Order via WhatsApp",
      currency: "฿",
      perGram: "/100g",
      empty: "Your cart is empty",
      values: "Our Values",
      contact: "Contact Us",
      email: "Email",
      whatsapp: "WhatsApp",
      instagram: "Instagram",
      telegram: "Telegram",
      orderInfo: "Order via WhatsApp for direct contact",
      minOrder: "Minimum order: 300g",
      currentWeight: "Weight:",
      needMore: "Need {{amount}}g more to reach minimum order",
      orderForm: "Order Details",
      whatsappLabel: "Your WhatsApp Number",
      whatsappPlaceholder: "+66 xxx xxx xxx",
      locationLabel: "Comment",
      locationPlaceholder: "Any special instructions or notes",
      mapsLabel: "Google Maps Location",
      mapsPlaceholder: "Paste Google Maps link",
      confirmOrder: "Confirm Order",
      backToCart: "Back to Cart",
      fillAllFields: "Please fill all fields",
      invalidPhone: "Please enter a valid phone number",
      orderSuccess: "Order prepared! Redirecting to WhatsApp...",
      itemAdded: "Added to cart!",
      itemRemoved: "Removed from cart",
      welcomeBack: "Welcome back",
      quality: "Quality",
      qualityDesc: "We work only with chilled premium Norwegian salmon. Every batch passes through the hands of those who know exactly how perfect curing should look and feel.",
      recipeWeBelieveIn: "Recipe We Believe In",
      recipeWeBelieveInDesc: "We've worked long to achieve our taste. We measure everything precisely: salt, aging time, temperature. This gives consistent, clean results - no accidents.",
      workWithSoul: "Work with Soul and Taste",
      workWithSoulDesc: "We don't make 'just fish' - we truly care about how it looks, how it sits on bread, how the flavor unfolds. All of this is part of our approach that we believe in.",
      selectWeight: "Select Weight",
      weightOptions: "Weight Options",
      close: "Close",
      item: "item",
      items: "items",
      clearCart: "Clear Cart"
    },
    ru: {
      title: "Рыбный магазин Sunbeam",
      subtitle: "Премиальная норвежская семга",
      description: "Попробуйте подлинный вкус Норвегии с нашей премиальной коллекцией семги",
      positioning: "Мы - команда, которая знает толк в хорошей сёмге. Делаем её по проверенному рецепту - с вниманием к каждой детали и уважением к качеству. Наша слабосолёная и копчёная сёмга - то, что ищут настоящие ценители: насыщенный вкус, правильная текстура и ни капли лишнего",
      addToCart: "В корзину",
      orderButton: "Заказать",
      orderMore: "Заказать ещё",
      cart: "Корзина",
      total: "Итого",
      order: "Заказать через WhatsApp",
      currency: "฿",
      perGram: "/100г",
      empty: "Ваша корзина пуста",
      values: "Ценности компании",
      contact: "Связаться с нами",
      email: "Электронная почта",
      whatsapp: "WhatsApp",
      instagram: "Instagram",
      telegram: "Telegram",
      orderInfo: "Заказывайте через WhatsApp для прямого контакта",
      minOrder: "Минимальный заказ: 300г",
      currentWeight: "Вес:",
      needMore: "Нужно ещё {{amount}}г до минимального заказа",
      orderForm: "Детали заказа",
      whatsappLabel: "Ваш номер WhatsApp",
      whatsappPlaceholder: "+66 xxx xxx xxx",
      locationLabel: "Комментарий",
      locationPlaceholder: "Особые инструкции или пожелания",
      mapsLabel: "Локация Google Maps",
      mapsPlaceholder: "Вставьте ссылку Google Maps",
      confirmOrder: "Подтвердить заказ",
      backToCart: "Назад в корзину",
      fillAllFields: "Пожалуйста, заполните все поля",
      invalidPhone: "Пожалуйста, введите правильный номер телефона",
      orderSuccess: "Заказ подготовлен! Перенаправление в WhatsApp...",
      itemAdded: "Добавлено в корзину!",
      itemRemoved: "Удалено из корзины",
      welcomeBack: "Добро пожаловать",
      quality: "Качество",
      qualityDesc: "Мы работаем только с охлаждённой норвежской сёмгой премиум-класса. Каждая партия проходит через руки тех, кто точно знает, как должна выглядеть и ощущаться идеальная засолка.",
      recipeWeBelieveIn: "Рецепт, в который верим",
      recipeWeBelieveInDesc: "Мы долго шли к своему вкусу. Отмеряем всё с точностью: соль, выдержку, температуру. Это даёт стабильный, чистый результат - без случайностей.",
      workWithSoul: "Работа с душой и вкусом",
      workWithSoulDesc: "Мы не делаем \"просто рыбу\" - нам по-настоящему важно, как она выглядит, как ложится на хлеб, как раскрывается вкус. Всё это - часть нашего подхода, в котором мы уверены.",
      selectWeight: "Выберите вес",
      weightOptions: "Варианты веса",
      close: "Закрыть",
      item: "товар",
      items: "товаров",
      clearCart: "Очистить корзину"
    }
  }

  // Hydration effect
  useEffect(() => {
    setIsMounted(true)
  }, [])

  // Initialize component after hydration
  useEffect(() => {
    if (!isMounted) return

    const timer = setTimeout(() => {
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

      // Load saved language and cart - only on client side
      if (typeof window !== 'undefined') {
        const savedLanguage = localStorage.getItem('language') as Language
        if (savedLanguage) {
          setLanguage(savedLanguage)
        }

        const savedCart = localStorage.getItem('cart')
        if (savedCart) {
          try {
            setCart(JSON.parse(savedCart))
          } catch (error) {
            console.warn('Failed to parse saved cart:', error)
            localStorage.removeItem('cart')
          }
        }
      }

      setIsHydrated(true)
    }, 100)

    return () => clearTimeout(timer)
  }, [isMounted])

  // Welcome message after hydration
  useEffect(() => {
    if (isHydrated) {
      setTimeout(() => {
        toast.success(t[language].welcomeBack)
      }, 500)
    }
  }, [isHydrated]) // eslint-disable-line react-hooks/exhaustive-deps

  // Save to localStorage when cart changes
  useEffect(() => {
    if (isHydrated && typeof window !== 'undefined') {
      localStorage.setItem('cart', JSON.stringify(cart))

      // Update Telegram main button
      if (typeof window !== 'undefined' && window.Telegram?.WebApp?.MainButton) {
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
  }, [cart, isHydrated])

  useEffect(() => {
    if (isHydrated && typeof window !== 'undefined') {
      localStorage.setItem('language', language)
    }
  }, [language, isHydrated])

  // Cart functions
  const addToCart = (productId: number, weight: number = 100) => {
    const product = products.find(p => p.id === productId)

    if (!product) {
      console.error('Product not found:', productId)
      return
    }

    setCart(prev => {
      // Find existing item with the SAME weight (not just same product)
      const existing = prev.find(item => item.id === productId && Math.round(item.weight / item.quantity) === weight)
      if (existing) {
        return prev.map(item =>
          item.id === productId && Math.round(item.weight / item.quantity) === weight
            ? { ...item, quantity: item.quantity + 1, weight: item.weight + weight }
            : item
        )
      }
      // Create new cart item for different weight of same product
      return [...prev, { id: productId, quantity: 1, weight: weight }]
    })

    // Analytics tracking
    track('add_to_cart', {
      product_id: productId,
      product_name: (language === 'en' ? product.name : product.nameRu) || 'unknown',
      price: product.price || 0,
      weight: weight,
      platform: isInTelegram ? 'telegram' : 'web',
      language: language
    })

    // Haptic feedback
    if (typeof window !== 'undefined' && window.Telegram?.WebApp?.HapticFeedback) {
      window.Telegram.WebApp.HapticFeedback.impactOccurred('light')
    }

    toast.success(t[language].itemAdded)
    setSelectedProduct(null) // Close modal after adding to cart
  }

  const removeFromCart = (productId: number, targetWeight?: number) => {
    setCart(prev => {
      // If targetWeight is provided, find the specific cart item
      // Otherwise, find the first item with this productId
      const existing = targetWeight
        ? prev.find(item => item.id === productId && Math.round(item.weight / item.quantity) === targetWeight)
        : prev.find(item => item.id === productId)

      if (existing && existing.quantity > 1) {
        const weightPerItem = Math.round(existing.weight / existing.quantity)
        return prev.map(item =>
          item === existing
            ? { ...item, quantity: item.quantity - 1, weight: Math.max(0, item.weight - weightPerItem) }
            : item
        )
      }
      // Remove the entire cart item
      return prev.filter(item => item !== existing)
    })

    // Haptic feedback
    if (typeof window !== 'undefined' && window.Telegram?.WebApp?.HapticFeedback) {
      window.Telegram.WebApp.HapticFeedback.impactOccurred('light')
    }

    toast.success(t[language].itemRemoved)
  }

  const getTotalPrice = () => {
    return cart.reduce((total, item) => {
      const product = products.find(p => p.id === item.id)
      if (!product) return total

      if (product.type === 'meat') {
        return total + (product.price * item.quantity)
      } else {
        return total + (product.price * item.weight) / 100
      }
    }, 0)
  }

  const getTotalItems = () => {
    return cart.reduce((total, item) => total + item.quantity, 0)
  }

  const getTotalWeight = () => {
    return cart.reduce((total, item) => {
      const product = products.find(p => p.id === item.id)
      if (product && product.type === 'fish') {
        return total + item.weight
      }
      return total
    }, 0)
  }

  const clearCart = () => {
    setCart([])
    toast.success(language === 'en' ? 'Cart cleared' : 'Корзина очищена')
  }

  const getCartItemQuantity = (productId: number) => {
    // Sum up quantities across all cart items for this product (different weights)
    return cart
      .filter(item => item.id === productId)
      .reduce((total, item) => total + item.quantity, 0)
  }

  const handleOrder = () => {
    if (cart.length === 0) return

    const totalWeight = getTotalWeight()
    const hasFishProducts = cart.some(item => {
      const product = products.find(p => p.id === item.id)
      return product && product.type === 'fish'
    })

    if (hasFishProducts && totalWeight < 300) {
      const needed = 300 - totalWeight
      const message = t[language].needMore.replace('{{amount}}', needed.toString())
      toast.error(message)
      return
    }

    // Show order form instead of immediately sending to WhatsApp
    setShowOrderForm(true)
  }

  const handleConfirmOrder = () => {
    // Validate form fields
    if (!customerDetails.whatsapp.trim() || !customerDetails.mapsUrl.trim()) {
      toast.error(t[language].fillAllFields)
      return
    }

    // Improved phone number validation for international numbers
    const phoneNumber = customerDetails.whatsapp.trim()
    // Remove all non-digit characters except + at the beginning
    const cleanPhone = phoneNumber.replace(/[^\d+]/g, '')
    // Check if it starts with + and has at least 7 digits
    const hasCountryCode = cleanPhone.startsWith('+')
    const digitCount = cleanPhone.replace(/\D/g, '').length

    if (!hasCountryCode || digitCount < 7 || digitCount > 15) {
      toast.error(t[language].invalidPhone)
      return
    }

    // Proceed directly to WhatsApp
    const totalWeight = getTotalWeight()
    const orderText = cart.map((item, index) => {
      const product = products.find(p => p.id === item.id)
      const productName = language === 'en' ? product?.name : product?.nameRu

      if (product?.type === 'meat') {
        const totalPrice = product.price * item.quantity
        return `${index + 1}. ${productName} x${item.quantity} items - ฿${Math.round(totalPrice)}`
      } else {
        const totalPrice = product ? (product.price * item.weight) / 100 : 0
        return `${index + 1}. ${productName} x${item.quantity} (${item.weight}g) - ฿${Math.round(totalPrice)}`
      }
    }).join('\n')

    const totalPrice = getTotalPrice()

    const message = language === 'en'
      ? `*Order from Sunbeam Shop*\n\n*Customer Details:*\n📱 WhatsApp: ${customerDetails.whatsapp}\n📍 Location: ${customerDetails.mapsUrl}${customerDetails.location ? `\n💬 Comment: ${customerDetails.location}` : ''}\n\n*Items:*\n${orderText}\n\n*Total Weight: ${totalWeight}g*\n*Total: ฿${Math.round(totalPrice)}*\n\nThank you for your order!`
      : `*Заказ из магазина Sunbeam*\n\n*Данные клиента:*\n📱 WhatsApp: ${customerDetails.whatsapp}\n📍 Адрес: ${customerDetails.mapsUrl}${customerDetails.location ? `\n💬 Комментарий: ${customerDetails.location}` : ''}\n\n*Товары:*\n${orderText}\n\n*Общий вес: ${totalWeight}г*\n*Итого: ฿${Math.round(totalPrice)}*\n\nСпасибо за ваш заказ!`

    const whatsappUrl = `https://wa.me/66650673689?text=${encodeURIComponent(message)}`

    // Analytics tracking for order
    track('place_order', {
      total_price: Math.round(totalPrice),
      items_count: cart.length,
      total_items: cart.reduce((sum, item) => sum + item.quantity, 0),
      platform: isInTelegram ? 'telegram' : 'web',
      language: language
    })

    toast.success(t[language].orderSuccess)

    // Clear cart and close modals
    setCart([])
    setIsCartOpen(false)
    setShowOrderForm(false)
    setCustomerDetails({ whatsapp: '', location: '', mapsUrl: '' })

    setTimeout(() => {
      if (isInTelegram && typeof window !== 'undefined' && window.Telegram?.WebApp) {
        // For Telegram mini app, use openLink (not openTelegramLink for external URLs)
        try {
          window.Telegram.WebApp.openLink(whatsappUrl)
        } catch {
          // Fallback to regular window.open
          if (typeof window !== 'undefined') {
            window.open(whatsappUrl, '_blank')
          }
        }
      } else {
        // For regular web browsers
        if (typeof window !== 'undefined') {
          window.open(whatsappUrl, '_blank')
        }
      }
    }, 500)
  }

  const openProductModal = (product: Product) => {
    setSelectedProduct(product)
    setSelectedWeight(300) // Default to 300g
  }

  // Prevent hydration mismatch: show loading until mounted on client
  if (!isMounted) {
    return (
      <div className="min-h-screen flex items-center justify-center sunbeam-hero">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-warm-300 border-t-warm-600 rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-900">Loading...</p>
        </div>
      </div>
    )
  }

  return (
    <main className="min-h-screen sunbeam-hero pb-20 md:pb-0">
      {/* Top Navigation Bar */}
      <nav className="fixed top-0 left-0 right-0 z-50 glass-warm border-b border-warm-200/30 backdrop-blur-md">
        <div className="container mx-auto px-4 py-3 flex justify-between items-center">
          {/* Left Side - Logo */}
          <div className="flex items-center">
            <Image
              src="/logo.svg"
              alt="Sunbeam Logo"
              width={60}
              height={60}
              className="rounded-lg"
              priority
            />
          </div>

          {/* Right Side - Phone, Instagram, Cart (Web) and Language Toggle */}
          <div className="flex items-center gap-3">
            {/* Phone */}
            <a
              href="https://wa.me/66650673689"
              target="_blank"
              className="glass-warm px-3 py-2 rounded-lg text-sm font-medium hover:scale-105 transition-transform text-gray-900 flex items-center justify-center w-24 sm:w-auto sm:min-w-[120px]"
            >
              <svg
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="currentColor"
                className="text-green-600 sm:mr-1"
              >
                <path d="M6.62 10.79c1.44 2.83 3.76 5.14 6.59 6.59l2.2-2.2c.27-.27.67-.36 1.02-.24 1.12.37 2.33.57 3.57.57.55 0 1 .45 1 1V20c0 .55-.45 1-1 1-9.39 0-17-7.61-17-17 0-.55.45-1 1-1h3.5c.55 0 1 .45 1 1 0 1.25.2 2.45.57 3.57.11.35.03.74-.25 1.02l-2.2 2.2z"/>
              </svg>
              <span className="hidden sm:inline">+66650673689</span>
            </a>

            {/* Instagram */}
            <a
              href="https://www.instagram.com/sunbeam_food_phuket?igsh=MXNxcnFsOXFlM2dhNg=="
              target="_blank"
              className="glass-warm px-3 py-2 rounded-lg text-sm font-medium hover:scale-105 transition-transform text-gray-900 flex items-center justify-center w-24 sm:w-auto sm:min-w-[120px]"
            >
              <svg
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="currentColor"
                className="text-pink-600 sm:mr-1"
              >
                <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.40s-.644-1.44-1.439-1.44z"/>
              </svg>
              <span className="hidden sm:inline">Instagram</span>
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
                className="logo-button flex items-center gap-2 px-4 py-2 text-sm hidden md:flex"
              >
                🛒 {t[language].cart}
                {cart.length > 0 && (
                  <span className="bg-warm-100 text-gray-900 rounded-lg px-2 py-1 text-xs font-bold min-w-[1.5rem]">
                    {getTotalItems()}
                  </span>
                )}
              </button>
            )}
            {/* Language Toggle */}
            <button
              onClick={() => {
                const newLang = language === 'en' ? 'ru' : 'en'
                track('language_change', {
                  from: language,
                  to: newLang,
                  platform: isInTelegram ? 'telegram' : 'web'
                })
                setLanguage(newLang)
              }}
              className="glass-warm px-3 py-2 rounded-lg text-sm font-medium hover:scale-105 transition-transform"
            >
              {language === 'en' ? '🇷🇺 RU' : '🇬🇧 EN'}
            </button>
          </div>
        </div>
      </nav>

      {/* Header */}
      <header className="container mx-auto px-4 py-8 mt-20">
        <div className="text-center mb-8">
          <Image
            src="/sunbeam_text.svg"
            alt="Sunbeam"
            width={300}
            height={120}
            className="mx-auto"
            priority
          />
        </div>
        <div className="text-center">
          <p className="text-gray-900 max-w-2xl mx-auto">
            {t[language].positioning}
          </p>
        </div>
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
                    loading="lazy"
                  />
                  {product.badge && (
                    <span className="absolute top-2 right-2 sunbeam-badge">
                      {language === 'en' ? product.badge : product.badgeRu}
                    </span>
                  )}
                </div>

                <div className="flex flex-col flex-grow">
                  <h3 className="text-lg sm:text-xl font-bold text-gray-900 mb-3">
                    {language === 'en' ? product.name : product.nameRu}
                  </h3>

                  <p className="text-gray-900 mb-4 text-sm sm:text-base leading-relaxed flex-grow">
                    {language === 'en' ? product.description : product.descriptionRu}
                  </p>

                  <div className="flex items-center justify-between mt-auto">
                    <span className="product-price text-lg sm:text-xl">
                      ฿{product.price}
                    </span>

                    <button
                      onClick={() => {
                        if (product.type === 'meat') {
                          addToCart(product.id, 1) // Add as single item for meat products
                        } else {
                          openProductModal(product) // Show weight selector for fish products
                        }
                      }}
                      className="logo-button text-sm sm:text-base px-4 py-2"
                      aria-label={`${t[language].orderButton}: ${language === 'en' ? product.name : product.nameRu}`}
                    >
                      {quantity > 0 ? t[language].orderMore : t[language].orderButton}
                    </button>
                  </div>
                </div>
              </div>
            )
          })}
        </div>
      </section>


      {/* Values Section */}
      <section id="values" className="container mx-auto px-4 py-16">
        <h2 className="section-title">{t[language].values}</h2>
        <div className="grid md:grid-cols-1 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
          <div className="feature-card text-center">
            <div className="w-16 h-16 mx-auto mb-4 bg-gradient-to-br from-sunbeam-400 to-sunbeam-600 rounded-full flex items-center justify-center">
              <span className="text-2xl">💎</span>
            </div>
            <h3 className="text-xl font-bold text-gray-900 mb-2">{t[language].quality}</h3>
            <p className="text-gray-900 text-sm leading-relaxed">{t[language].qualityDesc}</p>
          </div>

          <div className="feature-card text-center">
            <div className="w-16 h-16 mx-auto mb-4 bg-gradient-to-br from-warm-400 to-warm-600 rounded-full flex items-center justify-center">
              <span className="text-2xl">📋</span>
            </div>
            <h3 className="text-xl font-bold text-gray-900 mb-2">{t[language].recipeWeBelieveIn}</h3>
            <p className="text-gray-900 text-sm leading-relaxed">{t[language].recipeWeBelieveInDesc}</p>
          </div>

          <div className="feature-card text-center">
            <div className="w-16 h-16 mx-auto mb-4 bg-gradient-to-br from-primary-400 to-primary-600 rounded-full flex items-center justify-center">
              <span className="text-2xl">❤️</span>
            </div>
            <h3 className="text-xl font-bold text-gray-900 mb-2">{t[language].workWithSoul}</h3>
            <p className="text-gray-900 text-sm leading-relaxed">{t[language].workWithSoulDesc}</p>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="container mx-auto px-4 py-16">
        <h2 className="section-title">{t[language].contact}</h2>
        <div className="glass-warm max-w-md mx-auto p-6 rounded-xl text-center">
          <div className="space-y-4">
            <div>
              <p className="text-gray-900 font-medium">{t[language].email}</p>
              <a
                href="mailto:sunbeam.th.co@gmail.com"
                className="text-gray-900 hover:text-gray-900 transition-colors flex items-center justify-center gap-2"
              >
                <svg
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  className="text-blue-600"
                >
                  <path d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z"/>
                </svg>
                sunbeam.th.co@gmail.com
              </a>
            </div>

            <div>
              <p className="text-gray-900 font-medium">{t[language].whatsapp}</p>
              <a
                href="https://wa.me/66650673689"
                target="_blank"
                className="text-gray-900 hover:text-gray-900 transition-colors flex items-center justify-center gap-2"
              >
                <svg
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  className="text-green-600"
                >
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893A11.821 11.821 0 0020.893 3.488"/>
                </svg>
                +66650673689
              </a>
            </div>

            <div>
              <p className="text-gray-900 font-medium">{t[language].telegram}</p>
              <a
                href="https://t.me/66650673689"
                target="_blank"
                className="text-gray-900 hover:text-gray-900 transition-colors flex items-center justify-center gap-2"
              >
                <svg
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  className="text-blue-500"
                >
                  <path d="M11.944 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 12 0a12 12 0 0 0-.056 0zm4.962 7.224c.1-.002.321.023.465.14a.506.506 0 0 1 .171.325c.016.093.036.306.02.472-.18 1.898-.962 6.502-1.36 8.627-.168.9-.499 1.201-.82 1.23-.696.065-1.225-.46-1.9-.902-1.056-.693-1.653-1.124-2.678-1.8-1.185-.78-.417-1.21.258-1.91.177-.184 3.247-2.977 3.307-3.23.007-.032.014-.15-.056-.212s-.174-.041-.249-.024c-.106.024-1.793 1.14-5.061 3.345-.48.33-.913.49-1.302.48-.428-.008-1.252-.241-1.865-.44-.752-.245-1.349-.374-1.297-.789.027-.216.325-.437.893-.663 3.498-1.524 5.83-2.529 6.998-3.014 3.332-1.386 4.025-1.627 4.476-1.635z"/>
                </svg>
                +66650673689
              </a>
            </div>

            <div>
              <p className="text-gray-900 font-medium">{t[language].instagram}</p>
              <a
                href="https://www.instagram.com/sunbeam_food_phuket?igsh=MXNxcnFsOXFlM2dhNg=="
                target="_blank"
                className="text-gray-900 hover:text-gray-900 transition-colors flex items-center justify-center gap-2"
              >
                <svg
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  className="text-pink-600"
                >
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                </svg>
                @sunbeam_food_phuket
              </a>
            </div>

            <p className="text-gray-700 text-sm mt-4">
              {t[language].orderInfo}
            </p>
            <p className="text-gray-900 text-sm mt-2 font-medium">
              {t[language].minOrder}
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
              setShowOrderForm(false);
              setCustomerDetails({ whatsapp: '', location: '', mapsUrl: '' });
              setTimeout(() => setIsTogglingCart(false), 100);
            }
          }}
        >
          <div
            className={`cart-modal-container ${isInTelegram ? 'w-full h-[90vh] rounded-t-3xl flex flex-col' : 'w-full max-w-lg mx-auto rounded-2xl max-h-[90vh] flex flex-col'} shadow-2xl`}
            style={{
              background: 'linear-gradient(135deg, #fefdf8, #fffbeb)',
              border: '1px solid rgba(245, 158, 11, 0.2)',
              backdropFilter: 'blur(12px)'
            }}
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex flex-col h-full">
              {/* Header */}
              <div className={`flex justify-between items-center border-b border-warm-200 ${isInTelegram ? 'p-4 pb-4' : 'p-6 mb-6 pb-4'}`}>
                <h2 className="text-2xl font-bold text-gray-900">{t[language].cart}</h2>
                <div className="flex items-center gap-2">
                  {cart.length > 0 && (
                    <button
                      onClick={clearCart}
                      className="text-red-600 hover:text-red-800 text-sm font-medium px-3 py-1 rounded-lg hover:bg-red-50 transition-colors"
                    >
                      {t[language].clearCart}
                    </button>
                  )}
                  <button
                    onClick={(e) => {
                      e.preventDefault();
                      e.stopPropagation();
                      if (!isTogglingCart) {
                        setIsTogglingCart(true);
                        setIsCartOpen(false);
                        setShowOrderForm(false);
                        setCustomerDetails({ whatsapp: '', location: '', mapsUrl: '' });
                        setTimeout(() => setIsTogglingCart(false), 100);
                      }
                    }}
                    disabled={isTogglingCart}
                    className="text-gray-900 hover:text-gray-900 text-3xl font-bold w-10 h-10 flex items-center justify-center rounded-full hover:bg-gray-100"
                  >
                    ×
                  </button>
                </div>
              </div>

              {/* Content */}
              <div className="flex-1 overflow-y-auto p-4">
                {cart.length === 0 ? (
                  <div className={`text-center ${isInTelegram ? 'flex-1 flex items-center justify-center' : 'py-8'}`}>
                    <p className="text-gray-900 text-lg">{t[language].empty}</p>
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
                            <div className="flex gap-3">
                              {/* Product Image */}
                              <div className="flex-shrink-0">
                                <Image
                                  src={product.image}
                                  alt={language === 'en' ? product.name : product.nameRu}
                                  width={60}
                                  height={60}
                                  className="w-12 h-12 object-cover rounded-lg"
                                  loading="lazy"
                                />
                              </div>

                              {/* Product Info */}
                              <div className="flex-1">
                                <div className={`${isInTelegram ? 'mb-2' : 'mb-3'}`}>
                                  <h3 className={`font-semibold text-gray-900 leading-tight ${isInTelegram ? 'text-sm' : 'text-base'}`}>
                                    {language === 'en' ? product.name : product.nameRu}
                                  </h3>
                                  <p className={`text-gray-900 mt-1 ${isInTelegram ? 'text-xs' : 'text-sm'}`}>
                                    {product.type === 'meat'
                                      ? `${item.quantity} × 1 item = ${item.quantity} items - `
                                      : `${item.quantity} × ${Math.round(item.weight / item.quantity)}g = ${item.weight}g - `
                                    }
                                    <span className="font-semibold">
                                      ฿{Math.round(product.type === 'meat' ? (product.price * item.quantity) : (product.price * item.weight) / 100)}
                                    </span>
                                  </p>
                                </div>

                                <div className="flex items-center justify-center">
                                  <button
                                    onClick={() => {
                                      const weightPerItem = Math.round(item.weight / item.quantity)
                                      removeFromCart(item.id, weightPerItem)
                                    }}
                                    className={`bg-warm-200 hover:bg-warm-300 text-gray-900 rounded-lg flex items-center justify-center font-bold ${isInTelegram ? 'w-8 h-8 text-base' : 'w-8 h-8'}`}
                                  >
                                    −
                                  </button>
                                  <span className={`font-bold text-gray-900 min-w-[2rem] text-center ${isInTelegram ? 'mx-4 text-lg' : 'mx-4 text-lg'}`}>
                                    {item.quantity}
                                  </span>
                                  <button
                                    onClick={() => {
                                      // Add the same weight per item to maintain consistency
                                      const weightPerItem = Math.round(item.weight / item.quantity)
                                      addToCart(item.id, weightPerItem)
                                    }}
                                    className={`bg-warm-200 hover:bg-warm-300 text-gray-900 rounded-lg flex items-center justify-center font-bold ${isInTelegram ? 'w-8 h-8 text-base' : 'w-8 h-8'}`}
                                  >
                                    +
                                  </button>
                                </div>
                              </div>
                            </div>
                          </div>
                        )
                      })}
                    </div>

                                        {/* Footer */}
                    <div className={`border-t border-warm-200 ${isInTelegram ? 'pt-4 bg-warm-50/50' : 'pt-4'} sticky bottom-0 z-10 bg-inherit`}>
                      {getTotalWeight() > 0 && (
                        <div className="flex justify-between items-center mb-1">
                          <span className="text-lg font-bold text-gray-900">{t[language].currentWeight}</span>
                          <span className="text-lg font-bold text-gray-900">{getTotalWeight()}g</span>
                        </div>
                      )}

                      <div className="flex justify-between items-center mb-2">
                        <span className="text-xl font-bold text-gray-900">{t[language].total}:</span>
                        <span className="text-xl font-bold text-gray-900">฿{getTotalPrice()}</span>
                      </div>

                      {(() => {
                        const totalWeight = getTotalWeight()
                        const hasFishProducts = cart.some(item => {
                          const product = products.find(p => p.id === item.id)
                          return product && product.type === 'fish'
                        })

                        if (hasFishProducts && totalWeight < 300) {
                          return (
                            <p className="text-red-600 text-xs text-center mb-4 font-medium">
                              {t[language].needMore.replace('{{amount}}', (300 - totalWeight).toString())}
                            </p>
                          )
                        } else if (hasFishProducts && totalWeight >= 300) {
                          return (
                            <p className="text-green-600 text-xs text-center mb-4 font-medium">
                              ✓ {t[language].minOrder}
                            </p>
                          )
                        }
                        return null
                      })()}

                      <button
                        onClick={handleOrder}
                        disabled={(() => {
                          const totalWeight = getTotalWeight()
                          const hasFishProducts = cart.some(item => {
                            const product = products.find(p => p.id === item.id)
                            return product && product.type === 'fish'
                          })
                          return hasFishProducts && totalWeight < 300
                        })()}
                        className={`w-full font-bold rounded-lg text-lg transition-all duration-200 ${isInTelegram ? 'py-4 px-6' : 'py-3 px-6'} ${
                          (() => {
                            const totalWeight = getTotalWeight()
                            const hasFishProducts = cart.some(item => {
                              const product = products.find(p => p.id === item.id)
                              return product && product.type === 'fish'
                            })
                            return hasFishProducts && totalWeight < 300
                          })()
                            ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                            : 'bg-gradient-to-r from-warm-500 to-warm-600 hover:from-warm-600 hover:to-warm-700 text-white'
                        }`}
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

      {/* Order Form Modal */}
      {showOrderForm && (
        <div
          className={`fixed inset-0 bg-black/70 flex z-50 ${isInTelegram ? 'items-end' : 'items-center justify-center p-4'}`}
          onClick={(e) => {
            if (e.target === e.currentTarget) {
              setShowOrderForm(false)
            }
          }}
        >
          <div
            className={`order-form-container ${isInTelegram ? 'w-full h-[90vh] rounded-t-3xl flex flex-col' : 'w-full max-w-lg mx-auto rounded-2xl max-h-[90vh] flex flex-col'} shadow-2xl`}
            style={{
              background: 'linear-gradient(135deg, #fefdf8, #fffbeb)',
              border: '1px solid rgba(245, 158, 11, 0.2)',
              backdropFilter: 'blur(12px)'
            }}
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex flex-col h-full">
              {/* Header */}
              <div className={`flex justify-between items-center border-b border-warm-200 ${isInTelegram ? 'p-4 pb-4' : 'p-6 mb-6 pb-4'}`}>
                <h2 className="text-2xl font-bold text-gray-900">{t[language].orderForm}</h2>
                <button
                  onClick={() => setShowOrderForm(false)}
                  className="text-gray-900 hover:text-gray-900 text-3xl font-bold w-10 h-10 flex items-center justify-center rounded-full hover:bg-gray-100"
                >
                  ×
                </button>
              </div>

              {/* Form Content */}
              <div className="flex-1 overflow-y-auto p-4">
                <div className={`${isInTelegram ? 'space-y-4' : 'space-y-6'}`}>
                  {/* WhatsApp Number Field */}
                  <div>
                    <label className="block text-gray-900 font-semibold mb-2">
                      {t[language].whatsappLabel}
                    </label>
                    <input
                      type="tel"
                      value={customerDetails.whatsapp}
                      onChange={(e) => {
                        // Allow international phone number formats
                        const value = e.target.value
                        setCustomerDetails({...customerDetails, whatsapp: value})
                      }}
                      placeholder={language === 'en' ? '+66 650 673 689' : '+66 650 673 689'}
                      className="w-full px-4 py-3 rounded-lg border border-warm-300 focus:border-warm-500 focus:outline-none bg-white text-gray-900"
                    />
                  </div>

                  {/* Google Maps URL Field */}
                  <div>
                    <label className="block text-gray-900 font-semibold mb-2">
                      {t[language].mapsLabel}
                    </label>
                    <input
                      type="url"
                      value={customerDetails.mapsUrl}
                      onChange={(e) => setCustomerDetails({...customerDetails, mapsUrl: e.target.value})}
                      placeholder={t[language].mapsPlaceholder}
                      className="w-full px-4 py-3 rounded-lg border border-warm-300 focus:border-warm-500 focus:outline-none bg-white text-gray-900"
                    />
                  </div>

                  {/* Comment Field */}
                  <div>
                    <label className="block text-gray-900 font-semibold mb-2">
                      {t[language].locationLabel}
                    </label>
                    <textarea
                      value={customerDetails.location}
                      onChange={(e) => setCustomerDetails({...customerDetails, location: e.target.value})}
                      placeholder={t[language].locationPlaceholder}
                      rows={3}
                      className="w-full px-4 py-3 rounded-lg border border-warm-300 focus:border-warm-500 focus:outline-none bg-white text-gray-900 resize-none"
                    />
                  </div>
                </div>
              </div>

              {/* Form Footer */}
              <div className={`${isInTelegram ? 'mt-auto pt-4 bg-warm-50/50 border-t border-warm-200 mx-[-1rem] px-4 pb-4 space-y-2' : 'mt-6 space-y-3'} sticky bottom-0 z-10 bg-inherit`}>
                <button
                  onClick={handleConfirmOrder}
                  className={`w-full bg-gradient-to-r from-warm-500 to-warm-600 hover:from-warm-600 hover:to-warm-700 text-white font-bold rounded-lg transition-all duration-200 ${isInTelegram ? 'py-2.5 px-4 text-base' : 'py-3 px-6 text-lg'}`}
                >
                  {t[language].confirmOrder}
                </button>

                <button
                  onClick={() => {
                    setShowOrderForm(false);
                    setIsCartOpen(true);
                  }}
                  className={`w-full bg-warm-200 hover:bg-warm-300 text-gray-900 font-bold rounded-lg transition-all duration-200 ${isInTelegram ? 'py-2.5 px-4 text-base' : 'py-3 px-6 text-lg'}`}
                >
                  {t[language].backToCart}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Product Selection Modal */}
      {selectedProduct && (
        <div
          className={`fixed inset-0 bg-black/70 flex z-50 ${isInTelegram ? 'items-end' : 'items-center justify-center p-4'}`}
          onClick={(e) => {
            if (e.target === e.currentTarget) {
              setSelectedProduct(null)
            }
          }}
        >
          <div
            className={`product-modal-container ${isInTelegram ? 'w-full h-[85vh] rounded-t-3xl' : 'w-full max-w-lg mx-auto rounded-2xl max-h-[95vh]'} shadow-2xl overflow-hidden`}
            style={{
              background: 'linear-gradient(135deg, #fefdf8, #fffbeb)',
              border: '1px solid rgba(245, 158, 11, 0.2)',
              backdropFilter: 'blur(12px)'
            }}
            onClick={(e) => e.stopPropagation()}
          >
            <div className={`${isInTelegram ? 'h-full flex flex-col' : ''}`}>
              {/* Header */}
              <div className={`flex justify-between items-center border-b border-warm-200 ${isInTelegram ? 'p-3 pb-3' : 'p-6 mb-6 pb-4'}`}>
                <h2 className={`font-bold text-gray-900 ${isInTelegram ? 'text-lg' : 'text-2xl'}`}>{t[language].selectWeight}</h2>
                                  <button
                    onClick={() => setSelectedProduct(null)}
                    className={`text-gray-600 hover:text-gray-900 font-bold flex items-center justify-center rounded-full hover:bg-gray-100 ${isInTelegram ? 'text-2xl w-8 h-8' : 'text-3xl w-10 h-10'}`}
                  >
                    ×
                  </button>
              </div>

              {/* Content */}
              <div className={`${isInTelegram ? 'flex-1 flex flex-col p-3' : 'p-6'} overflow-y-auto`}>
                {/* Product Image and Info - Side by Side */}
                <div className={`flex gap-3 items-start ${isInTelegram ? 'mb-4' : 'mb-6'}`}>
                  {/* Product Image - Left Side */}
                  <div className={`flex-shrink-0 ${isInTelegram ? 'w-1/2' : 'w-1/2'}`}>
                    <div className="relative leading-none">
                      <Image
                        src={selectedProduct.image}
                        alt={language === 'en' ? selectedProduct.name : selectedProduct.nameRu}
                        width={300}
                        height={200}
                        className={`w-full object-cover rounded-lg ${isInTelegram ? 'h-48' : 'h-60'} block`}
                        loading="lazy"
                      />
                      {selectedProduct.badge && (
                        <span className={`absolute top-1 right-1 bg-warm-500 text-white rounded-full ${isInTelegram ? 'text-xs px-1.5 py-0.5' : 'text-xs px-2 py-1'}`}>
                          {language === 'en' ? selectedProduct.badge : selectedProduct.badgeRu}
                        </span>
                      )}
                    </div>
                  </div>

                  {/* Product Info - Right Side */}
                  <div className="flex-1 min-h-0">
                    <h3 className={`font-bold text-gray-900 mt-0 leading-tight ${isInTelegram ? 'text-xs mb-1' : 'text-lg mb-2'}`}>
                      {language === 'en' ? selectedProduct.name : selectedProduct.nameRu}
                    </h3>
                    <div className={`text-gray-900 leading-relaxed ${isInTelegram ? 'text-xs' : 'text-sm'} whitespace-normal break-words`}>
                      {language === 'en' ? selectedProduct.description : selectedProduct.descriptionRu}
                    </div>
                  </div>
                </div>

                {/* Weight Options */}
                <div className={`${isInTelegram ? 'mb-2' : 'mb-3'} flex-shrink-0`}>
                  <h4 className={`font-semibold text-gray-900 ${isInTelegram ? 'text-xs mb-1' : 'text-base mb-2'}`}>{t[language].weightOptions}</h4>
                  <div className={`${isInTelegram ? 'space-y-1' : 'space-y-1.5'}`}>
                    {[300, 400, 500].map((weight) => (
                      <button
                        key={weight}
                        onClick={() => setSelectedWeight(weight)}
                        className={`w-full rounded-lg border-2 transition-all duration-200 ${isInTelegram ? 'p-2' : 'p-2'} ${
                          selectedWeight === weight
                            ? 'border-warm-500 bg-warm-50'
                            : 'border-warm-200 bg-white hover:border-warm-300'
                        }`}
                      >
                        <div className="flex justify-between items-center">
                          <span className={`font-semibold text-gray-900 ${isInTelegram ? 'text-sm' : 'text-base'}`}>{weight}g</span>
                          <span className={`font-bold text-gray-900 ${isInTelegram ? 'text-sm' : 'text-base'}`}>
                            ฿{Math.round(selectedProduct.price * (weight / 100))}
                          </span>
                        </div>
                      </button>
                    ))}
                  </div>
                </div>

                {/* Add to Cart Button */}
                <div className={`${isInTelegram ? 'mt-auto pt-2 bg-warm-50/50 border-t border-warm-200 mx-[-0.75rem] px-3 pb-3' : ''}`}>
                  <button
                    onClick={() => addToCart(selectedProduct.id, selectedWeight)}
                    className={`w-full bg-gradient-to-r from-warm-500 to-warm-600 hover:from-warm-600 hover:to-warm-700 text-white font-bold rounded-lg transition-all duration-200 ${isInTelegram ? 'py-3 px-4 text-sm' : 'py-3 px-6 text-base'}`}
                  >
                    {t[language].addToCart} ({selectedWeight}g - ฿{Math.round(selectedProduct.price * (selectedWeight / 100))})
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Mobile Bottom Cart Bar */}
      {!isInTelegram && cart.length > 0 && (
        <div className="fixed bottom-0 left-0 right-0 md:hidden z-40 bg-white border-t border-warm-200 shadow-lg">
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
            className="w-full p-4 flex items-center justify-between hover:bg-warm-50 transition-colors"
          >
            <div className="flex items-center gap-3">
              <div className="relative">
                <span className="text-2xl">🛒</span>
                <span className="absolute -top-2 -right-2 bg-warm-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center font-bold">
                  {getTotalItems()}
                </span>
              </div>
              <div className="text-left">
                <div className="text-gray-900 font-semibold text-sm">
                  {getTotalItems()} {getTotalItems() === 1 ? t[language].item : t[language].items}{getTotalWeight() > 0 ? ` • ${getTotalWeight()}g` : ''}
                </div>
                <div className="text-gray-700 text-xs">
                  {t[language].cart}
                </div>
              </div>
            </div>

            <div className="text-right">
              <div className="text-gray-900 font-bold text-lg">
                ฿{Math.round(getTotalPrice())}
              </div>
              <div className="text-gray-700 text-xs">
                {t[language].total}
              </div>
            </div>
          </button>
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
