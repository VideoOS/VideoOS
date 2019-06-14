'use strict'
function isHash (path) {
  if (path.substr(0, 1) === '#') {
    return true
  }
  return false
}
var blankPaths = [
  '/docs/videoos-ios-sdk',
  '/docs/videoos-android-sdk',
  '/docs/videoos-lua-app',
]

var anchors = document.querySelectorAll('a')
for (var i = 0; i < anchors.length; i++) {
  var itemA = anchors[i]
  var href = itemA.href
  var paths = href.split('/')
  var lastPath = paths[paths.length - 1]
  if (itemA.host !== location.host && !isHash(lastPath)) {
    itemA.target = '_blank'
  }

  for (var j = 0; j < blankPaths.length; j++) {
    var itemB = blankPaths[j]
    if (itemA.pathname.includes(itemB)) {
      itemA.target = '_blank'
    }
  }
}

