import { Box } from '@mantine/core';

interface TextLinkProps {
  labelText: string;
  onClick?: () => void;
}

function TextLink({ labelText, onClick }: TextLinkProps) {
  return (
    <Box onClick={onClick} className="text-blue-500 font-bold cursor-pointer">
      {labelText}
    </Box>
  );
}

export default TextLink;
