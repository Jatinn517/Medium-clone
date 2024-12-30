import axios from "axios";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { BACKEND_URL } from "../config";

type BlogCardPropsType = {
    title: string;
    content: string;
    author: string;
    date: string;
    image?: string;
    id:string;
};

export function BlogCard(props: BlogCardPropsType) {

    const [sliceLength, setSliceLength] = useState<number>(400); // Default slice length for mobile
    const date = new Date(props.date);
    const formattedDate = date.toLocaleDateString('en-US',{
        day: 'numeric',
        month: 'short',
        year: 'numeric'
    });
    const navigate = useNavigate();

    useEffect(() => {
        const handleResize = () => {
            if (window.innerWidth >= 1024) {
                setSliceLength(400); // Larger slice for desktops
            } else if (window.innerWidth >= 768) {
                setSliceLength(200); // Large slice for tablets

            } else if (window.innerWidth >= 640) {
                setSliceLength(150); // Medium slice for tablets
            }
        };

        handleResize(); // Initial check
        window.addEventListener('resize', handleResize);

        return () => window.removeEventListener('resize', handleResize);
    }, []);

    async function handleClick(id: string) {
        try{
            const response = await axios.get(`${BACKEND_URL}/api/v1/blog/${id}`, { headers: { authorization: sessionStorage.getItem('token') } });
            navigate(`/blog`, { state: response.data.post });
        }
        catch (error) {
            if (axios.isAxiosError(error) && error.response) {
                alert(error.response.data?.error || "An error occurred");
            } else {
                alert("Unknown error");
            }
        }

    }

    return (
        <div className="px-[4%] py-2" >
            <div className="flex items-center space-x-4">
                <p className="bg-gray-500 rounded-full w-6 h-6 text-center text-white flex items-center justify-center text-lg">
                    {props.author.slice(0, 1).toUpperCase()}
                </p>
                <p>{props.author}</p>
                <p className="text-gray-500">{formattedDate}</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-12">
                <div className="col-span-1 space-y-2 md:col-span-9">
                    <div className="font-bold text-4xl break-words m-0">
                        <button onClick={()=>handleClick(props.id)}>{props.title}</button>
                    </div>
                    <div className="break-words">
                        <p>{props.content.slice(0, sliceLength)}...</p>
                    </div>
                </div>
                {/* <div className="col-span-0 md:col-span-1"></div> */}
                <div className="col-span-1 break-words md:col-span-2 flex justify-center self-start">
    {props.image && <img className="h-auto max-h-40 md:max-h-60 w-auto" src={props.image} alt="" />}
</div>
            </div>
            <hr className="w-full mt-4" />
        </div>
    );
}
