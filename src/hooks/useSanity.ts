import { useSanityData } from './useSanityData';

// Types pour les données Sanity
export interface SanityImage {
    asset: {
        _ref: string;
        _type: string;
    };
    alt?: string;
}

export interface MultilingualText {
    fr: string;
    de: string;
}

export interface Product {
    _id: string;
    name: MultilingualText;
    description: MultilingualText;
    image: SanityImage;
    tag: 'premium' | 'specialty' | 'homemade' | 'new';
    price?: number;
    availability: 'in_stock' | 'on_order' | 'out_of_stock';
    order: number;
}

export interface Hero {
    _id: string;
    titleMain: MultilingualText;
    titleHighlight: MultilingualText;
    description: MultilingualText;
    highlightedCity: string;
    backgroundImage: SanityImage;
    cta1: {
        text: MultilingualText;
        link: string;
    };
    cta2: {
        text: MultilingualText;
        link: string;
    };
    scrollText: MultilingualText;
}

export interface SiteSettings {
    _id: string;
    logo: SanityImage;
    siteName: MultilingualText;
    contact: {
        phone: string;
        email: string;
        address: {
            street: string;
            city: string;
            postalCode: string;
            country: string;
        };
    };
    socialMedia: {
        facebook?: string;
        instagram?: string;
        twitter?: string;
        linkedin?: string;
    };
    footer: {
        text: MultilingualText;
        copyright: string;
    };
}

// Hook pour récupérer les produits
export function useProducts() {
    const query = `*[_type == "product"] | order(order asc) {
    _id,
    name,
    description,
    image,
    tag,
    price,
    availability,
    order
  }`;

    return useSanityData<Product[]>(query);
}

// Hook pour récupérer la section Hero
export function useHero() {
    const query = `*[_type == "hero"][0] {
    _id,
    titleMain,
    titleHighlight,
    description,
    highlightedCity,
    backgroundImage,
    cta1,
    cta2,
    scrollText
  }`;

    return useSanityData<Hero>(query);
}

// Hook pour récupérer les paramètres du site
export function useSiteSettings() {
    const query = `*[_type == "siteSettings"][0] {
    _id,
    logo,
    siteName,
    contact,
    socialMedia,
    footer
  }`;

    return useSanityData<SiteSettings>(query);
}

// Hook pour récupérer les services (Traiteur)
export interface Service {
    _id: string;
    name: MultilingualText;
    shortDescription: MultilingualText;
    price: MultilingualText;
    features: {
        fr: string[];
        de: string[];
    };
    order: number;
}

export function useServices() {
    const query = `*[_type == "service"] | order(order asc) {
    _id,
    name,
    shortDescription,
    price,
    features,
    order
  }`;

    return useSanityData<Service[]>(query);
}

// Hook pour récupérer le contenu de la page d'accueil
export interface HomepageContent {
    _id: string;
    valuesSection: {
        badge: MultilingualText;
        title: MultilingualText;
        intro: MultilingualText;
        image: SanityImage;
        promiseTitle: MultilingualText;
        promiseText: MultilingualText;
        valuesList: {
            fr: string[];
            de: string[];
        };
        engagementText: MultilingualText;
    };
    productsSection: {
        title: MultilingualText;
        description: MultilingualText;
    };
    contactSection: {
        subtitle: MultilingualText;
        title: MultilingualText;
    };
}

export function useHomepage() {
    const query = `*[_type == "homepage"][0] {
    _id,
    valuesSection,
    productsSection,
    contactSection
  }`;

    return useSanityData<HomepageContent>(query);
}

// Hook pour récupérer les horaires d'ouverture
export interface OpeningHours {
    _id: string;
    monday: DaySchedule;
    tuesday: DaySchedule;
    wednesday: DaySchedule;
    thursday: DaySchedule;
    friday: DaySchedule;
    saturday: DaySchedule;
    sunday: DaySchedule;
    specialMessage: MultilingualText;
}

export interface DaySchedule {
    closed: boolean;
    morning?: string;
    afternoon?: string;
}

export function useOpeningHours() {
    const query = `*[_type == "openingHours"][0] {
    _id,
    monday,
    tuesday,
    wednesday,
    thursday,
    friday,
    saturday,
    sunday,
    specialMessage
  }`;

    return useSanityData<OpeningHours>(query);
}

