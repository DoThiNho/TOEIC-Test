import * as yup from 'yup';

//min 5 characters, 1 upper case letter, 1 lower case letter, 1 numeric digit
const passwordRules = /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d).{5,}$/;
const phoneRegExp =
  /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/;

export const loginSchema = yup.object().shape({
  email: yup.string().email('Please enter a valid email').required('Email is required'),
  password: yup
    .string()
    .min(5)
    .matches(passwordRules, { message: 'Please create a stronger password' })
    .required('Password is required')
});

export const signUpSchema = yup.object().shape({
  firstName: yup
    .string()
    .matches(/^[A-Za-z ]*$/, 'Please enter valid first name')
    .max(40)
    .required('First name is required'),
  lastName: yup
    .string()
    .matches(/^[A-Za-z ]*$/, 'Please enter valid last name')
    .max(40)
    .required('Last name is required'),
  email: yup.string().email('Please enter a valid email').required('Email is required'),
  phoneNumber: yup
    .string()
    .matches(phoneRegExp, 'Phone number is not valid')
    .min(10, 'too short')
    .max(10, 'too long')
    .required('Please enter valid phone number'),
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

export const profileSchema = yup.object().shape({
  firstName: yup
    .string()
    .matches(/^[A-Za-z ]*$/, 'Please enter valid first name')
    .max(40)
    .required('First name is required'),
  lastName: yup
    .string()
    .matches(/^[A-Za-z ]*$/, 'Please enter valid last name')
    .max(40)
    .required('Last name is required'),
  email: yup.string().email('Please enter a valid email').required('Email is required'),
  phoneNumber: yup
    .string()
    .matches(phoneRegExp, 'Phone number is not valid')
    .min(10, 'too short')
    .max(10, 'too long')
    .required('Please enter valid phone number')
});

export const flashcardAddListSchema = yup.object().shape({
  title: yup.string().required('Tile is required'),
  description: yup.string().required('Description is required'),
  vocabulary: yup.string().required('Vocabulary is required'),
  mean: yup.string().required('Mean is required')
});

export const flashcardSchema = yup.object().shape({
  vocabulary: yup.string().required('Vocabulary is required'),
  mean: yup.string().required('Mean is required')
});
