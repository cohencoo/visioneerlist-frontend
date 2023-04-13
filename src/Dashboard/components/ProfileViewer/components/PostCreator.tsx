import axios from "axios"
import React, { useRef, useState } from "react"
import { API_ROUTE } from "../../../../App"
import { toastSchema, toastStyles, uuid } from "../../../../assets/utils"
import ProfileViewer from "../ProfileViewer"
import styles from "./PostCreator.module.scss"
import ImageUploader from "../../ImageUploader/ImageUploader"
import toast from "react-hot-toast"

interface PostCreatorProps {
    active: boolean
    setActive: any
    refetch: any
    setOverlay: any
    id: string
    settings: any
}

const PostCreator: React.FC<PostCreatorProps> = ({
    active,
    setActive,
    refetch,
    setOverlay,
    id,
    settings
}) => {
    const titleInput = useRef<HTMLInputElement>(null)
    const descriptionInput = useRef<HTMLTextAreaElement>(null)
    const [uploadedAttachment, setUploadedAttachment] = useState(null)
    const attachmentRef = useRef<HTMLDivElement>(null)

    function complete() {
        if (titleInput.current?.value && descriptionInput.current?.value) {
            const verification = toast.loading(`Verifying your post...`, {
                position: "top-center",
                style: toastStyles
            })
            const ready = {
                profileId: id,
                id: uuid(),
                date: new Date().getTime(),
                title: titleInput.current.value.trim(),
                description: descriptionInput.current.value.trim(),
                attachment: uploadedAttachment || ""
            }
            axios
                .post(API_ROUTE + "/api/create-post", ready)
                .then(() => {
                    refetch((data: any) => {
                        toast.dismiss(verification)
                        toast.success(`Your post was uploaded`, toastSchema("post-uploaded"))
                        setActive(false)
                        setOverlay(
                            <ProfileViewer
                                settings={settings}
                                refetch={refetch}
                                profile={data.data[id]}
                                setOverlay={setOverlay}
                            />
                        )
                    })
                })
                .catch(() => {
                    toast.error(
                        "Something went wrong. Please try again later.",
                        toastSchema("post-error")
                    )
                })
        } else {
            toast.error(
                `Your post needs a ${titleInput.current?.value ? "description" : "title"}`,
                toastSchema("missing-title")
            )
        }
    }

    return (
        <div className={styles.PostCreator}>
            <button
                style={{ display: !active ? "block" : "none" }}
                className={styles.startPost}
                onClick={() => setActive(true)}>
                <span className="material-symbols-rounded">add</span>
                Post Something
            </button>
            <div style={{ display: active ? "block" : "none" }}>
                <input maxLength={200} type="text" placeholder="Title" ref={titleInput} />
                <textarea maxLength={5000} placeholder="Description" ref={descriptionInput} />
                <div ref={attachmentRef}></div>

                <div className={styles.flex}>
                    {uploadedAttachment ? (
                        <img
                            src={uploadedAttachment as any}
                            className={styles.attachment}
                            alt="Profile"
                        />
                    ) : (
                        <span></span>
                    )}
                    <div className={styles.flex}>
                        <div onClick={() => setActive(false)} className={styles.upload}>
                            <span className="material-symbols-rounded">close</span>
                            <p>Cancel</p>
                        </div>
                        <ImageUploader
                            button={
                                <div className={styles.upload}>
                                    <span className="material-symbols-rounded">attach_file</span>{" "}
                                    <p>Attach</p>{" "}
                                </div>
                            }
                            preview={attachmentRef}
                            onImageUploaded={(url) => setUploadedAttachment(url as any)}
                        />
                        <div onClick={() => complete()} className={styles.send}>
                            <span className="material-symbols-rounded">send</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default PostCreator
