import { create } from "zustand";

export type Breakpoint = "xs" | "sm" | "md" | "lg" | "xl" | "2xl";

interface LayoutState {
  // Breakpoint detection
  breakpoint: Breakpoint;
  isMobile: boolean;
  isTablet: boolean;
  isDesktop: boolean;
  isWideScreen: boolean;

  // Sidebar state
  sidebarOpen: boolean;
  toggleSidebar: () => void;
  setSidebarOpen: (open: boolean) => void;

  // Mobile navigation
  mobileNavOpen: boolean;
  toggleMobileNav: () => void;
  setMobileNavOpen: (open: boolean) => void;

  // Update breakpoint
  setBreakpoint: (breakpoint: Breakpoint) => void;
}

/**
 * Layout store for responsive design management
 * Tracks breakpoints and manages layout state
 */
export const useLayoutStore = create<LayoutState>()((set, get) => ({
  breakpoint: "lg",
  isMobile: false,
  isTablet: false,
  isDesktop: true,
  isWideScreen: false,

  sidebarOpen: false,
  toggleSidebar: () => set((state) => ({ sidebarOpen: !state.sidebarOpen })),
  setSidebarOpen: (open: boolean) => set({ sidebarOpen: open }),

  mobileNavOpen: false,
  toggleMobileNav: () =>
    set((state) => ({ mobileNavOpen: !state.mobileNavOpen })),
  setMobileNavOpen: (open: boolean) => set({ mobileNavOpen: open }),

  setBreakpoint: (breakpoint: Breakpoint) => {
    const isMobile = breakpoint === "xs" || breakpoint === "sm";
    const isTablet = breakpoint === "md";
    const isDesktop = breakpoint === "lg" || breakpoint === "xl";
    const isWideScreen = breakpoint === "2xl";

    set({
      breakpoint,
      isMobile,
      isTablet,
      isDesktop,
      isWideScreen,
    });

    // Auto-close sidebar on mobile
    if (isMobile && get().sidebarOpen) {
      set({ sidebarOpen: false });
    }
  },
}));

// Breakpoint values in pixels
export const BREAKPOINTS = {
  xs: 480,
  sm: 640,
  md: 768,
  lg: 1024,
  xl: 1280,
  "2xl": 1536,
} as const;

/**
 * Gets current breakpoint from window width
 */
export function getBreakpoint(width: number): Breakpoint {
  if (width >= BREAKPOINTS["2xl"]) return "2xl";
  if (width >= BREAKPOINTS.xl) return "xl";
  if (width >= BREAKPOINTS.lg) return "lg";
  if (width >= BREAKPOINTS.md) return "md";
  if (width >= BREAKPOINTS.sm) return "sm";
  return "xs";
}

/**
 * Initialize breakpoint detection
 */
export function initializeBreakpointDetection() {
  const updateBreakpoint = () => {
    const breakpoint = getBreakpoint(window.innerWidth);
    useLayoutStore.getState().setBreakpoint(breakpoint);
  };

  // Initial check
  updateBreakpoint();

  // Listen for resize
  window.addEventListener("resize", updateBreakpoint);

  // Cleanup function
  return () => window.removeEventListener("resize", updateBreakpoint);
}
