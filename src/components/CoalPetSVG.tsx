import React from 'react';
import type { PetState } from '../logic/petState';

interface CoalPetSVGProps {
  state: PetState;
}

export const CoalPetSVG: React.FC<CoalPetSVGProps> = ({ state }) => {
  return (
    <svg className="pet-svg" viewBox="0 0 96 96" xmlns="http://www.w3.org/2000/svg">
      <ellipse className="pet-shadow" cx="48" cy="82" rx="16" ry="5" />

      <g className="pixel-body">
        <g className="body-fill">
          {/* cube base (放大 3倍后的死板块砖) */}
          <rect x="30" y="33" width="36" height="33" fill="#0a0705" />
          <rect x="33" y="36" width="30" height="27" fill="#1c1815" />
          <rect x="33" y="36" width="9" height="27" fill="#2c2521" />
          <rect x="42" y="36" width="18" height="3" fill="#2c2521" />
          <rect x="69" y="57" width="3" height="3" fill="#1c1815" />
          <rect x="72" y="63" width="3" height="3" fill="#0a0705" />
        </g>

        <g className="limb-group leg-left">
          <rect x="36" y="66" width="6" height="3" fill="#0a0705" />
        </g>
        <g className="limb-group leg-right">
          <rect x="54" y="66" width="6" height="3" fill="#0a0705" />
        </g>
        <g className="limb-group arm-left">
          <rect x="24" y="48" width="6" height="6" fill="#1c1815" />
        </g>
        <g className="limb-group arm-right">
          <rect x="66" y="48" width="6" height="6" fill="#1c1815" />
        </g>

        {state !== 'error' && (
          <>
            <g className="eye eye-left">
              <rect className="eye-white" x="36" y="42" width="6" height="6" fill="#f9f6f0" />
              <rect className="pupil pupil-left" x="39" y="42" width="3" height="3" fill="#000000" />
            </g>
            <g className="eye eye-right">
              <rect className="eye-white" x="54" y="42" width="6" height="6" fill="#f9f6f0" />
              <rect className="pupil pupil-right" x="54" y="42" width="3" height="3" fill="#000000" />
            </g>
          </>
        )}

        <g className="working-dust prop-layer">
          <rect x="18" y="64" width="6" height="6" fill="#e6a56f" />
          <rect x="76" y="61" width="6" height="6" fill="#e6a56f" />
          <rect x="78" y="67" width="6" height="6" fill="#e6a56f" />
        </g>

        {state === 'working-typing' && (
          <g className="prop-typing prop-layer">
            <rect x="24" y="6" width="48" height="30" fill="#24292e" />
            <rect x="24" y="6" width="48" height="6" fill="#444d56" />
            <rect x="27" y="15" width="12" height="3" fill="#d98871" />
            <rect x="27" y="18" width="30" height="3" fill="#28a745" />
            <rect x="30" y="24" width="24" height="3" fill="#0366d6" />
            <rect className="kb-base" x="21" y="66" width="54" height="12" fill="#aab1b8" />
            <rect className="kb-keys" x="24" y="69" width="48" height="6" fill="#e1e4e8" />
          </g>
        )}

        {state === 'working-building' && (
          <g className="prop-building prop-layer">
            <path d="M 33 36 Q 48 18 63 36 Z" fill="#fcd34d" />
            <rect x="30" y="36" width="36" height="3" fill="#fcd34d" />
            <g className="prop-hammer">
              <rect className="hammer-handle" x="75" y="40" width="3" height="15" fill="#886851" />
              <rect className="hammer-head" x="72" y="38" width="9" height="6" fill="#959da5" />
            </g>
          </g>
        )}

        {state === 'juggling-multi' && (
          <g className="prop-juggle-multi prop-layer">
            <rect className="bit-multi bit-d" x="42" y="30" width="6" height="6" fill="#e04c38" />
            <rect className="bit-multi bit-e" x="48" y="24" width="6" height="6" fill="#62c454" />
            <rect className="bit-multi bit-f" x="54" y="30" width="6" height="6" fill="#56a8f5" />
          </g>
        )}

        {state === 'error' && (
          <g className="prop-error prop-layer">
            <text className="error-text" x="48" y="16" fill="#ef4444" font-family="monospace" font-size="18" font-weight="900" letter-spacing="-1" text-anchor="middle">ERROR</text>
            <rect x="36" y="42" width="6" height="6" fill="#0a0705" />
            <path d="M 36 42 L 42 48 M 42 42 L 36 48" stroke="#ef4444" stroke-width="2" />
            <rect x="54" y="42" width="6" height="6" fill="#0a0705" />
            <path d="M 54 42 L 60 48 M 60 42 L 54 48" stroke="#ef4444" stroke-width="2" />
          </g>
        )}

        {state === 'happy' && (
          <g className="prop-happy prop-layer">
            <rect className="star-fx s-1" x="20" y="30" width="6" height="6" fill="#fbbf24" />
            <rect className="star-fx s-2" x="70" y="20" width="6" height="6" fill="#fbbf24" />
            <rect className="star-fx s-3" x="80" y="45" width="6" height="6" fill="#fbbf24" />
          </g>
        )}

        {state === 'notification' && (
          <g className="prop-exclamation prop-layer">
            <rect x="66" y="16" width="6" height="15" fill="#f87171" />
            <rect x="66" y="34" width="6" height="6" fill="#f87171" />
          </g>
        )}

        {state === 'sweeping' && (
          <g className="prop-sweep prop-layer">
            <g className="prop-broom">
              <rect className="broom-handle" x="65" y="30" width="3" height="36" fill="#b45309" />
              <rect className="broom-brush" x="62" y="66" width="9" height="9" fill="#fcd34d" />
            </g>
          </g>
        )}

        {state === 'carrying' && (
          <g className="prop-carry prop-layer">
            <rect x="39" y="27" width="18" height="9" fill="#3b82f6" />
            <rect x="36" y="33" width="24" height="3" fill="#3b82f6" />
            <g className="carry-box-wrap">
              <rect className="carry-box" x="27" y="48" width="42" height="21" fill="#d97706" />
              <rect className="carry-box-tape" x="27" y="54" width="42" height="3" fill="#78350f" />
            </g>
          </g>
        )}
      </g>
    </svg>
  );
};
