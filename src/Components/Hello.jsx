import React, { useEffect, useState } from "react";
import { db, storage } from "../firebase";
import { ref, uploadBytes, getDownloadURL,deleteObject } from "firebase/storage";
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
  // State for sections and profile image
  const [sections, setSections] = useState([]);
  const [profileImage, setProfileImage] = useState(null);
  const profilePath = "ProfilePicture/image";
  const [profileUrl, setProfileUrl] = useState("");

  // Firestore collection references
  const NameAndRoleRef = collection(db, "Home");
  const LinksRef = collection(db, "Links");

  // State for Name and Role
  const [Name, setName] = useState("");
  const [Role, setRole] = useState("");
  const [sectionName, setSectionName] = useState("");
  const [sectionLink, setSectionLink] = useState("");

  // useEffect to fetch NameAndRole and Links on component mount
  useEffect(() => {
    getNameAndRole();
    getLinks();
    getImageUrl(); // Corrected: Call getImageUrl to get profile image URL
  }, []);

  // Function to get profile image URL from Firebase Storage
  const getImageUrl = async () => {
    const imageRef = ref(storage, profilePath);
    try {
      const url = await getDownloadURL(imageRef);
      setProfileUrl(url);
    } catch (error) {
      setProfileUrl("");
    }
  };

  // Function to get Name and Role from Firestore
  const getNameAndRole = async () => {
    try {
      const data = await getDocs(NameAndRoleRef);
      const filteredData = data.docs.map((doc) => ({
        ...doc.data(),
        id: doc.id,
      }));
      setName(filteredData[0]?.Name || "");
      setRole(filteredData[0]?.Role || "");
    } catch (err) {
      console.error(err);
    }
  };

  // Function to get Links from Firestore
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

  const handleDeleteImage = () => {
    const imageRef = ref(storage, profilePath);
    deleteObject(imageRef)
      .then(() => {
        setProfileUrl(""); // Clear the profile URL
        console.log("Image Deleted");
      })
      .catch((error) => {
        console.error("Error deleting image:", error);
      });
  };

  // Function to handle uploading a new profile image
  const handleImageChange = () => {
    if (profileImage == null) return;
    const imageRef = ref(storage, profilePath);
    uploadBytes(imageRef, profileImage).then(() => {
      getImageUrl(); // Corrected: Call getImageUrl after image upload
      console.log("Image Uploaded");
    });
  };

  // Function to handle deleting a section
  const handleDeleteSection = async (id) => {
    const reference = doc(db, "Links", id);
    try {
      await deleteDoc(reference);
      getLinks();
    } catch (error) {
      console.error(error);
    }
  };

  // Function to handle adding a section
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

  // Function to update Name in Firestore
  const updateName = async (id) => {
    const reference = doc(db, "Home", id);
    try {
      await updateDoc(reference, { Name: Name });
      getNameAndRole();
    } catch (error) {
      console.error(error);
    }
  };

  // Function to update Role in Firestore
  const updateRole = async (id) => {
    const reference = doc(db, "Home", id);
    try {
      await updateDoc(reference, { Role: Role });
      getNameAndRole();
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div id="Hello" className="min-h-screen bg-white pt-20">
      {/* Section for Name and Role */}
      <div className="flex flex-col-reverse lg:flex-row justify-between">
        <div className="w-full lg:w-1/2 flex justify-center items-center lg:ml-0 lg:pl-0 bg-gradient-to-b from-white to-white">
          <div>
            <h2 className="text-base lg:text-lg">Hello, I am</h2>
            <input
              placeholder={Name}
              className="text-3xl lg:text-4xl font-bold mb-2 lg:mb-4 text-gray-900 leading-tight"
              onChange={(event) => setName(event.target.value)}
            />
            <button
              className="hover:bg-slate-400 p-2 bg-slate-600 text-white"
              onClick={() => updateName(NameAndRole[0].id)}
            >
              Change Name
            </button>
            <hr className="border-b-2 lg:border-b-4 border-blue-600 mb-2 lg:mb-4" />
            <input
              placeholder={Role}
              className="text-lg lg:text-xl font-bold mb-2 lg:mb-4 text-gray-900 leading-tight"
              onChange={(event) => setRole(event.target.value)}
            />
            <button
              className="hover:bg-slate-400 p-2 bg-slate-600 text-white"
              onClick={() => updateRole(NameAndRole[0].id)}
            >
              Change Role
            </button>
          </div>
        </div>
        {/* Section for Profile Image */}
        <div className="w-full lg:w-1/2 flex justify-center items-center bg-gradient-to-b from-white to-white">
          <div className="w-48 h-48 lg:w-80 lg:h-80 overflow-hidden">
            <div className="relative w-full h-full">
              {/* Hidden file input */}
              <span className="flex">
                <input
                  type="file"
                  onChange={(event) => {
                    setProfileImage(event.target.files[0]);
                  }}
                  // style={{ zIndex: 1 }}
                />
                <button
                  className="hover:bg-slate-400 p-2 bg-slate-600 text-white"
                  onClick={handleImageChange}
                >
                  Change
                </button>
                <button
                  className="hover:bg-slate-400 p-2 bg-slate-600 text-white"
                  onClick={handleDeleteImage}
                >
                  Delete
                </button>
              </span>
              {/* Image */}
              <img
                src={profileUrl}
                alt="Your Picture"
                className="object-cover w-full h-full bg-black"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Section for Linked Sections */}
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
              Delete
            </button>
          </div>
        ))}
      </div>

      {/* Section for Adding a New Section */}
      <div className="flex flex-row items-center justify-center h-full">
        <input
          type="text"
          placeholder="Enter Name"
          className="w-1/4 p-3 mb-2 border border-gray-300 rounded-md focus:outline-none focus:border-indigo-500"
          onChange={(event) => setSectionName(event.target.value)}
        />
        <input
          type="text"
          placeholder="Paste Link"
          className="w-1/4 p-3 mb-2 border border-gray-300 rounded-md focus:outline-none focus:border-indigo-500"
          onChange={(event) => setSectionLink(event.target.value)}
        />
        <button
          onClick={handleAddSection}
          className="w-1/4 p-3 text-lg font-semibold text-white bg-indigo-500 rounded-md hover:bg-indigo-600 focus:outline-none focus:bg-indigo-600"
        >
          ADD
        </button>
      </div>
    </div>
  );
};

export default Hello;
