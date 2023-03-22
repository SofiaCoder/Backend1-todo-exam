import deleteTodo from "./deleteTodo.js";
import checkboxValue from "./checkboxValuePatch.js";
import showTodoToEdit from "./showTodoToEdit.js";
const checkboxSection = document.querySelector('.checkboxSection');

const createTodoBox = (data) => {
    data.forEach((todo) => {
        const id = todo.id 
        let boxVal = todo.value;

        //Create Div-box
        const todoBox = document.createElement('div');
        todoBox.className = "todoBox";

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

        const task = document.createElement('span');
        task.className = "todoTask";
        task.textContent= `Task: ${todo.task}`

        const text = document.createElement('span');
        text.className = "todoText";
        text.textContent= ` Description: ${todo.text}`

        //Create checkbox input
        const label = document.createElement('label');
        label.htmlFor = 'todo' + id;
        label.className = "todoLabel"
        label.appendChild(task)
        label.appendChild(text)

        //Create edit button with functions
        const editBtn = document.createElement('button');
        editBtn.className = "editBtn";
        editBtn.textContent = "Edit";
        editBtn.addEventListener('click', () => showTodoToEdit(id));

        //Create delete button with functions
        const deleteBtn = document.createElement('button');
        deleteBtn.className = "deleteBtn";
        deleteBtn.textContent = "X";
        deleteBtn.addEventListener('click', () => deleteTodo(id));
        
        //If there's no text dont write out 'null'
        if(todo.text === null) todo.text = '';

        //Create checkbox with parameters as label-text
        todoBox.appendChild(checkBox)
        todoBox.appendChild(label)
        todoBox.appendChild(editBtn)
        todoBox.appendChild(deleteBtn)
        checkboxSection.appendChild(todoBox)
    })
}

export {createTodoBox as default};
