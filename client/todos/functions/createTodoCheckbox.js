import deleteTodo from "./deleteTodo.js";
import checkboxValue from "./checkboxValuePatch.js";
import showTodoToEdit from "./showTodoToEdit.js";
const checkboxDiv = document.querySelector('.checkboxDiv');

const createTodoCheckbox = (data) => {
    data.forEach((todo) => {
        const id = todo.id 
        let boxVal = todo.value;

        //Create checkbox input
        const checkBox = document.createElement('input');
        checkBox.type = 'checkbox';
        checkBox.name = 'todo';
        checkBox.className = 'todoCheckbox'
        checkBox.id = "todo" + id;
        if (boxVal == 1) checkBox.checked = true;
        checkBox.onchange = async function() {
            if (checkBox.checked) {
                boxVal = 1;
            } else {
                boxVal = 0;
            }
            checkboxValue(boxVal, id)
        }

        //Create checkbox input
        const label = document.createElement('label');
        label.htmlFor = 'todo' + id;
        label.className = "todoLabel"

        //Create edit button with functions
        const editBtn = document.createElement('button');
        editBtn.className = "editBtn";
        editBtn.textContent = "Edit";
        editBtn.addEventListener('click', () => showTodoToEdit(id));

        //Create delete button with functions
        const deleteBtn = document.createElement('button');
        deleteBtn.className = "deleteBtn";
        deleteBtn.textContent = "Delete";
        deleteBtn.addEventListener('click', () => deleteTodo(id));
        
        //If there's no text dont write out 'null'
        if(todo.text === null) todo.text = '';

        //Create checkbox with parameters as label-text
        label.textContent = `Task: ${todo.task} - Description: ${todo.text}`
        checkboxDiv.appendChild(checkBox)
        checkboxDiv.appendChild(label)
        checkboxDiv.appendChild(editBtn)
        checkboxDiv.appendChild(deleteBtn)
    })
}

export {createTodoCheckbox as default};
