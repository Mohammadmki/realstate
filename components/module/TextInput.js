
import { p2e, } from "../../utils/replaceNumber";
import styles from "./TextInput.module.css";


function TextInput({
  title,
  name,
  Data,
  setData,
  textarea = false,
}) {
  const sp = (number) => {
    if (!number) return '';
    const separatedNumber = number
      .toString()
      .match(/(\d+?)(?=(\d{3})+(?!\d)|$)/g);
    const joinedNumber = separatedNumber ? separatedNumber.join(',') : '';
    return joinedNumber; 

  };
  
  const changeHandler = (e) => {
    const { name, value } = e.target;

    if (name === "price"||name=="KeyMoney") {
      const rawValue = value.replace(/,/g, ''); 
      setData({ ...Data, price: sp(rawValue) });
      return;
    }
    if(name=='DownPayment'||name=="MonthlyRent"){
      const rawValue = value.replace(/,/g, ''); 
     setData((Data)=>({
      ...Data,
      price:{
        ...Data.price,
        [name]:sp(rawValue)
      }
     }))
     console.log( name)
      return;
    }
    
 
    setData({ ...Data, [name]: p2e(value) }); 
  };

  return (
    <div className={styles.container}>
      <p>{title}</p>
      {textarea ? (
        <textarea
          type="text"
          name={name}
          value={Data[name]}
          onChange={changeHandler}
        />
      ) : (
        <>
        {name!=="DownPayment"&&name!=="MonthlyRent"?
        <input
        type="text"
        name={name}
        value={name=="KeyMoney"?Data["price"]:Data[name] }
        onChange={changeHandler}
      />:
     
      <input
      type="text"
      name={name}
      value={Data.price?.[name]}
      onChange={changeHandler}
    />
      }
        </>
      )}
    </div>
  );
}

export default TextInput;
