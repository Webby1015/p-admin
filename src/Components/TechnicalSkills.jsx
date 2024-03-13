import React from "react";

const TechnicalSkills = () => {
  // Online placeholder image URL
  const placeholderImageURL = "https://via.placeholder.com/150";

  const gradientStyle = {
    background: "linear-gradient(to bottom, #87CEFA, #87CEEB)",
  };

  const skillsData = [
    {
      imageSrc: placeholderImageURL,
      altText: "Autodesk Maya",
      skillName: "Autodesk Maya",
    },
    {
      imageSrc: placeholderImageURL,
      altText: "Autodesk 3ds Max",
      skillName: "Autodesk 3ds Max",
    },
    {
      imageSrc: "https://www.adobe.com/content/dam/cc/icons/pt_appicon_256.svg",
      altText: "Substance Painter",
      skillName: "Substance Painter",
    },
    {
      imageSrc: "https://www.adobe.com/content/dam/acom/one-console/icons_rebrand/ps_appicon.svg",
      altText: "Photoshop",
      skillName: "Photoshop",
    },
    {
      imageSrc: placeholderImageURL,
      altText: "Illustrator",
      skillName: "Illustrator",
    },
    {
      imageSrc: placeholderImageURL,
      altText: "After Effects",
      skillName: "After Effects",
    },
  ];

  const SkillCard = ({ imageSrc, altText, skillName }) => (
    <div className="p-5">
      <div className="bg-white rounded-lg shadow-lg p-2 bg-opacity-35 hover:shadow-2xl duration-300">
        <img
          src={imageSrc}
          alt={altText}
          className="mx-auto mb-2 rounded-full h-48"
        />
        <p className="text-center">{skillName}</p>
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
        {skillsData.map((skill, index) => (
          <SkillCard
            key={index}
            imageSrc={skill.imageSrc}
            altText={skill.altText}
            skillName={skill.skillName}
          />
        ))}
      </div>
    </div>
  );
};

export default TechnicalSkills;
