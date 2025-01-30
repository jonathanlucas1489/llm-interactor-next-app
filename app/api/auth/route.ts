import ImageKit from "imagekit";
import { NextResponse } from "next/server";

const imagekit = new ImageKit({
  publicKey: process.env.NEXT_PUBLIC_IMAGEKIT_PUBLIC_KEY!,
  privateKey: process.env.NEXT_PUBLIC_VATE_KEY!,
  urlEndpoint: process.env.NEXT_PUBLIC_IMAGEKIT_URL_ENDPOINT!,
});

export async function GET() {
  try {
    const timestamp = Math.floor(Date.now() / 1000) + 3600;

    const authParams = imagekit.getAuthenticationParameters(undefined, timestamp);
    
    return NextResponse.json(authParams);
  } catch (error) {
    console.error("Error generating ImageKit auth:", error);
    return NextResponse.error();
  }
}
