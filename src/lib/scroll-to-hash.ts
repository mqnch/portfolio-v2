/**
 * Scroll an element by id into view using only its nearest scrollable ancestor,
 * avoiding document/window scroll (fixes iOS layout jump when using in-page #hash links).
 */
export function scrollElementIntoScrollContainer(elementId: string): void {
  const target = document.getElementById(elementId);
  if (!target) return;

  let node: HTMLElement | null = target.parentElement;

  while (node) {
    const { overflowY } = window.getComputedStyle(node);
    const canScrollY =
      (overflowY === "auto" ||
        overflowY === "scroll" ||
        overflowY === "overlay") &&
      node.scrollHeight > node.clientHeight;

    if (canScrollY) {
      const targetRect = target.getBoundingClientRect();
      const nodeRect = node.getBoundingClientRect();
      const padding = 10;
      const nextTop =
        node.scrollTop + (targetRect.top - nodeRect.top) - padding;
      node.scrollTo({ top: Math.max(0, nextTop), behavior: "smooth" });
      return;
    }

    node = node.parentElement;
  }

  target.scrollIntoView({ behavior: "smooth", block: "start" });
}
