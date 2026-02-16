const tabs = [
    { id: 'cash', label: 'Наличные' },
    { id: 'noncash', label: 'Безналичные' },
    { id: 'nbkr', label: 'НБКР' },
];

function Tabs({ activeTab, onTabChange }) {
    return (
        <div className="tabs">
            {tabs.map((tab) => (
                <button
                    key={tab.id}
                    className={`tab${activeTab === tab.id ? ' active' : ''}`}
                    onClick={() => onTabChange(tab.id)}
                >
                    {tab.label}
                </button>
            ))}
        </div>
    );
}

export default Tabs;
