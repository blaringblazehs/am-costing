import { Routes, Route } from "react-router-dom";
import Navbar from "./Components/Navbar";

function App() {
    return (
        <div className="App">
            <Navbar />
            <Routes>
                {/* <Route path="/Intech" element={<Home />} /> */}
                {/* <Route path="/about" element={<About />} /> */}
                {/* <Route path="/contact" element={<Contact />} /> */}
                {/* <Route path="/login" element={<Login />} /> */}
            </Routes>
        </div>
    );
}

export default App;
