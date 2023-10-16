let form = document.getElementById("form");
let textInput = document.getElementById("textInput");
let msg = document.getElementById("msg");
let dateInput = document.getElementById("dateInput");
let textarea = document.getElementById("textarea");
let tasks = document.getElementById("tasks");
let add = document.getElementById("add");
let current_status = document.getElementById("status");
// let incomplete = document.getElementById("incomplete");


form.addEventListener('submit', (e) => {
    e.preventDefault();
    formValidation();
})

let formValidation = () => {
    if (textInput.value === "") {
        console.log('failure')
        msg.innerHTML = "Task cannot be blank";
    } else {
        console.log('success')
        msg.innerHTML = "";
        acceptData();
        add.setAttribute("data-bs-dismiss", "modal");
        add.click();

        (() => {
            add.setAttribute("data-bs-dismiss", "");
        })()
    }
}

let data = [{}];

let acceptData = () => {
    data.push({
        text: textInput.value,
        date: dateInput.value,
        description: textarea.value,
        status: current_status.value,
    });

    localStorage.setItem("data", JSON.stringify(data));
    console.log(data);
    createTasks();
};

let createTasks = () => {
    tasks.innerHTML = "";
    data.map((x, y) => {
        return (tasks.innerHTML += `
        <div id=${y} >
                    <span class="fw-bold">${x.text}</span>
                    <span class="small text-secondary">${x.date}</span>
                    <p>${x.description}</p>
                    <p>${x.status}</p>
                    <span class="options">
                        <i onClick="editTask(this)" data-bs-toggle="modal" data-bs-target="#form" class="fas fa-edit"></i>
                        <i onClick="deleteTask(this);createTasks()" class="fas fa-trash-alt"></i>
                    </span>
                </div>
        `);
    });
    resetForm();
}

let deleteTask = (e) => {
    e.parentElement.parentElement.remove();
    data.splice(e.parentElement.parentElement.id, 1);
    localStorage.setItem("data", JSON.stringify(data));
};

let editTask = (e) => {
    const selectedTask = e.parentElement.parentElement;
    // console.log(selectedTask.children);
    // console.log(data[element.parentElement.parentElement.id])
    // let selectedTask = e.parentElement.parentElement;
    // // console.log("THIS SHIT", data[selectedTask.id])
    console.log(selectedTask.children[3]);
    textInput.value = selectedTask.children[0].innerHTML;
    dateInput.value = selectedTask.children[1].innerHTML;
    textarea.value = selectedTask.children[2].innerHTML;
    status.value = selectedTask.children[3].innerHTML;
    add.innerHTML = 'edit';
    // data[selectedTask.id] = {
    //     text: textInput.value,
    //     date: dateInput.value,
    //     textarea: textarea.value,
    // }
    // console.log("DATA", data)
    deleteTask(e);
};


let resetForm = () => {
    textInput.value = "";
    dateInput.value = "";
    textarea.value = "";
    // current_status.value = "";
    // incomplete.value = "";
    add.innerHTML = 'add';
};

(() => {
    data = JSON.parse(localStorage.getItem("data")) || [];
    console.log(data)
    createTasks();
})()