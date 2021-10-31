var MODEL = (function () {
  var _getPageData = function (pageID) {
    let pageData = pageID;

    console.log(pageData);
    $.get(`pages/${pageData}/${pageData}.html`, function (data) {
      $("#app").html(data);
    });

    if (pageData === "login") {
      $(".content").css("background-image", "none");
      $(".content").css("background-color", "#ffd972");
    }
    if (pageData === "home") {
      $(".content").css("background-color", "transparent");
      $(".content").css(
        "background-image",
        `linear-gradient(
        to right,
        rgba(242, 92, 84, 0.6),
        rgba(242, 92, 84, 0.6)
      ),
      url(images/hero.jpg)`
      );
    }
  };

  return {
    getPageData: _getPageData,
  };
})();
