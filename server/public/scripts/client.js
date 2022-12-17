$(document).ready(onReady);

function onReady() {
    console.log('DOM ready');
    fetchAndRenderTasks();
    
}


// GET and render "tasks" table data
function fetchAndRenderTasks() {
    console.log('fetchAndRenderTasks');

    $.ajax({
        method: 'GET',
        url: '/tasks'
    }).then((response) => {
        console.log(response);
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