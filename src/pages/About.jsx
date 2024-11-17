import React from 'react';

const About = () => {
  return (
    <div className="min-h-screen bg-white flex flex-col items-center py-10 px-5">
      <h1 className="text-4xl font-bold text-blue-600 mb-6">
        About Our Safety Tracking Platform
      </h1>
      <p className="text-lg text-gray-700 leading-relaxed max-w-3xl text-center mb-8">
        In today’s world, ensuring the safety of our loved ones has become a top priority. 
        This platform is designed to address that need by providing real-time tracking 
        of individuals' locations and offering critical safety status updates. Whether you're 
        concerned about a family member or monitoring safety conditions for someone in need, 
        our system brings peace of mind through advanced technology and a user-friendly experience.
      </p>
      <div className="bg-white rounded-lg shadow-lg p-6 max-w-4xl">
        <h2 className="text-2xl font-semibold text-blue-500 mb-4">Our Mission</h2>
        <p className="text-gray-600">
          Our mission is to leverage cutting-edge technology to improve safety and 
          communication for individuals and families. By providing accurate location 
          tracking and personalized safety updates, we aim to foster a sense of security 
          and preparedness in any situation.
        </p>
      </div>
      <div className="bg-white rounded-lg shadow-lg p-6 mt-8 max-w-4xl">
        <h2 className="text-2xl font-semibold text-blue-500 mb-4">How It Works</h2>
        <ul className="list-disc list-inside text-gray-600">
          <li>Users' real-time locations are updated and displayed on an interactive map.</li>
          <li>Safety status is determined dynamically and shown for immediate context.</li>
          <li>Designed with accessibility and simplicity in mind, the platform is intuitive for all users.</li>
        </ul>
      </div>
      <p className="text-gray-500 mt-10">
        Together, let's create a safer world for everyone.
      </p>
    </div>
  );
};

export default About;
