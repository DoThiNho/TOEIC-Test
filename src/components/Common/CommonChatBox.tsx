// import { Widget, addResponseMessage } from 'react-chat-widget';
// import { useEffect } from 'react';
// import { useAddQuestionMutation } from 'store/services/chatApi';

// const CommonChatBox = () => {
//   const [addQuestion, { data }] = useAddQuestionMutation();

//   useEffect(() => {
//     if (!data) {
//       addResponseMessage('Welcome to this **awesome** chat!');
//     } else {
//       addResponseMessage(data.response);
//     }
//   }, [data]);

//   const handleNewUserMessage = async (newMessage: string) => {
//     console.log(`New message incoming! ${newMessage}`);
//     // Now send the message throught the backend API
//     await addQuestion(newMessage);
//   };
//   return (
//     // <ChatBot steps={steps} floating={true} />
//     <Widget handleNewUserMessage={handleNewUserMessage} />
//   );
// };

// export default CommonChatBox;
