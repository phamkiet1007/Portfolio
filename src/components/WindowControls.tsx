import useWindowStore from "#store/window";

type WindowControlsProps = {
    target: "finder" | "contact" | "resume" | "safari" | "photos" | "terminal" | "txtfile" | "imgfile"; 
};

const WindowControls = ({target}: WindowControlsProps) => {
    const {closeWindow} = useWindowStore();
    return <div id="window-controls">
        <div className="close" onClick={() => closeWindow(target)}/>
        <div className="minimize" />
        <div className="maximize" />
    </div>;
};

export default WindowControls;