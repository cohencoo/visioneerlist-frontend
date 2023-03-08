/* eslint-disable */
import React, { useEffect, useRef, useState } from 'react';
import styles from "./Dashboard.module.scss"
import axios from "axios"
import logo from "./visioneerlist.svg"
import placeholderUser from "./user.png"
import { compress, compression, fixURL, readableDateTime, uuid } from '../utils';

let cacheProfileImage: string;

const Nav: React.FC = () => {
    return <div className={styles.nav}>
        <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"></circle><line x1="12" y1="8" x2="12" y2="16"></line><line x1="8" y1="12" x2="16" y2="12"></line></svg>
        <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="11" cy="11" r="8"></circle><line x1="21" y1="21" x2="16.65" y2="16.65"></line></svg>
        <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="3"></circle><path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z"></path></svg>
    </div>
}

const ProfileViewer: React.FC<{ profile: any }> = ({ profile }) => {
    const description = useRef<HTMLParagraphElement>(null)

    useEffect(() => {
        if (description.current) description.current.innerText = profile.description
    }, [profile.description])

    return (
        <>
            <div style={{ margin: "5rem 0 0 0" }}>
                <div style={{ position: "absolute", top: "0", left: "0", filter: "blur(3rem)", zIndex: "-1", opacity: "0.7", width: "100%", height: "20rem", background: `url(${profile.image || "assets/user.png"})` }}></div>
                <img src={profile.image || placeholderUser} alt={profile.title} />
                <h1 style={{marginBottom: "0"}}>{profile.title}</h1>

                <div style={{ maxWidth: "750px" }} className={styles["profile-stats"]}>
                    <div style={{marginRight: "1rem"}}>
                        <span style={{marginRight: "10px", fontSize: "1.2rem", verticalAlign: "middle"}} className="material-symbols-rounded">corporate_fare</span>
                        {profile.company}
                    </div>
                    <div style={{marginRight: "1rem"}}>
                        <span style={{marginRight: '10px', fontSize: '1.2rem', verticalAlign: 'middle'}} className="material-symbols-rounded">location_on</span>
                        {profile.location || "Not Specified"}
                    </div>
                    <div style={{marginRight: "1rem"}}>
                        <span style={{marginRight: '10px', fontSize: '1.2rem', verticalAlign: 'middle'}} className="material-symbols-rounded">update</span>
                        {readableDateTime(profile.created)}
                    </div>
                    <div>
                        <span style={{marginRight: '10px', fontSize: '1.2rem', verticalAlign: 'middle'}} className="material-symbols-rounded">insights</span>
                        {profile.views ? `${profile.views} views` : ""}
                    </div>  
                </div>

                <div style={{display: "flex", width: "100%", justifyContent: "center", margin: "1rem 0", alignItems: "center"}}>
                    <div style={{background: 'var(--component)', cursor: 'pointer', padding: '10px 1rem', borderRadius: '10px', display: 'flex', alignItems: 'center'}}>
                        <svg xmlns="http://www.w3.org/2000/svg" style={{width: '1.3rem', height: '1.3rem', marginRight: '1rem'}} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="feather feather-lock"><rect x="3" y="11" width="18" height="11" rx="2" ry="2"></rect><path d="M7 11V7a5 5 0 0 1 10 0v4"></path></svg>
                        Edit this Profile
                    </div>
                    <div style={{marginLeft: '1rem', background: 'var(--component)', cursor: 'pointer', padding: '10px 1rem', borderRadius: '10px', display: 'flex', alignItems: 'center'}}>
                        <svg xmlns="http://www.w3.org/2000/svg" style={{width: '1.3rem', height: '1.3rem', marginRight: '1rem'}} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="feather feather-share"><path d="M4 12v8a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-8"></path><polyline points="16 6 12 2 8 6"></polyline><line x1="12" y1="2" x2="12" y2="15"></line></svg>
                        Share
                    </div>
                    <div onClick={() => {
                        if (confirm("Are you sure you want to delete this profile?")) {
                            axios.get("https://visioneerlist.coclub.repl.co/api/delete-profile?id=" + profile.id).then(res => {
                                alert("done!")
                            })
                        }
                    }} style={{color: 'tomato', marginLeft: '1rem', background: 'var(--component)', cursor: 'pointer', padding: '10px 1rem', borderRadius: '10px', display: 'flex', alignItems: 'center'}}>
                        Delete
                    </div>
                </div>

                <div className={styles["profile-details"]} style={{margin: "2rem 0 1rem 0"}}>
                    <h2 style={{margin: "0 0 1rem 0"}}>About Us</h2>
                    <p ref={description} style={{marginTop: "0.2rem"}}></p>
                </div>
            </div>
            <div className={styles["profile-details"]}>
                <h2 style={{margin: "0 0 1rem 0"}}>Contact Us</h2>
                <ul>
                    <li>
                        <svg xmlns="http://www.w3.org/2000/svg" style={{marginRight: "0.5rem", verticalAlign: "middle", width: "1.1rem", height: "1.1rem"}} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <path d="M15 7h3a5 5 0 0 1 5 5 5 5 0 0 1-5 5h-3m-6 0H6a5 5 0 0 1-5-5 5 5 0 0 1 5-5h3"></path>
                            <line x1="8" y1="12" x2="16" y2="12"></line>
                        </svg>
                        {
                            profile.website ? <>Website: <a target="_blank" rel="noreferrer" href={fixURL(profile.website)}>{profile.website.slice(0, 30)}{profile.website.length > 30 ? "..." : ""}</a></> : "Website: Not Specified"
                        }
                    </li>
                    <li>
                        <svg xmlns="http://www.w3.org/2000/svg" style={{marginRight: "0.5rem", verticalAlign: "middle", width: "1.1rem", height: "1.1rem"}} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <path d="M15.05 5A5 5 0 0 1 19 8.95M15.05 1A9 9 0 0 1 23 8.94m-1 7.98v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path>
                        </svg>
                        {
                            profile.phone ? <>Phone: <a target="_blank" rel="noreferrer" href={`tel:${profile.phone}`}> {profile.phone}</a></> : "Phone: Not Specified"
                        }
                    </li>
                    <li>
                        <svg xmlns="http://www.w3.org/2000/svg" style={{marginRight: "0.5rem", verticalAlign: "middle", width: "1.1rem", height: "1.1rem"}} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="4"></circle><path d="M16 8v5a3 3 0 0 0 6 0v-1a10 10 0 1 0-3.92 7.94"></path></svg>
                        Email: <a target="_blank" rel="noreferrer" href={`mailto:${profile.email}`}> {profile.email}</a>
                    </li>
                </ul>
            </div>
        </>
    )
}


const Profile: React.FC<{ props: any, profiles: any, setOpenPage: any, setPageContent: any }> = ({ props, profiles, setOpenPage, setPageContent }) => {
    return (
        <div onClick={() => {
            axios.get("https://visioneerlist.coclub.repl.co/api/get-profile?id=" + props.id)
            setPageContent(<ProfileViewer profile={profiles[props.id]} />)
            setOpenPage(true)
        }} className={styles.profile}>
            <div style={{ background: `url(${props.image || placeholderUser})` }} className={styles["profile-icon"]}>
                {props.hiring ? <div className={styles.hiring}>Actively Hiring - Apply here</div> : null }
            </div>
            <p className={styles.name}> {props.title} </p>
            <div className={styles.details}>
                <div>
                    <span style={{marginRight: "10px", fontSize: "1.2rem", verticalAlign: "middle"}} className="material-symbols-rounded">corporate_fare</span>
                    {props.company} 
                </div>
                <div>
                    <span style={{marginRight: '10px', fontSize: '1.2rem', verticalAlign: 'middle'}} className="material-symbols-rounded">update</span>
                    {readableDateTime(props.created)} 
                </div>
                <div>
                    <span style={{marginRight: '10px', fontSize: '1.2rem', verticalAlign: 'middle'}} className="material-symbols-rounded">insights</span>
                    {props.views ? `${props.views} views` : ""} 
                </div>
            </div>
            <p className={styles.description}>
                {props.description.length > 60 ? props.description.substring(0, 60) + "..." : props.description}
            </p>
        </div>
    )
}

const Dashboard: React.FC<{ setPage?: any }> = ({ setPage }) => {
    const [profiles, setProfiles] = useState({}) as any
    const [filterBy, setFilterBy] = useState("latest")
    const [search, setSearch] = useState("")
    const searchRef = useRef<HTMLInputElement>(null)
    const [openPage, setOpenPage] = useState(false)
    const [pageContent, setPageContent] = useState(<></>)
    const [header, setHeader] = useState(
    <span className={styles.container}>
        <div>
            <span className={styles.title}>
                VisioneerList
            </span>
            <span className={styles.headline}>
                Your network to connect with emerging businesses
            </span>
        </div>
    </span>)

    function refetch() {
        axios.get("https://visioneerlist.coclub.repl.co/api/profiles").then((res: any) => setProfiles(res.data))
    }

    useEffect(() => refetch(), [])

    useEffect(() => {
        if (openPage) {
            document.body.style.overflowY = "hidden"
            if (window.innerWidth < 1168) setHeader(
                <div style={{display: "flex", alignItems: "center"}}>
                    <svg onClick={() => setOpenPage(false)} style={{ marginRight: "2rem", width: "2.5rem", height: "2.5rem", cursor: "pointer", color: "var(--link)" }} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="15 18 9 12 15 6"></polyline></svg> 
                    <span style={{color: "#eee", fontSize: "1.25rem", fontWeight: "500"}}>
                        Back
                    </span>
                </div>
            )
        }
        else {
            document.body.style.overflowY = "auto"
            setHeader(<span className={styles.container}>
                <div>
                    <span className={styles.title}>
                        VisioneerList
                    </span>
                    <span className={styles.headline}>
                        Your network to connect with emerging businesses
                    </span>
                </div>
            </span>)
        }
    }, [openPage])

    let filteredProfileKeys;
    const profileKeys = Object.keys(profiles);
    if (search) filteredProfileKeys = profileKeys.filter(key => profiles[key].title.toLowerCase().includes(search.toLowerCase()));
    else if (filterBy === "trending") filteredProfileKeys = profileKeys.sort((a, b) => profiles[a].views - profiles[b].views);
    else filteredProfileKeys = profileKeys

    function uploadInput(input: any, target: any, next: any) {
        const allowedExtensions = ['png', 'jpg', 'jpeg', 'svg', 'ico', 'webp', 'heic'];
        try {
            let files = document.querySelectorAll(target)[0].files;
            for (let i = 0; i < files.length; i++) {
                let file = { 
                    file: files[i], 
                    name: files[i].name, 
                    type: files[i].name.match(/\.([^.]+)$/)[1].toLowerCase(),
                    size: files[i].size
                };
                if (allowedExtensions.includes(file.type)) {
                    let reader = new FileReader();
                    reader.onload = function(e) {
                        compress(e?.target?.result, compression(file.size, 1), compression(file.size, 1), "image/jpeg", function(image: any) {
                            document.querySelectorAll(next)[0].innerHTML = `<img alt="${file.name}" style="width: 100%; height: 100%; border-radius: 1rem" src=${image}>`
                            cacheProfileImage = image
                            document.querySelectorAll(target)[0].value = null
                        });
                    };
                    reader.readAsDataURL(file.file);
                } else console.log('File extension is unknown')
            }
        } catch (err) {
            console.log("Upload process raised an error: " + err);
        }
    }

    const titleInput = useRef<HTMLInputElement>(null)
    const companyInput = useRef<HTMLInputElement>(null)
    const locationInput = useRef<HTMLInputElement>(null)
    const websiteInput = useRef<HTMLInputElement>(null)
    const phoneInput = useRef<HTMLInputElement>(null)
    const emailInput = useRef<HTMLInputElement>(null)
    const descriptionInput = useRef<HTMLTextAreaElement>(null)
    const hiringInput = useRef<HTMLInputElement>(null)

    const submitButton = useRef<HTMLButtonElement>(null)


    function createProfile() {
        const profile = {
            title: titleInput.current?.value.trim(),
            company: companyInput.current?.value.trim(),
            location: locationInput.current?.value.trim(),
            website: websiteInput.current?.value.trim(),
            phone: phoneInput.current?.value.trim(),
            email: emailInput.current?.value.trim(),
            description: descriptionInput.current?.value.trim(),
            hiring: hiringInput.current?.checked,
            created: new Date().getTime(),
            id: uuid(),
            image: cacheProfileImage
        }
    
        if (
            !profile.title || 
            !profile.company || 
            !profile.email || 
            !profile.description
        ) {
            const emptyFields = [];
            if (!profile.title) emptyFields.push("<b>title</b>");
            if (!profile.company) emptyFields.push("<b>company</b>");
            if (!profile.email) emptyFields.push("<b>email</b>");
            if (!profile.description) emptyFields.push("<b>description</b>");
            
            
            if (submitButton.current) {
                submitButton.current.style.background = "#99500040"
                submitButton.current.innerHTML = `
                    <div style="text-align: left; color: #fff">
                        Please provide content for the ${emptyFields.join(", ")} ${emptyFields.length > 1 ? "fields" : "field"}
                    </div>
                `
                setTimeout(() => {
                    if (submitButton.current) {
                        submitButton.current.style.background = "var(--link)"
                        submitButton.current.innerHTML = `Add Profile`
                    }
                }, 5000);
            }

        } else {
            if (submitButton.current) {
                submitButton.current.style.background = "#99601010"
                submitButton.current.innerHTML = `
                <div style="display: flex; align-items: center; color: #ffcc00">
                    <div style="margin: 0 10px 0 0; border: 3px solid var(--shade-1); border-top: 3px solid #ffcc00; width: 1.5rem; height: 1.5rem" class="loader"></div>
                    Verifying your listing...
                </div>`
            }
    
            axios.post("https://visioneerlist.coclub.repl.co/api/new-profile", profile).then(res => {
                setOpenPage(false)
                refetch()
            })
        }
    }
    
    return (
        <div className={styles.Dashboard}>
            <div className={styles.header}>
                {header}
            </div>
            <div className={styles.sidebar}>
                <img className={styles.logo} src={logo} alt="logo" onClick={() => setPage("/")} />
                <hr />
                <div onClick={() => setOpenPage(false)} style={{
                        display: openPage ? "block" : "none",
                        width: openPage ? "calc(100% - 20px)" : undefined,
                        padding: openPage ? "10px" : undefined,
                        position: openPage ? "absolute" : undefined,
                    }} className={styles.item}>
                    <svg style={{width: "100%", height: "100%", cursor: "pointer", color: "var(--link)"}} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="15 18 9 12 15 6"></polyline></svg> 
                </div>
                <div style={{ transition: "0.3s", transform: openPage ? "translateY(4.5rem)" : "translateY(0)" }}>
                    <div onClick={() => {
                        setPageContent(<div style={{marginTop: "5rem", maxWidth: "800px", position: "relative", left: "50%", transform: "translateX(-50%)"}}>
                                <h1>Create a Profile listing</h1>

                                <br />
                                <input id="upload-input" onChange={(event) => uploadInput(event, '#upload-input', '#display')} accept="image/*" multiple hidden type="file" />

                                <div style={{position: 'relative', left: '50%', transform: 'translateX(-50%)', display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
                                    <div className={styles["upload-hover"]} style={{transition: 'var(--transition)', cursor: 'pointer'}}  onClick={() => document.getElementById('upload-input')?.click()}>
                                        <div style={{width: "12rem", height: "12rem"}} id="display">
                                            <img style={{width: '100%', height: '100%', borderRadius: '1rem'}} src={placeholderUser} alt="Profile Image" />
                                        </div>
                        
                                        <div className={styles["upload-btn"]}>
                                            <svg xmlns="http://www.w3.org/2000/svg" style={{width: "100%", height: "100%"}} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path><polyline points="17 8 12 3 7 8"></polyline><line x1="12" y1="3" x2="12" y2="15"></line></svg>
                                        </div>
                                    </div>
                                </div>

                                <div className={styles.createProfileFlex}>
                                    <span className="material-symbols-rounded">drive_file_rename_outline</span>
                                    <input ref={titleInput} className={styles["create-profile"]} placeholder="Profile Title" name="name" type="name" />
                                </div>
                                <br />
                                <div className={styles.createProfileFlex}>
                                    <span className="material-symbols-rounded">corporate_fare</span>
                                    <input ref={companyInput} className={styles["create-profile"]} placeholder="Company or business name" name="name" type="name" />
                                </div>
                                <br />
                                <div className={styles.createProfileFlex}>
                                    <span className="material-symbols-rounded">location_on</span>
                                    <input ref={locationInput} className={styles["create-profile"]} placeholder="Location" name="city" type="city" />
                                </div>
                                <br />

                                <p style={{color: '#999', fontSize: '1rem', display: 'flex', justifyContent: 'space-between', textAlign: 'left'}}> Allow users to contact you about this Profile. </p>

                                <div className={styles.createProfileFlex}>
                                    <span className="material-symbols-rounded">link</span>
                                    <input ref={websiteInput} className={styles["create-profile"]} placeholder="Website" name="website" type="website" />
                                </div>
                                <br />
                                <div className={styles.createProfileFlex}>
                                    <span className="material-symbols-rounded">call</span>
                                    <input ref={phoneInput} className={styles["create-profile"]} placeholder="Phone" name="phone" type="phone" />
                                </div>
                                <br />
                                <div className={styles.createProfileFlex}>
                                    <span className="material-symbols-rounded">mail</span>
                                    <input ref={emailInput} className={styles["create-profile"]} placeholder="Email" name="email" type="email" />
                                </div>
                                <br /><br />
                                
                                <p style={{color: '#999', fontSize: '1rem', display: 'flex', justifyContent: 'space-between', textAlign: 'left'}}> Enter a description for this Profile. </p>
                                <textarea ref={descriptionInput} className={styles["create-profile-textarea"]} placeholder="Profile Description"></textarea>
                                
                                <br /><br />

                                <p style={{color: '#999', fontSize: '1rem', display: 'flex', justifyContent: 'space-between', textAlign: 'left'}}> 
                                    Are you currently hiring? 
                                </p>
                                <p style={{marginLeft: '2rem', color: '#999', fontSize: '1rem', textAlign: 'left'}}> 
                                    <input type="checkbox" ref={hiringInput} />
                                    <label> Yes, I am currently hiring. </label>
                                </p>
                                <p style={{marginLeft: '2rem', color: '#999', fontSize: '1rem', textAlign: 'left'}}> 
                                    <input type="checkbox" />
                                    <label> No, I am not hiring. </label>
                                </p>

                                <button ref={submitButton} className={styles["add-profile"]} style={{transition: 'var(--transition)', cursor: 'pointer'}} onClick={() => createProfile()}>
                                    Add Profile
                                </button>

                                <p style={{ margin: "2rem 0", color: "#999", display: "flex", justifyContent: "space-between" }}> By creating a Profile, you warrant that the information provided is truthful and up to date.</p>
                            </div>)
                        setOpenPage(true)
                    }} className={styles.item}>
                        <svg style={{width: "100%", height: "100%"}} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"></circle><line x1="12" y1="8" x2="12" y2="16"></line><line x1="8" y1="12" x2="16" y2="12"></line></svg>
                    </div>
                    <div onClick={() => {
                        const roundTo = (num: number, places: number) => +(Math.round(Number(String(num) + "e+" + places)) + "e-" + places);
                        setPageContent(<>
                            <div style={{marginTop: "5rem", maxWidth: "800px", position: "relative", left: "50%", transform: "translateX(-50%)"}}>
                                <svg xmlns="http://www.w3.org/2000/svg" style={{borderRadius: "100rem", padding: "1rem", border: "3px solid #333", width: "6rem", height: "6rem"}} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path><circle cx="12" cy="7" r="4"></circle></svg>
                                <h1>Settings</h1>
                                <p style={{color: "var(--subtitle)"}}>Account not yet available.</p>
                                <br />
                                <p>
                                    Database Storage: {roundTo(JSON.stringify(profiles).length / 1000000, 2)} out of 512 Mb ({roundTo(roundTo(JSON.stringify(profiles).length / 1000000, 2) / 512 * 100, 2)}%)
                                </p>
                            </div>
                        </>)
                        setOpenPage(true)
                    }} className={styles.item}>
                        <svg style={{width: "100%", height: "100%"}} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="3"></circle><path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z"></path></svg>
                    </div>
                </div>
            </div>
                
            <Nav />

            <div style={{ opacity: openPage ? 1 : 0, transform: openPage ? "translateX(0)" : "translateX(100%)" }} className={styles["page-container"]}>
                {pageContent}
            </div>

            <div className={styles.searchContainer}>
                <div className={styles.search}>
                    <div onClick={() => { filterBy === "latest" ? setFilterBy("trending") : setFilterBy("latest") }} className={styles.filter}>
                        <svg xmlns="http://www.w3.org/2000/svg" style={{width: "1.2rem", height: "1.2rem", marginRight: "1rem" }} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="4" y1="21" x2="4" y2="14"></line><line x1="4" y1="10" x2="4" y2="3"></line><line x1="12" y1="21" x2="12" y2="12"></line><line x1="12" y1="8" x2="12" y2="3"></line><line x1="20" y1="21" x2="20" y2="16"></line><line x1="20" y1="12" x2="20" y2="3"></line><line x1="1" y1="14" x2="7" y2="14"></line><line x1="9" y1="8" x2="15" y2="8"></line><line x1="17" y1="16" x2="23" y2="16"></line></svg>
                        <span>Sorting by {filterBy}</span>
                    </div>
                    <svg xmlns="http://www.w3.org/2000/svg" style={{verticalAlign: "middle", height: "1.4rem", width: "1.4rem"}} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="11" cy="11" r="8"></circle><line x1="21" y1="21" x2="16.65" y2="16.65"></line></svg>
                    <input ref={searchRef} onInput={() => (searchRef.current && setSearch(searchRef.current.value))} type="search" style={{marginLeft: "0.5rem" }} placeholder="Search keywords" />
                </div>
            </div>
            
            <p style={{ textTransform: "uppercase", marginBottom: "-5px" }}> {filterBy} Profiles</p>

            <hr />

            <div className={styles.dashboardContent}>
                {
                    Object.keys(profiles).length > 0 ? filteredProfileKeys.reverse().map((item: any, index: number) => <Profile key={index} props={profiles[item]} profiles={profiles} setOpenPage={setOpenPage} setPageContent={setPageContent} />) : <div className={styles.loader}></div>
                }
            </div>
        </div>
    );
}

export default Dashboard;
