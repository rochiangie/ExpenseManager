const { dialog } = require('electron').remote;
const jsonfile = require('jsonfile');
const path = require('path');

const usersFilePath = path.join(__dirname, 'data/users.json');

document.getElementById('login-btn').addEventListener('click', () => {
    // Mostrar ventana de login
});

document.getElementById('register-btn').addEventListener('click', () => {
    // Mostrar ventana de registro
});

function registerUser(username, password) {
    jsonfile.readFile(usersFilePath, (err, users) => {
        if (err) {
            console.error(err);
            return;
        }

        if (users[username]) {
            dialog.showErrorBox('Error', 'El usuario ya existe.');
        } else {
            users[username] = password;
            jsonfile.writeFile(usersFilePath, users, err => {
                if (err) console.error(err);
                else dialog.showMessageBoxSync({ message: 'Usuario registrado con éxito', buttons: ['OK'] });
            });
        }
    });
}

function loginUser(username, password) {
    jsonfile.readFile(usersFilePath, (err, users) => {
        if (err) {
            console.error(err);
            return;
        }

        if (users[username] === password) {
            dialog.showMessageBoxSync({ message: `Bienvenidx ${username}`, buttons: ['OK'] });
            // Mostrar menú principal
        } else {
            dialog.showErrorBox('Error', 'Usuario o contraseña incorrectos.');
        }
    });
}
