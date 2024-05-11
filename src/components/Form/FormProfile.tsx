import { Button, Group, TextInput } from '@mantine/core';
import { profileSchema } from '../../schemas';
import { Formik } from 'formik';
import { IUserState } from 'types';
import { useUpdateUserMutation } from 'store/services/userApi';
import { showMessage } from 'utils/parse.util';
import { useEffect } from 'react';

const FormProfile = (props: IUserState) => {
  const { userDetail } = props;
  const [updateUser, { data }] = useUpdateUserMutation();

  useEffect(() => {
    if (data?.status) {
      if (data.status === 200) {
        showMessage(data.message, true);
      } else {
        showMessage(data.error, false);
      }
    }
  }, [data]);

  return (
    <Formik
      initialValues={{
        firstName: userDetail?.firstName,
        lastName: userDetail?.lastName,
        email: userDetail?.email,
        phoneNumber: userDetail?.phoneNumber
      }}
      enableReinitialize={true}
      validationSchema={profileSchema}
      onSubmit={async (values, { setSubmitting }) => {
        try {
          await updateUser({
            id: userDetail?.id,
            firstName: values.firstName,
            lastName: values.lastName,
            email: values.email,
            phoneNumber: values.phoneNumber
          }).unwrap();
        } catch (err) {}
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
