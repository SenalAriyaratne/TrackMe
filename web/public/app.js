$('#footer').load('footer.html');
const API_URL = 'http://localhost:5000/api';
$('#navbar').load('navbar.html');


//const devices = JSON.parse(localStorage.getItem('devices')) || [];

const responce = $.get(`${API_URL}/devices`)
.then(response => {
    response.forEach(device => {
        $('#devices tbody').append(`
        <tr>
        <td>${device.user}</td>
        <td>${device.name}</td>
        </tr>`
        );
    });
})
.catch(error => {
        console.log(`Error: ${error}`);
    });
const users = JSON.parse(localStorage.getItem('users')) || [];
var isAuthenticated = "";


/*devices.forEach(function (device) {
    $('#devices tbody').append(`
    <tr>
    <td>${device.user}</td>
    <td>${device.name}</td>
    </tr>`
    );
});*/

users.forEach(function (users) {

    $('#users tbody').append(`
    <tr>
    <td>${users.username}</td>
    <td>${users.password}</td>
    <td>${users.confirmpassword}</td>
    </tr>`
    );
});
$('#add-device').on('click', () => {
    const name = $('#name').val();
    const user = $('#user').val();
    const sensorData = [];
    const body = {
        name,
        user,
        sensorData
    };
    $.post('http://localhost:3001/devices', body)
        .then(response => {
            location.href = '/';
        })
        .catch(error => {
            console.error(`Error: ${error}`);
        });
});

/*
$('#add-device').on('click', function () {
    const user = $('#user').val();
    const name = $('#name').val();
    devices.push({ user, name });
    localStorage.setItem('devices', JSON.stringify(devices));
    location.href = '/';


});*/

$('#send-command').on('click', function () {
    const command = $('#command').val();
    console.log(`command is: ${command}`);
});

$('#register').on('click', function () {
    const usernamenew = $('#username').val();
    const password = $('#password').val();
    const confpassword = $('#confirmpassword').val();

    const exists = users.find(users => users.username === usernamenew);

    if (password == confpassword) {
        if (exists) {
            $('#message').append("User already exists.");

        }
        else {
            users.push({ username: usernamenew, password: password });
            localStorage.setItem('users', JSON.stringify(users));
            location.href = 'login.html';


        }
    }
});

$('#login').on('click', function () {
    const nameuser = $('#username').val();
    const password = $('#password').val();


    const exists = users.find(users => users.username === nameuser);
    if (exists && password == exists.password) {
        localStorage.setItem('isAuthenticated', 'true');
        location.href = '/';
    }
    else {
        localStorage.setItem('isAuthenticated', 'false');
        $('#message').append("Wrong username or password");



    }



});

const logout = () => {
    localStorage.removeItem('isAuthenticated');
    location.href = 'login.html';
}




