import React, { useContext } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { ThemeProvider, ThemeContext } from "./Context/ThemeContext";
import Header from "./Components/Header";
import Footer from "./Components/Footer";
import About from "./Pages/About";
import Home from "./Pages/Home";
import Courses from "./Pages/Courses"
import Skills from "./Pages/Skills";
import Contact from "./Pages/Contact";

function App() {
  const { darkMode } = useContext(ThemeContext);

  return (
    <Router>
      <div className={`flex min-h-[100dvh] flex-col ${darkMode ? "dark" : ""}`}>
        <div className="bg-background text-foreground">
          <Header />
          <main className="flex-1">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/about" element={<About />} />
              <Route path="/courses" element={<Courses />} />
              <Route path="/skills" element={<Skills />} />
              <Route path="/contact" element={<Contact />} />
            </Routes>
          </main>
          <Footer />
        </div>
      </div>
    </Router>
  );
}

export default App;
