import React from "react";

const Contact = () => {
  const developers = [
    {
      name: "Harsh Dugar",
      github: "https://github.com/h3rshh",
      linkedin: "https://linkedin.com/in/",
      email: "harsh.dugar22@spit.ac.in",
    },
    {
      name: "Aditya Nagane",
      github: "https://github.com/adityanagane",
      linkedin: "https://linkedin.com/in/adityanagane",
      email: "aditya.nagane23@spit.ac.in",
    },
  ];

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 p-6">
      <h1 className="text-3xl font-bold text-gray-800 mb-8">Contact Us</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 w-full max-w-4xl">
        {developers.map((dev, index) => (
          <div
            key={index}
            className="bg-white rounded-lg shadow-md p-6 flex flex-col items-center text-center"
          >
            <h2 className="text-xl font-semibold text-gray-700 mb-4">
              {dev.name}
            </h2>
            <ul className="text-gray-600 space-y-2">
              <li>
                <span className="font-semibold">GitHub: </span>
                <a
                  href={dev.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-500 hover:underline"
                >
                  {dev.github}
                </a>
              </li>
              <li>
                <span className="font-semibold">LinkedIn: </span>
                <a
                  href={dev.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-500 hover:underline"
                >
                  {dev.linkedin}
                </a>
              </li>
              <li>
                <span className="font-semibold">Email: </span>
                <a
                  href={`mailto:${dev.email}`}
                  className="text-blue-500 hover:underline"
                >
                  {dev.email}
                </a>
              </li>
            </ul>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Contact;
