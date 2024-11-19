import { View } from 'react-native'
import React from 'react'
import Todo from '../components/todo'

const index = () => {
  const f = ['hello', 'world', 'how', 'are', 'you']
  return (
    <View 
    style={{
      padding: 5,
      display: 'flex',
      flexDirection: 'column',
      gap: 4,
      
    }}
    >
      <Todo/>
    </View>
  )
}

export default index