import { connect } from "@/dbConfig/dbConfig";
import User from "@/models/userModels";
import { NextRequest, NextResponse } from "next/server";
import bcryptjs from "bcryptjs";
import jwt from "jsonwebtoken"

connect();

export async function POST(request: NextRequest){
    try {
        const reqBody = await request.json();
        const {email, password} = reqBody;
    
        // check if user is exist or not 
        const user = await User.findOne({email});
        if(!user){
            return NextResponse.json({error: "User does not exist"}, {status: 400})
        }
    
        // check password 
        const validPassword = await bcryptjs.compare(password, user.password);
        if(!validPassword){
            return NextResponse.json({error: "Invalid credentials"}, {status: 400})
        }

        // we want to send some data to the user through token. --> so define what data you want to send.  --> token is created or signed by jwt.(with secret key, and expiry) --> now to send the token we use cookies. we set the token with cookies --> now this cookies is added to response

        const tokenData = {
            id: user._id,
            username: user.username,
            email: user.email
        }
    
        const token = await jwt.sign(tokenData, process.env.TOKEN_SECRET!, {expiresIn: "1d"});
        const response = NextResponse.json({
            success: true,
            message: "User Logged in successfully",
            status: 200
        }) 
        response.cookies.set( "token", token, { httpOnly: true});
        return response;

    } catch (error:any) {
        return NextResponse.json({error: error.message}, {status: 400})
    }
}  