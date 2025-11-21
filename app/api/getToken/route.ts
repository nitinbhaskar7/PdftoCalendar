import { getGoogleToken } from "@/lib/actions";
import { NextResponse } from "next/server";

export async function GET() {
    const { token } =  await getGoogleToken();
    if(token){
        return NextResponse.json({ token });
    } else {
        return NextResponse.json({ error: "No token found" }, { status: 404 });
    }
}
