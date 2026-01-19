'use client';

import { useState } from 'react';
import HamburgerMenu from '../../components/atoms/HamburgerMenu';
import CalculateStatusTemplate from '../../components/templates/CaluculateSatusTemplate';

export default function CalculatorPage() {
    const [activeTab, setActiveTab] = useState<number>(0);

    const tabs = ['Tab 1', 'Tab 2', 'Tab 3', 'Tab 4', 'Tab 5', 'Tab 6'];

    return (
        <div style={{ maxWidth: '800px', margin: '0 auto', padding: '20px' }}>
            {/* ヘッダー */}
            <header style={{ display: 'flex', justifyContent: 'flex-end', marginBottom: '20px' }}>
                <HamburgerMenu />
            </header>
            <div style={{ maxWidth: '600px', margin: '0 auto', paddingTop: '40px' }}>
                {/* タブ */}
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '20px' }}>
                    {tabs.map((tab, index) => (
                        <button
                            key={index}
                            onClick={() => setActiveTab(index)}
                            style={{
                                padding: '8px 12px',
                                border: 'none',
                                borderBottom: activeTab === index ? '3px solid #0070f3' : '3px solid transparent',
                                background: 'transparent',
                                cursor: 'pointer',
                                fontWeight: activeTab === index ? 'bold' : 'normal',
                            }}
                        >
                            {tab}
                        </button>
                    ))}
                </div>

                {/* タブの中身 */}
                <div style={{ padding: '20px', border: '1px solid #ddd', borderRadius: '8px' }}>
                    {/* 共通コンポーネントを表示 */}
                    <CalculateStatusTemplate />
                </div>
            </div>
        </div>
    );
}
