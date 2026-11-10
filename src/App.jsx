import { ToastProvider } from "./context/ToastContext";
import About from "./components/About";
import BackToTop from "./components/BackToTop";
import Contact from "./components/Contact";
import CustomCursor from "./components/CustomCursor";
import Footer from "./components/Footer";
import Hero from "./components/Hero";
import Journal from "./components/Journal";
import Navbar from "./components/Navbar";
import Projects from "./components/Projects";
import ScrollProgress from "./components/ScrollProgress";
import Services from "./components/Services";
import Skills from "./components/Skills";
import Testimonials from "./components/Testimonials";
import Journey from "./components/Journey";

export default function App() {
  return (
    <ToastProvider>
      <div className="app-shell">
        <ScrollProgress />
        <CustomCursor />
        <a className="skip-link" href="#main">
          Skip to content
        </a>
        <Navbar />
        <main id="main">
          <Hero />
          <About />
          <Skills />
          <Projects />
          <Journey />
          <Services />
          <Testimonials />
          <Journal />
          <Contact />
        </main>
        <Footer />
        <BackToTop />
      </div>
    </ToastProvider>
  );
}
