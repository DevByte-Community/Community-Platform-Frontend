import React from "react";
import Card from "@/components/ui/Card";
import { CircleChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { MdLayers } from "react-icons/md";
import { hoverEffect } from "@/lib/HoverEffect";

const BlogSection = ({ blogPosts }) => {
  return (
    <div className="py-[100px]">
      <div className="text-center max-w-[1200px] mx-auto px-4">
        <h1 className="text-[28px] font-semibold">From the Devbyte Blog</h1>
        <h1 className="pt-2 text-[18px]">
          Community updates, tutorials and industry insights
        </h1>
      </div>
      {blogPosts && blogPosts.length > 0 ? (
        <div className="mt-7 grid gap-4 justify-center 2xl-grid-col-4 xl-grid-col-4 lg:grid-cols-4 md:grid-cols-2 sm:grid-cols-1 lg:px-[90px] md:px-10 px-6">
          {blogPosts.map((blog, bIdx) => (
            <div
              key={`blog-${bIdx}`}
              className={`space-y-3 p-3 shadow-sm dark:bg-[#161B22] border border-gray-200 rounded-xl dark:border-[#2A2F36] dark:text-white  ${hoverEffect}`}
            >
              <img src={blog.coverImage} alt="" className="w-full" />
              <h1 className="bg-gradient-to-r w-fit from-[#e2e3e4] to-[#e0e0e0]  rounded-sm text-black py-[2px] px-2 text-[12px] font-semibold">
                UPDATE
              </h1>
              <h1 className="text-[20px] font-semibold">{blog.title}</h1>
              <h1>{blog.description}</h1>
              <a
                className="flex bg-clip-text text-transparent bg-gradient-to-r from-[#00AEEF] to-[#6A5DFF] text-[14px] w-full gap-2 justify-center items-center"
                href=""
              >
                Read More <CircleChevronRight size={15} color="#00AEEF" />
              </a>
            </div>
          ))}
        </div>
      ) : (
        <div className="flex flex-col justify-center items-center h-[50vh] gap-1">
          <MdLayers className="text-[10rem] text-gray-500" />
          <p className="text-xl md:text-2xl xl:text-3xl font-bold text-gray-800 dark:text-gray-500">
            No Blog Posts
          </p>
        </div>
      )}

      <div className="flex justify-center w-full px-4 mt-10 md:mt-12">
        <Button
          children="View All Blog Posts"
          className="text-white transition-colors duration-500 ease-in-out bg-blue-500 hover:bg-blue-700"
        />
      </div>
    </div>
  );
};

export default BlogSection;
