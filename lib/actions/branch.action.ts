"use server";

import { cookies } from "next/headers";

export async function getBranchList(){
    const cookieStore = cookies()
    const token = cookieStore.get("deemceeAuth")
    try {
        const response = await fetch(`${process.env.API_URL}/branch/list`,{
            method:"GET",
            headers:{
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token?.value}`,
            }
        })

        if(!response.ok){
            throw new Error(`HTTP Error! Status: ${response.status}`)    
        }
        const data = await response.json()
        return data
    } catch (error) {
        console.log(error)
        throw error
    }
}