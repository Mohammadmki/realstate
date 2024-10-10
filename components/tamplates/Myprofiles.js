import DashboardCard from "../module/DashboardCard";

export default function Myprofiles({profiles}) {
    
    return (
      <div>
       {
        profiles.length?<>
         {profiles.map((i)=>(
            <DashboardCard key={i._id} data={JSON.parse(JSON.stringify(i))} />
        ))}
        </>:<h3 className="error" >شما اگهیی انتشار نکرده اید</h3>
       }
      </div>
    );
}