import { useState, useEffect, useRef, useCallback } from 'react';

/**
 * Custom hook for word-by-word animation effect
 * Optimized for performance with proper cleanup and ref-based state management
 * @param {string} text - The text to animate
 * @param {number} speed - Speed in milliseconds per word (default: 200)
 * @param {number} delay - Initial delay before starting animation in milliseconds (default: 0)
 * @returns {string} - The currently displayed text
 */
export const useWordByWord = (text = '', speed = 200, delay = 0) => {
  const [displayedText, setDisplayedText] = useState('');
  const [isComplete, setIsComplete] = useState(false);
  const timeoutRef = useRef(null);
  const delayTimeoutRef = useRef(null);
  const currentIndexRef = useRef(0);
  const isActiveRef = useRef(false);
  const wordsRef = useRef([]);
  const speedRef = useRef(speed);

  // Update refs when props change
  speedRef.current = speed;

  // Split text into words when text changes
  useEffect(() => {
    if (text) {
      wordsRef.current = text.split(/\s+/).filter(word => word.length > 0);
    } else {
      wordsRef.current = [];
    }
  }, [text]);

  // Memoized typing function using useCallback
  const showNextWord = useCallback(() => {
    if (!isActiveRef.current) {
      return;
    }

    const currentIndex = currentIndexRef.current;
    const words = wordsRef.current;
    const wordsLength = words.length;

    if (currentIndex >= wordsLength) {
      setIsComplete(true);
      isActiveRef.current = false;
      return;
    }

    // Increment index and update displayed text
    currentIndexRef.current = currentIndex + 1;
    const wordsToShow = words.slice(0, currentIndexRef.current);
    setDisplayedText(wordsToShow.join(' '));

    // Schedule next word
    timeoutRef.current = setTimeout(showNextWord, speedRef.current);
  }, []);

  const startAnimation = useCallback(() => {
    if (!wordsRef.current.length) {
      return;
    }

    isActiveRef.current = true;
    currentIndexRef.current = 0;
    setIsComplete(false);
    setDisplayedText('');

    // Start animation immediately
    showNextWord();
  }, [showNextWord]);

  useEffect(() => {
    // Reset state when text changes
    setDisplayedText('');
    setIsComplete(false);
    currentIndexRef.current = 0;
    isActiveRef.current = false;

    // Clear any existing timeouts
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
      timeoutRef.current = null;
    }
    if (delayTimeoutRef.current) {
      clearTimeout(delayTimeoutRef.current);
      delayTimeoutRef.current = null;
    }

    if (!text || wordsRef.current.length === 0) {
      return;
    }

    // Handle initial delay
    if (delay > 0) {
      delayTimeoutRef.current = setTimeout(() => {
        startAnimation();
      }, delay);
    } else {
      startAnimation();
    }

    // Cleanup function
    return () => {
      isActiveRef.current = false;
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
        timeoutRef.current = null;
      }
      if (delayTimeoutRef.current) {
        clearTimeout(delayTimeoutRef.current);
        delayTimeoutRef.current = null;
      }
    };
  }, [text, delay, startAnimation]);

  return { displayedText, isComplete };
};

export default useWordByWord;

