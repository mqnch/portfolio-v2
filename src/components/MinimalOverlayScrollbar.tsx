'use client';

import {
  useCallback,
  useEffect,
  useLayoutEffect,
  useRef,
  useState,
  type RefObject,
} from 'react';

const THUMB_MIN_PX = 12;
/** Visual width of rail + thumb (px). */
const BAR_PX = 5;

type Metrics = { heightPx: number; topPx: number };

type MinimalOverlayScrollbarProps = {
  scrollRef: RefObject<HTMLDivElement | null>;
  active: boolean;
  /** Bumps layout measurement when tab content swaps (e.g. writing slug). */
  contentKey: string;
};

export default function MinimalOverlayScrollbar({
  scrollRef,
  active,
  contentKey,
}: MinimalOverlayScrollbarProps) {
  const [metrics, setMetrics] = useState<Metrics | null>(null);
  const [hover, setHover] = useState(false);
  const [dragging, setDragging] = useState(false);
  const dragStart = useRef({ y: 0, scrollTop: 0 });

  const update = useCallback(() => {
    const el = scrollRef.current;
    if (!el || !active) {
      setMetrics(null);
      return;
    }
    const { scrollTop, scrollHeight, clientHeight } = el;
    if (scrollHeight <= clientHeight + 1) {
      setMetrics(null);
      return;
    }
    const trackLen = clientHeight;
    let thumbH = Math.round(trackLen * (clientHeight / scrollHeight));
    thumbH = Math.max(THUMB_MIN_PX, Math.min(thumbH, trackLen));
    const thumbTravel = Math.max(trackLen - thumbH, 0);
    const maxScroll = scrollHeight - clientHeight;
    const topPx = maxScroll > 0 ? (scrollTop / maxScroll) * thumbTravel : 0;
    setMetrics({ heightPx: thumbH, topPx });
  }, [active, scrollRef]);

  useLayoutEffect(() => {
    update();
  }, [update, contentKey]);

  useEffect(() => {
    if (!active) return;
    const el = scrollRef.current;
    if (!el) return;
    update();
    el.addEventListener('scroll', update, { passive: true });
    const ro = new ResizeObserver(update);
    ro.observe(el);
    return () => {
      el.removeEventListener('scroll', update);
      ro.disconnect();
    };
  }, [active, scrollRef, update, contentKey]);

  useEffect(() => {
    if (!dragging) return;
    const onMove = (e: MouseEvent) => {
      const el = scrollRef.current;
      if (!el) return;
      const { scrollHeight, clientHeight } = el;
      const maxScroll = scrollHeight - clientHeight;
      const trackLen = clientHeight;
      const thumbH = Math.max(
        THUMB_MIN_PX,
        Math.min(
          Math.round(trackLen * (clientHeight / scrollHeight)),
          trackLen,
        ),
      );
      const thumbTravel = Math.max(trackLen - thumbH, 0);
      const dy = e.clientY - dragStart.current.y;
      const dScroll =
        thumbTravel > 0 ? (dy / thumbTravel) * maxScroll : 0;
      el.scrollTop = Math.max(
        0,
        Math.min(maxScroll, dragStart.current.scrollTop + dScroll),
      );
    };
    const onUp = () => {
      setDragging(false);
      setHover(false);
    };
    window.addEventListener('mousemove', onMove);
    window.addEventListener('mouseup', onUp);
    return () => {
      window.removeEventListener('mousemove', onMove);
      window.removeEventListener('mouseup', onUp);
    };
  }, [dragging, scrollRef]);

  const onThumbDown = (e: React.MouseEvent) => {
    e.preventDefault();
    const el = scrollRef.current;
    if (!el) return;
    dragStart.current = { y: e.clientY, scrollTop: el.scrollTop };
    setDragging(true);
  };

  if (!active || !metrics) return null;

  const thumbBg = dragging
    ? 'var(--scrollbar-thumb-active)'
    : hover
      ? 'var(--scrollbar-thumb-hover)'
      : 'var(--scrollbar-thumb)';

  const barStyle = { width: BAR_PX } as const;

  return (
    <div
      className="pointer-events-none absolute inset-y-0 right-0 z-10 flex w-3 justify-center"
      aria-hidden
    >
      <div
        className="absolute inset-y-0 left-1/2 -translate-x-1/2 rounded-full bg-[var(--scrollbar-track)]"
        style={barStyle}
        aria-hidden
      />
      <div
        role="presentation"
        className="pointer-events-auto absolute left-1/2 -translate-x-1/2 cursor-grab rounded-full active:cursor-grabbing"
        style={{
          ...barStyle,
          top: metrics.topPx,
          height: metrics.heightPx,
          background: thumbBg,
        }}
        onMouseDown={onThumbDown}
        onMouseEnter={() => setHover(true)}
        onMouseLeave={() => {
          if (!dragging) setHover(false);
        }}
      />
    </div>
  );
}
