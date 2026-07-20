const SITE_LANG_KEY = 'freedom_lang_v2';
const supported = ['en', 'ru', 'uz'];

const dict = {
  en: {},
  ru: {
    nav_how: 'Как работает', nav_tools: 'AI-инструменты', nav_economy: 'Экономика', nav_rules: 'Правила', open_platform: 'Открыть платформу',
    hero_badge: 'Честная комиссия + AI-инструменты', hero_title: 'Фриланс без огромной комиссии и неуважения',
    hero_text: 'FreeDom держит комиссию около 5-10%, чтобы фрилансеры могли снижать цену для клиента, а не кормить платформу. Исполнитель может сначала откликнуться, обсудить задачу в чате, а потом отправить рабочую ссылку. Сильные готовые решения могут стать товарами магазина.',
    start_work: 'Начать в FreeDom', see_flow: 'Посмотреть механику', stat_fee: 'честный сервисный сбор', stat_ai: 'помощники и генераторы', stat_ban_title: 'Бан', stat_ban: 'за неуважение к исполнителям',
    freelancer: 'Фрилансер', client: 'Заказчик', all: 'Все', websites: 'Сайты', preview_order_one: 'Mini App пиццерии', preview_order_one_text: 'Каталог, корзина, заказ и админка.', preview_order_two: 'Автоматизация лидов', preview_order_two_text: 'Статусы, маршрутизация лидов и уведомления менеджеру.', exchange: 'Биржа', market: 'Маркет', profile: 'Профиль', note_response: 'Новый отклик получен',
    source_nova: 'Заказы могут приходить из Nova', source_bot: 'Из Telegram-бота', source_site: 'С сайта клиента', source_future: 'Из будущих продуктов NovaUz',
    one_product: 'Один продукт, две роли', how_title: 'Клиенты получают результат. Фрилансеры получают честное рабочее место.', for_client: 'Для клиента', client_card_title: 'Публикует задачу, обсуждает отклики, тестирует результат', client_card_text: 'Клиент может сначала получить отклики, открыть чат, уточнить детали и потом выбрать лучший рабочий результат.', client_li_1: 'Бюджет хранится безопасно.', client_li_2: 'Чаты остаются внутри FreeDom.', client_li_3: 'Оплата уходит только после одобрения.',
    for_freelancer: 'Для фрилансера', freelancer_card_title: 'Сначала отклик, потом готовое решение', freelancer_card_text: 'Фрилансеру не надо переделывать уже готовую базу. Можно откликнуться, обсудить, адаптировать решение и всё равно продавать невостребованную работу в магазине.', freelancer_li_1: 'AI-помощник и генератор внутри.', freelancer_li_2: 'До 92% выплаты после сбора.', freelancer_li_3: 'Невыбранные решения могут стать товарами.',
    deal_flow: 'Сделка', flow_title: 'Понятный путь от задачи до оплаты', flow_1_title: 'Клиент публикует задачу', flow_1_text: 'В задаче есть описание, категория, валюта и бюджет.', flow_2_title: 'Фрилансеры откликаются и общаются', flow_2_text: 'Клиент может связаться с исполнителем до финального результата.', flow_3_title: 'Рабочий результат отправлен', flow_3_text: 'Клиент тестирует ссылки, выбирает победителя и подтверждает оплату.', flow_4_title: 'Маркетплейс сохраняет ценность', flow_4_text: 'Хорошие невыбранные решения становятся готовыми товарами.',
    tools_badge: 'AI + генератор + магазин', tools_title: 'AI помогает фрилансерам работать быстрее', tools_text: 'В FreeDom есть AI-помощник для планирования, генератор простых сайтов/ботов и магазин готовых решений.', open_tools: 'Открыть инструменты', tool_ai: 'План, структура и чек-лист сдачи', faster: 'быстрее', for_each_order: 'для каждого заказа', tool_generator: 'Стартовый сайт или Telegram-бот', one_click: '1 клик', starter_proto: 'первый прототип', tool_market: 'Готовые решения после конкурсов', passive_income: 'пассивный доход', for_freelancers_small: 'для фрилансеров',
    economy_badge: 'Экономика платформы', economy_title: 'Низкая комиссия с понятной причиной', fee: 'Комиссия', fee_text: 'В MVP используется 8% сервисный сбор после успешной выплаты или продажи.', freelancer_payout: 'Выплата фрилансеру', up_to_92: 'до 92%', payout_text: 'Большая часть бюджета остаётся у того, кто сделал результат.', fee_covers: 'На что идёт сбор', transparent: 'прозрачно', covers_text: 'Платежи, серверы, AI-инструменты, модерация, поддержка и работа продукта.', manifest: 'Манифест: мы снижаем комиссию для вас, вы снижаете цену для клиента.',
    rules_badge: 'Правила уважения', rules_title: 'Уважение к фрилансерам — правило платформы', rules_text: 'Хамство, угрозы, давление и попытки получить бесплатную работу могут привести к бану. FreeDom защищает тех, кто создаёт результат.', zero_tolerance: '0 терпимости', zero_text: 'к унижению и токсичному поведению', fast_report: 'Быстрая жалоба', report_text: 'исполнитель может отправить сигнал модерации', ban: 'Бан', ban_text: 'для неуважительных клиентов и менеджеров',
    next_badge: 'Следующий шаг', launch_title: 'Сайт объясняет. Платформа закрывает сделку.', launch_text: 'Публичный сайт нужен для доверия и входа. Реальная работа внутри платформы: заказы, отклики, чаты, готовые решения, AI-инструменты, магазин и кошелёк.', go_platform: 'Перейти в платформу', copy_link: 'Скопировать ссылку', footer_text: 'Фриланс по рабочему результату'
  },
  uz: {
    nav_how: 'Qanday ishlaydi', nav_tools: 'AI vositalar', nav_economy: 'Iqtisod', nav_rules: 'Qoidalar', open_platform: 'Platformani ochish',
    hero_badge: 'Halol komissiya + AI vositalar', hero_title: 'Katta komissiyasiz va hurmatsiz freelance',
    hero_text: 'FreeDom komissiyani 5-10% atrofida ushlab turadi. Freelancer avval javob qoldiradi, mijoz bilan chatda gaplashadi, keyin ishchi havola yuboradi. Kuchli tayyor yechimlar marketga chiqishi mumkin.',
    start_work: 'FreeDomda boshlash', see_flow: 'Jarayonni ko‘rish', stat_fee: 'halol servis to‘lovi', stat_ai: 'yordamchilar va generatorlar', stat_ban_title: 'Ban', stat_ban: 'ijrochiga hurmatsizlik uchun',
    freelancer: 'Freelancer', client: 'Mijoz', all: 'Hammasi', websites: 'Saytlar', preview_order_one: 'Pizza Mini App', preview_order_one_text: 'Katalog, savat, buyurtma va admin panel.', preview_order_two: 'Lid avtomatizatsiyasi', preview_order_two_text: 'Statuslar, lidlarni taqsimlash va bildirishnomalar.', exchange: 'Birja', market: 'Market', profile: 'Profil', note_response: 'Yangi javob keldi',
    source_nova: 'Buyurtmalar Novadan kelishi mumkin', source_bot: 'Telegram botdan', source_site: 'Mijoz saytidan', source_future: 'Kelajakdagi NovaUz mahsulotlaridan',
    one_product: 'Bitta mahsulot, ikki rol', how_title: 'Mijoz natija oladi. Freelancer halol ish joyi oladi.', for_client: 'Mijoz uchun', client_card_title: 'Vazifa joylaydi, javoblarni muhokama qiladi, natijani test qiladi', client_card_text: 'Mijoz avval javoblarni oladi, chat ochadi, tafsilotlarni aniqlaydi va keyin eng yaxshi ishchi natijani tanlaydi.', client_li_1: 'Byudjet xavfsiz saqlanadi.', client_li_2: 'Chatlar FreeDom ichida qoladi.', client_li_3: 'To‘lov faqat tasdiqdan keyin ketadi.',
    for_freelancer: 'Freelancer uchun', freelancer_card_title: 'Avval javob, keyin tayyor yechim', freelancer_card_text: 'Freelancer tayyor bazani qayta qilishga majbur emas. Avval gaplashadi, moslaydi va kerak bo‘lsa yechimni marketda sotadi.', freelancer_li_1: 'Ichki AI yordamchi va generator.', freelancer_li_2: 'Servis to‘lovidan keyin 92% gacha.', freelancer_li_3: 'Tanlanmagan yechimlar mahsulot bo‘lishi mumkin.',
    deal_flow: 'Bitim jarayoni', flow_title: 'Vazifadan to‘lovgacha aniq yo‘l', flow_1_title: 'Mijoz vazifa joylaydi', flow_1_text: 'Vazifada tavsif, kategoriya, valyuta va byudjet bo‘ladi.', flow_2_title: 'Freelancerlar javob beradi va chat qiladi', flow_2_text: 'Mijoz yakuniy natijadan oldin ijrochi bilan gaplashadi.', flow_3_title: 'Ishchi natija yuboriladi', flow_3_text: 'Mijoz havolalarni test qiladi, g‘olibni tanlaydi va to‘lovni tasdiqlaydi.', flow_4_title: 'Market qiymatni saqlaydi', flow_4_text: 'Yaxshi tanlanmagan yechimlar tayyor mahsulotga aylanadi.',
    tools_badge: 'AI + generator + market', tools_title: 'AI freelancer ishini tezlashtiradi', tools_text: 'FreeDomda rejalash uchun AI yordamchi, oddiy sayt/bot generatori va tayyor yechimlar marketi bor.', open_tools: 'Vositalarni ochish', tool_ai: 'Reja, struktura va topshirish chek-listi', faster: 'tezroq', for_each_order: 'har bir buyurtma uchun', tool_generator: 'Boshlang‘ich sayt yoki Telegram bot', one_click: '1 klik', starter_proto: 'start prototip', tool_market: 'Konkurslardan keyingi tayyor yechimlar', passive_income: 'passiv daromad', for_freelancers_small: 'freelancerlar uchun',
    economy_badge: 'Platforma iqtisodi', economy_title: 'Past komissiya, aniq sabab', fee: 'Komissiya', fee_text: 'MVPda muvaffaqiyatli to‘lov yoki sotuvdan keyin 8% servis to‘lovi ishlatiladi.', freelancer_payout: 'Freelancer to‘lovi', up_to_92: '92% gacha', payout_text: 'Byudjetning asosiy qismi natija qilgan ijrochida qoladi.', fee_covers: 'To‘lov nimalarga ketadi', transparent: 'shaffof', covers_text: 'To‘lovlar, serverlar, AI vositalar, moderatsiya, support va mahsulot ishlari.', manifest: 'Manifest: biz siz uchun komissiyani kamaytiramiz, siz mijoz uchun narxni kamaytirasiz.',
    rules_badge: 'Hurmat qoidalari', rules_title: 'Freelancerga hurmat — platforma qoidasi', rules_text: 'Qo‘pollik, tahdid, bosim va bepul ish talab qilish ban bilan tugashi mumkin. FreeDom natija yaratuvchilarni himoya qiladi.', zero_tolerance: '0 tolerantlik', zero_text: 'kamsitish va toksik muomala uchun', fast_report: 'Tez shikoyat', report_text: 'ijrochi moderatsiyaga signal yuboradi', ban: 'Ban', ban_text: 'hurmatsiz mijoz va menejerlar uchun',
    next_badge: 'Keyingi qadam', launch_title: 'Sayt tushuntiradi. Platforma bitimni yopadi.', launch_text: 'Ommaviy sayt ishonch va kirish uchun. Real ish platformada: buyurtmalar, javoblar, chatlar, tayyor yechimlar, AI vositalar, market va hamyon.', go_platform: 'Platformaga o‘tish', copy_link: 'Havolani nusxalash', footer_text: 'Ishchi natija bo‘yicha freelance'
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