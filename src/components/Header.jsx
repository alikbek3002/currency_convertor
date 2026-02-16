function Header() {
    return (
        <header className="header">
            <div className="header-content">
                <div className="logo">
                    <svg className="logo-icon" width="42" height="42" viewBox="0 0 64 64">
                        <circle cx="32" cy="32" r="30" fill="#fff" />
                        <text x="32" y="28" fontFamily="Arial, sans-serif" fontSize="14" fontWeight="bold" fill="#003d82" textAnchor="middle">KGS</text>
                        <path d="M22 36 L42 36 M38 32 L42 36 L38 40" stroke="#003d82" strokeWidth="3" fill="none" strokeLinecap="round" strokeLinejoin="round" />
                        <text x="32" y="54" fontFamily="Arial, sans-serif" fontSize="12" fontWeight="bold" fill="#003d82" textAnchor="middle">$€£</text>
                    </svg>
                </div>
                <div className="header-text">
                    <span>Конвертер валют</span>
                    <span className="header-subtitle">Национальный банк Кыргызской Республики</span>
                </div>
            </div>
        </header>
    );
}

export default Header;
