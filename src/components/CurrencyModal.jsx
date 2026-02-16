import { useEffect } from 'react';
import { flagClasses } from '../data/currencies';

function CurrencyModal({ isOpen, rates, selectedCode, onSelect, onClose }) {
    // Close on Escape key
    useEffect(() => {
        const handleKeyDown = (e) => {
            if (e.key === 'Escape') onClose();
        };
        if (isOpen) {
            document.addEventListener('keydown', handleKeyDown);
        }
        return () => document.removeEventListener('keydown', handleKeyDown);
    }, [isOpen, onClose]);

    if (!isOpen) return null;

    return (
        <div className="modal active">
            <div className="modal-overlay" onClick={onClose}></div>
            <div className="modal-content">
                <div className="modal-header">
                    <h3>Выберите валюту</h3>
                    <button className="modal-close" onClick={onClose}>&times;</button>
                </div>
                <div className="modal-body">
                    {Object.keys(rates).map((code) => (
                        <div
                            key={code}
                            className={`currency-option${code === selectedCode ? ' selected' : ''}`}
                            onClick={() => onSelect(code)}
                        >
                            <span className={`flag ${flagClasses[code]}`}></span>
                            <span className="currency-info">
                                <span className="code">{code}</span>
                                <span className="name">{rates[code].name}</span>
                            </span>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}

export default CurrencyModal;
