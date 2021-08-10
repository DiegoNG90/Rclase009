import * as Yup from "yup";

// formil → states

export const initialValues = {
    username: "",
    password: "",
}

export const validationSchema = {
    username: Yup.string().required("El campo usuario es obligatorio"),
    password: Yup.string().required("El campo password es obligatorio")
}

