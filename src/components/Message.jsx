import React from 'react'
import { HStack, Avatar, Text } from '@chakra-ui/react';


const Message = ({ text, uri, user }) => {
    return (
        <HStack alignSelf={user == 'me'? 'flex-end': 'flex-start'} className='px-2 py-2 rounded bg-gray-100' >
            
            {
                user !== 'me' && <Avatar src={uri} />
            }
            
            <Text> {text} </Text>
            {
                user === 'me' && <Avatar src={uri} />
            }
        </HStack>
    )
}

export default Message