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
app.commandLine.appendSwitch(
    "ppapi-flash-path",
    path.join(__dirname, pluginName)
);

let mainWindow;

function createWindow() {
    mainWindow = new BrowserWindow({
        width: 800,
        height: 600,
        webPreferences: {
            plugins: true
        }
    });

    mainWindow.setMenuBarVisibility(false);
    mainWindow.setMenu(null);

    mainWindow.loadURL("http://fe.svc.ott.zala.by:8080/new/index.html#/");

    mainWindow.maximize();

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
