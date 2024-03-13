import React from 'react';
import {Link} from "react-router-dom"
function Footer() {
  return (
    <footer className="bg-white-800 text-white py-4  mb-14 h-14  lg:m-0">
      <div className="container mx-auto text-center">
        <div className="flex ">
        <div className=" flex mr-10">
            <p className="text-sm text-slate-800 ml-10">&copy; 2024 <a className=' hover:text-blue-600' href="https://github.com/Webby1015">Abhishek Vedant</a>. All Rights Reserved</p>
          </div>
          <div className="flex justify-center ml-auto mr-10">
                <Link to="/Terms" className="text-slate-800 text-sm hover:text-blue-600">Terms of Service</Link>
                <Link to="/policy" className="text-slate-800 text-sm ml-10 hover:text-blue-600">Privacy Policy</Link>
          </div>
          
        </div>
      </div>
    </footer>
  );
}

export default Footer;