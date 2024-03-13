import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./Pages/Home";
import Terms from "./Pages/Terms";
import Policy from "./Pages/Policy";
import Error from "./Pages/Error";

function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/terms" element={<Terms />} />
          <Route path="/policy" element={<Policy />} />
          <Route path="*" element={<Error />} />
        </Routes>
      </Router>
    </div>
  );
}
export default App;
