import addTodo from "./functions/addTodo.js";
import addFriend from "../friends/functions/addFriend.js";
import findFriends from "../friends/functions/findFriends.js";
import showFriends from "../friends/functions/showFriends.js";
import createTodoCheckbox from "./functions/createTodoCheckbox.js";
const nameH1 = document.querySelector('#name');
const headline = document.querySelector('h1');
const addBtn = document.querySelector('#addTodo');
const saveBtn = document.querySelector('#saveTodo');
const addFriendBtn = document.querySelector('#addFriend');

saveBtn.style.visibility = 'hidden';

//Fetch todos and username from database 
const res = await fetch('http://localhost:5050/todo/id',
    {credentials: "include"});

    if (res.status === 401) {
        headline.textContent = "You are outlogged"
        setTimeout(()=> { window.location.href="/client/authentication/index.html"}, 5000)
    };

    const data = await res.json();

    nameH1.textContent = data[0].username;

    //Create checkboxes with buttons of fetched data
    createTodoCheckbox(data);

    //Finds all users and displays them in a select-menu
    findFriends();

    //Adds selected friend to inlogged user, saves into database 
    addFriendBtn.addEventListener('click', (e) => {
        e.preventDefault()
        addFriend()
});

//Post todos to database
addBtn.addEventListener('click', () => addTodo());

//Gets inlogged users friends an displays them
showFriends();





