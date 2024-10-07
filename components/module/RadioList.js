import styles from "./RadioList.module.css";

function RadioList({ profileData, setProfileData ,categorie}) {
  const { category } = profileData;

  const changeHandler = (e) => {
    const { name, value } = e.target;
    setProfileData({ ...profileData, [name]: value });
  };
      
  return (
    <div className={styles.container}>
      <p>دسته بندی</p>
     <div className={styles.main}>
    
     {categorie?.map((i)=>(
      <div key={i._id} >
         <label htmlFor={i.slog}>{i.name}</label>
         <input
            type="radio"
            name="category"
            value={i.slog}
            id={i.slog}
            checked={category === i.slog}
            onChange={changeHandler}
          />
      </div>
      
     ))}
     </div>
       </div>
     

    
     
)}

export default RadioList;
