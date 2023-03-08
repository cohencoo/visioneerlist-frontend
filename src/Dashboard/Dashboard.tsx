/* eslint-disable */
import React, { useEffect, useRef, useState } from 'react';
import styles from "./Dashboard.module.scss"
import axios from "axios"
import logo from "./visioneerlist.svg"
import { fixURL, readableDateTime } from '../utils';

const ProfileViewer: React.FC<{ profile: any }> = ({ profile }) => {
    const description = useRef<HTMLParagraphElement>(null)

    useEffect(() => {
        if (description.current) description.current.innerText = profile.description
    }, [description])

    return (
        <>
            <div style={{ margin: "5rem 0 0 0" }}>
                <div style={{ position: "absolute", top: "0", left: "0", filter: "blur(3rem)", zIndex: "-1", opacity: "0.7", width: "100%", height: "20rem", background: `url(${profile.image || "assets/user.png"})` }}></div>
                <img src={profile.image} alt={profile.title} />
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
                    <div style={{color: 'tomato', marginLeft: '1rem', background: 'var(--component)', cursor: 'pointer', padding: '10px 1rem', borderRadius: '10px', display: 'flex', alignItems: 'center'}}>
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
            setPageContent(<ProfileViewer profile={profiles[props.id]} />)
            setOpenPage(true)

        }} className={styles.profile}>
            <div style={{ background: `url(${props.image || "assets/user.png"})` }} className={styles["profile-icon"]}>
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

    useEffect(() => {
        axios.get("https://visioneerlist.coclub.repl.co/api/profiles").then((res: any) => setProfiles(res.data))
    }, [])

    useEffect(() => {
        if (openPage) document.body.style.overflowY = "hidden"
        else document.body.style.overflowY = "auto"
    }, [openPage])

    let filteredProfileKeys;
    const profileKeys = Object.keys(profiles);
    if (search) filteredProfileKeys = profileKeys.filter(key => profiles[key].title.toLowerCase().includes(search.toLowerCase()));
    else if (filterBy === "trending") filteredProfileKeys = profileKeys.sort((a, b) => profiles[a].views - profiles[b].views);
    else filteredProfileKeys = profileKeys

    return (
        <div className={styles.Dashboard}>
            <div className={styles.header}>
                <span className={styles.container}>
                    <div>
                        <span className={styles.title}>
                            VisioneerList
                        </span>
                        <span className={styles.headline}>
                            Your network to connect with emerging businesses
                        </span>
                    </div>
                </span>
            </div>
            <div className={styles.sidebar}>
                <img className={styles.logo} src={logo} alt="logo" onClick={() => setPage("/")} />
                <hr />
                <div onClick={() => setOpenPage(false)} style={{display: openPage ? "block" : "none"}} className={styles.item}>
                    <svg style={{width: "100%", height: "100%", cursor: "pointer", color: "var(--link)"}} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="15 18 9 12 15 6"></polyline></svg> 
                </div>
                <div style={{ transition: "0.3s", transform: openPage ? "translateY(1rem)" : "translateY(0)" }}>
                    <div className={styles.item}>
                        <svg style={{width: "100%", height: "100%"}} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"></circle><line x1="12" y1="8" x2="12" y2="16"></line><line x1="8" y1="12" x2="16" y2="12"></line></svg>
                    </div>
                    <div className={styles.item}>
                        <svg style={{width: "100%", height: "100%"}} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="3"></circle><path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z"></path></svg>
                    </div>
                </div>
            </div>
            <div className={styles.nav}>
                <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"></circle><line x1="12" y1="8" x2="12" y2="16"></line><line x1="8" y1="12" x2="16" y2="12"></line></svg>
                <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="11" cy="11" r="8"></circle><line x1="21" y1="21" x2="16.65" y2="16.65"></line></svg>
                <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="3"></circle><path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z"></path></svg>
            </div>

            <div style={{ opacity: openPage ? 1 : 0, transform: openPage ? "translateX(0)" : "translateX(100%)" }} className={styles["page-container"]}>
                {pageContent}
            </div>

            <div className={styles.searchContainer}>
                <div className={styles.search}>
                    <div onClick={() => {
                        if (filterBy === "latest") setFilterBy("trending")
                        else setFilterBy("latest")

                    }} className={styles.filter}>
                        <svg xmlns="http://www.w3.org/2000/svg" style={{width: "1.2rem", height: "1.2rem", marginRight: "1rem" }} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="4" y1="21" x2="4" y2="14"></line><line x1="4" y1="10" x2="4" y2="3"></line><line x1="12" y1="21" x2="12" y2="12"></line><line x1="12" y1="8" x2="12" y2="3"></line><line x1="20" y1="21" x2="20" y2="16"></line><line x1="20" y1="12" x2="20" y2="3"></line><line x1="1" y1="14" x2="7" y2="14"></line><line x1="9" y1="8" x2="15" y2="8"></line><line x1="17" y1="16" x2="23" y2="16"></line></svg>
                        <span>Sorting by {filterBy}</span>
                    </div>
                    <svg xmlns="http://www.w3.org/2000/svg" style={{verticalAlign: "middle", height: "1.4rem", width: "1.4rem"}} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="11" cy="11" r="8"></circle><line x1="21" y1="21" x2="16.65" y2="16.65"></line></svg>
                    <input ref={searchRef} onInput={() => {
                        if (searchRef.current) setSearch(searchRef.current.value)
                    }} type="search" style={{marginLeft: "0.5rem" }} placeholder="Search keywords" />
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
