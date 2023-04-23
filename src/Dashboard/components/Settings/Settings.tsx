import React, { useRef, useState } from "react"
import styles from "./Settings.module.scss"
import { roundTo, toastSchema } from "../../../assets/utils"
import axios from "axios"
import { API_ROUTE } from "../../../App"
import { toast } from "react-hot-toast"
import ManagePreview from "./ManagePreview/ManagePreview"
import Button from "../Button/Button"
import ProfileEditor from "../ProfileEditor/ProfileEditor"

interface LoginProps {
    passwordRef: any
    emailRef: any
    login: any
    verifying: boolean
    newProfile: any
}

const Login: React.FC<LoginProps> = ({ passwordRef, emailRef, login, verifying, newProfile }) => {
    return (
        <div className={styles.login}>
            <span className={styles.accountIcon}>
                <span className="material-symbols-rounded">manage_accounts</span>
            </span>
            <h1>Login to manage your Profile Listing</h1>
            <input maxLength={300} ref={emailRef} type="email" name="email" placeholder="Email" />
            <input
                maxLength={300}
                ref={passwordRef}
                type="password"
                name="password"
                placeholder="Password"
            />
            <Button
                message={["Login", "Verifying..."]}
                icon="login"
                verifying={verifying}
                action={() => login()}
            />
            <p className={styles.tip}>
                Haven't got an account? You can create one by{" "}
                <span onClick={() => newProfile()}>Creating a Profile Listing</span>
            </p>
        </div>
    )
}

interface ProfileListingProps {
    profileListings: any
    emailRef: any
    storage: any
}

const ProfileListings: React.FC<ProfileListingProps> = ({ profileListings, emailRef, storage }) => {
    return (
        <div className={styles.dashboard}>
            <br />
            <div className={styles.banner}>
                <span className="material-symbols-rounded">waving_hand</span>
                <div>
                    <h2>Welcome Back,</h2>
                    <h2>{emailRef.current?.value}</h2>
                    {emailRef.current?.value === "cohencoombs@outlook.com" && (
                        <p>
                            DB usage: <kbd>{storage} Mb</kbd>{" "}
                        </p>
                    )}
                </div>
            </div>
            <p>These are your listed Profiles. Click one to manage.</p>
            <div className={styles.grid}>{profileListings}</div>
        </div>
    )
}

interface SettingsProps {
    profiles: any
    refetch: any
    setOverlay: any
    newProfile: any
    id?: string
}

const Settings: React.FC<SettingsProps> = ({ profiles, refetch, setOverlay, newProfile, id }) => {
    const storage = roundTo(JSON.stringify(profiles).length / 1000000, 2)
    const emailRef = useRef<HTMLInputElement>(null)
    const passwordRef = useRef<HTMLInputElement>(null)
    const [verifying, setVerifying] = useState<boolean>(false)
    const [profileListings, setProfileListings] = useState<any>(null)

    function login() {
        if (
            emailRef.current?.value &&
            passwordRef.current?.value &&
            Object.keys(profiles).length > 0
        ) {
            setVerifying(true)
            axios
                .post(API_ROUTE + "/api/verify-user", {
                    _id: emailRef.current.value,
                    password: passwordRef.current.value
                })
                .then((res) => {
                    if (id) {
                        setOverlay(
                            <ProfileEditor
                                refetch={refetch}
                                setOverlay={setOverlay}
                                profile={profiles[id]}
                            />
                        )
                        return
                    }
                    setProfileListings(
                        res.data.profiles.reverse().map((id: string, index: number) => {
                            if (profiles.hasOwnProperty(id)) {
                                return (
                                    <div key={index}>
                                        <ManagePreview
                                            id={id}
                                            profiles={profiles}
                                            setOverlay={setOverlay}
                                            refetch={refetch}
                                        />
                                    </div>
                                )
                            } else return null
                        })
                    )
                })
                .catch(() => {
                    setVerifying(false)
                    toast.error(`Login credentials were incorrect.`, toastSchema("auth-error"))
                })
        } else {
            toast.error(`Something went wrong. Please try again later`, toastSchema("login-error"))
        }
    }

    return (
        <div className={styles.Settings}>
            {!profileListings ? (
                <Login
                    passwordRef={passwordRef}
                    emailRef={emailRef}
                    login={login}
                    verifying={verifying}
                    newProfile={newProfile}
                />
            ) : (
                <ProfileListings
                    emailRef={emailRef}
                    profileListings={profileListings}
                    storage={storage}
                />
            )}
        </div>
    )
}

export default Settings
