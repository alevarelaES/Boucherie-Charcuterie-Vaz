import { Badge } from './ui/badge';
import { useState, memo, useCallback } from 'react';
import { OptimizedImage } from './OptimizedImage';
import { useTranslation } from 'react-i18next';
import { Carousel, CarouselContent, CarouselItem, CarouselPrevious, CarouselNext } from './ui/carousel';
import { useProducts, useHomepage } from '../../hooks/useSanity';
import { urlFor } from '../../lib/sanity/image';

/**
 * Products Section - Performance Optimized + Sanity CMS
 * 
 * Key optimizations:
 * - No Framer Motion (pure CSS transitions)
 * - Memoized ProductCard to prevent re-renders
 * - content-visibility for lazy rendering
 * - CSS-only hover effects
 * - Dynamic data from Sanity CMS
 */
export const ProduitsSection = memo(function ProduitsSection() {
  const { t, i18n } = useTranslation();
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const [selectedProduct, setSelectedProduct] = useState<{ name: string; image: any } | null>(null);
  const { data: products, loading, error } = useProducts();
  const { data: homepageData } = useHomepage();

  const handleHover = useCallback((index: number | null) => {
    setHoveredIndex(index);
  }, []);

  const handleCardClick = useCallback((product: any, productName: string) => {
    // Disable modal on mobile and tablets (less than 1024px)
    if (window.innerWidth < 1024) return;
    setSelectedProduct({ name: productName, image: product.image });
  }, []);

  // Afficher un loader pendant le chargement
  if (loading) {
    return (
      <section
        id="produits"
        className="py-24 md:py-32 px-4 md:px-8 bg-background relative overflow-hidden scroll-mt-20 min-h-[600px] flex items-center justify-center"
      >
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gold mx-auto mb-4"></div>
          <p className="text-muted-foreground">{t('loading', 'Chargement...')}</p>
        </div>
      </section>
    );
  }

  // Afficher une erreur en cas de problème
  if (error || !products) {
    return (
      <section
        id="produits"
        className="py-24 md:py-32 px-4 md:px-8 bg-background relative overflow-hidden scroll-mt-20 min-h-[600px] flex items-center justify-center"
      >
        <div className="text-center">
          <p className="text-destructive">{t('error', 'Erreur lors du chargement des produits')}</p>
        </div>
      </section>
    );
  }

  const currentLang = (i18n.language as 'fr' | 'de') || 'fr';
  const productsData = homepageData?.productsSection;

  // Mapper les tags pour l'affichage traduit
  const getTagLabel = (tag: string) => {
    const tagMap: Record<string, string> = {
      premium: t('products.tags.premium', 'Premium'),
      specialty: t('products.tags.specialty', 'Spécialité'),
      homemade: t('products.tags.homemade', 'Fait Maison'),
      new: t('products.tags.new', 'Nouveauté'),
    };
    return tagMap[tag] || tag;
  };

  return (
    <section
      id="produits"
      className="py-24 md:py-32 px-4 md:px-8 bg-background relative overflow-hidden scroll-mt-20"
    >
      {/* Decorative Background */}
      <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-gold/30 to-transparent" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,_var(--tw-gradient-stops))] from-gold/5 via-transparent to-transparent opacity-50" />

      <div className="max-w-[1400px] mx-auto relative z-10">
        <div className="text-center mb-16 md:mb-24">
          <span className="inline-block px-4 py-1.5 border border-gold/30 text-gold rounded-full text-xs md:text-sm font-bold tracking-[0.2em] uppercase mb-6 bg-gold/5 backdrop-blur-sm">
            {t('products.badge', 'Notre sélection')}
          </span>
          <h2 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl mb-6 font-bold font-serif text-foreground">
            {productsData?.title?.[currentLang] || t('products.title', 'Produits phares')}
          </h2>
          <p className="text-lg sm:text-xl md:text-2xl text-muted-foreground max-w-2xl mx-auto font-light leading-relaxed">
            {productsData?.description?.[currentLang] || t('products.description', 'Découvrez des viandes fraîches et savoureuses, préparées chaque jour pour garantir goût et qualité.')}
          </p>
        </div>

        {/* Carousel Layout */}
        <div className="-mx-4 md:-mx-8">
          <Carousel
            opts={{
              align: "start",
              loop: true,
              dragFree: true,
            }}
            className="w-full"
          >
            <CarouselContent className="-ml-3 md:-ml-6 items-stretch">
              {products.map((product, index) => (
                <CarouselItem key={product._id} className="pl-3 md:pl-6 basis-[85%] md:basis-[45%] lg:basis-[32%]">
                  <ProductCard
                    product={product}
                    index={index}
                    isHovered={hoveredIndex === index}
                    onHover={handleHover}
                    currentLang={currentLang}
                    getTagLabel={getTagLabel}
                    t={t}
                    rawLang={i18n.language}
                    onClick={handleCardClick}
                  />
                </CarouselItem>
              ))}
            </CarouselContent>

            <div className="flex justify-center gap-6 mt-16">
              <CarouselPrevious className="static translate-y-0 translate-x-0 bg-transparent hover:bg-gold/10 text-gold border-gold/30 hover:border-gold w-14 h-14 rounded-full transition-all duration-300" />
              <CarouselNext className="static translate-y-0 translate-x-0 bg-transparent hover:bg-gold/10 text-gold border-gold/30 hover:border-gold w-14 h-14 rounded-full transition-all duration-300" />
            </div>
          </Carousel>
        </div>
      </div>

      {/* Image Preview Modal - Simple White Card */}
      {selectedProduct && (
        <div
          className="fixed inset-0 z-[100] flex items-center justify-center p-4 animate-in fade-in duration-200"
          onClick={() => setSelectedProduct(null)}
        >
          {/* Simple dark overlay */}
          <div className="absolute inset-0 bg-black/40 backdrop-blur-sm" />

          <div
            className="relative bg-white rounded-2xl shadow-2xl max-w-3xl w-full overflow-hidden flex flex-col md:flex-row animate-in zoom-in-95 duration-200"
            onClick={(e) => e.stopPropagation()}
            style={{ maxHeight: '600px' }}
          >
            {/* Close Button */}
            <button
              onClick={() => setSelectedProduct(null)}
              className="absolute top-4 right-4 z-10 p-2 bg-white/80 hover:bg-white rounded-full text-black/60 hover:text-black transition-colors"
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 6 6 18" /><path d="m6 6 12 12" /></svg>
            </button>

            {/* Image Section */}
            <div className="w-full md:w-1/2 bg-muted relative h-[300px] md:h-auto">
              {selectedProduct.image && (
                <OptimizedImage
                  src={urlFor(selectedProduct.image).width(800).url()}
                  alt={selectedProduct.name}
                  className="w-full h-full object-cover"
                />
              )}
            </div>

            {/* Content Section */}
            <div className="w-full md:w-1/2 p-8 flex flex-col justify-center bg-white text-left">
              <h4 className="text-2xl font-serif font-bold text-gray-900 mb-2">
                {selectedProduct.name}
              </h4>
              <div className="w-12 h-1 bg-primary mb-4" />
              <p className="text-gray-600 leading-relaxed">
                {t('products.modal_desc', 'Retrouvez ce produit frais et préparé maison dans notre boucherie.')}
              </p>
            </div>
          </div>
        </div>
      )}
    </section>
  );
});

// Map product index to i18n translation key for EN/IT fallback
const productKeyMapping = ['entrecote', 'fondue', 'terrine', 'lard', 'terrine_pruneaux', 'charcuterie'];

/**
 * Memoized Product Card - Only re-renders when props change
 * Supports FR/DE from Sanity, EN/IT from i18n translations
 */
const ProductCard = memo(function ProductCard({
  product,
  index,
  isHovered,
  onHover,
  currentLang,
  getTagLabel,
  t,
  rawLang,
  onClick
}: {
  product: { _id: string; name: { fr: string; de: string }; description: { fr: string; de: string }; tag: string; image: any };
  index: number;
  isHovered: boolean;
  onHover: (index: number | null) => void;
  currentLang: 'fr' | 'de';
  getTagLabel: (tag: string) => string;
  t: any;
  rawLang: string;
  onClick: (product: any, productName: string) => void;
}) {
  // Générer l'URL de l'image Sanity
  const imageUrl = product.image ? urlFor(product.image).width(800).height(1000).url() : '';

  // For EN/IT, use i18n translations. For FR/DE, use Sanity data.
  const isSanityLang = rawLang === 'fr' || rawLang === 'de';
  const productKey = productKeyMapping[index] || 'chicken';

  const productName = isSanityLang
    ? product.name[currentLang]
    : t(`products.items.${productKey}.name`, product.name['fr']);

  const productDesc = isSanityLang
    ? product.description[currentLang]
    : t(`products.items.${productKey}.desc`, product.description['fr']);

  return (
    <div
      className="h-full aspect-[3/4] md:aspect-[4/5] w-full relative group cursor-pointer"
      onMouseEnter={() => onHover(index)}
      onMouseLeave={() => onHover(null)}
      onClick={() => onClick(product, productName)}
    >
      <div className="absolute inset-0 rounded-2xl overflow-hidden bg-muted transition-all duration-500 ease-out shadow-lg shadow-black/20 group-hover:shadow-2xl group-hover:shadow-black/30 border border-transparent group-hover:scale-[1.02] transform origin-center will-change-transform">

        {/* Background Image - Absolute Cover */}
        <div className="absolute inset-0 w-full h-full bg-black">
          {imageUrl ? (
            <OptimizedImage
              src={imageUrl}
              alt={product.image.alt || productName}
              className="w-full h-full object-cover opacity-90 transition-opacity duration-700 ease-out"
            />
          ) : (
            <div className="w-full h-full bg-muted flex items-center justify-center">
              <span className="text-muted-foreground">Image non disponible</span>
            </div>
          )}
        </div>

        {/* Inner Glow Effect - Gold inset shadow on hover */}
        <div className="absolute inset-0 transition-all duration-500 ease-out shadow-[inset_0_0_0_0_transparent] group-hover:shadow-[inset_0_0_0_1px_rgba(197,160,89,0.4),inset_0_0_60px_rgba(197,160,89,0.15)] z-20 pointer-events-none rounded-2xl" />

        {/* Stronger Gradient Overlay - Bottom focus for readability */}
        <div className="absolute bottom-0 left-0 w-full h-[60%] bg-gradient-to-t from-black via-black/80 to-transparent opacity-95 transition-opacity duration-300" />

        {/* Content Container */}
        <div className="absolute inset-0 p-6 md:p-8 pb-4 md:pb-6 flex flex-col justify-end">

          {/* Tag Badge */}
          {product.tag && (
            <div className="absolute top-4 right-4 z-10">
              <Badge className={`
                ${product.tag === 'premium' ? 'bg-gold text-black' : 'bg-primary text-white border-0'} 
                shadow-lg text-[10px] md:text-xs font-bold px-3 py-1 uppercase tracking-wider
              `}>
                {getTagLabel(product.tag)}
              </Badge>
            </div>
          )}

          {/* Text Content */}
          <div className="transition-transform duration-500 ease-out">
            <h3 className="text-xl md:text-2xl font-serif font-bold text-white mb-3 leading-tight drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)] tracking-wide group-hover:text-gold transition-colors duration-300">
              {productName}
            </h3>

            <div className="w-16 h-0.5 bg-gold mb-3 opacity-80 group-hover:opacity-100 transition-all duration-500 delay-100 shadow-[0_0_10px_rgba(197,160,89,0.5)]" />

            <p className="text-white/95 text-base md:text-lg leading-relaxed line-clamp-3 group-hover:line-clamp-none transition-all duration-500 drop-shadow-[0_1px_2px_rgba(0,0,0,0.8)] font-medium tracking-tight">
              {productDesc}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
});
