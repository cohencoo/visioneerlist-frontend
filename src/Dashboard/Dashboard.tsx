import React, { useEffect, useState } from "react"
import axios from "axios"
import styles from "./Dashboard.module.scss"
import { API_ROUTE } from "../App"
import toast, { Toaster } from "react-hot-toast"
import MobileNav from "./components/MobileNav/MobileNav"
import Sidebar from "./components/Sidebar/Sidebar"
import Header from "./components/Header/Header"
import ProfileViewer from "./components/ProfileViewer/ProfileViewer"
import Profile from "./components/Profile/Profile"
import Loading from "./components/Loading/Loading"
import Settings from "./components/Settings/Settings"
import ProfileCreator from "./components/ProfileCreator/ProfileCreator"
import NewSearch from "./components/NewSearch/NewSearch"
import { toastSchema, toastStyles } from "../assets/utils"

interface DashboardProps {
    profiles: any
    setProfiles: any
    newListing?: boolean
    viewProfile?: string | null
}

const Dashboard: React.FC<DashboardProps> = ({
    profiles,
    setProfiles,
    newListing,
    viewProfile
}) => {
    const [filterBy, setFilterBy] = useState("latest")
    const [search, setSearch] = useState("")
    const [searchLocation, setSearchLocation] = useState("")
    const [autoLaunch, setAutoLaunch] = useState(false)
    const [overlay, setOverlay] = useState<any>(null)
    const [layoutScale, setLayoutScale] = useState(0)

    function refetch(callback?: any) {
        axios
            .get(API_ROUTE + "/api/profiles")
            .then((res: any) => {
                setProfiles(res.data)
                callback && callback(res)
            })
            .catch(() => {
                toast.loading(
                    "We're experiencing some network issues at the moment. Please don't fret, we'll be back online soon.",
                    {
                        position: "top-center",
                        style: toastStyles,
                        id: "network-error",
                        icon: (
                            <span
                                style={{
                                    color: "rgb(255, 150, 50)",
                                    fontSize: "2rem",
                                    margin: "0 10px"
                                }}
                                className="material-symbols-rounded">
                                sms_failed
                            </span>
                        )
                    }
                )
            })
    }
    function settings() {
        setOverlay(
            <Settings
                newProfile={newProfile}
                refetch={refetch}
                setOverlay={setOverlay}
                profiles={profiles}
            />
        )
    }
    function newProfile() {
        setOverlay(<ProfileCreator refetch={refetch} setOverlay={setOverlay} />)
    }

    useEffect(() => {
        if (overlay) document.body.style.overflowY = "hidden"
        else document.body.style.overflowY = "auto"
    }, [overlay])

    useEffect(() => {
        if (Object.keys(profiles).length === 0) refetch()
        if (window.location.protocol !== "https:" && window.location.host !== "localhost:3000") {
            toast.error(
                "(CORS) Development server must be localhost:3000",
                toastSchema("cors-error")
            )
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    useEffect(() => {
        function handleKeyDown(event: KeyboardEvent) {
            if (event.key === "Escape") {
                setOverlay(null)
            }
        }
        window.addEventListener("keydown", handleKeyDown)
        return () => window.removeEventListener("keydown", handleKeyDown)
    }, [])

    useEffect(() => {
        if (!autoLaunch) {
            if (newListing) {
                newProfile()
                setAutoLaunch(true)
            }
            if (viewProfile && profiles[viewProfile]) {
                axios.get(API_ROUTE + "/api/get-profile/" + viewProfile)
                setOverlay(
                    <ProfileViewer
                        settings={settings}
                        refetch={refetch}
                        setOverlay={setOverlay}
                        profile={profiles[viewProfile]}
                    />
                )
                window.history.replaceState({}, document.title, "/")
                setAutoLaunch(true)
            }
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [viewProfile, profiles, newListing])

    const filteredProfileKeys = Object.keys(profiles)
        .filter((key) => {
            const profile = profiles[key]
            const searchTerms = search.toLowerCase().split(" ")
            const titleMatches = searchTerms.every((term) =>
                profile.title.toLowerCase().includes(term)
            )
            const companyMatches = searchTerms.some((term) =>
                profile.company.toLowerCase().includes(term)
            )

            // This is a generalized search
            const descriptionMatches = searchTerms.some((term) =>
                profile.description.toLowerCase().includes(term)
            )

            const locationMatches =
                !searchLocation ||
                profile.location.toLowerCase().includes(searchLocation.toLowerCase())
            const keywordMatches =
                profile.keywords &&
                profile.keywords
                    .split(",")
                    .map((keyword: string) => keyword.trim().toLowerCase())
                    .some((keyword: string) => searchTerms.includes(keyword))

            return (
                (titleMatches || companyMatches || descriptionMatches || keywordMatches) &&
                locationMatches
            )
        })
        .sort((a, b) => {
            if (filterBy === "latest") return profiles[b].date - profiles[a].date
            if (filterBy === "trending") return profiles[a].views - profiles[b].views
            return 0
        })
        .filter((key) => (filterBy === "actively-hiring" ? profiles[key].hiring : true))

    function searchLabel() {
        if (Object.keys(profiles).length === 0) return ""
        if (filteredProfileKeys.length === 0) return "No results found"
        if (search && searchLocation)
            return `Showing ${filteredProfileKeys.length} results for "${search}" in "${searchLocation}"`
        if (search) return `Showing ${filteredProfileKeys.length} results for "${search}"`
        if (searchLocation)
            return `Showing ${filteredProfileKeys.length} results for "${searchLocation}"`
    }

    function generateColumns(displaySize: number) {
        if (displaySize) {
            let columns = ""
            for (let i = 0; i < displaySize; i++) columns += "1fr "
            return columns
        }
        return "1fr 1fr 1fr 1fr"
    }

    return (
        <div className={styles.Dashboard}>
            <Toaster toastOptions={{ className: "toast" }} />
            <Header useMobile={window.innerWidth < 1168 && overlay} setOverlay={setOverlay} />
            <Sidebar
                overlay={overlay}
                setOverlay={setOverlay}
                newProfile={newProfile}
                settings={settings}
            />
            <MobileNav newProfile={newProfile} settings={settings} />

            <div
                style={{
                    opacity: overlay ? 1 : 0,
                    transform: overlay ? "translateX(0)" : "translateX(100%)"
                }}
                className={styles.overlay}>
                {overlay}
            </div>

            <NewSearch
                filterBy={filterBy}
                setFilterBy={setFilterBy}
                setSearch={setSearch}
                setSearchLocation={setSearchLocation}
                layoutScale={layoutScale}
                setLayoutScale={setLayoutScale}
            />
            <div className={styles.container}>
                <p className={styles.category}>{searchLabel()}</p>
                <div
                    style={{
                        gridTemplateColumns: layoutScale ? generateColumns(layoutScale) : undefined
                    }}
                    className={styles.dashboardContent}>
                    {Object.keys(profiles).length > 0 ? (
                        filteredProfileKeys
                            .reverse()
                            .map((item: any, index: number) => (
                                <Profile
                                    key={index}
                                    props={profiles[item]}
                                    profiles={profiles}
                                    refetch={refetch}
                                    setOverlay={setOverlay}
                                    settings={settings}
                                />
                            ))
                    ) : (
                        <Loading />
                    )}
                </div>
            </div>
        </div>
    )
}

export default Dashboard
