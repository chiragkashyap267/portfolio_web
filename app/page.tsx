import Navbar from "../app/components/Navbar";
import Hero from "../app/components/Hero";
import Skills from "../app/components/Skills";
import Projects from "../app/components/Projects";
import Websites from "../app/components/Websites";
import Experience from "../app/components/Experience";
import Contact from "../app/components/Contact";
import Education from "./components/Education";
import Certificates from "../app/components/Certificates"

export default function Home() {
  return (
    <>
      <Navbar />
      <Hero />
      <Skills />
      <Experience />
      <Education />
      <Projects />
      <Websites />
      <Certificates />
      <Contact />
    </>
  );
}
