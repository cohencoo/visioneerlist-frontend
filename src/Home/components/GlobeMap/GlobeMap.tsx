import React, { useEffect, useMemo, useRef } from "react"
import Globe from "react-globe.gl"
import countries from "../../../assets/globe/globe.json"
import globeTexture from "../../../assets/globe/globe-texture.jpg"
import styles from "./GlobeMap.module.scss"
import { randomFromRange } from "../../../assets/utils"
import arcs from "./arcs"

const MAP_CENTER = { lat: -27, lng: 157, altitude: 0.8 }

const GlobeMap: React.FC = () => {
    const globeContainer = useRef<HTMLDivElement>(null)
    const globeEl = useRef<any>(null)
    const arcsData = useMemo(() => arcs, [])

    useEffect(() => {
        const handleMouseDown = (event: MouseEvent) => {
            if (event.clientX > window.innerWidth / 2 && globeContainer.current) {
                globeContainer.current.style.cursor = "grabbing"
                globeContainer.current.style.pointerEvents = "auto"
            }
        }
        if (!globeContainer.current) return

        window.document.body.addEventListener("mousedown", handleMouseDown)
        return () => window.document.body.removeEventListener("mousedown", handleMouseDown)
    }, [globeContainer])

    useEffect(() => {
        globeEl.current && globeEl.current.pointOfView(MAP_CENTER, 4000)
    }, [])

    return (
        <div ref={globeContainer} className={styles.GlobeMap}>
            <Globe
                ref={globeEl}
                globeImageUrl={globeTexture}
                rendererConfig={{ alpha: true, antialias: true }}
                atmosphereColor={"rgb(0, 80, 150)"}
                backgroundColor={"rgba(0, 0, 0, 0)"}
                polygonsData={countries.features.filter((d: any) => d.properties.ISO_A2 !== "AQ")}
                polygonCapColor={(i: any) =>
                    i.properties.ISO_A2 === "AU" ? "rgb(255, 120, 10)" : "rgb(100, 100, 100)"
                }
                polygonSideColor={() => "rgba(100, 100, 100, 0.3)"}
                polygonStrokeColor={() => "#333"}
                arcsData={arcsData}
                arcColor={() => "rgba(255, 255, 255, 0.6)"}
                arcStroke={0.3}
                arcDashLength={() => randomFromRange(0.6, 0.9)}
                arcDashGap={() => 0.05}
                arcDashAnimateTime={() => randomFromRange(3500, 5000)}
                pointsData={arcsData.map((d: any) => ({
                    lat: d.startLat,
                    lng: d.startLng,
                    label: d.label
                }))}
                pointColor={() => "rgb(255, 255, 255)"}
                pointAltitude={0.03}
                pointRadius={0.15}
            />
        </div>
    )
}

export default GlobeMap
