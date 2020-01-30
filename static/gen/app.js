function fnSelect(objId) {
  fnDeSelect();
  if (document.selection) {
    var range = document.body.createTextRange();
    range.moveToElementText(document.getElementById(objId));
    range.select();
  } else if (window.getSelection) {
    var range = document.createRange();
    range.selectNode(document.getElementById(objId));
    window.getSelection().addRange(range);
  }
}

function fnDeSelect() {
  if (document.selection) {
    document.selection.empty();
  } else if (window.getSelection) {
    window.getSelection().removeAllRanges();
  }
}

function barrelrole(ele, direction, speed, callback) {
  function rotate(degree) {
    ele.css({
      WebkitTransform: 'rotate(' + degree + 'deg)',
      '-moz-transform': 'rotate(' + degree + 'deg)',
      'transform': 'rotate(' + degree + 'deg)'
    });
    if (degree > -360 && degree < 360) {
      timer = setTimeout(function() {
        rotate(degree + direction);
      }, speed);
    } else {
      callback(ele);
    }
  }
  rotate(0);
}

function getRandomInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function doabarrelrole(num = 30) {
  var peppytalk = ['Do a barrel roll', 'Do a barrel roll', 'Do a barrel roll', 'Do a barrel roll', '(Z or R twice)!', '(Z or R twice)!', 'PEPPY', '<img src="/static/img/peppy.jpg" height="70px" width="70px">', '<img src="/static/img/peppy.jpg" height="30px" width="30px">', '<img src="/static/img/peppy.jpg" height="120px" width="120px">'];
  var addpeppys = true;

  function addpeppy() {
    var rotation = getRandomInt(-360, 360);
    var top = getRandomInt(-150, $(window).height() + 150);
    var left = getRandomInt(-150, $(window).width());
    var direction = [-1, 1][getRandomInt(0, 1)];
    var speed = getRandomInt(5, 15);
    var next_peppy = getRandomInt(10, 200);
    var content = peppytalk[getRandomInt(0, peppytalk.length)];
    var peppy = $('<div class="peppy"/>').appendTo('body').css({
      'transform': 'rotate(' + rotation + 'deg)',
      'top': top + 'px',
      'left': left + 'px'
    }).html(content);
    barrelrole(peppy, direction, speed, function(ele) {
      ele.remove();
    });
    if (addpeppys) {
      setTimeout(function() {
        addpeppy();
      }, next_peppy);
    }
  }
  addpeppy();
  var code = "90,90".split(',');
  var kkeys = [];
  var barrelrolling = false;
  var eles = 'header,nav,footer,#gear,section,img,aside,.card,hr';
  $(window).keydown(function(e) {
    kkeys.push(e.which);
    while (kkeys.length > code.length) {
      kkeys.shift();
    }
    if (kkeys.toString() === code.toString()) {
      kkeys = [];
      if (!barrelrolling) {
        barrelrolling = true;
        addpeppys = false;
        barrelrole($(eles), 1, 10, function() {
          barrelrolling = false;
        });
      }
    }
  });
  var code2 = "82,82".split(',');
  var kkeys2 = [];
  $(window).keydown(function(e) {
    kkeys2.push(e.which);
    while (kkeys2.length > code2.length) {
      kkeys2.shift();
    }
    if (kkeys2.toString() === code2.toString()) {
      kkeys2 = [];
      if (!barrelrolling) {
        barrelrolling = true;
        addpeppys = false;
        barrelrole($(eles), -1, 10, function() {
          barrelrolling = false;
        });
      }
    }
  });
}
$(document).ready(function() {
  $('pre').before("<img alt='Select' class='preselect' src='/static/img/spanner.png' title='Select' />");
  $('pre').each(function(i) {
    $(this).attr('id', 'preselect' + i);
  });
  $('.preselect').bind('click', function(e) {
    var id = $(this).next().attr('id');
    fnSelect(id);
  });
  (function() {
    var lightboxed = false;
    $('figure.photo a.view').on('click', function(event) {
      showview.call(this);
      event.preventDefault();
    });
    $(document).keydown(function(event) {
      if (event.which === 27 && lightboxed) {
        hideview.call($('.viewer'));
      } else if (event.which === 86) {
        if (lightboxed) {
          hideview.call($('.viewer'));
        } else {
          showview.call($('figure.photo a.view'));
        }
      }
    });
    if (window.location.hash.includes("#lightbox") && $('figure.photo a.view').length) {
      showview.call($('figure.photo a.view'));
    }

    function hideview() {
      $(this).fadeOut('fast', function() {
        $(this).remove();
      });
      window.location.hash = "";
      lightboxed = false;
    }

    function showview() {
      var help = $('<div><aside>Navigate using <kbd>j</kbd> and <kbd>k</kbd> keys; <kbd>v</kbd> key for toggling the large version</aside></div>');
      var viewer = $('<div class="viewer"/>').appendTo('body').html(help.html() + $(this).html()).click(function(event) {
        hideview.call(this);
        event.preventDefault();
      });
      var img = viewer.find('img');
      img.attr('src', img.attr('data-fullsrc')).on('load', function() {
        $(this).css('margin-top', -$(this).height() / 2).css('margin-left', -$(this).width() / 2);
        viewer.hide();
        viewer.css('visibility', 'visible');
        viewer.fadeIn('fast');
        window.location.hash = "#lightbox";
        lightboxed = true;
      });
    }
  })();
  (function() {
    $(document).keydown(function(event) {
      var url;

      function buildUrl(url) {
        var u = url;
        if (window.location.hash) {
          u += window.location.hash;
        } else {
          u += '#article-title';
        }
        return u;
      }
      switch (event.which) {
        case 74:
          if ($('nav a.prev').length === 1) {
            url = buildUrl($('nav a.prev').attr('href'));
          }
          break;
        case 75:
          if ($('nav a.next').length === 1) {
            url = buildUrl($('nav a.next').attr('href'));
          }
          break;
      }
      if (url) {
        document.location = url;
      }
    });
  })();
  (function() {
    var code = "38,38,40,40,37,39,37,39,66,65".split(',');
    var kkeys = [];
    $(window).keydown(function(e) {
      kkeys.push(e.which);
      while (kkeys.length > code.length) {
        kkeys.shift();
      }
      if (kkeys.toString() === code.toString()) {
        kkeys = [];
        doabarrelrole();
      }
    });
  })();
});
