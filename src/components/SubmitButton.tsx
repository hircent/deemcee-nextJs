"use client";

import React from 'react'
import { Button } from './ui/button';
import { useFormStatus } from 'react-dom';

const SubmitButton = ({label,submitLabel}:{label:string,submitLabel:string}) => {
    const {pending} = useFormStatus()
  return (
    <Button 
        disabled={pending} 
        type="submit"
        className="w-full sm:w-auto bg-[#000] text-white text-sm sm:text-base px-6 py-2"
    >
        {pending ? submitLabel : label}
    </Button>
  )
}

export default SubmitButton
