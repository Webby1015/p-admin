import React from "react";
import { AiFillLinkedin } from "react-icons/ai";

// keep sections less than 9
const sections = [
  {
    title: "Section 1",
    link: "https://example.com",
  },
  {
    title: "Section 2",
    link: "https://example.com",
  },
  {
    title: "Section 3",
    link: "https://example.com",
  },
];

const SectionCard = ({ title, link }) => (
  <button
    className="block w-full p-4 lg:m-1  text-lg font-semibold text-gray-800 bg-white border border-gray-300 rounded-md lg:rounded-full hover:bg-gray-100 focus:outline-none focus:bg-gray-100"
    onClick={() => window.location.assign(link)}
  >
    {title}
  </button>
);

const Hello = () => {

  const [profileImage, setProfileImage] = React.useState("");
  const [Name, setName] = React.useState("");
  const [Role, setRole] = React.useState("");

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();

    reader.onloadend = () => {
      setProfileImage(reader.result);
    };

    if (file) {
      reader.readAsDataURL(file);
    }
  };

  return (
    <div id="Hello" className="min-h-screen bg-white pt-20">
      <div className="flex flex-col-reverse lg:flex-row justify-between">
        <div className="w-full lg:w-1/2 flex justify-center items-center lg:ml-0 pl-5 lg:pl-0 bg-gradient-to-b from-white to-white">
          <div>
            <h2 className="text-base lg:text-lg">Hello, I am</h2>
            <input
              placeholder="Enter Your Name"
              className="text-3xl lg:text-4xl font-extrabold mb-2 lg:mb-4 text-gray-900 leading-tight"
            />

            <hr className="border-b-2 lg:border-b-4 border-blue-600 mb-2 lg:mb-4" />
            <input
              placeholder="Enter Your Role"
              className="text-lg lg:text-xl font-bold mb-2 lg:mb-4 text-gray-900 leading-tight"
            />
          </div>
        </div>
        <div className="w-full lg:w-1/2 flex justify-center items-center bg-gradient-to-b from-white to-white">
          <div className="w-48 h-48 lg:w-80 lg:h-80 rounded-full overflow-hidden">
          <div className="relative w-full h-full">
  {/* Hidden file input */}
  <input
    type="file"
    accept="image/*"
    onChange={handleImageChange}
    className="absolute inset-0 opacity-0 cursor-pointer"
    style={{ zIndex: 1 }}
  />
  
  {/* Image */}
  <img
    src={profileImage}
    alt="Your Picture"
    className="object-cover w-full h-full bg-black"
    onClick={() => {
      // Click event for the image to trigger file input
      const fileInput = document.querySelector('input[type="file"]');
      if (fileInput) {
        fileInput.click();
      }
    }}
  />
</div>

            
          </div>
          
        </div>
        
      </div>
      <div className="border-solid border-4 border-slate-400 lg:rounded-full rounded-lg p-8 mt-20 lg:mt-32 mx-3 lg:mx-24 lg:flex justify-between shadow-lg hover:shadow-xl duration-300">
        {sections.map((section, index) => (
          <div key={index} className="w-full lg:w-1/2 lg:flex-grow">
            <SectionCard {...section} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default Hello;
