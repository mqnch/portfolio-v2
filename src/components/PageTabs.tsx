'use client';

import { useState, ReactNode } from 'react';

type TabId = 'about' | 'projects' | 'writing';

type PageTabsProps = {
  about: ReactNode;
  projects: ReactNode;
  writing: ReactNode;
};

const tabs: { id: TabId; label: string }[] = [
  { id: 'about', label: 'about' },
  { id: 'projects', label: 'projects' },
  { id: 'writing', label: 'writing' },
];

export default function PageTabs({ about, projects, writing }: PageTabsProps) {
  const [activeTab, setActiveTab] = useState<TabId>('about');

  const renderContent = () => {
    switch (activeTab) {
      case 'projects':
        return projects;
      case 'writing':
        return writing;
      case 'about':
      default:
        return about;
    }
  };

  return (
    <main className="relative min-h-screen w-full flex flex-col items-center justify-start text-white px-4 pt-8 pb-10 md:px-8 md:pt-36 lg:pt-48">
      <div className="max-w-2xl w-full space-y-8">
        <nav
          className="flex items-center justify-between text-xs font-mono text-gray-500 tracking-[0.15em] uppercase"
          role="tablist"
          aria-label="Primary"
        >
          <div className="flex items-center gap-2">
            <img
              src="/logo.svg"
              alt="Felix Pan logo"
              className="h-3 w-3 md:h-4 md:w-4"
            />
            <span className="text-gray-300 tracking-tight normal-case font-medium">
              felix pan
            </span>
          </div>
          <div className="flex gap-6">
            {tabs.map((tab) => {
              const isActive = tab.id === activeTab;
              return (
                <button
                  key={tab.id}
                  type="button"
                  role="tab"
                  aria-selected={isActive}
                  tabIndex={isActive ? 0 : -1}
                  onClick={() => setActiveTab(tab.id)}
                  className={`border-b text-[0.7rem] font-mono uppercase tracking-[0.15em] transition-colors ${
                    isActive
                      ? 'border-gray-600 text-gray-300'
                      : 'border-transparent text-gray-500 hover:border-gray-600 hover:text-gray-300'
                  }`}
                >
                  {tab.label}
                </button>
              );
            })}
          </div>
        </nav>

        <div
          role="tabpanel"
          aria-labelledby={activeTab}
          className={`transition-opacity duration-150 ${
            activeTab === 'projects' 
              ? 'md:overflow-visible overflow-y-auto max-h-[calc(100vh-12rem)] md:max-h-none' 
              : ''
          }`}
        >
          {renderContent()}
        </div>
      </div>
    </main>
  );
}