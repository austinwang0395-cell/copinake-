type OrderBody={customer?:{name?:string;phone?:string;company?:string;note?:string};items?:unknown[];total?:number};
export async function POST(request:Request){
 const body=await request.json() as OrderBody;
 if(!body.customer?.name?.trim()||!body.customer?.phone?.trim()||!Array.isArray(body.items)||body.items.length===0)return Response.json({error:"Please enter a contact name and phone number, then select at least one product."},{status:400});
 const orderId=`CP${new Date().toISOString().slice(2,10).replaceAll("-","")}-${crypto.randomUUID().slice(0,6).toUpperCase()}`;
 const order={orderId,...body,createdAt:new Date().toISOString()};
 const webhook=process.env.ORDER_WEBHOOK_URL;
 if(webhook){const response=await fetch(webhook,{method:"POST",headers:{"content-type":"application/json"},body:JSON.stringify(order)});if(!response.ok)return Response.json({error:"Submission failed. Please try again."},{status:502})}
 else console.info("COPINA order enquiry",JSON.stringify(order));
 return Response.json({orderId},{status:201});
}
