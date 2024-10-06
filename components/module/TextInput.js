
import { p2e, sp } from "../../utils/replaceNumber";
import styles from "./TextInput.module.css";


function TextInput({
  title,
  name,
  Data,
  setData,
  textarea = false,
}) {
  const changeHandler = (e) => {
    const { name, value } = e.target;
    setData({ ...Data, [name]: p2e(value) });
  };

  return (
    <div className={styles.container}>
      <p>{title}
        {name=="realState"&& <span>(اختیاری)</span> 
      }
      </p>
      {textarea ? (
        <textarea
          type="text"
          name={name}
          value={Data[name]}
          onChange={changeHandler}
        />
      ) : (
        <input
          type="text"
          name={name}
          value={Data[name]}
          onChange={changeHandler}
        />
      )}
    </div>
  );
}

export default TextInput;
