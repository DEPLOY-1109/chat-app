import { useEffect, useRef, useState } from 'react';
import { Box, Button, Container, HStack, Input, VStack } from '@chakra-ui/react'
import Message from './components/Message';

import { GoogleAuthProvider, getAuth, onAuthStateChanged, signInWithPopup, signOut } from 'firebase/auth'
import { app } from './firebase'

// ----------------------------------
import { getFirestore, addDoc, collection, orderBy, serverTimestamp, onSnapshot, query } from 'firebase/firestore'


// -----------------------------------
const auth = getAuth(app);

const loginHandler = () => {
  const provider = new GoogleAuthProvider();

  signInWithPopup(auth, provider);
}

const db = getFirestore(app);

function App() {
  const divScrollToLatestMsg = useRef(null); // element.scrollIntoView() Method
  const [user, setUser] = useState(false);
  console.log(user);

  const [message, setMessage] = useState("");
  const [conversation, setConversation] = useState([])
  
  
  const submitHandler = async (e) => {
    e.preventDefault();
    
    try {
      setMessage(""); // after msg is sent make it empty
      
      await addDoc(collection(db, "Messages"), {
        text: message,
        uid: user.uid,
        uri: user.photoURL,
        createdAt: serverTimestamp(),
      });
    
      divScrollToLatestMsg.current.scrollIntoView({ behavior: 'smooth' });
      
    } catch (error) {
      alert(error)
    }
  }
  
  // -----------------------
  useEffect(() => {
    const myQuery = query(collection(db, 'Messages'), orderBy('createdAt', 'asc'));
    const unsubscribe = onAuthStateChanged(auth, (data) => {
      // console.log(data);
      setUser(data);
    });
    
    // const unsubscribeForMessage = onSnapshot(collection(db, "Messages"), (snap) => {
      const unsubscribeForMessage = onSnapshot(myQuery, (snap) => {
      setConversation(
        snap.docs.map((item) => {
          // const data = item.data;
          const id = item.id; // all items id from database is retrieved          

          // return {a: "abcd"};
          // return {id, a: "abcd"};
          return { id, ...item.data() };
        }));
    })
    
    return () => {
      unsubscribe();
      unsubscribeForMessage();
    }
    
  }, [])
  // }, [user])

  const logoutHandler = () => {
    signOut(auth)
  }



  return (
    <>
      {
        user ? (<Box bg={'red.100'} >
          <Container h={"100vh"} bg={'telegram.100'} className=''  >
            <VStack h='full' paddingY={'4'} >
              <Button onClick={logoutHandler} colorScheme={'red'} w={'full'} >Log Out</Button>

              {/* Conversation Design - Middle Main Part */}
              {/* <VStack height="lg" w={'full'} bg={'purple.200'} > */}
              <VStack w={'full'} bg={'purple.200'} className='h-[550px] overflow-y-auto' >
                {/* <Message text={"Sample Msg"} user={'me'} /> */}
                {/* <Message text={"Sample Msg"} /> */}

                {
                  conversation.map((item) => (
                    <Message
                      key={item.id}
                      user={item.uid === user.uid ? "me" : "other"}
                      text={item.text}
                      uri={item.uri}
                    />
                  ))
                }

                <div ref={divScrollToLatestMsg} ></div>
              </VStack>

              {/* Footer Send Button */}
              <form onSubmit={submitHandler} action="" className='w-full' >
                <HStack>
                  <Input value={message} onChange={(e) => setMessage(e.target.value)} placeholder='Write your message here ...' />
                  <Button colorScheme={'purple'} type='submit' >Send</Button>
                </HStack>

              </form>

            </VStack>
          </Container>
        </Box>) :
          (<VStack h={'100vh'} justifyContent={'center'} >
            <Button onClick={loginHandler} colorScheme='blue' size={'md'} mb={6}>Login to your account</Button>
          </VStack>)
      }
    </>
  );
}

export default App;
