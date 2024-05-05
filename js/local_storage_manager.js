window.fakeStorage = {
  _data: {},

  setItem: function (id, val) {
    return this._data[id] = String(val);
  },

  getItem: function (id) {
    return this._data.hasOwnProperty(id) ? this._data[id] : undefined;
  },

  removeItem: function (id) {
    return delete this._data[id];
  },

  clear: function () {
    return this._data = {};
  }
};

function LocalStorageManager() {
  this.bestScoreKey = "bestScore";
  this.gameStateKey = "gameState";

  var supported = this.localStorageSupported();
  this.storage = supported ? window.localStorage : window.fakeStorage;
}

LocalStorageManager.prototype.localStorageSupported = function () {
  var testKey = "test";

  try {
    var storage = window.localStorage;
    storage.setItem(testKey, "1");
    storage.removeItem(testKey);
    return true;
  } catch (error) {
    console.error("Local storage is not supported:", error);
    return false;
  }
};

LocalStorageManager.prototype.getBestScore = function () {
  try {
    return parseInt(this.storage.getItem(this.bestScoreKey)) || 0;
  } catch (error) {
    console.error("Error getting best score from local storage:", error);
    return 0;
  }
};

LocalStorageManager.prototype.setBestScore = function (score) {
  try {
    this.storage.setItem(this.bestScoreKey, score);
  } catch (error) {
    console.error("Error setting best score in local storage:", error);
  }
};

LocalStorageManager.prototype.getGameState = function () {
  try {
    var stateJSON = this.storage.getItem(this.gameStateKey);
    return stateJSON ? JSON.parse(stateJSON) : null;
  } catch (error) {
    console.error("Error getting game state from local storage:", error);
    return null;
  }
};

LocalStorageManager.prototype.setGameState = function (gameState) {
  try {
    this.storage.setItem(this.gameStateKey, JSON.stringify(gameState));
  } catch (error) {
    console.error("Error setting game state in local storage:", error);
  }
};

LocalStorageManager.prototype.clearGameState = function () {
  try {
    this.storage.removeItem(this.gameStateKey);
  } catch (error) {
    console.error("Error clearing game state from local storage:", error);
  }
};

// Example usage:
var localStorageManager = new LocalStorageManager();
var bestScore = localStorageManager.getBestScore();
console.log("Best score:", bestScore);

var gameState = localStorageManager.getGameState();
console.log("Game state:", gameState);
