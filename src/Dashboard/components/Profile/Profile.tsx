import React, { useState } from "react"
import styles from "./Profile.module.scss"
import placeholderUser from "../../../assets/user.png"
import ProfileViewer from "../ProfileViewer/ProfileViewer"
import { readableDateTime } from "../../../assets/utils"
import { API_ROUTE } from "../../../App"
import axios from "axios"
import cn from "clsx"

interface ProfileProps {
    props: any
    profiles: any
    refetch: any
    setOverlay: any
    settings: any
}

const Profile: React.FC<ProfileProps> = ({ props, profiles, refetch, setOverlay, settings }) => {
    const [loading, setLoading] = useState(true)

    return (
        <div
            onClick={() => {
                axios.get(API_ROUTE + "/api/get-profile/" + props._id)
                setOverlay(
                    <ProfileViewer
                        refetch={refetch}
                        setOverlay={setOverlay}
                        profile={profiles[props._id]}
                        settings={settings}
                    />
                )
            }}
            className={cn(styles.Profile, loading ? styles.ProfileLoading : "")}>
            <div
                style={{
                    backgroundImage: `url(${props.image || placeholderUser})`,
                    opacity: loading ? 0 : 1
                }}
                className={styles.icon}>
                <img
                    src={props.image || placeholderUser}
                    onLoad={() => setLoading(false)}
                    style={{ display: "none" }}
                    alt="Profile"
                />
                <div className={styles.modifiers}>
                    {props.hiring && (
                        <div className={styles.hiring}>Actively Hiring • Apply here</div>
                    )}
                    {props.boosted && <div className={styles.boosted}>Promoted</div>}
                </div>
            </div>
            <div className={styles.information}>
                <p className={styles.name}>
                    {props?.title?.length > 40 ? props.title.substring(0, 40) + "..." : props.title}
                </p>
                <p className={styles.company}>
                    {props?.company?.length > 60
                        ? props.company.substring(0, 60) + "..."
                        : props.company}
                </p>
                <div className={styles.details}>
                    {props.views ? `${props.views} views` : ""} • {readableDateTime(props.created)}
                </div>
                <p className={styles.description}>
                    {props?.description?.length > 100
                        ? props.description.substring(0, 100) + "..."
                        : props.description}
                </p>
            </div>
        </div>
    )
}

export default Profile
