// import { useRouter } from "next/router";

// const EventDetail = () => {
//   const router = useRouter();
//   const { eventId } = router.query;
//   return <div>Event ID: {eventId}</div>;
// };

// export default withStyles(styles)(EventDetail);

import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import axios from 'axios';
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import { Paper , Button, TextField } from '@material-ui/core';

const useStyles = makeStyles({
    table: {
      minWidth: 650,
    },
  });

const EventDetail = ({ emailLoggeado }) => {//{ emailLoggeado }) => {
  //const [events, setEvents] = useState([]); //estado y muta estado
  const [event, setEvent] = useState([]); //estado y muta estado
  const router = useRouter();
  const { eventId } = router.query;
  const [name, setName] = useState();
  const [category, setCategory] = useState();
  const [place, setPlace] = useState();
  const [address, setAddress] = useState();
  const onChangeName = (event) => {
    setName(event.target.value);
  };
  const onChangeCategory = (event) => {
    setCategory(event.target.value);
  };
  const onChangePlace = (event) => {
    setPlace(event.target.value);
  };
  const onChangeAddress = (event) => {
    setAddress(event.target.value);
  };
  const obtenerEvento = async () => {
    try {
      console.log(eventId);
      const { data } = await axios.get(
        `http://localhost:5000/event/${eventId}`

      );
      setEvent(data);
    } catch (err) {
      router.replace("/"); // ------------
    }
  };
  const editEvent = async (event_id, name, category, place, address) => {
    try {
      const { data } = await axios.post(
        `http://localhost:5000/edit-event/${event_id}`,
        {
          name: name,
          category: category,
          place: place,
          address, address,
          email: emailLoggeado
        } 
      );
      router.push('/events/[eventId]', `/events/${event_id}`)
    } catch (err) {
      router.replace("/"); // ------------
    }
  };

  useEffect(() => {
    obtenerEvento();
  }, []);

  const classes = useStyles();

  return (
    <TableContainer component={Paper}>
      <Table className={classes.table} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>Evento</TableCell>
            <TableCell align="right">Nombre</TableCell>
            <TableCell align="right">Categoria</TableCell>
            <TableCell align="right">Lugar</TableCell>
            <TableCell align="right">Direccion</TableCell>
            <TableCell align="right"></TableCell>
            <TableCell align="right"></TableCell>
            <TableCell align="right"></TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {event.map((event) => (
            <TableRow key={event.name}>
              <TableCell component="th" scope="row"><Button variant="contained">{event.id}</Button></TableCell>
              <TableCell align="right"><TextField id="outlined-secondary" label={event.name} variant="outlined" color="primary" onChange={onChangeName} value={name}/>{event.name}</TableCell>
              <TableCell align="right"><TextField id="outlined-secondary" label={event.category} variant="outlined" color="primary" onChange={onChangeCategory} value={category}/>{event.category}</TableCell>
              <TableCell align="right"><TextField id="outlined-secondary" label={event.place} variant="outlined" color="primary" onChange={onChangePlace} value={place}/>{event.place}</TableCell>
              <TableCell align="right"><TextField id="outlined-secondary" label={event.address} variant="outlined" color="primary" onChange={onChangeAddress} value={address}/>{event.address}</TableCell>
              <TableCell align="right"><Button variant="contained" onClick={e => editEvent(event.id, name, category, place, address)}>Save</Button></TableCell>
            </TableRow>
          ))}
        </TableBody>
        <TableCell><Button variant="contained" color="secondary" padding nClick={e => router.push("/events/")}>Back</Button></TableCell>
      </Table>
    </TableContainer>
  );
};

export default EventDetail;
