import React, { useState } from "react"
import styles from "./ImageLoader.module.scss"

interface ImageLoaderProps {
    src: string
    className?: any
    onClick?: any
    loadingStyles?: any
}

const ImageLoader: React.FC<ImageLoaderProps> = ({ src, className, onClick, loadingStyles }) => {
    const [loading, setLoading] = useState(true)

    return (
        <>
            <img
                className={className}
                style={{ display: loading ? "none" : undefined }}
                onLoad={() => setLoading(false)}
                onClick={onClick}
                src={src}
                alt={""}
            />

            {loading && (
                <div style={loadingStyles} className={styles.ImageLoader}>
                    <div>
                        <span className="material-symbols-rounded">photo_size_select_large</span>
                        Loading Media...
                    </div>
                </div>
            )}
        </>
    )
}

export default ImageLoader
