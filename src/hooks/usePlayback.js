
import { useEffect, useRef } from 'react';
import useStore from '../store/useStore.js';

const SPEED_TO_MS = {
  0.25: 1200,
  0.5: 600,
  1: 300,
  2: 120,
  4: 40,
};

export function usePlayback() {
  const { isPlaying, speed, stepForward, steps, currentStep } = useStore();
  const intervalRef = useRef(null);

  useEffect(() => {
    if (intervalRef.current) clearInterval(intervalRef.current);
    if (isPlaying && currentStep < steps.length - 1) {
      const ms = SPEED_TO_MS[speed] ?? 300;
      intervalRef.current = setInterval(() => {
        const { currentStep: cs, steps: ss, isPlaying: ip } = useStore.getState();
        if (!ip || cs >= ss.length - 1) {
          clearInterval(intervalRef.current);
          useStore.getState().setIsPlaying(false);
        } else {
          useStore.getState().stepForward();
        }
      }, ms);
    }
    return () => clearInterval(intervalRef.current);
  }, [isPlaying, speed]);
}
