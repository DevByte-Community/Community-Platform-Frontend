import React from "react";
import Card from "@/components/ui/Card";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { hoverEffect } from "@/lib/HoverEffect";
import { useNavigate } from "react-router-dom";

const MembersSection = ({
  title,
  subtitle,
  memberChunks,
  membersSlideIndex,
  goToPrevMembers,
  goToNextMembers,
  goToMembersSlide,
}) => {
  const BASE_URL = import.meta.env.VITE_IMAGE_BASE_URL;
  const navigate = useNavigate();
  return (
    <div className="py-[100px]">
      <div className="text-center max-w-[1200px] mx-auto px-4">
        <h1 className="text-[28px] font-semibold text-center">{title}</h1>
        <h1 className="pt-2 text-[18px] text-center">{subtitle}</h1>
      </div>

      <div className="relative max-w-[1200px] mx-auto px-4 mt-7 ">
        <div className="relative h-[250px] ">
          <div className="relative h-full ">
            {memberChunks.map((chunk, idx) => (
              <div
                key={`members-chunk-${idx}`}
                className={`absolute inset-0 transition-all duration-1000 ease-in-out ${
                  idx === membersSlideIndex
                    ? "opacity-100 translate-x-0"
                    : idx < membersSlideIndex
                      ? "opacity-0 -translate-x-full"
                      : "opacity-0 translate-x-full"
                }`}
              >
                <div className="flex items-center justify-center w-full h-full">
                  <div className="grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-3 justify-items-center lg:px-[0px] md:px-10 px-6">
                    {chunk.map((member, mIdx) => (
                      <div
                        key={`member-card-${idx}-${mIdx}`}
                        className={`flex flex-col items-center space-y-[6px] p-5 lg:w-[360px] md:w-[300px] w-[300px] h-[212px] shadow-sm bg-[#00AEEF]/[5%]  dark:bg-[#161B22] border border-gray-200 rounded-xl dark:border-[#2A2F36] dark:text-white  ${hoverEffect}`}
                      >
                        <img
                          src={
                            member.profilePicture
                              ? `${BASE_URL}/${member.profilePicture}`
                              : ""
                          }
                          alt={member.fullname}
                          className="w-[80px] h-[80px] rounded-full"
                        />
                        <h1 className="text-[18px] font-semibold">
                          {member.fullname}
                        </h1>
                        <h1 className="text-[16px]">{member.role}</h1>
                        {member.stack && (
                          <h1 className="bg-[#fafafa] dark:bg-black dark:text-gray-300 border border-gray-200 dark:border-[#2A2F36] rounded-sm text-black py-[2px] px-2 text-[12px] font-semibold">
                            {typeof member.stack === "string"
                              ? member.stack
                              : member.stack.name}
                          </h1>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
          {/* Navigation Buttons */}
          <button
            onClick={goToPrevMembers}
            className="absolute left-0 p-2 -translate-y-1/2 rounded-full top-1/2 bg-black/10 hover:bg-black/20 dark:bg-white/20 dark:hover:bg-white/40"
            aria-label="Previous members"
          >
            <ChevronLeft size={22} />
          </button>
          <button
            onClick={goToNextMembers}
            className="absolute right-0 p-2 -translate-y-1/2 rounded-full top-1/2 bg-black/10 hover:bg-black/20 dark:bg-white/20 dark:hover:bg-white/40"
            aria-label="Next members"
          >
            <ChevronRight size={22} />
          </button>

          {/* Dots */}
          <div className="flex justify-center gap-2 mb-10 ">
            {memberChunks.map((_, i) => (
              <button
                key={`member-dot-${i}`}
                onClick={() => goToMembersSlide(i)}
                className={`h-2 rounded-full transition-all ${
                  i === membersSlideIndex
                    ? "w-6 bg-black dark:bg-white"
                    : "w-2 bg-black/40 dark:bg-white/40"
                }`}
                aria-label={`Go to members slide ${i + 1}`}
              />
            ))}
          </div>
        </div>
      </div>

      <div className="flex flex-col items-center w-full px-4 mt-10 md:mt-12">
        <Button
          children="Explore All Members"
          onClick={() => navigate("/members")}
          className="text-white transition-colors duration-500 ease-in-out bg-blue-500 hover:bg-blue-700"
        />
      </div>
    </div>
  );
};

export default MembersSection;
