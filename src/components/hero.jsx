import React from 'react'
import hero from "/src/assets/hero1.jpg"
import SignUpForm from './signupForm'

const Hero = () => {
    return (
        <div className='h-screen w-full flex flex-col justify-start md:flex-row lg:flex-row md:justify-center lg:justify-center items-center bg-blue-200/40'>
                <div className='w-1/2 p-2 md:ml-2 lg:ml-2 flex'>
                    <img className='w-full h-[300px] md:h-[400px] lg:h-auto rounded-lg object-cover' src={hero} alt="Hero image"></img>
                </div>
            <div className='w-1/2 flex'>
                <SignUpForm/>
            </div>
        </div>

    )
}

export default Hero
