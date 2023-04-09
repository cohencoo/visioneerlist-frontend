import { useEffect, useState } from "react"
import Home from "./Home/Home"
import Dashboard from "./Dashboard/Dashboard"

export const AI_ROUTE = "https://visioneerlist-ai.coclub.repl.co"
export const MAP_ROUTE = "https://visioneerlist-backend.coclub.repl.co/maps/?q="
export const API_ROUTE = "https://visioneerlist-backend.coclub.repl.co"

function App() {
    const [app, setApp] = useState("/")
    const [profiles, setProfiles] = useState({}) as any
    const query = new URLSearchParams(window.location.search).get("id")

    const fetchData = () => {
        fetch(API_ROUTE + "/api/profiles")
            .then((res) => res.json())
            .then((data) => {
                setProfiles(data)
                console.log(data)
            })
            .catch((err) => {
                setTimeout(fetchData, 1000)
                console.error(err)
            })
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
    useEffect(() => fetchData, [])

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
