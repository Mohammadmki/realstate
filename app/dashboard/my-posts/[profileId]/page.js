

import Addpost from "@/components/tamplates/Addpost";
import Category from "@/models/Category";
import Profile from "@/models/Profile";
import connectDB from "@/utils/connect";

export default async function Edit({params:{profileId}}) {
    await connectDB()
    const profile= await Profile.findOne({_id:profileId})
  const categorie= await Category.find({})

    if(!profile) return <h3>مشکلی بوجود آمده لطفا دوباره امتحان کنید</h3>
    return (
       <Addpost categorie={categorie} data={JSON.parse(JSON.stringify(profile))} />
    );
}