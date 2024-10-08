'use client';

import React, { MouseEvent, useRef } from 'react';
import { AnimatePresence, motion } from 'framer-motion';

import { useCurrentGame, usePointsStack, useScreen } from '@/app/client-page';
import { hitVariants } from '@/lib/variants/variants';
import { distance } from '@/services/utils';
import { StartButton } from './StartButton';

const GameBoard = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  // const { width, height } = useScreenSize()

  const { points, hitPoints } = usePointsStack();
  const { screen } = useScreen();
  const {
    targetSize,
    hasStart,
    incrementCharIndex,
    handleNextWord,
    incrementClick,
    incrementHit,
  } = useCurrentGame();

  const handleClick = (e: MouseEvent<HTMLDivElement>) => {
    if (!containerRef.current) return;
    const { clientX, clientY } = e;
    const { left, top } = containerRef.current.getBoundingClientRect();
    const [clickX, clickY] = [clientX - left, clientY - top];
    console.log(clickX, clickY);
    incrementClick();

    for (const point of points) {
      if (distance(clickX, clickY, point.x, point.y) > targetSize / 2) continue;
      if (point.value !== points[points.length - 1].value) continue;
      incrementCharIndex();
      if (points.length <= 1) handleNextWord();
      hitPoints(point.index);
      incrementHit();
      break;
    }
  };

  return (
    <div
      className="relative border-secondary"
      style={{ width: screen.width, height: screen.height }}
    >
      <AnimatePresence>
        {points.map((point, i) => (
          <motion.div
            key={point.key}
            initial="initial"
            animate="animate"
            exit="exit"
            variants={hitVariants(points.length - i)}
            className="pointer-events-none absolute z-50 grid select-none place-items-center rounded-full bg-foreground text-4xl text-background [translate:-50%_-50%]"
            style={{
              left: point.x,
              top: point.y,
              width: targetSize,
              height: targetSize,
            }}
          >
            {point.value}
          </motion.div>
        ))}
      </AnimatePresence>
      <div
        onMouseDown={handleClick}
        ref={containerRef}
        className="grid-72 size-full bg-secondary"
      />
      {!hasStart && <StartButton />}
    </div>
  );
};

export default GameBoard;
