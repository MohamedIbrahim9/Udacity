/**
 *
 * Manipulating the DOM exercise.
 * Exercise programmatically builds navigation,
 * scrolls to anchors from navigation,
 * and highlights section in viewport upon scrolling.
 *
 * Dependencies: None
 *
 * JS Version: ES2015/ES6
 *
 * JS Standard: ESlint
 *
 */

/**
 * Define Global Variables
 *
 */

const navbar = document.getElementById("navbar__list");
const sections = document.querySelectorAll("section");
const menuLinks = document.getElementsByClassName("menu__link");
let currentSection, currentElement, screenMinValue;

/**
 * End Global Variables
 * Start Helper Functions
 *
 */

/**
 * End Helper Functions
 * Begin Main Functions
 *
 */

// build the nav
const BuildNav = function () {
    sections.forEach((section) => {
        const navElement = document.createElement("li");
        navElement.textContent = section.dataset.nav;
        navElement.setAttribute("data-link", section.id);
        navElement.classList.add("menu__link");
        navElement.dataset.nav = section.dataset.nav;
        navbar.insertAdjacentElement('beforeend',navElement);
    });
};

// Add class 'active' to section when near top of viewport
const elementInViewport = function () {
    screenMinValue = 9999999;
    sections.forEach((elem) => {
        let eleBounding = elem.getBoundingClientRect();
        if ((eleBounding.top < screenMinValue) & (eleBounding.top > -399)) {
            screenMinValue = eleBounding.top;
            currentSection = elem;
        }
    });
};

// Scroll to anchor ID using scrollTO event
const scrollTo = function () {
    navbar.addEventListener("click", function (event) {
        event.preventDefault();
        let scrollElemet;
        if (event.target.hasAttribute("data-link")) {
            scrollElemet = event.target;
        } else {
            scrollElemet = event.target.parentElement;
        }
        const elementToScrollTo = document.getElementById(
            scrollElemet.dataset.link
        );
        elementToScrollTo.scrollIntoView({
            behavior: "auto",
            block: "center",
            inline: "nearest",
        });
    });
};

//Add class 'active' to section when near top of viewport
const activeSection = function () {
    window.addEventListener("scroll", function (params) {
        elementInViewport();
        currentSection.classList.add("your-active-class");
        sections.forEach((ele) => {
            if (
                currentSection.classList.contains("your-active-class") &&
                ele.id != currentSection.id
            ) {
                ele.classList.remove("your-active-class");
            }
        });
        currentElement = document.querySelector(
            'li[data-link="' + currentSection.id + '"]'
        );
        currentElement.classList.add("current_Link");
        for (let menuLink of menuLinks) {
            if (
                menuLink.classList.contains("current_Link") &&
                menuLink.dataset.nav != currentElement.dataset.nav
            ) {
                menuLink.classList.remove("current_Link");
            }
        }
    });
};

/**
 * End Main Functions
 * Begin Events
 *
 */

// Build menu
BuildNav();
// Scroll to section on link click
scrollTo();
// Set sections as active
activeSection();
