import React, { useEffect, useState } from "react";
import styles from "./Home.module.scss"
import axios from "axios"

const Home: React.FC = () => {
    const [loaded, setLoaded] = useState([
        <div className={styles.loading}>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
        </div>
    ])

    function readableDateTime(time: any) {
        const now = new Date();
        const diff = Number(now) - time;
        const diffInMinutes = Math.floor(diff / 1000 / 60);
        const diffInHours = Math.floor(diffInMinutes / 60);
        const diffInDays = Math.floor(diffInHours / 24);
        const diffInWeeks = Math.floor(diffInDays / 7);
        const diffInMonths = Math.floor(diffInDays / 30);
        const diffInYears = Math.floor(diffInDays / 365);
        if (diffInMinutes < 1) return "Just now";
        if (diffInMinutes === 1) return "1 minute ago";
        if (diffInHours < 1) return `${diffInMinutes} minutes ago`;
        if (diffInHours === 1) return "1 hour ago";
        if (diffInDays < 1) return `${diffInHours} hours ago`;
        if (diffInDays === 1) return "1 day ago";
        if (diffInWeeks < 1) return `${diffInDays} days ago`;
        if (diffInWeeks === 1) return "1 week ago";
        if (diffInMonths < 1) return `${diffInWeeks} weeks ago`;
        if (diffInMonths === 1) return "1 month ago";
        if (diffInYears < 1) return `${diffInMonths} months ago`;
        if (diffInYears === 1) return "1 year ago";
        return `${diffInYears} years ago`;
    }

    useEffect(() => {
        axios.get("https://visioneerlist.coclub.repl.co/api/profiles").then(res => {
            setLoaded([])
            Object.keys(res.data).reverse().slice(0, 4).forEach((key, index) => {
                const card = <>
                    <div style={{ padding: "14px" }}>
                        <div className={styles.profile}> 
                            <div className={styles.icon}> {/*  */} </div>
                            <div>
                                <p className={styles.name}>{res.data[key].title}</p>
                                <p className={styles.details}>{res.data[key].company} - {res.data[key].location}</p>
                                <p className={styles.details}>Posted {readableDateTime(res.data[key].created)}</p>
                            </div>
                        </div>
                        <p id={"desc-" + String(index)}></p>
                    </div>
                    <img className={styles.attachment} src={res.data[key].image} alt="ok" />
                </>
                if (document.getElementById("desc-" + index)) {
                    document.getElementById("desc-" + index)!.outerText = res.data[key].description
                }
                setLoaded(pre => [...pre, card] );
            })
        })
    }, [])

    return <>
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
                <a href="/dashboard">
                    <button>Get Started</button>
                </a>
                <svg xmlns="http://www.w3.org/2000/svg" style={{marginLeft: "1rem", width: "2rem", height: "2rem", color: "#ccc"}} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="9 18 15 12 9 6"></polyline></svg>
                <p className={styles.headline}> 
                    Be part of the next generation of talent 
                </p>
            </div>
            <hr />
            {loaded.map((card, index) => {
                return loaded.length === 1 ? <div key={index}>{card}</div> : <div className={styles.card} key={index}>{card}</div>
            })}
        </div>
        <section>
            <h1> Discover more emerging <br /> talents </h1>
            <a href="/dashboard">
                <button>
                    <div style={{ alignItems: "center", display: "flex" }}>
                        <svg xmlns="http://www.w3.org/2000/svg" style={{marginRight: "1rem", width: "1.6rem", height: "1.6rem"}} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"></circle><polygon points="16.24 7.76 14.12 14.12 7.76 16.24 9.88 9.88 16.24 7.76"></polygon></svg> 
                        Get Started
                    </div>
                </button>
            </a>
        </section>
    </>
}

export default Home
