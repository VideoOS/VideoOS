'use strict'
function previewImg (e) {
  var fragment = new DocumentFragment()
  var devmask = document.createElement('dev')
  devmask.style = 'display: flex; justify-content: center; align-items: center; position: fixed; z-index: 200; top: 0; right: 0; bottom: 0; left: 0; background-color: rgba(0,0,0,0.5);'
  devmask.addEventListener('click', function (e) {
    e.currentTarget.remove()
  })
  var devwrap = document.createElement('dev')
  devwrap.style = 'position: absolute; max-width: 80%; max-height: 80%; z-index: 201;'
  var image = document.createElement('img')
  image.style = 'width: 100%;'
  image.setAttribute('src', e.target.currentSrc)
  devwrap.appendChild(image)
  devmask.appendChild(devwrap)
  fragment.appendChild(devmask)
  document.body.appendChild(fragment)
}

var imgs = document.querySelectorAll('.section img')
for (var i = 0; i < imgs.length; i++) {
  imgs[i].addEventListener('click', previewImg)
}
