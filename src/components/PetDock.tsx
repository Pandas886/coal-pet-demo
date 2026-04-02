import React, { useState, useEffect, useRef, useCallback } from 'react';
import { resolveClickReaction, shouldEnterMiniMode } from '../logic/petState';
import type { PetState, Side } from '../logic/petState';
import { CoalPetSVG } from './CoalPetSVG';

interface PetDockProps {
  state: PetState;
  stageRef: React.RefObject<HTMLDivElement | null>;
}

export const PetDock: React.FC<PetDockProps> = ({ state, stageRef }) => {
  const [dockX, setDockX] = useState(0);
  const [dockY, setDockY] = useState(0);
  const [dragging, setDragging] = useState(false);
  const [miniMode, setMiniMode] = useState(false);
  const [peeking, setPeeking] = useState(false);
  const [lookingSide, setLookingSide] = useState<Side | null>(null);
  const [bursting, setBursting] = useState(false);
  
  const petShellRef = useRef<HTMLDivElement>(null);
  const dragOffset = useRef({ x: 0, y: 0 });
  const clickCount = useRef(0);
  const clickTimer = useRef<number | null>(null);
  const lookTimer = useRef<number | null>(null);

  const clamp = (value: number, min: number, max: number) => Math.max(min, Math.min(max, value));

  const syncDockPosition = useCallback(() => {
    if (!stageRef.current) return;
    const stageRect = stageRef.current.getBoundingClientRect();
    const xPercent = (dockX / stageRect.width) * 100;
    const yPercent = (dockY / stageRect.height) * 100;
    
    // We'll apply these as inline styles to the dock
    return {
      '--dock-x': `${xPercent}%`,
      '--dock-y': `${yPercent}%`,
    } as React.CSSProperties;
  }, [dockX, dockY, stageRef]);

  const updateMiniState = useCallback((x: number) => {
    if (!stageRef.current) return;
    const threshold = 52;
    const shouldMini = shouldEnterMiniMode(x, stageRef.current.clientWidth, threshold);
    setMiniMode(shouldMini);
    if (shouldMini) {
      setDockX(stageRef.current.clientWidth - 28);
    }
  }, [stageRef]);

  const pointEyes = useCallback((clientX: number, clientY: number) => {
    if (!petShellRef.current) return;
    const shellRect = petShellRef.current.getBoundingClientRect();
    const centerX = shellRect.left + shellRect.width / 2;
    const centerY = shellRect.top + shellRect.height / 2;
    const dx = clamp((clientX - centerX) / 22, -6, 6);
    const dy = clamp((clientY - centerY) / 22, -5, 5);
    
    const pupils = petShellRef.current.querySelectorAll<HTMLElement>('.pupil');
    pupils.forEach((pupil) => {
      pupil.style.transform = `translate(${dx}px, ${dy}px)`;
    });
  }, []);

  const resetEyes = useCallback(() => {
    if (!petShellRef.current) return;
    const pupils = petShellRef.current.querySelectorAll<HTMLElement>('.pupil');
    pupils.forEach((pupil) => {
      pupil.style.transform = 'translate(0px, 0px)';
    });
  }, []);

  const applyLook = useCallback((side: Side) => {
    setLookingSide(side);
    if (lookTimer.current) window.clearTimeout(lookTimer.current);
    lookTimer.current = window.setTimeout(() => {
      setLookingSide(null);
    }, 700);
  }, []);

  const applyBurst = useCallback((side: Side) => {
    applyLook(side);
    setBursting(false);
    // Force reflow for animation restart
    setTimeout(() => setBursting(true), 10);
    setTimeout(() => {
      setBursting(false);
    }, 1700);
  }, [applyLook]);

  const handleClickReaction = useCallback((event: React.MouseEvent) => {
    if (!petShellRef.current) return;
    const shellRect = petShellRef.current.getBoundingClientRect();
    const side = event.clientX < shellRect.left + shellRect.width / 2 ? 'left' : 'right';
    clickCount.current += 1;

    if (clickTimer.current) window.clearTimeout(clickTimer.current);
    clickTimer.current = window.setTimeout(() => {
      const reaction = resolveClickReaction(clickCount.current, side);
      if (reaction.type === 'burst') {
        applyBurst(reaction.side);
      } else {
        applyLook(reaction.side);
      }
      clickCount.current = 0;
    }, 260);
  }, [applyBurst, applyLook]);

  // Handle pointer move on stage
  useEffect(() => {
    const handlePointerMove = (event: PointerEvent) => {
      pointEyes(event.clientX, event.clientY);
      
      if (!dragging || !stageRef.current) return;
      
      const stageRect = stageRef.current.getBoundingClientRect();
      const newX = clamp(event.clientX - stageRect.left - dragOffset.current.x, 90, stageRect.width - 10);
      const newY = clamp(event.clientY - stageRect.top - dragOffset.current.y, 90, stageRect.height - 40);
      
      setDockX(newX);
      setDockY(newY);
      updateMiniState(newX);
    };

    const handlePointerUp = () => {
      if (dragging) {
        setDragging(false);
        updateMiniState(dockX);
      }
    };

    const handleResize = () => {
      if (!stageRef.current) return;
      const stageRect = stageRef.current.getBoundingClientRect();
      setDockX((prev) => clamp(prev, 90, stageRect.width - 10));
      setDockY((prev) => clamp(prev, 90, stageRect.height - 40));
      updateMiniState(dockX);
    };

    const handlePointerLeave = () => {
      if (!dragging) resetEyes();
    };

    window.addEventListener('pointermove', handlePointerMove);
    window.addEventListener('pointerup', handlePointerUp);
    window.addEventListener('pointerleave', handlePointerLeave);
    window.addEventListener('resize', handleResize);
    
    return () => {
      window.removeEventListener('pointermove', handlePointerMove);
      window.removeEventListener('pointerup', handlePointerUp);
      window.removeEventListener('pointerleave', handlePointerLeave);
      window.removeEventListener('resize', handleResize);
    };
  }, [dragging, dockX, stageRef, pointEyes, updateMiniState]);

  // Initial position
  useEffect(() => {
    if (stageRef.current) {
      setDockX(stageRef.current.clientWidth * 0.38);
      setDockY(stageRef.current.clientHeight * 0.58);
    }
  }, [stageRef]);

  const onPointerDown = (event: React.PointerEvent) => {
    if (!petShellRef.current) return;
    const shellRect = petShellRef.current.getBoundingClientRect();
    setDragging(true);
    setMiniMode(false);
    setPeeking(false);
    
    (event.target as HTMLElement).setPointerCapture(event.pointerId);
    dragOffset.current = {
      x: event.clientX - shellRect.left - shellRect.width / 2,
      y: event.clientY - shellRect.top - shellRect.height / 2,
    };
  };

  const dockClass = [
    'pet-dock',
    lookingSide === 'left' ? 'is-looking-left' : '',
    lookingSide === 'right' ? 'is-looking-right' : '',
    bursting ? 'is-bursting' : '',
    dragging ? 'is-dragging' : '',
    miniMode ? 'is-mini' : '',
    peeking ? 'is-peeking' : '',
  ].filter(Boolean).join(' ');

  return (
    <div 
      className={dockClass} 
      data-state={state} 
      data-mini={miniMode ? 'true' : 'false'}
      style={syncDockPosition()}
      onMouseEnter={() => miniMode && setPeeking(true)}
      onMouseLeave={() => setPeeking(false)}
    >
      <div className="pet-glow"></div>
      <div className="thought thought--thinking" aria-hidden="true">
        <span></span>
        <span></span>
        <span></span>
      </div>
      <div className="thought thought--reminder" aria-hidden="true">!</div>
      <div className="sleep-z" aria-hidden="true">
        <span>z</span>
        <span>z</span>
        <span>z</span>
      </div>
      <div className="juggle-bits" aria-hidden="true">
        <span className="bit bit-a"></span>
        <span className="bit bit-b"></span>
        <span className="bit bit-c"></span>
      </div>
      <div 
        className="pet-shell" 
        id="pet-shell" 
        ref={petShellRef}
        role="img" 
        aria-label="黑色煤球宠物"
        onPointerDown={onPointerDown}
        onClick={(e) => !dragging && handleClickReaction(e)}
      >
        <CoalPetSVG state={state} />
      </div>
    </div>
  );
};
