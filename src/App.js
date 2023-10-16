import { Box, Button, Container, HStack, Input, VStack } from '@chakra-ui/react'
import Message from './components/Message';

function App() {
  return (
    <>
      <Box bg={'red.100'} >
        <Container h={"100vh"} bg={'telegram.100'} className=''  >
          <VStack h='full' paddingY={'4'} >
            <Button colorScheme={'red'} w={'full'} >Log Out</Button>

            {/* Conversation Design - Middle Main Part */}
            {/* <VStack height="lg" w={'full'} bg={'purple.200'} > */}
            <VStack w={'full'} bg={'purple.200'} className='h-[550px] overflow-y-auto' >
              <Message text={"User Name"} />
              <Message text={"User Name"} user={'me'} />
              <Message text={"User Name"} user={'me'} />
              <Message text={"User Name"} user={'me'} />
              <Message text={"User Name"} />
              <Message text={"User Name"} user={'me'} />
              <Message text={"User Name"} user={'me'} />
              <Message text={"User Name"} user={'me'} />
              <Message text={"User Name"} />
              <Message text={"User Name"} user={'me'} />
              <Message text={"User Name"} user={'me'} />
              <Message text={"User Name"} user={'me'} />
              <Message text={"User Name"} />
              <Message text={"User Name"} user={'me'} />
              <Message text={"User Name"} user={'me'} />
              <Message text={"User Name"} user={'me'} />
              <Message text={"User Name"} user={'me'} />
              <Message text={"User Name"} />
            </VStack>

            {/* Footer Send Button */}
            <form action="" className='w-full' >
              <HStack>
                <Input />
                <Button colorScheme={'purple'} type='submit' >Send</Button>
              </HStack>

            </form>

          </VStack>
        </Container>
      </Box>
    </>
  );
}

export default App;
