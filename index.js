const { app, BrowserWindow, ipcMain } = require('electron');

function createWindow() {
    const win = new BrowserWindow({
        height: 600,
        width: 800,
        webPreferences: {
            nodeIntegration: true,
            contextIsolation: false,
        },
        title: 'My App',
        frame: false,
    });

    win.setTitle('My App');
    win.loadFile('src/index.html');

    ipcMain.on('closeApp', () => {
        win.close();
    })

    ipcMain.on('maximize', () => {
        win.maximize()
    })
    ipcMain.on('unmaximize', () => {
        win.unmaximize()
    })
    ipcMain.on('minimize', () => {
        win.minimize()
    })
    ipcMain.on('openDevTools', () => {
        win.webContents.openDevTools();
    })
}

app.whenReady().then(createWindow);

app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') {
        app.quit();
    }
});

app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) {
        createWindow();
    }
});


ipcMain.on('newWindow', () => {
    createWindow();
})
