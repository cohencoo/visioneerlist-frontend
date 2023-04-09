import React from "react"
import styles from "./Loading.module.scss"

const Loading: React.FC = () => {
    return (
        <div className={styles.Loading}>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
        </div>
    )
}

export default Loading
