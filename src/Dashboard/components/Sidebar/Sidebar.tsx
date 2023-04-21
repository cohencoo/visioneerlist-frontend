import React, { useState } from "react"
import logo from "../../../assets/visioneer-list.svg"
import styles from "./Sidebar.module.scss"

interface SidebarProps {
    overlay: any
    setOverlay: any
    newProfile: any
    settings: any
}

const Sidebar: React.FC<SidebarProps> = ({ overlay, setOverlay, newProfile, settings }) => {
    const [dismissed, setDismissed] = useState(!!localStorage.requireTutorial)
    if (localStorage.getItem("requireTutorial") === null) localStorage.requireTutorial = "true"

    return (
        <div className={styles.Sidebar}>
            <img
                className={styles.logo}
                src={logo}
                alt="Home"
                onClick={() => (window.location.href = "/")}
            />
            <hr />
            <div
                onClick={() => setOverlay(null)}
                style={{
                    display: overlay ? "block" : "none",
                    width: overlay ? "calc(100% - 20px)" : undefined,
                    padding: overlay ? "10px" : undefined,
                    position: overlay ? "absolute" : undefined
                }}
                className={styles.item}>
                <span style={{ color: "var(--link)" }} className="material-symbols-rounded">
                    undo
                </span>
            </div>

            <div style={{ transform: overlay ? "translateY(4.5rem)" : "translateY(0)" }}>
                {dismissed && (
                    <div className={styles.tooltip}>
                        <p>Empower Your Potential</p>
                        It's Free & Simple to create a Professional Listing.
                        <button
                            onClick={() => {
                                setDismissed(false)
                                localStorage.requireTutorial = ""
                            }}>
                            <span className="material-symbols-rounded">close</span>
                        </button>
                    </div>
                )}
                <div
                    onClick={() => {
                        setDismissed(false)
                        localStorage.requireTutorial = ""
                        newProfile()
                    }}
                    className={styles.item}>
                    <span style={{ fontWeight: "300" }} className="material-symbols-rounded">
                        add_business
                    </span>
                </div>
                <div onClick={() => settings()} className={styles.item}>
                    <span style={{ fontWeight: "300" }} className="material-symbols-rounded">
                        settings
                    </span>
                </div>
            </div>
        </div>
    )
}

export default Sidebar
