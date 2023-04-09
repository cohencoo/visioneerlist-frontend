import React, { useRef } from "react"
import { compress, compression } from "../../../assets/utils"
import toast from "react-hot-toast"
import { toastStyles } from "../../../assets/utils"

interface ImageUploaderProps {
    button: React.ReactNode
    preview: React.RefObject<HTMLDivElement>
    onImageUploaded: (imageDataURL: string) => void
}

const ImageUploader: React.FC<ImageUploaderProps> = ({ button, preview, onImageUploaded }) => {
    const imageInput = useRef<HTMLInputElement>(null)
    const allowedExtensions = ["png", "jpg", "jpeg", "svg", "ico", "webp", "heic"]

    const handleImageUpload = (files: FileList) => {
        try {
            if (!preview.current) return

            for (let i = 0; i < files.length; i++) {
                const file = {
                    file: files[i],
                    name: files[i].name,
                    type: files[i]!.name!.match(/\.([^.]+)$/)![1].toLowerCase(),
                    size: files[i].size
                }

                if (file.size > 9e6) {
                    toast.error("Image size too large.", {
                        position: "top-center",
                        style: toastStyles
                    })
                    return
                }

                if (allowedExtensions.includes(file.type)) {
                    const reader = new FileReader()
                    reader.onload = () => {
                        const imageDataURL = reader.result as string
                        compress(
                            imageDataURL,
                            compression(file.size, 1),
                            compression(file.size, 1),
                            "image/jpeg",
                            (compressedImage: string) => {
                                if (preview.current) {
                                    preview.current.style.backgroundImage = `url(${compressedImage})`
                                }
                                onImageUploaded(compressedImage)
                            }
                        )
                    }
                    reader.readAsDataURL(file.file)
                } else {
                    toast.error("Image type not supported", {
                        position: "top-center",
                        style: toastStyles
                    })
                }
            }
        } catch (err) {
            toast.error("Your image couldn't be uploaded", {
                position: "top-center",
                style: toastStyles
            })
        }
    }

    const handleDragOver = (event: React.DragEvent<HTMLDivElement>) => {
        event.preventDefault()
        event.stopPropagation()
    }

    const handleDrop = (event: React.DragEvent<HTMLDivElement>) => {
        event.preventDefault()
        event.stopPropagation()

        const files = event.dataTransfer.files
        handleImageUpload(files)
    }

    const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        event.preventDefault()
        event.stopPropagation()

        const files = event.target.files as any
        handleImageUpload(files)
    }

    return (
        <div onDragOver={handleDragOver} onDrop={handleDrop}>
            <input
                ref={imageInput}
                hidden
                type="file"
                accept="image/*"
                onChange={handleInputChange}
            />
            <div onClick={() => imageInput.current?.click()}>{button}</div>
        </div>
    )
}

export default ImageUploader
