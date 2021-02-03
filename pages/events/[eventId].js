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
import { Paper , Button} from '@material-ui/core';

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

  useEffect(() => {
    obtenerEvento();
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
            <TableCell align="right">Place&nbsp;</TableCell>
            <TableCell align="right">Address&nbsp;</TableCell>
            <TableCell align="right">Created at</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {event.map((event) => (
            <TableRow key={event.name}>
              <TableCell component="th" scope="row"><a href={`/events/${event.id}`}>{event.id}</a></TableCell>
              <TableCell align="right">{event.name}</TableCell>
              <TableCell align="right">{event.category}</TableCell>
              <TableCell align="right">{event.place}</TableCell>
              <TableCell align="right">{event.address}</TableCell>
              <TableCell align="right">{event.created_at}</TableCell>
            </TableRow>
          ))}
        </TableBody>
        <TableCell><Button variant="contained" color="primary" padding onClick={e => router.push("/events/")}>Back</Button></TableCell>
      </Table>
    </TableContainer>
  );
};

export default EventDetail;
