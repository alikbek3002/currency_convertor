import { useState, useEffect } from 'react';
import { tableCurrencies } from '../data/currencies';

function RatesTable({ rates }) {
    const [dateStr, setDateStr] = useState('');

    useEffect(() => {
        const now = new Date();
        const date = now.toLocaleDateString('ru-RU', {
            day: '2-digit',
            month: '2-digit',
            year: 'numeric',
        });
        const time = now.toLocaleTimeString('ru-RU', {
            hour: '2-digit',
            minute: '2-digit',
        });
        setDateStr(`на ${time} ${date}`);
    }, []);

    const today = new Date().toISOString().split('T')[0];

    return (
        <section className="rates-section">
            <div className="rates-header">
                <div className="rates-title">
                    <span>Курсы валют</span>
                    <span className="rates-date">{dateStr}</span>
                </div>
                <div className="archive-section">
                    <span className="archive-label">Архив курсов:</span>
                    <div className="date-picker">
                        <input type="date" defaultValue={today} />
                    </div>
                </div>
            </div>

            <div className="rates-table">
                <div className="table-header">
                    <div className="th-currency">Валюта</div>
                    <div className="th-buy">Покупка</div>
                    <div className="th-sell">Продажа</div>
                </div>
                <div className="table-body">
                    {tableCurrencies.map((code) => (
                        <div key={code} className="table-row">
                            <div className="td-currency">
                                <span className="currency-code">{code}</span>
                                <span className="currency-name">{rates[code]?.name}</span>
                            </div>
                            <div className="td-buy">
                                {code === 'KZT' ? rates[code]?.buy.toFixed(3) : rates[code]?.buy.toFixed(2)}
                            </div>
                            <div className="td-sell">
                                {code === 'KZT' ? rates[code]?.sell.toFixed(3) : rates[code]?.sell.toFixed(2)}
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}

export default RatesTable;
