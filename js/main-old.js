console.log('running')

var config = {
      rows: 6
    , cols: 6
    , maxFill: 0.4
    , minVowels: 1
}

var consentents = ['b', 'c', 'd', 'f', 'g', 'h', 'j', 'k', 'l', 'm', 'n', 'p', 'q', 'r', 's', 't', 'v', 'w', 'x', 'z']
  , vowels = ['a', 'e', 'i', 'o', 'u', 'y']
  , letters = []
  , table = []
  , numLetters = Math.floor(config.rows*config.cols*config.maxFill)
  , numVowels = Math.ceil(numLetters*config.minVowels)

console.log(numLetters, numVowels)


for(var i = 0; i < config.rows; i++){
    table[i] = [];
    for(var j = 0; j < config.cols; j++){
        table[i][j] = false;
    }
}


for(var i = 0; i < numLetters; i++){
    
    letters[i] = {}

    while(!(letters[i]['x'] && !letters[i]['y'])){ // logic????
        var tempX = Math.floor(Math.random()*config.rows)
          , tempY = Math.floor(Math.random()*config.cols)
        
        if(!(table[tempX] && table[tempX][tempY])){

            console.log(tempX, tempY)
            letters[i] = {
              x : tempX
            , y : tempY
            } 

            if(letters.length <= numVowels){
              letters[i]['letter'] = vowels[ Math.floor(Math.random() * vowels.length) ]
            }else{
              letters[i]['letter'] = consentents[ Math.floor(Math.random() * consentents.length) ]
            }

            table[tempX][tempY] = letters[i]
            break;

        }
    }
  
}

$(function(){

  var letter = $('.letter').clone()

  for(var i = 0; i < config.rows; i++){

      var row = $('<div>').addClass('row')
      $('.grid').append(row)
      for(var j = 0; j < config.cols; j++){
          innerLetter = letter.clone()

          if(table[i][j]){
            $($(innerLetter).children()[0]).html(table[i][j]['tile'])
          }


          //console.log($(innerLetter))//.html(j)
          row.append(innerLetter);    
      }
      
  }

})
