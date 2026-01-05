import Navbar from './components/Navbar.jsx';
import Hero from './components/Hero.jsx';
import About from './components/About.jsx';
import Projects from './components/Projects.jsx';
import WorkExperience from './components/WorkExperience.jsx';
import Footer from './components/Footer.jsx';
import Contact from './components/Contact.jsx';


function App () {
    
    const title = "Natnael Tegegne"

    return(
        <>
          <Navbar />  
          <Hero />
          <About />
          <Projects />
          <WorkExperience />
          <Contact />
          <Footer />
        </>
    );
}

export default App;