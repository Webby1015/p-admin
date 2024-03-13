import React from 'react';
import { Link } from 'react-router-dom';

function Policy() {
  return (
    <div className="max-w-2xl mx-auto py-8 px-4">
      <h2 className="text-3xl font-bold mb-4">Privacy Policy</h2>
      <p className="mb-4">
        Thank you for visiting our website. This Privacy Policy outlines how we handle information
        that we collect during your visit.
      </p>
      <h3 className="text-xl font-semibold mb-2">Information We Collect</h3>
      <p className="mb-4">
        We do not collect any personal information from you when you visit our website. We do not
        use cookies or any tracking technologies.
      </p>
      <h3 className="text-xl font-semibold mb-2">External Links</h3>
      <p className="mb-4">
        Our website may contain links to external sites that are not operated by us. Please be aware
        that we have no control over the content and practices of these sites, and we cannot accept
        responsibility or liability for their respective privacy policies.
      </p>
      <h3 className="text-xl font-semibold mb-2">Changes to This Privacy Policy</h3>
      <p className="mb-4">
        We reserve the right to update or change our Privacy Policy at any time. Any changes will be
        posted here, so we encourage you to review this Privacy Policy periodically.
      </p>
      <h3 className="text-xl font-semibold mb-2">Contact Us</h3>
      <p>
        If you have any questions or concerns about our Privacy Policy, please contact us at{' '}
        <span className="text-blue-500">vedantabhishek@gmail.com</span>.
      </p>
      <div className="flex justify-center">
        <button className="px-4 py-2 bg-blue-500 m-10 text-white rounded hover:bg-blue-600">
          <Link to="/" className="text-lg p-5 font-semibold">
            Go back to home
          </Link>
        </button>
      </div>
    </div>
  );
}

export default Policy;
