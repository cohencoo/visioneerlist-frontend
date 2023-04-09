import React, { useState, useRef, useEffect } from "react"
import styles from "./NewSearch.module.scss"

const demoQueries = [
    "Smart meeting scheduling apps for busy executives in Perth",
    "AI-powered productivity tools for tech startups in Sydney",
    "Custom candle scents for luxury brands in Adelaide",
    "Innovative project management tools for agile teams in Adelaide",
    "Personalized meal delivery for busy professionals in Sydney",
    "Eco-friendly packaging solutions for Sydney businesses",
    "UX/UI Design Agencies in Perth",
    "Comprehensive software services in Brisbane",
    "Social Media Marketing in Sydney",
    "Banner Design in Adelaide"
]

interface NewSearchProps {
    setSearch: any
    setSearchLocation: any
    filterBy: string
    setFilterBy: any
    layoutScale: number
    setLayoutScale: any
}

const NewSearch: React.FC<NewSearchProps> = ({
    setSearch,
    setSearchLocation,
    filterBy,
    setFilterBy,
    layoutScale,
    setLayoutScale
}) => {
    const inputRef = useRef<HTMLInputElement>(null)
    const [advancedMode, setAdvancedMode] = useState(false)
    const [qIndex, setQIndex] = useState(0)

    const getIcon = (filterBy: string) => {
        if (filterBy === "latest") return "schedule"
        if (filterBy === "trending") return "trending_up"
        if (filterBy === "actively-hiring") return "partner_exchange"
    }

    useEffect(() => {
        const i = setInterval(() => setQIndex((qIndex + 1) % demoQueries.length), 2000)
        return () => clearInterval(i)
    }, [qIndex])

    useEffect(() => {
        if (!advancedMode) {
            setFilterBy("latest")
            setSearch("")
            setSearchLocation("")
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [advancedMode])

    return (
        <div className={styles.NewSearch}>
            <h1>Let us find what you're looking for</h1>
            {advancedMode ? (
                <>
                    <div className={styles.advanced}>
                        <div className={styles.field}>
                            <span className="material-symbols-rounded">{getIcon(filterBy)}</span>
                            <select onChange={(e) => setFilterBy(e.target.value)}>
                                <option value="latest">Latest</option>
                                <option value="trending">Trending (views)</option>
                                <option value="actively-hiring">Actively Hiring</option>
                            </select>
                        </div>
                        <div className={styles.field}>
                            <span className="material-symbols-rounded">search</span>
                            <input
                                onChange={(e) => setSearch(e.target.value)}
                                type="text"
                                autoComplete="false"
                                placeholder="Enter Keywords"
                            />
                        </div>
                        <div className={styles.field}>
                            <span className="material-symbols-rounded">location_on</span>
                            <input
                                onChange={(e) => setSearchLocation(e.target.value)}
                                autoComplete="false"
                                type="text"
                                placeholder="Enter Location"
                            />
                        </div>
                    </div>
                    <div className={styles.layoutScale}>
                        <div style={{ display: "flex", alignItems: "center" }}>
                            Min
                            <input
                                onChange={(e) => setLayoutScale(Number(e.target.value))}
                                type="range"
                                style={{ margin: "0 8px", width: "100%" }}
                                value={layoutScale || 3}
                                min={2}
                                max={5}
                                className={styles.range}
                            />
                            Max
                        </div>
                        <div className={styles.markers}>
                            <span className={styles.marker}></span>
                            <span className={styles.marker}></span>
                            <span className={styles.marker}></span>
                            <span className={styles.marker}></span>
                        </div>
                    </div>
                </>
            ) : (
                <input
                    ref={inputRef}
                    placeholder={demoQueries[qIndex]}
                    autoComplete="false"
                    onChange={(e) => {
                        const query = e.target.value.trim().split(" in ")
                        setSearch(query[0])
                        setSearchLocation(query[1])
                    }}
                    className={styles.search}
                    type="text"
                />
            )}
            <p onClick={() => setAdvancedMode(!advancedMode)} className={styles.expand}>
                {advancedMode
                    ? "switch to default search mode"
                    : "or search using advanced filters"}
            </p>
        </div>
    )
}

export default NewSearch
