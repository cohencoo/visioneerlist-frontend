import React from "react"
import logo from "../../../assets/visioneer-list.svg"
import styles from "./MobileNav.module.scss"

interface MobileNavProps {
    newProfile: any
    settings: any
}

const MobileNav: React.FC<MobileNavProps> = ({ newProfile, settings }) => {
    return (
        <div className={styles.MobileNav}>
            <span onClick={() => newProfile()} className="material-symbols-rounded">
                add_business
            </span>
            <img
                className={styles.logo}
                onClick={() => (window.location.href = "/")}
                src={logo}
                alt="Home"
            />
            <span onClick={() => settings()} className="material-symbols-rounded">
                settings
            </span>
        </div>
    )
}

export default MobileNav
