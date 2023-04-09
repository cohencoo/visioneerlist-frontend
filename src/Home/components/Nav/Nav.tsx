import React, { useRef } from "react"
import styles from "./Nav.module.scss"
import brand from "../../../assets/brand.svg"

const Nav: React.FC = () => {
    const nav = useRef<HTMLDivElement>(null)

    document.addEventListener("scroll", () => {
        if (nav.current) {
            if (window.scrollY > 100) nav.current.style.backgroundColor = "rgba(17, 17, 17, 0.55)"
            else nav.current.style.backgroundColor = "transparent"
        }
    })

    return (
        <div className={styles.Nav} ref={nav}>
            <img src={brand} alt="VisioneerList" />
        </div>
    )
}

export default Nav
