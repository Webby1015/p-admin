import React, { useEffect, useState } from "react";
import { db } from "../firebase";
import {
  getDocs,
  collection,
  updateDoc,
  doc,
} from "firebase/firestore";

const AboutMe = () => {
  const [paragraphs, setParagraphs] = useState([]);
  const [para1, setPara1] = useState("");
  const [para2, setPara2] = useState("");
  const [para3, setPara3] = useState("");

  const ParaRef = collection(db, "AboutMe");

  const updatePara = async (id, updatedPara) => {
    const reference = doc(db, "AboutMe", id);
    try {
      await updateDoc(reference, { paragraph: updatedPara });
      getParas();
    } catch (error) {
      console.error(error);
    }
  };

  const getParas = async () => {
    try {
      const data = await getDocs(ParaRef);
      const filteredData = data.docs.map((doc) => ({
        ...doc.data(),
        id: doc.id,
      }));
      filteredData.sort((a, b) => a.id - b.id);
      setParagraphs(filteredData);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    getParas();
  }, []);

  const handlePara1Change = (event) => {
    setPara1(event.target.value);
  };

  const handlePara2Change = (event) => {
    setPara2(event.target.value);
  };

  const handlePara3Change = (event) => {
    setPara3(event.target.value);
  };

  const handleUpdatePara1 = () => {
    updatePara(paragraphs[0].id, para1);
  };

  const handleUpdatePara2 = () => {
    updatePara(paragraphs[1].id, para2);
  };

  const handleUpdatePara3 = () => {
    updatePara(paragraphs[2].id, para3);
  };

  const gradientStyle = {
    background: "linear-gradient(to bottom, white, #87CEFA)",
  };

  return (
    <div
      id="About"
      className="lg:h-screen flex flex-col justify-center items-center px-8"
      style={gradientStyle}
    >
      <h2 className="text-5xl font-bold mb-10 text-gray-900 leading-tight ">
        <span className="">About </span>
        <span className="font-thin bg-violet-300 rounded-full">Me</span>
      </h2>

      <p className="text-xl text-gray-700 leading-relaxed lg:mr-20 lg:ml-20 ">
        {paragraphs.length > 0 && paragraphs[0].paragraph}
      </p>
      <div className="flex-row">
        <input
          type="text"
          value={para1}
          className="mx-1 p-3 mb-2 border border-gray-300 rounded-md focus:outline-none focus:border-indigo-500"
          onChange={handlePara1Change}
        />
        <button
          className=" bg-blue-500 hover:bg-blue-400 p-1 rounded-xl"
          onClick={handleUpdatePara1}
        >
          Update
        </button>
      </div>
      <br />
      <p className="text-xl text-gray-700 leading-relaxed lg:mr-20 lg:ml-20 ">
        {paragraphs.length > 1 && paragraphs[1].paragraph}
      </p>
      <div className="flex-row">
        <input
          type="text"
          value={para2}
          className="mx-1 p-3 mb-2 border border-gray-300 rounded-md focus:outline-none focus:border-indigo-500"
          onChange={handlePara2Change}
        />
        <button
          className=" bg-blue-500 hover:bg-blue-400 p-1 rounded-xl"
          onClick={handleUpdatePara2}
        >
          Update
        </button>
      </div>
      <br />
      <p className="text-xl text-gray-700 leading-relaxed lg:mr-20 lg:ml-20 ">
        {paragraphs.length > 2 && paragraphs[2].paragraph}
      </p>
      <div className="flex-row">
        <input
          type="text"
          value={para3}
          className="mx-1 p-3 mb-2 border border-gray-300 rounded-md focus:outline-none focus:border-indigo-500"
          onChange={handlePara3Change}
        />
        <button
          className=" bg-blue-500 hover:bg-blue-400 p-1 rounded-xl"
          onClick={handleUpdatePara3}
        >
          Update
        </button>
      </div>
    </div>
  );
};

export default AboutMe;


