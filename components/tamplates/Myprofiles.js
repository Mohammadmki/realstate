import DashboardCard from "../module/DashboardCard";

export default function Myprofiles({profiles}) {
    console.log(profiles)
    return (
      <div>
        {profiles.map((i)=>(
            <DashboardCard key={i._id} data={JSON.parse(JSON.stringify(i))} />
        ))}
      </div>
    );
}