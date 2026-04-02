import React, { useState, useEffect, useRef } from 'react';
import { getCycleStates } from '../logic/petState';
import type { PetState } from '../logic/petState';
import { ControlPanel } from '../components/ControlPanel';
import { PetDock } from '../components/PetDock';

const DESCRIPTIONS: Record<PetState, string> = {
  idle: '待机，轻微呼吸、眨眼和眼神跟随。',
  thinking: '思考中，头顶冒小点，眼神会往上飘一点。',
  'working-typing': '工作：打字，屏幕跃动，敲击小键盘。',
  'working-building': '工作：建造，头戴安全帽挥舞小锤子。',
  'juggling-single': '杂耍：抛接单组方块，展现灵活度。',
  'juggling-multi': '陪伴：多色彩色方块在身旁围绕弹跳并杂耍。',
  error: '报错：红字 ERROR 飘起，眼部宕机变 X 并重重摔下。',
  happy: '汪意：开心蹦跳，向四周发射闪闪的小星星。',
  notification: '通知：跳跃提醒，旁边冒出大红感叹号。',
  sweeping: '扫地：手持木制长扫把执行清理旧缓存动画。',
  carrying: '搬运：带蓝帽头盔，抱着厚重的黄色封箱胶带纸箱小跑。',
  sleeping: '睡觉中，缩扁成一团，极其缓慢呼吸，冒 z。',
};

interface HomeProps {
  onNavigate: () => void;
}

export const Home: React.FC<HomeProps> = ({ onNavigate }) => {
  const [currentState, setCurrentState] = useState<PetState>('idle');
  const [autoPlay, setAutoPlay] = useState(true);
  const stageRef = useRef<HTMLDivElement>(null);
  const autoTimerRef = useRef<number | null>(null);

  const cycleStates = getCycleStates();

  useEffect(() => {
    if (!autoPlay) {
      if (autoTimerRef.current) window.clearTimeout(autoTimerRef.current);
      return;
    }

    const queueNext = () => {
      autoTimerRef.current = window.setTimeout(() => {
        setCurrentState((prev) => {
          const currentIndex = cycleStates.indexOf(prev);
          const nextIndex = (currentIndex + 1) % cycleStates.length;
          return cycleStates[nextIndex];
        });
        queueNext();
      }, 2800);
    };

    queueNext();

    return () => {
      if (autoTimerRef.current) window.clearTimeout(autoTimerRef.current);
    };
  }, [autoPlay, cycleStates]);

  const handleStateChange = (state: PetState) => {
    setAutoPlay(false);
    setCurrentState(state);
  };

  const handleAutoToggle = () => {
    setAutoPlay((prev) => !prev);
  };

  return (
    <main className="shell">
      <section className="hero">
        <div className="hero-copy">
          <p className="eyebrow">Coal Pet Standard Demo</p>
          <h1>黑色煤球版像素 companion。</h1>
          <p className="lede">
            这版不追求现代插画感，重点是回到原项目那种像素风、独立小表演、轻微跳帧味道。先看角色语言对不对。
          </p>
          <div style={{ marginTop: '24px' }}>
            <button 
              onClick={onNavigate} 
              className="state-button is-active" 
              style={{ display: 'inline-block', textDecoration: 'none', cursor: 'pointer', border: 'none' }}
            >
              ✨ 前往形象实验室选妃 &rarr;
            </button>
          </div>
        </div>
        <div className="meta-card">
          <p className="meta-label">当前状态</p>
          <p className="meta-state" id="current-state">{currentState}</p>
          <p className="meta-desc" id="state-description">{DESCRIPTIONS[currentState]}</p>
        </div>
      </section>

      <section className="stage-panel">
        <ControlPanel 
          currentState={currentState} 
          autoPlay={autoPlay} 
          onStateChange={handleStateChange}
          onAutoToggle={handleAutoToggle}
        />

        <div className="stage" id="stage" ref={stageRef}>
          <div className="stage-grid"></div>
          <div className="stage-caption">
            <span>像素风状态测试</span>
            <span>拖到右边缘进入 mini</span>
            <span>连续点击会炸毛</span>
          </div>

          <PetDock state={currentState} stageRef={stageRef} />
        </div>
      </section>
    </main>
  );
};
