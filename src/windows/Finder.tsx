import { WindowControls } from "#components";
import { locations } from "#constants";
import WindowWrapper from "#hoc/WindowWrapper";
import useLocationStore from "#store/location";
import useWindowStore from "#store/window";
import clsx from "clsx";
import { Search } from "lucide-react";

const Finder = () => {
    const {openWindow} = useWindowStore();
    const {activeLocation, setActiveLocation} = useLocationStore();

    const openItem = (item: any) => {
        if(item.fileType === "pdf") {
            return openWindow("resume");
        }
        if(item.kind === "folder") {
            return setActiveLocation(item);
        }
        if(['fig', 'url'].includes(item.fileType) && item.href) {
            return window.open(item.href, "_blank");
        }

        const windowType = (() => {
            if (item.fileType === "txt") return "txtfile";
            if (item.fileType === "img") return "imgfile";
            if (item.kind === "contact") return "contact";
            if (item.kind === "terminal") return "terminal";
            return "finder"; // Default fallback
        })();

        openWindow(windowType, item);
    };

    const renderList = (items: any) => items.map((item: any) => (
        <li 
            key={item.id} 
            onClick={() => 
            setActiveLocation(item)}
            className={clsx(
                item.id === activeLocation.id ? "active" : "not-active"
            )}
        >
                <img src={item.icon} alt={item.name} className="w-4" 
                />
            <p className='text-sm font-medium truncate'>
                {item.name}
            </p>

        </li>
    ));

    return <> 

        <div id="window-header">
            <WindowControls target="finder" />
            <Search className="icon"/>
        </div>

        <div className="bg-white flex h-full">
            <div className="sidebar">
                <div>
                    <h3>Favorites</h3>
                    <ul>
                        {renderList(Object.values(locations))}
                    </ul>
                </div>

                <div>
                    <h3>My Projects</h3>
                    <ul>
                        {renderList(locations.work.children)}
                    </ul>
                </div>
            </div>
        <ul className="content">
            {(activeLocation?.children ?? []).map((item) => (
                <li key={item.id} className={item.position} 
                    onClick={() =>
                    openItem(item)}>
                    <img src={item.icon} alt={item.name} /> 
                    <p>
                        {item.name}
                    </p>
                </li>
            ))}
        </ul>
        </div>

    </>;
};

const FinderWindow = WindowWrapper(Finder, "finder");

export default FinderWindow;