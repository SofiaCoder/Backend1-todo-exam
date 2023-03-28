const selectFriend = document.querySelector('#selectFriend');
const h2Res = document.querySelector('#h2Res');

export async function addFriend() {
    
    const friendsID = selectFriend.value

    const res = await fetch('http://localhost:5050/friends/add', {
        method: 'POST',
        credentials: 'include',
        body: JSON.stringify({friendsID}),
        headers: {
            'content-type': 'application/json'
        }
    })
    const data = await res.text()
    h2Res.textContent = data;
    setTimeout(() => {
        location.reload();
    },3000)
}