function Tile(position, value) {
  // Error handling for position parameter
  if (!position || typeof position !== 'object' || isNaN(position.x) || isNaN(position.y)) {
    throw new Error('Invalid position object provided.');
  }

  // Validation for value parameter
  if (!isPowerOfTwo(value)) {
    throw new Error('Tile value must be a power of 2.');
  }

  this.x                = position.x;
  this.y                = position.y;
  this.value            = value || 2;

  this.previousPosition = null;
  this.mergedFrom       = null; // Tracks tiles that merged together
}

// Method to save the current position as the previous position
Tile.prototype.savePosition = function () {
  this.previousPosition = { x: this.x, y: this.y };
};

// Method to update the position of the tile
Tile.prototype.updatePosition = function (position) {
  this.x = position.x;
  this.y = position.y;
};

// Method to serialize the tile object
Tile.prototype.serialize = function () {
  return {
    position: {
      x: this.x,
      y: this.y
    },
    value: this.value
  };
};

// Utility function to check if a number is a power of two
function isPowerOfTwo(num) {
  return (num !== 0) && ((num & (num - 1)) === 0);
}
