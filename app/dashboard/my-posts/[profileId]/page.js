

import Addpost from "@/components/tamplates/Addpost";
import Profile from "@/models/Profile";
import connectDB from "@/utils/connect";

export default async function Edit({params:{profileId}}) {
    await connectDB()
    const profile= await Profile.findOne({_id:profileId})

    if(!profile) return <h3>مشکلی بوجود آمده لطفا دوباره امتحان کنید</h3>
    return (
       <Addpost data={JSON.parse(JSON.stringify(profile))} />
    );
}