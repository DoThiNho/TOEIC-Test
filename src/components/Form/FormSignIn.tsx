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
import { loginSchema } from '../../schemas';
import { Formik } from 'formik';
import { useLoginMutation } from 'store/services/authApi';
import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
import { localStorageClient } from 'utils/localStorage.util';

const FormSignIn = () => {
  const navigate = useNavigate();

  const [login, { data, isLoading }] = useLoginMutation();

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
        initialValues={{ email: '', password: '' }}
        validationSchema={loginSchema}
        validateOnBlur={false}
        validateOnChange={false}
        onSubmit={async (values, { setSubmitting }) => {
          try {
            await login({ email: values.email, password: values.password }).unwrap();
          } catch (err) {}
          setSubmitting(false);
        }}>
        {({ values, errors, handleChange, handleSubmit, isSubmitting }) => (
          <form onSubmit={handleSubmit}>
            <Title order={3} size="h3" ta="center" mb="lg">
              SIGN IN
            </Title>
            <TextInput
              size="md"
              label="Email"
              placeholder="Enter email..."
              name="email"
              value={values.email}
              onChange={handleChange}
              error={errors.email}
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

            <Group justify="center" my="md">
              <Button size="lg" fullWidth type="submit" disabled={isSubmitting}>
                Sign In
              </Button>
              <Text>You have an account</Text>
              <Anchor href="/register">Sign up</Anchor>
            </Group>
          </form>
        )}
      </Formik>
    </Box>
  );
};

export default FormSignIn;
