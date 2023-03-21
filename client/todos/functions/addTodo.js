const taskInput = document.querySelector('#task');
const taskTextInput = document.querySelector('#todoText');

export default async function addTodo() {

    const task = taskInput.value;
    const text = taskTextInput.value;
   
    const res = await fetch('http://localhost:5050/todo/', {
        method: 'POST',
        credentials: 'include',
        body: JSON.stringify({task, text}),
        headers: {
            'content-type': 'application/json'
        }
    })
    const data = res.text()
    h2Res.textContent = data
}