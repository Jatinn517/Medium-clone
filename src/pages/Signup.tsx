import { SignupInput } from '@jatin517/medium-common';
import React from 'react';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { BACKEND_URL } from '../config';

export default function Signup() {

    const [signupInput, setSigninInput] = useState<SignupInput>({
        name: "",
        email: "",
        password: ""
    });
    const [iserror, setIsError] = useState<boolean>(false);
    const [error, setError] = useState<string>("");
    const [loading, setLoading] = useState<boolean>(false);
    const Navigate = useNavigate();

    function handleNameChange(event: React.ChangeEvent<HTMLInputElement>) {
        setSigninInput(c => ({
            ...c,
            name: event.target.value
        }))
    }

    function handleEmailChange(event: React.ChangeEvent<HTMLInputElement>) {
        setSigninInput(c => ({
            ...c,
            email: event.target.value
        }))
    }

    function handlePasswordChange(event: React.ChangeEvent<HTMLInputElement>) {
        setSigninInput(c => ({
            ...c,
            password: event.target.value
        }))
    }

    async function handleSignup() {
        try {
            setLoading(true);
            const url = `${BACKEND_URL}/api/v1/user/signup`;
            console.log(loading);
            const response = await axios.post(url, signupInput);
            console.log(loading);
            const jwt = response.data;
            sessionStorage.setItem('token', "Bearer " + jwt);
            setIsError(false);
            setError("");
            setLoading(false);
            Navigate('/blogs');
        }
        catch (error) {
            setIsError(true);
            if (axios.isAxiosError(error) && error.response) {
                setError(error.response.data?.error || "An error occurred");
            } else {
                setError("Unknown error");
            }
            setLoading(false);
        }
    }

    return (
        <div>
            {loading ? <div className='mt-20 text-center'>Loading....</div> :
                <div className="w-full min-h-screen pt-[0%] sm:pt-[5%] bg-white sm:bg-gray-200">
                    <div className="ml-0 mr-0 sm:ml-[30%] sm:mr-[30%] mt-10 xl:ml-[40%] xl:mr-[40%] bg-white rounded-2xl shadow-none sm:shadow-2xl">
                        <div className="pl-[10%] space-y-[4%] pr-[10%] pt-[5%] pb-[5%]">
                            <div className="font-bold text-center text-lg">Sign Up</div>
                            <div className="text-center text-gray-600"> Enter your information to create and account</div>
                            <div className="font-semibold">Enter Name</div>
                            <input className="w-full border px-2 py-1 rounded-md border-gray-300" type="text" placeholder="John" onChange={(event) => handleNameChange(event)} />
                            <div className="font-semibold">Email</div>
                            <input className="w-full border px-2 py-1 rounded-md border-gray-300" type="text" placeholder="johndoe@example.com" onChange={(event) => handleEmailChange(event)} />
                            <div className="font-semibold">Password</div>
                            <input className="w-full border px-2 py-1 rounded-md border-gray-300" type="password" placeholder='Enter your password' onChange={(event) => handlePasswordChange(event)} />
                            <button className="bg-black px-2 py-1 text-white w-full rounded-md" onClick={handleSignup}>Sign Up</button>
                            {iserror && <div className="text-red-500 text-center">{error}</div>}
                            <div className="flex justify-center">
                                <p>Already have an account?</p>
                                <button className="underline ml-1" onClick={() => Navigate('/Signin')}>Login</button>
                            </div>
                        </div>
                    </div>
                </div>
            }
        </div>
    )
}