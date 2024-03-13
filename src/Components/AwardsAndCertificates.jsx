import React from 'react';

const AwardsAndCertificates = () => {
  // Placeholder image URL
  const placeholderImageURL = 'https://via.placeholder.com/150';

  // Placeholder awards
  const placeholderAwards = [
    { name: 'Placeholder Award 1', image: placeholderImageURL },
    { name: 'Placeholder Award 2', image: placeholderImageURL },
    { name: 'Placeholder Award 3', image: placeholderImageURL },
    { name: 'Placeholder Award 4', image: placeholderImageURL },
    { name: 'Placeholder Award 5', image: placeholderImageURL },
    { name: 'Placeholder Award 6', image: placeholderImageURL },
    { name: 'Placeholder Award 7', image: placeholderImageURL },
    { name: 'Placeholder Award 8', image: placeholderImageURL },
    { name: 'Placeholder Award 9', image: placeholderImageURL },
  ];

  const gradientStyle = {
    background: 'linear-gradient(to bottom, #87CEEB, #F0F8FF)',
  };

  return (
    <div id='Awards' className="flex flex-col justify-center items-center" style={gradientStyle}>
      <h2 className="text-5xl font-bold mt-32 mb-10 text-gray-900 leading-tight text-center">
        <span className="">Awards & </span> <span className="font-thin">Certifica</span>
        <span className="font-thin bg-violet-300 rounded-full">tes</span>
      </h2>
      <div className="lg:grid grid-cols-3 gap-4">
        {placeholderAwards.map((award, index) => (
          <div key={index} className="bg-transparent p-2 bg-opacity-35 rounded-lg duration-200 flex flex-col items-center m-5">
            <img
              src={award.image}
              alt={award.name}
              className="mx-auto shadow-md rounded-sm hover:shadow-2xl transition-shadow duration-300 mb-4 w-96 h-52 object-cover"
            />
            <p className="text-lg  text-center">{award.name}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default AwardsAndCertificates;
