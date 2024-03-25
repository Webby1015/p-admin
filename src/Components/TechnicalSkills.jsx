import React, { useState, useEffect } from "react";
import { db } from "../firebase"; // Import your Firebase configuration
import {
  getDocs,
  collection,
  addDoc,
  deleteDoc,
  updateDoc,
  doc,
} from "firebase/firestore";

const TechnicalSkills = () => {
  const placeholderImageURL = "https://via.placeholder.com/150";

  const gradientStyle = {
    background: "linear-gradient(to bottom, #87CEFA, #87CEEB)",
  };

  const [skillsData, setSkillsData] = useState([]);
  const [newSkillName, setNewSkillName] = useState("");
  const [newSkillImage, setNewSkillImage] = useState("");

  useEffect(() => {
    getTechnicalSkills();
  }, []);

  const SkillsRef = collection(db, "TechnicalSkills");

  const getTechnicalSkills = async () => {
    try {
      const data = await getDocs(SkillsRef);
      const filteredData = data.docs.map((doc) => ({
        ...doc.data(),
        id: doc.id,
      }));
      setSkillsData(filteredData);
    } catch (err) {
      console.error(err);
    }
  };

  const handleAddSkill = async () => {
    if (newSkillName.trim() === "" || newSkillImage.trim() === "") {
      return;
    }

    try {
      const newSkill = {
        imageSrc: newSkillImage,
        altText: newSkillName,
        skillName: newSkillName,
      };

      const docRef = await addDoc(SkillsRef, newSkill);
      setSkillsData([...skillsData, { ...newSkill, id: docRef.id }]);
      setNewSkillName("");
      setNewSkillImage("");
    } catch (err) {
      console.error(err);
    }
  };

  const handleDeleteSkill = async (id) => {
    try {
      await deleteDoc(doc(db, "TechnicalSkills", id));
      const updatedSkills = skillsData.filter((skill) => skill.id !== id);
      setSkillsData(updatedSkills);
    } catch (err) {
      console.error(err);
    }
  };

  const SkillCard = ({ imageSrc, altText, skillName, id }) => (
    <div className="p-5">
      <div className="bg-white rounded-lg shadow-lg p-2 bg-opacity-35 hover:shadow-2xl duration-300">
        <img
          src={imageSrc}
          alt={altText}
          className="mx-auto mb-2 rounded-full h-48"
        />
        <p className="text-center">{skillName}</p>
        <button
          className="bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded mt-2"
          onClick={() => handleDeleteSkill(id)}
        >
          Delete
        </button>
      </div>
    </div>
  );

  return (
    <div
      id="Technical"
      className="lg:h-screen flex flex-col justify-center items-center"
      style={gradientStyle}
    >
      <h2 className="text-5xl font-bold my-10 text-gray-900 leading-tight ">
        <span className="">Technical</span> <span className="font-thin">S</span>
        <span className="font-thin bg-violet-300 rounded-full">kills</span>
      </h2>
      <div className="lg:grid grid-cols-3 gap-2">
        {/* Skill Cards */}
        {skillsData.map((skill) => (
          <SkillCard
            key={skill.id}
            id={skill.id}
            imageSrc={skill.imageSrc}
            altText={skill.altText}
            skillName={skill.skillName}
          />
        ))}
      </div>
      {/* Form to add new skill */}
      <div className="mt-10">
        <input
          type="text"
          placeholder="Skill Name"
          value={newSkillName}
          onChange={(e) => setNewSkillName(e.target.value)}
          className="mr-2 p-2 border border-gray-300 rounded"
        />
        <input
          type="text"
          placeholder="Image URL"
          value={newSkillImage}
          onChange={(e) => setNewSkillImage(e.target.value)}
          className="mr-2 p-2 border border-gray-300 rounded"
        />
        <button
          className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded"
          onClick={handleAddSkill}
        >
          Add Skill
        </button>
      </div>
    </div>
  );
};

export default TechnicalSkills;
