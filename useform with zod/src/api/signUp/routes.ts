import { signUpSchema } from "../../lib/types";

export async function POST(request:Request) {
    const body:unknown=await request.json();
    const result=signUpSchema.safeParse(body)
    let zodErrors={}
    if(!result.success){
        result.error.issues.forEach((issue)=>{
            zodErrors={...zodErrors,[issue.path[0]]:issue.message}
        })
    }
    return new Response(JSON.stringify(
        Object.keys(zodErrors).length > 0 ? {errors:zodErrors}:{success:true}
    ))

}