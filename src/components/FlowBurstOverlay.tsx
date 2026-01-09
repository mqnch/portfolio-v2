'use client';

import React, { useState } from 'react';
import Flow from '@/components/Flow';

const FlowBurstOverlay: React.FC = () => {
  const [burstMode, setBurstMode] = useState(false);

  return (
    <>
      <Flow burstMode={burstMode} />
      <button
        type="button"
        className="fixed bottom-6 right-6 z-50 rounded-full border border-gray-800 bg-black/40 px-3 py-1.5 text-[0.65rem] font-mono uppercase tracking-[0.15em] text-gray-300 backdrop-blur-sm hover:bg-black/60 active:bg-black"
        onMouseDown={() => setBurstMode(true)}
        onMouseUp={() => setBurstMode(false)}
        onMouseLeave={() => setBurstMode(false)}
        onTouchStart={(e) => {
          e.preventDefault();
          setBurstMode(true);
        }}
        onTouchEnd={() => setBurstMode(false)}
        onTouchCancel={() => setBurstMode(false)}
      >
        explode!
      </button>
    </>
  );
};

export default FlowBurstOverlay;


