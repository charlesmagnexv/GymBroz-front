import './style.css'
import "leaflet/dist/leaflet.css";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import MarkerClusterGroup from 'react-leaflet-cluster'
import { Icon } from 'leaflet';
import { createContext, useCallback, useContext, useEffect, useState, } from 'react';
import { EventUnique, EventsDTO, getEvents, getEventsByTypes } from '../../../../services/events.service';
import PopUpEvents from '../../../molecules/PopUpEvents';
import { useBackdrop } from '../../../../hooks/backdrop';
import { useFeedback } from '../../../../hooks/addFeedback';
import iconGym from '../../../../../assets/location2.png'
import { Box, Fab } from '@mui/material';
import FilterAltIcon from '@mui/icons-material/FilterAlt';
import FilterModal from '../../FilterModal';

interface RefreshEventsDTO {
    handleRefreshEvents: () => void
}

export const RefreshEventsContext = createContext<RefreshEventsDTO>({} as RefreshEventsDTO);

export const useRefreshEvents = (): RefreshEventsDTO => useContext(RefreshEventsContext)

const MapEvents = () => {
    const [markers, setMarkers] = useState<EventsDTO>()
    const [openFilter, setOpenFilter] = useState<boolean>(false)
    const { handleBackdrop } = useBackdrop()
    const { addFedback } = useFeedback()

    const handleClose = () => {
        setOpenFilter(false)
    }

    const handleOpen = () => {
        setOpenFilter(true)
    }

    const eventsList = useCallback(() => {
        handleBackdrop(true)
        getEvents()
            .then(res => {
                setMarkers(res.data)
                handleBackdrop(false)
            })
            .catch(err => {
                addFedback({
                    description: 'Erro ao exibir os eventos',
                    typeMessage: 'error'
                })
                handleBackdrop(false)
            })
    }, [])

    useEffect(() => {
        eventsList()
    }, [])

    const handleRefreshEvents = () => {
        eventsList();
    }

    const refreshEventsByType = (id: number) => {
        handleBackdrop(true)
        getEventsByTypes(id).then(res => {
            if (res.data.events) {
                setMarkers(res.data)
            }
            handleClose()
            handleBackdrop(false)
        }).catch(err => {
            addFedback({
                description: 'Erro ao filtrar eventos',
                typeMessage: 'error'
            })
            handleBackdrop(false)
        })
    }

    const customMarkerIcon = new Icon({
        iconUrl: iconGym,
        iconSize: [45, 45]
    });

    return (
        <RefreshEventsContext.Provider value={{ handleRefreshEvents }}>
            <Box sx={{ marginBottom: '0px' }}>
                <Fab
                    onClick={handleOpen}
                    color="warning"
                    aria-label="add"
                    sx={{
                        position: 'absolute',
                        right: 40, top: 40
                    }}
                >
                    <FilterAltIcon
                        sx={{
                            color:
                                'white'
                        }}
                    />
                </Fab>
                <FilterModal open={openFilter} handleClose={handleClose} refreshEventsByType={refreshEventsByType} handleRefreshEvents={handleRefreshEvents} />
                <MapContainer
                    center={[-22.7999744, -45.2001792]}
                    zoom={13}
                    scrollWheelZoom={true}
                >
                    <TileLayer
                        url="https://tile.openstreetmap.org/{z}/{x}/{y}.png"
                    />
                    <MarkerClusterGroup
                        chunkedLoading
                        maxClusterRadius={150}
                        spiderfyOnMaxZoom={true}
                        showCoverageOnHover={true}
                    >

                        {
                            markers?.events && markers.events!.map((marker: EventUnique) => (
                                <Marker position={marker.geocode} key={marker.id} icon={customMarkerIcon}>
                                    <Popup>
                                        <PopUpEvents title={marker.title} date={marker.eventDate} id={marker.id} />
                                    </Popup>
                                </Marker>
                            ))
                        }
                    </MarkerClusterGroup>

                </MapContainer>
            </Box>
        </RefreshEventsContext.Provider>
    );
}

export default MapEvents;
