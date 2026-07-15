// ============================================
// FreeDom — Landing Page i18n
// ============================================
import { Auth } from './auth.js';

const translations = {
  en: {
    // Nav & Header
    "How it Works": "How it Works",
    "Categories": "Categories",
    "Pricing": "Pricing",
    "Testimonials": "Testimonials",
    "Log In": "Log In",
    "Get Started Free": "Get Started Free",
    "Cabinet": "Cabinet",

    // Hero
    "The modern freelance marketplace.": "The modern freelance marketplace.",
    "Where top talent meets ambitious projects. Zero barriers, fair commissions, unlimited potential.": "Where top talent meets ambitious projects. Zero barriers, fair commissions, unlimited potential.",
    "Post a Project": "Post a Project",
    "Find Work": "Find Work",
    "Active Freelancers": "Active Freelancers",
    "Paid to Talent": "Paid to Talent",
    "Client Satisfaction": "Client Satisfaction",

    // How It Works
    "How It Works": "How It Works",
    "Simple, transparent, and built for your success.": "Simple, transparent, and built for your success.",
    "1. Create an Account": "1. Create an Account",
    "Sign up as a freelancer, client, or both. It takes less than 2 minutes.": "Sign up as a freelancer, client, or both. It takes less than 2 minutes.",
    "2. Connect & Collaborate": "2. Connect & Collaborate",
    "Find the perfect match for your project or apply to open opportunities.": "Find the perfect match for your project or apply to open opportunities.",
    "3. Get Paid Securely": "3. Get Paid Securely",
    "Fair 5% commission on all transactions. Your money is always safe.": "Fair 5% commission on all transactions. Your money is always safe.",

    // Categories
    "Explore Categories": "Explore Categories",
    "Find experts across every major industry.": "Find experts across every major industry.",
    "Development": "Development",
    "Design": "Design",
    "Marketing": "Marketing",
    "Writing": "Writing",
    "Video & Animation": "Video & Animation",
    "Music & Audio": "Music & Audio",
    "Business": "Business",
    "AI & Machine Learning": "AI & Machine Learning",
    "skills": "skills",

    // Pricing
    "Simple, Fair Pricing": "Simple, Fair Pricing",
    "Choose the plan that fits your ambition.": "Choose the plan that fits your ambition.",
    "Free Mode": "Free Mode",
    "Perfect for getting started": "Perfect for getting started",
    "/month": "/month",
    "5% Platform fee": "5% Platform fee",
    "Basic profile": "Basic profile",
    "Standard support": "Standard support",
    "Get Started": "Get Started",
    "Pro Mode": "Pro Mode",
    "For serious freelancers": "For serious freelancers",
    "Premium profile placement": "Premium profile placement",
    "Zero commission on first $500/mo": "Zero commission on first $500/mo",
    "Priority support": "Priority support",
    "Go Pro": "Go Pro",
    "For growing agencies": "For growing agencies",
    "Unlimited team members": "Unlimited team members",
    "Dedicated account manager": "Dedicated account manager",
    "Advanced analytics": "Advanced analytics",
    "Go Business": "Go Business",

    // Testimonials
    "What Our Users Say": "What Our Users Say",
    "Join thousands of satisfied freelancers and clients.": "Join thousands of satisfied freelancers and clients.",

    // Footer
    "The marketplace of the future.": "The marketplace of the future.",
    "Product": "Product",
    "Features": "Features",
    "Success Stories": "Success Stories",
    "Resources": "Resources",
    "Help Center": "Help Center",
    "Blog": "Blog",
    "Community": "Community",
    "Developer API": "Developer API",
    "Company": "Company",
    "About Us": "About Us",
    "Careers": "Careers",
    "Press": "Press",
    "Contact": "Contact",
    "© 2026 FreeDom. All rights reserved.": "© 2026 FreeDom. All rights reserved.",
    "Privacy": "Privacy",
    "Terms": "Terms",
    "Cookies": "Cookies",

    // Modals
    "Create Your Account": "Create Your Account",
    "Full Name": "Full Name",
    "Email Address": "Email Address",
    "Password": "Password",
    "I want to join as": "I want to join as",
    "Freelancer": "Freelancer",
    "Client": "Client",
    "Both": "Both",
    "Create Account": "Create Account",
    "Already have an account?": "Already have an account?",
    "Welcome Back": "Welcome Back",
    "Log in to your account": "Log in to your account",
    "Don't have an account?": "Don't have an account?",
    "Sign up": "Sign up"
  },
  ru: {
    // Nav & Header
    "How it Works": "Как это работает",
    "Categories": "Категории",
    "Pricing": "Тарифы",
    "Testimonials": "Отзывы",
    "Log In": "Войти",
    "Get Started Free": "Начать бесплатно",
    "Cabinet": "Кабинет",

    // Hero
    "The modern freelance marketplace.": "Современная фриланс-биржа.",
    "Where top talent meets ambitious projects. Zero barriers, fair commissions, unlimited potential.": "Где лучшие таланты встречаются с амбициозными проектами. Никаких барьеров, честные комиссии, безграничный потенциал.",
    "Post a Project": "Создать проект",
    "Find Work": "Найти работу",
    "Active Freelancers": "Активных фрилансеров",
    "Paid to Talent": "Выплачено талантам",
    "Client Satisfaction": "Довольных клиентов",

    // How It Works
    "How It Works": "Как это работает",
    "Simple, transparent, and built for your success.": "Просто, прозрачно и создано для вашего успеха.",
    "1. Create an Account": "1. Создайте аккаунт",
    "Sign up as a freelancer, client, or both. It takes less than 2 minutes.": "Зарегистрируйтесь как фрилансер, клиент или всё сразу. Это займет меньше 2 минут.",
    "2. Connect & Collaborate": "2. Находите и сотрудничайте",
    "Find the perfect match for your project or apply to open opportunities.": "Найдите идеального исполнителя для проекта или откликайтесь на новые возможности.",
    "3. Get Paid Securely": "3. Получайте оплату безопасно",
    "Fair 5% commission on all transactions. Your money is always safe.": "Честная комиссия 5% на все транзакции. Ваши деньги всегда в безопасности.",

    // Categories
    "Explore Categories": "Изучите категории",
    "Find experts across every major industry.": "Найдите экспертов в любой отрасли.",
    "Development": "Разработка",
    "Design": "Дизайн",
    "Marketing": "Маркетинг",
    "Writing": "Копирайтинг",
    "Video & Animation": "Видео и Анимация",
    "Music & Audio": "Музыка и Аудио",
    "Business": "Бизнес",
    "AI & Machine Learning": "ИИ и Машинное обучение",
    "skills": "навыков",

    // Pricing
    "Simple, Fair Pricing": "Простые и честные тарифы",
    "Choose the plan that fits your ambition.": "Выберите план, который подходит вашим амбициям.",
    "Free Mode": "Режим Free",
    "Perfect for getting started": "Идеально для старта",
    "/month": "/мес",
    "5% Platform fee": "Комиссия платформы 5%",
    "Basic profile": "Базовый профиль",
    "Standard support": "Стандартная поддержка",
    "Get Started": "Начать",
    "Pro Mode": "Режим Pro",
    "For serious freelancers": "Для серьезных фрилансеров",
    "Premium profile placement": "Премиум размещение профиля",
    "Zero commission on first $500/mo": "Нулевая комиссия на первые $500/мес",
    "Priority support": "Приоритетная поддержка",
    "Go Pro": "Перейти на Pro",
    "Business": "Бизнес",
    "For growing agencies": "Для растущих агентств",
    "Unlimited team members": "Неограниченное число участников",
    "Dedicated account manager": "Персональный менеджер",
    "Advanced analytics": "Продвинутая аналитика",
    "Go Business": "Перейти на Бизнес",

    // Testimonials
    "What Our Users Say": "Что говорят наши пользователи",
    "Join thousands of satisfied freelancers and clients.": "Присоединяйтесь к тысячам довольных фрилансеров и клиентов.",

    // Footer
    "The marketplace of the future.": "Биржа будущего.",
    "Product": "Продукт",
    "Features": "Функции",
    "Success Stories": "Истории успеха",
    "Resources": "Ресурсы",
    "Help Center": "Центр помощи",
    "Blog": "Блог",
    "Community": "Сообщество",
    "Developer API": "API для разработчиков",
    "Company": "Компания",
    "About Us": "О нас",
    "Careers": "Карьера",
    "Press": "Пресса",
    "Contact": "Контакты",
    "© 2026 FreeDom. All rights reserved.": "© 2026 FreeDom. Все права защищены.",
    "Privacy": "Конфиденциальность",
    "Terms": "Условия",
    "Cookies": "Файлы cookie",

    // Modals
    "Create Your Account": "Создайте аккаунт",
    "Full Name": "Полное имя",
    "Email Address": "Электронная почта",
    "Password": "Пароль",
    "I want to join as": "Я хочу присоединиться как",
    "Freelancer": "Фрилансер",
    "Client": "Клиент",
    "Both": "Оба (Фрилансер и Клиент)",
    "Create Account": "Создать аккаунт",
    "Already have an account?": "Уже есть аккаунт?",
    "Welcome Back": "С возвращением",
    "Log in to your account": "Войдите в свой аккаунт",
    "Don't have an account?": "Нет аккаунта?",
    "Sign up": "Зарегистрироваться",
    "Log in": "Войти",
    "I agree to the ": "Я согласен с ",
    "Terms of Service": "Условиями использования",
    " and ": " и ",
    "Privacy Policy": "Политикой конфиденциальности"
  }
};

const LANGUAGE_KEY = 'freedom_language';

// Helper to replace text exactly while ignoring elements like SVG/images
function translateNode(node, dict) {
  if (node.nodeType === Node.TEXT_NODE) {
    const text = node.textContent.trim();
    if (text && dict[text]) {
      node.textContent = node.textContent.replace(text, dict[text]);
    }
  } else if (node.nodeType === Node.ELEMENT_NODE) {
    // Prevent overriding inputs but translate their placeholders
    if (node.tagName === 'INPUT' || node.tagName === 'TEXTAREA') {
      if (node.placeholder && dict[node.placeholder]) {
        node.placeholder = dict[node.placeholder];
      }
    }
    
    // We only translate specific tags or everything if safe
    // But translating everything might be heavy or break stuff.
    // Instead we check the children.
    const children = Array.from(node.childNodes);
    for (let child of children) {
      // Ignore some elements like script, style
      if (node.tagName !== 'SCRIPT' && node.tagName !== 'STYLE') {
        translateNode(child, dict);
      }
    }
  }
}

// Global dictionary of Original Texts so we can always map EN -> RU and RU -> EN
// Because we replace text in DOM, we lose the original English text if we just replace it.
// Wait, a better approach without data-i18n: store original text in data-i18n attribute on the fly!
function initializeI18n() {
  const elementsWithText = [];
  
  function tagElements(node) {
    if (node.nodeType === Node.TEXT_NODE) {
      const text = node.textContent.trim();
      if (text && translations.en[text]) {
        // We found a text node that matches exactly an English key.
        // Let's mark its parent element, or just save a reference to the text node and its key.
        elementsWithText.push({ node, key: text });
      }
    } else if (node.nodeType === Node.ELEMENT_NODE) {
      if (node.tagName === 'INPUT' || node.tagName === 'TEXTAREA') {
        if (node.placeholder && translations.en[node.placeholder]) {
           elementsWithText.push({ node, key: node.placeholder, isPlaceholder: true });
        }
      }
      
      const children = Array.from(node.childNodes);
      for (let child of children) {
        if (node.tagName !== 'SCRIPT' && node.tagName !== 'STYLE') {
          tagElements(child);
        }
      }
    }
  }

  // To catch partial matches like "3.2k+ skills", we also map keys to their values.
  // Wait, if it's exactly matching, it works. If it's partial, we need another approach.
  // Let's just use exact match for the whole textNode.

  // First pass: find all text nodes in English on page load
  tagElements(document.body);

  // If user is logged in, replace "Get Started Free" with "Cabinet" and hide "Log In"
  if (Auth.isLoggedIn()) {
    const registerBtn = document.getElementById('openRegisterBtn');
    const registerBtnMobile = document.getElementById('openRegisterBtnMobile');
    const loginBtn = document.getElementById('openLoginBtn');
    const loginBtnMobile = document.getElementById('openLoginBtnMobile');

    if (loginBtn) loginBtn.style.display = 'none';
    if (loginBtnMobile) loginBtnMobile.style.display = 'none';

    elementsWithText.forEach(item => {
      if ((item.node.parentNode === registerBtn || item.node.parentNode === registerBtnMobile) && item.key === "Get Started Free") {
        item.key = "Cabinet";
        item.node.textContent = item.node.textContent.replace("Get Started Free", "Cabinet");
      }
    });
  }

  // Expose an apply function
  window.applyLanguage = function(lang) {
    const dict = translations[lang] || translations.en;
    elementsWithText.forEach(item => {
      if (item.isPlaceholder) {
        item.node.placeholder = dict[item.key] || item.key;
      } else {
        // preserve leading/trailing whitespace
        const originalText = item.node.textContent;
        const trimmed = originalText.trim();
        if (trimmed === item.key || (translations.ru[item.key] && trimmed === translations.ru[item.key])) {
           const translated = dict[item.key] || item.key;
           item.node.textContent = originalText.replace(trimmed, translated);
        }
      }
    });

    // Update switcher UI
    document.documentElement.setAttribute('lang', lang);
    const toggleBtn = document.getElementById('langToggleText');
    if (toggleBtn) {
      toggleBtn.textContent = lang.toUpperCase();
    }
    localStorage.setItem(LANGUAGE_KEY, lang);
  }

  // Detect language
  let savedLang = localStorage.getItem(LANGUAGE_KEY);
  if (!savedLang) {
    savedLang = navigator.language.startsWith('ru') ? 'ru' : 'en';
  }
  
  applyLanguage(savedLang);
}

document.addEventListener('DOMContentLoaded', initializeI18n);

export { translations, initializeI18n };
