function WordList(words, callback){

  // Remove duplicates from the list
  var possible = words.filter(function(elem, pos) {
    return words.indexOf(elem) == pos;
  })

  //console.log(possible)

  var checkCounter = 1
    , requestCounter = 1
    , callbackCounter = 1

  var apiRequest = function(list, callback) {

    //console.log("request ", requestCounter++, ": ", list)

    var callbackName = 'jsonp_callback_' + new Date().getTime() + "" + Math.floor(Math.random()*1000)
      , requestString = list.join(',')
      , requestUrl = "http://api.pearson.com/v2/dictionaries/ldoce5/entries?limit=25&headword=" + requestString + "&jsonp=" + callbackName
    //console.log("Request: ", requestUrl)
    window[callbackName] = function(data) {

        document.head.removeChild(window[callbackName]["script"])

        delete window[callbackName]

        //console.log("Response: ", data)
        callback(data)
    };

    window[callbackName]["script"] = document.createElement('script')
    window[callbackName]["script"].src =  requestUrl

    document.head.appendChild(window[callbackName]["script"])
  }

  var valid = []

  var apiCheck = function(list, callback) {

    // The array is empty, no match
    if(list.length == 0){
      callback(list)
      return false
    }

    apiRequest(list, function (data){

      if(data.count == 0){
        callback()
        return false
      }else if(list.length == 1){
        valid.push(list[0])
        callback()
        return true
      }

      var pivot = Math.ceil(list.length/2)
        , left = list.slice(0, pivot)
        , right = list.slice(pivot)
        , race = 0

      apiCheck(left, function (data){
        //console.log('valid: ', valid)
        if(race == 1){
          callback(list)
        }else{
          race++
        }
      })
      apiCheck(right, function (data){
        //console.log('valid: ', valid)
        if(race == 1){
          callback(list)
        }else{
          race++
        }
      })

    })

  }

  apiCheck(possible, function() {
    this.words = valid
    typeof callback === "function" && callback()
  })

  //console.log(possible)

}

function Word(word, callback){
  this.isValid = true
  var that = this
  if(word.length <= 1) this.isValid = false
  var checkWord = function(callback) {
    var callbackName = 'jsonp_callback_' + new Date().getTime() + "" + Math.floor(Math.random()*1000)
      , requestUrl = "http://api.pearson.com/v2/dictionaries/ldoce5/entries?limit=25&headword=" + word + "&jsonp=" + callbackName
    
    window[callbackName] = function(data) {

        document.head.removeChild(window[callbackName]["script"])

        delete window[callbackName]

        callback(data)
    };

    window[callbackName]["script"] = document.createElement('script')
    window[callbackName]["script"].src =  requestUrl

    document.head.appendChild(window[callbackName]["script"])
  }

  checkWord(function(data){
    console.log(data)
    if(data.count == 0){
      that.isValid = false
    }
    typeof callback === "function" && callback()
  })
}

function RandomWords(minChars, maxChars) {
  this.words = []
  this.done = false

  var that = this

  var numChars = 0

  var parseData = function(data) {
    var lastRequest = data
    var currWord = lastRequest.results[0].headword

    currWord = currWord.split(/[^A-Za-z]/).filter(function(n){return !!n }).join('').toLowerCase()
    console.log(currWord)
    numChars += currWord.length
    that.words.push(currWord)
    
    if (numChars < minChars) {
      apiRequest()
    } /*else if (numChars > minChars) {
      //to do: meet minChar as close as possible with other words in object
    }*/ else {
      that.done = true
      typeof that.callback == "function" && that.callback(that.words)
    }
  }

  var apiRequest = function() {
    var randomOffset = Math.floor(Math.random()*254290)
    var callbackName = 'jsonp_callback_' + new Date().getTime() + "" + Math.floor(Math.random()*1000)
      , requestUrl = "http://api.pearson.com/v2/dictionaries/entries?limit=25&offset=" + randomOffset + "&jsonp=" + callbackName
    
    window[callbackName] = function(data) {

        document.head.removeChild(window[callbackName]["script"])

        delete window[callbackName]


        parseData(data)
    }

    window[callbackName]["script"] = document.createElement('script')
    window[callbackName]["script"].src =  requestUrl

    document.head.appendChild(window[callbackName]["script"])
  }

    apiRequest()
}


RandomWords.prototype.getWords = function() {
  return this.words
}

RandomWords.prototype.onFinish = function(callback) {
  this.callback = callback
}


function searchExample(){
  var arr = ["sakdn", "cat", "building", "coder", "hack", "asdlknasd", "coin", "water", "asdkas", "sadasd", "true", "false"]
  console.log("Input array: ", arr)
  l2 = new WordList(arr, function(){
  console.log("Output array: ", this.words)
 })
}

// var a = new RandomWords(200, 300)

// words = a.getWords()

// l2 = new Word("bad", function(){
//   console.log(l2)
// })

//l1 = new WordList(["asd"])
// console.log("")
 // l2 = new WordList(["asdf", "hog", "hka", "bar", "watch", "dog", "asdad", "rabbit", "doll"], function(){
 //  console.log(this.words)
 // })
