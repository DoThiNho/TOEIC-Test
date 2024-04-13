import { faFacebookF, faGoogle, faTwitter } from '@fortawesome/free-brands-svg-icons';
import { faEnvelope, faLocation, faPhone } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Box, Container, Grid, GridCol, Group, NavLink, Text, Title } from '@mantine/core';
import { FOOTER_INFOS } from 'constants/constant';

const CommonFooter = () => {
  return (
    <Box mt={120} py={64} bg="#05091f" c="gray">
      <Container size="xl">
        <Grid>
          <GridCol span={{ base: 12, md: 6, lg: 4 }}>
            <Title order={3}>TOIEC Test</Title>
            <Text my={16} mt={32}>
              Prepare for the TOEIC exam effectively and for free with our comprehensive resources.
              Access practice tests and vocabulary exercises to enhance your skills and confidence.
              Start preparing for your TOEIC exam with us today!
            </Text>
            <Group gap="xl">
              <FontAwesomeIcon icon={faTwitter} />
              <FontAwesomeIcon icon={faFacebookF} />
              <FontAwesomeIcon icon={faGoogle} />
            </Group>
          </GridCol>
          <GridCol span={{ base: 12, md: 6, lg: 4 }}>
            <Group gap={64} justify="center">
              {FOOTER_INFOS.map((info, index) => (
                <Box key={index}>
                  <Title order={3} mb={28}>
                    {info.title}
                  </Title>
                  {info.links.map((link, index) => (
                    <NavLink key={index} href={`#${link}`} label={link} />
                  ))}
                </Box>
              ))}
            </Group>
          </GridCol>
          <GridCol span={{ base: 12, md: 6, lg: 4 }}>
            <Title order={3}>Have a Questions?</Title>
            <Group mt={32}>
              <FontAwesomeIcon icon={faPhone} />
              <Text> 0935603407 </Text>
            </Group>
            <Group my={16}>
              <FontAwesomeIcon icon={faLocation} />
              <Text> Da Nang </Text>
            </Group>
            <Group>
              <FontAwesomeIcon icon={faEnvelope} />
              <Text> dothinhodut@gmail.com </Text>
            </Group>
          </GridCol>
        </Grid>
      </Container>
    </Box>
  );
};

export default CommonFooter;
