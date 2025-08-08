
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
    'nav.settings': 'Settings',
    'nav.logout': 'Log out',
    'nav.signIn': 'Sign In',
    'nav.getStarted': 'Get Started',
    'nav.create': 'Create',
    'nav.searchPlaceholder': 'Search artisans, skills, or services...',
    'nav.searchMobile': 'Search...',
    
    // Authentication
    'auth.welcomeTitle': 'Welcome to Amazigh Nations',
    'auth.login': 'Login',
    'auth.signup': 'Sign Up',
    'auth.email': 'Email',
    'auth.password': 'Password',
    'auth.confirmPassword': 'Confirm Password',
    'auth.firstName': 'First Name',
    'auth.lastName': 'Last Name',
    'auth.emailPlaceholder': 'Enter your email',
    'auth.passwordPlaceholder': 'Enter your password',
    'auth.createPasswordPlaceholder': 'Create password',
    'auth.confirmPasswordPlaceholder': 'Confirm password',
    'auth.firstNamePlaceholder': 'First name',
    'auth.lastNamePlaceholder': 'Last name',
    'auth.loginButton': 'Login',
    'auth.createAccountButton': 'Create Account',
    'auth.forgotPassword': 'Forgot password?',
    'auth.termsAgreement': 'By continuing, you agree to our Terms of Service and Privacy Policy',
    'auth.switchToLogin': 'Already have an account? Sign in',
    'auth.switchToRegister': "Don't have an account? Sign up",
    
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
    
    // Common
    'common.noResults': 'No results found',
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
    'nav.settings': 'الإعدادات',
    'nav.logout': 'تسجيل الخروج',
    'nav.signIn': 'تسجيل الدخول',
    'nav.getStarted': 'ابدأ الآن',
    'nav.create': 'إنشاء',
    'nav.searchPlaceholder': 'البحث عن الحرفيين أو المهارات أو الخدمات...',
    'nav.searchMobile': 'بحث...',
    
    // Authentication - Arabic
    'auth.welcomeTitle': 'أهلاً بك في أمازيغ نيشنز',
    'auth.login': 'تسجيل الدخول',
    'auth.signup': 'إنشاء حساب',
    'auth.email': 'البريد الإلكتروني',
    'auth.password': 'كلمة المرور',
    'auth.confirmPassword': 'تأكيد كلمة المرور',
    'auth.firstName': 'الاسم الأول',
    'auth.lastName': 'اسم العائلة',
    'auth.emailPlaceholder': 'أدخل بريدك الإلكتروني',
    'auth.passwordPlaceholder': 'أدخل كلمة المرور',
    'auth.createPasswordPlaceholder': 'إنشاء كلمة مرور',
    'auth.confirmPasswordPlaceholder': 'تأكيد كلمة المرور',
    'auth.firstNamePlaceholder': 'الاسم الأول',
    'auth.lastNamePlaceholder': 'اسم العائلة',
    'auth.loginButton': 'تسجيل الدخول',
    'auth.createAccountButton': 'إنشاء حساب',
    'auth.forgotPassword': 'نسيت كلمة المرور؟',
    'auth.termsAgreement': 'بالمتابعة، فإنك توافق على شروط الخدمة وسياسة الخصوصية الخاصة بنا',
    'auth.switchToLogin': 'لديك حساب بالفعل؟ سجل دخولك',
    'auth.switchToRegister': 'ليس لديك حساب؟ أنشئ حساباً',
    
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
    
    // Common - Arabic
    'common.noResults': 'لا توجد نتائج',
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
    'nav.settings': 'Paramètres',
    'nav.logout': 'Se déconnecter',
    'nav.signIn': 'Se connecter',
    'nav.getStarted': 'Commencer',
    'nav.create': 'Créer',
    'nav.searchPlaceholder': 'Rechercher des artisans, compétences ou services...',
    'nav.searchMobile': 'Rechercher...',
    
    // Authentication - French
    'auth.welcomeTitle': 'Bienvenue chez Amazigh Nations',
    'auth.login': 'Connexion',
    'auth.signup': 'Inscription',
    'auth.email': 'Email',
    'auth.password': 'Mot de passe',
    'auth.confirmPassword': 'Confirmer le mot de passe',
    'auth.firstName': 'Prénom',
    'auth.lastName': 'Nom de famille',
    'auth.emailPlaceholder': 'Entrez votre email',
    'auth.passwordPlaceholder': 'Entrez votre mot de passe',
    'auth.createPasswordPlaceholder': 'Créer un mot de passe',
    'auth.confirmPasswordPlaceholder': 'Confirmer le mot de passe',
    'auth.firstNamePlaceholder': 'Prénom',
    'auth.lastNamePlaceholder': 'Nom de famille',
    'auth.loginButton': 'Se connecter',
    'auth.createAccountButton': 'Créer un compte',
    'auth.forgotPassword': 'Mot de passe oublié?',
    'auth.termsAgreement': 'En continuant, vous acceptez nos conditions de service et notre politique de confidentialité',
    'auth.switchToLogin': 'Vous avez déjà un compte? Connectez-vous',
    'auth.switchToRegister': "Vous n'avez pas de compte? Inscrivez-vous",
    
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
    
    // Commun - Français
    'common.noResults': 'Aucun résultat',
  }
};

export const LanguageProvider = ({ children }: { children: ReactNode }) => {
  const [language, setLanguage] = useState<Language>('en');

  const handleLanguageChange = (lang: Language) => {
    console.log(`Language changing from ${language} to ${lang}`);
    setLanguage(lang);
    console.log(`Language changed to: ${lang}`);
    console.log(`Interface should now display in: ${lang}`);
  };

  const t = (key: string): string => {
    const translation = translations[language][key as keyof typeof translations['en']];
    if (!translation) {
      console.warn(`Missing translation for key: ${key} in language: ${language}`);
      return key;
    }
    return translation;
  };

  console.log(`Current language context: ${language}`);

  return (
    <LanguageContext.Provider value={{ language, setLanguage: handleLanguageChange, t }}>
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
