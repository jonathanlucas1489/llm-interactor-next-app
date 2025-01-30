import ImageKit from "imagekit";
import { NextResponse } from "next/server";

const imagekit = new ImageKit({
  publicKey: process.env.NEXT_PUBLIC_IMAGEKIT_PUBLIC_KEY!,
  privateKey: process.env.NEXT_PUBLIC_VATE_KEY!,
  urlEndpoint: process.env.NEXT_PUBLIC_IMAGEKIT_URL_ENDPOINT!,
});

export async function GET() {
  try {
    const expire = Math.floor(Date.now() / 1000) + 60;

    const authParams = imagekit.getAuthenticationParameters(undefined, expire); 
    return NextResponse.json(authParams);
  } catch (error) {
    console.error("Error generating ImageKit auth:", error);
    return NextResponse.error();
  }
}
