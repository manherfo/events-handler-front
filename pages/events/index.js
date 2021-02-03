import { useRouter, Router } from "next/router";
import { useEffect, useState } from "react";
import axios from 'axios';
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import { Paper , Button} from '@material-ui/core';

const useStyles = makeStyles({
    table: {
      minWidth: 650,
    },
  });

const Events = ({ emailLoggeado }) => {
  const [events, setEvents] = useState([]); //estado y muta estado
  const router = useRouter();
  const obtenerEventos = async () => {
    try {
      const { data } = await axios.get(
        `http://localhost:5000/user-events/${emailLoggeado}`
      );
      setEvents(data);
    } catch (err) {
      router.replace("/"); // ------------
    }
  };

  const buscarEvento = async () => {
    try {
        const { data } = await axios.get(
          `http://localhost:5000/event/${onclick.events.id}`
        );
        setEvents(data);
      } catch (err) {
        router.replace("/"); // ------------
      }
  };

  useEffect(() => {
    obtenerEventos();
  }, []);

  const classes = useStyles();

  return (
    <TableContainer component={Paper}>
      <Table className={classes.table} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>Event</TableCell>
            <TableCell align="right">Name</TableCell>
            <TableCell align="right">Category</TableCell>
            <TableCell align="right">Place</TableCell>
            <TableCell align="right">Address</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {events.map((event) => (
            <TableRow key={event.name}>
              <TableCell component="th" scope="row"><Button variant="contained" onClick={e => router.push('/events/[eventId]', `/events/${event.id}`)}>{event.id}</Button></TableCell>
              <TableCell align="right">{event.name}</TableCell>
              <TableCell align="right">{event.category}</TableCell>
              <TableCell align="right">{event.place}</TableCell>
              <TableCell align="right">{event.address}</TableCell>
              <TableCell align="right"><Button variant="contained" onClick={e => router.push('/edit/[eventId]', `/edit/${event.id}`)}>EDIT</Button></TableCell>
              <TableCell align="right"><Button variant="contained" onClick={e => router.push('/delete/[eventId]', `/delete/${event.id}`)} color="secondary">DELETE EVENT</Button></TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
        <div>        
          <TableCell align="right">
          <Button variant="contained" onClick={e => router.push('/create')} color="primary" padding>CREATE NEW EVENT</Button>  
        </TableCell>
        <TableCell align="right">
          <Button variant="contained" onClick={e => router.push('/')} color="secondary" padding-left="50px" >LOGOUT</Button>
        </TableCell>
        </div>        
    </TableContainer>
  );
};

export default Events;
