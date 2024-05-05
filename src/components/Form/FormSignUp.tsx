import { Button, Group, PasswordInput, TextInput, Title } from '@mantine/core';
import { signUpSchema } from '../../schemas';
import { Formik } from 'formik';
import TextLink from 'components/Common/CommonTextLink';
import { useDispatch } from 'react-redux';
import { AppDispatch } from 'store/index';
import { setCredentials } from 'store/slices/authSlice';
import { useRegisterMutation } from 'store/services/authApi';

const FormSignUp = () => {
  const dispatch = useDispatch<AppDispatch>();
  const [register, { isLoading }] = useRegisterMutation();

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
      onSubmit={async (values, { setSubmitting }) => {
        const { firstName, lastName, email, phoneNumber, password } = values;
        const user = await register({
          email,
          password,
          role_id: '2',
          first_name: firstName,
          last_name: lastName,
          phone_number: phoneNumber,
          image: ''
        }).unwrap();
        dispatch(setCredentials({ ...user }));
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
            <TextLink labelText="Sign up with google" />
          </Group>
        </form>
      )}
    </Formik>
  );
};

export default FormSignUp;
