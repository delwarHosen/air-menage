// components/adaptive/Adaptiveness.js
import { Dimensions, PixelRatio } from "react-native";

const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } = Dimensions.get("window");

// Design reference sizes (iPhone 11 Pro)
const BASE_WIDTH = 375;
const BASE_HEIGHT = 812;

// Get device category
const isSmallDevice = SCREEN_WIDTH < 375;
const isLargeDevice = SCREEN_WIDTH >= 428;
const isTablet = SCREEN_WIDTH >= 768;

/**
 * Scale size based on screen width
 * Works well for horizontal spacing, widths, font sizes
 */
export const scale = (size) => {
  const scaleFactor = SCREEN_WIDTH / BASE_WIDTH;
  const newSize = size * scaleFactor;
  
  // Constrain scaling on tablets to avoid huge elements
  if (isTablet) {
    return size + (newSize - size) * 0.5;
  }
  
  return Math.round(PixelRatio.roundToNearestPixel(newSize));
};

/**
 * Moderate scale - less aggressive scaling
 * Good for elements that shouldn't scale too much
 */
export const moderateScale = (size, factor = 0.5) => {
  return size + (scale(size) - size) * factor;
};

/**
 * Vertical scale with constraints
 * Prevents extreme values on very tall/short devices
 */
export const verticalScale = (size) => {
  const scaleFactor = SCREEN_HEIGHT / BASE_HEIGHT;
  const newSize = size * scaleFactor;
  
  // Constrain vertical scaling to avoid extremes
  const minScale = 0.85;
  const maxScale = 1.15;
  const constrainedScale = Math.max(minScale, Math.min(maxScale, scaleFactor));
  
  return Math.round(PixelRatio.roundToNearestPixel(size * constrainedScale));
};

/**
 * Moderate vertical scale - even more conservative
 * Good for critical UI elements like tab bars
 */
export const moderateVerticalScale = (size, factor = 0.3) => {
  return size + (verticalScale(size) - size) * factor;
};

/**
 * Font scale with readability constraints
 */
export const fontScale = (size) => {
  const scaled = scale(size);
  
  // Ensure minimum readability
  if (scaled < 11) return 11;
  
  // Cap maximum size for tablets
  if (isTablet && scaled > size * 1.3) {
    return size * 1.3;
  }
  
  return scaled;
};

/**
 * Responsive spacing based on device size
 */
export const spacing = {
  xs: scale(4),
  sm: scale(8),
  md: scale(16),
  lg: scale(24),
  xl: scale(32),
};

// Export device info for conditional rendering
export const deviceInfo = {
  isSmallDevice,
  isLargeDevice,
  isTablet,
  screenWidth: SCREEN_WIDTH,
  screenHeight: SCREEN_HEIGHT,
};