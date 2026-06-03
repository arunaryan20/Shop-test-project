exports.defaultMenu = (app, Menu) => {
  return Menu.buildFromTemplate([
    {
      label: "File",
      submenu: [
        { label: "Login" },
        { label: "Register" },
        { type: "separator" },
        { role: "quit" },
      ],
    },

    // ✅ THIS IS THE REAL VIEW MENU (VS CODE STYLE)
    {
      label: "View",
      submenu: [
        { role: "reload" },
        { role: "forceReload" },
        { role: "toggleDevTools" },

        { type: "separator" },

        { role: "resetZoom" },
        { role: "zoomIn" },
        { role: "zoomOut" },

        { type: "separator" },

        { role: "togglefullscreen" },
      ],
    },

    {
      label: "Help",
      submenu: [{ label: "About" }],
    },
  ]);
};