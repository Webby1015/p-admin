import React from 'react';

const ContactMe = () => {
  const gradientStyle = {
    background: 'linear-gradient(to bottom, #F0F8FF, white)',
  };

  return (
    <div id='Contact' >
    <div  className="h-screen flex flex-col justify-center items-center" style={gradientStyle}>
    <h2 className="text-5xl font-bold mb-10 text-gray-900 leading-tight ">
        <span className="">Contact </span><span className="font-thin bg-violet-300 rounded-full">Me</span>
      </h2>
      <p className="text-lg mb-4 text-center">Feel free to reach out to me:</p>
      <div class="bg-gray-200 p-10 rounded-md shadow-inner">
  <div class="flex flex-row flex-wrap justify-center">
    <div class="w-full md:w-1/2 lg:w-1/3 xl:w-1/4 p-4">
      <div class="bg-blue-200 shadow-md rounded px-6 py-8">
        <p class="text-lg">Email: <a href="mailto:example@example.com" class="text-blue-700">Write an Email</a></p>
      </div>
    </div>
    <div class="w-full md:w-1/2 lg:w-1/3 xl:w-1/4 p-4">
      <div class="bg-green-200 shadow-md rounded px-6 py-8">
        <p class="text-lg">Phone: <a href="tel:+1234567890" class="text-green-700">+1234567890</a></p>
      </div>
    </div>
    <div class="w-full md:w-1/2 lg:w-1/3 xl:w-1/4 p-4">
      <div class="bg-yellow-200 shadow-md rounded px-6 py-8">
        <p class="text-lg">Linkedin: <a href="#" class="text-yellow-700">View Profile</a></p>
      </div>
    </div>
  </div>
</div>


    </div>
    
    </div>
  );
}

export default ContactMe;
