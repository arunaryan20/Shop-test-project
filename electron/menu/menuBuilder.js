const { Menu } = require("electron");
const defaultMenu = require("./defaultMenu").defaultMenu;
const authMenu = require("./authMenu").authMenu;

let isLoggedIn = false;

exports.setAppMenu = (app) => {
  const menu = isLoggedIn
    ? authMenu(app, Menu)
    : defaultMenu(app, Menu);

  Menu.setApplicationMenu(menu);
};

exports.setLoginStatus = (status, app) => {
  isLoggedIn = status;
  exports.setAppMenu(app);
};