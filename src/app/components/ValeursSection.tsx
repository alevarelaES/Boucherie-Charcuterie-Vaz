import { Heart, Award, Leaf, Users } from 'lucide-react';
import { memo } from 'react';
import { OptimizedImage } from './OptimizedImage';
import { useTranslation } from 'react-i18next';
import settings from '../../settings.json';
import { SectionHeader } from './ui/SectionHeader';
import { Carousel, CarouselContent, CarouselItem, CarouselPrevious, CarouselNext } from './ui/carousel';

/**
 * Values Section - Performance Optimized
 * 
 * Key optimizations:
 * - No Framer Motion (pure CSS animations)
 * - Memoized components
 * - content-visibility for lazy rendering
 * - CSS-only hover effects
 */
export const ValeursSection = memo(function ValeursSection() {
  const { t } = useTranslation();

  const valeurs = [
    {
      icon: Heart,
      title: t('about.valeurs.animal.title', 'Respect de l\'animal'),
      description: t('about.valeurs.animal.desc', 'Élevées dans le respect du bien-être animal et des traditions locales.')
    },
    {
      icon: Award,
      title: t('about.valeurs.quality.title', 'Qualité Premium'),
      description: t('about.valeurs.quality.desc', 'Sélection rigoureuse garantissant traçabilité et excellence.')
    },
    {
      icon: Leaf,
      title: t('about.valeurs.terroir.title', 'Terroir Local'),
      description: t('about.valeurs.terroir.desc', 'Circuits courts et producteurs de notre région.')
    },
    {
      icon: Users,
      title: t('about.valeurs.knowhow.title', 'Savoir-faire'),
      description: t('about.valeurs.knowhow.desc', 'Artisanat transmis de génération en génération.')
    }
  ];

  return (
    <section id="a-propos" className="py-16 md:py-24 px-4 md:px-8 bg-background relative overflow-hidden scroll-mt-20 content-auto">
      <div className="max-w-7xl mx-auto relative z-10">

        <SectionHeader
          badge={t('about.badge', 'Notre histoire')}
          title={t('about.title', 'Valeurs & Terroir')}
        />

        {/* Bloc 1 : Introduction */}
        <div className="bg-primary/5 border-l-4 border-gold rounded-r-2xl p-6 md:p-10 mb-12 max-w-5xl mx-auto shadow-sm animate-fade-in-up">
          <p className="text-xl md:text-2xl text-foreground/90 leading-relaxed text-center font-medium font-sans italic">
            {t('about.intro', "La Boucherie Vaz est née en 2025 avec une idée claire : prêcher avant tout la qualité. Chaque viande que nous proposons est issue d'un savoir-faire artisanal et choisie avec exigence.")}
          </p>
        </div>

        {/* Grid: Image + Notre Promesse */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center mb-16">
          {/* Image */}
          <div className="relative animate-slide-in-left">
            <div className="absolute -inset-4 bg-gold/5 rounded-[2rem] -rotate-2 z-0" />
            <div className="relative z-10 rounded-[2rem] overflow-hidden shadow-2xl border-4 border-white/10 transition-transform duration-500 hover:scale-[1.02]">
              <OptimizedImage
                src={settings.images.about}
                alt={t('about.imageAlt', 'Boucherie Vaz - Notre histoire')}
                className="w-full h-auto object-cover"
                priority
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent" />
            </div>
          </div>

          {/* Notre Promesse + Nos produits */}
          <div className="space-y-8 animate-slide-in-right">
            <div className="bg-muted/50 backdrop-blur-sm rounded-[2rem] p-8 md:p-10 border border-border/50 shadow-sm">
              <h3 className="text-3xl md:text-4xl font-bold mb-6 text-gold font-serif">
                {t('about.promiseTitle', 'Notre Promesse')}
              </h3>
              <p className="text-lg md:text-xl text-foreground/80 leading-relaxed font-sans font-medium">
                {t('about.promiseText', 'Située au cœur de la tradition bouchère, notre boutique est votre nouvelle adresse gourmande à Vallorbe. Nous sélectionnons nos viandes avec le plus grand soin afin de garantir fraîcheur, goût et tendreté.')}
              </p>
            </div>

            <div className="bg-white rounded-[2rem] p-8 md:p-10 border border-border/50 shadow-xl">
              <h3 className="text-2xl md:text-3xl font-bold mb-6 text-primary font-serif">
                {t('about.listTitle', 'Vous trouverez chez nous')}
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {[
                  t('products.items.chicken.name', 'Poulet tendre et savoureux'),
                  t('products.items.heifer.name', 'Génisse maturée raffinée'),
                  t('products.items.lamb.name', 'Agneau aux saveurs délicates'),
                  t('products.items.pork.name', 'Porc de qualité supérieure'),
                  t('products.items.horse.name', 'Viande de cheval riche en goût'),
                  t('products.items.order.name', 'Viandes sur commande')
                ].map((item, idx) => (
                  <div key={idx} className="flex items-center gap-4 text-base md:text-lg text-foreground/80 font-sans font-semibold group">
                    <span className="w-2.5 h-2.5 bg-gold rounded-full flex-shrink-0 transition-transform duration-200 group-hover:scale-125" />
                    <span>{item}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* 4 Values Grid - Desktop */}
        <div className="hidden sm:grid grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
          {valeurs.map((valeur, index) => (
            <ValeurCard
              key={index}
              valeur={valeur}
              index={index}
            />
          ))}
        </div>

        {/* 4 Values Carousel - Mobile */}
        <div className="sm:hidden -mx-4 mb-16">
          <Carousel
            opts={{
              align: "center",
              loop: true,
              dragFree: true,
            }}
            className="w-full"
          >
            <CarouselContent className="-ml-2 md:-ml-4">
              {valeurs.map((valeur, index) => (
                <CarouselItem key={index} className="pl-2 md:pl-4 basis-[85%]">
                  <ValeurCard valeur={valeur} index={index} />
                </CarouselItem>
              ))}
            </CarouselContent>

            <div className="flex justify-center gap-4 mt-8">
              <CarouselPrevious className="static translate-y-0 translate-x-0 bg-gold/10 hover:bg-gold/20 text-gold border-gold/20 hover:border-gold/50" />
              <CarouselNext className="static translate-y-0 translate-x-0 bg-gold/10 hover:bg-gold/20 text-gold border-gold/20 hover:border-gold/50" />
            </div>
          </Carousel>
        </div>

        {/* Bloc 4 : Notre engagement */}
        <div className="bg-primary text-white rounded-[3rem] p-10 md:p-16 max-w-5xl mx-auto shadow-2xl relative overflow-hidden">
          <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 rounded-full -mr-32 -mt-32" />
          <p className="text-xl md:text-3xl text-center font-serif italic leading-relaxed relative z-10">
            {t('about.engagement', "Plus qu'une simple boucherie, nous sommes un lieu de confiance, où l'on vient autant pour la qualité exceptionnelle de nos produits que pour partager notre passion de la viande.")}
          </p>
        </div>
      </div>
    </section>
  );
});

/**
 * Memoized Value Card - Pure CSS hover effects
 */
const ValeurCard = memo(function ValeurCard({
  valeur,
  index
}: {
  valeur: { icon: any; title: string; description: string };
  index: number;
}) {
  const Icon = valeur.icon;

  return (
    <div
      className="h-full"
      style={{ animationDelay: `${index * 0.1}s` }}
    >
      <div className="bg-card hover:bg-muted/50 rounded-[2rem] p-8 border border-border/50 shadow-sm transition-all duration-300 group text-center h-full hover:-translate-y-2 hover:shadow-lg">
        <div className="flex flex-col items-center gap-6">
          <div className="w-16 h-16 bg-gold/10 rounded-2xl flex items-center justify-center transition-all duration-300 rotate-3 group-hover:rotate-0 group-hover:bg-gold">
            <Icon className="w-8 h-8 text-gold transition-colors duration-300 group-hover:text-white" />
          </div>
          <div>
            <h3 className="font-bold text-xl md:text-2xl mb-3 font-serif transition-colors duration-200 group-hover:text-primary">
              {valeur.title}
            </h3>
            <p className="text-base md:text-lg text-muted-foreground leading-relaxed font-sans font-medium">
              {valeur.description}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
});

