
import { createContext, useContext, useState, ReactNode } from 'react';

type Language = 'en' | 'ar' | 'fr';

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

const translations = {
  en: {
    // Navigation
    'nav.home': 'Home',
    'nav.network': 'Network',
    'nav.learn': 'Learning',
    'nav.events': 'Events',
    'nav.messages': 'Messages',
    'nav.marketplace': 'Marketplace',
    'nav.profile': 'Profile',
    
    // Dashboard
    'dashboard.welcome': 'Welcome back, Sarah!',
    'dashboard.subtitle': "Here's what's happening with your artisan profile",
    'dashboard.createProfile': 'Create Profile',
    'dashboard.chooseMembership': 'Choose Membership',
    'dashboard.profileViews': 'Profile Views',
    'dashboard.connections': 'Connections',
    'dashboard.bookings': 'Bookings',
    'dashboard.messages': 'Messages',
    'dashboard.recentProjects': 'Recent Projects',
    'dashboard.quickActions': 'Quick Actions',
    'dashboard.recentActivity': 'Recent Activity',
    'dashboard.viewAll': 'View All',
    'dashboard.scheduleWorkshop': 'Schedule Workshop',
    'dashboard.createCourse': 'Create Course',
    'dashboard.findCollaborators': 'Find Collaborators',
    'dashboard.viewAnalytics': 'View Analytics',
    
    // Marketplace
    'marketplace.title': 'Services Marketplace',
    'marketplace.subtitle': 'Discover and book authentic artisan services',
    'marketplace.addNewWork': 'Add New Work',
    'marketplace.listYourSpace': 'List Your Space',
    'marketplace.searchPlaceholder': 'Search for services, artisans, or techniques...',
    'marketplace.filters': 'Filters',
    'marketplace.allServices': 'All Services',
    'marketplace.servicesFound': 'services found',
    'marketplace.noServicesTitle': 'No services found',
    'marketplace.noServicesDesc': 'Try adjusting your search or filter criteria',
    
    // Project statuses
    'status.completed': 'Completed',
    'status.inProgress': 'In Progress',
    'status.available': 'Available',
    'status.busy': 'Busy until next month',
  },
  
  ar: {
    // Navigation - Arabic
    'nav.home': 'الرئيسية',
    'nav.network': 'الشبكة',
    'nav.learn': 'التعلم',
    'nav.events': 'الأحداث',
    'nav.messages': 'الرسائل',
    'nav.marketplace': 'السوق',
    'nav.profile': 'الملف الشخصي',
    
    // Dashboard - Arabic
    'dashboard.welcome': 'أهلاً بك مرة أخرى، سارة!',
    'dashboard.subtitle': 'إليك ما يحدث مع ملفك الشخصي للحرفي',
    'dashboard.createProfile': 'إنشاء ملف شخصي',
    'dashboard.chooseMembership': 'اختيار العضوية',
    'dashboard.profileViews': 'مشاهدات الملف',
    'dashboard.connections': 'الاتصالات',
    'dashboard.bookings': 'الحجوزات',
    'dashboard.messages': 'الرسائل',
    'dashboard.recentProjects': 'المشاريع الأخيرة',
    'dashboard.quickActions': 'الإجراءات السريعة',
    'dashboard.recentActivity': 'النشاط الأخير',
    'dashboard.viewAll': 'عرض الكل',
    'dashboard.scheduleWorkshop': 'جدولة ورشة عمل',
    'dashboard.createCourse': 'إنشاء دورة',
    'dashboard.findCollaborators': 'العثور على متعاونين',
    'dashboard.viewAnalytics': 'عرض التحليلات',
    
    // Marketplace - Arabic
    'marketplace.title': 'سوق الخدمات',
    'marketplace.subtitle': 'اكتشف واحجز خدمات حرفية أصيلة',
    'marketplace.addNewWork': 'إضافة عمل جديد',
    'marketplace.listYourSpace': 'أدرج مساحتك',
    'marketplace.searchPlaceholder': 'البحث عن الخدمات أو الحرفيين أو التقنيات...',
    'marketplace.filters': 'المرشحات',
    'marketplace.allServices': 'جميع الخدمات',
    'marketplace.servicesFound': 'خدمة موجودة',
    'marketplace.noServicesTitle': 'لم يتم العثور على خدمات',
    'marketplace.noServicesDesc': 'حاول تعديل معايير البحث أو المرشح',
    
    // Project statuses - Arabic
    'status.completed': 'مكتمل',
    'status.inProgress': 'قيد التنفيذ',
    'status.available': 'متاح',
    'status.busy': 'مشغول حتى الشهر المقبل',
  },
  
  fr: {
    // Navigation - French
    'nav.home': 'Accueil',
    'nav.network': 'Réseau',
    'nav.learn': 'Apprendre',
    'nav.events': 'Événements',
    'nav.messages': 'Messages',
    'nav.marketplace': 'Marché',
    'nav.profile': 'Profil',
    
    // Dashboard - French
    'dashboard.welcome': 'Bon retour, Sarah!',
    'dashboard.subtitle': "Voici ce qui se passe avec votre profil d'artisan",
    'dashboard.createProfile': 'Créer un profil',
    'dashboard.chooseMembership': "Choisir l'adhésion",
    'dashboard.profileViews': 'Vues du profil',
    'dashboard.connections': 'Connexions',
    'dashboard.bookings': 'Réservations',
    'dashboard.messages': 'Messages',
    'dashboard.recentProjects': 'Projets récents',
    'dashboard.quickActions': 'Actions rapides',
    'dashboard.recentActivity': 'Activité récente',
    'dashboard.viewAll': 'Voir tout',
    'dashboard.scheduleWorkshop': 'Programmer un atelier',
    'dashboard.createCourse': 'Créer un cours',
    'dashboard.findCollaborators': 'Trouver des collaborateurs',
    'dashboard.viewAnalytics': 'Voir les analyses',
    
    // Marketplace - French
    'marketplace.title': 'Marché des services',
    'marketplace.subtitle': 'Découvrez et réservez des services artisanaux authentiques',
    'marketplace.addNewWork': 'Ajouter un nouveau travail',
    'marketplace.listYourSpace': 'Répertoriez votre espace',
    'marketplace.searchPlaceholder': 'Rechercher des services, artisans ou techniques...',
    'marketplace.filters': 'Filtres',
    'marketplace.allServices': 'Tous les services',
    'marketplace.servicesFound': 'services trouvés',
    'marketplace.noServicesTitle': 'Aucun service trouvé',
    'marketplace.noServicesDesc': 'Essayez d\'ajuster vos critères de recherche ou de filtre',
    
    // Project statuses - French
    'status.completed': 'Terminé',
    'status.inProgress': 'En cours',
    'status.available': 'Disponible',
    'status.busy': 'Occupé jusqu\'au mois prochain',
  }
};

export const LanguageProvider = ({ children }: { children: ReactNode }) => {
  const [language, setLanguage] = useState<Language>('en');

  const t = (key: string): string => {
    return translations[language][key as keyof typeof translations['en']] || key;
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      <div className={language === 'ar' ? 'rtl' : 'ltr'} dir={language === 'ar' ? 'rtl' : 'ltr'}>
        {children}
      </div>
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};
