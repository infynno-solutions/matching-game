import * as Yup from "yup";

export const userNameSchema = Yup.object().shape({
  username: Yup.string()
    .min(2, "Too Short!")
    .max(70, "Too Long!")
    .required("Required"),
});
