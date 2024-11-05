"use client";

import React from 'react'
import { Button } from './ui/button';
import { useFormStatus } from 'react-dom';

const SubmitButton = ({label,submitLabel,btnColor='bg-[#000]'}:{label:string,submitLabel:string,btnColor?:string}) => {
    const {pending} = useFormStatus()
  return (
    <Button 
        disabled={pending} 
        type="submit"
        className={`w-full sm:w-auto text-white text-sm sm:text-base px-6 py-2 mt-3 ${btnColor}`}
    >
        {pending ? submitLabel : label}
    </Button>
  )
}

export default SubmitButton
