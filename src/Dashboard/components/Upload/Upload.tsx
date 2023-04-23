import React, { useRef, useState } from "react"
import axios from "axios"
import { toast } from "react-hot-toast"
import { toastSchema, toastStyles } from "../../../assets/utils"
import styles from "./Upload.module.scss"
import placeholderImage from "../../../assets/user.png"
import loaderIcon from "../../../assets/loader.gif"

interface UploadProps {
    size: string
    onImageUploaded: (imageDataURL: string) => void
    initialImage?: string
    customClass?: string
}

const Upload: React.FC<UploadProps> = ({ size, onImageUploaded, initialImage, customClass }) => {
    const apiKey = "0b888b5dd33670d2bf1e72e5522597c8"
    const whitelisted = ["png", "jpg", "jpeg", "svg", "ico", "webp", "heic"]

    const [image, setImage] = useState(initialImage || "")
    const [loadDelay, setLoadDelay] = useState(false)
    const [dragging, setDragging] = useState(false)
    const uploaderRef = useRef<HTMLInputElement>(null)

    const handleFileChange = async (file: File) => {
        const type = file.name.match(/\.([^.]+)$/)![1].toLowerCase()

        if (whitelisted.includes(type)) {
            const formData = new FormData()
            formData.append("image", file)

            const wait = toast.loading("Uploading your image...", {
                position: "top-center",
                style: toastStyles
            })

            try {
                const response = await axios.post("https://api.imgbb.com/1/upload", formData, {
                    params: { key: apiKey }
                })

                if (response.data.status !== 200) throw new Error("Upload failed")

                toast.dismiss(wait)
                toast.success("Image uploaded!", toastSchema("upload-success"))
                onImageUploaded(response.data.data.url)
                setImage(response.data.data.url)
                setLoadDelay(true)
            } catch (error) {
                toast.dismiss(wait)
                toast.error("Sorry, we couldn't process your image", toastSchema("upload-error"))
            }
        } else {
            toast.error("This image file couldn't be processed", toastSchema("filetype-error"))
        }
    }

    const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
        e.preventDefault()
        setDragging(true)
    }

    const handleDragLeave = (e: React.DragEvent<HTMLDivElement>) => {
        e.preventDefault()
        setDragging(false)
    }

    const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
        e.preventDefault()
        setDragging(false)

        const files = e.dataTransfer.files
        if (files.length > 0) {
            handleFileChange(files[0])
        }
    }

    const handleFileInput = (e: React.ChangeEvent<HTMLInputElement>) => {
        const files = e.target.files
        if (files && files.length > 0) {
            handleFileChange(files[0])
        }
    }

    const displayMode = () => {
        if (customClass) return styles[customClass]
        else return image ? styles.inactive : styles.active
    }

    return (
        <div className={styles.Upload}>
            <img
                src={image || placeholderImage}
                onLoad={() => {
                    image && setLoadDelay(false)
                }}
                style={{ display: "none" }}
                alt="loading"
            />
            <div
                style={{
                    background: dragging ? "rgba(255, 255, 255, 0.1)" : undefined
                }}
                className={displayMode()}
                onDragOver={handleDragOver}
                onDragLeave={handleDragLeave}
                onDrop={handleDrop}
                onClick={() => uploaderRef.current?.click()}>
                <input
                    hidden
                    style={{ display: "none" }}
                    accept="image/*"
                    ref={uploaderRef}
                    type="file"
                    onChange={handleFileInput}
                />
                <div
                    className={styles.preview}
                    style={{
                        backgroundSize: loadDelay ? "4rem" : "cover",
                        backgroundImage: loadDelay
                            ? `url(${loaderIcon})`
                            : `url(${image || placeholderImage})`,
                        width: size || "20rem",
                        height: size || "20rem",
                        borderRadius: !customClass ? undefined : "10px 0 0 10px"
                    }}
                />
                <div
                    style={{ display: image && !customClass ? "none" : undefined }}
                    className={styles.uploadMemo}>
                    {dragging ? "Drop your image here" : "Drag & Drop or Click to Upload"}
                </div>
                {image && !customClass && (
                    <div className={styles.status}>
                        {loadDelay ? (
                            <>
                                <span
                                    style={{ color: "#FFCC01" }}
                                    className="material-symbols-rounded">
                                    pending
                                </span>
                                Loading..
                            </>
                        ) : (
                            <>
                                <span className="material-symbols-rounded">check</span>
                                Uploaded. Click to change.
                            </>
                        )}
                    </div>
                )}
            </div>
        </div>
    )
}

export default Upload
