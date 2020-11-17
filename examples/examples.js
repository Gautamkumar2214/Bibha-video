/* global hljs:false, Egg:false, $:false */

/**
 * JS specific to the examples.
 */
 'use strict';

(function() {
  // Determine path to examples
  var examplesPath = (window.location.pathname.match(/\/examples\//gi)) ?
    './' : './examples/';

  // Get example HTML output
  var html = $('<div>').append($('.example-html').clone()).html()
    .replace(/\s+\n/gi, '\n')
    .replace(/^    /gm, '');
  $('.example-html-output pre code').text(html);

  // Need to do things when all is ready
  $(document).ready(function() {
    // Get example JS output
    var js = $('#example-javascript').html();
    if (js && js.trim && js.trim()) {
      js = js.trim().replace(/(^\s)\s+\n/gi, '\n').replace(/^      /gm, '');
      $('.example-javascript-output').show();
      $('.example-javascript-output pre code').text(js);
    }

    // Get example CSS output
    var css = $('#example-css').html();
    if (css && css.trim && css.trim()) {
      css = css.trim().replace(/(^\s)\s+\n/gi, '\n').replace(/^      /gm, '');
      $('.example-css-output').show();
      $('.example-css-output pre code').text(css);
    }

    // Get example custom template if there is one
    var template = $('<div>').append($('#custom-template').clone()).html();
    if (template && template.trim && template.trim()) {
      template = template.trim().replace(/(^\s)\s+\n/gi, '\n').replace(/^    /gm, '');
      $('.example-template-output').show();
      $('.example-template-output pre code').text(template);
    }

    // Load highlightJS
    hljs.initHighlightingOnLoad();
  });

  // Egg$ all around
  var egg = new Egg();
  var bibhavideo = true;
  var orig = {};
  egg.addCode([52, 52, 52], function() {
    if (bibhavideo) {
      $('#bibha-video-image').attr('src', examplesPath + 'images/bibha-video-replacement.png');
      $('#bibha-video-image-small').attr('src', examplesPath + 'images/v-head-250-replacement.png');
      $('.menu ul li img').attr('src', examplesPath + 'images/bibha-video-head-100-replacement.png');
      $('.bibha-video-container, .bibha-video-container .tt-spine-bottom').css({
        'background-image': 'url(' + examplesPath + 'images/bibha-video-bg-replacement.jpg)',
        'backgroun-position': 'top left'
      });
      orig.entryBG = $('.bibha-video-container .tt-entry').css('background');
      $('.bibha-video-container .tt-entry').css('background', 'rgba(255, 255, 255, 0.9)');
      $('*').each(function() {
        var $this = $(this);
        var tag = $this.prop('tagName').toLowerCase();
        if (!$this.html().match(/<|>/g) && ['style', 'script', 'html'].indexOf(tag) === -1) {
          $this.html($this.html().replace(/s/gi, '$'));
        }
      });

      $('.bibha-video-container img').each(function() {
        $(this).data('orig-src', $(this).attr('src'));
        $(this).attr('src', examplesPath + 'images/bibha-video-main-replacement-01.jpg');
      });

      $('.bibha-video-container iframe').each(function() {
        $(this).data('orig-src', $(this).attr('src'));
        $(this).attr('src', 'https://www.youtube.com/embed/iP6XpLQM2Cs');
      });
    }
    else {
      $('#bibha-video-image').attr('src', examplesPath + 'images/bibha-video-medium.png');
      $('#bibha-video-image-small').attr('src', examplesPath + 'images/bibha-video-head-250.png');
      $('.menu ul li img').attr('src', examplesPath + 'images/tik-tok-head-right-grey-100.png');
      $('.bibha-video-container, .bibha-video-container .tt-spine-bottom').css('background-image', 'none');
      $('.bibha-video-container .tt-entry').css('background', orig.entryBG);
      $('*').each(function() {
        var $this = $(this);
        var tag = $this.prop('tagName').toLowerCase();
        if (!$this.html().match(/<|>/g) && ['style', 'script', 'html'].indexOf(tag) === -1) {
          $this.html($this.html().replace(/\$/gi, 's'));
        }
      });

      $('.bibha-video-container img').each(function() {
        $(this).attr('src', $(this).data('orig-src'));
      });

      $('.bibha-video-container iframe').each(function() {
        $(this).attr('src', $(this).data('orig-src'));
      });
    }

    bibhavideo = !bibhavideo;
  }).listen();
})();
