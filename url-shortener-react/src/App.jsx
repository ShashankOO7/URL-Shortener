import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { ThemeProvider } from "./context/ThemeContext/ThemeProvider";
import "./App.css";
import ErrorBoundaryClass from "./components/ErrorBoundary/ErrorBoundary.jsx";
import { getApps } from './utils/helper.js';
function App() {
  const CurrentApp = getApps();
  return (
    <ErrorBoundaryClass>
    <ThemeProvider>
    <Router>
      <CurrentApp />
    </Router>
    </ThemeProvider>
    </ErrorBoundaryClass>
  );
}
export default App;
