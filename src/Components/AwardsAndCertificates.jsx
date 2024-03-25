import React, { useState, useEffect } from "react";
import { db, storage } from "../firebase"; // Assuming you have initialized Firebase and exported 'storage'
import {
  getDocs,
  collection,
  addDoc,
  deleteDoc,
  doc,
} from "firebase/firestore";
import { ref, uploadBytes, getDownloadURL, deleteObject } from "firebase/storage";

const AwardsAndCertificates = () => {
  const [certificates, setCertificates] = useState([]);
  const [newCertificate, setNewCertificate] = useState({
    name: "",
    image: "",
  });
  const certificatesRef = collection(db, "certificates");

  useEffect(() => {
    getCertificates();
  }, []);

  const getCertificates = async () => {
    try {
      const data = await getDocs(certificatesRef);
      const filteredData = data.docs.map((doc) => ({
        ...doc.data(),
        id: doc.id,
      }));
      setCertificates(filteredData);
    } catch (err) {
      console.error(err);
    }
  };

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setNewCertificate({
      ...newCertificate,
      [name]: value,
    });
  };

  const handleImageUpload = async (imageFile, certificateName) => {
    try {
      const storageRef = ref(storage, `Certificates/${certificateName}`);
      await uploadBytes(storageRef, imageFile);
      const downloadURL = await getDownloadURL(storageRef);
      return downloadURL;
    } catch (error) {
      console.error("Error uploading image: ", error);
      throw error;
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const imageURL = await handleImageUpload(
        newCertificate.image,
        newCertificate.name
      );

      const certificateData = {
        name: newCertificate.name,
        image: imageURL,
      };

      const addedCertificate = await addDoc(certificatesRef, certificateData);

      setCertificates([
        ...certificates,
        { ...certificateData, id: addedCertificate.id },
      ]);
      setNewCertificate({
        name: "",
        image: "",
      });
    } catch (err) {
      console.error(err);
    }
  };

  const handleDelete = async (id, imageURL) => {
    try {
      // Delete certificate image from storage
      const imageRef = ref(storage, imageURL);
      await deleteObject(imageRef);

      // Delete certificate document from Firestore
      await deleteDoc(doc(db, "certificates", id));

      // Update certificates state without the deleted certificate
      const updatedCertificates = certificates.filter(
        (certificate) => certificate.id !== id
      );
      setCertificates(updatedCertificates);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div id="Awards" className="flex flex-col justify-center items-center">
      <h2 className="text-5xl font-bold mt-32 mb-10 text-gray-900 leading-tight text-center">
        <span className="">Awards & </span>{" "}
        <span className="font-thin">Certifica</span>
        <span className="font-thin bg-violet-300 rounded-full">tes</span>
      </h2>
      <div className="lg:grid grid-cols-3 gap-4">
        {certificates.map((certificate) => (
          <div
            key={certificate.id}
            className="bg-transparent p-2 bg-opacity-35 rounded-lg duration-200 flex flex-col items-center m-5"
          >
            <img
              src={certificate.image}
              alt={certificate.name}
              className="mx-auto shadow-md rounded-sm hover:shadow-2xl transition-shadow duration-300 mb-4 w-96 h-52 object-cover"
            />
            <p className="text-lg text-center">{certificate.name}</p>
            <button
              onClick={() => handleDelete(certificate.id, certificate.image)}
              className="mt-2 bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
            >
              Delete
            </button>
          </div>
        ))}
      </div>

      {/* Form to add new certificate */}
      <form onSubmit={handleSubmit} className="mt-8">
        <input
          type="text"
          name="name"
          placeholder="Certificate Name"
          value={newCertificate.name}
          onChange={handleInputChange}
          className="border rounded-md px-4 py-2 mr-2"
        />
        <input
          type="file"
          name="image"
          onChange={(e) =>
            setNewCertificate({ ...newCertificate, image: e.target.files[0] })
          }
          className="border rounded-md px-4 py-2 mr-2"
        />
        <button
          type="submit"
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        >
          Add Certificate
        </button>
      </form>
    </div>
  );
};

export default AwardsAndCertificates;
