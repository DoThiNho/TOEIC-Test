import { Button, Group, PasswordInput, TextInput, Title } from '@mantine/core';
import { signUpSchema } from '../../schemas';
import { Formik } from 'formik';

const FormSignUp = () => {
  return (
    <Formik
      initialValues={{
        firstName: '',
        lastName: '',
        email: '',
        phoneNumber: '',
        password: '',
        confirmPassword: ''
      }}
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
            label="First Name"
            placeholder="Enter first name"
            name="firstName"
            value={values.firstName}
            onChange={handleChange}
            error={errors.firstName}
          />

          <TextInput
            mt="lg"
            size="lg"
            label="Last Name"
            placeholder="Enter last name"
            name="lastName"
            value={values.lastName}
            onChange={handleChange}
            error={errors.lastName}
          />

          <TextInput
            mt="lg"
            size="lg"
            label="Email"
            placeholder="Enter email"
            name="email"
            value={values.email}
            onChange={handleChange}
            error={errors.email}
          />

          <TextInput
            mt="lg"
            size="lg"
            label="Phone number"
            placeholder="Enter phone number"
            name="phoneNumber"
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
