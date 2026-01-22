import { INITIAL_Z_INDEX, WINDOW_CONFIG } from '#constants';
import { create } from 'zustand';
import { immer } from 'zustand/middleware/immer';

// 1. Định nghĩa kiểu của một Cửa sổ dựa trên WINDOW_CONFIG
type WindowConfigType = typeof WINDOW_CONFIG;
type WindowKey = keyof WindowConfigType; // Ví dụ: 'safari' | 'terminal' | 'finder'

// 2. Định nghĩa Interface cho Store 
export interface WindowStore {
    windows: WindowConfigType; // Hoặc Record<WindowKey, WindowItem>
    nextZIndex: number;

    // Actions
    openWindow: (key: WindowKey, data?: any) => void;
    closeWindow: (key: WindowKey) => void;
    focusWindow: (key: WindowKey, data?: any) => void;
}

// 3. Tạo store với Generic Type
const useWindowStore = create<WindowStore>()(
    immer((set) => ({
        windows: WINDOW_CONFIG,
        nextZIndex: INITIAL_Z_INDEX + 1,

        openWindow: (windowKey, data = null) =>
            set((state) => {
                // TypeScript sẽ hiểu state.windows là kiểu WindowStore['windows']
                const win = state.windows[windowKey];
                
                if (win) {
                    win.isOpen = true;
                    win.zIndex = state.nextZIndex;
                    if (data !== null) win.data = data;
                    state.nextZIndex++;
                }
            }),

        closeWindow: (windowKey) =>
            set((state) => {
                const win = state.windows[windowKey];
                if (win) {
                    win.isOpen = false;
                    win.zIndex = INITIAL_Z_INDEX;
                    win.data = null;
                }
            }),

        focusWindow: (windowKey, data = null) =>
            set((state) => {
                const win = state.windows[windowKey];
                if (win) {
                    win.zIndex = state.nextZIndex++;
                    if (data !== null) win.data = data;
                }
            }),
    }))
);

export default useWindowStore;