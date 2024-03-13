import React from 'react';
import { Link } from 'react-router-dom';

function Terms() {
  return (
    <div className="max-w-2xl mx-auto py-8 px-4">
      <h2 className="text-3xl font-bold mb-4">Terms of Service</h2>
      <p className="mb-4">
        These Terms of Service govern your use of our website. By accessing or using the website,
        you agree to be bound by these terms.
      </p>
      <h3 className="text-xl font-semibold mb-2">Use of Website</h3>
      <p className="mb-4">
        You may use this website for your personal, non-commercial purposes. You agree not to use
        the website for any unlawful or prohibited activities.
      </p>
      <h3 className="text-xl font-semibold mb-2">Intellectual Property</h3>
      <p className="mb-4">
        The content on this website, including but not limited to text, images, logos, and designs,
        is protected by intellectual property laws. You may not reproduce, distribute, or modify
        any content without our prior written consent.
      </p>
      <h3 className="text-xl font-semibold mb-2">Limitation of Liability</h3>
      <p className="mb-4">
        We strive to provide accurate and up-to-date information on this website. However, we make
        no warranties or representations about the accuracy or completeness of the content. We shall
        not be liable for any direct, indirect, incidental, or consequential damages arising out of
        your use of this website.
      </p>
      <h3 className="text-xl font-semibold mb-2">Changes to Terms</h3>
      <p className="mb-4">
        We reserve the right to update or change these Terms of Service at any time. Any changes
        will be posted here, and your continued use of the website after such changes constitutes
        your acceptance of the new terms.
      </p>
      <h3 className="text-xl font-semibold mb-2">Governing Law</h3>
      <p>
        These Terms of Service are governed by and construed in accordance with the laws of your
        jurisdiction.
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

export default Terms;
