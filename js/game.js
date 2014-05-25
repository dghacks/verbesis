/**
 * Tile class
 * @param {int} x     X coordinate of tile
 * @param {int} y     Y coordinate of tile
 * @param {char, bool} value Value of the tile. Either a letter [char] or false if the tile is empty
 */
function Tile(x, y, value) {

  var consentents = ['b', 'c', 'd', 'f', 'g', 'h', 'j', 'k', 'l', 'm', 'n', 'p', 'q', 'r', 's', 't', 'v', 'w', 'x', 'z']
    , vowels = ['a', 'e', 'i', 'o', 'u', 'y']

  this.x = x
  this.y = y

  this.value = (value) ? value : false
  this.elem = {
    tile: $('<div>').addClass('tile')
    , face: $('<div>').addClass('face')
    , base: $('<div>').addClass('base')
    , text: $('<span>')
  }

  if(value){
    $(this.elem.text).html(value)

    if(consentents.indexOf(value) >= 0){
      console.log('con')
      $(this.elem.tile).addClass('consentent')

    }else if(vowels.indexOf(value) >= 0){
      console.log('vow')
      $(this.elem.tile).addClass('vowel')
    }
  }

  $(this.elem.face).append(this.elem.text)
  $(this.elem.tile).append(this.elem.face, this.elem.base)

}

/**
 * Grid class
 * @param {int} width  Number of columns in the grid
 * @param {int} height Number of rows in the grid
 */
function Grid(width, height) {
  this.elem = $('<div>').addClass('grid')
  this.grid = []

  for(var row = 0; row < width; row++) {
    this.grid[row] = []
    var currentRow = $("<div>").addClass('row')
    for(var col = 0; col < height; col++){

      var tile = new Tile(row, col, 'b')
      this.grid[row][col] = tile

      $(currentRow).append(tile.elem.tile)

    }

    $(this.elem).append(currentRow)
  }


  console.log(this.grid)
}

/**
 * Gets the tile object at the specified coordinates
 * @param  {int} x X coordinate of tile, 0-based
 * @param  {int} y Y coordinate of tile, 0-based
 * @return {object Tile}   The corrosponding tile object
 */
Grid.prototype.getTile = function(x, y){
  return this.grid[x][y]
}

/**
 * Shifts the specified row in a given direction,
 * elements at the end of the row wrap back around to the
 * beginning.
 * @param  {int} row       Row number to rotate, 0-based
 * @param  {int} direction Direction to rotate. -1 for left, 1 for right
 */
Grid.prototype.shiftRow = function(row, direction){

}

/**
 * Shifts the specified col in a given direction,
 * elements at the end of the row wrap back around to the
 * beginning.
 * @param  {int} col       Column number to rotate, 0-based
 * @param  {int} direction Direction to rotate. -1 for down, 1 for up
 */
Grid.prototype.shiftCol = function(col, direction){
  
}

Grid.prototype.findWords = function(){

}

$(function() {

  var g = new Grid(10, 10)

  $('body').append(g.elem)

  console.log(g.getTile(2,2))

})

