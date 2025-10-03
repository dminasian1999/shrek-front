import React, { useState, useEffect, useCallback, useMemo } from 'react';
import "./index1.css";

// --- Имитация данных (Mock Data) ---

// Mock user data and structure
const initialUser = {
  id: 'user-123',
  name: 'Иван Петров',
  // Статусы: 'reader', 'premium', 'admin', 'author', 'emitter'
  status: 'reader',
  premiumEndDate: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000), // Премиум на 3 дня
  isPremium: false,
  favorites: [1, 5, 8], // ID постов
};

const mockPosts = [
  { id: 1, title: 'Обзор рынка: Итоги квартала', excerpt: 'Ключевые события и тренды...', content: 'Полный анализ основных отраслей...', isPremium: false, comments: ['Отлично!'], image: 'https://placehold.co/400x200/4c7c8c/ffffff?text=Общий+Пост' },
  { id: 2, title: 'Анализ "Компании А" (Премиум)', excerpt: 'Детальный разбор финансовой модели...', content: 'Эксклюзивные прогнозы и оценка...', isPremium: true, comments: [], image: 'https://placehold.co/400x200/d97706/ffffff?text=Премиум+Анализ' },
  { id: 3, title: 'Что такое мультипликаторы?', excerpt: 'Простое объяснение основных понятий...', content: 'Определение P/E, EV/EBITDA и их применение.', isPremium: false, comments: ['Полезно!', 'Спасибо.'], image: 'https://placehold.co/400x200/10b981/ffffff?text=Образовательный+Пост' },
  { id: 4, title: 'Текущая структура портфеля', excerpt: 'Разбор активов и стратегии...', content: 'Подробное описание текущих позиций и обоснование.', isPremium: true, comments: [], image: 'https://placehold.co/400x200/b91c1c/ffffff?text=Премиум+Портфель' },
  { id: 5, title: 'Влияние инфляции на S&P 500', excerpt: 'Как защитить свой капитал...', content: 'Исторический анализ и актуальные стратегии.', isPremium: false, comments: [], image: 'https://placehold.co/400x200/6b7280/ffffff?text=Рынок' },
  { id: 6, title: 'Админ-пост (только для демонстрации)', excerpt: 'Этот пост виден всем, но создан админом.', content: 'Демонстрационный пост для проверки ролей.', isPremium: false, comments: [], image: 'https://placehold.co/400x200/5b21b6/ffffff?text=Demo+Admin' },
  { id: 7, title: 'Премиум-пост от Автора', excerpt: 'Эксклюзивный материал от нашего автора.', content: 'Очень важный и ценный материал.', isPremium: true, comments: [], image: 'https://placehold.co/400x200/eab308/ffffff?text=Авторский+контент' },
  { id: 8, title: 'Обзор "Компании B" (Премиум)', excerpt: 'Детальный разбор финансовой модели...', content: 'Эксклюзивные прогнозы и оценка...', isPremium: true, comments: [], image: 'https://placehold.co/400x200/0369a1/ffffff?text=Премиум+B' },
];

const mockMultipliers = [
  { id: 1, company: 'TechNova', pe: 25.5, evEbitda: 18.2, roe: 0.15, description: 'Крупная IT-компания с высокими темпами роста.' },
  { id: 2, company: 'GlobalBank', pe: 12.1, evEbitda: 7.9, roe: 0.08, description: 'Один из крупнейших банков региона, стабильные дивиденды.' },
  { id: 3, company: 'EnergyPro', pe: 8.9, evEbitda: 5.5, roe: 0.12, description: 'Энергетический гигант, чувствительный к ценам на сырье.' },
  { id: 4, company: 'MediLife', pe: 45.0, evEbitda: 30.1, roe: 0.22, description: 'Биотехнологическая компания, высокая P/E из-за перспектив.' },
];

const mockHistoricalData = [
  { id: 1, title: 'Кризис 2008 года: Как выжили банки', content: 'Текст о финансовом кризисе и мерах поддержки банковского сектора.', graphs: ['https://placehold.co/600x300/f87171/ffffff?text=График+кризиса+2008'] },
  { id: 2, title: 'Влияние COVID-19 на e-commerce', content: 'Текст о резком росте онлайн-торговли и логистических проблемах.', graphs: ['https://placehold.co/600x300/34d399/ffffff?text=График+e-commerce+2020'] },
  { id: 3, title: 'Долгосрочные тренды в энергетике', content: 'Анализ перехода на возобновляемые источники энергии.', graphs: ['https://placehold.co/600x300/60a5fa/ffffff?text=График+Энергетика'] },
];

const mockFairPrices = [
  { id: 1, company: 'TechNova', fairPrice: 150.00, currentPrice: 150.50, description: 'Цена близка к справедливой.' },
  { id: 2, company: 'GlobalBank', fairPrice: 55.00, currentPrice: 53.20, description: 'Недооценена на 3.2%.' },
  { id: 3, company: 'EnergyPro', fairPrice: 85.00, currentPrice: 88.00, description: 'Переоценена на 3.5%.' },
  { id: 4, company: 'MediLife', fairPrice: 200.00, currentPrice: 200.00, description: 'Цена соответствует справедливой.' },
];

const mockPortfolio = [
  { company: 'TechNova', share: 40 },
  { company: 'GlobalBank', share: 25 },
  { company: 'EnergyPro', share: 20 },
  { company: 'Cash', share: 15 },
];

// Цена подписки в рублях
const subscriptionPrices = {
  '1m': 1990,
  '3m': 4990,
  '6m': 8990,
  '12m': 14990,
};

// --- Вспомогательные функции и компоненты ---

const PieChartNav = ({ navigate }) => {
  const pages = [
    { name: 'Мультипликаторы', id: 'multipliers', color: '#10B981', startAngle: 0, sweepAngle: 45 },
    { name: 'Исторические данные', id: 'historical', color: '#3B82F6', startAngle: 45, sweepAngle: 45 },
    { name: 'Посты', id: 'posts', color: '#F59E0B', startAngle: 90, sweepAngle: 45 },
    { name: 'Справедливые цены', id: 'fairPrices', color: '#EF4444', startAngle: 135, sweepAngle: 45 },
    { name: 'Текущий портфель', id: 'portfolio', color: '#8B5CF6', startAngle: 180, sweepAngle: 45 },
    { name: 'Магазин', id: 'store', color: '#14B8A6', startAngle: 225, sweepAngle: 45 },
    { name: 'Профиль', id: 'profile', color: '#EC4899', startAngle: 270, sweepAngle: 90 }, // Увеличенный сектор
  ];

  const radius = 100;
  const cx = 150;
  const cy = 150;

  const polarToCartesian = (centerX, centerY, radius, angleInDegrees) => {
    const angleInRadians = (angleInDegrees - 90) * Math.PI / 180.0;
    return {
      x: centerX + (radius * Math.cos(angleInRadians)),
      y: centerY + (radius * Math.sin(angleInRadians))
    };
  };

  const describeArc = (x, y, radius, startAngle, endAngle) => {
    const start = polarToCartesian(x, y, radius, endAngle);
    const end = polarToCartesian(x, y, radius, startAngle);

    const largeArcFlag = endAngle - startAngle <= 180 ? 0 : 1;

    const d = [
      "M", start.x, start.y,
      "A", radius, radius, 0, largeArcFlag, 0, end.x, end.y,
      "L", x, y,
      "Z"
    ].join(" ");

    return d;
  };

  return (
    <div className="flex flex-col items-center p-8 bg-gray-900 rounded-xl shadow-2xl">
      <h3 className="text-xl font-bold text-indigo-400 mb-4">Навигация по разделам</h3>
      <svg width="300" height="300" viewBox="0 0 300 300" className="shadow-lg rounded-full">
        {pages.map((page, index) => (
          <g key={index}>
            <path
              d={describeArc(cx, cy, radius, page.startAngle, page.startAngle + page.sweepAngle)}
              fill={page.color}
              className="hover:opacity-80 transition duration-300 cursor-pointer stroke-gray-700 stroke-[1px]"
              onClick={() => navigate(page.id)}
            />
            {/* Текст (позиционируем примерно по центру сектора) */}
            <text
              x={cx + (radius / 1.5) * Math.cos(((page.startAngle + page.sweepAngle / 2) - 90) * Math.PI / 180)}
              y={cy + (radius / 1.5) * Math.sin(((page.startAngle + page.sweepAngle / 2) - 90) * Math.PI / 180)}
              textAnchor="middle"
              fill="white"
              fontSize="10"
              fontWeight="bold"
              className="pointer-events-none"
            >
              {page.name}
            </text>
          </g>
        ))}
        {/* Центральный круг */}
        <circle cx={cx} cy={cy} r={40} fill="#1F2937" stroke="#374151" strokeWidth="2" />
        <text x={cx} y={cy + 5} textAnchor="middle" fill="#9CA3AF" fontSize="14" fontWeight="bold">
          МЕНЮ
        </text>
      </svg>
    </div>
  );
};

// Tooltip Component
const Tooltip = ({ text, children }) => (
  <div className="relative flex flex-col items-center group">
    {children}
    <div className="absolute top-full flex flex-col items-center hidden mt-2 group-hover:flex w-max z-20">
      <div className="bg-gray-700 text-white text-xs rounded-lg py-2 px-3 shadow-xl">
        {text}
      </div>
    </div>
  </div>
);

// Gated Content Placeholder
const GatedContent = ({ navigate }) => (
  <div className="p-8 text-center bg-gray-800 border border-yellow-500 rounded-lg shadow-xl max-w-lg mx-auto mt-10">
    <h2 className="text-2xl font-bold text-yellow-400 mb-4">Премиум-контент</h2>
    <p className="text-gray-300 mb-6">Этот раздел доступен только для пользователей с активной подпиской.</p>
    <p className="text-sm text-gray-400 mb-6">
      <span className="font-semibold text-yellow-300">Демо-информация:</span> Тестовые данные или ограниченный функционал для ознакомления.
    </p>
    <button
      onClick={() => navigate('store')}
      className="bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-3 px-6 rounded-lg transition duration-300 shadow-md transform hover:scale-[1.02]"
    >
      Перейти в Магазин и Получить Премиум
    </button>
  </div>
);

// --- Основное приложение ---

export default function App2() {
  const [currentPage, setCurrentPage] = useState('home');
  const [user, setUser] = useState(initialUser);
  const [posts, setPosts] = useState(mockPosts);
  const [fairPrices, setFairPrices] = useState(mockFairPrices);
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [adminPriceInput, setAdminPriceInput] = useState(subscriptionPrices['1m']);
  const [adminStatusInput, setAdminStatusInput] = useState(user.status);
  const [message, setMessage] = useState(''); // Для сообщений пользователю

  // Проверка статуса подписки
  useEffect(() => {
    const checkPremium = () => {
      const now = Date.now();
      const end = user.premiumEndDate.getTime();
      const isPremium = user.status === 'premium' || user.status === 'admin' || user.status === 'author' || user.status === 'emitter' || (end > now);

      // Обновляем статус только если он изменился
      if (user.isPremium !== isPremium) {
        setUser(u => ({ ...u, isPremium }));
      }
    };

    checkPremium();
    // Проверка каждую минуту
    const intervalId = setInterval(checkPremium, 60000);
    return () => clearInterval(intervalId);
  }, [user.premiumEndDate, user.status, user.isPremium]);


  // Симуляция обновления данных P5 раз в час
  useEffect(() => {
    const updateCurrentPrices = () => {
      setFairPrices(prevPrices => prevPrices.map(item => ({
        ...item,
        // Имитация небольшой случайной флуктуации, как будто "подтянулись" данные
        currentPrice: parseFloat((item.currentPrice * (1 + (Math.random() - 0.5) * 0.01)).toFixed(2)),
      })));
      setMessage(`[Система] Цены обновлены (имитация внешнего источника) в ${new Date().toLocaleTimeString()}`);
    };

    updateCurrentPrices(); // Первичное обновление
    const intervalId = setInterval(updateCurrentPrices, 3600000); // 1 час
    // Для демо - можно поставить 60000 (1 минута)
    // const intervalId = setInterval(updateCurrentPrices, 60000);

    return () => clearInterval(intervalId);
  }, []);

  // Установка статуса премиум для проверки
  const setPremiumForDemo = (durationInDays) => {
    const newEndDate = new Date(Date.now() + durationInDays * 24 * 60 * 60 * 1000);
    setUser(u => ({ ...u, status: 'premium', premiumEndDate: newEndDate, isPremium: true }));
    setMessage(`Премиум-статус активирован на ${durationInDays} дней! (Имитация оплаты)`);
    setCurrentPage('profile');
  };

  // --- Навигация и роли ---
  const navigate = useCallback((pageId) => {
    setCurrentPage(pageId);
    window.scrollTo(0, 0);
  }, []);

  const isAdminOrAbove = user.status === 'admin';
  const isAuthorOrAbove = isAdminOrAbove || user.status === 'author' || user.status === 'emitter';
  const isAuthenticated = user.id !== 'guest'; // Простая проверка авторизации

  const navItems = [
    { id: 'home', name: 'Главная', requiresAuth: false },
    { id: 'multipliers', name: 'Мультипликаторы', requiresAuth: false },
    { id: 'historical', name: 'Исторические данные', requiresAuth: false },
    { id: 'posts', name: 'Посты', requiresAuth: false },
    { id: 'fairPrices', name: 'Справедливые цены', requiresAuth: user.isPremium },
    { id: 'portfolio', name: 'Текущий портфель', requiresAuth: user.isPremium },
    { id: 'store', name: 'Магазин', requiresAuth: false },
    { id: 'profile', name: 'Профиль', requiresAuth: true },
  ].filter(item => item.id !== 'profile' || isAuthenticated); // Профиль виден только авторизованным

  // --- Компонент: Header ---
  const Header = () => (
    <header className="bg-gray-900 shadow-xl sticky top-0 z-50">
      <div className="container mx-auto px-4 py-4 flex flex-col md:flex-row justify-between items-center">
        <div className="text-2xl font-extrabold text-indigo-400 mb-2 md:mb-0">
          GEN IMAGE
        </div>
        <nav className="flex flex-wrap justify-center md:justify-end gap-2 md:gap-4 text-sm font-medium">
          {navItems.map((item) => (
            <button
              key={item.id}
              onClick={() => navigate(item.id)}
              className={`px-3 py-1.5 rounded-lg transition duration-200 
                ${currentPage === item.id ? 'bg-indigo-600 text-white shadow-lg' : 'text-gray-300 hover:bg-gray-700'}
                ${item.requiresAuth && !user.isPremium ? 'opacity-50 cursor-not-allowed' : ''}
              `}
              disabled={item.requiresAuth && !user.isPremium && item.id !== 'fairPrices' && item.id !== 'portfolio'}
            >
              {item.name}
              {item.requiresAuth && !user.isPremium && <span className="ml-1 text-xs">🔒</span>}
            </button>
          ))}
          {!isAuthenticated && (
            <button
              onClick={() => setIsAuthModalOpen(true)}
              className="px-3 py-1.5 rounded-lg bg-green-600 text-white hover:bg-green-700 transition duration-200"
            >
              Войти
            </button>
          )}
        </nav>
      </div>
    </header>
  );

  // --- Компонент: Footer ---
  const Footer = () => (
    <footer className="bg-gray-900 border-t border-gray-700 mt-12 py-6">
      <div className="container mx-auto px-4 text-center text-gray-400">
        <p className="text-sm mb-2">
          <span className="font-bold text-red-500">Дисклеймер:</span> Все материалы предоставлены исключительно в информационных целях и не являются инвестиционной рекомендацией.
        </p>
        <a href="#documents" className="text-indigo-400 hover:text-indigo-300 text-sm transition duration-200">
          Политика конфиденциальности и Условия использования
        </a>
      </div>
    </footer>
  );

  // --- Страница 1: Главная (Home) ---
  const HomePage = () => (
    <div className="min-h-[60vh] flex flex-col items-center justify-center p-8">
      <h1 className="text-4xl font-extrabold text-white mb-6">Аналитический Портал "GEN IMAGE"</h1>
      <p className="text-lg text-gray-300 max-w-3xl text-center mb-10">
        Добро пожаловать на ваш личный помощник в мире финансов. Мы предоставляем структурированные данные, аналитические отчеты и инструменты для принятия взвешенных инвестиционных решений.
      </p>
      <PieChartNav navigate={navigate} />
    </div>
  );

  // --- Страница 2: Мультипликаторы (Multipliers) ---
  const MultipliersPage = () => {
    const [sortKey, setSortKey] = useState(null);
    const [sortDirection, setSortDirection] = useState('asc'); // 'asc' | 'desc'
    const [filterText, setFilterText] = useState('');

    const columnDefs = [
      { key: 'company', name: 'Компания', description: 'Полное название компании.' },
      { key: 'pe', name: 'P/E', description: 'Отношение цены акции к прибыли на акцию. Чем ниже, тем "дешевле".' },
      { key: 'evEbitda', name: 'EV/EBITDA', description: 'Отношение стоимости компании к операционной прибыли. Более точный мультипликатор для сравнения.' },
      { key: 'roe', name: 'ROE (%)', description: 'Рентабельность собственного капитала. Показывает эффективность использования капитала.' },
    ];

    const sortedAndFilteredData = useMemo(() => {
      let data = mockMultipliers.filter(item =>
        Object.values(item).some(val =>
          String(val).toLowerCase().includes(filterText.toLowerCase())
        )
      );

      if (!sortKey) return data;

      return data.sort((a, b) => {
        const aVal = a[sortKey];
        const bVal = b[sortKey];

        let comparison = 0;
        if (typeof aVal === 'string') {
          comparison = aVal.localeCompare(bVal);
        } else {
          comparison = aVal - bVal;
        }

        return sortDirection === 'asc' ? comparison : -comparison;
      });
    }, [filterText, sortKey, sortDirection]);

    const handleSort = (key) => {
      if (sortKey === key) {
        setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
      } else {
        setSortKey(key);
        setSortDirection('desc');
      }
    };

    const handleRowClick = (item) => {
      // Имитация перехода на страницу 3 с конкретным описанием
      alert(`Переход на детальную страницу компании: ${item.company}. \n\nВ реальном приложении это будет переход на /historical-data/${item.company}`);
    };

    return (
      <div className="p-8">
        <h1 className="text-3xl font-bold text-white mb-6 border-b border-gray-700 pb-2">Мультипликаторы компаний</h1>

        <input
          type="text"
          placeholder="Фильтр по таблице..."
          value={filterText}
          onChange={(e) => setFilterText(e.target.value)}
          className="w-full md:w-1/3 p-3 mb-6 bg-gray-800 border border-gray-700 rounded-lg text-white placeholder-gray-400 focus:ring-indigo-500 focus:border-indigo-500"
        />

        <div className="overflow-x-auto rounded-xl shadow-2xl">
          <table className="min-w-full divide-y divide-gray-700">
            <thead className="bg-gray-800">
            <tr>
              {columnDefs.map(col => (
                <th
                  key={col.key}
                  onClick={() => handleSort(col.key)}
                  className="px-6 py-3 text-left text-xs font-semibold text-gray-300 uppercase tracking-wider cursor-pointer hover:bg-gray-700 transition duration-150"
                >
                  <Tooltip text={col.description}>
                      <span className="flex items-center">
                        {col.name}
                        {sortKey === col.key && (
                          <svg className={`w-3 h-3 ml-1 transition-transform ${sortDirection === 'desc' ? 'rotate-180' : ''}`} fill="currentColor" viewBox="0 0 20 20">
                            <path d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" fillRule="evenodd"></path>
                          </svg>
                        )}
                      </span>
                  </Tooltip>
                </th>
              ))}
              <th className="px-6 py-3 text-left text-xs font-semibold text-gray-300 uppercase tracking-wider">Описание</th>
            </tr>
            </thead>
            <tbody className="bg-gray-900 divide-y divide-gray-700">
            {sortedAndFilteredData.map((item) => (
              <tr key={item.id} className="hover:bg-gray-800 transition duration-150 cursor-pointer" onClick={() => handleRowClick(item)}>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-indigo-400">{item.company}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-300">{item.pe.toFixed(1)}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-300">{item.evEbitda.toFixed(1)}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-300">{(item.roe * 100).toFixed(1)}%</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{item.description}</td>
              </tr>
            ))}
            </tbody>
          </table>
        </div>
      </div>
    );
  };

  // --- Страница 3: Исторические данные (Historical Data) ---
  const HistoricalPage = () => {
    const [expandedId, setExpandedId] = useState(null);

    const toggleExpand = (id) => {
      setExpandedId(expandedId === id ? null : id);
    };

    return (
      <div className="p-8 max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold text-white mb-6 border-b border-gray-700 pb-2">Исторические данные и Аналитические отчеты</h1>
        <p className="text-gray-400 mb-8">Более 80 отчетов (показано 3 для примера). Нажмите на заголовок, чтобы развернуть детальный анализ.</p>

        <div className="space-y-4">
          {mockHistoricalData.map((item) => (
            <div key={item.id} className="bg-gray-800 rounded-lg shadow-xl overflow-hidden border border-gray-700">
              <button
                onClick={() => toggleExpand(item.id)}
                className="w-full text-left p-5 flex justify-between items-center text-xl font-semibold text-indigo-300 hover:bg-gray-700 transition duration-200"
              >
                {item.title}
                <svg className={`w-6 h-6 transform transition-transform ${expandedId === item.id ? 'rotate-180' : 'rotate-0'}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path>
                </svg>
              </button>

              <div
                className={`transition-max-height duration-500 ease-in-out overflow-hidden ${expandedId === item.id ? 'max-h-screen p-5 pt-0' : 'max-h-0'}`}
              >
                <div className="pt-4 border-t border-gray-600 space-y-4">
                  <p className="text-gray-300 leading-relaxed">{item.content}</p>
                  {item.graphs.map((graph, index) => (
                    <img key={index} src={graph} alt={`График ${index + 1}`} className="w-full h-auto rounded-lg shadow-md border border-gray-600" onError={(e) => { e.target.onerror = null; e.target.src = "https://placehold.co/600x300/374151/ffffff?text=График+Недоступен"; }} />
                  ))}
                  <div className="text-sm text-gray-500 pt-2">
                    <p>Подробный анализ {item.title}. Источник: внутренняя аналитика.</p>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  };

  // --- Страница 4: Посты (Posts) ---
  const PostsPage = () => {
    const [selectedPost, setSelectedPost] = useState(null);
    const [commentText, setCommentText] = useState('');
    const [isAddingPost, setIsAddingPost] = useState(false);

    // Admin/Author/Emitter functions
    const handleAddPost = (e) => {
      e.preventDefault();
      const formData = new FormData(e.target);
      const newPost = {
        id: posts.length + 1,
        title: formData.get('title'),
        excerpt: formData.get('excerpt'),
        content: formData.get('content'),
        isPremium: formData.get('isPremium') === 'on',
        comments: [],
        image: 'https://placehold.co/400x200/5b21b6/ffffff?text=Новый+Пост'
      };
      setPosts(p => [newPost, ...p]);
      setIsAddingPost(false);
      setMessage(`Пост "${newPost.title}" успешно добавлен.`);
    };

    const handleToggleFavorite = (postId) => {
      if (!isAuthenticated) {
        setMessage('Для добавления в избранное необходимо авторизоваться.');
        return;
      }
      setUser(u => ({
        ...u,
        favorites: u.favorites.includes(postId)
          ? u.favorites.filter(id => id !== postId)
          : [...u.favorites, postId]
      }));
    };

    const handleAddComment = (e) => {
      e.preventDefault();
      if (!user.isPremium) {
        setMessage('Комментирование доступно только для премиум-пользователей.');
        return;
      }
      if (commentText.trim() === '') return;

      setPosts(p => p.map(post =>
        post.id === selectedPost.id
          ? { ...post, comments: [...post.comments, `${user.name}: ${commentText}`] }
          : post
      ));
      setCommentText('');
      setMessage('Комментарий успешно добавлен.');
    };

    const closePost = () => setSelectedPost(null);

    const postToDisplay = selectedPost || posts;

    // Post Creation Modal (Only visible to Admin/Author/Emitter)
    const AddPostModal = () => (
      <div className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center z-[100]">
        <div className="bg-gray-900 p-8 rounded-xl shadow-2xl w-full max-w-xl border border-indigo-500">
          <h2 className="text-2xl font-bold text-white mb-6">Добавить Новый Пост</h2>
          <form onSubmit={handleAddPost} className="space-y-4">
            <input type="text" name="title" placeholder="Заголовок поста" required className="w-full p-3 bg-gray-800 border border-gray-700 rounded-lg text-white" />
            <textarea name="excerpt" placeholder="Краткое описание (шапка)" required className="w-full p-3 bg-gray-800 border border-gray-700 rounded-lg text-white h-16" />
            <textarea name="content" placeholder="Полный текст поста" required className="w-full p-3 bg-gray-800 border border-gray-700 rounded-lg text-white h-32" />
            <div className="flex items-center">
              <input type="checkbox" id="isPremium" name="isPremium" className="w-4 h-4 text-indigo-600 bg-gray-700 border-gray-600 rounded" />
              <label htmlFor="isPremium" className="ml-2 text-sm font-medium text-gray-300">Премиум-пост (доступен только по подписке)</label>
            </div>
            <div className="flex justify-end space-x-4">
              <button type="button" onClick={() => setIsAddingPost(false)} className="px-4 py-2 text-gray-300 bg-gray-700 rounded-lg hover:bg-gray-600">Отмена</button>
              <button type="submit" className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700">Опубликовать</button>
            </div>
          </form>
        </div>
      </div>
    );

    // Single Post View
    if (selectedPost) {
      const isContentGated = selectedPost.isPremium && !user.isPremium;
      return (
        <div className="p-8 max-w-4xl mx-auto">
          <button onClick={closePost} className="text-indigo-400 hover:text-indigo-300 mb-6 flex items-center transition duration-200">
            <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 19l-7-7m0 0l7-7m-7 7h18"></path></svg>
            Назад ко всем постам
          </button>

          <article className="bg-gray-800 p-8 rounded-xl shadow-2xl border border-gray-700">
            <h1 className="text-4xl font-extrabold text-white mb-4">{selectedPost.title} {selectedPost.isPremium && <span className="text-yellow-500 text-2xl">💎</span>}</h1>
            <img src={selectedPost.image} alt={selectedPost.title} className="w-full h-auto rounded-lg mb-6" onError={(e) => { e.target.onerror = null; e.target.src = "https://placehold.co/600x300/374151/ffffff?text=Изображение+Недоступно"; }} />

            {isContentGated ? (
              <GatedContent navigate={navigate} />
            ) : (
              <div className="text-gray-300 leading-relaxed whitespace-pre-wrap">{selectedPost.content}</div>
            )}

            <div className="mt-8 border-t border-gray-700 pt-6 flex justify-between items-center">
              <button
                onClick={() => handleToggleFavorite(selectedPost.id)}
                className={`flex items-center space-x-2 px-4 py-2 rounded-lg transition duration-200 ${user.favorites.includes(selectedPost.id) ? 'bg-pink-600 text-white hover:bg-pink-700' : 'bg-gray-700 text-gray-300 hover:bg-gray-600'}`}
                disabled={!isAuthenticated}
              >
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z" clipRule="evenodd"></path></svg>
                <span>{user.favorites.includes(selectedPost.id) ? 'В Избранном' : 'В Избранное'}</span>
              </button>
            </div>
          </article>

          {/* Comments Section (Премиум) */}
          <div className="mt-10 p-6 bg-gray-800 rounded-xl shadow-2xl border border-gray-700">
            <h3 className="text-2xl font-bold text-white mb-4">Комментарии ({selectedPost.comments.length})</h3>
            {user.isPremium ? (
              <form onSubmit={handleAddComment} className="mb-6">
                            <textarea
                              value={commentText}
                              onChange={(e) => setCommentText(e.target.value)}
                              placeholder="Оставьте свой комментарий (Премиум)"
                              className="w-full p-3 bg-gray-700 border border-gray-600 rounded-lg text-white placeholder-gray-400 h-20 resize-none focus:ring-indigo-500 focus:border-indigo-500"
                              required
                            />
                <button type="submit" className="mt-3 px-4 py-2 bg-indigo-600 text-white font-semibold rounded-lg hover:bg-indigo-700 transition duration-200">
                  Отправить
                </button>
              </form>
            ) : (
              <div className="text-center p-4 bg-gray-700 rounded-lg text-yellow-400">
                Для комментирования необходим Премиум-статус.
              </div>
            )}

            <div className="space-y-4 max-h-60 overflow-y-auto pr-2">
              {selectedPost.comments.length > 0 ? selectedPost.comments.map((comment, index) => (
                <div key={index} className="p-3 bg-gray-700 rounded-lg border-l-4 border-indigo-500 text-gray-300 text-sm">
                  {comment}
                </div>
              )) : (
                <p className="text-gray-500">Комментариев пока нет.</p>
              )}
            </div>
          </div>
        </div>
      );
    }

    // Posts List View
    return (
      <div className="p-8 max-w-6xl mx-auto">
        <div className="flex justify-between items-center mb-6 border-b border-gray-700 pb-2">
          <h1 className="text-3xl font-bold text-white">Лента Аналитических Постов</h1>
          {isAuthorOrAbove && (
            <button
              onClick={() => setIsAddingPost(true)}
              className="flex items-center space-x-2 px-4 py-2 bg-green-600 text-white font-semibold rounded-lg hover:bg-green-700 transition duration-200 shadow-md"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6"></path></svg>
              <span>Добавить Пост</span>
            </button>
          )}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {posts.map(post => (
            <div key={post.id} className="bg-gray-800 rounded-xl shadow-2xl overflow-hidden transform hover:scale-[1.02] transition duration-300 border border-gray-700">
              <img src={post.image} alt={post.title} className="w-full h-48 object-cover" onError={(e) => { e.target.onerror = null; e.target.src = "https://placehold.co/400x200/374151/ffffff?text=Изображение+Недоступно"; }} />
              <div className="p-5">
                <h2 className="text-xl font-bold text-white mb-2 flex items-center">
                  {post.title}
                  {post.isPremium && <span className="ml-2 text-yellow-500 text-lg" title="Премиум-пост">💎</span>}
                </h2>
                <p className="text-gray-400 text-sm mb-4 line-clamp-2">{post.excerpt}</p>
                <div className="flex justify-between items-center">
                  <button
                    onClick={() => setSelectedPost(post)}
                    className="text-indigo-400 hover:text-indigo-300 font-semibold transition duration-200 flex items-center"
                  >
                    Читать далее...
                  </button>
                  <button
                    onClick={() => handleToggleFavorite(post.id)}
                    className={`p-2 rounded-full transition duration-200 ${user.favorites.includes(post.id) ? 'text-pink-500 bg-pink-100/10' : 'text-gray-500 hover:text-pink-400'}`}
                    title={user.favorites.includes(post.id) ? 'В избранном' : 'Добавить в избранное'}
                    disabled={!isAuthenticated}
                  >
                    <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24"><path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/></svg>
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
        {isAddingPost && AddPostModal()}
      </div>
    );
  };

  // --- Страница 5: Справедливые цены компаний (Fair Prices) ---
  const FairPricesPage = () => {
    if (!user.isPremium) return <GatedContent navigate={navigate} />;

    // Таблица
    return (
      <div className="p-8 max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold text-white mb-6 border-b border-gray-700 pb-2">Справедливые Цены Компаний (Премиум)</h1>
        <p className="text-yellow-400 mb-6">Текущая цена обновляется раз в час (имитация внешнего источника). Справедливая цена заполняется вручную.</p>

        <div className="overflow-x-auto rounded-xl shadow-2xl border border-gray-700">
          <table className="min-w-full divide-y divide-gray-700">
            <thead className="bg-gray-800">
            <tr>
              {['Компания', 'Справедливая Цена ($)', 'Текущая Цена ($)', 'Разница (%)', 'Статус'].map(header => (
                <th key={header} className="px-6 py-3 text-left text-xs font-semibold text-gray-300 uppercase tracking-wider">{header}</th>
              ))}
            </tr>
            </thead>
            <tbody className="bg-gray-900 divide-y divide-gray-700">
            {fairPrices.map((item) => {
              const diff = (item.currentPrice - item.fairPrice) / item.fairPrice * 100;
              const statusColor = diff < -5 ? 'text-green-400' : diff > 5 ? 'text-red-400' : 'text-yellow-400';
              const statusText = diff < -5 ? 'Сильно недооценена' : diff > 5 ? 'Сильно переоценена' : diff < 0 ? 'Недооценена' : diff > 0 ? 'Переоценена' : 'Справедливая';

              return (
                <tr key={item.id} className="hover:bg-gray-800 transition duration-150">
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-indigo-400">{item.company}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-300">${item.fairPrice.toFixed(2)}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-300">${item.currentPrice.toFixed(2)}</td>
                  <td className={`px-6 py-4 whitespace-nowrap text-sm font-semibold ${statusColor}`}>{diff.toFixed(2)}%</td>
                  <td className={`px-6 py-4 whitespace-nowrap text-sm ${statusColor}`}>{statusText}</td>
                </tr>
              );
            })}
            </tbody>
          </table>
        </div>
      </div>
    );
  };

  // --- Страница 6: Текущий портфель (Current Portfolio) ---
  const PortfolioPage = () => {
    if (!user.isPremium) return <GatedContent navigate={navigate} />;

    const totalShare = mockPortfolio.reduce((acc, item) => acc + item.share, 0);

    // Simple Chart Visualization (Simulated using CSS)
    const ChartSim = () => (
      <div className="flex flex-col items-center bg-gray-800 p-6 rounded-xl shadow-inner border border-gray-700">
        <h3 className="text-xl font-bold text-white mb-4">Доли в Портфеле</h3>
        <div className="relative w-48 h-48 rounded-full shadow-xl overflow-hidden border-4 border-gray-700">
          {mockPortfolio.reduce((acc, item, index) => {
            const lastAngle = acc.length > 0 ? acc[acc.length - 1].endAngle : 0;
            const angle = (item.share / totalShare) * 360;
            const color = ['#34D399', '#60A5FA', '#FBBF24', '#EF4444'][index % 4];
            const startAngle = lastAngle;
            const endAngle = lastAngle + angle;

            // This is a simplified, non-SVG CSS hack for a pie chart, for demonstration purposes.
            // A real solution would use a library (like Recharts in React).
            acc.push({ startAngle, endAngle, color, item });
            return acc;
          }, []).map((segment, index) => (
            <div
              key={index}
              style={{
                '--segment-color': segment.color,
                '--start-angle': `${segment.startAngle}deg`,
                '--end-angle': `${segment.endAngle}deg`,
                // Using conic gradient for a simple pie chart visualization
                background: `conic-gradient(
                                ${mockPortfolio.map((p, i) => {
                  const color = ['#34D399', '#60A5FA', '#FBBF24', '#EF4444'][i % 4];
                  const percent = mockPortfolio.slice(0, i + 1).reduce((sum, item) => sum + item.share, 0);
                  return `${color} ${percent}%`;
                }).join(', ')}
                            )`
              }}
              className="absolute inset-0 rounded-full"
            />
          ))}
        </div>
        <div className="mt-4 w-full">
          {mockPortfolio.map((item, index) => (
            <div key={index} className="flex justify-between items-center py-1 text-sm">
                        <span className="flex items-center">
                            <span className="inline-block w-3 h-3 rounded-full mr-2" style={{ backgroundColor: ['#34D399', '#60A5FA', '#FBBF24', '#EF4444'][index % 4] }}></span>
                          {item.company}
                        </span>
              <span className="font-semibold text-white">{item.share}%</span>
            </div>
          ))}
        </div>
      </div>
    );


    return (
      <div className="p-8 max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold text-white mb-6 border-b border-gray-700 pb-2">Текущий Портфель (Премиум)</h1>
        <p className="text-gray-400 mb-8">Текущая структура инвестиционного портфеля. Обновляется ежедневно.</p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div>
            <ChartSim />
          </div>
          <div className="overflow-x-auto rounded-xl shadow-2xl border border-gray-700">
            <table className="min-w-full divide-y divide-gray-700">
              <thead className="bg-gray-800">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-semibold text-gray-300 uppercase tracking-wider">Компания</th>
                <th className="px-6 py-3 text-right text-xs font-semibold text-gray-300 uppercase tracking-wider">Доля (%)</th>
              </tr>
              </thead>
              <tbody className="bg-gray-900 divide-y divide-gray-700">
              {mockPortfolio.map((item, index) => (
                <tr key={index} className="hover:bg-gray-800 transition duration-150">
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-indigo-400">{item.company}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-right font-semibold text-gray-300">{item.share.toFixed(0)}%</td>
                </tr>
              ))}
              </tbody>
            </table>
            <div className="bg-gray-800 px-6 py-3 text-right text-sm font-bold text-white">
              Итого: {totalShare}%
            </div>
          </div>
        </div>
      </div>
    );
  };

  // --- Страница 7: Магазин (Store) ---
  const StorePage = () => {
    const handlePurchase = (months) => {
      if (!isAuthenticated) {
        setIsAuthModalOpen(true);
        setMessage('Пожалуйста, авторизуйтесь для совершения покупки.');
        return;
      }

      const price = subscriptionPrices[`${months}m`];
      // Имитация перехода к оплате
      alert(`Имитация оплаты: Переход на платежный сервис для покупки подписки на ${months} месяцев за ${price} руб.`);

      // В случае успешной оплаты (имитация):
      setPremiumForDemo(months * 30);
    };

    return (
      <div className="p-8 max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold text-white mb-6 border-b border-gray-700 pb-2">Магазин Премиум-доступа</h1>
        <p className="text-gray-300 mb-10 text-center">Получите полный доступ ко всем аналитическим материалам, прогнозам и портфелям. Выберите подходящий тариф:</p>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          {Object.entries(subscriptionPrices).map(([key, price]) => {
            const months = parseInt(key.replace('m', ''));
            return (
              <div key={key} className="bg-gray-800 p-6 rounded-xl shadow-2xl border border-indigo-600/50 flex flex-col items-center hover:shadow-indigo-500/30 transition duration-300 transform hover:scale-[1.03]">
                <span className="text-4xl font-extrabold text-indigo-400 mb-3">{months}</span>
                <h3 className="text-xl font-bold text-white mb-4">
                  {months === 1 ? 'Месяц' : months === 12 ? 'Год' : 'Месяцев'}
                </h3>
                <p className="text-3xl font-extrabold text-white mb-6">{price} ₽</p>
                <ul className="text-gray-400 text-sm mb-6 space-y-1 w-full text-center">
                  <li className="flex items-center justify-center"><span className="text-green-500 mr-2">✓</span> Полный доступ</li>
                  <li className="flex items-center justify-center"><span className="text-green-500 mr-2">✓</span> Избранное (15 постов)</li>
                </ul>
                <button
                  onClick={() => handlePurchase(months)}
                  className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-3 rounded-lg transition duration-300"
                >
                  Купить
                </button>
              </div>
            );
          })}
        </div>
        <div className="mt-8 text-center text-gray-500 text-sm">
          <p className="mb-2">Возможность регулировать цену (имитация): текущая цена за 1 месяц — <span className="font-bold text-white">{subscriptionPrices['1m']} ₽</span>.</p>
          <p>Платежный сервис прикручен (имитация перехода).</p>
        </div>
      </div>
    );
  };

  // --- Страница 8: Профиль (Profile) ---
  const ProfilePage = () => {
    if (!isAuthenticated) return (
      <div className="p-8 text-center max-w-lg mx-auto mt-10">
        <h2 className="text-2xl font-bold text-red-400 mb-4">Авторизация</h2>
        <p className="text-gray-300 mb-6">Для доступа к Профилю необходимо войти в систему.</p>
        <button
          onClick={() => setIsAuthModalOpen(true)}
          className="bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-3 px-6 rounded-lg transition duration-300 shadow-md"
        >
          Войти
        </button>
      </div>
    );

    const { status, premiumEndDate, isPremium, favorites } = user;
    const isPremiumStatus = status === 'premium' || status === 'author' || status === 'emitter' || isPremium;

    const daysLeft = isPremium ? Math.ceil((premiumEndDate.getTime() - Date.now()) / (1000 * 60 * 60 * 24)) : 0;
    const maxFavorites = isPremiumStatus ? 15 : 5;
    const profileFavorites = posts.filter(p => favorites.includes(p.id)).slice(0, maxFavorites);
    const avatarUrl = "https://placehold.co/128x128/374151/ffffff?text=AV";

    // Иконки статусов
    const statusIcons = {
      reader: { icon: '🔍', color: 'text-gray-400', title: 'Читатель' },
      premium: { icon: '💎', color: 'text-yellow-400', title: 'Премиум' },
      author: { icon: '🖋️', color: 'text-green-400', title: 'Автор' },
      emitter: { icon: '✅', color: 'text-blue-400', title: 'Эмитент' },
      admin: { icon: '👑', color: 'text-red-500', title: 'Админ' },
    };

    const currentStatus = statusIcons[status] || statusIcons.reader;

    const handleAvatarChange = () => {
      alert('Имитация: Поле для загрузки аватара.');
    }

    return (
      <div className="p-8 max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold text-white mb-6 border-b border-gray-700 pb-2">Личный Профиль</h1>

        <div className="bg-gray-800 p-8 rounded-xl shadow-2xl border border-gray-700 flex flex-col md:flex-row items-start space-y-6 md:space-y-0 md:space-x-8">
          <div className="relative flex-shrink-0">
            <img
              src={avatarUrl}
              alt="Аватар"
              className="w-32 h-32 rounded-full object-cover border-4 border-indigo-500 cursor-pointer"
              onClick={handleAvatarChange}
            />
            <span title={currentStatus.title} className={`absolute bottom-0 right-0 text-3xl p-1 rounded-full bg-gray-900 border-2 border-gray-700 ${currentStatus.color}`}>
                    {currentStatus.icon}
                </span>
          </div>

          <div className="flex-grow">
            <h2 className="text-3xl font-extrabold text-white mb-2">{user.name}</h2>
            <div className="flex items-center space-x-2 text-lg text-gray-300 mb-4">
              <span className="font-semibold">Статус:</span>
              <span className={`font-bold ${currentStatus.color}`}>{currentStatus.title}</span>
            </div>

            {isPremiumStatus && (
              <div className="p-4 bg-indigo-900/50 rounded-lg mb-4 border border-indigo-700">
                <p className="text-lg font-semibold text-indigo-300">
                  Премиум Активен
                </p>
                <p className="text-sm text-gray-300 mt-1">
                  Дней до конца: <span className="font-bold text-yellow-300">{daysLeft}</span>
                </p>
              </div>
            )}
            {!isPremiumStatus && status === 'reader' && (
              <div className="p-4 bg-red-900/50 rounded-lg mb-4 border border-red-700">
                <p className="text-lg font-semibold text-red-300">
                  Базовый доступ
                </p>
                <button onClick={() => navigate('store')} className="text-sm text-yellow-400 hover:text-yellow-300 mt-1">
                  Перейти в Магазин для Премиум
                </button>
              </div>
            )}
          </div>
        </div>

        <div className="mt-8 bg-gray-800 p-6 rounded-xl shadow-2xl border border-gray-700">
          <h3 className="text-2xl font-bold text-white mb-4">Избранные Посты ({profileFavorites.length} / {maxFavorites})</h3>
          <ul className="space-y-3">
            {profileFavorites.length > 0 ? profileFavorites.map(post => (
              <li key={post.id} className="p-3 bg-gray-700 rounded-lg flex justify-between items-center hover:bg-gray-600 transition duration-150">
                <span className="text-gray-300 font-medium cursor-pointer" onClick={() => navigate('posts')}>{post.title}</span>
                <button
                  onClick={() => handleToggleFavorite(post.id)}
                  className="text-pink-400 hover:text-pink-300"
                >
                  Удалить
                </button>
              </li>
            )) : (
              <p className="text-gray-500">Список избранного пуст.</p>
            )}
          </ul>
        </div>
      </div>
    );
  };

  // --- Админ-панель (Simulated) ---
  const AdminPanel = () => {
    const handleRoleChange = () => {
      setUser(u => ({ ...u, status: adminStatusInput, isPremium: ['premium', 'author', 'emitter', 'admin'].includes(adminStatusInput) }));
      setMessage(`Статус пользователя изменен на: ${adminStatusInput}.`);
    };

    const handlePriceChange = () => {
      subscriptionPrices['1m'] = parseFloat(adminPriceInput);
      setMessage(`Цена подписки (1м) изменена на: ${adminPriceInput} ₽.`);
    };

    return (
      <div className="fixed bottom-0 right-0 p-4 bg-red-900/80 backdrop-blur-sm z-50 rounded-tl-xl shadow-2xl border-t-2 border-l-2 border-red-500">
        <h3 className="text-lg font-bold text-white mb-3">🛠️ Админ-панель (DEMO)</h3>
        <div className="space-y-3 text-sm">
          <div className="p-2 bg-red-900 rounded-lg">
            <label className="block text-red-300 mb-1">Текущая роль:</label>
            <select
              value={adminStatusInput}
              onChange={(e) => setAdminStatusInput(e.target.value)}
              className="w-full p-1 bg-gray-700 border border-gray-600 rounded text-white"
            >
              {Object.keys(statusIcons).map(role => <option key={role} value={role}>{role} ({statusIcons[role].title})</option>)}
            </select>
            <button onClick={handleRoleChange} className="mt-2 w-full bg-red-600 hover:bg-red-700 text-white py-1 rounded">Сменить роль</button>
          </div>
          <div className="p-2 bg-red-900 rounded-lg">
            <label className="block text-red-300 mb-1">Цена 1м (₽):</label>
            <input
              type="number"
              value={adminPriceInput}
              onChange={(e) => setAdminPriceInput(e.target.value)}
              className="w-full p-1 bg-gray-700 border border-gray-600 rounded text-white"
            />
            <button onClick={handlePriceChange} className="mt-2 w-full bg-red-600 hover:bg-red-700 text-white py-1 rounded">Изменить цену</button>
          </div>
          <p className="text-xs text-red-200">Текущий пользователь: {user.name} ({user.status})</p>
        </div>
      </div>
    );
  };

  // --- Основной рендер контента ---
  const renderPage = () => {
    switch (currentPage) {
      case 'home':
        return <HomePage />;
      case 'multipliers':
        return <MultipliersPage />;
      case 'historical':
        return <HistoricalPage />;
      case 'posts':
        return <PostsPage />;
      case 'fairPrices':
        return <FairPricesPage />;
      case 'portfolio':
        return <PortfolioPage />;
      case 'store':
        return <StorePage />;
      case 'profile':
        return <ProfilePage />;
      default:
        return <HomePage />;
    }
  };

  // --- Auth Modal Component (Simulated) ---
  const AuthModal = () => (
    <div className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center z-[100]">
      <div className="bg-gray-900 p-8 rounded-xl shadow-2xl w-full max-w-sm border border-indigo-500">
        <h2 className="text-2xl font-bold text-white mb-6">Авторизация</h2>
        <p className="text-gray-400 mb-6">Имитация авторизации. Нажмите, чтобы войти как тестовый пользователь.</p>
        <div className="space-y-4">
          <button
            onClick={() => {setUser({ ...initialUser, id: 'user-123', status: 'reader', name: 'Тест-Читатель', isPremium: false }); setIsAuthModalOpen(false); setMessage('Вы вошли как Тест-Читатель.');}}
            className="w-full py-3 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700"
          >
            Войти (Читатель)
          </button>
          <button
            onClick={() => {setUser({ ...initialUser, id: 'admin-001', status: 'admin', name: 'Тест-Админ', isPremium: true }); setIsAuthModalOpen(false); setMessage('Вы вошли как Тест-Админ.');}}
            className="w-full py-3 bg-red-600 text-white rounded-lg hover:bg-red-700"
          >
            Войти (Админ)
          </button>
          <button
            onClick={() => {setUser({ ...initialUser, id: 'premium-555', status: 'premium', name: 'Тест-Премиум', isPremium: true }); setIsAuthModalOpen(false); setMessage('Вы вошли как Тест-Премиум.');}}
            className="w-full py-3 bg-yellow-600 text-white rounded-lg hover:bg-yellow-700"
          >
            Войти (Премиум)
          </button>
        </div>
        <button onClick={() => setIsAuthModalOpen(false)} className="mt-4 w-full text-gray-400 hover:text-gray-300">Закрыть</button>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-950 font-sans text-white">
      <script src="https://cdn.tailwindcss.com"></script>
      {/* Контейнер для сообщений */}
      {message && (
        <div className="fixed top-2 right-4 z-[110] p-4 bg-green-600 text-white rounded-lg shadow-xl transition-opacity duration-300" onClick={() => setMessage('')}>
          {message}
        </div>
      )}

      {isAuthModalOpen && <AuthModal />}

      <Header />

      <main className="container mx-auto px-4 py-8">
        {renderPage()}
      </main>

      <Footer />

      {/* Админ-панель видна только Админу */}
      {isAdminOrAbove && <AdminPanel />}
    </div>
  );
}
