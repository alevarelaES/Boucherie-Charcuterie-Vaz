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
  const { data: products, loading, error } = useProducts();
  const { data: homepageData } = useHomepage();

  const handleHover = useCallback((index: number | null) => {
    setHoveredIndex(index);
  }, []);

  // Afficher un loader pendant le chargement
  if (loading) {
    return (
      <section
        id="produits"
        className="py-12 md:py-16 px-4 md:px-8 bg-muted/30 relative overflow-hidden scroll-mt-20 min-h-[400px] flex items-center justify-center"
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
        className="py-12 md:py-16 px-4 md:px-8 bg-muted/30 relative overflow-hidden scroll-mt-20 min-h-[400px] flex items-center justify-center"
      >
        <div className="text-center">
          <p className="text-red-500">{t('error', 'Erreur lors du chargement des produits')}</p>
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
      className="py-12 md:py-16 px-4 md:px-8 bg-muted/30 relative overflow-hidden scroll-mt-20 content-auto"
    >
      {/* Decorative Elements */}
      <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-primary to-transparent opacity-20" />

      <div className="max-w-7xl mx-auto relative z-10">
        <div className="text-center mb-12">
          <span className="inline-block px-4 py-2 bg-gold/10 text-gold rounded-full text-sm md:text-base font-bold tracking-wider uppercase mb-3 font-sans">
            {t('products.badge', 'Notre sélection')}
          </span>
          <h2 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl mb-3 font-bold font-serif">
            {productsData?.title?.[currentLang] || t('products.title', 'Produits phares')}
          </h2>
          <p className="text-lg sm:text-xl md:text-2xl text-foreground/90 max-w-3xl mx-auto font-medium font-sans">
            {productsData?.description?.[currentLang] || t('products.description', 'Découvrez des viandes fraîches et savoureuses, préparées chaque jour pour garantir goût et qualité.')}
          </p>
        </div>

        {/* Carousel Layout */}
        <div className="-mx-4">
          <Carousel
            opts={{
              align: "start",
              loop: true,
              dragFree: true,
            }}
            className="w-full"
          >
            <CarouselContent className="-ml-2 md:-ml-4">
              {products.map((product, index) => (
                <CarouselItem key={product._id} className="pl-2 md:pl-4 basis-[85%] sm:basis-[45%] lg:basis-1/3">
                  <ProductCard
                    product={product}
                    index={index}
                    isHovered={hoveredIndex === index}
                    onHover={handleHover}
                    currentLang={currentLang}
                    getTagLabel={getTagLabel}
                    t={t}
                    rawLang={i18n.language}
                  />
                </CarouselItem>
              ))}
            </CarouselContent>

            <div className="flex justify-center gap-4 mt-12">
              <CarouselPrevious className="static translate-y-0 translate-x-0 bg-primary/10 hover:bg-primary/20 text-primary border-primary/20 hover:border-primary/50 w-12 h-12" />
              <CarouselNext className="static translate-y-0 translate-x-0 bg-primary/10 hover:bg-primary/20 text-primary border-primary/20 hover:border-primary/50 w-12 h-12" />
            </div>
          </Carousel>
        </div>
      </div>
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
  rawLang
}: {
  product: { _id: string; name: { fr: string; de: string }; description: { fr: string; de: string }; tag: string; image: any };
  index: number;
  isHovered: boolean;
  onHover: (index: number | null) => void;
  currentLang: 'fr' | 'de';
  getTagLabel: (tag: string) => string;
  t: any;
  rawLang: string;
}) {
  // Générer l'URL de l'image Sanity
  const imageUrl = product.image ? urlFor(product.image).width(800).height(800).url() : '';

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
      className="h-full"
      onMouseEnter={() => onHover(index)}
      onMouseLeave={() => onHover(null)}
    >
      <div
        className={`bg-card rounded-xl overflow-hidden shadow-xl h-full flex flex-col group transition-transform duration-300 ease-out ${isHovered ? '-translate-y-2 shadow-2xl' : ''
          }`}
      >
        {/* Image */}
        <div className="relative aspect-square overflow-hidden bg-muted">
          <div className="w-full h-full">
            {imageUrl ? (
              <OptimizedImage
                src={imageUrl}
                alt={product.image.alt || productName}
                className="w-full h-full object-cover"
              />
            ) : (
              <div className="w-full h-full bg-muted flex items-center justify-center">
                <span className="text-muted-foreground">Image non disponible</span>
              </div>
            )}
          </div>

          {/* Gradient Overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent pointer-events-none" />

          {/* Tag Badge */}
          {product.tag && (
            <div className="absolute top-3 right-3 z-10">
              <Badge className={`${product.tag === 'premium' ? 'bg-gold hover:bg-gold/90' : 'bg-primary hover:bg-primary/90'} text-white border-0 shadow-xl text-xs md:text-sm font-bold px-2 md:px-3 py-1`}>
                {getTagLabel(product.tag)}
              </Badge>
            </div>
          )}
        </div>

        {/* Content */}
        <div className="p-4 md:p-6 flex flex-col flex-1">
          <h3 className="text-xl md:text-2xl font-['Playfair_Display'] font-bold text-foreground mb-2 md:mb-3">
            {productName}
          </h3>
          <p className="text-sm md:text-base text-muted-foreground flex-1">
            {productDesc}
          </p>
        </div>
      </div>
    </div>
  );
});
