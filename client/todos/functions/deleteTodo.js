const h2Res = document.querySelector('#h2Res')

export default async function deleteTodo(id) {
    const todoID = id;
    
    const res = fetch('http://localhost:5050/todo/', {
        method: 'DELETE',
        credentials: 'include',
        body: JSON.stringify({todoID}),
        headers: {
            'content-type': 'application/json'
        }
    })
    location.reload();
    const data = await res.text();
    h2Res.textContent = data;
}