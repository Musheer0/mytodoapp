import { View, Text, TextInput, Button, FlatList } from 'react-native'
import React, { useReducer, useState } from 'react'

interface Task{
    id:number,
    task:string
}
interface Todos{
    todos:Task[]
}
interface ADD{
    type:'ADD',
    payload:string
}
interface REMOVE{
    type:'REMOVE',
    payload:number
}
interface EDIT{
    type:'EDIT',
    payload:Task
}
interface RESET{
    type:'RESET',
}

const initialState = {todos: []} as Todos
function reduces(state:Todos, action:ADD|REMOVE|EDIT|RESET):Todos{
    switch(action.type){
        case 'ADD':
            return {
                todos:[
                    ...state.todos, {id:state.todos.length+1, task:action.payload}
                ]
            }
            case 'REMOVE':
                return {
                    todos:state.todos.filter((todo)=>todo.id!==action.payload)
                }
        case 'RESET':
            return {
                todos: []
            }
        case "EDIT":
            return{
                 todos: state.todos.map((todo)=>{
                    if(todo.id===action.payload.id) return action.payload
                    return todo
                 })
            }
            default: 
                return state
    }
}
const Todo = () => {
    const [state, dispactch]= useReducer(reduces, initialState);
    const [updatingTask, setUpdatingTask] = useState<Task|null>(null)
    function addTODO(){
        if(input.trim()) dispactch({type: 'ADD', payload: input})
            setInput('')
    }
    const [input, setInput] = useState('')
  return (
    <View
    style={{
        display: 'flex',
        gap:10
    }}
    >
      <Text
      style={{
        textAlign: 'center',
        fontWeight: 'bold',
        fontSize: 23
      }}
      >Task App</Text>
        <TextInput
        value={input}
        style={{
            borderWidth:1,
            borderColor: 'blue'
        }}
        onSubmitEditing={()=>{
            addTODO()
        }}
        onChangeText={setInput}/>
        <Button title='add' onPress={()=>{
           addTODO()
        }}/>

        {updatingTask &&
        <View
        style={{
            display: 'flex',
            gap:10,
            borderWidth:2,
            borderColor:'orange',
            padding:6,
            borderStyle: 'dotted'
        }}
        >

<TextInput
        value={updatingTask.task}
        style={{
            borderWidth:1,
            borderColor: 'blue'
        }}
        onSubmitEditing={()=>{
            dispactch({type: 'EDIT', payload:updatingTask});
            setUpdatingTask(null)
        }}
        onChangeText={(e)=>{
            setUpdatingTask({
                id: updatingTask.id,
                task:e
            })
        }}/>
        <Button
        color='green'
        title='update' onPress={()=>{
         dispactch({type: 'EDIT', payload:updatingTask})
         setUpdatingTask(null)

        }}/>
          <Button
                  color='orange'
          title='cancel' onPress={()=>{
         setUpdatingTask(null)

        }}/>
        </View>
        }
            <Button title='reset' onPress={()=>{
         dispactch({type: 'RESET'})
        }}/>
        <FlatList
        data={state.todos}
        keyExtractor={(item)=>item.id.toString()}
        style={{
            display: 'flex',
            gap: 10,
            flexDirection: 'column',
            flexWrap: 'wrap'
        }}
        renderItem={({item})=>{
            return (
                <View style={{
                    padding: 5,
                    borderWidth: 1,
                    borderColor: 'gray',
                    shadowColor: 'gray',
                    shadowOpacity: .5,
                    shadowRadius:.43,
                    display: 'flex',
                    alignItems: 'center',
                    gap: 10,
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    borderRadius:10,
                    flexWrap: 'wrap',
                    width: '100%',
                    marginBlock:4
                }}>
                   <Text>{item.id}:{item.task}</Text>
                   <View
                   style={{
                    display: 'flex',
                    flexDirection: 'row',
                    gap: 2
                   }}
                   >
                   <Button
                   onPress={()=>{
                       setUpdatingTask(item)
                   }}
                   title='EDIT'    
                   color='orange'
                   />
                   <Button
                   onPress={()=>{
                    dispactch({type: 'REMOVE', payload:item.id})
                   }}
                   title='Delete'   
                   color='red'
                   />
                    </View>
                </View>
            )
        }}
        />
    </View>
  )
}

export default Todo