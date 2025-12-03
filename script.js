// Exchange rates (KGS based)
const rates = {
    KGS: { buy: 1, sell: 1, name: 'Кыргызский сом' },
    USD: { buy: 87.2, sell: 87.7, name: 'Доллар США' },
    EUR: { buy: 101.3, sell: 102.3, name: 'Евро' },
    RUB: { buy: 1.12, sell: 1.15, name: 'Российский рубль' },
    KZT: { buy: 0.14, sell: 0.175, name: 'Казахстанский тенге' },
    GBP: { buy: 110.5, sell: 111.5, name: 'Фунт стерлингов' },
    CNY: { buy: 12.0, sell: 12.3, name: 'Китайский юань' }
};

const flagClasses = {
    KGS: 'flag-kg',
    USD: 'flag-us',
    EUR: 'flag-eu',
    RUB: 'flag-ru',
    KZT: 'flag-kz',
    GBP: 'flag-gb',
    CNY: 'flag-cn'
};

// Current state
let fromCurrency = 'KGS';
let toCurrency = 'USD';
let activeInput = null;

// DOM Elements
const fromAmountInput = document.getElementById('fromAmount');
const toAmountInput = document.getElementById('toAmount');
const fromCurrencyBtn = document.getElementById('fromCurrencyBtn');
const toCurrencyBtn = document.getElementById('toCurrencyBtn');
const swapBtn = document.getElementById('swapBtn');
const modal = document.getElementById('currencyModal');
const currencyList = document.getElementById('currencyList');
const modalClose = document.getElementById('modalClose');
const tabs = document.querySelectorAll('.tab');

// Initialize
function init() {
    renderCurrencyList();
    updateRatesTable();
    setupEventListeners();
    convert();
    updateDateTime();
}

// Setup Event Listeners
function setupEventListeners() {
    fromAmountInput.addEventListener('input', handleFromInput);
    fromCurrencyBtn.addEventListener('click', () => openModal('from'));
    toCurrencyBtn.addEventListener('click', () => openModal('to'));
    swapBtn.addEventListener('click', swapCurrencies);
    modalClose.addEventListener('click', closeModal);
    document.querySelector('.modal-overlay')?.addEventListener('click', closeModal);
    
    // Tab clicks
    tabs.forEach(tab => {
        tab.addEventListener('click', () => {
            tabs.forEach(t => t.classList.remove('active'));
            tab.classList.add('active');
        });
    });
    
    // Close modal on escape
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') closeModal();
    });
}

// Render currency list in modal
function renderCurrencyList() {
    currencyList.innerHTML = Object.keys(rates).map(code => `
        <div class="currency-option" data-code="${code}">
            <span class="flag ${flagClasses[code]}"></span>
            <span class="currency-info">
                <span class="code">${code}</span>
                <span class="name">${rates[code].name}</span>
            </span>
        </div>
    `).join('');
    
    // Add click listeners
    currencyList.querySelectorAll('.currency-option').forEach(option => {
        option.addEventListener('click', () => selectCurrency(option.dataset.code));
    });
}

// Open currency modal
function openModal(type) {
    activeInput = type;
    const selectedCode = type === 'from' ? fromCurrency : toCurrency;
    
    // Update selected state
    currencyList.querySelectorAll('.currency-option').forEach(option => {
        option.classList.toggle('selected', option.dataset.code === selectedCode);
    });
    
    modal.classList.add('active');
}

// Close modal
function closeModal() {
    modal.classList.remove('active');
    activeInput = null;
}

// Select currency
function selectCurrency(code) {
    if (activeInput === 'from') {
        fromCurrency = code;
        updateCurrencyButton(fromCurrencyBtn, code);
    } else {
        toCurrency = code;
        updateCurrencyButton(toCurrencyBtn, code);
    }
    
    closeModal();
    convert();
}

// Update currency button display
function updateCurrencyButton(btn, code) {
    const flag = btn.querySelector('.flag');
    const text = btn.querySelector('.currency-text');
    
    flag.className = `flag ${flagClasses[code]}`;
    text.textContent = code;
    btn.dataset.code = code;
}

// Swap currencies
function swapCurrencies() {
    const temp = fromCurrency;
    fromCurrency = toCurrency;
    toCurrency = temp;
    
    updateCurrencyButton(fromCurrencyBtn, fromCurrency);
    updateCurrencyButton(toCurrencyBtn, toCurrency);
    
    // Swap values
    const tempVal = fromAmountInput.value;
    fromAmountInput.value = toAmountInput.value;
    
    convert();
}

// Handle from input
function handleFromInput() {
    convert();
}

// Convert currency
function convert() {
    const value = parseFloat(fromAmountInput.value.replace(',', '.')) || 0;
    
    let result;
    
    if (fromCurrency === 'KGS') {
        // Converting from KGS to other currency
        result = value / rates[toCurrency].sell;
    } else if (toCurrency === 'KGS') {
        // Converting from other currency to KGS
        result = value * rates[fromCurrency].buy;
    } else {
        // Converting between two foreign currencies via KGS
        const inKGS = value * rates[fromCurrency].buy;
        result = inKGS / rates[toCurrency].sell;
    }
    
    toAmountInput.value = formatNumber(result);
}

// Format number
function formatNumber(num) {
    if (num === 0) return '0';
    if (num < 0.01) return num.toFixed(4);
    if (num < 1) return num.toFixed(3);
    if (num < 100) return num.toFixed(2);
    return num.toFixed(1);
}

// Update rates table from API
async function updateRatesTable() {
    try {
        const response = await fetch('https://api.exchangerate-api.com/v4/latest/KGS');
        const data = await response.json();
        
        // Update table with real rates (approximated buy/sell spread)
        const tableBody = document.getElementById('ratesTableBody');
        const currencies = ['USD', 'EUR', 'KZT', 'RUB'];
        
        tableBody.innerHTML = currencies.map(code => {
            const rate = 1 / data.rates[code];
            const buyRate = (rate * 0.995).toFixed(code === 'KZT' ? 3 : 2);
            const sellRate = (rate * 1.005).toFixed(code === 'KZT' ? 3 : 2);
            
            // Update internal rates
            rates[code].buy = parseFloat(buyRate);
            rates[code].sell = parseFloat(sellRate);
            
            return `
                <div class="table-row">
                    <div class="td-currency">
                        <span class="currency-code">${code}</span>
                        <span class="currency-name">${rates[code].name}</span>
                    </div>
                    <div class="td-buy">${buyRate}</div>
                    <div class="td-sell">${sellRate}</div>
                </div>
            `;
        }).join('');
        
        convert();
    } catch (error) {
        console.log('Using default rates');
    }
}

// Update date/time display
function updateDateTime() {
    const now = new Date();
    const dateStr = now.toLocaleDateString('ru-RU', {
        day: '2-digit',
        month: '2-digit',
        year: 'numeric'
    });
    const timeStr = now.toLocaleTimeString('ru-RU', {
        hour: '2-digit',
        minute: '2-digit'
    });
    
    document.getElementById('ratesDate').textContent = `на ${timeStr} ${dateStr}`;
}

// Start app
init();
