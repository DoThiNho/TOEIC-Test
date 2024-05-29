import { Badge, Button, Card, CardProps, Group, Text, Title } from '@mantine/core';
import moment from 'moment';
import { useNavigate } from 'react-router-dom';
import { ResultProps } from 'types';
import styled from '@emotion/styled';

const StyledCard = styled(Card)<CardProps>`
  cursor: pointer;
  border: 1px solid #e0e0e0;

  &:hover {
    transform: translateY(-2px);
    transition: all 0.4s;
  }
`;

const ResultItem = (props: ResultProps) => {
  const { result } = props;

  const navigate = useNavigate();

  const handleShowDetail = () => {
    navigate(`/learner/tests/${result.test_id}/results/${result.id}`);
  };

  return (
    <StyledCard shadow="md" bg="gray.0">
      <Title order={3}>{result.title}</Title>
      <Group my={4}>
        <Badge size="md" color="yellow">
          {result.type}
        </Badge>
        {result?.parts?.split(',').map((item, index) => (
          <Badge key={index} size="sm" color="yellow">
            Part {item}
          </Badge>
        ))}
      </Group>
      <Text>Date: {moment(result.date).format('DD-MM-YYYY')}</Text>
      <Text my={4}>Completion time: {result.complete_time}</Text>
      <Text>
        Result: {result.total_correct}/{result.total_questions}
      </Text>
      <Button variant="outline" mt={16} onClick={handleShowDetail}>
        Show detail
      </Button>
    </StyledCard>
  );
};

export default ResultItem;
