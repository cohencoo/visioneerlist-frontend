import React, { useRef, useState } from "react"
import styles from "./ProfileCreator.module.scss"
import placeholderUser from "../../../assets/user.png"
import { toastStyles, uuid } from "../../../assets/utils"
import axios from "axios"
import { API_ROUTE } from "../../../App"
import toast from "react-hot-toast"
import ImageUploader from "../ImageUploader/ImageUploader"
import Memo from "./Memo"
import Button from "../Button/Button"

interface ProfileCreatorProps {
    refetch: any
    setOverlay: any
}

const ProfileCreator: React.FC<ProfileCreatorProps> = ({ refetch, setOverlay }) => {
    const previewerRef = useRef<HTMLDivElement>(null)
    const [step, setStep] = useState(0)
    const [verifying, setVerifying] = useState(false)
    const [ownerEmail, setOwnerEmail] = useState("")
    const [ownerPassword, setOwnerPassword] = useState("")

    const [formData, setFormData] = useState({
        title: "",
        company: "",
        location: "",
        website: "",
        phone: "",
        email: "",
        description: "",
        keywords: "",
        hiring: false,
        salaryRange: "",
        employmentType: "",
        created: new Date().getTime(),
        views: 1,
        _id: uuid(),
        image: ""
    })

    function notify(type: string, message: string) {
        const config: any = { duration: 4000, position: "top-center", style: toastStyles }
        if (type === "error") toast.error(message, config)
        else toast.success(message, config)
    }

    function createProfile() {
        if (formData.title.trim() && formData.company.trim() && formData.description.trim()) {
            if (ownerEmail && ownerPassword) {
                setVerifying(true)

                const userCredentials = {
                    _id: ownerEmail,
                    password: ownerPassword,
                    profiles: [formData._id]
                }

                axios
                    .post(API_ROUTE + "/api/new-user", userCredentials)
                    .then(() => {
                        axios
                            .post(API_ROUTE + "/api/new-profile", {
                                ...formData,
                                owner: { _id: ownerEmail }
                            })
                            .then(() => {
                                refetch(() => {
                                    setOverlay(null)
                                    notify("success", `Successfully Created "${formData.title}"`)
                                })
                            })
                            .catch(() => {
                                setVerifying(false)
                                notify("error", `Something went wrong. Please try again later.`)
                            })
                    })
                    .catch(() => {
                        setVerifying(false)
                        notify("error", `An account is already using this email.`)
                    })
            } else notify("error", `Please create an account to link your Profile to.`)
        }
    }

    const handleInputChange = (item: any) => {
        setFormData((prevState) => ({
            ...prevState,
            [item.name]: item.type === "radio" ? Boolean(item.value) : item.value
        }))
    }

    return (
        <div className={styles.ProfileCreator}>
            <div className={styles.steps}>
                <div className={styles.memo}>
                    <Memo step={step} companyName={formData.company} />
                </div>
                <div style={{ display: step === 0 ? "block" : "none" }} className={styles.stage}>
                    <div className={styles.container}>
                        <div className={styles.upload}>
                            <ImageUploader
                                button={
                                    <div
                                        style={{
                                            width: "100%",
                                            height: "100%",
                                            position: "absolute"
                                        }}></div>
                                }
                                preview={previewerRef}
                                onImageUploaded={(url: string) =>
                                    setFormData((prevState) => ({ ...prevState, image: url }))
                                }
                            />
                            <div
                                className={styles.preview}
                                style={{ backgroundImage: `url(${placeholderUser})` }}
                                ref={previewerRef}></div>
                        </div>
                        <div className={styles.tooltip}>Click to edit</div>
                    </div>
                </div>

                <div style={{ display: step === 1 ? "block" : "none" }} className={styles.stage}>
                    <p className={styles.label}>Please enter a headline/title</p>
                    <div className={styles.flex}>
                        <span className="material-symbols-rounded">drive_file_rename_outline</span>
                        <input
                            maxLength={300}
                            onChange={(e) => handleInputChange(e.target)}
                            placeholder="Eg. Graphic design services"
                            name="title"
                            type="title"
                        />
                    </div>
                    <br />
                    <div className={styles.flex}>
                        <span className="material-symbols-rounded">corporate_fare</span>
                        <input
                            maxLength={300}
                            onChange={(e) => handleInputChange(e.target)}
                            placeholder="Company or business name"
                            name="company"
                            type="company"
                        />
                    </div>
                    <br />
                    <div className={styles.flex}>
                        <span className="material-symbols-rounded">location_on</span>
                        <input
                            maxLength={300}
                            onChange={(e) => handleInputChange(e.target)}
                            placeholder="Location"
                            name="location"
                            type="location"
                        />
                    </div>
                </div>

                <div style={{ display: step === 2 ? "block" : "none" }} className={styles.stage}>
                    <div className={styles.flex}>
                        <span className="material-symbols-rounded">link</span>
                        <input
                            maxLength={300}
                            onChange={(e) => handleInputChange(e.target)}
                            placeholder="Website URL"
                            name="website"
                            type="website"
                        />
                    </div>
                </div>

                <div style={{ display: step === 3 ? "block" : "none" }} className={styles.stage}>
                    <div className={styles.flex}>
                        <span className="material-symbols-rounded">call</span>
                        <input
                            onChange={(e) => handleInputChange(e.target)}
                            maxLength={13}
                            placeholder="Phone"
                            name="phone"
                            type="phone"
                        />
                    </div>
                    <br />
                    <div className={styles.flex}>
                        <span className="material-symbols-rounded">mail</span>
                        <input
                            maxLength={300}
                            onChange={(e) => handleInputChange(e.target)}
                            placeholder="Email"
                            name="email"
                            type="email"
                        />
                    </div>
                </div>

                <div style={{ display: step === 4 ? "block" : "none" }} className={styles.stage}>
                    <p className={styles.label}>
                        (max 1000 words) - Describe your business, services, and/or products.
                    </p>

                    <textarea
                        maxLength={5000}
                        onChange={(e) => handleInputChange(e.target)}
                        placeholder="Profile Description"
                        name="description"></textarea>

                    <p className={styles.label}>
                        (Optional) - Improve your search presence with keywords. Separate each
                        keyword with a comma.
                    </p>
                    <div className={styles.flex}>
                        <span className="material-symbols-rounded">manage_search</span>
                        <input
                            maxLength={300}
                            onChange={(e) => handleInputChange(e.target)}
                            placeholder="consultation, designer, example, etc."
                            name="keywords"
                            type="keywords"
                        />
                    </div>
                </div>

                <div style={{ display: step === 5 ? "block" : "none" }} className={styles.stage}>
                    <p className={styles.label}>
                        Are you currently hiring?
                        <br />
                        <br />
                        <input
                            onChange={(e) => handleInputChange(e.target)}
                            type="radio"
                            id="yes"
                            name="hiring"
                            value="yes"
                        />
                        <label htmlFor="yes">Yes, I am currently hiring</label>
                        <br />
                        <br />
                        <input
                            onChange={(e) => handleInputChange(e.target)}
                            type="radio"
                            id="no"
                            name="hiring"
                            value=""
                        />
                        <label htmlFor="no">No, I am not currently hiring</label>
                    </p>
                    {formData.hiring && (
                        <div>
                            <br />
                            <p className={styles.label}>
                                What is the proposed salary range for this position? (Consider
                                including hourly wage)
                            </p>
                            <input
                                maxLength={300}
                                onChange={(e) => handleInputChange(e.target)}
                                placeholder="*Use currency where applicable"
                                name="salaryRange"
                                type="salaryRange"
                            />
                            <p className={styles.label}> What is the employment type? </p>
                            <input
                                maxLength={300}
                                onChange={(e) => handleInputChange(e.target)}
                                placeholder="Eg. Full Time/Part Time"
                                name="employmentType"
                                type="employmentType"
                            />
                        </div>
                    )}
                </div>

                <div style={{ display: step === 6 ? "block" : "none" }} className={styles.stage}>
                    <p className={styles.label}> Email </p>
                    <input
                        maxLength={300}
                        onChange={(e) => setOwnerEmail(e.target.value)}
                        placeholder="Email"
                        name="ownerEmail"
                        type="email"
                    />
                    <p className={styles.label}> Password </p>
                    <input
                        maxLength={300}
                        onChange={(e) => setOwnerPassword(e.target.value)}
                        placeholder="Password"
                        name="ownerPassword"
                        type="password"
                    />

                    <Button
                        verifying={verifying}
                        message={["Add Profile", "Verifying your post..."]}
                        icon={"add_business"}
                        action={createProfile}
                    />

                    <p className={styles.label}>
                        By creating a Profile, you warrant that the information provided is truthful
                        and up to date.
                    </p>
                </div>
            </div>
            <div className={styles.navigation}>
                <div className={styles.container}>
                    <button
                        style={{ display: step === 0 ? "none" : undefined }}
                        onClick={() => step > 0 && setStep(step - 1)}>
                        Back
                        <span className="material-symbols-rounded">arrow_back</span>
                    </button>
                    <button
                        style={{ display: step === 6 ? "none" : undefined }}
                        onClick={() => {
                            if (
                                step === 1 &&
                                (!formData.title.trim() || !formData.company.trim())
                            ) {
                                toast.error("Please provide a headline/title and a company name.", {
                                    duration: 4000,
                                    position: "top-center",
                                    style: toastStyles
                                })
                                return
                            }
                            if (step === 4 && !formData.description.trim()) {
                                toast.error("Please provide a description.", {
                                    duration: 4000,
                                    position: "top-center",
                                    style: toastStyles
                                })
                                return
                            }
                            if (step < 6) setStep(step + 1)
                        }}>
                        Next
                        <span className="material-symbols-rounded">arrow_forward</span>
                    </button>
                </div>
                <div style={{ opacity: step > 0 ? 1 : 0 }} className={styles.progress}>
                    <div style={{ width: `${(step / 6) * 100}%` }}></div>
                </div>
            </div>
        </div>
    )
}

export default ProfileCreator
