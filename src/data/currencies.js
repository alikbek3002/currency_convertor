// Exchange rates (KGS based) - default values before API fetch
export const defaultRates = {
    KGS: { buy: 1, sell: 1, name: 'Кыргызский сом' },
    USD: { buy: 87.2, sell: 87.7, name: 'Доллар США' },
    EUR: { buy: 101.3, sell: 102.3, name: 'Евро' },
    RUB: { buy: 1.12, sell: 1.15, name: 'Российский рубль' },
    KZT: { buy: 0.14, sell: 0.175, name: 'Казахстанский тенге' },
    GBP: { buy: 110.5, sell: 111.5, name: 'Фунт стерлингов' },
    CNY: { buy: 12.0, sell: 12.3, name: 'Китайский юань' },
};

export const flagClasses = {
    KGS: 'flag-kg',
    USD: 'flag-us',
    EUR: 'flag-eu',
    RUB: 'flag-ru',
    KZT: 'flag-kz',
    GBP: 'flag-gb',
    CNY: 'flag-cn',
};

export const tableCurrencies = ['USD', 'EUR', 'KZT', 'RUB'];

export function formatNumber(num) {
    if (num === 0) return '0';
    if (num < 0.01) return num.toFixed(4);
    if (num < 1) return num.toFixed(3);
    if (num < 100) return num.toFixed(2);
    return num.toFixed(1);
}

export function convert(fromCurrency, toCurrency, value, rates) {
    if (fromCurrency === 'KGS') {
        return value / rates[toCurrency].sell;
    } else if (toCurrency === 'KGS') {
        return value * rates[fromCurrency].buy;
    } else {
        const inKGS = value * rates[fromCurrency].buy;
        return inKGS / rates[toCurrency].sell;
    }
}

export async function fetchRates(currentRates) {
    try {
        const response = await fetch('https://api.exchangerate-api.com/v4/latest/KGS');
        const data = await response.json();

        const updatedRates = { ...currentRates };

        for (const code of Object.keys(currentRates)) {
            if (code === 'KGS' || !data.rates[code]) continue;
            const rate = 1 / data.rates[code];
            updatedRates[code] = {
                ...updatedRates[code],
                buy: parseFloat((rate * 0.995).toFixed(code === 'KZT' ? 3 : 2)),
                sell: parseFloat((rate * 1.005).toFixed(code === 'KZT' ? 3 : 2)),
            };
        }

        return updatedRates;
    } catch {
        console.log('Using default rates');
        return currentRates;
    }
}
