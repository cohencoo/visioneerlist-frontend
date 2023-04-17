import React, { useRef, useState } from "react"
import axios from "axios"
import { toast } from "react-hot-toast"
import { toastSchema } from "../../../assets/utils"
import styles from "./Upload.module.scss"
import placeholderImage from "../../../assets/user.png"

interface UploadProps {
    size: string
    onImageUploaded: (imageDataURL: string) => void
    initialImage?: string
    editing?: boolean
}

const Upload: React.FC<UploadProps> = ({ size, onImageUploaded, initialImage, editing }) => {
    const apiKey = "0b888b5dd33670d2bf1e72e5522597c8"
    const whitelisted = ["png", "jpg", "jpeg", "svg", "ico", "webp", "heic"]

    const [image, setImage] = useState(initialImage || "")
    const [dragging, setDragging] = useState(false)
    const uploaderRef = useRef<HTMLInputElement>(null)

    const handleFileChange = async (file: File) => {
        const type = file.name.match(/\.([^.]+)$/)![1].toLowerCase()

        if (whitelisted.includes(type)) {
            const formData = new FormData()
            formData.append("image", file)

            try {
                const wait = toast.loading(
                    "Uploading your image...",
                    toastSchema("uploading-image")
                )

                const response = await axios.post("https://api.imgbb.com/1/upload", formData, {
                    params: { key: apiKey }
                })

                if (response.data.status !== 200) throw new Error("Upload failed")

                toast.dismiss(wait)
                toast.success("Image uploaded!", toastSchema("upload-success"))
                onImageUploaded(response.data.data.url)
                setImage(response.data.data.url)
            } catch (error) {
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
        if (editing) return styles.editing
        else return image ? styles.inactive : styles.active
    }

    return (
        <div className={styles.Upload}>
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
                        backgroundImage: `url(${image || placeholderImage})`,
                        width: size || "20rem",
                        height: size || "20rem"
                    }}
                />
                <div
                    style={{ display: image && !editing ? "none" : undefined }}
                    className={styles.uploadMemo}>
                    {dragging ? "Drop your image here" : "Drag & Drop or Click to Upload"}
                </div>
                {image && !editing && (
                    <div className={styles.status}>
                        <span className="material-symbols-rounded">check</span>
                        Uploaded. Click to change.
                    </div>
                )}
            </div>
        </div>
    )
}

export default Upload
