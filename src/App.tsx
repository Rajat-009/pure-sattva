import React, { useState, useEffect } from 'react';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { KolhuExtractionSection } from './components/KolhuExtractionSection';
import { ProductCard } from './components/ProductCard';
import { ProductDetailModal } from './components/ProductDetailModal';
import { CartDrawer } from './components/CartDrawer';
import { CheckoutModal } from './components/CheckoutModal';
import { EBillModal } from './components/EBillModal';
import { TrackOrderModal } from './components/TrackOrderModal';
import { AdminPortal } from './components/AdminPortal';
import { KolhuVideoModal } from './components/KolhuVideoModal';
import { StoreInfoSection } from './components/StoreInfoSection';
import { Footer } from './components/Footer';
import { INITIAL_PRODUCTS, STORE_DETAILS } from './data/products';
import { Product, ProductVariant, CartItem, Order, Category } from './types';
import { Search, Sparkles, Filter, Droplet, CheckCircle } from 'lucide-react';

export default function App() {
  const [products, setProducts] = useState<Product[]>(() => {
    const saved = localStorage.getItem('pure_sattva_custom_products');
    return saved ? JSON.parse(saved) : INITIAL_PRODUCTS;
  });

  const [cart, setCart] = useState<CartItem[]>(() => {
    const saved = localStorage.getItem('pure_sattva_cart');
    return saved ? JSON.parse(saved) : [];
  });

  const [selectedCategory, setSelectedCategory] = useState<Category>('All');
  const [searchQuery, setSearchQuery] = useState('');

  // Modals state
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);
  const [deliverySelection, setDeliverySelection] = useState({
    type: 'Local Sirsa Express Delivery',
    fee: 0,
  });
  const [activeOrderForBill, setActiveOrderForBill] = useState<Order | null>(null);
  const [isEBillOpen, setIsEBillOpen] = useState(false);
  const [isTrackOpen, setIsTrackOpen] = useState(false);
  const [trackOrderId, setTrackOrderId] = useState<string>('');
  const [isAdminOpen, setIsAdminOpen] = useState(false);
  const [isKolhuVideoOpen, setIsKolhuVideoOpen] = useState(false);
  const [inspectedProduct, setInspectedProduct] = useState<Product | null>(null);

  // Sync cart to localStorage
  useEffect(() => {
    localStorage.setItem('pure_sattva_cart', JSON.stringify(cart));
  }, [cart]);

  // Cart operations
  const handleAddToCart = (product: Product, variant: ProductVariant, quantity: number) => {
    setCart((prev) => {
      const existingIndex = prev.findIndex(
        (it) => it.productId === product.id && it.size === variant.size
      );

      if (existingIndex > -1) {
        const copy = [...prev];
        copy[existingIndex].quantity += quantity;
        return copy;
      } else {
        const newItem: CartItem = {
          productId: product.id,
          productName: product.name,
          hindiName: product.hindiName,
          size: variant.size,
          price: variant.price,
          mrp: variant.mrp,
          quantity,
          category: product.category,
          imageAccent: product.imageAccent,
        };
        return [...prev, newItem];
      }
    });
  };

  const handleUpdateQuantity = (productId: string, size: string, delta: number) => {
    setCart((prev) =>
      prev
        .map((it) => {
          if (it.productId === productId && it.size === size) {
            const newQty = it.quantity + delta;
            return newQty > 0 ? { ...it, quantity: newQty } : null;
          }
          return it;
        })
        .filter(Boolean) as CartItem[]
    );
  };

  const handleRemoveItem = (productId: string, size: string) => {
    setCart((prev) =>
      prev.filter((it) => !(it.productId === productId && it.size === size))
    );
  };

  // Quick Buy (1-click direct to checkout)
  const handleQuickBuy = (product: Product, variant: ProductVariant) => {
    handleAddToCart(product, variant, 1);
    setDeliverySelection({
      type: 'Local Sirsa Express Delivery',
      fee: variant.price >= 500 ? 0 : 30,
    });
    setIsCheckoutOpen(true);
  };

  // Proceed from drawer to checkout modal
  const handleProceedToCheckout = (type: string, fee: number) => {
    setDeliverySelection({ type, fee });
    setIsCartOpen(false);
    setIsCheckoutOpen(true);
  };

  // Order success handler
  const handleOrderSuccess = (order: Order) => {
    setIsCheckoutOpen(false);
    setCart([]); // Clear cart upon successful order
    setActiveOrderForBill(order);
    setIsEBillOpen(true);
  };

  // Track order trigger
  const handleTrackOrderFromBill = (orderId: string) => {
    setIsEBillOpen(false);
    setTrackOrderId(orderId);
    setIsTrackOpen(true);
  };

  const handleScrollToSection = (sectionId: string) => {
    const el = document.getElementById(sectionId);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  // Stock update from admin
  const handleUpdateProductStock = (productId: string, inStock: boolean) => {
    const updated = products.map((p) => {
      if (p.id === productId) {
        return {
          ...p,
          variants: p.variants.map((v) => ({ ...v, inStock })),
        };
      }
      return p;
    });
    setProducts(updated);
    localStorage.setItem('pure_sattva_custom_products', JSON.stringify(updated));
  };

  // Filter products
  const categories: Category[] = [
    'All',
    'Wood-Pressed Oils',
    'Desi Ghee & Honey',
    'Organic Grains & Flours',
    'Natural Sweeteners',
    'Hand-Ground Spices',
    'Healthy Snacks',
  ];

  const filteredProducts = products.filter((p) => {
    const matchesCategory =
      selectedCategory === 'All' || p.category === selectedCategory;
    const matchesSearch =
      searchQuery === '' ||
      p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (p.hindiName && p.hindiName.includes(searchQuery)) ||
      p.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.tags.some((t) => t.toLowerCase().includes(searchQuery.toLowerCase()));

    return matchesCategory && matchesSearch;
  });

  const cartCount = cart.reduce((acc, it) => acc + it.quantity, 0);

  return (
    <div className="min-h-screen bg-[#FAF8F5] text-[#2C1810] flex flex-col">
      {/* 1. Header / Navbar conforming strictly to top bar contract */}
      <Navbar
        cartCount={cartCount}
        onOpenCart={() => setIsCartOpen(true)}
        onOpenTrack={() => {
          setTrackOrderId('');
          setIsTrackOpen(true);
        }}
        onOpenAdmin={() => setIsAdminOpen(true)}
        onScrollToSection={handleScrollToSection}
      />

      {/* 2. Hero Section in White & Brown Theme */}
      <Hero
        onExploreClick={() => handleScrollToSection('catalog')}
        onWatchVideoClick={() => setIsKolhuVideoOpen(true)}
      />

      {/* 3. Kolhu (Kachi Ghani) Video Demonstration & Craftsmanship Section */}
      <KolhuExtractionSection
        onOpenVideoModal={() => setIsKolhuVideoOpen(true)}
      />

      {/* 4. Product Catalog Section */}
      <section id="catalog" className="py-16 max-w-6xl mx-auto px-4 sm:px-6 w-full">
        {/* Section Heading */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-8">
          <div>
            <div className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#8B5A2B] uppercase tracking-wider mb-1">
              <Sparkles className="w-3.5 h-3.5 text-[#C4823F]" />
              <span>Sirsa Store Catalog · Cash on Delivery</span>
            </div>
            <h2 className="font-display text-2xl sm:text-4xl font-bold tracking-tight text-[#3B2212]">
              Traditional Wood-Pressed Staples
            </h2>
            <p className="text-xs sm:text-sm text-[#6B5342] mt-1 max-w-xl">
              Freshly extracted on Lakdi Ghani. Select your required quantity and pay conveniently in cash when the delivery arrives at your door.
            </p>
          </div>

          {/* Search Input */}
          <div className="relative w-full md:w-72">
            <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              placeholder="Search mustard, ghee, haldi..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full text-xs font-medium bg-white border border-[#D9C9B8] rounded-xl py-2.5 pl-9 pr-3 focus:outline-none focus:ring-1 focus:ring-[#8B5A2B] shadow-2xs"
            />
          </div>
        </div>

        {/* Interactive Filter Tabs (Segmented Controls) */}
        <div className="flex items-center gap-1.5 overflow-x-auto pb-3 mb-8 scrollbar-none">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-3.5 py-2 text-xs font-semibold rounded-xl whitespace-nowrap transition-all cursor-pointer ${
                selectedCategory === cat
                  ? 'bg-[#3B2212] text-white shadow-sm'
                  : 'bg-[#F2ECE3] text-[#5C4535] hover:bg-[#E8DCCF] border border-transparent'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Product Cards Grid: 3-column on desktop as per ecommerce rules */}
        {filteredProducts.length === 0 ? (
          <div className="py-16 text-center bg-white rounded-2xl border border-[#EAE0D5] p-8 space-y-3">
            <Droplet className="w-10 h-10 text-[#C4A482] mx-auto" />
            <h3 className="font-display text-base font-bold text-[#3B2212]">
              No products found matching "{searchQuery}"
            </h3>
            <p className="text-xs text-[#7A6150]">
              Try searching for "mustard", "groundnut", "ghee", or reset the category filter.
            </p>
            <button
              onClick={() => {
                setSelectedCategory('All');
                setSearchQuery('');
              }}
              className="px-4 py-2 text-xs font-semibold text-white bg-[#3B2212] rounded-lg cursor-pointer"
            >
              Reset Filters
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            {filteredProducts.map((product) => (
              <ProductCard
                key={product.id}
                product={product}
                onAddToCart={handleAddToCart}
                onQuickBuy={handleQuickBuy}
                onViewDetails={(p) => setInspectedProduct(p)}
              />
            ))}
          </div>
        )}
      </section>

      {/* 5. Physical Store in Sirsa, Haryana & Testimonials */}
      <StoreInfoSection />

      {/* 6. Footer */}
      <Footer
        onOpenAdmin={() => setIsAdminOpen(true)}
        onOpenTrack={() => {
          setTrackOrderId('');
          setIsTrackOpen(true);
        }}
        onScrollToSection={handleScrollToSection}
      />

      {/* Slide-over Cart Drawer */}
      <CartDrawer
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        items={cart}
        onUpdateQuantity={handleUpdateQuantity}
        onRemoveItem={handleRemoveItem}
        onProceedToCheckout={handleProceedToCheckout}
      />

      {/* Cash on Delivery Checkout Modal */}
      <CheckoutModal
        isOpen={isCheckoutOpen}
        onClose={() => setIsCheckoutOpen(false)}
        items={cart}
        deliveryType={deliverySelection.type}
        deliveryFee={deliverySelection.fee}
        onOrderSuccess={handleOrderSuccess}
      />

      {/* Official E-Bill Invoice Modal */}
      <EBillModal
        isOpen={isEBillOpen}
        onClose={() => setIsEBillOpen(false)}
        order={activeOrderForBill}
        onTrackOrder={handleTrackOrderFromBill}
      />

      {/* Customer Track Order Modal */}
      <TrackOrderModal
        isOpen={isTrackOpen}
        onClose={() => setIsTrackOpen(false)}
        initialOrderId={trackOrderId}
        onViewBill={(order) => {
          setIsTrackOpen(false);
          setActiveOrderForBill(order);
          setIsEBillOpen(true);
        }}
      />

      {/* Traditional Kolhu Video Demonstration Reel Modal */}
      <KolhuVideoModal
        isOpen={isKolhuVideoOpen}
        onClose={() => setIsKolhuVideoOpen(false)}
      />

      {/* Product Detail Modal */}
      <ProductDetailModal
        product={inspectedProduct}
        isOpen={!!inspectedProduct}
        onClose={() => setInspectedProduct(null)}
        onAddToCart={handleAddToCart}
        onQuickBuy={handleQuickBuy}
      />

      {/* Store Owner Admin Portal */}
      <AdminPortal
        isOpen={isAdminOpen}
        onClose={() => setIsAdminOpen(false)}
        products={products}
        onUpdateProductStock={handleUpdateProductStock}
        onViewBill={(order) => {
          setActiveOrderForBill(order);
          setIsEBillOpen(true);
        }}
      />
    </div>
  );
}
