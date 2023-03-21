const h2Res = document.querySelector('#h2Res')
const taskVal = document.querySelector('#task');
const textVal = document.querySelector('#todoText');

export default async function editTodoFunction(id) {
    let todoID = id;
    let todoTask = taskVal.value;
    let todoText = textVal.value;
    
    const res = await fetch('http://localhost:5050/todo/', {
        method: 'PATCH',
        credentials: 'include',
        body: JSON.stringify({todoID, todoTask, todoText}),
        headers: {
            'content-type': 'application/json'
        }
    })
    const data = await res.text()
    h2Res.textContent = data;
}