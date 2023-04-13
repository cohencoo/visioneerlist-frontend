import React, { useState, useRef, useEffect } from "react"
import styles from "./ProfileEditor.module.scss"
import placeholderUser from "../../../assets/user.png"
import axios from "axios"
import { API_ROUTE } from "../../../App"
import toast from "react-hot-toast"
import ImageUploader from "../ImageUploader/ImageUploader"
import { toastSchema, toastStyles } from "../../../assets/utils"
import Button from "../Button/Button"

let newProfileImage: string
interface ProfileEditorProps {
    profile: any
    refetch: any
    setOverlay: any
}

const ProfileEditor: React.FC<ProfileEditorProps> = ({ profile, refetch, setOverlay }) => {
    const [isHiring, setIsHiring] = useState(profile.hiring)
    const [updateProfileImage, setUpdateProfileImage] = useState("")
    const [verifying, setVerifying] = useState(false)

    useEffect(() => {
        newProfileImage = profile.image
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    const previewerRef = useRef<HTMLDivElement>(null)
    const editTitle = useRef<HTMLInputElement>(null)
    const editCompany = useRef<HTMLInputElement>(null)
    const editLocation = useRef<HTMLInputElement>(null)
    const editEmail = useRef<HTMLInputElement>(null)
    const editPhone = useRef<HTMLInputElement>(null)
    const editWebsite = useRef<HTMLInputElement>(null)
    const editDescription = useRef<HTMLTextAreaElement>(null)
    const editHiring = useRef<HTMLInputElement>(null)
    const editSalary = useRef<HTMLInputElement>(null)
    const editEmploymentType = useRef<HTMLInputElement>(null)

    function complete() {
        setVerifying(true)
        const update = {
            id: profile._id,
            title: editTitle.current!.value || profile.title,
            company: editCompany.current!.value || profile.company,
            location: editLocation.current!.value || profile.location,
            email: editEmail.current!.value || profile.email,
            phone: editPhone.current!.value || profile.phone,
            website: editWebsite.current!.value || profile.website,
            description: editDescription.current!.value || profile.description,
            image: newProfileImage || profile.image,
            hiring: editHiring.current!.checked || false,
            salaryRange: editSalary.current!.value || profile.salary,
            employmentType: editEmploymentType.current!.value || profile.employmentType
        }

        axios
            .post(API_ROUTE + "/api/edit-profile", update)
            .then(() => {
                refetch(() => {
                    setOverlay(null)
                    toast.success("Profile was Updated.", toastSchema("profile-updated"))
                })
            })
            .catch(() => {
                toast.error(
                    "Something went wrong. Please try again later.",
                    toastSchema("edit-error")
                )
            })
    }

    useEffect(() => {
        editTitle.current!.value = profile.title || ""
        editCompany.current!.value = profile.company || ""
        editLocation.current!.value = profile.location || ""
        editEmail.current!.value = profile.email || ""
        editPhone.current!.value = profile.phone || ""
        editWebsite.current!.value = profile.website || ""
        editDescription.current!.value = profile.description || ""
        editHiring.current!.checked = profile.hiring || false
        editSalary.current!.value = profile.salaryRange || ""
        editEmploymentType.current!.value = profile.employmentType || ""
    }, [profile])

    return (
        <>
            <div className={styles.ProfileEditor}>
                <div
                    className={styles.banner}
                    style={{ background: `url(${profile.image || placeholderUser})` }}></div>
                <img
                    className={styles.image}
                    src={updateProfileImage || profile.image || placeholderUser}
                    alt={profile.title}
                />
                <div ref={previewerRef}></div>

                <h1>
                    <span className="material-symbols-rounded">edit</span>
                    Managing <i>'{profile.title}'</i>
                </h1>

                <div className={styles.details}>
                    <p className={styles.label}>Update Profile Image</p>
                    <div className={styles.imageUpload}>
                        <img
                            src={updateProfileImage || profile.image || placeholderUser}
                            alt={profile.title}
                        />
                        <ImageUploader
                            button={
                                <button className={styles.changeImage}>
                                    <span className="material-symbols-rounded">
                                        add_photo_alternate
                                    </span>
                                    Upload
                                </button>
                            }
                            preview={previewerRef}
                            onImageUploaded={(url: string) => {
                                newProfileImage = url
                                setUpdateProfileImage(url)
                            }}
                        />
                    </div>

                    <hr />
                    <p className={styles.label}>Click and Modify the information below</p>

                    <input maxLength={300} type="text" ref={editTitle} placeholder="Title" />
                    <input maxLength={300} type="text" ref={editCompany} placeholder="Company" />
                    <input maxLength={300} type="text" ref={editLocation} placeholder="Location" />
                    <input maxLength={300} type="text" ref={editWebsite} placeholder="Website" />
                    <input maxLength={13} type="text" ref={editPhone} placeholder="Phone" />
                    <input maxLength={300} type="text" ref={editEmail} placeholder="Email" />
                    <textarea maxLength={5000} ref={editDescription} placeholder="Description" />

                    <p className={styles.label}>
                        {isHiring
                            ? "You are currently Hiring. Click below to cancel."
                            : "You are currently Not Hiring. Click below to update."}
                    </p>

                    <label className={styles.checkBox}>
                        <input
                            onChange={() =>
                                editHiring.current && setIsHiring(editHiring.current.checked)
                            }
                            ref={editHiring}
                            type="checkbox"
                        />
                        <div className={styles.transition}></div>
                    </label>

                    <div style={{ display: isHiring ? "block" : "none" }} className={styles.hiring}>
                        <p className={styles.label}>
                            What is the proposed salary range for this position? (Consider including
                            hourly wage)
                        </p>
                        <input
                            maxLength={300}
                            type="text"
                            ref={editSalary}
                            placeholder="*Use currency where applicable"
                        />
                        <p className={styles.label}>What is the employment type?</p>
                        <input
                            maxLength={300}
                            type="text"
                            ref={editEmploymentType}
                            placeholder="Eg. Full Time/Part Time"
                        />
                    </div>

                    <Button
                        message={["Save Changes", "Verifying your changes..."]}
                        icon={"done_all"}
                        verifying={verifying}
                        action={complete}
                    />
                </div>
                <div className={styles.details}>
                    <p className={styles.label}>
                        <span className="material-symbols-rounded">error</span>
                        Destructive
                    </p>
                    <p
                        onClick={() => {
                            if (window.confirm("Delete this profile?")) {
                                const toastId = toast.loading("Deleting Profile..", {
                                    position: "top-center",
                                    style: toastStyles
                                })
                                axios
                                    .get(API_ROUTE + "/api/delete-profile/" + profile._id)
                                    .then(() => {
                                        refetch(() => {
                                            setOverlay(null)
                                            toast.dismiss(toastId)
                                            toast.success(
                                                "Profile was Deleted.",
                                                toastSchema("profile-deleted")
                                            )
                                        })
                                    })
                                    .catch(() => {
                                        toast.error(
                                            "Something went wrong. Please try again later.",
                                            toastSchema("delete-error")
                                        )
                                    })
                            }
                        }}
                        className={styles.deleteProfile}>
                        Delete Profile
                    </p>
                </div>
            </div>
        </>
    )
}

export default ProfileEditor
