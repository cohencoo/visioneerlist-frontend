import React, { useState, useRef, useEffect } from "react"
import styles from "./ProfileEditor.module.scss"
import placeholderUser from "../../../assets/user.png"
import axios from "axios"
import { API_ROUTE } from "../../../App"
import toast from "react-hot-toast"
import { sanitizeInput, toastSchema, toastStyles } from "../../../assets/utils"
import Button from "../Button/Button"
import Upload from "../Upload/Upload"
import RichText from "../RichText/RichText"
import uploadPlaceholder from "../../../assets/attachment.png"
import ImageLoader from "../ImageLoader/ImageLoader"

interface ProfileEditorProps {
    profile: any
    refetch: any
    setOverlay: any
}

const ProfileEditor: React.FC<ProfileEditorProps> = ({ profile, refetch, setOverlay }) => {
    const [isHiring, setIsHiring] = useState(profile.hiring)
    const [verifying, setVerifying] = useState(false)
    const [profileImage, setProfileImage] = useState(profile.image)
    const [descriptionPlain, setDescriptionPlain] = useState(profile.description)
    const [descriptionHTML, setDescriptionHTML] = useState(profile.descriptionHTML)
    const [gallery, setGallery] = useState(profile.gallery || [])

    const editTitle = useRef<HTMLInputElement>(null)
    const editCompany = useRef<HTMLInputElement>(null)
    const editLocation = useRef<HTMLInputElement>(null)
    const editEmail = useRef<HTMLInputElement>(null)
    const editPhone = useRef<HTMLInputElement>(null)
    const editWebsite = useRef<HTMLInputElement>(null)
    const editHiring = useRef<HTMLInputElement>(null)
    const editSalary = useRef<HTMLInputElement>(null)
    const editEmploymentType = useRef<HTMLInputElement>(null)

    function complete() {
        if (descriptionPlain.trim().length > 5000) {
            toast.error(
                "Description is too long. Please shorten it to 5000 characters or less.",
                toastSchema("description-too-long")
            )
            return
        }

        setVerifying(true)

        const update = {
            id: profile._id,
            title: editTitle.current!.value || profile.title,
            company: editCompany.current!.value || profile.company,
            location: editLocation.current!.value || profile.location,
            email: editEmail.current!.value || profile.email,
            phone: editPhone.current!.value || profile.phone,
            website: editWebsite.current!.value || profile.website,
            description: descriptionPlain || profile.description,
            descriptionHTML: descriptionHTML || profile.descriptionHTML,
            image: profileImage || profile.image,
            gallery: gallery || profile.gallery || [],
            hiring: editHiring.current!.checked || false,
            salaryRange: editSalary.current!.value || profile.salary,
            employmentType: editEmploymentType.current!.value || profile.employmentType
        }

        axios
            .post(API_ROUTE + "/api/edit-profile", update)
            .then(() => {
                refetch(() => {
                    setOverlay(null)
                    toast.success("Profile was Updated", toastSchema("profile-updated"))
                })
            })
            .catch(() => {
                setVerifying(false)
                toast.error(
                    "Something went wrong. Please try again later.",
                    toastSchema("edit-error")
                )
            })
    }

    function handleGalleryChange(index: number, url: string) {
        setGallery((prev: any) => {
            prev[index] = url
            return prev
        })
    }

    useEffect(() => {
        editTitle.current!.value = profile.title || ""
        editCompany.current!.value = profile.company || ""
        editLocation.current!.value = profile.location || ""
        editEmail.current!.value = profile.email || ""
        editPhone.current!.value = profile.phone || ""
        editWebsite.current!.value = profile.website || ""
        editHiring.current!.checked = profile.hiring || false
        editSalary.current!.value = profile.salaryRange || ""
        editEmploymentType.current!.value = profile.employmentType || ""
    }, [profile])

    return (
        <>
            <div className={styles.ProfileEditor}>
                <div
                    className={styles.banner}
                    style={{ background: `url(${profileImage || placeholderUser})` }}></div>

                <ImageLoader
                    className={styles.image}
                    loadingStyles={{
                        margin: "0 auto",
                        maxWidth: "600px",
                        maxHeight: "300px"
                    }}
                    src={profileImage || placeholderUser}
                />

                <h1 className={styles.headline}>
                    <span className="material-symbols-rounded">edit</span>
                    Managing: {profile.title}
                </h1>

                <div className={styles.details}>
                    <p className={styles.label}>Update Profile Image</p>
                    <div className={styles.imageUpload}>
                        <Upload
                            size="8rem"
                            customClass={"editing"}
                            initialImage={profileImage || placeholderUser}
                            onImageUploaded={(url: string) => setProfileImage(url)}
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

                    <br />
                    <br />

                    <RichText
                        initialContent={profile.descriptionHTML || profile.description || ""}
                        onEdit={(text: any) => {
                            setDescriptionPlain(sanitizeInput(text.outerText))
                            setDescriptionHTML(sanitizeInput(text.innerHTML))
                        }}
                    />

                    {gallery && (
                        <>
                            <hr />
                            <p className={styles.label}>
                                Click to modify your Showcase Gallery below
                            </p>
                            <div className={styles.gallery}>
                                <Upload
                                    size="140px"
                                    customClass={"gallery"}
                                    initialImage={gallery[0] || uploadPlaceholder}
                                    onImageUploaded={(url: string) => handleGalleryChange(0, url)}
                                />
                                <Upload
                                    size="140px"
                                    customClass={"gallery"}
                                    initialImage={gallery[1] || uploadPlaceholder}
                                    onImageUploaded={(url: string) => handleGalleryChange(1, url)}
                                />
                                <Upload
                                    size="140px"
                                    customClass={"gallery"}
                                    initialImage={gallery[2] || uploadPlaceholder}
                                    onImageUploaded={(url: string) => handleGalleryChange(2, url)}
                                />
                            </div>
                        </>
                    )}

                    <p className={styles.label}>
                        {isHiring
                            ? "You are currently Hiring. Click below to cancel."
                            : "You are Not Hiring. Click below to update."}
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
                                const toastId = toast.loading("Deleting Profile...", {
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
                                                "Profile was Deleted",
                                                toastSchema("profile-deleted")
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
                        className={styles.deleteProfile}>
                        Delete Profile
                    </p>
                </div>
            </div>
        </>
    )
}

export default ProfileEditor
