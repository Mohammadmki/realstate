import Byresiedential from "@/components/tamplates/Byresidential";
import connectDB from "@/utils/connect";

export default async function page(ctx) {
   
     
        await connectDB()
         
        const res= await fetch("https://realstate-steel.vercel.app/api/profile",{cache:"no-store"})
        const data=await res.json()
        const categoryres= await fetch("https://realstate-steel.vercel.app/api/categories",{next:{revalidate:24*60*60}})
       const Categorie=await categoryres.json()
    if(!data||!Categorie){
        return <h3 className="error" >مشکلی پیش آمده</h3>
    }
     const {searchParams}=ctx
     let fainalData=data.data
         if(searchParams.service){
            fainalData=fainalData.filter((i)=>i.target==searchParams.service)
         }
     if(searchParams.category){
           fainalData=fainalData.filter((i)=>i.category==searchParams.category)
     }

     if(searchParams.city){
        fainalData=fainalData.filter((i)=>i.location.city.slog==searchParams.city)
     }
    

    
    return (
        <Byresiedential data={JSON.parse(JSON.stringify(fainalData))} Categorie={JSON.parse(JSON.stringify(Categorie))} />
       
    );
}