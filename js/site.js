const SITE_LANG_KEY = 'freedom_lang_v2';
const supported = ['en', 'ru', 'uz'];

const dict = {
  en: {},
  ru: {
    nav_how: 'Как это работает', nav_features: 'Возможности', nav_security: 'Безопасность', nav_business: 'Для Бизнеса', open_platform: 'Открыть платформу',
    hero_badge: 'B2B Фриланс и Готовые Решения', hero_title: 'Усильте ваш бизнес передовыми IT решениями',
    hero_text: 'FreeDom соединяет бизнес с проверенными IT специалистами. Прозрачная комиссия 5-10%, безопасные сделки и магазин готовых бизнес-приложений. Создавайте быстрее и безопаснее.',
    start_work: 'Начать разработку', see_flow: 'Изучить процесс', stat_escrow: 'Безопасные сделки', stat_ai: 'Умный подбор и инструменты', stat_verified: 'Проверено', stat_pros: 'Только лучшие специалисты',
    freelancer: 'Исполнитель', client: 'Заказчик', active_projects: 'Активные Проекты', team: 'Команда', preview_order_one: 'Корпоративная CRM', preview_order_one_text: 'Аналитика, маршрутизация лидов и доступы.', preview_order_two: 'FinTech Платежный Шлюз', preview_order_two_text: 'API интеграция с банками, логирование.', projects: 'Проекты', messages: 'Сообщения', settings: 'Настройки', note_response: 'Этап утвержден',
    source_nova: 'Доверие Nova', source_bot: 'Корпоративная безопасность', source_site: 'Премиум поддержка 24/7', source_future: 'Масштабируемая инфраструктура',
    one_product: 'Бесшовная интеграция', how_title: 'Создано для роста бизнеса. Построено для профессионалов.', for_client: 'Для Бизнеса', client_card_title: 'Публикуйте, оценивайте демо, платите за результат', client_card_text: 'Исключите риски. Проверяйте рабочие прототипы до оплаты. Общайтесь через защищенные каналы.', client_li_1: '100% средств на безопасном счете.', client_li_2: 'NDA и защита интеллектуальной собственности.', client_li_3: 'Оплата только после принятия этапа.',
    for_freelancer: 'Для IT Специалистов', freelancer_card_title: 'Фокус на коде, а не на поиске клиентов', freelancer_card_text: 'Используйте готовые наработки. Заключайте безопасные сделки и монетизируйте неиспользуемый код в магазине.', freelancer_li_1: 'Встроенные AI ассистенты.', freelancer_li_2: 'Сохраняйте до 95% дохода.', freelancer_li_3: 'Пассивный доход с прошлых проектов.',
    deal_flow: 'Безопасная Сделка', flow_title: 'Ноль рисков. Гарантированный результат.', flow_1_title: 'Определение задачи', flow_1_text: 'Опубликуйте ТЗ. Средства резервируются на счете.', flow_2_title: 'Оценка решений', flow_2_text: 'Проверяйте предложения и тестируйте прототипы.', flow_3_title: 'Приемка работ', flow_3_text: 'Утвердите финальный продукт. Права передаются вам.', flow_4_title: 'Авто-выплаты', flow_4_text: 'Средства переводятся моментально после утверждения.',
    tools_badge: 'AI + Маркетплейс', tools_title: 'Инструменты разработки нового поколения', tools_text: 'FreeDom интегрирует мощные AI инструменты для планирования архитектуры и генерации кода, а также B2B магазин.', open_tools: 'Изучить возможности', tool_ai: 'AI Архитектор', faster: 'В 10 раз быстрее', for_each_order: 'старт проекта', tool_generator: 'Генератор приложений', one_click: 'в 1 клик', starter_proto: 'развертывание', tool_market: 'B2B Маркет', passive_income: 'Экономия', for_freelancers_small: 'при масштабировании',
    rules_badge: 'Корпоративные стандарты', rules_title: 'Профессионализм — наша главная метрика', rules_text: 'Мы поддерживаем строгие стандарты качества. Проверенные профили, обязательные NDA и нулевая терпимость к непрофессионализму.', zero_tolerance: 'Строгий KYC/KYB', zero_text: 'Проверенные компании и подрядчики', fast_report: 'Юридическая защита', report_text: 'Встроенные NDA и договоры передачи прав', ban: 'Контроль качества', ban_text: 'Разрешение споров и аудит кода',
    next_badge: 'Готовы к росту?', launch_title: 'Присоединяйтесь к будущему разработки.', launch_text: 'Получите доступ к лучшим талантам, AI инструментам и управляйте проектами из единого дашборда.', go_platform: 'Создать аккаунт', copy_link: 'Поделиться', footer_text: 'Премиум IT решения и фриланс платформа'
  },
  uz: {
    nav_how: 'Qanday ishlaydi', nav_features: 'Imkoniyatlar', nav_security: 'Xavfsizlik', nav_business: 'Biznes uchun', open_platform: 'Platformani ochish',
    hero_badge: 'B2B Freelance va Tayyor Yechimlar', hero_title: 'Biznesingizni ilg\'or IT yechimlar bilan kuchaytiring',
    hero_text: 'FreeDom biznesni tekshirilgan IT mutaxassislar bilan bog\'laydi. Shaffof 5-10% komissiya, xavfsiz bitimlar va tayyor biznes-ilovalar bozori.',
    start_work: 'Ishni boshlash', see_flow: 'Jarayonni ko\'rish', stat_escrow: 'Xavfsiz to\'lovlar', stat_ai: 'Aqlli tanlov va vositalar', stat_verified: 'Tekshirilgan', stat_pros: 'Faqat eng yaxshi mutaxassislar',
    freelancer: 'Ijrochi', client: 'Buyurtmachi', active_projects: 'Faol Loyihalar', team: 'Jamoa', preview_order_one: 'Korporativ CRM', preview_order_one_text: 'Analitika, lidlarni taqsimlash va ruxsatlar.', preview_order_two: 'FinTech To\'lov Shlyuzi', preview_order_two_text: 'Banklar bilan API integratsiya.', projects: 'Loyihalar', messages: 'Xabarlar', settings: 'Sozlamalar', note_response: 'Bosqich tasdiqlandi',
    source_nova: 'Nova ishonchi', source_bot: 'Korporativ xavfsizlik', source_site: '24/7 Premium qo\'llab-quvvatlash', source_future: 'Kengayuvchi infratuzilma',
    one_product: 'Uzluksiz integratsiya', how_title: 'Biznes o\'sishi uchun yaratilgan. Mutaxassislar uchun qurilgan.', for_client: 'Biznes uchun', client_card_title: 'Joylang, demoni baholang, natija uchun to\'lang', client_card_text: 'Risklarni yo\'qoting. To\'lovdan oldin ishchi prototiplarni tekshiring. Xavfsiz kanallar orqali muloqot qiling.', client_li_1: '100% mablag\' xavfsiz hisobda.', client_li_2: 'NDA va IP himoyasi.', client_li_3: 'To\'lov faqat bosqich qabul qilingandan keyin.',
    for_freelancer: 'IT Mutaxassislar uchun', freelancer_card_title: 'Mijoz qidirishga emas, kodga e\'tibor qarating', freelancer_card_text: 'Tayyor kodlardan foydalaning. Xavfsiz bitimlar tuzing va bo\'sh kodni marketda soting.', freelancer_li_1: 'O\'rnatilgan AI yordamchilar.', freelancer_li_2: 'Daromadning 95% gacha saqlang.', freelancer_li_3: 'Eski loyihalardan passiv daromad.',
    deal_flow: 'Xavfsiz Bitim', flow_title: 'Nol risk. Kafolatlangan natija.', flow_1_title: 'Vazifani belgilash', flow_1_text: 'TZ joylang. Mablag\' hisobda band qilinadi.', flow_2_title: 'Yechimlarni baholash', flow_2_text: 'Takliflarni tekshiring va prototiplarni test qiling.', flow_3_title: 'Ishni qabul qilish', flow_3_text: 'Yakuniy mahsulotni tasdiqlang. Huquqlar sizga o\'tadi.', flow_4_title: 'Avto-to\'lovlar', flow_4_text: 'Mablag\' tasdiqdan so\'ng darhol o\'tkaziladi.',
    tools_badge: 'AI + Market', tools_title: 'Yangi avlod ishlab chiqish vositalari', tools_text: 'FreeDom arxitekturani rejalashtirish va kod yaratish uchun kuchli AI vositalarni, shuningdek B2B bozorni o\'z ichiga oladi.', open_tools: 'Imkoniyatlarni o\'rganish', tool_ai: 'AI Arxitektor', faster: '10 barobar tez', for_each_order: 'loyiha boshlanishi', tool_generator: 'Ilova generatori', one_click: '1 klikda', starter_proto: 'ishga tushirish', tool_market: 'B2B Market', passive_income: 'Tejamkorlik', for_freelancers_small: 'kengaytirishda',
    rules_badge: 'Korporativ standartlar', rules_title: 'Professionallik — asosiy metrikamiz', rules_text: 'Biz qat\'iy sifat standartlarini qo\'llab-quvvatlaymiz. Tekshirilgan profillar, majburiy NDA va noprofessionallikka toqatsizlik.', zero_tolerance: 'Qat\'iy KYC/KYB', zero_text: 'Tekshirilgan kompaniyalar va pudratchilar', fast_report: 'Yuridik himoya', report_text: 'O\'rnatilgan NDA va huquqlarni o\'tkazish shartnomalari', ban: 'Sifat nazorati', ban_text: 'Nizolarni hal qilish va kod auditi',
    next_badge: 'O\'sishga tayyormisiz?', launch_title: 'Ishlab chiqish kelajagiga qo\'shiling.', launch_text: 'Eng yaxshi talentlarga, AI vositalariga kirish huquqiga ega bo\'ling va loyihalarni yagona panelda boshqaring.', go_platform: 'Akkaunt yaratish', copy_link: 'Ulashish', footer_text: 'Premium IT yechimlar va freelance platforma'
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
    if (value) node.textContent = value;
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

const copyButton = document.getElementById('copyLinkBtn');
if (copyButton) {
  copyButton.addEventListener('click', async () => {
    try {
      await navigator.clipboard.writeText(window.location.href);
      const currentLang = localStorage.getItem(SITE_LANG_KEY) || systemLang();
      copyButton.textContent = currentLang === 'ru' ? 'Ссылка скопирована' : currentLang === 'uz' ? 'Havola nusxalandi' : 'Link copied';
      setTimeout(() => setLang(localStorage.getItem(SITE_LANG_KEY) || 'en'), 1200);
    } catch {
      window.prompt('Copy link', window.location.href);
    }
  });
}
