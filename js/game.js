/**
 * Tile class
 * @param {int} x     X coordinate of tile
 * @param {int} y     Y coordinate of tile
 * @param {char, bool} value Value of the tile. Either a letter [char] or false if the tile is empty
 */
function Tile(x, y, value) {

  var consonants = ['b', 'c', 'd', 'f', 'g', 'h', 'j', 'k', 'l', 'm', 'n', 'p', 'q', 'r', 's', 't', 'v', 'w', 'x', 'z']
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

    if(consonants.indexOf(value) >= 0){
      console.log('con')
      $(this.elem.tile).addClass('consonant')

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

  // row -> y
  // col -> x

  for(var row = 0; row < height; row++) {
    this.grid[row] = []

    var currentRow = $("<div>").addClass('row')

    
    for(var col = 0; col < width; col++){

      var tile = new Tile(col, row, 'b')
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

function Menu(){
  this.rows = 6
  this.cols = 6
  this.minFill = 0.4
  this.maxFill = 0.6
  this.ele = $('.menuOuterContainer')
  this.doneCallback
  this.controls = {
    sizeUp: $('.menuContent>.sizeSelector>.up')
    , sizeDown: $('.menuContent>.sizeSelector>.down')
    , solo: $('.menuContent>.menuNavigation>.solo')
    , versus: $('.menuContent>.menuNavigation>.versus')
  }
  this.output = {
    gridSize: $('.menuContent>.sizeSelector>.gridSize')
  }

  var that = this
  $(this.controls.sizeUp).on('click', function(){
    if(that.rows < 12 && that.cols < 12){
      that.rows++
      that.cols++
    }
    that.renderOutput()
  })
  $(this.controls.sizeDown).on('click', function(){
    if(that.rows > 4 && that.cols > 4){
      that.rows--
      that.cols--
    }
    that.renderOutput()
  })
  $(this.controls.solo).on('click', function(){
    window['game'].rows = that.rows
    window['game'].cols = that.cols
    window['game'].mode = 'solo'
    that.animateOut()
    typeof that.doneCallback === "function" && that.doneCallback(that)
  })
  $(this.controls.versus).on('click', function(){
    // window['game'].rows = that.rows
    // window['game'].cols = that.cols
    // window['game'].mode = 'versus'
    // that.animateOut()
    // typeof that.doneCallback === "function" && that.doneCallback(that)
    alert("Sorry, Versus mode isn't done yet. Come back soon!")
  })

  this.renderOutput()
  this.animateIn()
}

Menu.prototype.renderOutput = function(){
  $(this.output.gridSize).html(this.rows+'x'+this.cols)
}

Menu.prototype.animateIn = function(){
  $(this.ele).animate({
      left: '0px'
    }, 600)
}

Menu.prototype.animateOut = function(){
  $(this.ele).animate({
      left: '2000px'
    }, 300, function(){
      $(this).hide()
    })
}

Menu.prototype.done = function(callback){
  this.doneCallback = callback
}

$(function() {

  window['game'] = {
    state: 'menu' //menu, playing, ended
    , mode: null  //solo, versus
    , menu: new Menu()
    , grid: null
    , rows: null
    , cols: null
    , minFill: null
    , maxFill: null

  }

  game.menu.done(function(){
    game.grid = new Grid(game.rows, game.cols)
    $('.gridContainer').append(game.grid.elem)
  });

})

