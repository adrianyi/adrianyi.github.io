// Show more
$(".portfolio .more").click(function(e) {
  e.preventDefault();
  if (this.innerText == "Show more") {
    $(".portfolio-item.hidden")
        .addClass("normal")
        .removeClass("hidden")
        .animate({opacity:1},1000);
    this.innerText = "Show less";
  } else {
    $(".portfolio-item.normal")
        .animate({opacity:0},1000,function(){
            $(".portfolio-item.normal").addClass("hidden")
                                       .removeClass("normal");
            $(".portfolio .more").text("Show more");
        });
  };
});

// Closes the sidebar menu
$("#menu-close").click(function(e) {
  e.preventDefault();
  $("#sidebar-wrapper").toggleClass("active");
});

// Opens the sidebar menu
$("#menu-toggle").click(function(e) {
  e.preventDefault();
  $("#sidebar-wrapper").toggleClass("active");
});

// Scrolls to the selected menu item on the page
$(function() {
  $('a[href*=#]:not([href=#])').click(function() {
    if (location.pathname.replace(/^\//, '') == this.pathname.replace(/^\//, '') || location.hostname == this.hostname) {

      var target = $(this.hash);
      target = target.length ? target : $('[name=' + this.hash.slice(1) + ']');
      if (target.length) {
        $('html,body').animate({
          scrollTop: target.offset().top
        }, 1000);
        return false;
      }
    }
  });
});

// Map scrolling behaviour
$(document).ready(function() {
  $('#map_iframe').addClass('scrolloff');
  $('#map').on('click', function () {
    $('#map_iframe').removeClass('scrolloff');
  });

  $('#map_iframe').mouseleave(function  () {
    $('#map_iframe').addClass('scrolloff');
  });
});