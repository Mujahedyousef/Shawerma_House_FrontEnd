import React from 'react';
import { ArrowRight } from 'lucide-react';
import { clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

/**
 * AnimatedButton Component
 * @param {string} text - The button label
 * @param {React.Component} icon - The Lucide icon component (default: ArrowRight)
 * @param {string} variant - 'primary' | 'secondary'
 * @param {string} textSize - 'xs' | 'sm' | 'base' | 'lg' | 'xl' | '2xl' | '3xl'
 * @param {string} className - Extra classes for the button container
 * @param {string} circleClassName - Extra classes specifically for the background circle
 * @param {function} onClick - Click handler
 */
const AnimatedButton = ({
  text = 'Button',
  icon: Icon = ArrowRight,
  variant = 'primary',
  textSize = 'base',
  className,
  circleClassName,
  onClick,
  iconSize = 'base',
  type = 'button',
  disabled = false,
  ...props
}) => {
  // Icon Size Configuration
  const iconSizeClasses = {
    xs: 'w-4 h-4',
    sm: 'w-5 h-5',
    base: 'w-6 h-6',
    lg: 'w-7 h-7',
    xl: 'w-8 h-8',
    '2xl': 'w-9 h-9',
    '3xl': 'w-10 h-10',
  };
  const iconSizeClass = iconSizeClasses[iconSize] || iconSizeClasses.base;

  // Simplified Variants using new button color system
  const variants = {
    primary: {
      base: 'bg-[var(--color-button-primary-bg)] group-hover:bg-[var(--color-button-primary-bg-hover)] shadow-[0_0_0_2px_var(--color-button-primary-bg)] active:shadow-[0_0_0_4px_var(--color-button-primary-bg)]',
      circle: 'bg-[var(--color-button-primary-bg-hover)]',
    },
    secondary: {
      base: 'bg-[var(--color-button-secondary-bg)] group-hover:bg-[var(--color-button-secondary-bg-hover)] border-2 border-[var(--color-button-secondary-text)] group-hover:border-[var(--color-button-secondary-text-hover)]',
      circle: 'bg-[var(--color-button-secondary-bg-hover)]',
    },
  };

  const currentVariant = variants[variant] || variants.primary;
  const easeCurve = 'ease-[cubic-bezier(0.23,1,0.32,1)]';

  return (
    <button
      type={type}
      disabled={disabled}
      onClick={onClick}
      className={twMerge(
        // Base Layout
        'group relative flex items-center gap-1 px-9 py-2',
        'rounded-full',
        'font-semibold cursor-pointer overflow-hidden',
        'transition-all duration-600',
        easeCurve,

        // Variant Styles
        currentVariant.base,

        // General Hover States
        variant === 'primary' && 'hover:shadow-[0_0_0_12px_transparent] hover:rounded-xl',
        'active:scale-95',

        className
      )}
      {...props}
    >
      {/* Right Arrow - Slides out to the right */}
      <div
        className={clsx(
          'absolute right-4 z-10 transition-all duration-800',
          easeCurve,
          'group-hover:right-[-25%]',
          iconSizeClass,
          // Icon color matches text color and changes on hover
          variant === 'primary'
            ? 'text-[var(--color-button-primary-text)] group-hover:text-[var(--color-button-primary-text-hover)]'
            : 'text-[var(--color-button-secondary-text)] group-hover:text-[var(--color-button-secondary-text-hover)]'
        )}
      >
        <Icon strokeWidth={2.5} className={iconSizeClass} />
      </div>

      {/* Left Arrow - Slides in from the left */}
      <div
        className={clsx(
          'absolute left-[-25%] z-10 transition-all duration-800',
          easeCurve,
          'group-hover:left-4',
          iconSizeClass,
          // Icon color matches text color and changes on hover
          variant === 'primary'
            ? 'text-[var(--color-button-primary-text)] group-hover:text-[var(--color-button-primary-text-hover)]'
            : 'text-[var(--color-button-secondary-text)] group-hover:text-[var(--color-button-secondary-text-hover)]'
        )}
      >
        <Icon strokeWidth={2.5} className={iconSizeClass} />
      </div>

      {/* Expanding Circle Background 
          Note: This is 'hidden' for staticDark/staticBright, effectively disabling the color fill animation 
      */}
      <span
        className={twMerge(
          'absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2',
          'w-10 h-10 rounded-full opacity-0',
          'transition-all duration-800',
          easeCurve,
          currentVariant.circle,

          // --- HOVER STATE ---
          'group-hover:w-[800px] group-hover:h-64 group-hover:opacity-100',

          circleClassName
        )}
      ></span>

      {/* Button Text - Slides slightly right */}
      <span
        className={clsx(
          'relative z-10 -translate-x-3',
          'transition-all duration-800',
          easeCurve,
          'group-hover:translate-x-3',
          // Ensure text color changes on button hover, independent of parent group
          variant === 'primary'
            ? 'text-[var(--color-button-primary-text)] group-hover:text-[var(--color-button-primary-text-hover)]'
            : 'text-[var(--color-button-secondary-text)] group-hover:text-[var(--color-button-secondary-text-hover)]',
          `text-${textSize}`
        )}
      >
        {text}
      </span>
    </button>
  );
};

export default AnimatedButton;
