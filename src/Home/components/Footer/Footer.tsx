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
                <span onClick={() => window.open("./vl-product-pitch.pdf", "_blank")}>
                    Our Product Pitch
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
            <div className={styles.badges}>
                <div>
                    <a
                        href="https://www.producthunt.com/posts/visioneerlist?utm_source=badge-featured&utm_medium=badge&utm_souce=badge-visioneerlist"
                        target="_blank"
                        rel="noreferrer">
                        <img
                            src="https://api.producthunt.com/widgets/embed-image/v1/featured.svg?post_id=388253&theme=light"
                            alt="VisioneerList - Empowering&#0032;emerging&#0032;innovative&#0032;startups | Product Hunt"
                            style={{ width: "auto", height: "50px" }}
                        />
                    </a>
                </div>
                <div>
                    <a
                        href="https://www.dmca.com/r/j3lymxx"
                        title="DMCA.com Protection Status"
                        target="_blank"
                        rel="noreferrer">
                        <img
                            src="https://images.dmca.com/Badges/dmca_protected_sml_120n.png"
                            alt="DMCA.com Protection Status"
                            style={{ width: "auto", height: "25px" }}
                        />
                    </a>
                </div>
            </div>
            <p>© {new Date().getUTCFullYear()} VisioneerList - All Rights Reserved</p>
        </div>
    )
}

export default Footer
