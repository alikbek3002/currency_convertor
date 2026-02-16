import { flagClasses } from '../data/currencies';

function Converter({
    fromCurrency,
    toCurrency,
    fromAmount,
    toAmount,
    onFromAmountChange,
    onSwap,
    onOpenFromCurrency,
    onOpenToCurrency,
}) {
    return (
        <section className="converter-section">
            <h2 className="converter-title">Конвертер валют</h2>

            <div className="converter-card">
                <div className="converter-row">
                    {/* From input */}
                    <div className="converter-input-group">
                        <label className="converter-label">Заплачу</label>
                        <div className="input-with-currency">
                            <input
                                type="text"
                                className="converter-input"
                                value={fromAmount}
                                onChange={(e) => onFromAmountChange(e.target.value)}
                                inputMode="decimal"
                            />
                            <button className="currency-select" onClick={onOpenFromCurrency}>
                                <span className={`flag ${flagClasses[fromCurrency]}`}></span>
                                <span className="currency-text">{fromCurrency}</span>
                                <svg className="chevron" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                    <polyline points="6 9 12 15 18 9"></polyline>
                                </svg>
                            </button>
                        </div>
                    </div>

                    {/* Swap button */}
                    <button className="swap-btn" onClick={onSwap}>
                        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                            <polyline points="17 1 21 5 17 9"></polyline>
                            <path d="M3 11V9a4 4 0 0 1 4-4h14"></path>
                            <polyline points="7 23 3 19 7 15"></polyline>
                            <path d="M21 13v2a4 4 0 0 1-4 4H3"></path>
                        </svg>
                    </button>

                    {/* To input */}
                    <div className="converter-input-group">
                        <label className="converter-label">Получу</label>
                        <div className="input-with-currency">
                            <input
                                type="text"
                                className="converter-input"
                                value={toAmount}
                                readOnly
                            />
                            <button className="currency-select" onClick={onOpenToCurrency}>
                                <span className={`flag ${flagClasses[toCurrency]}`}></span>
                                <span className="currency-text">{toCurrency}</span>
                                <svg className="chevron" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                    <polyline points="6 9 12 15 18 9"></polyline>
                                </svg>
                            </button>
                        </div>
                    </div>
                </div>
            </div>

            {/* Action Cards */}
            <div className="action-cards">
                <div className="action-card">
                    <span>Условия и комиссии</span>
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#ccc" strokeWidth="2">
                        <polyline points="9 18 15 12 9 6"></polyline>
                    </svg>
                </div>
                <div className="action-card">
                    <span>Индивидуальный обменный курс</span>
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#ccc" strokeWidth="2">
                        <polyline points="9 18 15 12 9 6"></polyline>
                    </svg>
                </div>
            </div>
        </section>
    );
}

export default Converter;
