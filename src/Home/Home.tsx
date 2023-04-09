import React, { useRef } from "react"
import styles from "./Home.module.scss"
import { scrollToTop } from "../assets/utils"
import Listing from "./components/Listing/Listing"
import Nav from "./components/Nav/Nav"
import Loading from "./components/Loading/Loading"
import GlobeMap from "./components/GlobeMap/GlobeMap"
import Aos from "aos"
import Footer from "./components/Footer/Footer"

const Home: React.FC<{ profiles: any; setApp: any }> = ({ profiles, setApp }) => {
    const infoRef = useRef<HTMLDivElement>(null)
    if (window.innerWidth > 768) {
        import("aos/dist/aos.css")
        Aos.init()
    }

    return (
        <div className={styles.Home}>
            <Nav />
            <div className={styles.banner}></div>
            <div className={styles.container}>
                <div className={styles.globeContainer}>
                    <div>
                        <h1 className={styles.title}>
                            Join a community of
                            <span className={styles.second}> visionaries and innovators</span>
                        </h1>
                        <p className={styles.headline}>
                            Seconds to create a Listing; access to future employees, customers &
                            users.
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
                <div ref={infoRef} className={styles.learnMore}>
                    <div onClick={() => infoRef.current?.scrollIntoView({ behavior: "smooth" })}>
                        Learn More
                        <span className="material-symbols-rounded">keyboard_double_arrow_down</span>
                    </div>
                </div>
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
                            <i> (Business Startup Statistics Australia | Fundsquire). </i>
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
                        <>
                            <Loading /> <Loading /> <Loading /> <Loading />
                        </>
                    )}
                </div>
            </div>
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
            <Footer infoRef={infoRef} setApp={setApp} scrollToTop={scrollToTop} />
        </div>
    )
}

export default Home
