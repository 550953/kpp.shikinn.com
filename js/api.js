// Заглушка для API — потом заменишь на реальные запросы к серверу
const API = {
    baseUrl: '/api', // Потом заменишь на реальный URL
    
    // Получить журнал
    async getJournal(params = {}) {
        // return fetch(`${this.baseUrl}/journal?${new URLSearchParams(params)}`).then(r => r.json());
        return mockJournalData; // временно
    },
    
    // Получить текущие сессии (мониторинг)
    async getSessions() {
        return mockSpots;
    },
    
    // Получить тарифы
    async getTariffs() {
        return mockTariffs;
    },
    
    // Сохранить тариф
    async saveTariff(data) {
        // return fetch(`${this.baseUrl}/tariffs`, { method: 'POST', body: JSON.stringify(data) });
        console.log('Сохранение тарифа:', data);
        return { success: true };
    },
    
    // Получить статистику для дашборда
    async getStats() {
        return {
            todayIncome: 12500,
            todayCars: 47,
            currentCars: 8,
            occupancyRate: 42
        };
    }
};