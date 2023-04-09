import React from "react"
import styles from "./Header.module.scss"

const Header: React.FC<{ useMobile: boolean; setOverlay: any }> = ({ useMobile, setOverlay }) => {
    if (useMobile)
        return (
            <div style={{ position: useMobile ? "fixed" : undefined }} className={styles.Header}>
                <div className={styles.back}>
                    <span onClick={() => setOverlay(null)} className="material-symbols-rounded">
                        undo
                    </span>
                    Back
                </div>
            </div>
        )
    return (
        <div className={styles.Header}>
            <span className={styles.container}>
                <div>
                    <span className={styles.title}>VisioneerList</span>
                    <span className={styles.headline}>Empowering local, emerging innovators</span>
                </div>
            </span>
        </div>
    )
}

export default Header
