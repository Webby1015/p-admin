import React from "react";

const AboutMe = () => {
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
        <span className="">About </span><span className="font-thin bg-violet-300 rounded-full">Me</span>
      </h2>

      <p className="text-xl text-gray-700 leading-relaxed lg:mr-20 lg:ml-20 ">
        Hello! I am Prakhar Sharma, a dedicated 3D artist with a passion for
        creating immersive worlds and characters that tell compelling stories.
        Proficient in a range of industry-standard tools including Autodesk
        Maya, 3ds Max, Substance Painter, Photoshop, and ZBrush, I bring to life
        environments that transport audiences and characters that resonate
        deeply. My focus lies not just in crafting visually stunning scenes, but
        in weaving narratives through intricate details, ensuring each project
        is a journey of discovery for the viewer.
      </p>
      <br />
      <p className="text-xl text-gray-700 leading-relaxed lg:mr-20 lg:ml-20 ">
        Specializing in the creation of dynamic visual effects, I thrive on the
        challenge of making the impossible seem tangible. Whether it's a
        bustling futuristic cityscape or a fantastical creature brought to life,
        I immerse myself in the process, pushing creative boundaries at every 
        turn. Each project is an opportunity to collaborate with fellow artists
        and creators, blending expertise and ideas to transform concepts into
        extraordinary realities.
      </p>
      <br />
      <p className="text-xl text-gray-700 leading-relaxed lg:mr-20 lg:ml-20 ">
        With a firm belief in the power of collaboration, I eagerly seek out
        opportunities to work with others who share a passion for storytelling
        and visual artistry. Let's embark on a journey together, where our
        combined vision and skills culminate in something truly extraordinary.
        Whether it's a game, film, animation, or virtual experience, I am
        committed to bringing our collective dreams to vivid, breathtaking life.
      </p>
    </div>
  );
};

export default AboutMe;
