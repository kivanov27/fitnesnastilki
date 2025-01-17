export async function POST(request: Request) {
    const userData = await request.json();

    // do something with user data
    
    return Response.json(userData);
}
