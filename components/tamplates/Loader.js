"use client"

import { Oval } from "react-loader-spinner";
import styles from "./loader.module.css"

export default function Loader() {
    return (
        <div className={styles.Loader} >
            <Oval color="#304ffe" width={150} height={150} secondaryColor="#fff"/>
        </div>
    );
}