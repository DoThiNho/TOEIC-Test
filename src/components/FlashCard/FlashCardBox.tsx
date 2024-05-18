import { Avatar, Box, Card, CardProps, Flex, Group, Text, Title } from '@mantine/core';
import { FlashCardProps } from 'types';
import styled from '@emotion/styled';
import { useAppSelector, RootState } from 'store/index';

const StyledCard = styled(Card)<CardProps>`
  cursor: pointer;
  border: 1px solid #e0e0e0;
  display: flex;
  justify-content: space-between;

  &:hover {
    transform: translateY(-2px);
    transition: all 0.4s;
  }
`;

const FlashCardBox = (props: FlashCardProps) => {
  const { title, description, onClick } = props;
  const { userDetail } = useAppSelector((state: RootState) => state.user);
  return (
    <StyledCard shadow="md" h={170}>
      <Flex h="100%" direction="column" justify="space-between" onClick={onClick}>
        <Box>
          <Title order={5} mb={8}>
            {title}
          </Title>
          <Text>{description}</Text>
        </Box>
        <Group>
          <Avatar src={userDetail?.image} alt="it's me" />
          <Text>
            {userDetail?.lastName} {userDetail?.firstName}
          </Text>
        </Group>
      </Flex>
    </StyledCard>
  );
};

export default FlashCardBox;
