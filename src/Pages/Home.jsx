import { IoMdHome } from "react-icons/io";
import { CgProfile } from "react-icons/cg";
import { IoMdFolderOpen } from "react-icons/io";
import { LuTrophy } from "react-icons/lu";
import { FaRegEnvelope } from "react-icons/fa";
import { AiOutlineProject } from "react-icons/ai"; 
import Hello from "../Components/Hello";
import AboutMe from "../Components/AboutMe";
import TechnicalSkills from "../Components/TechnicalSkills";
import AwardsAndCertificates from "../Components/AwardsAndCertificates";
import ContactMe from "../Components/ContactMe";
import Projects from "../Components/Projects";
import Footer from '../Components/Footer';


function Home() {
  const scrollToSection = (id) => {
    const section = document.getElementById(id);
    if (section) {
      section.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <div className="flex relative bg-slate-200">
      <nav className="w-full md:w-20 bg-transparent fixed md:top-0 bottom-0 md:left-0 right-0 md:h-full flex md:flex-col items-center justify-center md:py-4">
        <button
          title="Hello"
          onClick={() => scrollToSection("Hello")}
          className="mb-4 text-white bg-slate-800 p-2 rounded-full hover:text-gray-800 hover:bg-white hover:ring-black hover:ring-2 duration-200"
        >
          <div className="flex">
            <IoMdHome size={24} />
          </div>
        </button>
        <button
          title="About me"
          onClick={() => scrollToSection("About")}
          className="mb-4 text-white bg-slate-800 p-2 rounded-full hover:text-gray-800 hover:bg-white hover:ring-black hover:ring-2 duration-200"
        >
          <CgProfile size={24} />
        </button>
        <button
          title="Technical Skills"
          onClick={() => scrollToSection("Technical")}
          className="mb-4 text-white bg-slate-800 p-2 rounded-full hover:text-gray-800 hover:bg-white hover:ring-black hover:ring-2 duration-200"
        >
          <IoMdFolderOpen size={24} />
        </button>
        <button
          title="Projects"
          onClick={() => scrollToSection("Projects")} // Add the onClick handler
          className="mb-4 text-white bg-slate-800 p-2 rounded-full hover:text-gray-800 hover:bg-white hover:ring-black hover:ring-2 duration-200"
        >
          <AiOutlineProject size={24} /> {/* Add the Projects icon */}
        </button>
        <button
          title="Awards & Certificates"
          onClick={() => scrollToSection("Awards")}
          className="mb-4 text-white bg-slate-800 p-2 rounded-full hover:text-gray-800 hover:bg-white hover:ring-black hover:ring-2 duration-200"
        >
          <LuTrophy size={24} />
        </button>
        <button
          title="Contact Me"
          onClick={() => scrollToSection("Contact")}
          className="mb-4 text-white bg-slate-800 p-2 rounded-full hover:text-gray-800 hover:bg-white hover:ring-black hover:ring-2 duration-200"
        >
          <FaRegEnvelope size={24} />
        </button>
        
      </nav>

      <div className="w-full">
        <Hello />
        <AboutMe />
        <TechnicalSkills />
        <Projects />
        <AwardsAndCertificates />
        <ContactMe />
        <Footer />
      </div>
    </div>
  );
}

export default Home;
