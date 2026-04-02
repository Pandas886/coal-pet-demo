import React from 'react';
import { KNOWN_STATES } from '../logic/petState';
import type { PetState } from '../logic/petState';

interface ControlPanelProps {
  currentState: PetState;
  autoPlay: boolean;
  onStateChange: (state: PetState) => void;
  onAutoToggle: () => void;
}

const STATE_LABELS: Record<PetState, string> = {
  idle: '待机 (Idle)',
  thinking: '思考 (Think)',
  'working-typing': '打字 (Typing)',
  'working-building': '建造 (Build)',
  'juggling-single': '杂耍 (Juggle)',
  'juggling-multi': '陪伴 (Multi Juggle)',
  error: '报错 (Error)',
  happy: '汪意跳跃 (Happy)',
  notification: '通知 (Notify)',
  sweeping: '扫地 (Sweep)',
  carrying: '搬运 (Carry)',
  sleeping: '睡觉 (Sleep)',
};

export const ControlPanel: React.FC<ControlPanelProps> = ({
  currentState,
  autoPlay,
  onStateChange,
  onAutoToggle,
}) => {
  return (
    <div className="control-strip">
      <div className="buttons">
        {KNOWN_STATES.map((state) => (
          <button
            key={state}
            className={`state-button ${currentState === state ? 'is-active' : ''}`}
            onClick={() => onStateChange(state)}
          >
            {STATE_LABELS[state]}
          </button>
        ))}
      </div>
      <button
        id="auto-toggle"
        className="ghost-button"
        aria-pressed={autoPlay}
        onClick={onAutoToggle}
      >
        自动轮播：{autoPlay ? '开' : '关'}
      </button>
    </div>
  );
};
