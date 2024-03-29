import { useState } from "react"
import Home from "./Home/Home"
import Dashboard from "./Dashboard/Dashboard"

export const AI_ROUTE = "https://visioneerlist-ai.coclub.repl.co"
export const MAP_ROUTE = "https://visioneerlist.herokuapp.com/maps/?q="
export const API_ROUTE = "https://visioneerlist.herokuapp.com"

function App() {
    const [app, setApp] = useState("/")
    const [profiles, setProfiles] = useState({})
    const query = new URLSearchParams(window.location.search).get("id")

    return app === "/" && !query ? (
        <Home profiles={profiles} setProfiles={setProfiles} setApp={setApp} />
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
