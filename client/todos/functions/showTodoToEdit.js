const taskVal = document.querySelector('#task');
const textVal = document.querySelector('#todoText');
const saveBtn = document.querySelector('#saveTodo');
const addBtn = document.querySelector('#addTodo');
import editTodoFunction from './editTodoFunction.js';

export default async function showTodoToEdit(id) {
    saveBtn.style.visibility = 'visible';
    const res = await fetch('http://localhost:5050/todo/id',
    {credentials: "include"})
    const data = await res.json()

    const todoIndex = data.findIndex((todo) => todo.id === id)

    taskVal.value = data[todoIndex].task;
    textVal.value = data[todoIndex].text;
    addBtn.style.visibility = 'hidden';
    
    saveBtn.addEventListener('click', () => editTodoFunction(id));
}