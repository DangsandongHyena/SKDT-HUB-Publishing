var floatSticky = function () {
  var wrap = document.querySelector(".floating-sticky");
  var movWrap = wrap.querySelector(".inner");
  var btnFloating = wrap.querySelector(".btn-floating");
  var btnTop = wrap.querySelector(".btn-gotop");
  window.addEventListener("scroll", function () {
    var scrollTop = window.scrollY || window.pageYOffset || document.body.scrollTop + (document.documentElement && document.documentElement.scrollTop || 0);
    scrollTop > 1E3 ? btnTop.classList.add("show") : btnTop.classList.remove("show")
  });
  btnTop.addEventListener("click", function () { $("html, body").animate({ scrollTop: 0 }, 300) });
  if (btnFloating) btnFloating.addEventListener("click", function () {
    this.parentNode.classList.toggle("on");
    if ($(".floating-sticky .menu-list .inner").hasClass("on")) {
      $(".menu03, .menu02").attr("aria-hidden", "false"); $(".menu03, .menu02").css("display", "block")
    } else {
      $(".menu03, .menu02").attr("aria-hidden", "true"); $(".menu03, .menu02").css("display", "none")
    } event.preventDefault()
  });
  if (device.val == "p")
    $(".floating-sticky .menu-list .inner").draggable({
      stop: function (event, ui) {
        $(event.originalEvent.target).one("click", function (e) { e.stopImmediatePropagation() })
      }
    });
  else {
    var elTop = 0;
    var elLeft = 0;
    movWrap.addEventListener("touchstart", function (e) {
      elTop = e.changedTouches[0].clientY - wrap.offsetTop - movWrap.offsetTop;
      elLeft = e.changedTouches[0].clientX - wrap.offsetLeft - movWrap.offsetLeft
    });
    movWrap.addEventListener("touchmove", function (e) {
      e.stopPropagation();
      e.stopImmediatePropagation();
      e.preventDefault();
      var top = e.changedTouches[0].clientY - wrap.offsetTop - elTop;
      var left = e.changedTouches[0].clientX - wrap.offsetLeft - elLeft;
      movWrap.style.cssText = "top: " + top + "px; left: " + left + "px;"
    }
    )
  }
};