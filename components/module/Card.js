"use client"

import Link from "next/link";
import { HiOutlineLocationMarker } from "react-icons/hi";
import { BiLeftArrowAlt } from "react-icons/bi";
import { icons } from "../../constans/icons";
import styles from "./Card.module.css";
import { sp } from "../../utils/replaceNumber";

function Card({ data: { _id, category, title, location, price } }) {
  return (
    <div className={styles.container}>
      <div className={styles.icon}>{icons[category]}</div>
      <p className={styles.title}>{title}</p>
      <p className={styles.location}>
        <HiOutlineLocationMarker />
        {location}
      </p>
      <span>{sp(price)} تومان</span>
      <Link href={`/buy-residential/${_id}`}>
        مشاهده آگهی
        <BiLeftArrowAlt />
      </Link>
    </div>
  );
}

export default Card;