import { create } from "zustand";
import { immer } from "zustand/middleware/immer";
import { locations } from "#constants";

const DEFAULT_LOCATION = locations.work;

// 1. Định nghĩa kiểu cho một Location (Thư mục/File)
// Dựa trên code của bạn, mình thấy item có các thuộc tính này:
export interface LocationItem {
    id: number | string;
    name: string;
    icon: string;
    children?: LocationItem[]; // Thư mục con
    kind?: string;      // "folder", "contact", ...
    fileType?: string;  // "pdf", "txt", "img"...
    href?: string;      // Cho link
    position?: string;  // Class vị trí CSS
    [key: string]: any; // Cho phép các thuộc tính khác (linh động)
}

// 2. Định nghĩa Interface cho Store
interface LocationStore {
    activeLocation: LocationItem;
    setActiveLocation: (location: LocationItem) => void;
    resetActiveLocation: () => void;
}

const useLocationStore = create<LocationStore>()(
    immer((set) => ({
        activeLocation: DEFAULT_LOCATION,

        setActiveLocation: (location) => 
            set((state) => {
                state.activeLocation = location;
            }
        ),
        
        resetActiveLocation: () => 
            set((state: any) => {
                state.activeLocation = DEFAULT_LOCATION;
            }
        )
    })),
);

export default useLocationStore;