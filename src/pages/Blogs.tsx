import { BlogCard } from "../component/BlogCard"
import { useEffect, useState } from "react"
import axios from "axios"
import { BACKEND_URL } from "../config"
import { useNavigate } from "react-router-dom"

type BlogCardPropsType = {
    title: string;
    content: string;
    author: { name: string };
    createdAt: string;
    image?: string;
    id: string;
}

export default function Blogs() {
    const [blogs, setBlogs] = useState<BlogCardPropsType[]>([])
    const [isError, setIsError] = useState<boolean>(false);
    const [error, setError] = useState<string>("");
    const [loading, setLoading] = useState<boolean>(true);
    const Navigate = useNavigate();

    useEffect(() => {

        if(!sessionStorage.getItem('token')?.length){
            Navigate('/signup');
        }

        async function fetchData() {
            try {
                const response = await axios.get(BACKEND_URL + "/api/v1/blog/bulk", { headers: { authorization: sessionStorage.getItem('token') } })
                console.log(response.data);
                setBlogs(response.data.posts)
                setIsError(false);
                setError("");
                setLoading(false);
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
        fetchData();
    }, [])

    return (
        <div>
            {loading ? <div className="text-center pt-20">Loading...</div> :
                isError ? <div className="text-red-500 text-center">{error}</div> :
                    <div className="mt-20">
                        {
                            blogs.map((blog) => {
                                return <BlogCard key={blog.id} id={blog.id} title={blog.title} date={blog.createdAt} author={blog.author.name} content={blog.content} image={blog.image} />
                            })
                        }
                    </div>
            }
        </div>
    )
}