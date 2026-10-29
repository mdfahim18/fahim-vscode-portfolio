import { create } from "zustand";

export type SidebarView =
  | "explorer"
  | "search"
  | "git"
  | "extensions"
  | "settings";

interface UIState {
  isSidebarOpen: boolean;
  activeSidebarView: SidebarView;
  toggleSidebar: (view: SidebarView) => void;
  openSidebar: (view: SidebarView) => void;
  closeSidebar: () => void;
}

export const useUIStore = create<UIState>((set, get) => ({
  isSidebarOpen: true,
  activeSidebarView: "explorer",

  toggleSidebar: (view) => {
    const { isSidebarOpen, activeSidebarView } = get();

    // 3. Closed -> open with the clicked view
    if (!isSidebarOpen) {
      set({ isSidebarOpen: true, activeSidebarView: view });
      return;
    }

    // 2. Clicking the already-active icon -> collapse
    if (activeSidebarView === view) {
      set({ isSidebarOpen: false });
      return;
    }

    // 1. Different icon while open -> switch view, stay open
    set({ activeSidebarView: view });
  },

  openSidebar: (view) => set({ isSidebarOpen: true, activeSidebarView: view }),
  closeSidebar: () => set({ isSidebarOpen: false }),
}));
