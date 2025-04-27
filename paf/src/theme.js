/**
 * Application theme configuration
 * This file provides theme constants and helper functions
 */

export const THEME_MODES = {
  LIGHT: 'light',
  DARK: 'dark',
  SYSTEM: 'system',
}

export const BREAKPOINTS = {
  sm: '640px',
  md: '768px',
  lg: '1024px',
  xl: '1280px',
  '2xl': '1536px',
}

export const TRANSITIONS = {
  fast: '150ms',
  normal: '300ms',
  slow: '500ms',
  bounce: 'cubic-bezier(0.68, -0.55, 0.265, 1.55) 0.5s',
  elastic: 'cubic-bezier(0.4, 0.0, 0.2, 1) 0.6s',
  spring: 'cubic-bezier(0.175, 0.885, 0.32, 1.275) 0.5s',
}

export const SPACING = {
  xs: '0.25rem',
  sm: '0.5rem',
  md: '1rem',
  lg: '1.5rem',
  xl: '2rem',
  '2xl': '4rem',
}

export const DESIGN_STYLES = {
  MINIMAL: 'minimal',
  MODERN: 'modern',
  PLAYFUL: 'playful',
  ELEGANT: 'elegant',
  BRUTALIST: 'brutalist',
  GLASSMORPHISM: 'glassmorphism',
  NEUMORPHISM: 'neumorphism',
}

export const COLOR_PALETTES = {
  BLUES: ['#0ea5e9', '#0284c7', '#0369a1'],
  PURPLES: ['#c026d3', '#a21caf', '#86198f'],
  GRADIENTS: {
    SUNSET: 'linear-gradient(to right, #f97316, #e11d48)',
    OCEANIC: 'linear-gradient(to right, #0ea5e9, #0369a1)',
    MYSTIC: 'linear-gradient(to right, #8b5cf6, #c026d3)',
    FOREST: 'linear-gradient(to right, #10b981, #059669)',
  }
}

export const THEME = {
  COLORS: {
    primary: {
      50: '#f0f9ff',
      100: '#e0f2fe',
      200: '#bae6fd',
      300: '#7dd3fc',
      400: '#38bdf8',
      500: '#0ea5e9',
      600: '#0284c7',
      700: '#0369a1',
      800: '#075985',
      900: '#0c4a6e',
    },
    secondary: {
      50: '#fdf4ff',
      100: '#fae8ff',
      200: '#f5d0fe',
      300: '#f0abfc',
      400: '#e879f9',
      500: '#d946ef',
      600: '#c026d3',
      700: '#a21caf',
      800: '#86198f',
      900: '#701a75',
    },
    success: {
      500: '#10b981',
      600: '#059669',
    },
    warning: {
      500: '#f59e0b',
      600: '#d97706',
    },
    danger: {
      500: '#ef4444',
      600: '#dc2626',
    }
  },
  FONT: {
    family: {
      sans: 'Inter, system-ui, sans-serif',
      serif: 'Georgia, serif',
      mono: 'Consolas, Monaco, monospace',
    },
    weight: {
      light: 300,
      normal: 400,
      medium: 500,
      semibold: 600,
      bold: 700,
    }
  },
  GRADIENTS: {
    OCEAN: 'linear-gradient(to right, #0ea5e9, #0284c7)',
    SUNSET: 'linear-gradient(to right, #f59e0b, #ef4444)',
    PURPLE: 'linear-gradient(to right, #8b5cf6, #d946ef)',
    MYSTIC: 'linear-gradient(to right, #8b5cf6, #c026d3)',
    FOREST: 'linear-gradient(to right, #10b981, #059669)',
  }
}

/**
 * Helper to add animation delay to elements in a list
 * @param {number} index - The index of the element in the list
 * @param {number} baseDelay - Base delay in milliseconds
 * @returns {string} CSS style string with animation delay
 */
export const getStaggeredDelay = (index, baseDelay = 50) => {
  return `animation-delay: ${index * baseDelay}ms`;
}

/**
 * Create a gradient text style with customizable colors
 * @param {string} from - Starting color
 * @param {string} to - Ending color
 * @returns {Object} Style object for gradient text
 */
export const createGradientText = (from = 'primary.500', to = 'secondary.500') => {
  return {
    backgroundImage: `linear-gradient(to right, var(--colors-${from.replace('.', '-')}), var(--colors-${to.replace('.', '-')}))`,
    backgroundClip: 'text',
    textFillColor: 'transparent',
    WebkitBackgroundClip: 'text',
    WebkitTextFillColor: 'transparent',
  };
};

/**
 * Generates a random shape for blob designs
 * @returns {string} CSS border-radius value for a random blob shape
 */
export const generateRandomBlobShape = () => {
  const getRandomValue = () => Math.floor(Math.random() * 50) + 25;
  return `${getRandomValue()}% ${getRandomValue()}% ${getRandomValue()}% ${getRandomValue()}% / ${getRandomValue()}% ${getRandomValue()}% ${getRandomValue()}% ${getRandomValue()}%`;
};

/**
 * Checks if the current color scheme preference is dark
 * @returns {boolean} True if dark mode is preferred
 */
export const isDarkModePreferred = () => {
  if (typeof window === 'undefined') return false;
  return window.matchMedia('(prefers-color-scheme: dark)').matches;
}

/**
 * Apply hover effect to an element
 * @param {string} effect - Effect name ('lift', 'scale', 'glow', etc.)
 * @returns {Object} Style object for the effect
 */
export const applyHoverEffect = (effect = 'lift') => {
  const effects = {
    lift: {
      transform: 'translateY(-4px)',
      transition: 'transform 0.3s ease',
    },
    scale: {
      transform: 'scale(1.05)',
      transition: 'transform 0.3s ease',
    },
    glow: {
      boxShadow: '0 0 10px rgba(14, 165, 233, 0.5), 0 0 20px rgba(14, 165, 233, 0.3)',
      transition: 'box-shadow 0.3s ease',
    }
  };
  
  return effects[effect] || effects.lift;
};

/**
 * Generates a vibrant complementary color
 * @param {string} baseColor - Hex color code
 * @returns {string} Complementary color in hex
 */
export const getComplementaryColor = (baseColor) => {
  // Remove the hash if it exists
  baseColor = baseColor.replace('#', '');
  
  // Parse the hex value to RGB
  const r = parseInt(baseColor.substr(0, 2), 16);
  const g = parseInt(baseColor.substr(2, 2), 16);
  const b = parseInt(baseColor.substr(4, 2), 16);
  
  // Calculate complementary color (inverting each color component)
  const rComp = 255 - r;
  const gComp = 255 - g;
  const bComp = 255 - b;
  
  // Convert back to hex and return
  return `#${rComp.toString(16).padStart(2, '0')}${gComp.toString(16).padStart(2, '0')}${bComp.toString(16).padStart(2, '0')}`;
};

/**
 * Create CSS variables for all theme colors
 * @returns {Object} CSS variables object
 */
export const createCssColorVariables = () => {
  const variables = {};
  
  Object.entries(THEME.COLORS).forEach(([colorName, colorShades]) => {
    Object.entries(colorShades).forEach(([shade, value]) => {
      variables[`--colors-${colorName}-${shade}`] = value;
    });
  });
  
  return variables;
};

export default {
  THEME_MODES,
  BREAKPOINTS,
  TRANSITIONS,
  SPACING,
  DESIGN_STYLES,
  COLOR_PALETTES,
  THEME,
  getStaggeredDelay,
  isDarkModePreferred,
  createGradientText,
  generateRandomBlobShape,
  applyHoverEffect,
  getComplementaryColor,
  createCssColorVariables,
}
