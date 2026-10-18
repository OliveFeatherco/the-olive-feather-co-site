(function () {
  'use strict';
  var wall = document.querySelector('.makers-album .gallery-wall');
  if (!wall) return;
  var pieces = Array.from(wall.children);
  var desktop = window.matchMedia('(min-width: 951px)');
  var frame;

  pieces.forEach(function (piece) {
    var image = piece.querySelector('img');
    piece.classList.toggle('is-landscape', Number(image.getAttribute('width')) > Number(image.getAttribute('height')));
    image.addEventListener('load', schedule);
  });

  function layout() {
    wall.classList.toggle('is-collage', desktop.matches);
    pieces.forEach(function (piece) {
      if (!desktop.matches) {
        piece.style.removeProperty('grid-row-end');
        return;
      }
      var stagger = parseFloat(getComputedStyle(piece).paddingTop) || 0;
      var button = piece.querySelector('.gallery-reveal');
      var bounds = button.getBoundingClientRect();
      // The portrait sources differ by less than a pixel at this size. Give
      // them equal slots so a rounding difference cannot leave a card-sized hole.
      var height = piece.classList.contains('is-landscape')
        ? bounds.height + stagger
        : bounds.width / (753 / 1000) + 2;
      piece.style.gridRowEnd = 'span ' + Math.ceil(height + 6);
    });
  }

  function schedule() {
    cancelAnimationFrame(frame);
    frame = requestAnimationFrame(layout);
  }

  if ('ResizeObserver' in window) new ResizeObserver(schedule).observe(wall);
  else window.addEventListener('resize', schedule);
  desktop.addEventListener('change', schedule);
  layout();
})();

