import { User } from "@/types/index";
import { NextRequest, NextResponse } from "next/server";


export async function GET(req:NextRequest){
    const user:User = {
        id:1,
        username:"hircent",
        role:["superadmin"]
    }
    return NextResponse.json(user)
}