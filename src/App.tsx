import { useEffect, useState } from "react"
import Home from "./Home/Home"
import Dashboard from "./Dashboard/Dashboard"
import axios from "axios"

export const AI_ROUTE = "https://visioneerlist-ai.coclub.repl.co"
export const MAP_ROUTE = "https://visioneerlist-backend.onrender.com/maps/?q="
export const API_ROUTE = "https://visioneerlist-backend.onrender.com"

function App() {
    const [app, setApp] = useState("/")
    const [profiles, setProfiles] = useState({})
    const [success, setSuccess] = useState(false)
    const query = new URLSearchParams(window.location.search).get("id")

    const fetchData = () => {
        if (success) return
        console.log("Fetching data...")
        axios
            .get(API_ROUTE + "/api/profiles?timestamp=" + new Date().getTime())
            .then((res: any) => {
                setProfiles(res.data)
                setSuccess(true)
            })
            .catch(() => setTimeout(fetchData, 1000))
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
    useEffect(() => fetchData, [profiles])

    return app === "/" && !query ? (
        <Home profiles={profiles} setApp={setApp} />
    ) : (
        <Dashboard
            profiles={profiles}
            setProfiles={setProfiles}
            viewProfile={query}
            newListing={app === "/new-profile"}
        />
    )
}

export default App
