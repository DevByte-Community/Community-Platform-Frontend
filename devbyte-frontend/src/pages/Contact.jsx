import React, { useState } from "react";
import {
  FaArrowRightLong,
  FaGithub,
  FaLinkedin,
  FaXTwitter,
  FaWhatsapp,
} from "react-icons/fa6";

const Contact = () => {
  const [formData, setFormData] = useState({ name: "", message: "" });

  const teamMembers = [
    { name: "Jane Doe", role: "Fullstack Developer" },
    { name: "Jane Doe", role: "Fullstack Developer" },
    { name: "Jane Doe", role: "Fullstack Developer" },
  ];

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSend = () => {
    console.log("Message sent:", formData);
    setFormData({ name: "", message: "" });
  };

  return (
    <div className="flex flex-col min-h-screen bg-white dark:bg-slate-950 transition-colors duration-500">
      {/* Hero Section */}
      <div className="w-full py-16 sm:py-20 md:py-24 px-4 sm:px-6 lg:px-8 bg-gradient-to-r from-[#EAF4FF] to-[#FFFFFF] dark:from-[#0F3F58] dark:to-[#282B5C]">
        <div className="max-w-4xl mx-auto flex flex-col items-center justify-center text-center">
          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-4 sm:mb-6 leading-tight text-gray-900 dark:text-white">
            Let's Build and Connect
          </h1>
          <p className="text-gray-700 dark:text-gray-300 text-sm sm:text-base md:text-lg lg:text-xl max-w-3xl">
            Devbyte is powered by creators, thinkers and tech lovers. Whether
            you want to collaborate, sponsor, or just say hi, we'd love to hear
            from you
          </p>
        </div>
      </div>

      {/* Contact & Collaboration Section */}
      <div className="flex-1 py-12 sm:py-16 md:py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8 lg:gap-10">
          {/* Send Message Form */}
          <div className="bg-[#f8fafc] dark:bg-[#161B22] rounded-lg p-6 sm:p-8 transition-colors duration-300">
            <h2 className="text-xl sm:text-2xl font-semibold text-gray-900 dark:text-white mb-2">
              Send a message
            </h2>
            <p className="text-sm sm:text-base text-gray-600 dark:text-gray-400 mb-6">
              We'd love to hear from you! Fill out the form below to get in
              touch
            </p>
            <div className="flex flex-col gap-4">
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                className="h-10 sm:h-12 border text-sm sm:text-base rounded-md border-gray-300 dark:border-gray-500 px-3 sm:px-4 py-2 dark:bg-[#0D1117] dark:text-white outline-none  transition"
                placeholder="Your Name"
              />
              <textarea
                name="message"
                value={formData.message}
                onChange={handleInputChange}
                className="h-24 sm:h-28 border text-sm sm:text-base rounded-md border-gray-300 dark:border-gray-500 px-3 sm:px-4 py-2 dark:bg-[#0D1117] dark:text-white outline-none  transition resize-none"
                placeholder="Type your message"
              />
              <button
                onClick={handleSend}
                className="border border-gray-300 dark:border-gray-500 text-sm sm:text-base font-medium px-6 py-2.5 sm:py-3 rounded-md transition w-fit"
              >
                Send
              </button>
            </div>
          </div>

          {/* Collaborate Section */}
          <div className="bg-[#f8fafc] dark:bg-[#161B22] rounded-lg p-6 sm:p-8 transition-colors duration-300 flex flex-col justify-between">
            <div>
              <h2 className="text-xl sm:text-2xl font-semibold text-gray-900 dark:text-white mb-4">
                Collaborate or Sponsor
              </h2>
              <div className="space-y-3 mb-6">
                <p className="text-sm sm:text-base text-gray-700 dark:text-gray-300">
                  Partner with us to create meaningful connections and bring
                  innovative ideas into life.
                </p>
                <p className="text-sm sm:text-base text-gray-700 dark:text-gray-300">
                  Whether you are looking to collaborate on projects or support
                  our initiatives, we'd love to hear from you.
                </p>
              </div>
            </div>
            <div className="space-y-4">
              <button className="border border-gray-300 dark:border-gray-500 text-sm sm:text-base font-medium px-6 py-2.5 sm:py-3 rounded-md transition w-fit">
                Let's talk
              </button>
              <p className="flex items-center gap-2 text-[#00C38A] hover:text-[#00D99A] text-sm sm:text-base cursor-pointer transition">
                View Sponsorship guide <FaArrowRightLong size={14} />
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Meet Our Community Section */}
      <div className="py-12 sm:py-16 md:py-20 px-4 sm:px-6 lg:px-8 ">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-semibold text-center text-gray-900 dark:text-white mb-12 sm:mb-16">
            Meet our Community
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
            {teamMembers.map((member, index) => (
              <div
                key={index}
                className="bg-[#f8fafc] dark:bg-[#161B22] rounded-lg p-6 sm:p-8 text-center transition-colors duration-300"
              >
                <div className="mb-6 flex justify-center">
                  <div className="w-24 h-24 rounded-full bg-gradient-to-br from-[#00AEEF] to-[#6A5DFF] p-0.5">
                    <div className="w-full h-full rounded-full bg-white dark:bg-[#22262B]"></div>
                  </div>
                </div>
                <h3 className="text-lg sm:text-xl font-semibold text-gray-900 dark:text-white mb-1">
                  {member.name}
                </h3>
                <p className="text-sm text-gray-600 dark:text-slate-400 mb-6">
                  {member.role}
                </p>
                <div className="flex justify-center gap-4">
                  <a
                    href="#"
                    className="text-gray-700 dark:text-slate-400 transition transform hover:scale-110"
                  >
                    <FaGithub size={20} />
                  </a>
                  <a
                    href="#"
                    className="text-gray-700 dark:text-slate-400 transition transform hover:scale-110"
                  >
                    <FaXTwitter size={20} />
                  </a>
                  <a
                    href="#"
                    className="text-gray-700 dark:text-slate-400 transition transform hover:scale-110"
                  >
                    <FaLinkedin size={20} />
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Stay Connected Section */}
      <div className="py-12 sm:py-16 md:py-20 px-4 sm:px-6 lg:px-8 ">
        <div className="max-w-2xl mx-auto text-center">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold dark:text-white mb-4 sm:mb-6">
            Stay connected with Devbyte
          </h2>
          <p className="dark:text-gray-300 text-sm sm:text-base md:text-lg mb-10 sm:mb-12 px-2">
            Follow us and stay updated with new events, projects and new
            releases
          </p>
          <div className="flex justify-center gap-6 sm:gap-8 flex-wrap">
            <a
              href="#"
              className="dark:text-white  transition transform hover:scale-110"
            >
              <FaWhatsapp size={28} className="sm:w-8 sm:h-8" />
            </a>
            <a
              href="#"
              className="dark:text-white  transition transform hover:scale-110"
            >
              <FaGithub size={28} className="sm:w-8 sm:h-8" />
            </a>
            <a
              href="#"
              className="dark:text-white  transition transform hover:scale-110"
            >
              <FaXTwitter size={28} className="sm:w-8 sm:h-8" />
            </a>
            <a
              href="#"
              className="dark:text-white  transition transform hover:scale-110"
            >
              <FaLinkedin size={28} className="sm:w-8 sm:h-8" />
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;
