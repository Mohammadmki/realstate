"use client"


import Link from "next/link";
import styles from "./categoryCard.module.css";

function CategoryCard({data}) {
  
  return (
   <Link href={`/buy-residential?category=${data.slog}`} >
    <div className={styles.card}>
      <img src={data.image}  />
      <p>{data.name}</p>
    </div>
    </Link>
  );
}

export default CategoryCard;