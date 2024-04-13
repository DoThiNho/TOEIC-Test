import { Button, Group, PasswordInput, TextInput, Title } from '@mantine/core';
import { signUpSchema } from '../../schemas';
import { Formik } from 'formik';

const FormSignUp = () => {
  return (
    <Formik
      initialValues={{ name: '', email: '', password: '', confirmPassword: '' }}
      validationSchema={signUpSchema}
      onSubmit={(values, { setSubmitting }) => {
        console.log({ values });
        setSubmitting(false);
      }}>
      {({ values, errors, handleChange, handleSubmit, isSubmitting }) => (
        <form onSubmit={handleSubmit}>
          <Title order={3} size="h3" ta="center" mb="lg">
            SIGN UP
          </Title>

          <TextInput
            size="lg"
            label="Name"
            placeholder="Enter name..."
            name="name"
            value={values.name}
            onChange={handleChange}
            error={errors.name}
          />

          <TextInput
            mt="lg"
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

          <PasswordInput
            mt="lg"
            size="lg"
            label="Confirm password"
            placeholder="Enter confirm password"
            name="password"
            value={values.confirmPassword}
            onChange={handleChange}
            error={errors.confirmPassword}
          />

          <Group justify="flex-end" my="md">
            <Button size="lg" fullWidth type="submit" disabled={isSubmitting}>
              Sign Up
            </Button>
          </Group>
        </form>
      )}
    </Formik>
  );
};

export default FormSignUp;
