import React, { useEffect, useRef } from "react";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import styled from "styled-components";
import { useSelector, useDispatch } from "react-redux";
import { CHState } from "~index";
import console = require("console");
import { RouteActions } from "~state/RouteActions";
import MarkerUrl from "./marker.svg";
import SelectedMarkerUrl from "./selected-marker.svg";
import { SelectedLocationActions } from "~state/SelectedLocationActions";

const style = {
    width: "100%",
    height: "300px"
};

function Map({ markersData }) {
    const itemQuery = useSelector((s: CHState) => s.itemQuery);
    const mapRef = useRef(null);
    const layerRef = useRef(null);
    useEffect(() => {
        layerRef.current = L.layerGroup();
        mapRef.current = L.map("map", {
            center: [itemQuery.lat, itemQuery.long],
            zoom: 16,
            layers: [
                L.tileLayer("http://{s}.tile.osm.org/{z}/{x}/{y}.png", {
                    attribution:
                        '&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
                })
            ]
        });
        mapRef.current.addLayer(layerRef.current);
        mapRef.current.createPane("circle");
        mapRef.current.getPane("circle").style.zIndex = 3000;
        mapRef.current.getPane("circle").style.pointerEvents = "none";
    }, []);
    const dispatch = useDispatch();
    useEffect(() => {
        const moveendListener = e => {
            const center = mapRef.current.getCenter();
            if (center.lat !== itemQuery.lat || center.lng !== itemQuery.long) {
                dispatch(
                    RouteActions.resultsFromItemQuery({
                        ...itemQuery,
                        lat: center.lat,
                        long: center.lng
                    })
                );
            }
        };
        mapRef.current.on("moveend", moveendListener);
        const moveListener = e => {
            layerRef.current.clearLayers();
            var circle = L.circle(mapRef.current.getCenter(), {
                color: "green",
                fillColor: "#fff",
                fillOpacity: 0,
                radius: 100000.0,
                pane: "circle"
            });
            circle.addTo(layerRef.current);
        };
        mapRef.current.on("move", moveListener);
        return () => {
            mapRef.current.off("move", moveListener);
            mapRef.current.off("moveend", moveendListener);
        };
    }, [itemQuery]);
    useEffect(() => {
        mapRef.current.setView([itemQuery.lat, itemQuery.long]);
    }, [itemQuery.lat, itemQuery.long]);

    // update markers
    const selectedLocation = useSelector((s: CHState) => s.selectedLocation);
    useEffect(() => {
        layerRef.current.clearLayers();
        var circle = L.circle(mapRef.current.getCenter(), {
            color: "green",
            fillColor: "#fff",
            fillOpacity: 0,
            radius: 100000.0,
            pane: "circle"
        }).addTo(layerRef.current);
        markersData.forEach(marker => {
            if (!marker.filteredItems || marker.filteredItems.length == 0) {
                return;
            }
            // GeoJSON coordinates are [long,lat] while Leaflet coordinates are [lat,long]
            L.marker(
                [
                    marker.geometry.coordinates[1],
                    marker.geometry.coordinates[0]
                ],
                {
                    icon: getIcon(
                        marker.filteredItems ? marker.filteredItems.length : 0,
                        marker._id === selectedLocation
                    ),
                    title: marker.name
                }
            )
                .addTo(layerRef.current)
                .on("click", e =>
                    dispatch(SelectedLocationActions.select(marker._id))
                );
        });
    }, [markersData]);

    return <StyledMap id="map" />;
}
const getIcon = (nrOfItems: number, isSelected) => {
    let className = "pin location";
    if (isSelected) {
        className += " selected";
    }
    return L.divIcon({
        className: className,
        iconSize: [60, 60],
        iconAnchor: [30, 60],
        popupAnchor: [0, -36],
        html: `<span class="pin-content">
        <span class="nr-of-items">${nrOfItems}</span>
        <img src="${isSelected ? SelectedMarkerUrl : MarkerUrl}"/>
        </span>`
    });
};
const StyledMap = styled.div`
    height: 100%;
    width: 100%;
    .pin.selected .pin-content {
        color: #000;
    }
    .pin .pin-content {
        position: absolute;
        height: 60px;
        width: 60px;
        display: flex;
        align-items: center;
        justify-content: center;
        color: #fff;
        img {
            height: 100%;
            width: auto;
        }
        .nr-of-items {
            /* display: block; */
            position: absolute;
            top: 8px;
            font-weight: bold;
            font-size: 16px;
            display: flex;
            width: 60px;
            height: 24px;
            align-items: center;
            justify-content: center;
        }
    }
`;
export default Map;
