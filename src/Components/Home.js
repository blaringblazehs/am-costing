import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import "./home.css";
const chunkSize = 10 * 1024;
const Home = () => {
    // const [dropzoneactive, setdropzoneactive] = useState(false);
    // const [files, setFiles] = useState([]);
    // const [currentFileIndex, setCurrentFileIndex] = useState(null);
    // const [lastUploadedFileIndex, setLastUploadedFileIndex] = useState(null); //changes whene there is new file to upload
    // const [currentChunkIndex, setCurrentChunkIndex] = useState(null);
    // const handleDrop = (e) => {
    //     e.preventDefault();
    //     console.log("file is droped");
    //     setFiles([...files, ...e.dataTransfer.files]);
    // };
    // function readAndUploadCurrentChunk() {
    //     const reader = new FileReader();
    //     const file = files[currentFileIndex];
    //     if (!file) return;
    //     const from = currentChunkIndex * chunkSize;
    //     const to = from + chunkSize;
    //     const blob = file.slice(from, to);
    //     reader.onload = (e) => uploadChunk(e);
    //     reader.readAsDataURL(blob);
    // }
    // function uploadChunk(readerEvent) {
    //     const file = files[currentFileIndex];
    //     const data = readerEvent.target.result;
    //     const params = new URLSearchParams();
    //     params.set("name", file.name); //data for the backend like chunk size
    //     params.set("size", file.size);
    //     params.set("currentChunkIndex", currentFileIndex);
    //     params.set("totalchunks", Math.ceil(file.size / chunkSize));
    //     //to tell backend the we are sending files not data
    //     const headers = { "Content-Type": "application/octet-stream" };
    //     axios.post(
    //         "http://localhost:4000/uploads?" + useParams.toString(),
    //         data
    //     );
    // }
    // useEffect(() => {
    //     if (files.length > 0) {
    //         //later when user upload other files this checks new file index
    //         if (currentFileIndex === null) {
    //             setCurrentFileIndex(
    //                 lastUploadedFileIndex === null
    //                     ? 0
    //                     : lastUploadedFileIndex + 1
    //             );
    //         }
    //     }
    // }, [files.length]);
    // //monitor the change of current file index
    // useEffect(() => {
    //     if (currentFileIndex !== null) {
    //         setCurrentChunkIndex(0);
    //     }
    // }, [currentFileIndex]);
    // useEffect(() => {
    //     if (currentChunkIndex !== null) {
    //         readAndUploadCurrentChunk();
    //     }
    // }, [currentChunkIndex]);
    const [dropzoneActive, setDropzoneActive] = useState(false);
    const [files, setFiles] = useState([]);
    const [currentFileIndex, setCurrentFileIndex] = useState(null);
    const [lastUploadedFileIndex, setLastUploadedFileIndex] = useState(null); //changes whene there is new file to upload
    const [currentChunkIndex, setCurrentChunkIndex] = useState(null);

    function handleDrop(e) {
        e.preventDefault();
        setFiles([...files, ...e.dataTransfer.files]);
    }

    function readAndUploadCurrentChunk() {
        const reader = new FileReader();
        const file = files[currentFileIndex];
        if (!file) {
            return;
        }
        const from = currentChunkIndex * chunkSize;
        const to = from + chunkSize;
        const blob = file.slice(from, to);
        reader.onload = (e) => uploadChunk(e);
        reader.readAsDataURL(blob);
    }

    function uploadChunk(readerEvent) {
        const file = files[currentFileIndex];
        const data = readerEvent.target.result;
        const params = new URLSearchParams();
        params.set("name", file.name);
        params.set("size", file.size);
        params.set("currentChunkIndex", currentChunkIndex);
        params.set("totalChunks", Math.ceil(file.size / chunkSize));
        const headers = { "Content-Type": "application/octet-stream" };
        const url = "http://localhost:4000/uploads?" + params.toString();
        axios.post(url, data, { headers }).then((response) => {
            const file = files[currentFileIndex];
            const filesize = files[currentFileIndex].size;
            const chunks = Math.ceil(filesize / chunkSize) - 1;
            const isLastChunk = currentChunkIndex === chunks;
            if (isLastChunk) {
                file.finalFilename = response.data.finalFilename;
                setLastUploadedFileIndex(currentFileIndex);
                setCurrentChunkIndex(null);
            } else {
                setCurrentChunkIndex(currentChunkIndex + 1);
            }
            console.log("my res -", response);
        });
    }

    useEffect(() => {
        if (lastUploadedFileIndex === null) {
            return;
        }
        const isLastFile = lastUploadedFileIndex === files.length - 1;
        const nextFileIndex = isLastFile ? null : currentFileIndex + 1;
        setCurrentFileIndex(nextFileIndex);
    }, [lastUploadedFileIndex]);

    useEffect(() => {
        if (files.length > 0) {
            //later when user upload other files this checks new file index
            if (currentFileIndex === null) {
                setCurrentFileIndex(
                    lastUploadedFileIndex === null
                        ? 0
                        : lastUploadedFileIndex + 1
                );
            }
        }
    }, [files.length]);

    useEffect(() => {
        if (currentFileIndex !== null) {
            setCurrentChunkIndex(0);
        }
    }, [currentFileIndex]);

    useEffect(() => {
        if (currentChunkIndex !== null) {
            readAndUploadCurrentChunk();
        }
    }, [currentChunkIndex]);

    return (
        <main className="main-container">
            <section className="hero-section-container">
                <div className="hero-left">
                    <div className="hero-left-top">
                        <h1>Prototypes and Components</h1>
                        <p>
                            Configure them here and order them directly online:
                            mipart is the fastest way to source customized
                            prototypes and components. Thanks to real-time
                            calculation, our configurator will immediately show
                            you a price. You can also benefit from our express
                            manufacturing service!
                        </p>
                    </div>
                    <div className="hero-left-bottom">
                        <div
                            onDragOver={(e) => {
                                setDropzoneActive(true);
                                console.log("file is dragged over");
                                e.preventDefault();
                            }}
                            onDragLeave={(e) => {
                                setDropzoneActive(false);
                                e.preventDefault();
                            }}
                            onDrop={(e) => handleDrop(e)}
                            className={
                                "dropzone" + (dropzoneActive ? " active" : "")
                            }
                        >
                            Drop your file here
                        </div>
                        <div className="upload-btn-container">
                            <button className="upload-btn">
                                Upload your Cad Data
                            </button>

                            <p>
                                Please drag your file (.stl) here or click on
                                Upload
                            </p>
                        </div>
                    </div>
                </div>
                <div className="hero-right">
                    <h2>Calculations</h2>
                </div>
            </section>
        </main>
    );
};
export default Home;
