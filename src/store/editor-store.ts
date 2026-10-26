import { create } from "zustand";
import { files, fileNames } from "@/data/files";

interface EditorState {
  openTabs: string[];
  activeFile: string | null;
  dirtyTabs: Set<string>;
  contents: Record<string, string>;
  openFile: (name: string) => void;
  closeTab: (name: string) => void;
  setActiveFile: (name: string) => void;
  updateContent: (name: string, value: string) => void;
}

export const useEditorStore = create<EditorState>((set) => ({
  openTabs: [fileNames[0]],
  activeFile: fileNames[0],
  dirtyTabs: new Set<string>(),
  contents: Object.fromEntries(
    Object.entries(files).map(([name, file]) => [name, file.content])
  ),

  openFile: (name) =>
    set((state) => {
      if (!files[name]) return state;
      const openTabs = state.openTabs.includes(name)
        ? state.openTabs
        : [...state.openTabs, name];
      return { openTabs, activeFile: name };
    }),

  closeTab: (name) =>
    set((state) => {
      const openTabs = state.openTabs.filter((t) => t !== name);
      let activeFile = state.activeFile;
      if (activeFile === name) {
        activeFile = openTabs.length > 0 ? openTabs[openTabs.length - 1] : null;
      }
      return { openTabs, activeFile };
    }),

  setActiveFile: (name) => set({ activeFile: name }),

  updateContent: (name, value) =>
    set((state) => ({
      contents: { ...state.contents, [name]: value },
      dirtyTabs: new Set(state.dirtyTabs).add(name),
    })),
}));
