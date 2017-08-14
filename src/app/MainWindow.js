const path = require('path');
const electron = require('electron');
const { app, BrowserWindow } = electron;

class MainWindow extends BrowserWindow {
  constructor(url, screen) {
    super({
      width: 512,
      height: 512,
      frame: true,
      resizable: true,
      show: false
    });

    this.screen = screen;
    this.loadURL(url);
    this.on('blur', this.handleMainWindowBlur);

  }

  handleMainWindowBlur() {
    //this.hide();
  }
}

module.exports = MainWindow;