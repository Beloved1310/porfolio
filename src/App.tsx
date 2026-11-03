import { lazy, Suspense } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { MotionConfig } from "framer-motion";
import { ThemeProvider } from "./contexts/ThemeContext";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import ScrollManager from "./components/ScrollManager";
import Home from "./pages/Home";

// Secondary pages load on demand to keep the first page light.
const Projects = lazy(() => import("./pages/Projects"));
const ProjectCaseStudy = lazy(() => import("./pages/ProjectCaseStudy"));
const Research = lazy(() => import("./pages/Research"));
const Album = lazy(() => import("./pages/Album"));
const Credentials = lazy(() => import("./pages/Credentials"));

function App() {
  return (
    <ThemeProvider>
      <MotionConfig reducedMotion="user">
        <Router>
          <ScrollManager />
          <div className="min-h-screen">
            <Navbar />
            <main>
              <Suspense fallback={<div className="min-h-screen" />}>
                <Routes>
                  <Route path="/" element={<Home />} />
                  <Route path="/projects" element={<Projects />} />
                  <Route path="/projects/:slug" element={<ProjectCaseStudy />} />
                  <Route path="/work/:slug" element={<ProjectCaseStudy />} />
                  <Route path="/research" element={<Research />} />
                  <Route path="/album" element={<Album />} />
                  <Route path="/credentials" element={<Credentials />} />
                </Routes>
              </Suspense>
            </main>
            <Footer />
          </div>
        </Router>
      </MotionConfig>
    </ThemeProvider>
  );
}

export default App;
