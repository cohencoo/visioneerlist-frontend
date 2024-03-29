import React, { useEffect, useState } from "react"
import styles from "./ProfileViewer.module.scss"
import placeholderUser from "../../../assets/user.png"
import {
    capitalize,
    fixURL,
    readableDateTime,
    toastSchema,
    toastStyles
} from "../../../assets/utils"
import { AI_ROUTE, MAP_ROUTE } from "../../../App"
import axios from "axios"
import PostCreator from "./components/PostCreator/PostCreator"
import toast from "react-hot-toast"
import cn from "clsx"
import Post from "./components/Post/Post"
import { ImageViewer } from "../ImageViewer/ImageViewer"
import ImageLoader from "../ImageLoader/ImageLoader"

interface ProfileViewerProps {
    profile: any
    refetch: any
    setOverlay: any
    settings: any
}

const ProfileViewer: React.FC<ProfileViewerProps> = ({
    profile,
    refetch,
    setOverlay,
    settings
}) => {
    const [creatingPost, setCreatingPost] = useState(false)
    const [labelListing, setLabelListing] = useState("")

    useEffect(() => {
        const sanitize = (text: string) =>
            text
                .trim()
                .replace(/(https?:\/\/)?([\da-z.-]+)\.([a-z.]{2,6})([/\w .-]*)*\/?/g, "")
                .replace(/[^\w\s]/gi, "")

        axios
            .get(AI_ROUTE + "/classify/" + sanitize(profile.description))
            .then((res) => setLabelListing(capitalize(res.data)))
    }, [profile.description])

    function copyProfile() {
        function wasCopied(success: boolean) {
            if (success) {
                toast.success("Copied to clipboard!", toastSchema("link-copied"))
            } else {
                toast.error("Failed to copy to clipboard!", toastSchema("link-failed"))
            }
        }

        toast.success(
            <div
                onClick={() => {
                    navigator.clipboard
                        .writeText(`${window.location.origin}/?id=${profile._id}`)
                        .then(() => wasCopied(true))
                        .catch(() => wasCopied(false))
                }}>
                <b>Click to Copy:</b>
                <br />
                {window.location.host}/?id={profile._id}
            </div>,
            {
                icon: "🔗",
                id: "copy-profile",
                duration: 4000,
                position: "top-center",
                style: { ...toastStyles, cursor: "pointer", pointerEvents: "all" }
            }
        )
    }

    return (
        <>
            <div className={styles.ProfileViewer}>
                <div
                    className={styles.banner}
                    style={{ background: `url(${profile.image || placeholderUser})` }}></div>

                <ImageLoader
                    className={styles.image}
                    loadingStyles={{
                        margin: "0 auto",
                        maxWidth: "600px",
                        maxHeight: "300px"
                    }}
                    onClick={() => ImageViewer(profile.image, "png")}
                    src={profile.image || placeholderUser}
                />

                <h1 className={styles.headline}>{profile.title}</h1>

                <div className={styles.meta}>
                    <div>
                        <span className="material-symbols-rounded">corporate_fare</span>
                        {profile.company}
                    </div>
                    <div>
                        <span className="material-symbols-rounded">location_on</span>
                        {profile.location || "Not Specified"}
                    </div>
                    <div>
                        <span className="material-symbols-rounded">update</span>
                        {readableDateTime(profile.created)}
                    </div>
                    <div>
                        <span className="material-symbols-rounded">insights</span>
                        {profile.views ? `${profile.views} views` : ""}
                    </div>
                </div>

                <div className={styles.toolbar}>
                    <div onClick={() => window.open(fixURL(profile.website), "_blank")}>
                        <span className="material-symbols-rounded">captive_portal</span>
                        Visit Site
                    </div>
                    <div onClick={() => copyProfile()}>
                        <span className="material-symbols-rounded">share</span>
                        Share
                    </div>
                    <div onClick={() => settings(profile._id)}>
                        <span className="material-symbols-rounded">app_registration</span>
                        Manage Profile
                    </div>
                </div>

                <div className={styles.details}>
                    <h2>About Us</h2>
                    <p
                        className={styles.description}
                        dangerouslySetInnerHTML={{
                            __html:
                                profile?.descriptionHTML ||
                                profile?.description?.replaceAll("\n", "<br>")
                        }}></p>

                    {profile?.gallery?.filter((i: any) => i !== "")?.length > 0 && (
                        <>
                            <div className={styles.gallery}>
                                {profile.gallery.map((image: string, index: number) => {
                                    if (!image) return null
                                    return (
                                        <ImageLoader
                                            onClick={() => ImageViewer(image, "png")}
                                            key={index}
                                            src={image}
                                        />
                                    )
                                })}
                            </div>
                        </>
                    )}

                    {labelListing && (
                        <>
                            <hr />
                            <p className={styles.label}>
                                VisioneerList categorized this Profile as:
                            </p>
                            <div className={styles.autoCategory}>
                                <span className="material-symbols-rounded">auto_mode</span>
                                <div>
                                    <p className={styles.category}>{labelListing}</p>
                                    <span className={styles.link}>Find more in {labelListing}</span>
                                </div>
                            </div>
                        </>
                    )}
                </div>

                <div style={{ padding: "0" }} className={styles.details}>
                    <iframe
                        className={styles.map}
                        src={MAP_ROUTE + profile.location}
                        title="Location"></iframe>
                </div>

                <div
                    style={{ display: profile.hiring ? "block" : "none" }}
                    className={styles.details}>
                    <h2>Employment Details</h2>
                    <ul>
                        <li>
                            <span className="material-symbols-rounded">partner_exchange</span>
                            Status: Actively Hiring
                        </li>
                        <li>
                            <span className="material-symbols-rounded">currency_exchange</span>
                            Salary Range: {profile.salaryRange || "Not Specified"}
                        </li>
                        <li>
                            <span className="material-symbols-rounded">work</span>
                            Employment Type: {profile.employmentType || "Not Specified"}
                        </li>
                    </ul>
                </div>

                <div className={styles.details}>
                    <h2>Contact Us</h2>
                    <ul>
                        <li>
                            <span className="material-symbols-rounded">language</span>
                            {profile.website ? (
                                <>
                                    Website:{" "}
                                    <a
                                        target="_blank"
                                        rel="noreferrer"
                                        href={fixURL(profile.website)}>
                                        {profile.website.slice(0, 30)}
                                        {profile.website.length > 30 ? "..." : ""}
                                    </a>
                                </>
                            ) : (
                                "Website: Not Specified"
                            )}
                        </li>
                        <li>
                            <span className="material-symbols-rounded">phone</span>
                            {profile.phone ? (
                                <>
                                    Phone:{" "}
                                    <a
                                        target="_blank"
                                        rel="noreferrer"
                                        href={`tel:${profile.phone}`}>
                                        {profile.phone}
                                    </a>
                                </>
                            ) : (
                                "Phone: Not Specified"
                            )}
                        </li>
                        <li>
                            <span className="material-symbols-rounded">alternate_email</span>
                            {profile.email ? (
                                <>
                                    Email:{" "}
                                    <a
                                        target="_blank"
                                        rel="noreferrer"
                                        href={`mailto:${profile.email}`}>
                                        {profile.email}
                                    </a>
                                </>
                            ) : (
                                "Email: Not Specified"
                            )}
                        </li>
                    </ul>
                </div>
                <div className={cn(styles.postsContainer, styles.details)}>
                    <h2>Posts</h2>
                    {(!profile.posts || profile?.posts?.length === 0) && (
                        <p className={styles.nothing}>Nothing posted here yet.</p>
                    )}
                    {profile?.posts?.map((post: any, index: any) => {
                        return (
                            <div key={index}>
                                <Post
                                    post={post}
                                    refetch={refetch}
                                    setOverlay={setOverlay}
                                    profileId={profile._id}
                                    index={index}
                                />
                            </div>
                        )
                    })}
                    <hr />
                    <PostCreator
                        refetch={refetch}
                        active={creatingPost}
                        setActive={setCreatingPost}
                        setOverlay={setOverlay}
                        settings={settings}
                        id={profile._id}
                    />
                </div>
            </div>
        </>
    )
}

export default ProfileViewer
