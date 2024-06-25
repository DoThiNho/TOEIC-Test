import { Button, Group, LoadingOverlay, TextInput } from '@mantine/core';
import { profileSchema } from '../../schemas';
import { Formik } from 'formik';
import { IUserState } from 'types';
import { useUpdateUserMutation } from 'store/services/userApi';
import { useEffect } from 'react';
import { toast } from 'react-toastify';

const FormProfile = (props: IUserState) => {
  const { userDetail } = props;
  const [updateUser, { isSuccess }] = useUpdateUserMutation();

  useEffect(() => {
    if (isSuccess) {
      toast.success('Update user successfully');
    }
  }, [isSuccess]);

  return (
    <>
      {!userDetail ? (
        <LoadingOverlay
          visible={!userDetail}
          zIndex={1000}
          overlayProps={{ radius: 'sm', blur: 2 }}
        />
      ) : (
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
                id: userDetail?.id || '',
                firstName: values.firstName,
                lastName: values.lastName,
                email: values.email || '',
                phoneNumber: values.phoneNumber
              }).unwrap();
            } catch (err) {}
            setSubmitting(false);
          }}>
          {({ values, errors, handleChange, handleSubmit, isSubmitting, setValues }) => (
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

              <Group my="md">
                <Button flex={1} size="md" type="submit" disabled={isSubmitting}>
                  Save Change
                </Button>
                <Button
                  flex={1}
                  size="md"
                  variant="outline"
                  onClick={() =>
                    setValues({
                      firstName: userDetail?.firstName,
                      lastName: userDetail?.lastName,
                      email: userDetail?.email,
                      phoneNumber: userDetail?.phoneNumber
                    })
                  }>
                  Discard Change
                </Button>
              </Group>
            </form>
          )}
        </Formik>
      )}
    </>
  );
};

export default FormProfile;
