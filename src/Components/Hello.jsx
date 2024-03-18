import React, { useEffect, useState } from "react";
import { AiFillLinkedin } from "react-icons/ai";
import { db, storage } from "../firebase";
import {
  getDocs,
  collection,
  addDoc,
  deleteDoc,
  updateDoc,
  doc,
} from "firebase/firestore";

const SectionCard = ({ Name, Link, id }) => (
  <button
    className="block w-full p-4 lg:m-1 text-lg font-semibold text-gray-800 bg-white border border-gray-300 rounded-md lg:rounded-full hover:bg-gray-100 focus:outline-none focus:bg-gray-100"
    onClick={() => (window.location.href = `${Link}`)}
  >
    {Name}
  </button>
);

const Hello = () => {
  const [sections, setSections] = useState([]);
  const [profileImage, setProfileImage] = useState("");
  const [Name, setName] = React.useState("");
  const [Role, setRole] = React.useState("");
  const [sectionName, setsectionName] = useState("");
  const [sectionLink, setsectionLink] = useState("");
  const NameAndRoleref = collection(db, "Home");
  const LinksRef = collection(db, "Links");

  const [NameAndRole, setNameAndRole] = useState([]);

  const getLinks = async () => {
    try {
      const data = await getDocs(LinksRef);
      const filteredData = data.docs.map((doc) => ({
        ...doc.data(),
        id: doc.id,
      }));
      setSections(filteredData);
    } catch (err) {
      console.error(err);
    }
  };

  const getNameAndRole = async () => {
    try {
      const data = await getDocs(NameAndRoleref);
      const filteredData = data.docs.map((doc) => ({
        ...doc.data(),
        id: doc.id,
      }));
      setNameAndRole(filteredData);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    getNameAndRole();
    getLinks();
  }, []);

  const handleDeleteSection = async (id) => {
    const refereance = doc(db, "Links", id);
    try {
      await deleteDoc(refereance);
      getLinks();
    } catch (error) {
      console.error(error);
    }
  };
  const handleAddSection = async () => {
    try {
      await addDoc(LinksRef, {
        Name: sectionName,
        Link: sectionLink,
      });
      getLinks();
    } catch (err) {
      console.error(err);
    }
  };

  const handleImageChange = (e) => {};

  const updateName = async (id) => {
    const refereance = doc(db, "Home", id);
    try {
      await updateDoc(refereance, { Name: Name });
      getNameAndRole();
    } catch (error) {
      console.error(error);
    }
  };

  const updateRole = async (id) => {
    const refereance = doc(db, "Home", id);
    try {
      await updateDoc(refereance, { Role: Role });
      getNameAndRole();
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div id="Hello" className="min-h-screen bg-white pt-20">
      <div className="flex flex-col-reverse lg:flex-row justify-between">
        <div className="w-full lg:w-1/2 flex justify-center items-center lg:ml-0 lg:pl-0 bg-gradient-to-b from-white to-white">
          <div>
            <h2 className="text-base lg:text-lg">Hello, I am</h2>
            <input
              placeholder={NameAndRole.length > 0 ? NameAndRole[0].Name : ""}
              className="text-3xl lg:text-4xl font-bold mb-2 lg:mb-4 text-gray-900 leading-tight"
              onChange={() => {
                setName(event.target.value);
              }}
            />
            <button
              className="hover:bg-slate-400 p-2"
              onClick={() => {
                updateName(NameAndRole[0].id);
              }}
            >
              Change Name
            </button>
            <hr className="border-b-2 lg:border-b-4 border-blue-600 mb-2 lg:mb-4" />
            <input
              placeholder={NameAndRole.length > 0 ? NameAndRole[0].Role : ""}
              className="text-lg lg:text-xl font-bold mb-2 lg:mb-4 text-gray-900 leading-tight"
              onChange={() => {
                setRole(event.target.value);
              }}
            />
            <button
              className="hover:bg-slate-400 p-2"
              onClick={() => {
                updateRole(NameAndRole[0].id);
              }}
            >
              Change Role
            </button>
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
                  const fileInput = document.querySelector(
                    'input[type="file"]'
                  );
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
            <a
              className="block w-full p-4 lg:m-1 text-lg font-semibold text-gray-800 bg-white border border-gray-300 rounded-md lg:rounded-full hover:bg-gray-100 focus:outline-none focus:bg-gray-100"
              href={section.Link}
              target="_blank"
              rel="noopener noreferrer"
            >
              {section.Name}
            </a>
            <button
              className=" bg-red-500 hover:bg-red-400 p-1 rounded-xl"
              onClick={() => {
                handleDeleteSection(section.id);
              }}
            >
              delete
            </button>
          </div>
        ))}
      </div>
      <div className="flex flex-row items-center justify-center h-full">
        <input
          type="text"
          placeholder="Enter Name"
          className="w-1/4 p-3 mb-2 border border-gray-300 rounded-md focus:outline-none focus:border-indigo-500"
          onChange={() => {
            setsectionName(event.target.value);
          }}
        />
        <input
          type="text"
          placeholder="Paste Link"
          className="w-1/4 p-3 mb-2 border border-gray-300 rounded-md focus:outline-none focus:border-indigo-500"
          onChange={() => {
            setsectionLink(event.target.value);
          }}
        />
        <button
          onClick={
            handleAddSection}
          className="w-1/4 p-3 text-lg font-semibold text-white bg-indigo-500 rounded-md hover:bg-indigo-600 focus:outline-none focus:bg-indigo-600"
        >
          ADD
        </button>
      </div>
    </div>
  );
};

export default Hello;

// {Name: 'Linkedin', Link: 'lol.com', id: 'Urs1WJAbWuOVlln9glWD'}
