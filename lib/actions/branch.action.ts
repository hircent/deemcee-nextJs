"use server";

import { deleteBranchProps } from "@/types/index";
import { cookies } from "next/headers";
import { revalidatePath } from "next/cache";

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

export async function deleteBranch({name,confirmName,id}:deleteBranchProps){
    const cookieStore = cookies()
    const token = cookieStore.get("deemceeAuth")
    if (name !== confirmName) {
        throw new Error("Names do not match! Please enter the exact name to confirm deletion.")
    }
      
    try {
        const response = await fetch(`${process.env.API_URL}/branch/delete/${id}`,{
            method:"DELETE",
            headers:{
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token?.value}`,
            }
        })
        
        if(response.status == 404){
            throw new Error(`Branch ${response.statusText}`)  
        }

        if(!response.ok){
            throw new Error(`HTTP Error! Status: ${response.status}`)  
        }
        revalidatePath("/branch");
    } catch (error) {
        throw error
    }
}