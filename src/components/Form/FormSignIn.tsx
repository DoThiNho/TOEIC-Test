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
import { Form, Formik } from 'formik';
import { useLoginMutation } from 'store/services/authApi';
import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
import { localStorageClient } from 'utils/localStorage.util';
import { toast } from 'react-toastify';
import { ErrorResponse } from 'types/api';

const FormSignIn = () => {
  const navigate = useNavigate();
  const [login, { data, isLoading, error }] = useLoginMutation();
  useEffect(() => {
    const token = data?.token;
    if (token) {
      localStorageClient.setItem('token', token);
      if (data.user.role_id === 1) {
        localStorageClient.setItem('isAdmin', true);
        navigate('/admin/users');
      } else {
        localStorageClient.setItem('isAdmin', false);
        navigate('/');
      }
    }
    if (error) {
      toast.error((error as ErrorResponse).data?.message);
    }
  }, [data, error]);

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
          <Form onSubmit={handleSubmit}>
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
            {error && (
              <Text color="red" mt={16}>
                {(error as ErrorResponse).data?.message}
              </Text>
            )}
            <Group justify="center" my="md">
              <Button size="lg" fullWidth type="submit" disabled={isSubmitting}>
                Sign In
              </Button>
              <Text>You have an account</Text>
              <Anchor href="/register">Sign up</Anchor>
            </Group>
          </Form>
        )}
      </Formik>
    </Box>
  );
};

export default FormSignIn;
