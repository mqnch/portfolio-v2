'use client';

import { useState, ReactNode, useRef, useEffect } from 'react';

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
  const [showScrollIndicator, setShowScrollIndicator] = useState(false);
  const [showScrollUpIndicator, setShowScrollUpIndicator] = useState(false);
  const tabPanelRef = useRef<HTMLDivElement>(null);

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

  // Check if content is scrollable and update scroll indicator
  useEffect(() => {
    const checkScroll = () => {
      if (tabPanelRef.current && activeTab === 'projects') {
        const { scrollTop, scrollHeight, clientHeight } = tabPanelRef.current;
        const hasMoreContent = scrollHeight > clientHeight && scrollTop + clientHeight < scrollHeight - 10;
        const canScrollUp = scrollTop > 10;
        setShowScrollIndicator(hasMoreContent);
        setShowScrollUpIndicator(canScrollUp);
      } else {
        setShowScrollIndicator(false);
        setShowScrollUpIndicator(false);
      }
    };

    // Check on mount and when tab changes
    checkScroll();
    
    // Check on scroll
    const tabPanel = tabPanelRef.current;
    if (tabPanel) {
      tabPanel.addEventListener('scroll', checkScroll);
      // Also check after a short delay to account for content loading
      const timeoutId = setTimeout(checkScroll, 100);
      return () => {
        tabPanel.removeEventListener('scroll', checkScroll);
        clearTimeout(timeoutId);
      };
    }
  }, [activeTab]);

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

        <div className="relative">
          <div
            ref={tabPanelRef}
            role="tabpanel"
            aria-labelledby={activeTab}
            className={`transition-opacity duration-150 ${
              activeTab === 'projects' 
                ? 'overflow-y-auto max-h-[calc(100vh-10rem)] md:max-h-[calc(100vh-26rem)] [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]' 
                : ''
            }`}
          >
            {renderContent()}
          </div>
          
          {/* Scroll up indicator arrow with gradient fade */}
          {activeTab === 'projects' && showScrollUpIndicator && (
            <div className="absolute top-0 left-0 right-0 pointer-events-none">
              <div className="relative h-16 bg-gradient-to-b from-black/60 to-transparent flex items-start justify-center pt-4">
                <div className="flex flex-col items-center animate-bounce">
                  <svg
                    className="w-5 h-5 text-gray-400"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M5 15l7-7 7 7"
                    />
                  </svg>
                </div>
              </div>
            </div>
          )}
          
          {/* Scroll down indicator arrow with gradient fade */}
          {activeTab === 'projects' && showScrollIndicator && (
            <div className="absolute bottom-0 left-0 right-0 pointer-events-none">
              <div className="relative h-16 bg-gradient-to-t from-black/60 to-transparent flex items-end justify-center pb-2">
                <div className="flex flex-col items-center animate-bounce">
                  <svg
                    className="w-5 h-5 text-gray-400"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M19 9l-7 7-7-7"
                    />
                  </svg>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </main>
  );
}