import React, { useState } from 'react'
import { Input } from "@nextui-org/input";
import { Button } from "@nextui-org/button";
import { logos } from '../data/logo';

const SignUpForm = () => {
  const [email, setEmail] = useState("junior@nextui.org");

  const handleClear = () => {
    setEmail("");
    console.log("input cleared");
  };

  return (
    <div className='w-full h-screen flex justify-center items-center'>
      <div className='w-2/3 flex flex-col items-center space-y-4'>
        <div className='w-2/3 flex flex-col justify-center gap-1'>
          <span className='text-sm font-semibold'>Work email</span>
          <input className='p-2 rounded-xl border-2 border-gray-300' type="email" placeholder='work@company.com' ></input>
        </div>
        <span className='w-2/3 text-wrap text-sm'>
          By clicking 'sign up' you agree to the <span className='text-blue-500'>CoreSync Customer Agreement</span>, which incorporates by
          reference the AI Product-Specific Terms, and acknowledge the <span className='text-blue-500'>Privacy Policy</span>.
        </span>
        <Button className="w-2/3 text-xl tracking-[5px]" color="primary">
          Sign up
        </Button>
        <div className='w-2/3 p-4 flex justify-center items-center space-x-2'>
           <hr className='w-[25%]  border-gray-300'></hr>
            <span className='text-sm'>Continue with</span>
           <hr className=' w-[25%] border-gray-300'></hr>
        </div>
        <div className=' grid grid-cols-2 gap-3'>
         {logos.map((company) => (
          <button 
            key={company.name}
            className='border border-gray-200 py-2 px-8 rounded-lg font-medium hover:bg-gray-100 transition-colors flex items-center gap-2'
           >
            <span dangerouslySetInnerHTML={{ __html: company.svg }} className="flex-shrink-0" />
            {company.name}
          </button>
         ))}
        </div>
      </div>
    </div>
  )
}

export default SignUpForm