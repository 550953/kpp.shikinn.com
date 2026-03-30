// Маршруты и компоненты
const routes = {
    dashboard: { title: 'Дашборд', file: 'pages/dashboard.html' },
    journal: { title: 'Журнал въездов/выездов', file: 'pages/journal.html' },
    monitoring: { title: 'Мониторинг', file: 'pages/monitoring.html' },
    statistics: { title: 'Статистика', file: 'pages/statistics.html' },
    cameras: { title: 'Камеры', file: 'pages/cameras.html' },
    devices: { title: 'Устройства', file: 'pages/devices.html' },
    pos: { title: 'POS терминалы', file: 'pages/pos.html' },
    tariffs: { title: 'Тарифы', file: 'pages/tariffs.html' },
    alerts: { title: 'Список оповещения', file: 'pages/alerts.html' },
    blacklist: { title: 'Черный список', file: 'pages/blacklist.html' },
    whitelist: { title: 'Белый список', file: 'pages/whitelist.html' },
    subscriptions: { title: 'Абонементы', file: 'pages/subscriptions.html' },
    payments: { title: 'Платежи', file: 'pages/payments.html' }
};

let currentPage = 'dashboard';

// Загрузка контента страницы
async function loadPage(page) {
    const route = routes[page];
    if (!route) return;
    
    currentPage = page;
    document.getElementById('pageTitle').innerText = route.title;
    
    // Обновляем активный пункт меню
    document.querySelectorAll('.nav-item').forEach(item => {
        if (item.dataset.page === page) {
            item.classList.add('active');
        } else {
            item.classList.remove('active');
        }
    });
    
    const contentDiv = document.getElementById('appContent');
    contentDiv.innerHTML = '<div class="loading">Загрузка...</div>';
    
    try {
        const response = await fetch(route.file);
        const html = await response.text();
        contentDiv.innerHTML = html;
        
        // Инициализируем скрипты для загруженной страницы
        if (window.initPage && typeof window.initPage === 'function') {
            window.initPage(page);
        }
        
        // Обновляем URL без перезагрузки
        window.history.pushState({ page }, '', `#${page}`);
    } catch (error) {
        contentDiv.innerHTML = '<div class="loading">Ошибка загрузки страницы</div>';
    }
}

// Обработка навигации
function initRouting() {
    // Обработка кликов по меню
    document.querySelectorAll('.nav-item').forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const page = link.dataset.page;
            if (page) loadPage(page);
        });
    });
    
    // Обработка кнопки назад/вперед
    window.addEventListener('popstate', (e) => {
        const hash = window.location.hash.slice(1);
        if (hash && routes[hash]) {
            loadPage(hash);
        } else {
            loadPage('dashboard');
        }
    });
    
    // Загрузка начальной страницы
    const hash = window.location.hash.slice(1);
    if (hash && routes[hash]) {
        loadPage(hash);
    } else {
        loadPage('dashboard');
    }
}

// Обновление времени
function updateDateTime() {
    const now = new Date();
    const datetimeStr = now.toLocaleString('ru-RU', {
        day: '2-digit',
        month: '2-digit',
        year: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
    });
    const elem = document.getElementById('datetime');
    if (elem) elem.innerText = datetimeStr;
}

// Инициализация
document.addEventListener('DOMContentLoaded', () => {
    initRouting();
    updateDateTime();
    setInterval(updateDateTime, 1000);
    
    // Кнопка обновления
    document.getElementById('refreshBtn')?.addEventListener('click', () => {
        loadPage(currentPage);
    });
});