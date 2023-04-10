import React from "react"
import styles from "./Loading.module.scss"

const Loading: React.FC<{ loadingFailed: boolean }> = ({ loadingFailed }) => {
    const loading = (
        <div className={styles.Loading}>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
        </div>
    )
    return !loadingFailed ? (
        <>
            {loading}
            {loading}
            {loading}
            {loading}
        </>
    ) : (
        <div className={styles.LoadingFailed}>
            <span className="material-symbols-rounded">wifi_tethering_error</span>
            <h2>Network Error</h2>
            <p>
                We're experiencing some network issues at the moment. Please don't fret, we'll be
                back online soon. In the meantime, we'd appreciate if you could upvote us on{" "}
                <a
                    target="_blank"
                    href="https://www.producthunt.com/products/visioneerlist"
                    rel="noreferrer">
                    Product Hunt!
                </a>
            </p>
        </div>
    )
}

export default Loading
