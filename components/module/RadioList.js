import styles from "./RadioList.module.css";

function RadioList({ profileData, setProfileData ,data,title,name}) {
  

  const changeHandler = (e) => {
    const { name, value } = e.target;
    setProfileData({ ...profileData, [name]: value });
    
  };
      
  return (
    <div className={styles.container}>
      <p>{title}</p>
     <div className={styles.main}>
    
     {data?.map((i,index)=>(
      <div key={index} >
         <label htmlFor={i.slog}>{i.name}</label>
         <input
            type="radio"
            name={name}
            value={i.slog}
            id={i.slog}
            checked={profileData[name] === i.slog}
            onChange={changeHandler}
          />
      </div>
      
     ))}
     </div>
       </div>
     

    
     
)}

export default RadioList;
