export const NAVBAR_STYLES = {
  // Navigation link styles - uses CSS variables for proper dark/light mode support
  navLink:
    'text-[var(--color-text)] no-underline font-medium text-[0.875rem] sm:text-[0.95rem] transition-colors duration-200 hover:text-text whitespace-nowrap',

  // Icon button styles (for language and theme toggles) - uses CSS variables
  iconButton:
    'w-9 h-9 rounded-full bg-[var(--color-muted)] flex items-center justify-center cursor-pointer transition-all duration-200 hover:bg-[var(--color-border)] hover:scale-105 text-[var(--color-text)] border border-[var(--color-border)]',

  // Arrow container styles
  arrowContainer:
    'w-9 h-9 rounded-full bg-[var(--color-muted)] flex items-center justify-center cursor-pointer transition-all duration-300 relative overflow-hidden hover:bg-[var(--color-border)] border border-[var(--color-border)]',

  // Arrow icon styles - uses CSS variables
  arrowIcon: 'absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 text-[var(--color-text)] transition-all duration-[400ms] ease-in-out',

  // Navbar container styles
  navbarContainer: 'w-full mx-auto px-4 sm:px-6 lg:px-8 py-3 lg:py-4 flex items-center justify-between gap-2 sm:gap-4 lg:gap-6 flex-nowrap',

  // Navbar base styles - solid background with backdrop blur
  navbarBase:
    'sticky top-0 left-0 right-0 z-[1000] bg-[var(--color-card-surface)]/95 backdrop-blur-md shadow-lg border-b border-[var(--color-border)] transition-all duration-300',
};
