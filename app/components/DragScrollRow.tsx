"use client";

import { useEffect, useRef, useState } from "react";
import type { MouseEvent as ReactMouseEvent, ReactNode } from "react";

const FRICTION = 0.003;
const MIN_VELOCITY = 0.02;
const MAX_SAMPLE_VELOCITY = 3;
const VELOCITY_SMOOTHING = 0.2;

const FADE_WIDTH = "2rem";
const FADE_DISTANCE = 100;

function buildEdgeMask(leftFade: number, rightFade: number): string {
  const leftAlpha = 1 - leftFade;
  const rightAlpha = 1 - rightFade;
  return `linear-gradient(to right, rgba(0,0,0,${leftAlpha}), black ${FADE_WIDTH}, black calc(100% - ${FADE_WIDTH}), rgba(0,0,0,${rightAlpha}))`;
}

/**
 * Horizontally-scrolling row with hidden scrollbar. Trackpad, wheel, and touch
 * scroll natively; a mouse can click-and-drag with momentum. Edge fades are
 * applied as a mask so the animated background still shows through.
 */
export function DragScrollRow({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  const scrollRef = useRef<HTMLDivElement>(null);
  const drag = useRef({
    dragging: false,
    startX: 0,
    startScrollLeft: 0,
    moved: false,
    lastX: 0,
    lastT: 0,
    velocity: 0,
  });
  const momentumFrame = useRef<number | null>(null);
  const [edgeMask, setEdgeMask] = useState(() => buildEdgeMask(0, 0));

  useEffect(() => {
    const el = scrollRef.current;
    if (!el) return;

    function updateEdgeMask() {
      if (!el) return;
      const maxScroll = el.scrollWidth - el.clientWidth;
      const leftFade = Math.max(0, Math.min(1, el.scrollLeft / FADE_DISTANCE));
      const rightFade = Math.max(0, Math.min(1, (maxScroll - el.scrollLeft) / FADE_DISTANCE));
      setEdgeMask(buildEdgeMask(leftFade, rightFade));
    }

    updateEdgeMask();
    el.addEventListener("scroll", updateEdgeMask, { passive: true });

    const resizeObserver = new ResizeObserver(updateEdgeMask);
    resizeObserver.observe(el);

    return () => {
      el.removeEventListener("scroll", updateEdgeMask);
      resizeObserver.disconnect();
    };
  }, []);

  function cancelMomentum() {
    if (momentumFrame.current !== null) {
      cancelAnimationFrame(momentumFrame.current);
      momentumFrame.current = null;
    }
  }

  function startMomentum(initialVelocity: number) {
    const el = scrollRef.current;
    if (!el) return;
    let velocity = initialVelocity;
    let lastTime: number | null = null;

    function step(now: number) {
      if (!el) return;
      const dt = lastTime === null ? 0 : now - lastTime;
      lastTime = now;

      velocity *= Math.exp(-FRICTION * dt);
      el.scrollLeft -= velocity * dt;

      if (Math.abs(velocity) < MIN_VELOCITY) {
        momentumFrame.current = null;
        return;
      }
      momentumFrame.current = requestAnimationFrame(step);
    }

    momentumFrame.current = requestAnimationFrame(step);
  }

  function onMouseDown(e: ReactMouseEvent<HTMLDivElement>) {
    const el = scrollRef.current;
    if (!el) return;

    cancelMomentum();

    const state = drag.current;
    state.dragging = true;
    state.startX = e.clientX;
    state.startScrollLeft = el.scrollLeft;
    state.moved = false;
    state.lastX = e.clientX;
    state.lastT = performance.now();
    state.velocity = 0;

    function onMouseMove(ev: MouseEvent) {
      if (!state.dragging || !el) return;
      const delta = ev.clientX - state.startX;
      if (Math.abs(delta) > 3) state.moved = true;
      el.scrollLeft = state.startScrollLeft - delta;

      const now = performance.now();
      const dt = now - state.lastT;
      if (dt > 4) {
        const instVelocity = (ev.clientX - state.lastX) / dt;
        const clamped = Math.max(-MAX_SAMPLE_VELOCITY, Math.min(MAX_SAMPLE_VELOCITY, instVelocity));
        state.velocity = state.velocity * (1 - VELOCITY_SMOOTHING) + clamped * VELOCITY_SMOOTHING;
        state.lastX = ev.clientX;
        state.lastT = now;
      }
    }

    function onMouseUp() {
      state.dragging = false;
      window.removeEventListener("mousemove", onMouseMove);
      window.removeEventListener("mouseup", onMouseUp);
      startMomentum(state.velocity);
    }

    window.addEventListener("mousemove", onMouseMove);
    window.addEventListener("mouseup", onMouseUp);
  }

  function onClickCapture(e: ReactMouseEvent<HTMLDivElement>) {
    if (drag.current.moved) {
      e.preventDefault();
      e.stopPropagation();
    }
    drag.current.moved = false;
  }

  return (
    <div
      ref={scrollRef}
      onMouseDown={onMouseDown}
      onClickCapture={onClickCapture}
      style={{ WebkitMaskImage: edgeMask, maskImage: edgeMask }}
      className={`no-scrollbar cursor-grab overflow-x-auto select-none active:cursor-grabbing ${className ?? ""}`}
    >
      {children}
    </div>
  );
}
