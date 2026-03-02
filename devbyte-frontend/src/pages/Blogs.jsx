import React, { useEffect, useState } from "react";
import BlogsCard from "@/components/Blogs/BlogsCard";
import { toast, Toaster } from "react-hot-toast";
import HeaderWrapper from "@/components/ui/Header";
import Skeleton from "@/components/Blogs/Skeleton";
import { MdLayers } from "react-icons/md";
import blogService from "@/services/blogServices";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";

const Blogs = () => {
  const [blogs, setBlogs] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(false);

  const fetchBlogs = async (page = 1) => {
    try {
      setLoading(true);
      const res = await blogService.getAllBlogs({
        page,
        pageSize: 6,
      });

      setBlogs(res.blogs || []);
      setTotalPages(res.pagination?.totalPages || 1);
    } catch (error) {
      toast.error(error?.message || "Failed to fetch blogs");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBlogs(currentPage);
  }, [currentPage]);

  return (
    <div className="flex flex-col items-center justify-center w-full h-fit">
      <Toaster />

      <HeaderWrapper className="flex justify-start w-full">
        <div className="flex flex-col justify-start text-left">
          <h2 className="text-4xl font-bold xl:text-4xl">Blog & News</h2>
          <p>Latest updates, insights, and stories from our community</p>
        </div>
      </HeaderWrapper>

      <div className=" w-full max-w-[95%]">
        <div className="  my-2 flex flex-col justify-between items-center text-center h-[89vh]">
          <div className=" h-[80%] w-full flex justify-center items-center">
            <div className="px-4 w-full max-w-[90%] h-full flex justify-around  items-center flex-col lg:flex-row">
              <div className="bg-[url(https://images.unsplash.com/photo-1521737604893-d14cc237f11d?w=800&q=80)] bg-cover bg-no-repeat   my-4 md:my-0 h-[50%] w-full max-w-[80%] lg:max-w-[40%] lg:h-[90%]"></div>

              <div className=" h-[30%] lg:h-[50%] flex flex-col gap-2 justify-around lg:w-full lg:max-w-[50%] items-start ">
                <p className="text-[#6A5DFF]">Featued post </p>
                <p className="flex text-2xl font-bold text-start lg:text-4xl">
                  Building the future of Dev communities
                </p>
                <p className="flex text-center lg:text-start">
                  Discover how Debbyte is empowering Developers designers and
                  tech bulders with resources and oppoutunities
                </p>
                <button className="bg-gradient-to-tr  from-[#00AEEF] to-[#6A5DFF] w-full py-2 rounded-2xl text-white text-xl">
                  Read more
                </button>
              </div>
            </div>
          </div>
        </div>

        <div className="flex flex-col my-8 ">
          <div className="flex justify-center w-full ">
            <h1 className="text-3xl font-bold">All Posts</h1>
          </div>

          <div className="flex flex-wrap justify-center my-6">
            {loading ? (
              <>
                <Skeleton />
                <Skeleton />
                <Skeleton />
                <Skeleton />
                <Skeleton />
                <Skeleton />
              </>
            ) : blogs.length <= 0 ? (
              <div className="flex flex-col justify-center items-center h-[50vh] gap-1">
                <MdLayers className="text-[10rem] text-gray-500" />
                <p className="text-xl md:text-2xl xl:text-3xl font-bold text-gray-800 dark:text-gray-500">
                  No Blog Posts
                </p>
              </div>
            ) : (
              <>
                {blogs.map((ele, idx) => (
                  <BlogsCard data={ele} key={ele.id || ele.slug || idx} />
                ))}
              </>
            )}
          </div>

          <Pagination>
            <PaginationContent>
              <PaginationItem>
                <PaginationPrevious
                  href="#"
                  onClick={(e) => {
                    e.preventDefault();
                    if (currentPage > 1) setCurrentPage(currentPage - 1);
                  }}
                />
              </PaginationItem>
              {(() => {
                const startPage = Math.max(1, currentPage - 1);
                const endPage = Math.min(totalPages, currentPage + 1);
                const pages = Array.from(
                  { length: endPage - startPage + 1 },
                  (_, i) => startPage + i,
                );
                return pages.map((page) => (
                  <PaginationItem key={page}>
                    <PaginationLink
                      className={`${page === currentPage && "bg-gradient-to-tr from-[#00AEEF] to-[#6A5DFF]"} text-lg hover:scale-105 transition-all ease-in-out duration-500`}
                      href="#"
                      isActive={page === currentPage}
                      onClick={(e) => {
                        e.preventDefault();
                        setCurrentPage(page);
                      }}
                    >
                      {page}
                    </PaginationLink>
                  </PaginationItem>
                ));
              })()}
              <PaginationItem>
                <PaginationNext
                  href="#"
                  onClick={(e) => {
                    e.preventDefault();
                    if (currentPage < totalPages)
                      setCurrentPage(currentPage + 1);
                  }}
                />
              </PaginationItem>
            </PaginationContent>
          </Pagination>

          <div className="flex justify-center gap-2 mt-2 "></div>
        </div>

        {/*  */}
      </div>
    </div>
  );
};

export default Blogs;
