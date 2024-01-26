"use client"

import axios from 'axios'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import React, { useState } from 'react'

const LoginPage = () => {
    const [user, setUser] = useState({
        email: "",
        password: "",
    })
    const router = useRouter()
    const submitHandler = async () => {
        try {
            const response = await axios.post("/api/users/login", user)
            console.log(response.data);
            router.push("/user-profile")
        } catch (error:any) {
            console.log(error.message);
        }
    }
    return (
        <div className='flex flex-col gap-3 justify-center items-center mt-8'>

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
            <button className='border-2 rounded-lg px-3 py-1' onClick={submitHandler}>Login</button>
            <div>
                <p className='text-[#777]'>Dont have an account? <Link href={`/signup`}>
                    <span className='text-blue-700 font-semibold cursor-pointer'>signup</span>
                </Link> </p>
            </div>
        </div>
    )
}

export default LoginPage