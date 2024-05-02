import { Button, Group, PasswordInput, TextInput, Title } from '@mantine/core';
import { loginSchema } from '../../schemas';
import { Formik } from 'formik';

const FormSignIn = () => {
  return (
    <Formik
      initialValues={{ email: '', password: '' }}
      validationSchema={loginSchema}
      onSubmit={(values, { setSubmitting }) => {
        console.log({ values });
        setSubmitting(false);
      }}>
      {({ values, errors, handleChange, handleSubmit, isSubmitting }) => (
        <form onSubmit={handleSubmit}>
          <Title order={3} size="h3" ta="center" mb="lg">
            SIGN IN
          </Title>
          <TextInput
            size="lg"
            label="Email"
            placeholder="Enter email..."
            name="email"
            value={values.email}
            onChange={handleChange}
            error={errors.email}
          />

          <PasswordInput
            mt="lg"
            size="lg"
            label="Password"
            placeholder="Enter password"
            name="password"
            value={values.password}
            onChange={handleChange}
            error={errors.password}
          />

          <Group justify="flex-end" my="md">
            <Button size="lg" fullWidth type="submit" disabled={isSubmitting}>
              Sign In
            </Button>
          </Group>
        </form>
      )}
    </Formik>
  );
};

export default FormSignIn;
