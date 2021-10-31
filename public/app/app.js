function initFirebase() {
  firebase.auth().onAuthStateChanged(function (user) {
    if (user) {
      $(".logout").css("display", "block");
      $(".logout-but").css("display", "flex");
      $(".login-but").css("display", "none");
      $(".nav-links").addClass("nav-links--logged-in");
      console.log("connected");
    } else {
      $(".logout").css("display", "none");
      $(".logout-but").css("display", "none");
      $(".login-but").css("display", "flex");
      $(".nav-links").removeClass("nav-links--logged-in");
      console.log("user is not there");
    }
  });
}

function signUp() {
  let password = $("#signup-password").val();
  let email = $("#signup-email").val();
  let fName = $("#signup-fname").val();
  let lName = $("#signup-lname").val();

  firebase
    .auth()
    .createUserWithEmailAndPassword(email, password)
    .then((userCredential) => {
      // Signed in
      var user = userCredential.user;
      console.log(userCredential.user);

      let password = $("#signup-password").val("");
      let email = $("#signup-email").val("");
      let fName = $("#signup-fname").val("");
      let lName = $("#signup-lname").val("");
    })
    .catch((error) => {
      var errorCode = error.code;
      var errorMessage = error.message;
      console.log(errorMessage);
    });
}

function login() {
  let password = $("#login-password").val();
  let email = $("#login-email").val();

  firebase
    .auth()
    .signInWithEmailAndPassword(email, password)
    .then((userCredential) => {
      // Signed in
      var user = userCredential.user;
      console.log("signed in");

      let password = $("#login-password").val("");
      let email = $("#login-email").val("");
    })
    .catch((error) => {
      var errorCode = error.code;
      var errorMessage = error.message;
      console.log(errorMessage);
    });
}

function logout() {
  firebase
    .auth()
    .signOut()
    .then(() => {
      console.log("signed out");
    })
    .catch((error) => {
      console.log(error);
    });
}

function route() {
  let hashTag = window.location.hash;
  let pageID = hashTag.replace("#/", "");

  $("a.current").removeClass("current");
  $(`#${pageID}`).addClass("current");

  if (!pageID) {
    MODEL.getPageData("home");
  } else {
    MODEL.getPageData(pageID);
  }
}

function initListeners() {
  $(window).on("hashchange", route);
  route();

  $(".hamburger").click(function (e) {
    $(".mobile-nav").css("display", "flex");
  });

  $(".click").click(function (e) {
    $(".mobile-nav").css("display", "none");
  });

  $(".mobile-nav-link").click(function (e) {
    $(".mobile-nav").css("display", "none");
  });
}

$(document).ready(function () {
  try {
    let app = firebase.app();
    initFirebase();
    initListeners();
  } catch {
    console.error("yes");
  }
});
