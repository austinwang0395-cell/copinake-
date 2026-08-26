export async function GET(){return Response.json({videos:[]})}
export async function POST(){return Response.json({error:"Video upload is available on the Cloudflare deployment."},{status:501})}
