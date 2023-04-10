import { useEffect, useState, createContext } from "react"
import Home from "./Home/Home"
import Dashboard from "./Dashboard/Dashboard"
import axios from "axios"

export const AI_ROUTE = "https://visioneerlist-ai.coclub.repl.co"
export const MAP_ROUTE = "https://visioneerlist-backend.onrender.com/maps/?q="
export const API_ROUTE = "https://visioneerlist-backend.onrender.com"

function App() {
    const [app, setApp] = useState("/")
    const [profiles, setProfiles] = useState({})
    const DataContext = createContext(profiles)
    const query = new URLSearchParams(window.location.search).get("id")

    const fetchData = () => {
        axios
            .get(API_ROUTE + "/api/profiles")
            .then((res: any) => setProfiles(res.data))
            .catch(() => setTimeout(fetchData, 1000))
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
    useEffect(() => fetchData, [])

    return (
        <>
            <DataContext.Provider value={profiles}>
                {app === "/" && !query ? (
                    <Home profiles={profiles} setApp={setApp} />
                ) : (
                    <Dashboard
                        setProfiles={setProfiles}
                        viewProfile={query}
                        DataContext={DataContext}
                        newListing={app === "/new-profile"}
                    />
                )}
            </DataContext.Provider>
        </>
    )
}

export default App
