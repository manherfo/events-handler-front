import React, { useEffect, useState } from "react";
import {
  Paper,
  withStyles,
  Grid,
  TextField,
  Button
} from "@material-ui/core";
import { useRouter } from "next/router";
import { Face, Fingerprint } from "@material-ui/icons";
import axios from 'axios';

const styles = (theme) => ({
  margin: {
    margin: theme.spacing.unit * 2,
  },
  padding: {
    padding: theme.spacing.unit,
  },
});

const EventsTab = ({ classes, ingresarUsuario, emailLoggeado }) => {
  const router = useRouter();
  const [email, setemail] = useState(''); //estado y muta estado
  const [pwd, setpwd] = useState('');
  const onchangeemail = (event) => {
    setemail(event.target.value);
  };
  const onchangepwd = (event) => {
    setpwd(event.target.value);
  };
  const validarUsuario = async () => {
    try { 
      const {data} = await axios.post(
        `http://172.24.98.146:5000/validate-pwds`,
        {
          email: email,
          pwd: pwd
        } 
      );
      if(Object.keys(data).length === 0){
        throw 'usuario invalido';
      }
      const usuario = data[0];
      console.log(usuario);
      ingresarUsuario(usuario.email);
    }
    catch(err){
      console.error(err);
      alert(err);
    }
  };
  
  const registrarUsuario = async () => {
    router.push("/signup"); // ------------
  };

  useEffect(() => {
    if (emailLoggeado.trim() !== "") {
      router.replace("/events"); // ------------
    }
  }, [emailLoggeado]);

  return (
    <Paper className={`${classes.padding} login_form`}>
      <div className={classes.margin}>
        <Grid container spacing={8} alignItems="flex-end">
          <Grid item>
            <Face />
          </Grid>
          <Grid item md={true} sm={true} xs={true}>
            <TextField
              id="username"
              label="Username"
              type="email"
              fullWidth
              autoFocus
              required
              onChange={onchangeemail}
              value={email}
            />
          </Grid>
        </Grid>
        <Grid container spacing={8} alignItems="flex-end">
          <Grid item>
            <Fingerprint />
          </Grid>
          <Grid item md={true} sm={true} xs={true}>
            <TextField
              id="password"
              label="Password"
              type="password"
              fullWidth
              required
              onChange={onchangepwd}
              value={pwd}
            />
          </Grid>
        </Grid>
        <Grid container justify="center" style={{ marginTop: "10px" }}>
          <Button
            onClick={validarUsuario}
            variant="outlined"
            color="primary"
            style={{ textTransform: "none" }}
          >
            
            Ingresar
          </Button>
        </Grid>
        <Grid container style={{ marginTop: "10px" }}>
          <Button
            onClick={registrarUsuario}
            variant="outlined"
            color="secondary"
            style={{ textTransform: "none" }}
          >
            Registrate
          </Button>
        </Grid>
      </div>
    </Paper>
  );
};

export default withStyles(styles)(EventsTab);
