exports.authMenu = (app, Menu) => {
  return Menu.buildFromTemplate([
    {
      label: "File",
      submenu: [
        { label: "Dashboard" },
        { type: "separator" },
        { label: "Logout" },
        { role: "quit" },
      ],
    },
    {
      label: "Inventory",
      submenu: [{ label: "Products" }, { label: "Stock" }],
    },
    {
      label: "Sales",
      submenu: [{ label: "New Sale" }, { label: "History" }],
    },
    {
      label: "Reports",
      submenu: [{ label: "Daily Report" }, { label: "Monthly Report" }],
    },
  ]);
};
