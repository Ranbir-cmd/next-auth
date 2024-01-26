"use client"

import axios from 'axios'
import Link from 'next/link'
import React, { useState } from 'react';
import { useRouter } from 'next/navigation';

const SignupPage = () => {
    const [user, setUser] = useState({
        username: "",
        email: "",
        password: "",
    })
    const router = useRouter()

    const submitHandler = async () => {
        try {
            const response = await axios.post("/api/users/signup", user);
            console.log(response.data);
            router.push("/login");
        } catch (error:any) {
            console.log("Api calling error: ", error);
        }
    }

    return (
        <div className='flex flex-col gap-3 justify-center items-center mt-8'>
            <div className='flex flex-col gap-1'>
                <label htmlFor="username" className='font-medium'>User Name:</label>
                <input
                    id='username'
                    type="text"
                    placeholder='user name'
                    className='p-2 border border-black rounded-md w-[25rem]'
                    value={user.username}
                    onChange={(e) => setUser({ ...user, username: e.target.value })}
                />
            </div>

            <div className='flex flex-col gap-1'>
                <label htmlFor="email" className='font-medium'>Email:</label>
                <input
                    id='email'
                    type="email"
                    placeholder='email'
                    className='p-2 border border-black rounded-md w-[25rem]'
                    value={user.email}
                    onChange={(e) => setUser({ ...user, email: e.target.value })}
                />
            </div>

            <div className='flex flex-col gap-1'>
                <label htmlFor="password" className='font-medium'>Password:</label>
                <input
                    id='password'
                    type="text"
                    placeholder='Password'
                    className='p-2 border border-black rounded-md w-[25rem]'
                    value={user.password}
                    onChange={(e) => setUser({ ...user, password: e.target.value })}
                />
            </div>
            <button className='border-2 rounded-lg px-3 py-1' onClick={submitHandler}>signup</button>
            <div>
                <p className='text-[#777]'>Already have an account? <Link href={`/login`}>
                    <span className='text-blue-700 font-semibold cursor-pointer'>login</span>
                </Link> </p>
            </div>
        </div>
    )
}

export default SignupPage