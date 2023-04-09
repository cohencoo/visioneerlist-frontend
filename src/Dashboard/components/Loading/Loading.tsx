import React from "react"
import styles from "./Loading.module.scss"

const Loading: React.FC = () => {
    const component = (
        <div className={styles.Loading}>
            <div className={styles.icon}></div>
            <div className={styles.headline}></div>
            <div className={styles.details}>
                <div></div>
                <div></div>
                <div></div>
            </div>
        </div>
    )
    return (
        <>
            {component}
            {component}
            {component}
            {component}
            {component}
            {component}
            {component}
            {component}
        </>
    )
}

export default Loading
