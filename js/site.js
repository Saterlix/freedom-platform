const SITE_LANG_KEY = 'freedom_lang_v2';
const THEME_KEY = 'freedom_theme_v1';
const supported = ['en', 'ru', 'uz'];

const dict = {
  en: {},
  ru: {
    nav_how: 'Как это работает', nav_features: 'Возможности', nav_business: 'Для Бизнеса', open_platform: 'Открыть платформу',
    hero_badge: 'Фриланс Корпоративного Уровня', hero_title: 'Создавайте Будущее Вашего Бизнеса. Быстро.',
    hero_text: 'Работайте с 1% лучших IT специалистов. Безопасные сделки, AI-инструменты и магазин готовых SaaS модулей.',
    start_work: 'Начать разработку', see_flow: 'Изучить процесс', stat_escrow: 'Безопасность', stat_ai: 'Честная комиссия', stat_verified: 'Поддержка',
    one_product: 'Рабочий Процесс', how_title: 'Создано для Роста. Построено для Скорости.',
    client_card_title: 'Безопасные Сделки (Escrow)', client_card_text: 'Средства заморожены до полного утверждения результата. Ноль рисков, 100% гарантия.',
    freelancer_card_title: 'AI Ускорение', freelancer_card_text: 'Наши AI инструменты генерируют ТЗ и структуру, ускоряя выход на рынок в 10 раз.',
    tools_market: 'B2B Маркетплейс', tools_text: 'Не изобретайте велосипед. Покупайте проверенные SaaS модули и запускайтесь мгновенно.',
    tools_badge: 'Превосходство', rules_title: 'Профессионализм — наша главная метрика.',
    zero_tolerance: 'Строгий KYC', zero_text: 'Все бизнесы и фрилансеры проходят жесткую проверку личности и навыков.',
    fast_report: 'Юридическая Защита', report_text: 'Встроенные NDA и автоматическая передача прав защищают ваш код.',
    ban: 'Контроль Качества', ban_text: 'Нулевая терпимость к срыву сроков. Доступен независимый аудит кода.',
    footer_text: 'Премиум IT Платформа'
  },
  uz: {
    nav_how: 'Qanday ishlaydi', nav_features: 'Imkoniyatlar', nav_business: 'Biznes uchun', open_platform: 'Platformani ochish',
    hero_badge: 'Korporativ Freelance', hero_title: 'Biznesingiz Kelajagini Qurish. Tez.',
    hero_text: 'Top 1% IT mutaxassislar bilan ishlang. Xavfsiz to‘lovlar, AI vositalari va tayyor SaaS modullari bozori.',
    start_work: 'Ishni boshlash', see_flow: 'Jarayonni ko‘rish', stat_escrow: 'Xavfsizlik', stat_ai: 'Halol komissiya', stat_verified: 'Qo‘llab-quvvatlash',
    one_product: 'Ish Jarayoni', how_title: 'O‘sish uchun yaratilgan. Tezlik uchun qurilgan.',
    client_card_title: 'Xavfsiz To‘lovlar (Escrow)', client_card_text: 'Mablag‘ natija tasdiqlanmaguncha band qilinadi. Nol risk, 100% kafolat.',
    freelancer_card_title: 'AI Tezlashuv', freelancer_card_text: 'AI vositalarimiz TZ va strukturani generatsiya qilib, bozorgacha vaqtni 10 barobar qisqartiradi.',
    tools_market: 'B2B Market', tools_text: 'G‘ildirakni qayta kashf qilmang. Tayyor SaaS modullarni sotib oling va darhol ishga tushiring.',
    tools_badge: 'Mukammallik', rules_title: 'Professionallik — asosiy metrikamiz.',
    zero_tolerance: 'Qat’iy KYC', zero_text: 'Barcha kompaniya va freelancerlar qat’iy tekshiruvdan o‘tadi.',
    fast_report: 'Yuridik Himoya', report_text: 'O‘rnatilgan NDA va huquqlarni o‘tkazish sizning kodingizni himoya qiladi.',
    ban: 'Sifat Nazorati', ban_text: 'Muddatni buzishga toqatsizlik. Mustaqil kod auditi mavjud.',
    footer_text: 'Premium IT Platforma'
  }
};

function systemLang() {
  const raw = (navigator.language || 'en').slice(0, 2).toLowerCase();
  return supported.includes(raw) ? raw : 'en';
}

function setLang(lang) {
  const safe = supported.includes(lang) ? lang : 'en';
  localStorage.setItem(SITE_LANG_KEY, safe);
  document.documentElement.lang = safe;
  document.querySelectorAll('[data-i18n]').forEach((node) => {
    if (!node.dataset.i18nDefault) {
      node.dataset.i18nDefault = node.textContent;
    }
    const key = node.dataset.i18n;
    const value = safe === 'en' ? node.dataset.i18nDefault : ((dict[safe] && dict[safe][key]) || node.dataset.i18nDefault);
    if (value) node.innerHTML = value;
  });
  document.querySelectorAll('[data-lang]').forEach((button) => {
    button.classList.toggle('active', button.dataset.lang === safe);
  });
}

const initialLang = localStorage.getItem(SITE_LANG_KEY) || systemLang();
setLang(initialLang);

document.querySelectorAll('[data-lang]').forEach((button) => {
  button.addEventListener('click', () => setLang(button.dataset.lang));
});

// Theme Toggle Logic
const themeToggle = document.getElementById('themeToggle');
function setTheme(theme) {
  document.documentElement.setAttribute('data-theme', theme);
  localStorage.setItem(THEME_KEY, theme);
  themeToggle.textContent = theme === 'dark' ? '☀️' : '🌙';
}

const savedTheme = localStorage.getItem(THEME_KEY) || (window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light');
setTheme(savedTheme);

themeToggle.addEventListener('click', () => {
  const currentTheme = document.documentElement.getAttribute('data-theme');
  setTheme(currentTheme === 'dark' ? 'light' : 'dark');
});

// Intersection Observer for scroll animations
const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.style.animationPlayState = 'running';
      observer.unobserve(entry.target);
    }
  });
}, { threshold: 0.1 });

document.querySelectorAll('.animate-fade-in').forEach(el => {
  el.style.animationPlayState = 'paused';
  observer.observe(el);
});
