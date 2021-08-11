import { initialValues, validationSchema } from './schemas';
import { useFormik } from 'formik'; // Usa reducers para manejar estados de manera interna!
import { Container, Grid, Box, TextField, Button } from '@material-ui/core';
import * as Yup from "yup";
import { useAuth } from '../../contexts/auth';
import { useState } from 'react';
import {useHistory} from 'react-router-dom';


const Login = () => {
  const [wrongPassword, setWrongPassword] = useState(false)
  const {login} = useAuth() 
  const history = useHistory()

  // Validacion pre onSubmit
  const handleLogin = ({ username, password }) => {
    // llegado a este punto, username y password YA ESTAN VALIDADOS por mi schema: no tengo que validar más nada!
    const jwt = login({username, password}) // jwt sea null o sea != de null
    if(!jwt) {
        return setWrongPassword(true)
    }else{
        setWrongPassword(false)
        return history.push("/dashboard")
    }
  };
  const formik = useFormik({
    initialValues,
    validationSchema: Yup.object(validationSchema),
    onSubmit: ({username, password}) => {
      // handleLogin(obj) → Es el que va a hacer la peticion al BackEnd!
      handleLogin({ username, password });
    },
  });
  return (
    <Container>
      <Grid
        container
        direction="row"
        justifyContent="center"
        alignItems="center"
      >
        <Grid item xs={12} md={4}>
          <form onSubmit={formik.handleSubmit}>
            <Box mt={1}>
              <TextField
                type="text"
                name="username"
                label="Usuario"
                onChange={formik.handleChange}
                error={formik.errors.username}
                fullWidth
              />
            </Box>
            {formik?.errors?.username && <span>{formik.errors.username}</span>}
            <Box>
              <TextField
                type="password"
                name="password"
                label="Password"
                onChange={formik.handleChange}
                error={formik.errors.password}
                fullWidth
              />
            </Box>
            {formik?.errors?.password && <span>{formik.errors.password}</span>}
            <Box>
              <Button
                type="submit"
                fullWidth
                variant="contained"
                color="primary"
              >
                Login
              </Button>
            </Box>
          </form>
          {wrongPassword && <span>Usuario o contraseña incorrectas</span>}
        </Grid>
      </Grid>
    </Container>
  );
};

export default Login;
