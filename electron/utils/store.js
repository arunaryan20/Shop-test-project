const ElectronStore = require("electron-store");

const store = new ElectronStore.default ? new ElectronStore.default() : new ElectronStore();

module.exports = store;