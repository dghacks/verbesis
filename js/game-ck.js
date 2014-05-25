/**
 * Tile class
 * @param {int} x     X coordinate of tile
 * @param {int} y     Y coordinate of tile
 * @param {char, bool} value Value of the tile. Either a letter [char] or false if the tile is empty
 */function Tile(e,t,n){this.consonants=["b","c","d","f","g","h","j","k","l","m","n","p","q","r","s","t","v","w","x","z"];this.vowels=["a","e","i","o","u","y"];this.x=e;this.y=t;this.value=n?n:!1;this.elem={tile:$("<div>").addClass("tile"),face:$("<div>").addClass("face"),base:$("<div>").addClass("base"),text:$("<span>")};$(this.elem.face).append(this.elem.text);$(this.elem.tile).append(this.elem.face,this.elem.base);this.setValue(n)}function Grid(e,t){this.elem=$("<div>").addClass("grid");this.grid=[];this.width=e;this.height=t;for(var n=0;n<t;n++){this.grid[n]=[];var r=$("<div>").addClass("row"),i=$("<div>").addClass("arrow left");for(var s=0;s<e;s++){var o=new Tile(s,n,!1);this.grid[n][s]=o;$(r).append(o.elem.tile)}var u=/^[a-z]/;$(this.elem).append(r)}}function Menu(){this.rows=6;this.cols=6;this.minFill=.4;this.maxFill=.6;this.ele=$(".menuOuterContainer");this.doneCallback;this.controls={sizeUp:$(".menuContent>.sizeSelector>.up"),sizeDown:$(".menuContent>.sizeSelector>.down"),solo:$(".menuContent>.menuNavigation>.solo"),versus:$(".menuContent>.menuNavigation>.versus")};this.output={gridSize:$(".menuContent>.sizeSelector>.gridSize")};var e=this;$(this.controls.sizeUp).on("click",function(){if(e.rows<20&&e.cols<20){e.rows++;e.cols++}e.renderOutput()});$(this.controls.sizeDown).on("click",function(){if(e.rows>4&&e.cols>4){e.rows--;e.cols--}e.renderOutput()});$(this.controls.solo).on("click",function(){window.game.rows=e.rows;window.game.cols=e.cols;window.game.mode="solo";e.animateOut();typeof e.doneCallback=="function"&&e.doneCallback(e)});$(this.controls.versus).on("click",function(){alert("Sorry, Versus mode isn't done yet. Come back soon!")});this.renderOutput();this.animateIn()}Tile.prototype.setValue=function(e){if(e){$(this.elem.text).html(e);this.consonants.indexOf(e)>=0?$(this.elem.tile).addClass("consonant"):this.vowels.indexOf(e)>=0&&$(this.elem.tile).addClass("vowel")}};Grid.prototype.getTile=function(e,t){return this.grid[e][t]};Grid.prototype.shiftRow=function(e,t){};Grid.prototype.shiftCol=function(e,t){};Grid.prototype.findWords=function(){};Grid.prototype.randomDistribute=function(e){e=e.split("");for(var t=e.length-1;t<this.width*this.height;t++)e.push(!1);var n=function(e){var t=e.length,n,r;while(t>0){r=Math.floor(Math.random()*t);t--;n=e[t];e[t]=e[r];e[r]=n}return e};e=n(e);var t=0;for(var r=0;r<this.height;r++)for(var i=0;i<this.width;i++){this.getTile(i,r).setValue(e[t]);t++}};Menu.prototype.renderOutput=function(){$(this.output.gridSize).html(this.rows+"x"+this.cols)};Menu.prototype.animateIn=function(){$(this.ele).animate({left:"0px"},600)};Menu.prototype.animateOut=function(){$(this.ele).animate({left:"2000px"},300,function(){$(this).hide()})};Menu.prototype.done=function(e){this.doneCallback=e};