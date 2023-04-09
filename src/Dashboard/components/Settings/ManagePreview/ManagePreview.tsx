import React from "react"
import styles from "./ManagePreview.module.scss"
import ProfileEditor from "../../ProfileEditor/ProfileEditor"
import { readableDateTime } from "../../../../assets/utils"
import placeholderUser from "../../../../assets/user.png"

interface ManagePreviewProps {
    profiles: any
    refetch: any
    setOverlay: any
    id: string
}

const ManagePreview: React.FC<ManagePreviewProps> = ({ profiles, refetch, setOverlay, id }) => {
    return (
        <div
            onClick={() =>
                setOverlay(
                    <ProfileEditor
                        refetch={refetch}
                        setOverlay={setOverlay}
                        profile={profiles[id]}
                    />
                )
            }
            className={styles.ManagePreview}>
            <img src={profiles?.[id]?.image || placeholderUser} alt="Profile" />
            <div>
                <h2>{profiles?.[id]?.title}</h2>
                <div className={styles.stats}>
                    <p>
                        <span className="material-symbols-rounded">corporate_fare</span>
                        {profiles?.[id]?.company}
                    </p>
                    <p>
                        <span className="material-symbols-rounded">update</span>
                        {profiles?.[id]?.views} views
                    </p>
                    <p>
                        <span className="material-symbols-rounded">insights</span>
                        Listed {readableDateTime(profiles?.[id]?.created)}
                    </p>
                </div>
            </div>
        </div>
    )
}

export default ManagePreview
