const friendsTodosDiv = document.querySelector('#friendsTodosDiv');

export default async function getFriendsTodos(friendID) {

    const userID = friendID;

    const res = await fetch('http://localhost:5050/friends/todos',{
        method: 'POST',
        credentials: 'include',
        body: JSON.stringify({userID}),
        headers: {
            'content-type': 'application/json'
        }
    })
    
    if (res.status === 404) {
        const data = await res.text()
        friendsTodosDiv.innerHTML = ''
        const responsMessage = document.createElement('p');
        responsMessage.textContent = "This user has no todos"
        friendsTodosDiv.appendChild(responsMessage);
    } else {
            friendsTodosDiv.innerHTML = ''
    }
    
    const data = await res.json()

    data.forEach((todo) => {
        const responsMessage = document.createElement('ul');
        const todoList = document.createElement('li');
        todoList.textContent = `Task: ${todo.task}, Text: ${todo.text}`;
        friendsTodosDiv.appendChild(responsMessage);
        responsMessage.appendChild(todoList);
    })
}