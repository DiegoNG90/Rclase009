import { initialValues, validationSchema } from './schemas';
import { useFormik } from 'formik'; // Usa reducers para manejar estados de manera interna!
import { Container, Grid, Box, TextField, Button } from '@material-ui/core';
import * as Yup from "yup";

const Login = () => {
  // Validacion pre onSubmit
  const handleLogin = ({ username, password }) => {
    // llegado a este punto, username y password YA ESTAN VALIDADOS por mi schema: no tengo que validar más nada!
    console.log(username, password)
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
      <Grid container direction="row" justifyContent="center" alignItems="center">
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
            <Box>
                <Button type="submit" fullWidth variant="contained" color="primary">Login</Button>
            </Box>
          </form>
        </Grid>
      </Grid>
    </Container>
  );
};

export default Login;
