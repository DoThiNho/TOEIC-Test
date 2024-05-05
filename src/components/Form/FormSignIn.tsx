import { Button, Group, PasswordInput, TextInput, Title } from '@mantine/core';
import { loginSchema } from '../../schemas';
import { Formik } from 'formik';
import TextLink from 'components/Common/CommonTextLink';
import { useLoginMutation } from 'store/services/authApi';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { AppDispatch } from 'store/index';
import { setCredentials } from 'store/slices/authSlice';
import { useEffect } from 'react';
import { localStorageClient } from 'utils/localStorage.util';

const FormSignIn = () => {
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();

  const [login, { data }] = useLoginMutation();

  useEffect(() => {
    const token = data?.token;
    if (token) {
      localStorageClient.setItem('token', token);
      navigate('/');
    }
  }, [data]);

  return (
    <Formik
      initialValues={{ email: '', password: '' }}
      validationSchema={loginSchema}
      onSubmit={async (values, { setSubmitting }) => {
        try {
          const user = await login({ email: values.email, password: values.password }).unwrap();
          dispatch(setCredentials({ ...user }));
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
            <TextLink labelText="Sign in with google" />
          </Group>
        </form>
      )}
    </Formik>
  );
};

export default FormSignIn;
