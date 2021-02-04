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
  const router = useRouter();
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
  const createEvent = async (name, category, place, address) => {
    try {
      console.log(emailLoggeado);
      const { data } = await axios.post(
        `http://localhost:5000/create-event`,
        {
          name: name,
          category: category,
          place: place,
          address, address,
          email: emailLoggeado
        } 
      );
      console.log(data);
      router.push("/events");
    } catch (err) {
      throw `usuario invalido ${emailLoggeado}`;//router.replace("/"); // ------------
    }
  };

  const classes = useStyles();

  return (
    <TableContainer component={Paper}>
      <Table className={classes.table} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell align="center">Nombre</TableCell>
            <TableCell align="center">Categoria</TableCell>
            <TableCell align="center">Lugar</TableCell>
            <TableCell align="center">Direccion</TableCell>
            <TableCell align="right"></TableCell>
            <TableCell align="right"></TableCell>
            <TableCell align="right"></TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
            <TableRow>
              <TableCell align="right"><TextField id="outlined-secondary" label="Event name" variant="outlined" color="primary" onChange={onChangeName} value={name} required/></TableCell>
              <TableCell align="right"><TextField id="outlined-secondary" label="Event category" variant="outlined" color="primary" onChange={onChangeCategory} value={category} required/></TableCell>
              <TableCell align="right"><TextField id="outlined-secondary" label="Event place" variant="outlined" color="primary" onChange={onChangePlace} value={place} required/></TableCell>
              <TableCell align="right"><TextField id="outlined-secondary" label="Event address" variant="outlined" color="primary" onChange={onChangeAddress} value={address} required/></TableCell>
              <TableCell align="right"><Button variant="contained" onClick={e => createEvent(name, category, place, address)}>Save</Button></TableCell>
            </TableRow>
        </TableBody>
        <TableCell><Button variant="contained" color="secondary" onClick={e => router.push("/events/")} padding>Back</Button></TableCell>
      </Table>
    </TableContainer>
  );
};

export default EventDetail;
