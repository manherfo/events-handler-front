import React, { useEffect, useState } from "react";
import { Paper, withStyles, Grid, TextField, Button } from "@material-ui/core";
import { useRouter } from "next/router";
import { Face, Fingerprint } from "@material-ui/icons";
import axios from "axios";

const styles = (theme) => ({
  margin: {
    margin: theme.spacing.unit * 2,
  },
  padding: {
    padding: theme.spacing.unit,
  },
});

const SignUpTab = ({ classes, ingresarUsuario, emailLoggeado }) => {
  const router = useRouter();
  const [email, setemail] = useState("");
  const [pwd, setpwd] = useState("");
  const onchangeemail = (event) => {
    setemail(event.target.value);
  };
  const onchangepwd = (event) => {
    setpwd(event.target.value);
  };
  
  const registrarUsuario = async () => {
    try {
      const { data } = await axios.post(
        `http://localhost:5000/signup/${email}/${pwd}`
        );
        usuarioRegistrado()
      } catch (err) {
        console.error(err);
        alert(err);
      }
    };

  const usuarioRegistrado = async () => {
    router.push("/"); // ------------
  };

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
            onClick={registrarUsuario}
            variant="outlined"
            color="secondary"
            style={{ textTransform: "none" }}
          >
            Registrse
          </Button>
        </Grid>
        <Grid container justify="center" style={{ marginTop: "10px" }}>
          <Button
            onClick={usuarioRegistrado}
            variant="outlined"
            color="primary"
            style={{ textTransform: "none" }}
          >
            Ingresar
          </Button>
        </Grid>
      </div>
    </Paper>
  );
};

export default withStyles(styles)(SignUpTab);
