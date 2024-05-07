import { Button, Group, TextInput } from '@mantine/core';
import { signUpSchema } from '../../schemas';
import { Formik } from 'formik';
import { IUserState } from 'types';

const FormProfile = (props: IUserState) => {
  const { userDetail } = props;
  return (
    <Formik
      initialValues={{
        firstName: userDetail?.firstName,
        lastName: userDetail?.lastName,
        email: userDetail?.email,
        phoneNumber: userDetail?.phoneNumber
      }}
      enableReinitialize={true}
      validationSchema={signUpSchema}
      onSubmit={(values, { setSubmitting }) => {
        console.log({ values });
        setSubmitting(false);
      }}>
      {({ values, errors, handleChange, handleSubmit, isSubmitting }) => (
        <form onSubmit={handleSubmit} className="w-full">
          <TextInput
            mt="lg"
            size="md"
            label="First Name"
            name="firstName"
            value={values.firstName}
            onChange={handleChange}
            error={errors.firstName}
          />

          <TextInput
            mt="lg"
            size="md"
            label="Last Name"
            name="lastName"
            value={values.lastName}
            onChange={handleChange}
            error={errors.lastName}
          />

          <TextInput
            mt="lg"
            size="md"
            label="Email"
            name="email"
            value={values.email}
            onChange={handleChange}
            error={errors.email}
          />

          <TextInput
            mt="lg"
            size="md"
            label="Phone Number"
            name="phoneNumber"
            value={values.phoneNumber}
            onChange={handleChange}
            error={errors.phoneNumber}
          />

          <Group justify="flex-end" my="md">
            <Button size="md" fullWidth type="submit" disabled={isSubmitting}>
              Save Change
            </Button>
          </Group>
        </form>
      )}
    </Formik>
  );
};

export default FormProfile;
