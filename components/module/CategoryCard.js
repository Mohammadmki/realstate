"use client"


import Link from "next/link";
import styles from "./categoryCard.module.css";
import Image from "next/image";

function CategoryCard({data}) {

  return (
   <Link href={`/buy-residential?category=${data.slog}`} >
    <div className={styles.card}>
      <Image width={700} height={700} src={data.image[0]} alt="image"  />
      <p>{data.name}</p>
    </div>
    </Link>
  );
}

export default CategoryCard;