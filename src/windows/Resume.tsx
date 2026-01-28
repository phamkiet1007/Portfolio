import { WindowControls } from "#components";
import WindowWrapper from "#hoc/WindowWrapper";
import { Download } from "lucide-react";
import {Document, Page, pdfjs } from "react-pdf";

import "react-pdf/dist/Page/AnnotationLayer.css";
import "react-pdf/dist/Page/TextLayer.css";

//dev enviroment
pdfjs.GlobalWorkerOptions.workerSrc = new URL(
    'pdfjs-dist/build/pdf.worker.min.mjs',
    import.meta.url,
).toString();

//production enviroment
// pdfjs.GlobalWorkerOptions.workerSrc = `https://unpkg.com/pdfjs-dist@${pdfjs.version}/build/pdf.worker.min.js`;

const Resume = () => {
    return ( 
        <>
            <div id="window-header">
                <WindowControls target="resume" />
                <h2>Resume.pdf</h2>
                <a 
                    href="files/resume.pdf" 
                    download 
                    className="cursor-poiner"
                    title="Download Resume"
                >
                    <Download className="icon"/>
                </a>
            </div>

            <Document file="files/resume.pdf" >
                <Page 
                pageNumber={1} 
                renderTextLayer 
                renderAnnotationLayer />

            </Document>
        </>
    );
};

const ResumeWindow = WindowWrapper(Resume, "resume");

export default ResumeWindow;