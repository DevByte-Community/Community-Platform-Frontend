import React, { useState } from 'react'
import { useParams, Link } from 'react-router-dom'
import { projectData } from './ProjectData'
import { ArrowLeft } from 'lucide-react'
import { useSelector } from "react-redux";
import { Icon } from '@iconify/react';
import img1 from '@/assets/images/iPhone 16 Pro.png'
import img2 from '@/assets/images/desktop.png'
import img3 from '@/assets/images/ZenBook Duo 14.png'


const ProjectDetails = () => {

    const [show, setShow] = useState(false)
    const [isMobile, setIsMobile] = useState(window.innerWidth < 768)

    const mode = useSelector((state) => state.theme.mode);

    // Handle window resize
    React.useEffect(() => {
        const handleResize = () => {
            setIsMobile(window.innerWidth < 768)
        }

        window.addEventListener('resize', handleResize)
        return () => window.removeEventListener('resize', handleResize)
    }, [])

    const { slug } = useParams();
    const project = projectData.find((p) => p.slug === slug)

    const iconColor = mode === "dark" ? "text-black" : "text-white";
    const bgColor = mode === "dark" ? "bg-white" : "bg-black";

    const gallery = [
        img1, img2, img3, img1, img2, img3,
    ]

    const showMoreOrLess = () => {
        setShow((prev) => !prev)
    }

    return (
        <div className='min-h-screen'>
            {/* Container with max-width for better desktop experience */}
            <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 lg:py-10'>
                {/* back button */}
                <div className='md:flex items-center justify-between w-full'>
                    <Link
                        to="/projects"
                        className={`inline-flex items-center gap-2 rounded-full md:rounded-lg md:pr-4 shadow-sm hover:opacity-80 transition-all duration-300 ${bgColor} md:bg-transparent md:border md:border-[#28A6DE] p-1`}
                    >
                        <ArrowLeft className={`${iconColor} md:text-white`} size={30} strokeWidth={2.5} />
                        <span className={`hidden md:flex text-sm font-medium ${mode === "dark" ? "text-black md:text-white" : "text-white md:text-black"}`}>Back</span>
                    </Link>

                    {/* Header Section */}
                    <header className='mt-10 md:mt-0 text-center md:text-right max-w-4xl mx-auto md:mx-0 mb-12'>
                        <h1 className='font-bold text-3xl md:text-4xl lg:text-5xl uppercase tracking-tight'>{project.title}</h1>
                        <p className='font-normal text-base md:text-lg mt-4 opacity-80 leading-relaxed'>{project.description}</p>
                    </header>
                </div>


                <main className='mt-8 lg:mt-12'>

                    {/* Hero Mockup - Full width on mobile, contained on desktop */}
                    <div className='relative mb-16 md:h-[500px] py-10 px-4 bg-[#161B22] rounded-lg border-2 border-[#28A6DE]'>
                        <Link to={project.live} className='absolute bottom-2 md:bottom-8 border-b-2 border-[#28A6DE] text-[14px]'>
                            Live Project
                        </Link>
                        <div className='mockup-window border bg-base-300 md:w-[750px] lg:w-[750px] mx-auto shadow-2xl rounded-xl overflow-hidden'>
                            <img src={project.image} alt={project.title} className='w-full h-auto' />
                        </div>
                    </div>

                    {/* Overview Section */}
                    <div className='py-8 lg:py-12 mb-12'>
                        <div className='max-w-4xl md:max-w-full mx-auto'>
                            <div className='text-center md:text-left mb-8'>
                                <h2 className='text-2xl md:text-3xl font-bold mb-4'>Overview</h2>
                                <p className='text-sm md:text-base opacity-80 leading-relaxed px-4 md:px-0'>{project.description}</p>
                            </div>

                            {/* Tags */}
                            <div className='flex flex-wrap items-center justify-center md:justify-start gap-3 mb-10'>
                                {
                                    project.tags.map((item, index) => (
                                        <div
                                            key={index}
                                            className='bg-[#161B22] px-4 py-2 rounded-full text-xs md:text-sm font-medium hover:bg-[#1f2937] transition-colors duration-300'
                                        >
                                            #{item}
                                        </div>
                                    ))
                                }
                            </div>

                            {/* Action Buttons */}
                            <div className='flex justify-center md:justify-start items-center gap-2 text-[18px]'>
                                <Link to={project.live} className=''>
                                    <button className='sm:w-auto border-[#00C38A] border-2 rounded-lg px-4 py-3 flex items-center justify-center gap-2 font-semibold hover:bg-[#00C38A]/20 transition-all duration-300 hover:scale-105 hover:shadow-lg'>
                                        <Icon icon="akar-icons:link-chain" width="20" height="20" />
                                        <span className='text-[#00C38A]'>View Live</span>
                                    </button>
                                </Link>
                                <Link to={project.github} className=''>
                                    <button className='sm:w-auto border-2 border-[#28A6DE] rounded-lg px-4 py-3 flex items-center justify-center gap-2 font-semibold hover:bg-[#28A6DE]/20 transition-all duration-300 hover:scale-105 hover:shadow-lg'>
                                        <Icon icon="mdi:github" width="20" height="20" />
                                        <span className='text-white w-full'>Github Repo</span>
                                    </button>
                                </Link>
                            </div>
                        </div>
                    </div>

                    {/* Contributors Section */}
                    <div className='py-12 lg:py-16'>
                        <div className="text-center md:text-left mb-10">
                            <h2 className='text-2xl md:text-3xl font-bold'>Contributors</h2>
                        </div>

                        <div className='grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl'>
                            {
                                project.contributors.map((item, index) => (
                                    <div
                                        key={index}
                                        className='bg-[#161B22] rounded-xl p-6 flex gap-4 items-center hover:bg-[#1f2937] transition-all duration-300 hover:scale-[1.02] hover:shadow-xl'
                                    >
                                        <img
                                            src=""
                                            alt={item}
                                            className='bg-gradient-to-br from-[#28A6DE] to-[#00C38A] rounded-full w-16 h-16 flex-shrink-0'
                                        />
                                        <div className='flex-1'>
                                            <h4 className='text-white font-bold text-lg mb-1'>{item}</h4>
                                            <p className='text-sm font-medium opacity-70 mb-2'>UI/UX Designer</p>
                                            <div className='flex items-center gap-2'>
                                                {
                                                    ["mdi:linkedin", "mdi:facebook", "mdi:twitter"].map((icon, idx) => (
                                                        <a
                                                            key={idx}
                                                            href="#"
                                                            className='hover:text-[#28A6DE] transition-colors duration-300'
                                                        >
                                                            <Icon icon={icon} height={20} width={20} />
                                                        </a>
                                                    ))
                                                }
                                            </div>
                                        </div>
                                    </div>
                                ))
                            }
                        </div>
                    </div>

                    {/* Gallery Section */}
                    <div className='py-12 lg:py-16'>
                        <div className="text-center md:text-left mb-10">
                            <h2 className='text-2xl md:text-3xl font-bold'>Gallery</h2>
                        </div>

                        <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8 max-w-6xl md:max-w-full mx-auto'>
                            {
                                gallery.slice(0, isMobile ? (show ? gallery.length : 3) : gallery.length).map((item, index) => (
                                    <div
                                        key={index}
                                        className='aspect-[4/3] border-2 border-dashed border-[#28A6DE]/50 rounded-xl bg-[#161B22] py-4 flex items-center justify-center transform transition-all duration-500 ease-in-out opacity-0 animate-fadeInUp hover:scale-105 hover:shadow-2xl hover:border-[#28A6DE] group w-[254px] h-[240px] md:w-full md:h-full mx-auto'
                                        style={{
                                            animationDelay: `${index * 100}ms`,
                                            animationFillMode: 'forwards'
                                        }}
                                    >
                                        <img
                                            src={item}
                                            className='max-w-full max-h-full object-cover group-hover:scale-105 transition-transform duration-300'
                                            alt={`Gallery item ${index + 1}`}
                                        />
                                    </div>
                                ))
                            }
                        </div>

                        {/* View More button - only visible on mobile */}
                        <div className='flex justify-center mt-8 md:hidden'>
                            <button
                                className='border-2 border-[#28A6DE] bg-[#28A6DE]/10 text-center rounded-lg px-8 py-3 text-base font-semibold transition-all duration-300 hover:bg-[#28A6DE] hover:text-white transform hover:scale-105 hover:shadow-lg w-full max-w-xs'
                                onClick={showMoreOrLess}
                            >
                                {show ? 'View Less' : 'View More'}
                            </button>
                        </div>
                    </div>
                </main>
            </div>

            <style jsx>{`
                @keyframes fadeInUp {
                    from {
                        opacity: 0;
                        transform: translateY(30px);
                    }
                    to {
                        opacity: 1;
                        transform: translateY(0);
                    }
                }

                .animate-fadeInUp {
                    animation: fadeInUp 0.6s ease-out;
                }
            `}</style>
        </div>
    )
}

export default ProjectDetails