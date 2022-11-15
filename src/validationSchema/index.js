import * as Yup from "yup";
export const loginSchema = Yup.object().shape({
    email: Yup.string().email("Invalid email").required("Required email"),
    password:Yup.string().required()
  });

export const signUpSchema = Yup.object().shape({
    email: Yup.string().email("Invalid email").required("Required email"),
    password: Yup.string().required(),
    name:Yup.string().required(),
    phone:Yup.string().required(),
    country:Yup.string().required(),
})  