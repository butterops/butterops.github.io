// ======================= theme change =======================

var localTheme = localStorage.getItem("theme");
var rootEleme = document.getElementById("root");
var selectThemeElem = document.querySelectorAll(".select-theme");
var selectThemeItemElem = document.querySelectorAll(".select-theme__item");

var setMetaColor = function (themeColor) {
  var metaMsapplicationTileColor = document.getElementsByName(
    "msapplication-TileColor"
  )[0];
  var metaThemeColor = document.getElementsByName("theme-color")[0];
  var metaMsapplicationNavbuttonColor = document.getElementsByName(
    "msapplication-navbutton-color"
  )[0];
  var metaAppleMobileWebAappStatusBarStyle = document.getElementsByName(
    "apple-mobile-web-app-status-bar-style"
  )[0];

  if (themeColor.includes("dark")) {
    metaMsapplicationTileColor.setAttribute("content", "#fcfcfa");
    metaThemeColor.setAttribute("content", "#403E41");
    metaMsapplicationNavbuttonColor.setAttribute("content", "#403E41");
    metaAppleMobileWebAappStatusBarStyle.setAttribute("content", "#403E41");
  } else if (themeColor.includes("light")) {
    metaMsapplicationTileColor.setAttribute("content", "#555");
    metaThemeColor.setAttribute("content", "#eee");
    metaMsapplicationNavbuttonColor.setAttribute("content", "#eee");
    metaAppleMobileWebAappStatusBarStyle.setAttribute("content", "#eee");
  } else if (themeColor.includes("hacker")) {
    metaMsapplicationTileColor.setAttribute("content", "#e3cd26");
    metaThemeColor.setAttribute("content", "#252526");
    metaMsapplicationNavbuttonColor.setAttribute("content", "#252526");
    metaAppleMobileWebAappStatusBarStyle.setAttribute("content", "#252526");
  } else if (themeColor.includes("solarized")) {
    metaMsapplicationTileColor.setAttribute("content", "#d3af86");
    metaThemeColor.setAttribute("content", "#51412c");
    metaMsapplicationNavbuttonColor.setAttribute("content", "#51412c");
    metaAppleMobileWebAappStatusBarStyle.setAttribute("content", "#51412c");
  } else if (themeColor.includes("kimbie")) {
    metaMsapplicationTileColor.setAttribute("content", "#586e75");
    metaThemeColor.setAttribute("content", "#eee8d5");
    metaMsapplicationNavbuttonColor.setAttribute("content", "#eee8d5");
    metaAppleMobileWebAappStatusBarStyle.setAttribute("content", "#eee8d5");
  }
};

if (localTheme) {
  selectThemeItemElem
    ? selectThemeItemElem.forEach(function (elem) {
        if (elem.text.trim() === localTheme) {
          elem.classList.add("is-active");
        } else {
          elem.classList.remove("is-active");
        }
      })
    : null;

  setMetaColor(localTheme);
} else {
  setMetaColor(rootEleme.className);
}

// Change theme
var changeTheme = function (theme) {
  selectedThemeVariant = theme
  localStorage.setItem("theme", selectedThemeVariant);
  setMetaColor(selectedThemeVariant);

  rootEleme.removeAttribute("class");
  rootEleme.classList.add("theme__" + selectedThemeVariant);
  selectThemeElem.forEach(function (rootElem) {
    rootElem.querySelectorAll("a").forEach(function (elem) {
      if (elem.classList) {
        if (elem.text.trim() === selectedThemeVariant) {
          if (!elem.classList.contains("is-active")) {
            elem.classList.add("is-active");
          }
        } else {
          if (elem.classList.contains("is-active")) {
            elem.classList.remove("is-active");
          }
        }
      }
    });
  });
  
  if (window.mermaid) {
    if (
      selectedThemeVariant === "dark" ||
      selectedThemeVariant === "hacker"
    ) {
      mermaid.initialize({ theme: "dark" });
      location.reload();
    } else {
      mermaid.initialize({ theme: "default" });
      location.reload();
    }
  }

  var utterances = document.getElementById("utterances");
  if (utterances) {
    utterances.querySelector("iframe").contentWindow.postMessage(
      {
        type: "set-theme",
        theme:
          selectedThemeVariant === "dark" ||
          selectedThemeVariant === "hacker"
            ? "photon-dark"
            : selectedThemeVariant === "kimbie"
            ? "github-dark-orange"
            : "github-light",
      },
      "https://utteranc.es"
    );
  }

  var twitterCards = document.querySelectorAll(".twitter-timeline");
  if (twitterCards) {
    window.postMessage({
      type: "set-twitter-theme",
      theme:
        selectedThemeVariant === "light" ||
        selectedThemeVariant === "solarized"
          ? "light"
          : "dark",
    });
  }
}

// Disable dropdown items display, on theme change button hover
var themeList = document.getElementsByClassName(
  "dropdown-content select-theme"
);
for (var i = 0; i < themeList.length; i++) {
  themeList[i].style.display = 'none';
}

// Available themes
var themes = []
var themeSelectOptions = document.querySelector(".select-theme");
themeSelectOptions.querySelectorAll(".select-theme__item").forEach(function (theme) {
  themes.push(theme.text.trim());
});

// Rotate theme feature
var rotateTheme = function (e) {
  var index = themes.indexOf(localStorage.getItem("theme"));
  if(index >= 0 && index < themes.length - 1){ 
    var newTheme = themes[(index + 1)]
  }else{
    var newTheme = themes[0]
  }
  changeTheme(newTheme);
};

// Bind rotateTheme() to theme change button click event
var themeBaloon = document.getElementsByClassName(
  "dropdown-trigger navbar__slide-down"
);
for (var i = 0; i < themeBaloon.length; i++) {
  themeBaloon[i].addEventListener("click", rotateTheme, false);
}
