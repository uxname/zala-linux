const electron = require("electron");
const app = electron.app;
const BrowserWindow = electron.BrowserWindow;

const path = require("path");

let pluginName;
switch (process.platform) {
    case "win32":
        pluginName = "pepflashplayer.dll";
        break;
    case "darwin":
        pluginName = "PepperFlashPlayer.plugin";
        break;
    case "linux":
        pluginName = "libpepflashplayer.so";
        break;
}

const flashPluginPath = path.join(process.resourcesPath, '../assets', pluginName);

app.commandLine.appendSwitch(
    'ppapi-flash-path',
    flashPluginPath
);

// app.commandLine.appendSwitch('ppapi-flash-version', '32.0.0.171');

let mainWindow;

function createWindow() {
    mainWindow = new BrowserWindow({
        width: 800,
        height: 600,
        autoHideMenuBar: true,
        webPreferences: {
            plugins: true
        }
    });

    mainWindow.setMenuBarVisibility(false);
    mainWindow.setMenu(null);

    mainWindow.loadURL("http://fe.svc.ott.zala.by:8080/new/index.html#/");

    mainWindow.maximize();

    // mainWindow.openDevTools();

    mainWindow.on("closed", function () {
        mainWindow = null;
    });
}

app.on("ready", createWindow);

app.on("window-all-closed", function () {
    if (process.platform !== "darwin") {
        app.quit();
    }
});

app.on("activate", function () {
    if (mainWindow === null) {
        createWindow();
    }
});
