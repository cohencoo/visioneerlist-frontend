import React from "react"
import styles from "./Footer.module.scss"

const Footer: React.FC = () => {
    return (
        <div className={styles.Footer}>
            <a
                href="//www.dmca.com/Protection/Status.aspx?ID=c7518323-7180-4b47-9425-c0497e6b307e"
                title="DMCA.com Protection Status"
                className="dmca-badge">
                <img
                    src="https://images.dmca.com/Badges/dmca_protected_sml_120n.png?ID=c7518323-7180-4b47-9425-c0497e6b307e"
                    alt="DMCA.com Protection Status"
                />
            </a>
            <p>Copyright © {new Date().getUTCFullYear()} VisioneerList - All Rights Reserved</p>
        </div>
    )
}

export default Footer
