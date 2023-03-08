import React, { useEffect, useRef, useState } from "react";
import styles from "./Home.module.scss"
import axios from "axios"
import { readableDateTime } from "../utils";

const Loader: React.FC = () => {
    return (
        <div className={styles.loading}>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
        </div>
    )
}

const Listing: React.FC<{ props: any }> = ({ props }) => {
    const description = useRef<HTMLParagraphElement>(null)

    function showMore() {
        if (description.current) description.current.innerText = props.description
    }

    return (
        <div className={styles.card}>
            <div style={{ padding: "14px" }}>
                <div className={styles.profile}> 
                    <div className={styles.icon}> 
                        <img style={{ width: "100%", height: "100%"}} src={props.image} alt="Attachment" /> 
                    </div>
                    <div>
                        <p className={styles.name}>{props.title}</p>
                        <p className={styles.details}>{props.company} - {props.location}</p>
                        <p className={styles.details}>Posted {readableDateTime(props.created)}</p>
                    </div>
                </div>
                <p onClick={() => showMore()} ref={description}>
                    {
                        props.description.length > 100 ? 
                        <> {props.description.slice(0, 100)} <span className={styles["read-more"]}> read more... </span> </> : props.description
                    }
                </p>
            </div>
            <img className={styles.attachment} src={props.image} alt="Attachment" />
        </div>
    )
}

const Home: React.FC<{ setPage?: any }> = ({ setPage }) => {
    const [loaded, setLoaded] = useState({}) as any

    useEffect(() => {
        axios.get("https://visioneerlist.coclub.repl.co/api/profiles").then(res => setLoaded(res.data))
    }, [])

    return (
        <div className={styles.Home}>
            <nav>
                <span className={styles.title}>VisioneerList</span>
                <div>
                    <span>Home</span>
                    <span>About</span>
                    <span>Contact</span>
                </div>
            </nav>
            <div className={styles.banner}></div>
            <div className={styles.container}> 
                <h1 className={styles.title}> 
                    Join a community of <span className={styles.second}>visionaries and innovators</span> 
                </h1>

                <div className={styles["cta-container"]} style={{ margin: "1rem 0 0 0", display: "flex", alignItems: "center"}}>
                    <button onClick={() => setPage("/dashboard")}>
                        Get Started
                    </button>
                    <svg xmlns="http://www.w3.org/2000/svg" style={{marginLeft: "1rem", width: "2rem", height: "2rem", color: "#ccc"}} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="9 18 15 12 9 6"></polyline></svg>
                    <p className={styles.headline}> 
                        Be part of the next generation of talent 
                    </p>
                </div>
                <hr />
                {
                    Object.keys(loaded).length > 0 ? Object.keys(loaded).reverse().slice(0, 4).map((item: any, index: number) => <Listing key={index} props={loaded[item]} />) 
                    : <> <Loader /> <Loader /> <Loader />  </>
                }
            </div>
            <section>
                <h1> Discover more emerging talents </h1>
                <button onClick={() => setPage("/dashboard")}>
                    <div style={{ alignItems: "center", display: "flex" }}>
                        <svg xmlns="http://www.w3.org/2000/svg" style={{marginRight: "1rem", width: "1.6rem", height: "1.6rem"}} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"></circle><polygon points="16.24 7.76 14.12 14.12 7.76 16.24 9.88 9.88 16.24 7.76"></polygon></svg> 
                        Get Started
                    </div>
                </button>
            </section>
        </div>
    )
}

export default Home