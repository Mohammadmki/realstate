import { MdOutlineLibraryAdd } from "react-icons/md";
import { AiOutlineDelete } from "react-icons/ai";
import styles from "./TextList.module.css"

function TextList({ title, Data, setData, type }) {
  const changeHandler = (e, index) => {
    const { value } = e.target;
    const list = [...Data[type]];
    list[index] = value;
    setData({ ...Data, [type]: list });
  };

  const addHandler = () => {
    setData({ ...Data, [type]: [...Data[type], ""] });
  };

  const deleteHandler = (index) => {
    const list = [...Data[type]];
    list.splice(index, 1);
    setData({ ...Data, [type]: list });
  };
 
  return (
    <div  className={styles.container}>
      <p>{title}</p>
      {Data[type].map((i, index) => (
        <div className={styles.card} key={index}>
          <input
            type="text"
            value={i}
            onChange={(e) => changeHandler(e, index)}
          />
          <button onClick={() => deleteHandler(index)}>
            حذف
            <AiOutlineDelete />
          </button>
        </div>
      ))}
      <button onClick={addHandler}>
        افزودن
        <MdOutlineLibraryAdd />
      </button>
    </div>
  );
}

export default TextList;
