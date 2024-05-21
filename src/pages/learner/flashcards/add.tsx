import { faPlus } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Box, Button, Container, Flex, Group, LoadingOverlay, Title } from '@mantine/core';
import CommonHeader from 'components/Common/CommonHeader';
import FormAddListFlashCards from 'components/Form/FormAddListFlashCards';
import VocabularyAdd from 'components/Vocabulary/VocabularyAdd';
import { useEffect, useState } from 'react';
import { DragDropContext, Droppable, Draggable, DropResult } from 'react-beautiful-dnd';
import { useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import { useAppSelector, RootState } from 'store/index';
import { useAddGroupVocabularyMutation } from 'store/services/vocabularyApi';

const AddFlashCards = () => {
  const navigate = useNavigate();

  const { userDetail } = useAppSelector((state: RootState) => state.user);

  const [addGroupVocabulary, { data, isLoading, isSuccess }] = useAddGroupVocabularyMutation();

  const dummyData = [
    {
      id: '1',
      title: '',
      mean: ''
    },
    {
      id: '2',
      title: '',
      mean: ''
    }
  ];
  const [groupVocabulary, setGroupVocabulary] = useState({
    title: '',
    description: '',
    vocabularies: dummyData
  });

  useEffect(() => {
    if (isSuccess) {
      toast.success(data.message);
      const timer = setTimeout(() => {
        navigate('/learner/flashcards');
      }, 1000);

      return () => clearTimeout(timer);
    }
  }, [isSuccess]);

  const handleAddCard = () => {
    const newCard = {
      id: (groupVocabulary.vocabularies.length + 1).toString(),
      title: '',
      mean: ''
    };
    setGroupVocabulary({
      ...groupVocabulary,
      vocabularies: [...groupVocabulary.vocabularies, newCard]
    });
  };

  const handleVocabularyChange = (id: string, name: string, value: string) => {
    const updatedVocabularies = groupVocabulary.vocabularies.map((card) =>
      card.id === id ? { ...card, [name]: value } : card
    );
    setGroupVocabulary({
      ...groupVocabulary,
      vocabularies: updatedVocabularies
    });
  };

  const handleDeleteCard = (id: string) => {
    const newListVocabularyAdd = groupVocabulary.vocabularies.filter((card) => card.id !== id);
    setGroupVocabulary({
      ...groupVocabulary,
      vocabularies: newListVocabularyAdd
    });
  };

  const onDragEnd = (result: DropResult) => {
    if (!result.destination) return;

    const items = Array.from(groupVocabulary.vocabularies);
    const [reorderedItem] = items.splice(result.source.index, 1);
    items.splice(result.destination.index, 0, reorderedItem);

    setGroupVocabulary({
      ...groupVocabulary,
      vocabularies: items
    });
  };

  const isHasDataEmpty = (obj: any): boolean => {
    for (const key in obj) {
      if (typeof obj[key] === 'object') {
        if (isHasDataEmpty(obj[key])) {
          return true;
        }
      } else if (key === 'description' && obj[key] === '') {
        return false;
      } else if (obj[key] === '') {
        return true;
      }
    }
    return false;
  };

  const handleChange = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = event.target;
    setGroupVocabulary((prevState) => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleAddVocabularies = async () => {
    if (isHasDataEmpty(groupVocabulary)) {
      const mesErr = 'Some value is empty';
      toast.error(mesErr);
      return;
    }
    if (userDetail) {
      await addGroupVocabulary({
        ...groupVocabulary,
        user_id: userDetail.id
      });
    }
  };

  return (
    <>
      <CommonHeader />
      <Box mih="100vh" className="bg-[#F6F7FB]">
        <LoadingOverlay
          visible={isLoading}
          zIndex={1000}
          overlayProps={{ radius: 'sm', blur: 2 }}
        />
        <Container pt={150} pb={32}>
          <Group justify="space-between">
            <Title order={2}>Create a new word list:</Title>
            <Button variant="outline" onClick={handleAddVocabularies}>
              Create
            </Button>
          </Group>
          <FormAddListFlashCards
            title={groupVocabulary.title}
            description={groupVocabulary.description}
            onChange={handleChange}
          />
          <DragDropContext onDragEnd={onDragEnd}>
            <Droppable droppableId="ROOT" type="group">
              {(provided) => (
                <div {...provided.droppableProps} ref={provided.innerRef}>
                  {groupVocabulary.vocabularies.map((card, index) => (
                    <Draggable draggableId={card.id.toString()} key={card.id} index={index}>
                      {(provided) => (
                        <div
                          {...provided.dragHandleProps}
                          {...provided.draggableProps}
                          ref={provided.innerRef}>
                          <VocabularyAdd
                            order={index + 1}
                            card={card}
                            onDelete={handleDeleteCard}
                            onChange={handleVocabularyChange}
                          />
                        </div>
                      )}
                    </Draggable>
                  ))}
                </div>
              )}
            </Droppable>
          </DragDropContext>

          <Flex mt={32} bg="white" h={120} justify="center" align="center">
            <Button
              leftSection={<FontAwesomeIcon icon={faPlus} />}
              variant="outline"
              color="yellow"
              onClick={handleAddCard}>
              Add Card
            </Button>
          </Flex>
        </Container>
        <ToastContainer />
      </Box>
    </>
  );
};

export default AddFlashCards;
