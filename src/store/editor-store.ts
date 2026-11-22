import { create } from "zustand";
import { files, fileNames } from "@/data/files";

export interface SearchTarget {
  file: string;
  line: number;
  query: string;
}

interface EditorState {
  openTabs: string[];
  activeFile: string | null;
  focusRequest: number;
  dirtyTabs: Set<string>;
  contents: Record<string, string>;
  searchTarget: SearchTarget | null;
  openFile: (name: string) => void;
  closeTab: (name: string) => void;
  setActiveFile: (name: string) => void;
  updateContent: (name: string, value: string) => void;
  setSearchTarget: (target: SearchTarget | null) => void;
}

export const useEditorStore = create<EditorState>((set) => ({
  openTabs: [fileNames[0]],
  activeFile: fileNames[0],
  focusRequest: 0,
  dirtyTabs: new Set<string>(),
  contents: Object.fromEntries(
    Object.entries(files).map(([name, file]) => [name, file.content])
  ),
  searchTarget: null,

  openFile: (name) =>
    set((state) => {
      if (!files[name]) return state;
      const alreadyOpen = state.openTabs.includes(name);
      return {
        activeFile: name,
        openTabs: alreadyOpen ? state.openTabs : [...state.openTabs, name],
        focusRequest: state.focusRequest + 1,
      };
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

  setActiveFile: (name) =>
    set((state) =>
      files[name]
        ? { activeFile: name, focusRequest: state.focusRequest + 1 }
        : state
    ),

  updateContent: (name, value) =>
    set((state) => ({
      contents: { ...state.contents, [name]: value },
      dirtyTabs: new Set(state.dirtyTabs).add(name),
    })),

  setSearchTarget: (target) => set({ searchTarget: target }),
}));