import { faCamera } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Avatar, Box, Container } from '@mantine/core';
import UserIcon from 'assets/images/user_icon.png';
import FormProfile from 'components/Form/FormProfile';
import _ from 'lodash';
import { useEffect, useState } from 'react';
import { useSetAvatarMutation } from 'store/services/userApi';
import { toast } from 'react-toastify';
import { IUserState } from 'types';

const CommonProfile = (props: IUserState) => {
  const { userDetail } = props;

  const [setAvatar, { data }] = useSetAvatarMutation();

  const [imageUrl, setImageUrl] = useState<string | undefined>('');

  useEffect(() => {
    if (userDetail) {
      setImageUrl(userDetail.image);
    }
  }, [userDetail]);

  useEffect(() => {
    if (data?.status) {
      if (data.status === 200) {
        toast.success(data.message);
      } else {
        toast.error(data.error);
      }
    }
  }, [data]);

  const handleFileUpload = (event: any) => {
    const files = event.target.files;

    if (files && files.length > 0) {
      const file = files[0];
      const reader = new FileReader();
      reader.onloadend = () => {
        const result = reader.result;
        if (typeof result === 'string' || result === null) {
          setImageUrl(result || '');
        }
        if (typeof file === 'undefined') return;
        const newFormData = new FormData();
        newFormData.append('id', userDetail?.id || '');
        newFormData.append('image', file);
        setAvatar(newFormData);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <Container size="xl" className="h-screen flex justify-center">
      <Box w="50%" pt={50}>
        <Box className="relative">
          <Avatar src={imageUrl ? imageUrl : UserIcon} size={200} alt="it's me" mx="auto" />
          <label htmlFor="upload-image" className="cursor-pointer absolute bottom-0 right-[30%]">
            <FontAwesomeIcon icon={faCamera} />
            <input
              id="upload-image"
              hidden
              accept="image/*"
              type="file"
              onChange={handleFileUpload}
            />
          </label>
        </Box>
        <FormProfile userDetail={userDetail} />
      </Box>
    </Container>
  );
};

export default CommonProfile;
