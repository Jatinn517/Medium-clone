import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export function AppBar() {

    const Navigate = useNavigate();
    const [hideButton, setHideButton] = useState<boolean>(true);
    const [hidebar, setHideBar] = useState<boolean>(false);

    useEffect(() => {
        function handleResponsiveness() {
            if (window.innerWidth >= 768) {
                setHideBar(false);
                setHideButton(true);
            }
            else {
                setHideBar(true);
                setHideButton(false);
            }
        }
        handleResponsiveness();
        window.addEventListener('resize', handleResponsiveness);

        return () => { window.removeEventListener('resize', handleResponsiveness); }
    })

    function handleBlogsClick() {
        if (!sessionStorage.getItem('token')) {
            alert("Login first");
            return;
        }
        Navigate('/blogs');
    }

    function showBar(){
        setHideBar(c=>!c);
    }

    return (
        <div className="flex justify-between items-center p-2 fixed top-0 left-0 w-full bg-white z-10 shadow-md">
            <button className="text-2xl font-bold" onClick={handleBlogsClick}>Blogs</button>
            <div className="flex flex-col md:flex-row space-y-3 md:space-y-0 space-x-0 md:space-x-4">
                {sessionStorage.getItem('token') && <button className="text-xl font-semibold" onClick={() => { Navigate('/publish') }}>Publish</button>}
                <button className="text-xl font-semibold" onClick={() => Navigate('/signup')}>Signup</button>
            </div>
        </div>
    );
}
