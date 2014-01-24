/*!
 * diap
 * ---
 * ---
 *
 * Copyright (C) 2013 Raphaël Marques
 */
"use strict";

/*********************************************
 * GLOBAL FUNCTIONS
 *********************************************/

function getPresentSlide() {
	var x = document.querySelectorAll(".reveal .slides section.present:not(.past):not(.future):not(.stack)");
	for(var i = 0, len = x.length; i < len; ++i)
		if(x[i].classList.length === 1)
			return x[i];
	return null;
}

function isDataSetOn(obj, data_marker) {
    return obj.getAttribute(data_marker) !== null;
}

function getStyleElement(element, style_element, pre_computed) {
    if(!pre_computed)
        pre_computed = false;
    if (style_element !== "" && element !== "") {
        var e = pre_computed ? element : document.querySelector(element);
        var s = (e === null ? null : document.defaultView.getComputedStyle(e));
        var r = (s === null ? null : s.getPropertyValue(style_element));
        return r === null ? "" : r;
    }
    return "";
}

/*********************************************
 * STYLE FORMATTING FUNCTIONS
 *********************************************/

function initStyleFormatting() {
    applyStyle("data-align", "text-align");
    applyStyle("data-highlighted", "color:white;text-shadow:none;background", "rgba(184, 20, 20, 0.8)");
}

function applyStyle(data_marker, CSSProperty, defaultValue) {
    if (!defaultValue)
        defaultValue = "";
    var t = document.querySelectorAll("[" + data_marker + "]");
    var x;
    for (var i = 0, len = t.length; i < len; ++i) {
        x = t[i].getAttribute(data_marker);
        t[i].setAttribute("style", CSSProperty + ":" + (x === "" ? defaultValue : x) + ";" + t[i].style.cssText);
        t[i].removeAttribute(data_marker);
    }
}

/*********************************************
 * IMAGES
 *********************************************/

function initImages() {
    var x = document.querySelectorAll(".reveal .slides>section img");

    for (var i = 0, len = x.length; i < len; ++i) {
        var y = document.createElement("div");
        y.setAttribute("style", "width:" + x[i].width + "px;height:" + perfectShape(x[i].height) + "px;margin: auto auto 0 auto;");
        var p = x[i].parentNode;

        if (!isDataSetOn(x[i], "data-no-bottom-shadow"))
            y.setAttribute("class", "imgShadow");
        else x[i].removeAttribute("data-no-bottom-shadow");

        if (!isDataSetOn(x[i], "data-no-title-caption") && x[i].title !== "") {
            p.removeChild(x[i]);
            var s = x[i].title.length * 9.5;
            var q = document.createElement("div");
            q.setAttribute("class", "img_caption");
            q.innerText = x[i].title;
            q.setAttribute("style", "width:" + s + "px;margin-left:" + (x[i].width - 10 - s) + "px;");
            y.appendChild(q);
        } else {
            p.removeChild(x[i]);
            x[i].removeAttribute("data-no-title-caption");
        }

        y.appendChild(x[i]);
        p.appendChild(y);
    }
}

function perfectShape(x) {
    return x + (x / (x < 300 ? 12 : 16) - 1);
}

/*********************************************
 * SLIDE NUMBER
 *********************************************/

function initSlideNumber() {
    var dv = document.createElement("div");

    var tl = document.createElement("p");
    var tr = document.createElement("p");
    var bl = document.createElement("p");
    var br = document.createElement("p");

    dv.setAttribute("style", "height:25px;");
    tl.setAttribute("class", "slide_number_tl");
    tr.setAttribute("class", "slide_number_tr");
    bl.setAttribute("class", "slide_number_bl");
    br.setAttribute("class", "slide_number_br");

    tl.innerHTML = "<span class='currentSlide'></span>" + getTotalSlide();
    tr.innerHTML = "<span class='currentSlide'></span>" + getTotalSlide();
    bl.innerHTML = "<span class='currentSlide'></span>" + getTotalSlide();
    br.innerHTML = "<span class='currentSlide'></span>" + getTotalSlide();

    document.querySelector(".reveal").appendChild(dv);
    document.querySelector(".reveal").appendChild(tl);
    document.querySelector(".reveal").appendChild(tr);
    document.querySelector(".reveal").appendChild(br);
    document.querySelector(".reveal").appendChild(bl);
}

function getTotalSlide() {
    var totalslides = document.querySelectorAll(".reveal .slides section:not(.stack)").length;
    return "/" + ((totalslides < 10) ? "0" : "") + totalslides.toString();
}

function slideNumber(event) {
    if (isDataSetOn(getPresentSlide(), "data-no-slide-counter"))
        return "";

    var current_slide = 0;
    var horizontal_slides = document.querySelectorAll(".reveal .slides>section");
    for (var i = 0; i < event.indexh; ++i) {
        var subslides = horizontal_slides[i].querySelectorAll('section');
        current_slide += (subslides.length === 0) ? 1 : subslides.length;
    }

    current_slide += event.indexv + 1;
    return ((current_slide < 10) ? "0" : "") + current_slide.toString();
}

function hideCounter(counter) {
    switch (counter) {
    case "top-right":
        document.querySelector(".slide_number_tr").setAttribute("style", "visibility:hidden;-webkit-animation:hideSlideNumberTR .5s;-moz-animation:hideSlideNumberTR .5s;-ms-animation:hideSlideNumberTR .5s;-o-animation:hideSlideNumberTR .5s;animation:hideSlideNumberTR .5s;");
        break;
    case "top-left":
        document.querySelector(".slide_number_tl").setAttribute("style", "visibility:hidden;-webkit-animation:hideSlideNumberTL .5s;-moz-animation:hideSlideNumberTL .5s;-ms-animation:hideSlideNumberTL .5s;-o-animation:hideSlideNumberTL .5s;animation:hideSlideNumberTL .5s;");
        break;
    case "bottom-right":
        document.querySelector(".slide_number_br").setAttribute("style", "visibility:hidden;-webkit-animation:hideSlideNumberTR .5s;-moz-animation:hideSlideNumberTR .5s;-ms-animation:hideSlideNumberTR .5s;-o-animation:hideSlideNumberTR .5s;animation:hideSlideNumberTR .5s;");
        break;
    case "bottom-left":
        document.querySelector(".slide_number_bl").setAttribute("style", "visibility:hidden;-webkit-animation:hideSlideNumberTL .5s;-moz-animation:hideSlideNumberTL .5s;-ms-animation:hideSlideNumberTL .5s;-o-animation:hideSlideNumberTL .5s;animation:hideSlideNumberTL .5s;");
        break;
    }
}

function getVisibleCounter() {
    if (getStyleElement(".slide_number_tl", "visibility") === "visible")
        return "top-left";
    else if (getStyleElement(".slide_number_tr", "visibility") === "visible")
        return "top-right";
    else if (getStyleElement(".slide_number_bl", "visibility") === "visible")
        return "bottom-left";
    else if (getStyleElement(".slide_number_br", "visibility") === "visible")
        return "bottom-right";
    else return "";
}

function displaySlideNumber(event) {
    var n = slideNumber(event);
    var v = getVisibleCounter();

    if (n !== "") {
        var s = document.querySelectorAll(".currentSlide");
        var x = getPresentSlide().getAttribute("data-counter-position");

        for (var i = 0, len = s.length; i < len; ++i)
            s[i].innerText = n;

        if (x !== v || (x === "" && v === "")) {
            hideCounter(v);
            switch (x) {
            case "top-right":
                document.querySelector(".slide_number_tr").setAttribute("style", "visibility:visible;-webkit-animation:displaySlideNumberTR .5s;-moz-animation:displaySlideNumberTR .5s;-ms-animation:displaySlideNumberTR .5s;-o-animation:displaySlideNumberTR .5s;animation:displaySlideNumberTR .5s;");
                break;
            case "bottom-left":
                document.querySelector(".slide_number_bl").setAttribute("style", "visibility:visible;-webkit-animation:displaySlideNumberTL .5s;-moz-animation:displaySlideNumberTL .5s;-ms-animation:displaySlideNumberTL .5s;-o-animation:displaySlideNumberTL .5s;animation:displaySlideNumberTL .5s;");
                break;
            case "bottom-right":
                document.querySelector(".slide_number_br").setAttribute("style", "visibility:visible;-webkit-animation:displaySlideNumberTR .5s;-moz-animation:displaySlideNumberTR .5s;-ms-animation:displaySlideNumberTR .5s;-o-animation:displaySlideNumberTR .5s;animation:displaySlideNumberTR .5s;");
                break;
            case "top-left":
            default:
                document.querySelector(".slide_number_tl").setAttribute("style", "visibility:visible;-webkit-animation:displaySlideNumberTL .5s;-moz-animation:displaySlideNumberTL .5s;-ms-animation:displaySlideNumberTL .5s;-o-animation:displaySlideNumberTL .5s;animation:displaySlideNumberTL .5s;");
                break;
            }
        }
    } else hideCounter(v);
}

/*********************************************
 * CODE
 *********************************************/

function initCodes() {
    var x = document.querySelectorAll(".reveal .slides pre");

    var currentParent, node;
    for (var i = 0, len = x.length; i < len; ++i) {
        x[i].setAttribute("style", (isDataSetOn(x[i], "data-no-shadow") ? "" : "-webkit-box-shadow: 0px 0px 100px 10px rgba(0, 0, 0, 0.3);-moz-box-shadow: 0px 0px 100px 10px rgba(0, 0, 0, 0.3);-ms-box-shadow: 0px 0px 100px 10px rgba(0, 0, 0, 0.3);-o-box-shadow: 0px 0px 100px 10px rgba(0, 0, 0, 0.3);box-shadow: 0px 0px 100px 10px rgba(0, 0, 0, 0.3);") + x[i].style.cssText);
        if (isDataSetOn(x[i], "data-caption")) {
            if (currentParent !== x[i].parentNode) {
                currentParent = x[i].parentNode;
                node = 0;
            } else ++node;

            var s = x[i].getAttribute("data-caption").length * 8.2;
            var y = document.createElement("div");
            y.innerText = x[i].getAttribute("data-caption");
            y.setAttribute("class", "code_caption");

            x[i].parentNode.insertBefore(y, x[i]);
            x[i].parentNode.insertBefore(document.createElement("br"), y);
            x[i].removeAttribute("data-caption");

            var m = getStyleElement(".slides", "width").replace("px", "");
            var w = getStyleElement(x[i], "width", true).replace("px", "");
            var p = getStyleElement(y, "border-left-width", true).replace("px", "") * 1 +
                    getStyleElement(y, "border-right-width", true).replace("px", "") * 1 +
                    getStyleElement(y, "padding-left", true).replace("px", "") * 1 +
                    getStyleElement(y, "padding-right", true).replace("px", "") * 1;

            y.setAttribute("style", "width:" + s + "px;margin-left:" + ((m === w ? m : m * 0.95) - s - p) + "px;");
        }
    }
}


/*********************************************
 * CONTROLS
 *********************************************/

function displayControls() {
    var x = getPresentSlide();
    if (isDataSetOn(x, "data-controls-position")) {
        switch(x.getAttribute("data-controls-position")) {
        case "top-right":
            document.querySelector(".reveal .controls").setAttribute("class", "controls tr");
            break;
        case "bottom-left":
            document.querySelector(".reveal .controls").setAttribute("class", "controls bl");
            break;
        case "top-left":
            document.querySelector(".reveal .controls").setAttribute("class", "controls tl");
            break;
        case "bottom-right":
        default:
            document.querySelector(".reveal .controls").setAttribute("class", "controls");
            break;
        }
    } else document.querySelector(".reveal .controls").setAttribute("class", "controls");
}

/*********************************************
 * LIGHT
 *********************************************/

function lightOnOff() {
    var x = document.querySelector("#light");
    if(isDataSetOn(x, "data-light-off")) {
        x.removeAttribute("data-light-off");
        x.setAttribute("data-light-on", "");
        document.querySelector(".reveal").classList.remove("fadeBackgroundOn");
        document.querySelector(".reveal").classList.add("fadeBackgroundOff");
    } else {
        x.removeAttribute("data-light-on");
        x.setAttribute("data-light-off", "");
        document.querySelector(".reveal").classList.remove("fadeBackgroundOff");
        document.querySelector(".reveal").classList.add("fadeBackgroundOn");
    }
}

/*********************************************
 * PDF
 *********************************************/

function initPDF() {
    var x = document.querySelectorAll("[data-pdf]");
    for(var i = 0, len = x.length; i < len; ++i) {
        x[i].setAttribute("class", "pdf");
        var y = document.createElement("iframe");
        y.setAttribute("class", "pdf");
        y.setAttribute("src", x[i].getAttribute("data-pdf"));
        x[i].removeAttribute("data-pdf");

        if(!isDataSetOn(x[i], "data-no-light-button")) {
            var z = document.createElement("button");
            var d = "yellow";
            var c = x[i].getAttribute("data-light-color");
            z.setAttribute("type", "button");
            z.setAttribute("id", "light");
            z.setAttribute("class", "button " + (c !== null ? (c !== "" ? c : d) : d));
            z.setAttribute("onclick", "lightOnOff();");
            z.innerText = "Turn the light off";
            x[i].removeAttribute("data-light-color");
            x[i].appendChild(z);
        } else x[i].setAttribute("style", "margin-top:0px;");

        x[i].removeAttribute("data-no-light-button");
        x[i].appendChild(y);
    }
}

/*********************************************
 * INITIALISATION
 *********************************************/

function initDiap() {
    initStyleFormatting();
    initSlideNumber();
    initImages();
    initCodes();
    initPDF();
}

function actualizeElements(event) {
    displaySlideNumber(event);
    displayControls();
}