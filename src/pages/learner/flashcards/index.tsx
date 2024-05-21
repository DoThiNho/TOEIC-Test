import { faPlus } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { ActionIcon, Box, Container, Grid, Group, Title } from '@mantine/core';
import CommonHeader from 'components/Common/CommonHeader';
import FlashCardBox from 'components/FlashCard/FlashCardBox';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useGetGroupVocabulariesQuery } from 'store/services/vocabularyApi';
import { FlashCardProps } from 'types';

const FlashCards = () => {
  const navigate = useNavigate();

  const { data } = useGetGroupVocabulariesQuery({});

  const [listGroupVocabulary, setListGroupVocabulary] = useState([]);

  useEffect(() => {
    if (data) {
      setListGroupVocabulary(data.data);
    }
  }, [data]);

  const handleRedictPage = (path: string) => {
    navigate(path);
  };

  return (
    <>
      <CommonHeader />
      <Box mih="100vh" className="bg-[#F6F7FB]">
        <Container size="xl" pt={150} pb={32}>
          <Group justify="space-between" mb={32}>
            <Title order={2}>List of created words:</Title>
            <ActionIcon
              variant="filled"
              size="xl"
              onClick={() => handleRedictPage('/flashcards/create')}>
              <FontAwesomeIcon icon={faPlus} />
            </ActionIcon>
          </Group>
          <Grid gutter="xl">
            {listGroupVocabulary.map((groupVocabulary: FlashCardProps, index) => (
              <Grid.Col key={index} span={{ base: 12, md: 6, lg: 4 }}>
                <FlashCardBox
                  title={groupVocabulary.title}
                  description={groupVocabulary.description}
                  onClick={() => handleRedictPage(`/learner/flashcards/${groupVocabulary.id}`)}
                />
              </Grid.Col>
            ))}
          </Grid>
        </Container>
      </Box>
    </>
  );
};

export default FlashCards;
