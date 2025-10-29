import { Search } from "lucide-react";
import React from "react";

const Jobs = () => {
  const jobs = [
    {
      id: 1,
      title: "Frontend Developer (React)",
      company: "DevByte",
      location: "Lagos, Nigeria",
      date: "3 days ago",
      description:
        "Looking for a skilled React developer to collaborate on a SaaS dashboard project. Flexible schedule, paid role.",
      tags: ["React", "JavaScript"],
      rate: "$50/hr",
    },
    {
      id: 2,
      title: "UI/UX Designer",
      company: "DevByte",
      location: "Lagos, Nigeria",
      date: "5 days ago",
      description:
        "Seeking a creative designer to revamp our mobile app screens with modern UI patterns and smooth UX.",
      tags: ["Wireframe", "UX Writing"],
      rate: "$70/hr",
    },
    {
      id: 3,
      title: "UI/UX Designer",
      company: "DevByte",
      location: "Lagos, Nigeria",
      date: "5 days ago",
      description:
        "Seeking a creative designer to revamp our mobile app screens with modern UI patterns and smooth UX.",
      tags: ["Wireframe", "UX Writing"],
      rate: "$70/hr",
    },
  ];

  return (
    <>
      {/* Hero Section */}
      <section className="w-full text-center py-24 px-6 sm:px-8 md:px-10 bg-gradient-to-r from-[#EAF4FF] to-[#FFFFFF] dark:from-[#0F3F58] dark:to-[#282B5C] transition-colors duration-500">
        <div className="max-w-4xl mx-auto flex flex-col items-center justify-center">
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold mb-4 leading-tight bg-gradient-to-r from-[#00AEEF] to-[#6A5DFF] bg-clip-text text-transparent">
            Jobs & Opportunities
          </h1>
          <p className="text-gray-700 dark:text-gray-300 text-base sm:text-lg md:text-xl mb-10 max-w-2xl">
            Join our mission — find roles, internships, and collaboration
            opportunities
          </p>
        </div>
      </section>

      {/* Filter Section */}

      <section className="w-full bg-[#f8fafc] dark:bg-[#262C36] py-6 px-4 sm:px-8 border-t border-gray-300 dark:border-gray-500 transition-colors duration-300 border">
        <div className="max-w-6xl mx-auto flex flex-col sm:flex-row flex-wrap gap-4 sm:gap-6 items-center justify-evenly">
          {/* Selects */}
          <select className="bg-gray-300 dark:bg-[#1E1E1E] text-gray-800 dark:text-white px-4 rounded-md outline-none border border-gray-300 dark:border-gray-700 w-[200px] h-[40px] transition-colors duration-300">
            <option>Job Type</option>
            <option>Full-time</option>
            <option>Part-time</option>
            <option>Internship</option>
          </select>

          <select className="bg-gray-300 dark:bg-[#1E1E1E] text-gray-800 dark:text-white px-4 rounded-md outline-none border border-gray-300 dark:border-gray-700 w-[200px] h-[40px] transition-colors duration-300">
            <option>Location</option>
            <option>Lagos</option>
            <option>Abuja</option>
            <option>Remote</option>
          </select>

          <select className="bg-gray-300 dark:bg-[#1E1E1E] text-gray-800 dark:text-white px-4 rounded-md outline-none border border-gray-300 dark:border-gray-700 w-[200px] h-[40px] transition-colors duration-300">
            <option>Department</option>
            <option>Engineering</option>
            <option>Design</option>
            <option>Marketing</option>
          </select>

          {/* Search */}
          <div className="flex items-center bg-white dark:bg-transparent border border-gray-300 dark:border-gray-300 rounded-md px-3 w-full sm:w-[250px] h-[40px] transition-colors duration-300">
            <Search className="  w-5 h-5 mr-2" />
            <input
              type="text"
              placeholder="Search by Keyword..."
              className="bg-transparent text-gray-800 dark:text-black placeholder-black dark:placeholder-white focus:outline-none w-full text-sm"
            />
          </div>
        </div>
      </section>

      {/* Job Listing Section */}
      <section className="w-full bg-[#f8fafc] dark:bg-[#0D1117] text-gray-900 dark:text-white py-10 px-4 sm:px-8 transition-colors duration-300">
        <div className="flex flex-col gap-6 max-w-6xl mx-auto dark:bg-[#161B22] border-radius-md">
          {jobs.map((job) => (
            <div
              key={job.id}
              className="border border-gray-300 dark:border-white rounded-md p-4 sm:p-6 flex flex-col sm:flex-row sm:justify-between sm:items-center transition-all hover:border-white hover:shadow-[0_0_10px_#00FFFF30]"
            >
              <div>
                <p className="text-gray-500 dark:text-gray-400 text-sm mb-1">
                  {job.company} • {job.location} • {job.date}
                </p>
                <h2 className="text-lg sm:text-xl font-semibold text-gray-900 dark:text-white mb-2">
                  {job.title}
                </h2>
                <p className="text-gray-700 dark:text-gray-300 text-sm mb-3 sm:max-w-[80%]">
                  {job.description}
                </p>
                <div className="flex gap-2 flex-wrap">
                  {job.tags.map((tag, i) => (
                    <span
                      key={i}
                      className="bg-transparent border border-gray-400 dark:border-white text-gray-700 dark:text-white text-xs px-3 py-1 rounded-md"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>

              {/* Right Side — Rate + Buttons */}
              <div className="mt-4 sm:mt-0 flex flex-col items-end gap-2">
                <p className="text-gray-800 dark:text-white font-semibold">
                  {job.rate}
                </p>

                <div className="flex flex-col gap-2">
                  <button className="bg-gradient-to-r from-[#00AEEF] to-[#6A5DFF] text-white font-semibold px-4 py-1 rounded-md text-sm hover:opacity-90 transition-all">
                    Apply
                  </button>

                  <button className="border border-gray-400 dark:border-white text-gray-800 dark:text-white px-4 py-1 rounded-md hover:bg-gray-200 dark:hover:bg-[#00FFFF20] transition-all text-sm">
                    View Details
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Pagination */}
        <div className="flex justify-center items-center gap-2 mt-8">
          <button className="px-4 py-1 border border-gray-400 dark:border-[#00FFFF80] text-gray-800 dark:text-white rounded-md text-sm hover:bg-gray-200 dark:hover:bg-[#00FFFF20] transition-all">
            Prev
          </button>
          <button className="px-4 py-1 bg-gradient-to-r from-[#00AEEF] to-[#6A5DFF] text-white dark:text-black rounded-md text-sm font-semibold transition-all">
            2
          </button>
          <button className="px-4 py-1 border border-gray-400 dark:border-[#00FFFF80] text-gray-800 dark:text-white rounded-md text-sm hover:bg-gray-200 dark:hover:bg-[#00FFFF20] transition-all">
            3
          </button>
          <button className="px-4 py-1 border border-gray-400 dark:border-[#00FFFF80] text-gray-800 dark:text-white rounded-md text-sm hover:bg-gray-200 dark:hover:bg-[#00FFFF20] transition-all">
            Next
          </button>
        </div>

        <div className="w-full bg-[#F9FAFB] dark:bg-[#161B22] text-gray-900 dark:text-white py-16 px-6 mt-16 flex flex-col md:flex-row items-center justify-between md:text-left border border-gray-300 dark:border-[#1e293b] transition-colors duration-500 rounded-md">
          {/* Heading */}
          <h2 className="font-bold ">Have a Role?Post it on DevBytes</h2>

          {/* Gradient Button */}
          <button className="bg-white hover:opacity-90 transition-all text-black font-semibold px-6 py-3 rounded-md shadow-lg border-gray-300 border">
            Post a Role
          </button>
        </div>
      </section>
    </>
  );
};

export default Jobs;
