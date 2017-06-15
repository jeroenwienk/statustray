const electron = require('electron');
const path = require('path');

const { app, BrowserWindow, Tray } = electron;
let mainWindow = null;
let tray = null;
let screen = null;


app.on('ready', () => {
  console.log('App is ready');
  setMainWindow();
  setTray();
  screen = electron.screen;
  setTrippyShit();
});

function setMainWindow() {
  mainWindow = new BrowserWindow({
    width: 256,
    height: 512,
    //frame: false,
    resizable: false,
    show: false
  });
  mainWindow.loadURL(`file://${__dirname}/index.html`);
}

function setTrippyShit() {
  setTimeout(() => {
    setInterval(() => {
      const { width, height } = mainWindow.getBounds();
      const screenSize = screen.getPrimaryDisplay().size;
      const random = Math.random();

      const newX = Math.abs(Math.round(screenSize.width - width - (random * screenSize.width)));
      console.log(newX);

      mainWindow.setBounds({
        width,
        height,
        x: newX,
        y: height
      });
    }, 1000);
  }, 1000);
}

function setTray() {
  const iconName = process.platform === 'win32' ? 'windows-icon.png' : 'iconTemplate.png';
  const iconPath = path.join(__dirname, `../assets/${iconName}`);
  tray = new Tray(iconPath);

  tray.on('click', (event, bounds) => {
    const { x, y } = bounds;
    const { width, height } = mainWindow.getBounds();
    const screenSize = screen.getPrimaryDisplay().size;

    if (mainWindow.isVisible()) {
      mainWindow.hide();
    } else {
      mainWindow.setBounds({
        width,
        height,
        x: screenSize.width - width - 32,
        y: height
      });
      mainWindow.show();
    }
  })
}