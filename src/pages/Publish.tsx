import { useNavigate } from "react-router-dom"
import { ChangeEvent, useEffect, useState } from "react";
import { BACKEND_URL } from "../config";
import axios from "axios";

export function Publish() {
    const navigate = useNavigate();
    const [title, setTitle] = useState<string>("");
    const [image, setImage] = useState<string>("");
    const [content, setContent] = useState<string>("");
    const [error, setError] = useState<string>("");
    const [isError, setIsError] = useState<boolean>(false);

    useEffect(()=>{
        if(!sessionStorage.getItem('token')?.length){
            navigate('/signup');
        }
    })

    function handleTitleChange(e: ChangeEvent<HTMLInputElement>) {
        setTitle(e.target.value);
    }

    function handleImageChange(e: ChangeEvent<HTMLInputElement>) {
        setImage(e.target.value);
    }

    function handleContentChange(e: ChangeEvent<HTMLTextAreaElement>) {
        setContent(e.target.value);
    }

    async function publish() {
        try {
            await axios.post(`${BACKEND_URL}/api/v1/blog`,{title,content,image}, { headers: { authorization: sessionStorage.getItem('token') } });
            setIsError(false);
            setError("");
            navigate('/blogs');
        }
        catch (error) {
            setIsError(true);
            if (axios.isAxiosError(error) && error.response) {
                setError(error.response.data?.error || "An error occurred");
            } else {
                setError("Unknown error");
            }
        }
    }

    return (
        <div className="px-4 py-2 text-center space-y-3 mt-20">
            <input className="w-[75%] px-2 py-2 border-2 rounded-md border-gray-500" type="text" placeholder="Title" onChange={(e) => handleTitleChange(e)} />
            <input className="w-[75%] px-2 py-2 inline border-2 rounded-md border-gray-500" onChange={(e) => handleImageChange(e)} type="text" placeholder="Image Link" />
            <textarea
                onChange={(e) => { handleContentChange(e) }}
                className="w-[75%] h-60 px-2 py-2 inline border-2 rounded-md border-gray-500"
                placeholder="Content"
            ></textarea>
            <br/>
            {isError && <div className="text-red-500 text-center">{error}</div>}
            <button onClick={publish} className="bg-black text-white rounded-md p-2">Publish</button>
        </div>
    )
}
