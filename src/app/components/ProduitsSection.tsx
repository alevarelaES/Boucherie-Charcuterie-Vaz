import { Badge } from './ui/badge';
import { useState, useRef } from 'react';
import { motion } from 'motion/react';
import { OptimizedImage } from './OptimizedImage';
import { useTranslation } from 'react-i18next';
import settings from '../../settings.json';
import { Carousel, CarouselContent, CarouselItem, CarouselPrevious, CarouselNext } from './ui/carousel';

export function ProduitsSection() {
  const { t } = useTranslation();
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  const containerRef = useRef<HTMLElement>(null);
  const isMobile = typeof window !== 'undefined' && window.innerWidth < 1024;

  const produits = [
    {
      id: 'chicken',
      name: t('products.items.chicken.name', 'Entrecôte Maturée'),
      description: t('products.items.chicken.desc', "Maturé trois semaines sur l'os."),
      tag: t('products.tags.premium', 'Premium'),
      image: settings.products.find(p => p.id === 'chicken')?.image || ''
    },
    {
      id: 'heifer',
      name: t('products.items.heifer.name', 'Fondue Chinoise'),
      description: t('products.items.heifer.desc', 'Fondue chinoise de bœuf.'),
      tag: t('products.tags.specialty', 'Spécialité'),
      image: settings.products.find(p => p.id === 'heifer')?.image || ''
    },
    {
      id: 'horse',
      name: t('products.items.horse.name', 'Terrine du Chef'),
      description: t('products.items.horse.desc', 'Une création artisanale savoureuse.'),
      tag: t('products.tags.premium', 'Premium'),
      image: settings.products.find(p => p.id === 'horse')?.image || ''
    },
    {
      id: 'lamb',
      name: t('products.items.lamb.name', 'Lard de Jambon'),
      description: t('products.items.lamb.desc', 'Notre lard de jambon sélectionné.'),
      tag: t('products.tags.specialty', 'Spécialité'),
      image: settings.products.find(p => p.id === 'lamb')?.image || ''
    },
    {
      id: 'order',
      name: t('products.items.order.name', 'Terrine au Pruneaux'),
      description: t('products.items.order.desc', 'Fabrication maison.'),
      tag: t('products.tags.premium', 'Premium'),
      image: settings.products.find(p => p.id === 'order')?.image || ''
    },
    {
      id: 'pork',
      name: t('products.items.pork.name', 'Plat Charcuterie'),
      description: t('products.items.pork.desc', 'Pour votre apéro.'),
      tag: t('products.tags.homemade', 'Fait Maison'),
      image: settings.products.find(p => p.id === 'pork')?.image || ''
    }
  ];

  return (
    <section
      id="produits"
      ref={containerRef}
      className="py-12 md:py-16 px-4 md:px-8 bg-muted/30 relative overflow-hidden scroll-mt-20"
    >
      {/* Decorative Elements */}
      <div className="absolute top-0 left-0 w-full h-1 bg-linear-to-r from-transparent via-primary to-transparent opacity-20" />

      <div className="max-w-7xl mx-auto relative z-10">
        <div className="text-center mb-12">
          <span className="inline-block px-4 py-2 bg-gold/10 text-gold rounded-full text-sm md:text-base font-bold tracking-wider uppercase mb-3 font-sans">
            {t('products.badge', 'Notre sélection')}
          </span>
          <h2 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl mb-3 font-bold font-serif">
            {t('products.title', 'Produits phares')}
          </h2>
          <p className="text-lg sm:text-xl md:text-2xl text-foreground/90 max-w-3xl mx-auto font-medium font-sans">
            {t('products.description', 'Découvrez des viandes fraîches et savoureuses, préparées chaque jour pour garantir goût et qualité.')}
          </p>
        </div>

        {/* Carousel Layout for all screen sizes */}
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
              {produits.map((produit, index) => (
                <CarouselItem key={index} className="pl-2 md:pl-4 basis-[85%] sm:basis-[45%] lg:basis-1/3">
                  <ProductCard
                    produit={produit}
                    index={index}
                    isMobile={isMobile}
                    hoveredIndex={hoveredIndex}
                    setHoveredIndex={setHoveredIndex}
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
    </section >
  );
}

function ProductCard({
  produit,
  index,
  isMobile,
  hoveredIndex,
  setHoveredIndex
}: {
  produit: any;
  index: number;
  isMobile: boolean;
  hoveredIndex?: number | null;
  setHoveredIndex?: (idx: number | null) => void;
}) {
  const { t } = useTranslation();

  return (
    <div
      className="h-full"
      onMouseEnter={() => !isMobile && setHoveredIndex?.(index)}
      onMouseLeave={() => !isMobile && setHoveredIndex?.(null)}
    >
      <div
        className={`bg-card rounded-xl overflow-hidden shadow-xl h-full flex flex-col group transition-transform duration-300 ease-out ${!isMobile && hoveredIndex === index ? '-translate-y-2' : ''
          }`}
        style={{ willChange: 'transform' }}
      >
        {/* Image */}
        <div className="relative aspect-square overflow-hidden bg-muted">
          <div
            className={`w-full h-full transition-transform duration-700 ease-out ${!isMobile && hoveredIndex === index ? 'scale-110' : 'scale-100'
              }`}
            style={{ willChange: 'transform' }}
          >
            <OptimizedImage
              src={produit.image}
              alt={produit.name}
              className="w-full h-full object-cover"
            />
          </div>

          {/* Gradient Overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent pointer-events-none" />

          {/* Tag Badge */}
          <div className="absolute top-3 right-3 z-10">
            <Badge className={`${produit.tag === t('products.tags.premium', 'Premium') ? 'bg-gold hover:bg-gold/90' : 'bg-primary hover:bg-primary/90'} text-white border-0 shadow-xl text-xs md:text-sm font-bold px-2 md:px-3 py-1`}>
              {produit.tag}
            </Badge>
          </div>
        </div>

        {/* Content */}
        <div className="p-4 md:p-5 flex-grow flex flex-col">
          <h3
            className="text-lg sm:text-xl md:text-2xl lg:text-3xl mb-2 font-bold group-hover:text-primary transition-colors font-serif line-clamp-2"
          >
            {produit.name}
          </h3>

          <p className="text-sm md:text-base lg:text-lg text-muted-foreground font-medium font-sans line-clamp-3">
            {produit.description}
          </p>
        </div>
      </div>
    </div>
  );
}
