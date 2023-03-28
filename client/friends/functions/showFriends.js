import getFriendsTodos from "./getFriendsTodos.js";
const friendList = document.querySelector('#friendList');

export async function showFriends() {
    const res = await fetch('http://localhost:5050/friends/show', {
        credentials: 'include'
    });
    const data = await res.json();

    data.forEach((user) => {
        const friendLi = document.createElement('li');
        friendLi.textContent = user.username;
        friendList.appendChild(friendLi);

        const showTodosBtn = document.createElement('button');
        showTodosBtn.class = "showTodosBtn";
        showTodosBtn.textContent = "See todos";
        showTodosBtn.addEventListener('click', () => getFriendsTodos(user.id));
        friendList.appendChild(showTodosBtn);
    })
}