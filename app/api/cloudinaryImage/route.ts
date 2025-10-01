import cloudinary from "@/lib/cloudinary";

export async function POST(request: Request) {
  const { publicId } = await request.json();
  if (!publicId)
    return Response.json(
      { message: "Missing publicId or eventId" },
      { status: 400 }
    );

  try {
    const result = await cloudinary.uploader.destroy(publicId);
    return Response.json({ success: true, result }, { status: 200 });
  } catch (err) {
    console.error("Cloudinary Deletion Error:", err);
    return Response.json(
      { message: "Failed to delete the image" },
      { status: 500 }
    );
  }
}
