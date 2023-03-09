import { BrowserRouter as Router } from "react-router-dom";
import "./App.css";
import AnimationRoutes from "./components/framerMotion/AnimationRoutes.component";
function App() {
  return (
    <>
      <Router>
        <h1>Hello world</h1>
        <AnimationRoutes />
      </Router>
    </>
  );
}

export default App;
