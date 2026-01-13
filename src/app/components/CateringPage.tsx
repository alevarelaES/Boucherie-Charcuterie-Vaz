import { motion } from 'motion/react';
import { useTranslation } from 'react-i18next';
import { ChevronLeft, CheckCircle2, Star, Calendar, Quote } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { OptimizedImage } from './OptimizedImage';
import { Footer } from './Footer';

export function CateringPage() {
    const { t } = useTranslation();
    const navigate = useNavigate();

    const services = [
        {
            title: 'Buffets Froids',
            description: 'Une sélection de nos meilleures charcuteries artisanales, salades fraîches et terrines maison.',
            price: 'Dès 25.- / pers.',
            features: ['Planchettes de viande séchée', 'Pâtés croûte maison', 'Salades de saison']
        },
        {
            title: 'Banquet & Mariage',
            description: 'Un service complet pour vos événements les plus importants avec découpe sur place possible.',
            price: 'Sur devis',
            features: ['Viandes nobles au grill', 'Accompagnements variés', 'Service professionnel']
        },
        {
            title: 'Aperitifs de Bureau',
            description: 'Des mini-portions et mignardises salées prêtes à déguster pour vos réunions.',
            price: 'Dès 15.- / pers.',
            features: ['Mini-burgers', 'Verrines gourmandes', 'Canapés assortis']
        }
    ];

    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="min-h-screen bg-background"
        >
            {/* Mini Hero */}
            <div className="relative h-[60vh] w-full overflow-hidden">
                <OptimizedImage
                    src="/images/image_viande_1.jpg"
                    alt="Service Traiteur"
                    className="w-full h-full object-cover scale-110"
                    priority
                />
                <div className="absolute inset-0 bg-black/60 backdrop-blur-[2px]" />
                <div className="absolute inset-0 flex flex-col items-center justify-center text-center px-6">
                    <motion.div
                        initial={{ y: 20, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        transition={{ delay: 0.2 }}
                    >
                        <h1 className="text-5xl md:text-8xl font-serif font-bold text-white mb-6">
                            Service <span className="text-gold italic">Traiteur</span>
                        </h1>
                        <p className="text-white/80 text-lg md:text-2xl max-w-2xl font-sans font-medium">
                            Sublimez vos événements avec l'excellence de la Boucherie Vaz.
                        </p>
                    </motion.div>
                </div>
            </div>

            <main className="max-w-7xl mx-auto px-6 -mt-20 relative z-10 pb-20">
                <div className="bg-white rounded-[3rem] shadow-2xl p-8 md:p-16">
                    <button
                        onClick={() => navigate(-1)}
                        className="flex items-center gap-2 text-primary font-bold hover:gap-4 transition-all mb-12 group"
                    >
                        <ChevronLeft className="w-5 h-5" />
                        Retour
                    </button>

                    {/* Intro Section */}
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 mb-20">
                        <div>
                            <h2 className="text-4xl md:text-5xl font-serif font-bold mb-8 text-foreground">
                                Qualité Bouchère, <br />
                                <span className="text-primary">Service d'Exception</span>
                            </h2>
                            <p className="text-xl leading-relaxed text-muted-foreground font-sans mb-8">
                                Que ce soit pour un anniversaire, un mariage ou un événement d'entreprise, nous mettons notre savoir-faire au service de vos papilles. Chaque événement est unique, c'est pourquoi nous proposons des solutions personnalisées.
                            </p>
                            <div className="flex gap-4">
                                <div className="flex -space-x-2">
                                    <div className="w-12 h-12 rounded-full border-2 border-white bg-gold flex items-center justify-center text-white text-xs font-bold">100+</div>
                                    <div className="w-12 h-12 rounded-full border-2 border-white bg-primary flex items-center justify-center text-white text-xs font-bold">Chef</div>
                                </div>
                                <div className="flex flex-col justify-center">
                                    <div className="flex text-gold">
                                        <Star className="w-4 h-4 fill-current" />
                                        <Star className="w-4 h-4 fill-current" />
                                        <Star className="w-4 h-4 fill-current" />
                                        <Star className="w-4 h-4 fill-current" />
                                        <Star className="w-4 h-4 fill-current" />
                                    </div>
                                    <span className="text-xs font-bold text-muted-foreground tracking-wider uppercase">Événements réussis</span>
                                </div>
                            </div>
                        </div>
                        <div className="bg-muted/30 rounded-3xl p-8 border border-border/50 flex flex-col justify-center">
                            <Quote className="w-12 h-12 text-primary/20 mb-6" />
                            <p className="text-2xl font-serif italic text-foreground leading-relaxed mb-6">
                                "La qualité des viandes et la présentation des buffets ont bluffé tous nos invités. Un service impeccable de A à Z !"
                            </p>
                            <div className="text-sm font-bold uppercase tracking-widest text-primary">
                                — Marie & Jean, Mariage Juillet 2025
                            </div>
                        </div>
                    </div>

                    {/* Services Grid */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        {services.map((service, i) => (
                            <motion.div
                                key={i}
                                initial={{ y: 20, opacity: 0 }}
                                whileInView={{ y: 0, opacity: 1 }}
                                viewport={{ once: true }}
                                transition={{ delay: i * 0.1 }}
                                className="p-8 rounded-3xl border border-border/50 bg-background hover:border-primary/30 hover:shadow-xl transition-all group"
                            >
                                <div className="w-14 h-14 bg-primary/10 rounded-2xl flex items-center justify-center text-primary mb-6 group-hover:bg-primary group-hover:text-white transition-colors">
                                    <CheckCircle2 className="w-7 h-7" />
                                </div>
                                <h3 className="text-2xl font-serif font-bold mb-2">{service.title}</h3>
                                <p className="text-muted-foreground mb-6 font-medium leading-relaxed">{service.description}</p>
                                <div className="text-primary font-bold mb-6">{service.price}</div>
                                <ul className="space-y-3">
                                    {service.features.map((f, j) => (
                                        <li key={j} className="flex items-center gap-2 text-sm font-sans font-bold text-foreground/80">
                                            <div className="w-1.5 h-1.5 bg-gold rounded-full" />
                                            {f}
                                        </li>
                                    ))}
                                </ul>
                            </motion.div>
                        ))}
                    </div>

                    {/* Call to Action */}
                    <div className="mt-20 p-12 bg-primary rounded-[2.5rem] text-center text-white shadow-2xl shadow-primary/20 overflow-hidden relative">
                        <motion.div
                            className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full -mr-32 -mt-32 blur-3xl pointer-events-none"
                            animate={{ scale: [1, 1.2, 1] }}
                            transition={{ duration: 5, repeat: Infinity }}
                        />
                        <h3 className="text-3xl md:text-5xl font-serif font-bold mb-6">Prêt à régaler vos convives ?</h3>
                        <p className="text-white/80 text-xl mb-10 max-w-xl mx-auto">
                            Contactez-nous pour un devis personnalisé adapté à votre budget et vos envies.
                        </p>
                        <button className="px-10 py-5 bg-gold hover:bg-gold/90 text-white rounded-2xl font-bold text-xl transition-all shadow-xl hover:-translate-y-1 flex items-center gap-3 mx-auto">
                            <Calendar className="w-6 h-6" />
                            Réserver une date
                        </button>
                    </div>
                </div>
            </main>
            <Footer />
        </motion.div>
    );
}
