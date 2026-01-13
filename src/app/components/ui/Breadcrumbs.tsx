import { ChevronRight, Home } from 'lucide-react';
import { useNavigate, useParams } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

interface BreadcrumbItem {
    label: string;
    href?: string;
}

interface BreadcrumbsProps {
    items: BreadcrumbItem[];
}

export function Breadcrumbs({ items }: BreadcrumbsProps) {
    const navigate = useNavigate();
    const { lang } = useParams();
    const { t } = useTranslation();

    return (
        <nav className="flex items-center gap-2 text-sm font-sans font-bold text-muted-foreground mb-8 overflow-x-auto whitespace-nowrap pb-2 scrollbar-none">
            <button
                onClick={() => navigate(`/${lang}/`)}
                className="flex items-center gap-1 hover:text-primary transition-colors"
                aria-label={t('nav.home', 'Accueil')}
            >
                <Home className="w-4 h-4" />
            </button>

            {items.map((item, index) => (
                <div key={index} className="flex items-center gap-2">
                    <ChevronRight className="w-4 h-4 text-muted-foreground/40 shrink-0" />
                    {item.href ? (
                        <button
                            onClick={() => navigate(item.href!)}
                            className="hover:text-primary transition-colors"
                        >
                            {item.label}
                        </button>
                    ) : (
                        <span className="text-foreground">{item.label}</span>
                    )}
                </div>
            ))}
        </nav>
    );
}
