import React, { useRef } from "react"
import { readableDateTime } from "../../../assets/utils"
import styles from "./Listing.module.scss"
import placeholderUser from "../../../assets/user.png"
import ImageLoader from "../../../Dashboard/components/ImageLoader/ImageLoader"

const Listing: React.FC<{ props: any }> = ({ props }) => {
    const description = useRef<HTMLParagraphElement>(null)
    const showMore = () =>
        description.current && (description.current.innerText = props.description)

    return (
        <div className={styles.Listing}>
            <div className={styles.meta}>
                <div className={styles.profile}>
                    <div className={styles.icon}>
                        <span className="material-symbols-rounded">corporate_fare</span>
                    </div>
                    <div>
                        <p className={styles.name}>{props.title}</p>
                        <p className={styles.details}>
                            {props.company} - {props.location}
                        </p>
                        <p className={styles.details}>Posted {readableDateTime(props.created)}</p>
                    </div>
                </div>
                <p onClick={() => showMore()} ref={description}>
                    {props.description.length > 100 ? (
                        <>
                            {" "}
                            {props.description.slice(0, 100)}{" "}
                            <span className={styles["read-more"]}> read more... </span>{" "}
                        </>
                    ) : (
                        props.description
                    )}
                </p>
            </div>
            <ImageLoader
                loadingStyles={{ maxHeight: "300px" }}
                className={styles.attachment}
                src={props.image || placeholderUser}
            />
        </div>
    )
}

export default Listing
