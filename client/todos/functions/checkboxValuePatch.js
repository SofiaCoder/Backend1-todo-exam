export default async function checkboxValue(boxVal, id) {
    let boxValue = boxVal;
    let todoID = id;
    
    const res = await fetch('http://localhost:5050/todo/val', {
        method: "PATCH",
        credentials: "include",
        body: JSON.stringify({boxValue, todoID}),
        headers: {
            'content-type': 'application/json'
        }
    })
    const resText = await res.text();
    console.log(resText)
}