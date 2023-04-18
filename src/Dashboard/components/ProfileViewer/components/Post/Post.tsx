import React from "react"
import styles from "./Post.module.scss"
import { readableDateTime, toastSchema, toastStyles } from "../../../../../assets/utils"
import { toast } from "react-hot-toast"
import { API_ROUTE } from "../../../../../App"
import axios from "axios"

interface PostInterface {
    post: any
    setOverlay: any
    refetch: any
    index: number
    profileId: string
}

const Post: React.FC<PostInterface> = ({ post, setOverlay, refetch, index, profileId }) => {
    return (
        <div className={styles.Post}>
            <h3>{post.title}</h3>
            <span className={styles.timestamp}>
                {readableDateTime(post.date)} - {new Date(post.date).toLocaleDateString()}
                <span
                    onClick={() => {
                        if (window.confirm("Are you sure you want to delete this post?")) {
                            const toastId = toast.loading("Deleting Post...", {
                                position: "top-center",
                                style: toastStyles
                            })
                            axios
                                .get(API_ROUTE + "/api/delete-post/" + profileId + "/" + index)
                                .then(() => {
                                    refetch(() => {
                                        setOverlay(null)
                                        toast.dismiss(toastId)
                                        toast.success(
                                            "Post was Deleted",
                                            toastSchema("post-deleted")
                                        )
                                    })
                                })
                                .catch(() => {
                                    toast.dismiss(toastId)
                                    toast.error(
                                        "Something went wrong. Please try again later.",
                                        toastSchema("delete-error")
                                    )
                                })
                        }
                    }}
                    className="material-symbols-rounded">
                    more_horiz
                </span>
            </span>
            <p
                dangerouslySetInnerHTML={{
                    __html: post.description.replaceAll("\n", "<br>")
                }}></p>
            {post.attachment && <img src={post.attachment} alt={post.title} />}
        </div>
    )
}

export default Post
