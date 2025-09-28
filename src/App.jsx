import HOME from "./pages/Home";
import SingleImage from "./pages/SingeImage";
import SinglePost from "./pages/SinglePost";
import { BrowserRouter, Routes, Route } from "react-router-dom";

function App() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<HOME />} />
                <Route path="/:id" element={<SinglePost />} />
                <Route path="/post/:id" element={<SingleImage />} />
            </Routes>
        </BrowserRouter>
    );
}

export default App;
