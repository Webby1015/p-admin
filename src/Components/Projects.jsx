import React from 'react';

const Projects = () => {
  // Placeholder image URL
  const placeholderImageURL = 'https://via.placeholder.com/150';

  // Placeholder projects with links
  const placeholderProjects = [
    { 
      name: 'Placeholder Project 1', 
      image: placeholderImageURL,
      description: 'This is a placeholder project 1.',
      visitLink: 'https://example.com/project1'
    },
    { 
      name: 'Placeholder Project 2', 
      image: placeholderImageURL,
      description: 'This is a placeholder project 2.',
      visitLink: 'https://example.com/project2'
    },
    { 
      name: 'Placeholder Project 3', 
      image: placeholderImageURL,
      description: 'This is a placeholder project 3.',
      visitLink: 'https://example.com/project3'
    },
    { 
      name: 'Placeholder Project 4', 
      image: placeholderImageURL,
      description: 'This is a placeholder project 4.',
      visitLink: 'https://example.com/project4'
    },
    { 
      name: 'Placeholder Project 5', 
      image: placeholderImageURL,
      description: 'This is a placeholder project 5.',
      visitLink: 'https://example.com/project5'
    },
    { 
      name: 'Placeholder Project 6', 
      image: placeholderImageURL,
      description: 'This is a placeholder project 6.',
      visitLink: 'https://example.com/project6'
    }
  ];

  const gradientStyle = {
    background: 'linear-gradient(to bottom, #87CEEB,#87CEEB)',
  };

  return (
    <div id='Projects'>
      <div className="flex flex-col justify-center items-center" style={gradientStyle}>
        <h2 className="text-5xl font-bold mt-32 mb-10 text-gray-900 leading-tight text-center">
          <span className="">My </span><span className='font-thin'>Proje</span><span className="font-thin bg-violet-300 rounded-full">cts</span>
        </h2>
        <div className="lg:grid grid-cols-3 gap-4">
          {placeholderProjects.map((project, index) => (
            <div key={index} className="bg-white p-4 bg-opacity-35 rounded-lg shadow-sm hover:shadow-2xl duration-300 flex flex-col items-start m-5">
              <img src={project.image} alt={project.name} className="mx-auto mb-4 w-96 h-52 object-cover" />
              <p className="text-lg mb-3 font-bold text-center">{project.name}</p>
              <p className="text-sm text-center mb-2 font-thin">{project.description}</p>
              {/* Button is created here with the link */}
              <a href={project.visitLink} target="_blank" rel="noopener noreferrer" className="bg-slate-300 shadow-inner hover:bg-stone-400 duration-300 font-bold py-2 px-4 rounded ">Visit</a>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Projects;
