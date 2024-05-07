import {
  Anchor,
  Box,
  Button,
  Group,
  LoadingOverlay,
  PasswordInput,
  Text,
  TextInput,
  Title
} from '@mantine/core';
import { signUpSchema } from '../../schemas';
import { Formik } from 'formik';
import { useRegisterMutation } from 'store/services/authApi';
import { localStorageClient } from 'utils/localStorage.util';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const FormSignUp = () => {
  const navigate = useNavigate();
  const [register, { data, isLoading }] = useRegisterMutation();

  useEffect(() => {
    const token = data?.token;
    if (token) {
      localStorageClient.setItem('token', token);
      navigate('/');
    }
  }, [data]);

  return (
    <Box pos="relative">
      <LoadingOverlay visible={isLoading} zIndex={1000} overlayProps={{ radius: 'sm', blur: 2 }} />
      <Formik
        initialValues={{
          firstName: '',
          lastName: '',
          email: '',
          phoneNumber: '',
          password: '',
          confirmPassword: ''
        }}
        validateOnBlur={false}
        validateOnChange={false}
        validationSchema={signUpSchema}
        onSubmit={async (values, { setSubmitting }) => {
          const { firstName, lastName, email, phoneNumber, password } = values;
          await register({
            email,
            password,
            role_id: '2',
            first_name: firstName,
            last_name: lastName,
            phone_number: phoneNumber,
            image: ''
          }).unwrap();
          setSubmitting(false);
        }}>
        {({ values, errors, handleChange, handleSubmit, isSubmitting }) => (
          <form onSubmit={handleSubmit}>
            <Title order={3} size="h3" ta="center" mb="lg">
              SIGN UP
            </Title>

            <TextInput
              size="md"
              label="First Name"
              placeholder="Enter first name"
              name="firstName"
              value={values.firstName}
              onChange={handleChange}
              error={errors.firstName}
            />

            <TextInput
              mt="lg"
              size="md"
              label="Last Name"
              placeholder="Enter last name"
              name="lastName"
              value={values.lastName}
              onChange={handleChange}
              error={errors.lastName}
            />

            <TextInput
              mt="lg"
              size="md"
              label="Email"
              placeholder="Enter email"
              name="email"
              value={values.email}
              onChange={handleChange}
              error={errors.email}
            />

            <TextInput
              mt="lg"
              size="md"
              label="Phone number"
              placeholder="Enter phone number"
              name="phoneNumber"
              value={values.phoneNumber}
              onChange={handleChange}
              error={errors.phoneNumber}
            />

            <PasswordInput
              mt="lg"
              size="md"
              label="Password"
              placeholder="Enter password"
              name="password"
              value={values.password}
              onChange={handleChange}
              error={errors.password}
            />

            <PasswordInput
              mt="lg"
              size="md"
              label="Confirm password"
              placeholder="Enter confirm password"
              name="confirmPassword"
              value={values.confirmPassword}
              onChange={handleChange}
              error={errors.confirmPassword}
            />

            <Group justify="center" my="md">
              <Button size="md" fullWidth type="submit" disabled={isSubmitting}>
                Sign Up
              </Button>
              <Text>You have an account</Text>
              <Anchor href="/login">Sign in</Anchor>
            </Group>
          </form>
        )}
      </Formik>
    </Box>
  );
};

export default FormSignUp;
