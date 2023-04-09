import React from "react"
import styles from "./Footer.module.scss"

interface FooterProps {
    infoRef: React.RefObject<HTMLDivElement>
    setApp: any
    scrollToTop: () => void
}

const Footer: React.FC<FooterProps> = ({ infoRef, setApp, scrollToTop }) => {
    return (
        <div className={styles.Footer}>
            <h2>Quick Links</h2>
            <div className={styles.links}>
                <span onClick={() => infoRef.current?.scrollIntoView({ behavior: "smooth" })}>
                    About VisioneerList
                </span>
                <span
                    onClick={() => {
                        setApp("/dashboard")
                        scrollToTop()
                    }}>
                    Explore
                </span>
                <span
                    onClick={() => {
                        setApp("/new-profile")
                        scrollToTop()
                    }}>
                    List a Profile
                </span>
            </div>
            <hr />
            <a
                href="https://www.producthunt.com/posts/visioneerlist?utm_source=badge-featured&utm_medium=badge&utm_souce=badge-visioneerlist"
                target="_blank"
                rel="noreferrer">
                <img
                    src="https://api.producthunt.com/widgets/embed-image/v1/featured.svg?post_id=388253&theme=light"
                    alt="VisioneerList - Empowering&#0032;emerging&#0032;innovative&#0032;startups | Product Hunt"
                    style={{ width: "250px", height: "54px" }}
                />
            </a>
            <br />
            <br />
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
