$(document).ready(onReady);

function onReady() {
    console.log('DOM ready');
    fetchAndRenderTasks();
    $('#addTaskButton').on('click', addTask);
    $('body').on('click', '#deleteTaskButton', deleteTask);
    $('body').on('click', '#completeTaskButton', completeTask);
}


// GET(read) and render "tasks" table data
function fetchAndRenderTasks() {
    console.log('DOM rendered');
    // ajax call to server to GET(read)
    $.ajax({
        method: 'GET',
        url: '/tasks'
    }).then((response) => {
        console.log('GET response from tasksRouter:', response);
        $('#taskTable').empty();
        for (let task of response) {
            if (task.completed && task.task) {
                task.completed = 'Yes!';
                $('#taskTable').append(`
                <tr data-id=${task.id}>
                    <td><button id="deleteTaskButton">Remove</button></td>
                    <td id="complete" class="tdTaskCell" class="tdCell">${task.task}</td>
                    <td id="complete" class="tdCell">${task.completed}</td>
                    <td></td>
                </tr>
                `)
            } else {
                task.completed = 'Not Yet';
                $('#taskTable').append(`
                <tr data-id=${task.id}>
                    <td><button id="deleteTaskButton">Remove</button></td>
                    <td class="tdTaskCell" class="tdCell">${task.task}</td>
                    <td class="tdCell">${task.completed}</td>
                    <td><button id="completeTaskButton">Complete</button></td>
                </tr>
                `)
            }
        }
    }).catch((error) => {
        console.log('error GET client!', error);
    })
}


// POST(create) /tasks
function addTask() {
    let newTask = $('#addTaskInput').val();

    let taskToSend = {
        task: newTask,
        completed: false
    };
    // ajax call to server to POST(create)
    $.ajax({
        method: 'POST',
        url: '/tasks',
        data: taskToSend
    }).then((response) => {
        console.log('POST client response:', response);
        // bring DOM in sync after POST(create)
        fetchAndRenderTasks();
    }).catch((error) => {
        console.log('error POST client!', error);
    })

    $('#addTaskInput').val('');
}


// DELETE(delete) /tasks
function deleteTask() {
    let idToDelete = $(this).parent().parent().data().id;
    // ajax call to server to DELETE(delete)
    $.ajax({
        method: 'DELETE',
        url: `/tasks/${idToDelete}`
    }).then((response) => {
        // bring DOM in sync after DELETE
        fetchAndRenderTasks();
    }).catch((error) => {
        console.log('error DELETE client!', error);
    })
}


// PUT(update)
function completeTask() {
    let idToUpdate = $(this).parent().parent().data().id;

    $.ajax({
        // ajax call to server to PUT(update)
        method: 'PUT',
        url: `/tasks/${idToUpdate}`,
        data: {completed: true}
    }).then((response) => {
        console.log('PUT response is:', response);
        // bring DOM in sync after PUT(update)
        fetchAndRenderTasks();
    }).catch((error) => {
        console.log('Error PUT client!', error);
    })
}