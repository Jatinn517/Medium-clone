import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

type BlogPropsType = {
    title: string;
    content: string;
    author: { name: string };
    createdAt: string;
    image?: string;
}

export function Blog() {

    const location = useLocation();
    const blogData: BlogPropsType = location.state;
    const [isMobile, setIsMobile] = useState(false);
    const navigate = useNavigate();
    let date,formattedDate;

    useEffect(() => {
        if (!blogData || !sessionStorage.getItem('token')?.length) {
            navigate('/signup');
            return;
        }
        date = new Date(blogData.createdAt);
        formattedDate = date.toLocaleDateString('en-US', {
            day: 'numeric',
            month: 'short',
            year: 'numeric'
        });
        function handleResponsiveness() {
            if (window.innerWidth >= 768) {
                setIsMobile(false);
            }
            else {
                setIsMobile(true);
            }
        }
        handleResponsiveness();
        window.addEventListener('resize', handleResponsiveness);

        return () => window.removeEventListener('resize', handleResponsiveness);
    })

    return (
        <div>
            {blogData ? <div className="px-[4%] py-[2%] mt-20">
                <div className="grid-cols-1 grid md:grid-cols-8 space-x-4 space-y-2">
                    <div className="col-span-1 md:col-span-5 lg:col-span-5 space-y-2">
                        <div className="font-bold text-4xl break-words m-0 text-center md:text-left">
                            <h1>{blogData.title}</h1>
                        </div>
                        <div className="text-center md:text-left text-slate-600">
                            <p>Posted on {formattedDate}</p>
                        </div>
                        {!isMobile && <div className="break-words">
                            <p>{blogData.content}</p>
                        </div>}
                    </div>
                    <div className="col-span-1 md:col-span-3 space-y-4">
                        <div className="grid grid-cols-2 gap-2">
                            <div className="text-right md:text-center md:col-span-2">
                                <p>Author:</p>
                            </div>
                            <div className="flex justify-start md:justify-center items-center space-x-2 md:col-span-2">
                                <p className="bg-gray-500 rounded-full w-6 h-6 text-center text-white flex items-center justify-center text-lg">
                                    {blogData.author.name.slice(0, 1).toUpperCase()}
                                </p>
                                <p>{blogData.author.name}</p>
                            </div>
                        </div>
                        <div className="flex justify-center">
                            {blogData.image && <img src={blogData.image} alt="blog" className="w-30 h-30 rounded-md " />}
                        </div>
                    </div>
                    {isMobile && <div className="col-span-1 break-words">
                        <p>{blogData.content}</p>
                    </div>}
                </div>
            </div> : ""}
        </div>
    )
}