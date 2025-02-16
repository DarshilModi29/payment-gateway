import * as Yup from "yup";

export const RegisterSchema = Yup.object({
    username: Yup.string()
        .min(3, "Username must be at least 3 characters")
        .max(20, "Username can't be more than 20 characters")
        .required("Username is required"),

    email: Yup.string()
        .email("Invalid email format")
        .required("Email is required"),

    pan_number: Yup.string()
        .matches(/^[A-Z]{5}[0-9]{4}[A-Z]{1}$/, "Invalid PAN number")
        .required("PAN is required"),

    aadhar_number: Yup.string()
        .matches(/^[2-9]{1}[0-9]{11}$/, "Invalid Aadhar number")
        .required("Aadhar is required"),

    phn_number: Yup.string()
        .matches(/^[6-9]\d{9}$/, "Invalid phone number")
        .required("Phone number is required"),

    password: Yup.string().required("Please enter password").min(8, "Username must be at least 8 characters")
        .max(16, "Username can't be more than 16 characters"),
});

export const LoginSchema = Yup.object({
    email: Yup.string().email("Invalid email format")
        .required("Email is required"),

    password: Yup.string().required("Please enter password")
});