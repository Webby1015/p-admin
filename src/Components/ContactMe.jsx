import React, { useState, useEffect } from "react";
import {
  collection,
  addDoc,
  getDocs,
  doc,
  updateDoc,
} from "firebase/firestore";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { db, storage } from "../firebase";

const ContactMe = () => {
  const gradientStyle = {
    background: "linear-gradient(to bottom, #F0F8FF, white)",
  };

  // State variables for form inputs
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [linkedin, setLinkedin] = useState("");
  const [resume, setResume] = useState(null);
  const [contact, setContact] = useState(null);

  const ContactRef = collection(db, "contactInfo");

  useEffect(() => {
    getContactInfo();
    getImageUrl();
  }, []);

  const getImageUrl = async () => {
    const imageRef = ref(storage, "Resume/resume");
    try {
      const url = await getDownloadURL(imageRef);
      setResume(url);
    } catch (error) {
      setResume("");
    }
  };

  const getContactInfo = async () => {
    try {
      const data = await getDocs(ContactRef);
      const filteredData = data.docs.map((doc) => ({
        ...doc.data(),
        id: doc.id,
      }));
      setContact(filteredData[0]);
    } catch (err) {
      console.error(err);
    }
  };

  // Function to handle uploading a new profile image
  const handleResumeChange = () => {
    if (resume == null) return;
    const imageRef = ref(storage, "Resume/resume");
    uploadBytes(imageRef, resume).then(() => {
      getImageUrl(); // Corrected: Call getImageUrl after image upload
      console.log("Image Uploaded");
    });
  };

  const updateEmail = async (id) => {
    const reference = doc(db, "contactInfo", id);
    try {
      await updateDoc(reference, { email: email || contact.email });
      getContactInfo();
    } catch (error) {
      console.error(error);
    }
  };
  
  const updatePhone = async (id) => {
    const reference = doc(db, "contactInfo", id);
    try {
      await updateDoc(reference, { phone: phone || contact.phone });
      getContactInfo();
    } catch (error) {
      console.error(error);
    }
  };
  
  const updateLinkedin = async (id) => {
    const reference = doc(db, "contactInfo", id);
    try {
      await updateDoc(reference, { linkedin: linkedin || contact.linkedin });
      getContactInfo();
    } catch (error) {
      console.error(error);
    }
  };
  

  const handleResumeUpload = () => {
    if (resume == null) return;
    const imageRef = ref(storage, "Resume/resume");
    uploadBytes(imageRef, resume).then(() => {
      getImageUrl();
      console.log("Resume Uploaded");
      setResume(resume); // Update state to maintain the current resume value
    });
  };
  

  return (
    <div id="Contact">
      <div
        className="h-screen flex flex-col justify-center items-center"
        style={gradientStyle}
      >
        <h2 className="text-5xl font-bold mb-10 text-gray-900 leading-tight ">
          <span className="">Contact </span>
          <span className="font-thin bg-violet-300 rounded-full">Me</span>
        </h2>
        <p className="text-lg mb-4 text-center">
          Feel free to reach out to me:
        </p>
        <div className="bg-gray-200 p-10 rounded-md shadow-inner">
          <div className="flex flex-row flex-wrap justify-center">
            <div className="w-full md:w-1/2 lg:w-1/3 xl:w-1/4 p-4">
              <div className="bg-blue-200 shadow-md rounded px-6 py-8 h-28">
                <p className="text-lg">
                  Email:{" "}
                  <a
                    href={`mailto:${contact?.email}`}
                    className="text-blue-700"
                  >
                    Send email
                  </a>
                </p>
              </div>
            </div>
            <div className="w-full md:w-1/2 lg:w-1/3 xl:w-1/4 p-4">
              <div className="bg-green-200 shadow-md rounded px-6 py-8 h-28">
                <p className="text-lg">
                  Phone:{" "}
                  <a href={`tel:${contact?.phone}`} className="text-green-700">
                    Make a call
                  </a>
                </p>
              </div>
            </div>
            <div className="w-full md:w-1/2 lg:w-1/3 xl:w-1/4 p-4 ">
              <div className="bg-yellow-200 shadow-md rounded px-6 py-8 h-28">
                <p className="text-lg">
                  Linkedin:{" "}
                  <a href={contact?.linkedin} className="text-yellow-700">
                    Visit link
                  </a>
                </p>
              </div>
            </div>
            <div className="w-full md:w-1/2 lg:w-1/3 xl:w-1/4 p-4 ">
              <div className="bg-red-200 shadow-md rounded px-6 py-8 h-28">
                <p className="text-lg">
                  Resume:{" "}
                  <a href={contact?.resume} target="_blank"
              rel="noopener noreferrer" className="text-yellow-700">
                    Download
                  </a>
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Form for Contact Information */}
        <div className="mt-8 w-full max-w-md">
          <div className="flex flex-col gap-4">
            <span>
              <input
                type="tel"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                placeholder={contact?.phone}
                className="input-style border p-2"
              />
              <button
                onClick={() => {
                  updatePhone(contact?.id);
                }}
                className="text-lg  m-1 p-1 font-semibold text-white bg-indigo-500 rounded-md hover:bg-indigo-600 focus:outline-none focus:bg-indigo-600"
              >
                Update Phone
              </button>
            </span>
            <span>
              <input
                type="email"
                onChange={(e) => setEmail(e.target.value)}
                placeholder={contact?.email}
                className="input-style border p-2"
              />
              <button
                onClick={() => {
                  updateEmail(contact?.id);
                }}
                className=" m-1 p-1   text-lg font-semibold text-white bg-indigo-500 rounded-md
                hover:bg-indigo-600 focus:outline-none focus:bg-indigo-600"
              >
                Update Email
              </button>
            </span>
            <span>
              <input
                type="text"
                onChange={(e) => setLinkedin(e.target.value)}
                placeholder={contact?.linkedin}
                className="input-style border p-2"
              />
              <button
                onClick={() => {
                  updateLinkedin(contact?.id);
                }}
                className="m-1 p-1  text-lg font-semibold text-white bg-indigo-500 rounded-md hover:bg-indigo-600 focus:outline-none focus:bg-indigo-600"
              >
                Update Linkedin
              </button>
            </span>
            <span className="flex">
              <input
                type="file"
                accept=".pdf"
                onChange={(e) => setResume(e.target.files[0])}
                className="input-style border p-2"
              />
              <button
                onClick={handleResumeUpload}
                className="m-1 p-1  text-lg font-semibold text-white bg-indigo-500 rounded-md hover:bg-indigo-600 focus:outline-none focus:bg-indigo-600"
              >
                Upload Resume
              </button>
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactMe;
