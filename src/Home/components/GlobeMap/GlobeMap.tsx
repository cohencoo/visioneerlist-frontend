import React, { useEffect, useMemo, useRef } from "react"
import Globe from "globe.gl"
import countries from "../../../assets/globe/globe.json"
import globeTexture from "../../../assets/globe/globe-texture.jpg"
import styles from "./GlobeMap.module.scss"
import { randomFromRange } from "../../../assets/utils"
import arcs from "./arcs"

const MAP_CENTER = { lat: -27, lng: 157, altitude: 0.8 }

const GlobeMap: React.FC = () => {
    const gl = useRef<HTMLDivElement>(null)
    const arcsData = useMemo(() => arcs, [])

    const globeGl = useMemo(() => {
        return Globe({
            rendererConfig: {
                alpha: true,
                antialias: true
            },
            animateIn: false
        })
            .globeImageUrl(globeTexture)
            .showGraticules(true)
            .backgroundColor("rgba(0, 0, 0, 0)")
            .atmosphereColor("rgb(0, 80, 150)")
            .polygonSideColor(() => "rgba(100, 100, 100, 0.3)")
            .polygonStrokeColor(() => "#333")
            .pointAltitude(0.03)
            .pointColor(() => "rgb(255, 255, 255)")
            .pointRadius(0.15)
            .arcColor(() => "rgba(255, 255, 255, 0.6)")
            .arcStroke(0.3)
            .arcDashLength(() => randomFromRange(0.6, 0.9))
            .arcDashGap(() => 0.05)
            .arcDashAnimateTime(() => randomFromRange(3500, 5000))
    }, [])

    useEffect(() => {
        const handleMouseDown = (event: MouseEvent) => {
            if (event.clientX > window.innerWidth / 2 && gl.current) {
                gl.current.style.cursor = "grabbing"
                gl.current.style.pointerEvents = "auto"
            }
        }
        if (!gl.current) return

        window.document.body.addEventListener("mousedown", handleMouseDown)
        return () => window.document.body.removeEventListener("mousedown", handleMouseDown)
    }, [gl])

    useEffect(() => {
        if (gl.current)
            globeGl(gl.current)
                .pointOfView(MAP_CENTER, 2000)
                .polygonsData(countries.features.filter((d: any) => d.properties.ISO_A2 !== "AQ"))
                .polygonCapColor((i: any) =>
                    i.properties.ISO_A2 === "AU" ? "rgb(255, 120, 10)" : "rgb(100, 100, 100)"
                )
                .arcsData(arcsData)
                .arcLabel("label")
                .pointsData(arcsData.map((d: any) => ({ lat: d.startLat, lng: d.startLng })))
                .pointLabel("label")
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    return <div className={styles.GlobeMap} ref={gl}></div>
}

export default GlobeMap
