const selectFriend = document.querySelector('#selectFriend')

export default async function findFriends() {

    const res = await fetch('http://localhost:5050/friends',
    {credentials: "include"});
    const data = await res.json();

    data.forEach((user) => {
        const friend = document.createElement('option');
        friend.id = user.username;
        friend.value = user.id;
        friend.textContent = user.username;
        selectFriend.appendChild(friend)
    })
}