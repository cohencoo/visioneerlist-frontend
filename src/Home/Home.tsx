import React, { useEffect, useRef, useState } from "react"
import styles from "./Home.module.scss"
import { scrollToTop } from "../assets/utils"
import Listing from "./components/Listing/Listing"
import Nav from "./components/Nav/Nav"
import Loading from "./components/Loading/Loading"
import GlobeMap from "./components/GlobeMap/GlobeMap"
import Aos from "aos"
import Footer from "./components/Footer/Footer"
import axios from "axios"
import { API_ROUTE } from "../App"

interface HomeProps {
    profiles: any
    setProfiles: any
    setApp: any
}

const Home: React.FC<HomeProps> = ({ profiles, setProfiles, setApp }) => {
    const infoRef = useRef<HTMLDivElement>(null)
    const [loadingFailed, setLoadingFailed] = useState(false)

    if (window.innerWidth > 768) {
        import("aos/dist/aos.css")
        Aos.init()
    }

    function refetch(callback?: any) {
        axios
            .get(API_ROUTE + "/api/profiles")
            .then((res: any) => {
                setProfiles(res.data)
                callback && callback(res)
            })
            .catch(() => setLoadingFailed(true))
    }

    useEffect(() => {
        if (Object.keys(profiles).length === 0) refetch()
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    return (
        <div className={styles.Home}>
            <Nav />
            <div className={styles.container}>
                <div className={styles.globeContainer}>
                    <div>
                        <div className={styles.productHunt}>
                            <a
                                href="https://www.producthunt.com/posts/visioneerlist?utm_source=badge-top-post-topic-badge&utm_medium=badge&utm_souce=badge-visioneerlist"
                                target="_blank"
                                rel="noreferrer">
                                <img
                                    src="https://api.producthunt.com/widgets/embed-image/v1/top-post-topic-badge.svg?post_id=388253&theme=neutral&period=weekly&topic_id=164"
                                    alt="VisioneerList - Empowering&#0032;emerging&#0032;innovative&#0032;startups | Product Hunt"
                                />
                            </a>
                        </div>
                        <h1 className={styles.title}>
                            Join a community of
                            <span className={styles.second}> visionaries and innovators</span>
                        </h1>
                        <p className={styles.headline}>
                            Seconds to create a Listing; access to future employees, customers &
                            users{" "}
                            <span
                                className={styles.learnMore}
                                onClick={() =>
                                    infoRef.current?.scrollIntoView({ behavior: "smooth" })
                                }>
                                learn more.
                            </span>
                        </p>

                        <div className={styles.buttons}>
                            <button
                                onClick={() => {
                                    setApp("/dashboard")
                                    scrollToTop()
                                }}>
                                <span className="material-symbols-rounded">travel_explore</span>
                                Explore
                            </button>

                            <div className={styles.separator}></div>

                            <button
                                onClick={() => {
                                    setApp("/new-profile")
                                    scrollToTop()
                                }}>
                                <span className="material-symbols-rounded">add_business</span>
                                List a Profile
                            </button>
                        </div>
                    </div>
                    <GlobeMap />
                </div>
                <div ref={infoRef}></div>
                <div className={styles.info}>
                    <div data-aos="fade-up" data-aos-delay="0" className={styles.card}>
                        <span className="material-symbols-rounded">info</span>
                        <p>
                            VisioneerList is a freemium platform that enables emerging innovative
                            startups and entrepreneurs to connect & expand their visibility.
                        </p>
                    </div>
                    <div data-aos="fade-up" data-aos-delay="150" className={styles.card}>
                        <span className="material-symbols-rounded">partner_exchange</span>
                        <p>
                            Simultaneously, by providing a platform that networks local Australians,
                            we hope to increase employment opportunities for a wider age range,
                            harnessing today's cutting-edge technology.
                        </p>
                    </div>
                    <div data-aos="fade-up" data-aos-delay="200" className={styles.card}>
                        <p>
                            <span>Statistically, 42%</span>
                            of startup businesses fail, commonly due to costs involved in marketing
                            and advertising.
                            <i> (Business Startup Statistics Australia | Fundsquire 2022). </i>
                            Due to the high costs involved, many emerging businesses are deterred
                            from mainstream advertising, which can stifle their firepower.
                        </p>
                    </div>
                    <div data-aos="fade-up" data-aos-delay="250" className={styles.card}>
                        <p>
                            <span>By virtue of this,</span>
                            <b>VisioneerList</b> intends to alleviate the well-known hardship of
                            marketing costs by offering a unique, versatile online platform,
                            combined with today's cutting-edge technology. VisioneerList allows you
                            to create a Professional Listing in seconds, and gain recognition from
                            seeking customers, users, & employees.
                        </p>
                    </div>
                </div>

                <div className={styles.posts}>
                    <p className={styles.label}>
                        <span className="material-symbols-rounded">browse_gallery</span>
                        See what's recent
                    </p>
                    {Object.keys(profiles).length > 0 ? (
                        Object.keys(profiles)
                            .reverse()
                            .slice(0, 4)
                            .map((item: any, index: number) => (
                                <Listing key={index} props={profiles[item]} />
                            ))
                    ) : (
                        <Loading loadingFailed={loadingFailed} />
                    )}
                </div>
            </div>
            {!loadingFailed && (
                <section>
                    <h1>Discover more emerging talent</h1>
                    <button
                        onClick={() => {
                            setApp("/dashboard")
                            scrollToTop()
                        }}>
                        <span className="material-symbols-rounded">travel_explore</span>
                        Get Started
                    </button>
                </section>
            )}
            <Footer infoRef={infoRef} setApp={setApp} scrollToTop={scrollToTop} />
        </div>
    )
}

export default Home
