const electron = require('electron');
const TimerTray = require('./app/TimerTray');
const MainWindow = require('./app/MainWindow');

const { app } = electron;
let mainWindow = null;
let tray = null;
let screen = null;


app.on('ready', () => {
  console.log('App is ready');
  screen = electron.screen;
  setMainWindow();
  setTray();
});

function setMainWindow() {
  const url = `file://${__dirname}/index.html`;
  mainWindow = new MainWindow(url, screen);
}

function setTray() {
  tray = new TimerTray(mainWindow, screen);
}