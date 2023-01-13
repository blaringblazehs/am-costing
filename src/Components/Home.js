import { useState } from "react";
import "./home.css";
const Home = () => {
    const [dropzoneactive, setdropzoneactive] = useState(false);
    function handleDrop(e) {
        e.preventDefault();
    }
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
                                setdropzoneactive(true);
                                e.preventDefault();
                            }}
                            onDragLeave={(e) => {
                                setdropzoneactive(false);
                                e.preventDefault();
                            }}
                            onDrop={(e) => handleDrop(e)}
                            className={
                                "dropzone" + (dropzoneactive ? "active" : "")
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
