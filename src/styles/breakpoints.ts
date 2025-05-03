export const breakpoints = {
  xs: '320px',    // Small phones
  sm: '480px',    // Large phones
  md: '768px',    // Tablets
  lg: '1024px',   // Small laptops/desktops
  xl: '1200px',   // Medium laptops/desktops
  xxl: '1440px',  // Large laptops/desktops
  xxxl: '1600px', // Extra large screens
} as const;

// Media query helpers
export const mediaQueries = {
  xs: `@media (min-width: ${breakpoints.xs})`,
  sm: `@media (min-width: ${breakpoints.sm})`,
  md: `@media (min-width: ${breakpoints.md})`,
  lg: `@media (min-width: ${breakpoints.lg})`,
  xl: `@media (min-width: ${breakpoints.xl})`,
  xxl: `@media (min-width: ${breakpoints.xxl})`,
  xxxl: `@media (min-width: ${breakpoints.xxxl})`,
  
  // Max-width queries
  maxXs: `@media (max-width: ${breakpoints.xs})`,
  maxSm: `@media (max-width: ${breakpoints.sm})`,
  maxMd: `@media (max-width: ${breakpoints.md})`,
  maxLg: `@media (max-width: ${breakpoints.lg})`,
  maxXl: `@media (max-width: ${breakpoints.xl})`,
  maxXxl: `@media (max-width: ${breakpoints.xxl})`,
  maxXxxl: `@media (max-width: ${breakpoints.xxxl})`,
  
  // Between breakpoints
  between: (start: keyof typeof breakpoints, end: keyof typeof breakpoints) =>
    `@media (min-width: ${breakpoints[start]}) and (max-width: ${breakpoints[end]})`,
  
  // Custom
  custom: (minWidth: number) => `@media (min-width: ${minWidth}px)`,
  customMax: (maxWidth: number) => `@media (max-width: ${maxWidth}px)`,
} as const; 