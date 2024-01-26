import { connect } from "@/dbConfig/dbConfig";
import { NextRequest, NextResponse } from "next/server";
import User from "@/models/userModels"
import bcryptjs from "bcryptjs"

connect();

export async function POST(request: NextRequest) {
    try {
        const reqBody = await request.json();
        const { username, email, password } = reqBody;

        const user = await User.findOne({ email });
        if (user) {
            return NextResponse.json({ error: "User already exists", status: 400 })
        }

        const salt = await bcryptjs.genSalt(10);
        const hashedPassword = await bcryptjs.hash(password, salt);

        const userObj = new User({
            username: username,
            email: email,
            password: hashedPassword
        });
        const savedUser = await userObj.save();

        return NextResponse.json({
            message: "User created successfully",
            success: true,
            status: 201,
            savedUser
        })
    } catch (error: any) {
        return NextResponse.json({ error: error.message, status: 500 })
    }
}
