import Byresiedential from "@/components/tamplates/Byresidential";
import connectDB from "@/utils/connect";

export default async function page(ctx) {
   
     
        await connectDB()
         
        const res= await fetch("https://realstate-nine-opal.vercel.app/api/profile",{cache:"no-store"})
        const data=await res.json()
        const categoryres= await fetch("https://realstate-nine-opal.vercel.app/api/categories",{next:{revalidate:24*60*60}})
       const Categorie=await categoryres.json()
    if(!data){
        return <h3>مشکلی پیش آمده</h3>
    }
     const {searchParams}=ctx
     let fainalData=data.data

     if(searchParams.category){
           fainalData=fainalData.filter((i)=>i.category==searchParams.category)
     }
       
    

    
    return (
        <Byresiedential data={fainalData} Categorie={Categorie} />
       
    );
}