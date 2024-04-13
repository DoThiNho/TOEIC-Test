import * as yup from 'yup';

//min 5 characters, 1 upper case letter, 1 lower case letter, 1 numeric digit
const passwordRules = /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d).{5,}$/;

export const loginSchema = yup.object().shape({
  email: yup.string().email('Please enter a valid email').required('Email is required'),
  password: yup
    .string()
    .min(5)
    .matches(passwordRules, { message: 'Please create a stronger password' })
    .required('Password is required')
});

export const signUpSchema = yup.object().shape({
  name: yup
    .string()
    .matches(/^[A-Za-z ]*$/, 'Please enter valid name')
    .max(40)
    .required('Name is required'),
  email: yup.string().email('Please enter a valid email').required('Email is required'),
  password: yup
    .string()
    .min(5)
    .matches(passwordRules, { message: 'Please create a stronger password' })
    .required('Password is required'),
  confirmPassword: yup
    .string()
    .required('Please enter confirm password')
    .oneOf([yup.ref('password')], 'Your passwords do not match.')
});
