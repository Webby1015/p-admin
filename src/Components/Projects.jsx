import React, { useEffect, useState } from "react";
import { db, storage } from "../firebase"; // Assuming you have initialized Firebase and exported 'storage'
import {
  getDocs,
  collection,
  addDoc,
  deleteDoc,
  doc,
} from "firebase/firestore";
import { ref, uploadBytes, getDownloadURL, deleteObject } from "firebase/storage";

const Projects = () => {
  const [projects, setProjects] = useState([]);
  const [newProject, setNewProject] = useState({
    name: "",
    imageURL: "",
    desc: "",
    link: "",
    imageFile: null,
  });
  const projectsRef = collection(db, "MyProjects");

  useEffect(() => {
    getProjects();
  }, []);

  const getProjects = async () => {
    try {
      const data = await getDocs(projectsRef);
      const filteredData = data.docs.map((doc) => ({
        ...doc.data(),
        id: doc.id,
      }));
      setProjects(filteredData);
    } catch (err) {
      console.error(err);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewProject({
      ...newProject,
      [name]: value,
    });
  };

  const handleImageUpload = async (imageFile, projectName) => {
    try {
      const storageRef = ref(storage, `Projects/${projectName}`);
      await uploadBytes(storageRef, imageFile);
      const downloadURL = await getDownloadURL(storageRef);
      return downloadURL;
    } catch (error) {
      console.error("Error uploading image: ", error);
      throw error;
    }
  };

  const handleAddProject = async (e) => {
    e.preventDefault();
    try {
      const imageURL = await handleImageUpload(
        newProject.imageFile,
        newProject.name
      );
      
      const projectData = {
        name: newProject.name,
        desc: newProject.desc,
        link: newProject.link,
        imageURL: imageURL,
      };

      const addedProject = await addDoc(projectsRef, projectData);
      
      setProjects([...projects, { ...projectData, id: addedProject.id }]);
      setNewProject({
        name: "",
        imageURL: "",
        desc: "",
        link: "",
        imageFile: null,
      });
    } catch (err) {
      console.error(err);
    }
  };

  const handleDeleteProject = async (id, imageURL) => {
    try {
      // Delete project image from storage
      const imageRef = ref(storage, imageURL);
      await deleteObject(imageRef);

      // Delete project document from Firestore
      await deleteDoc(doc(db, "MyProjects", id));

      // Update projects state without the deleted project
      const updatedProjects = projects.filter((project) => project.id !== id);
      setProjects(updatedProjects);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div id="Projects">
      <div className="flex flex-col justify-center items-center">
        <h2 className="text-5xl font-bold mt-32 mb-10 text-gray-900 leading-tight text-center">
          <span className="">My </span>
          <span className="font-thin">Proje</span>
          <span className="font-thin bg-violet-300 rounded-full">cts</span>
        </h2>
        <div className="lg:grid grid-cols-3 gap-4">
          {projects.map((project) => (
            <div
              key={project.id}
              className="bg-white p-4 bg-opacity-35 rounded-lg shadow-sm hover:shadow-2xl duration-300 flex flex-col items-start m-5"
            >
              <img
                src={project.imageURL}
                alt={project.name}
                className="mx-auto mb-4 w-96 h-52 object-cover"
              />
              <p className="text-lg mb-3 font-bold text-center">
                {project.name}
              </p>
              <p className="text-sm text-center mb-2 font-thin">
                {project.desc}
              </p>
              <a
                href={project.link}
                target="_blank"
                rel="noopener noreferrer"
                className="bg-slate-300 shadow-inner hover:bg-stone-400 duration-300 font-bold py-2 px-4 rounded"
              >
                Visit
              </a>
              <button
                onClick={() => handleDeleteProject(project.id, project.imageURL)}
                className="bg-red-500 hover:bg-red-600 duration-300 font-bold py-2 px-4 rounded mt-2"
              >
                Delete
              </button>
            </div>
          ))}
        </div>
        <div className="mt-10">
          <h3 className="text-2xl font-bold mb-4">Add New Project</h3>
          <form onSubmit={handleAddProject}>
            <input
              type="text"
              name="name"
              placeholder="Project Name"
              value={newProject.name}
              onChange={handleInputChange}
              className="bg-gray-100 border border-gray-300 rounded-md py-2 px-4 mb-3"
              required
            />
            <input
              type="file"
              name="imageFile"
              onChange={(e) =>
                setNewProject({ ...newProject, imageFile: e.target.files[0] })
              }
              className="bg-gray-100 border border-gray-300 rounded-md py-2 px-4 mb-3"
              required
            />
            <input
              type="text"
              name="desc"
              placeholder="Project Description"
              value={newProject.desc}
              onChange={handleInputChange}
              className="bg-gray-100 border border-gray-300 rounded-md py-2 px-4 mb-3"
              required
            />
            <input
              type="text"
              name="link"
              placeholder="Visit Link"
              value={newProject.link}
              onChange={handleInputChange}
              className="bg-gray-100 border border-gray-300 rounded-md py-2 px-4 mb-3"
              required
            />
            <button
              type="submit"
              className="bg-green-500 hover:bg-green-600 duration-300 text-white font-bold py-2 px-4 rounded"
            >
              Add Project
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Projects;
