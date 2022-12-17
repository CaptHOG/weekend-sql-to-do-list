$(document).ready(onReady);

function onReady() {
    console.log('DOM ready');
    fetchAndRenderTasks();
    $('#addTaskButton').on('click', addTask);
}


// GET(read) and render "tasks" table data
function fetchAndRenderTasks() {
    console.log('DOM rendered');
    // ajax call to server to GET(read)
    $.ajax({
        method: 'GET',
        url: '/tasks'
    }).then((response) => {
        console.log('response from tasksRouter', response);
        $('#taskTable').empty();
        for (let task of response) {
            $('#taskTable').append(`
            <tr>
                <td>${task.task}</td>
                <td>${task.completed}</td>
                <td><button>Remove</button></td>
                <td><button>Complete</button></td>
            </tr>
            `)
        }
    })
}


// POST(create)
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
        fetchAndRenderTasks();
    }).catch((error) => {
        console.log('something wrong in addTask POST!', error);
    })
}


// DELETE(delete)

// PUT(update)