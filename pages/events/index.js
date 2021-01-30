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
import Paper from '@material-ui/core/Paper';

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
        `http://localhost:5000/user-details/${emailLoggeado}`
      );
      if (data.length === 0) {
        throw "usuario no existe";
      }
      const usuario = data[0];
      setEvents(usuario.events);
    } catch (err) {
      router.replace("/"); // ------------
    }
  };

  const registrarUsuario = (eventid) => {
    router.push(`/events/${eventid}`); // ------------
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
            <TableCell>Nombre</TableCell>
            <TableCell align="right">Categoria</TableCell>
            <TableCell align="right">Lugar&nbsp;(g)</TableCell>
            <TableCell align="right">Direccion&nbsp;(g)</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {events.map((event) => (
            <TableRow key={event.name}>
              <TableCell component="th" scope="row">
                <a href={`/events/${event.name}`}>
                    {event.name}
                </a>
              </TableCell>
              <TableCell align="right">{event.category}</TableCell>
              <TableCell align="right">{event.place}</TableCell>
              <TableCell align="right">{event.address}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default Events;