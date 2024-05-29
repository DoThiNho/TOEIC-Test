import { faArrowLeft, faPlus, faTrash, faVolumeHigh } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  ActionIcon,
  Box,
  Button,
  Card,
  Container,
  Divider,
  Flex,
  Group,
  Text,
  TextInput,
  Title
} from '@mantine/core';
import { useNavigate, useParams } from 'react-router-dom';
import {
  useAddVocabulariesMutation,
  useGetVocabulariesByGroupIdQuery
} from 'store/services/vocabularyApi';
import { Carousel } from '@mantine/carousel';
import { useEffect, useState } from 'react';
import { CardVocabulary } from 'types';
import ReactCardFlip from 'react-card-flip';
import { toast } from 'react-toastify';
import { useDisclosure } from '@mantine/hooks';
import ModalWordScramble from 'components/Modal/ModalWordScramble';

const FlashCardDetail = () => {
  const navigate = useNavigate();
  const param = useParams();
  const { data } = useGetVocabulariesByGroupIdQuery(param.id);
  const [addVocabularies, { isSuccess }] = useAddVocabulariesMutation();
  const [vocabularies, setVocabularies] = useState<CardVocabulary[]>([]);
  const [isFlipped, setIsFlipped] = useState(false);
  const [vocabulariesAdd, setVocabulariesAdd] = useState<CardVocabulary[]>([]);
  const [opened, { open, close }] = useDisclosure(false);

  useEffect(() => {
    if (data) {
      setVocabularies(data.vocabularies);
    }
  }, [data]);

  useEffect(() => {
    if (isSuccess) {
      toast.success('Add vocabulary successful');
      setVocabulariesAdd([]);
    }
  }, [isSuccess]);

  const flipCard = () => {
    setIsFlipped(!isFlipped);
  };

  const speak = (word: string) => {
    const synth = window.speechSynthesis;
    const utterance = new SpeechSynthesisUtterance(word);

    synth.speak(utterance);
  };

  const handleGoBack = () => {
    navigate('/learner/flashcards');
  };

  const handleAddCard = () => {
    const newCard = {
      id: (vocabulariesAdd.length + 1).toString(),
      group_vocabularies_id: param.id,
      title: '',
      mean: ''
    };
    const list = [...vocabulariesAdd];
    list.push(newCard);
    console.log({ newCard });
    setVocabulariesAdd(list);
  };

  const handleDeleteCard = (id: string) => {
    const newListVocabularyAdd = vocabulariesAdd.filter((card) => card.id !== id);
    setVocabulariesAdd(newListVocabularyAdd);
  };

  const handleChange = (id: string, name: string, value: string) => {
    const updatedVocabularies = vocabulariesAdd.map((card) =>
      card.id === id ? { ...card, [name]: value } : card
    );
    setVocabulariesAdd(updatedVocabularies);
  };

  const handleAddVocabulary = async (card: CardVocabulary) => {
    await addVocabularies(card);
  };

  return (
    <Box mih="100vh" className="bg-[#F6F7FB]" pb={120}>
      <Container pt={150} pb={32}>
        <Group justify="space-between" mb={32}>
          <Title order={2}>List of group vocabulary:</Title>
          <Group>
            <Button variant="outline" onClick={open}>
              Revision
            </Button>
            <Button
              variant="light"
              leftSection={<FontAwesomeIcon icon={faArrowLeft} />}
              onClick={handleGoBack}>
              Go back
            </Button>
          </Group>
        </Group>
        <Carousel withIndicators height={500}>
          {vocabularies.map((vocabulary: CardVocabulary, index) => (
            <Carousel.Slide key={index}>
              <ReactCardFlip flipDirection="horizontal" isFlipped={isFlipped}>
                <Card
                  className="flex justify-center cursor-pointer"
                  shadow="md"
                  h={500}
                  onClick={flipCard}>
                  <Title size={32} order={3} ta="center">
                    {vocabulary.title}
                  </Title>
                </Card>
                <Card
                  className="flex justify-center cursor-pointer"
                  shadow="md"
                  h={500}
                  onClick={flipCard}>
                  <Title size={32} order={3} ta="center">
                    {vocabulary.mean}
                  </Title>
                </Card>
              </ReactCardFlip>
            </Carousel.Slide>
          ))}
        </Carousel>
        <Divider my={64} />
        <Box>
          <Title order={2}>Vocabulary in this section: </Title>
          <Box mt={16}>
            {vocabularies.map((vocabulary: CardVocabulary, index) => (
              <Group key={index} h={70} bg="white" mb={16} px={8}>
                <Text w="30%" size="md" ta="center">
                  {vocabulary.title}
                </Text>
                <Divider orientation="vertical" />
                <Text w="58%" size="md" ta="center">
                  {vocabulary.mean}
                </Text>
                <ActionIcon size={42} variant="default" onClick={() => speak(vocabulary.title)}>
                  <FontAwesomeIcon icon={faVolumeHigh} />
                </ActionIcon>
              </Group>
            ))}
            {vocabulariesAdd.map((card, index) => (
              <Card key={index} mt={16}>
                <Group justify="space-between">
                  <Group flex={1}>
                    <TextInput
                      flex={1}
                      size="md"
                      placeholder="Enter vocabulary"
                      name="title"
                      value={card.title}
                      onChange={(
                        event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
                      ) => handleChange(card.id, event.target.name, event.target.value)}
                    />
                    <TextInput
                      flex={1}
                      size="md"
                      placeholder="Enter mean"
                      name="mean"
                      value={card.mean}
                      onChange={(
                        event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
                      ) => handleChange(card.id, event.target.name, event.target.value)}
                    />
                  </Group>
                  <Group>
                    <ActionIcon
                      variant="default"
                      c="green"
                      bg="transparent"
                      onClick={() => handleAddVocabulary(card)}>
                      <FontAwesomeIcon icon={faPlus} />
                    </ActionIcon>
                    <ActionIcon
                      variant="default"
                      c="red"
                      bg="transparent"
                      onClick={() => handleDeleteCard(card.id)}>
                      <FontAwesomeIcon icon={faTrash} />
                    </ActionIcon>
                  </Group>
                </Group>
              </Card>
            ))}
            <Flex mt={32} bg="white" h={70} justify="center" align="center">
              <Button
                leftSection={<FontAwesomeIcon icon={faPlus} />}
                variant="outline"
                color="yellow"
                onClick={handleAddCard}>
                Add Card
              </Button>
            </Flex>
          </Box>
        </Box>
      </Container>
      {vocabularies.length > 0 && (
        <ModalWordScramble words={vocabularies} open={opened} onClose={close} />
      )}
    </Box>
  );
};

export default FlashCardDetail;
