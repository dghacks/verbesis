function WordList(words){

  // Remove duplicates from the list
  var possible = words.filter(function(elem, pos) {
    return words.indexOf(elem) == pos;
  })

  console.log(possible)

  var valid = possible

  var apiRequest = function(list) {
    // var callbackName = 'jsonp_callback_' + Math.round(100000 * Math.random());
    // window[callbackName] = function(data) {
    //     delete window[callbackName];
    //     document.removeChild(script);
    //     callback(data);
    // };

    // var script = document.createElement('script');
    // script.src = (url.indexOf('?') >= 0 ? '&' : '?') + 'callback=' + callbackName;
    // document.appendChild(script);
  }

  var apiCheck = function(list) {
    // The array is empty, no match
    if(list.length == 0) return false

    //var apiResult = apiRequest() //true or false

    // if(!apiResult){
    //   for(var i = 0; i < list.length; i++){
    //     var index = valid.indexOf(list[i])
    //     valid.splice(index, 1)
    //   }
    //   return false
    // }else if()

    var middleIndex = Math.ceil(list.length/2)
      , left = list.slice(0, middleIndex)
      , right = list.slice(middleIndex)
      , leftResult = apiCheck(left)
      , rightResult = apiCheck(right)



      console.log(left, right)

  }

  apiCheck(possible)

  //console.log(possible)


}

console.log("")
l1 = new WordList(["dog", "hka", "bar", "watch", "dog", "asdad", "rat"])
console.log("")
l2 = new WordList(["dog", "hka", "bar", "watch", "dog", "asdad"])
