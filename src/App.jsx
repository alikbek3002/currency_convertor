import { useState, useEffect, useCallback } from 'react';
import Header from './components/Header';
import Tabs from './components/Tabs';
import RatesTable from './components/RatesTable';
import Converter from './components/Converter';
import CurrencyModal from './components/CurrencyModal';
import Footer from './components/Footer';
import { defaultRates, fetchRates, convert, formatNumber } from './data/currencies';
import './App.css';

function App() {
  const [rates, setRates] = useState(defaultRates);
  const [activeTab, setActiveTab] = useState('cash');
  const [fromCurrency, setFromCurrency] = useState('KGS');
  const [toCurrency, setToCurrency] = useState('USD');
  const [fromAmount, setFromAmount] = useState('87,7');
  const [toAmount, setToAmount] = useState('1');
  const [modalOpen, setModalOpen] = useState(false);
  const [modalTarget, setModalTarget] = useState(null); // 'from' or 'to'

  // Fetch real rates on mount
  useEffect(() => {
    fetchRates(defaultRates).then((updated) => {
      setRates(updated);
    });
  }, []);

  // Recalculate conversion whenever relevant state changes
  const doConvert = useCallback(() => {
    const value = parseFloat(fromAmount.replace(',', '.')) || 0;
    const result = convert(fromCurrency, toCurrency, value, rates);
    setToAmount(formatNumber(result));
  }, [fromAmount, fromCurrency, toCurrency, rates]);

  useEffect(() => {
    doConvert();
  }, [doConvert]);

  const handleFromAmountChange = (value) => {
    setFromAmount(value);
  };

  const handleSwap = () => {
    setFromCurrency(toCurrency);
    setToCurrency(fromCurrency);
    setFromAmount(toAmount);
  };

  const openCurrencyModal = (target) => {
    setModalTarget(target);
    setModalOpen(true);
  };

  const selectCurrency = (code) => {
    if (modalTarget === 'from') {
      setFromCurrency(code);
    } else {
      setToCurrency(code);
    }
    setModalOpen(false);
    setModalTarget(null);
  };

  const closeModal = () => {
    setModalOpen(false);
    setModalTarget(null);
  };

  return (
    <div className="container">
      <Header />
      <Tabs activeTab={activeTab} onTabChange={setActiveTab} />
      <main className="main-content">
        <RatesTable rates={rates} />
        <Converter
          fromCurrency={fromCurrency}
          toCurrency={toCurrency}
          fromAmount={fromAmount}
          toAmount={toAmount}
          onFromAmountChange={handleFromAmountChange}
          onSwap={handleSwap}
          onOpenFromCurrency={() => openCurrencyModal('from')}
          onOpenToCurrency={() => openCurrencyModal('to')}
        />
      </main>
      <CurrencyModal
        isOpen={modalOpen}
        rates={rates}
        selectedCode={modalTarget === 'from' ? fromCurrency : toCurrency}
        onSelect={selectCurrency}
        onClose={closeModal}
      />
      <Footer />
    </div>
  );
}

export default App;
