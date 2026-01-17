import { useState, useEffect, useRef, useCallback } from 'react';

/**
 * Custom hook for typewriter effect animation
 * Optimized for performance with proper cleanup and ref-based state management
 * @param {string} text - The text to animate
 * @param {number} speed - Typing speed in milliseconds per character (default: 50)
 * @param {number} delay - Initial delay before starting animation in milliseconds (default: 0)
 * @returns {object} - Object containing displayedText and isComplete status
 */
export const useTypewriter = (text = '', speed = 50, delay = 0) => {
  const [displayedText, setDisplayedText] = useState('');
  const [isComplete, setIsComplete] = useState(false);
  const timeoutRef = useRef(null);
  const delayTimeoutRef = useRef(null);
  const currentIndexRef = useRef(0);
  const isActiveRef = useRef(false);
  const textRef = useRef(text);
  const speedRef = useRef(speed);

  // Update refs when props change
  textRef.current = text;
  speedRef.current = speed;

  // Memoized typing function using useCallback
  const typeNextChar = useCallback(() => {
    if (!isActiveRef.current) {
      return;
    }

    const currentIndex = currentIndexRef.current;
    const textLength = textRef.current.length;

    if (currentIndex >= textLength) {
      setIsComplete(true);
      isActiveRef.current = false;
      return;
    }

    // Increment index and update displayed text
    currentIndexRef.current = currentIndex + 1;
    setDisplayedText(textRef.current.slice(0, currentIndexRef.current));

    // Schedule next character
    timeoutRef.current = setTimeout(typeNextChar, speedRef.current);
  }, []);

  const startTyping = useCallback(() => {
    if (!textRef.current) {
      return;
    }

    isActiveRef.current = true;
    currentIndexRef.current = 0;
    setIsComplete(false);
    setDisplayedText('');

    // Start typing immediately
    typeNextChar();
  }, [typeNextChar]);

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

    if (!text) {
      return;
    }

    // Handle initial delay
    if (delay > 0) {
      delayTimeoutRef.current = setTimeout(() => {
        startTyping();
      }, delay);
    } else {
      startTyping();
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
  }, [text, delay, startTyping]);

  return { displayedText, isComplete };
};

export default useTypewriter;

