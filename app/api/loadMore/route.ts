import prisma from "@/lib/prisma";

export async function GET(req: Request) {
  try {
    // get cursor from query
    const url = new URL(req.url);
    const cursor = url.searchParams.get("cursor");

    if (!cursor) {
      return new Response(JSON.stringify({ error: "No cursor provided" }), {
        status: 403,
      });
    }

    const posts = await prisma.post.findMany({
      take: 10,
      skip: 1,
      cursor: {
        id: cursor,
      },
      orderBy: {
        createdAt: "desc",
      },
      include: {
        author: true,
        children: {
          include: {
            author: true,
          },
        },
        parent: true,
        likes: true,
      },
      where: {
        parent: null,
      },
    });

    if (posts.length == 0) {
      return new Response(
        JSON.stringify({
          data: [],
        }),
        { status: 200 }
      );
    }

    const data = {
      data: posts,
    };

    return new Response(JSON.stringify(data), { status: 200 });
  } catch (error: any) {
    return new Response(
      JSON.stringify(JSON.stringify({ error: error.message })),
      { status: 403 }
    );
  }
}
