'use strict'
var anchors = document.querySelectorAll('a')
for (var i = 0; i < anchors.length; i++) {
  var item = anchors[i]
  if (item.host !== location.host) {
    item.target = '_blank'
  }
}
