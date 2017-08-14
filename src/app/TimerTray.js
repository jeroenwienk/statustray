const path = require('path');
const electron = require('electron');
const { app, Tray, Menu } = electron;

const iconPath = path.join(__dirname, '../../assets/windows-icon.png');
const menuConfig = Menu.buildFromTemplate([
  {
    label: 'Quit',
    click: () => {
      app.quit();
    }
  }
]);

class TimerTray extends Tray {
  constructor(mainWindow, screen) {
    super(iconPath);

    this.mainWindow = mainWindow;
    this.screen = screen;
    this.on('click', this.onClick);
    this.on('right-click', this.onRightClick);

    this.setToolTip('Announcer');

  }

  onClick(event, bounds) {
    const { x, y } = bounds;
    const { width, height } = this.mainWindow.getBounds();
    const screenSize = this.screen.getPrimaryDisplay().size;

    if (this.mainWindow.isVisible()) {
      this.mainWindow.hide();
    } else {
      this.mainWindow.setBounds({
        width,
        height,
        x: screenSize.width - width - 32,
        y: height
      });
      this.mainWindow.show();
    }
  }

  onRightClick() {
    this.popUpContextMenu(menuConfig);
  }

}

module.exports = TimerTray;