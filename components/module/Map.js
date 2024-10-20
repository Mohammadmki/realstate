"use client"

import 'leaflet/dist/leaflet.css';
import {  useEffect,useState } from 'react';
import { MapContainer, Marker, TileLayer, useMap, useMapEvents} from 'react-leaflet';

import styles from "./map.module.css"

export default function Map({ title, name, Data, setData ,loc}) {
    const [position, setPosition] = useState([51.505, -0.09]);

      useEffect(()=>{
        if(loc){
            setPosition(loc)
        }
      },[loc])

    const markerIcon = new L.Icon({
        iconUrl: 'https://leafletjs.com/examples/custom-icons/leaf-green.png',
        iconSize: [38, 95], 
        iconAnchor: [22, 94], 
        popupAnchor: [-3, -76], 
      });
      const LocationMarker = () => {
        useMapEvents({
            click(e) {
                if (!Data) return; 
                setData((prevData) => ({
                    ...prevData,
                    location: {
                        ...prevData.location,
                        [name]: [e.latlng.lat, e.latlng.lng]
                    }
                }));
            }
        });
    
     
        return (
            <Marker position={position} icon={markerIcon} />
        );
    };

    const ChangeMapCenter = ({ newPosition }) => {
    
        const map = useMap();
           useEffect(()=>{
            if(!loc) return
            map.setView(loc,15)
           },[])
       
        

        
        useEffect(() => {
            if(!Data)return
            if (newPosition) {
                map.setView(newPosition, 13); 
            }
        }, [newPosition, map]);

        return null;
    };

    useEffect(() => {
        if(!Data) return
        if (Data.location.position && Data.location.position.length) {
            setPosition(Data.location.position); 
        }
    }, [Data?Data.location.position:null]);
    return (
        <div className={styles.container}>
            <p>{title}</p>
            <MapContainer center={position} zoom={13} className={!loc?styles.map:styles.show}>
                <TileLayer
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                />
                <LocationMarker />
                  {loc && <Marker position={loc?loc:null} icon={markerIcon} />}
                <ChangeMapCenter newPosition={position} />
            </MapContainer>
        </div>
    );
}
