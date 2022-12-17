$(document).ready(onReady);

function onReady() {
    console.log('DOM ready');
    fetchAndRenderTasks();
    $('#addTaskButton').on('click', addTask);
    $('body').on('click', '#deleteTaskButton', deleteTask);
}


// GET(read) and render "tasks" table data
function fetchAndRenderTasks() {
    console.log('DOM rendered');
    // ajax call to server to GET(read)
    $.ajax({
        method: 'GET',
        url: '/tasks'
    }).then((response) => {
        console.log('response from tasksRouter GET', response);
        $('#taskTable').empty();
        for (let task of response) {
            $('#taskTable').append(`
            <tr data-id=${task.id}>
                <td>${task.task}</td>
                <td>${task.completed}</td>
                <td><button id="deleteTaskButton">Remove</button></td>
                <td><button>Complete</button></td>
            </tr>
            `)
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
        console.log(response);
        // bring DOM in sync after POST(create)
        fetchAndRenderTasks();
    }).catch((error) => {
        console.log('error POST client!', error);
    })
}


// DELETE(delete) /tasks
function deleteTask() {
    let idToDelete = $(this).parent().parent().data().id

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