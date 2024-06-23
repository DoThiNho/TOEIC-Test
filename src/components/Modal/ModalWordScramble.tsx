// src/components/WordScrambleModal.tsx

import { useState, useEffect, useRef } from 'react';
import { Modal, Button, Text, Title, Progress, Group, TextInput, Box, Flex } from '@mantine/core';
import { ModalWordScrambleProps } from 'types';
import CongratulationImage from 'assets/images/congratulation.png';

const ModalWordScramble = ({ words, open, onClose }: ModalWordScrambleProps) => {
  const [currentWord, setCurrentWord] = useState<string>('');
  const [scrambledWord, setScrambledWord] = useState<string>('');
  const [hint, setHint] = useState<string>('');
  const [guess, setGuess] = useState<string>('');
  const [message, setMessage] = useState<string>('');
  const [progress, setProgress] = useState<number>(0);
  const correctAudioRef = useRef<HTMLAudioElement | null>(null);
  const wrongAudioRef = useRef<HTMLAudioElement | null>(null);
  const [isFinished, setIsFinished] = useState<boolean>(false);
  const [countCorrect, setCountCorrect] = useState<number>(0);
  const [usedWords, setUsedWords] = useState<string[]>([]);

  useEffect(() => {
    initGame();
  }, []);

  useEffect(() => {
    if (!open) {
      setIsFinished(false);
      setProgress(0);
    }
  }, [open]);

  const scrambleWord = (word: string) => {
    let wordArray = word.split('');
    for (let i = wordArray.length - 1; i > 0; i--) {
      let j = Math.floor(Math.random() * (i + 1));
      [wordArray[i], wordArray[j]] = [wordArray[j], wordArray[i]];
    }
    return wordArray.join('');
  };

  const initGame = () => {
    let availableWords = words.filter((word) => !usedWords.includes(word.title));
    if (availableWords.length === 0) {
      setMessage('All words have been used!');
      return;
    }
    const randomObj = availableWords[Math.floor(Math.random() * availableWords.length)];
    setUsedWords([...usedWords, randomObj.title]);

    setCurrentWord(randomObj.title);
    setScrambledWord(scrambleWord(randomObj.title));
    setHint(randomObj.mean);
    setGuess('');
    setMessage('');
  };

  const checkWord = () => {
    if (!guess) {
      alert('Please enter the word to check!');
      return;
    }
    if (guess.toLowerCase() !== currentWord.toLowerCase()) {
      if (wrongAudioRef.current) {
        wrongAudioRef.current.play();
      }
      return;
    }
    const newProgress = progress + 100 / words.length;
    setProgress(newProgress);
    if (correctAudioRef.current) {
      correctAudioRef.current.play();
    }
    setCountCorrect((prev) => prev + 1);
    if (newProgress === 100) {
      setIsFinished(true);
      return;
    }
    initGame();
  };

  const handleCharClick = (char: string) => {
    setGuess((prev) => prev + char);
  };

  return (
    <Modal.Root size="94%" p={0} onClose={onClose} opened={open}>
      <Modal.Overlay />
      <Modal.Content>
        <Modal.Header>
          <Modal.Title>Word Scramble Game</Modal.Title>
          <Modal.CloseButton />
        </Modal.Header>
        <Modal.Body px={0}>
          {!isFinished ? (
            <Box>
              <audio ref={correctAudioRef} controls className="w-full mb-8 hidden">
                <source src="/src/assets/audio/duolingo-correct.mp3" type="audio/mpeg" />
              </audio>
              <audio ref={wrongAudioRef} controls className="w-full mb-8 hidden">
                <source src="/src/assets/audio/duolingo-wrong.mp3" type="audio/mpeg" />
              </audio>
              <Title p={16}>Revision: </Title>
              <Progress value={progress} my={32} />
              <Title order={3} variant="h2" mt="md" mb="lg" ta="center">
                {scrambledWord.toUpperCase()}
              </Title>
              <Text ta="center">Hint: {hint}</Text>
              <Group justify="center">
                <TextInput
                  placeholder="Enter a valid word"
                  value={guess}
                  onChange={(e) => setGuess(e.currentTarget.value)}
                  mt="md"
                  size="xl"
                  w="50%"
                />
              </Group>
              <Group justify="center" my={32}>
                {scrambledWord.split('').map((char, index) => (
                  <Button
                    key={index}
                    onClick={() => handleCharClick(char)}
                    style={{ margin: '5px' }}>
                    {char}
                  </Button>
                ))}
              </Group>
              <Group justify="center" gap={64} mb={32}>
                <Button variant="outline" color="gray" mt="md" onClick={initGame}>
                  Refresh Word
                </Button>
                <Button variant="filled" color="blue" mt="md" onClick={checkWord}>
                  Check Word
                </Button>
              </Group>
              {message && (
                <Text mt="md" color={message.startsWith('Congrats') ? 'green' : 'red'}>
                  {message}
                </Text>
              )}
            </Box>
          ) : (
            <Flex p={0} direction="column" align="center" justify="center" h="100%" mih={500}>
              <img width="100%" src={CongratulationImage} alt="img check" className="h-[600px]" />
              <Title order={3}>
                Result: {countCorrect}/{words.length}
              </Title>
              <Button w={200} size="md" onClick={onClose} mt={16} mb={60}>
                Close
              </Button>
            </Flex>
          )}
        </Modal.Body>
      </Modal.Content>
    </Modal.Root>
  );
};

export default ModalWordScramble;
