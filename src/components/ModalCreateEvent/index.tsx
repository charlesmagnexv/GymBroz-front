import {
    Button,
    Modal,
    Box,
    Typography,
    Grid,
    TextField,
    Checkbox,
    Divider,
    InputLabel,
    Alert,
    FormHelperText,
    Tooltip,
    IconButton,
    Fade,
    Select,
    MenuItem
} from "@mui/material";
import { yupResolver } from '@hookform/resolvers/yup';
import React, { useEffect, useState } from "react";
import { useForm, Controller } from "react-hook-form";
import useStyles from "./styles";
import 'react-datepicker/dist/react-datepicker.css';
import { MapContainer, TileLayer, Marker, useMapEvents } from 'react-leaflet';
import Backdrop from '@mui/material/Backdrop';
import { DatePicker, LocalizationProvider, TimePicker } from '@mui/x-date-pickers';
import { AdapterMoment } from '@mui/x-date-pickers/AdapterMoment';
import { validationSchema } from "./ValidationSchema";
import AddIcon from '@mui/icons-material/Add';
import moment from "moment";
import { getEventsTypes, postEvents } from "../../services/events.service";
import { useBackdrop } from "../../hooks/backdrop";
import { useFeedback } from "../../hooks/addFeedback";
import { Address } from "../molecules/PopUpEvents";
import axios from "axios";
import { Categories } from "../../models/Events";

const style = {
    position: 'absolute' as 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
};

const label = { inputProps: { 'aria-label': 'Checkbox demo' } };

const ModalCreateEvent: React.FC<{ addNewEvent: (event: any) => void }> = ({ addNewEvent }) => {
    const classes = useStyles()

    const [open, setOpen] = useState(false);
    const [categories, setCategories] = useState<Categories[]>([])
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);
    const { handleBackdrop } = useBackdrop();
    const { addFedback } = useFeedback()

    useEffect(() => {
        open &&
            (async () => {
                const types = await getEventsTypes()
                setCategories(types.data.eventTypes)
            })()
    }, [open])

    const { handleSubmit, control, watch, setValue, reset, formState: { errors } } = useForm<any>({
        resolver: yupResolver(validationSchema)
    });

    async function reverseGeocode(latitude: number, longitude: number): Promise<string> {
        const url = `https://nominatim.openstreetmap.org/reverse?format=jsonv2&lat=${latitude}&lon=${longitude}`;

        try {
            const response = await axios.get(url);
            const address: Address = response.data.address;
            return `${address.road}, ${address.suburb}, ${address.city} - ${address.state} , ${address.country}`;
        } catch (error) {
            console.error(error);
            return '';
        }
    }

    const LocationMarker = ({ control }: any) => {
        const [markerLocation, setMarkerLocation] = useState(null);

        const handleMapClick = (e: any) => {
            const { lat, lng } = e.latlng;
            const location: any = [lat, lng];
            setMarkerLocation(location);
            setValue('location', location);
        };

        useMapEvents({
            click: handleMapClick,
        });

        return markerLocation ? <Marker position={markerLocation} /> : null
    };


    const onSubmit = async (data: any) => {
        handleBackdrop(true)
        let logradouro = await reverseGeocode(data.location[0], data.location[1])
        const newEvent = {
            title: data.title,
            description: data.description,
            eventDate: `${moment(data.date.toString()).format('YYYY-MM-DD')}T${moment(data.time.toString()).format("HH:mm:ss")}Z`,
            isPublic: data.isPublic,
            hasLimit: data.hasLimit,
            limitCount: data.limitCount,
            geocode: data.location,
            address: logradouro,
            eventTypeId: data.eventTypeId
        }
        try {
            const res = await postEvents(newEvent)
            console.log(res)
            handleBackdrop(false)
            addFedback({
                description: `Evento criado com sucesso`,
                typeMessage: 'success'
            })
            handleClose()
            console.log(res.data)
            addNewEvent({ ...res.data, isAdmin: true })
            // window.location.reload()
            // reset()
        }
        catch (err: any) {
            handleBackdrop(false)
            addFedback({
                description: `${err.response.data.message}`,
                typeMessage: 'error'
            })
        }
    }

    return (
        <>
            <Box>
                <Grid>
                    <Button
                        onClick={handleOpen}
                        className={classes.btnAdd}
                        startIcon={<AddIcon />}
                    >
                        Crie seu evento
                    </Button>
                    {/* <Tooltip
                        title="Criar Evento"
                        placement="top"
                        arrow
                        TransitionComponent={Fade}
                        TransitionProps={{ timeout: 400 }}
                    >
                        <IconButton
                            aria-label="join"
                            size="large"
                            onClick={handleOpen}
                            className={classes.btnAdd}
                        >
                            <LibraryAddIcon fontSize="large" />
                        </IconButton>
                    </Tooltip> */}
                </Grid>
                <Modal
                    open={open}
                    onClose={handleClose}
                    aria-labelledby="modal-modal-title"
                    aria-describedby="modal-modal-description"
                    closeAfterTransition
                    slots={{ backdrop: Backdrop }}
                    slotProps={{
                        backdrop: {
                            timeout: 500,
                        },
                    }}
                >
                    <Box sx={style} className={classes.modalStyle}>
                        <Typography variant="h5">Crie seu evento aqui!</Typography>
                        <Divider />
                        <form className={classes.formStyle} onSubmit={handleSubmit(onSubmit)}>
                            <Grid container>
                                <Grid item md={12} sm={12} className={classes.boxInputsStyle}>
                                    <Controller
                                        control={control}
                                        rules={{
                                            required: true,
                                        }}
                                        render={({ field: { onChange, onBlur, value } }) => (
                                            <TextField
                                                className={classes.inputsStyle}
                                                sx={{ width: '100%' }}
                                                label="Título"
                                                variant="outlined"
                                                onChange={onChange}
                                                error={!!errors.title}
                                                InputLabelProps={{
                                                    shrink: true,
                                                }}
                                            />
                                        )}
                                        name="title"
                                    />
                                    <FormHelperText className={classes.helperText}>
                                        {errors.title ? errors.title?.message + '' : ''}
                                    </FormHelperText>
                                </Grid>
                                <Grid item md={12} sm={12} className={classes.boxInputsStyle}>
                                    <Controller
                                        control={control}
                                        rules={{
                                            required: true,
                                        }}
                                        render={({ field: { onChange, onBlur, value } }) => (
                                            <TextField
                                                sx={{ width: '100%' }}
                                                label="Descrição"
                                                variant="outlined"
                                                multiline
                                                maxRows={10}
                                                rows={4}
                                                onChange={onChange}
                                                error={!!errors.description}
                                                InputLabelProps={{
                                                    shrink: true,
                                                }}
                                            />
                                        )}
                                        name="description"
                                    />
                                    <FormHelperText className={classes.helperText}>
                                        {errors.description ? errors.description?.message + '' : ''}
                                    </FormHelperText>
                                </Grid>
                                <Grid item md={12} sm={12} className={classes.boxInputsStyle}>
                                    <Controller
                                        control={control}
                                        rules={{
                                            required: true,
                                        }}
                                        render={({ field: { onChange, onBlur, value } }) => (
                                            <>
                                                <Select
                                                    id="eventTypeId"
                                                    sx={{ width: '100%' }}
                                                    value={value}
                                                    labelId="typeLabel"
                                                    label="Categoria"
                                                    onChange={onChange}
                                                    className={classes.inputsStyle}
                                                    variant="outlined"
                                                    error={!!errors.eventTypeId}
                                                >
                                                    {categories.map((category => <MenuItem value={category.id}>{category.title}</MenuItem>))}
                                                </Select>
                                            </>
                                        )}
                                        name="eventTypeId"
                                    />
                                    <FormHelperText className={classes.helperText}>
                                        {errors.eventTypeId ? errors.eventTypeId?.message + '' : ''}
                                    </FormHelperText>
                                </Grid>

                                <Grid item md={6} sm={12} className={classes.boxInputsStyle} sx={{ display: 'flex', gap: '5px' }}>
                                    <Controller
                                        control={control}
                                        name="date"
                                        rules={{
                                            required: true,
                                        }}
                                        render={({ field: { onChange, onBlur, value } }) => (
                                            <LocalizationProvider dateAdapter={AdapterMoment}>
                                                <DatePicker
                                                    className={classes.datePickerStyle}
                                                    onChange={onChange}
                                                    slotProps={{
                                                        textField: {
                                                            error: !!errors.date,
                                                        },
                                                    }}
                                                />
                                            </LocalizationProvider>
                                        )}
                                    />
                                    <FormHelperText className={classes.helperText}>
                                        {errors.date ? errors.date?.message + '' : ''}
                                    </FormHelperText>
                                    <Controller
                                        control={control}
                                        name="time"
                                        rules={{
                                            required: true,
                                        }}
                                        render={({ field: { onChange, onBlur, value } }) => (
                                            <LocalizationProvider dateAdapter={AdapterMoment}>
                                                <TimePicker
                                                    onChange={onChange}
                                                    className={classes.timePickerStyle}
                                                    slotProps={{
                                                        textField: {
                                                            error: !!errors.time,
                                                        },
                                                    }}
                                                />
                                            </LocalizationProvider>
                                        )}
                                    />
                                    <FormHelperText className={classes.helperText}>
                                        {errors.time ? errors.time?.message + '' : ''}
                                    </FormHelperText>
                                </Grid>
                                <Grid item md={12} sm={12} className={classes.boxInputsLimitStyle}>
                                    <Controller
                                        control={control}
                                        rules={{
                                            required: true,
                                        }}
                                        render={({ field: { onChange, onBlur, value } }) => (
                                            <Checkbox
                                                onChange={(e) => onChange(e.target.checked)}
                                                checked={value || false}
                                                {...label}

                                            />
                                        )}
                                        name="hasLimit"
                                    />
                                    <Box>
                                        <Controller
                                            control={control}
                                            rules={{
                                                required: true,
                                            }}
                                            render={({ field: { onChange, onBlur, value } }) => (
                                                <TextField
                                                    value={value}
                                                    disabled={!watch('hasLimit')}
                                                    label="Limite"
                                                    variant="outlined"
                                                    type="number"
                                                    onChange={onChange}
                                                    InputProps={{
                                                        inputProps: {
                                                            min: 2
                                                        }
                                                    }}
                                                    InputLabelProps={{
                                                        shrink: true,
                                                    }}
                                                />
                                            )}
                                            name="limitCount"
                                        />
                                        <FormHelperText className={classes.helperText}>
                                            {errors.limitCount ? errors.limitCount?.message + '' : ''}
                                        </FormHelperText>
                                    </Box>
                                    <Box sx={{ display: 'flex', alignItems: 'center' }}>
                                        <Controller
                                            control={control}
                                            rules={{
                                                required: true,
                                            }}
                                            render={({ field: { onChange, onBlur, value } }) => (
                                                <Checkbox
                                                    sx={{ p: 0, marginLeft: '20px' }}
                                                    onChange={(e) => onChange(e.target.checked)}
                                                    checked={value}
                                                    {...label}
                                                />
                                            )}
                                            name="isPublic"
                                        />
                                        <InputLabel
                                            className={classes.labelCheck}
                                            disabled={!watch('isPublic')}
                                        >
                                            Evento Público
                                        </InputLabel>
                                    </Box>
                                </Grid>
                            </Grid>
                            <Alert
                                icon={false}
                                severity="info"
                                className={classes.alertLocal}
                            >
                                <strong>Ajuda</strong>: Clique no mapa para escolher o local do evento.
                            </Alert>
                            <Box>
                                <Controller
                                    name="location"
                                    control={control}
                                    render={({ field: { value } }) => (
                                        <MapContainer
                                            center={[-22.7999744, -45.2001792]}
                                            zoom={13} style={{ height: '400px' }}>
                                            <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
                                            <LocationMarker control={control} />
                                        </MapContainer>
                                    )}
                                />
                                <FormHelperText className={classes.helperText}>
                                    {errors.location ? errors.location?.message + '' : ''}
                                </FormHelperText>
                            </Box>

                            <Grid className={classes.gridBtns}>
                                <Button variant="outlined" onClick={handleClose} className={classes.btnCancel}>Cancelar</Button>
                                <Button type="submit" className={classes.btnAdd}>Criar Evento</Button>
                            </Grid>
                        </form>
                    </Box>
                </Modal >
            </Box >
        </>
    )
}

export default ModalCreateEvent