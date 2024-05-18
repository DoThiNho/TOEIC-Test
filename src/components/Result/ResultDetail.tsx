import { Box, Divider, Group } from '@mantine/core';
import QuestionPart from 'components/Question/QuestionPart';
import { useEffect, useState } from 'react';
import { ResultDetailProps } from 'types';

const ResultDetail = (props: ResultDetailProps) => {
  const { items } = props;
  const [images, setImages] = useState<string[]>([]);

  useEffect(() => {
    const images = items.questions.map((question) => question.image);
    const uniqueImages = [...new Set(images)];
    setImages(uniqueImages);
  }, []);

  return (
    <Box p={16}>
      <Box>
        <audio controls className="w-full mb-8">
          <source src={`/src/assets/${items.test.audio_link}`} type="audio/mpeg" />
        </audio>
      </Box>
      {images.map((image: string, index) => (
        <>
          <Group key={index} className="flex-nowrap">
            <Box>
              {image.split(',').map((img) => (
                <img className="mb-4" src={img} alt="image question" />
              ))}
            </Box>
            <Box>
              {items.questions
                .filter((question) => question.image.includes(image))
                .map((question, index) => (
                  <QuestionPart
                    order={index + 1}
                    question={question}
                    updateQuestion={() => {}}
                    isDisable={true}
                    optionUser={items.answers[index].option}
                    isShowAnswer={true}
                  />
                ))}
            </Box>
          </Group>
          <Divider my="md" />
        </>
      ))}
    </Box>
  );
};

export default ResultDetail;
