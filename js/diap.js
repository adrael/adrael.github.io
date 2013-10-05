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
	for(var i = 0, len = x.length; i < len; ++i) {
		if(x[i].classList.length === 1) {
			return x[i];
		}
	}
	return null;
}

function isDataSetOn(obj, data_marker) {
    for (var i = 0, len = obj.attributes.length; i < len; ++i)
        if (obj.attributes[i].name === data_marker)
            return true;
    return false;
}

function getValueOfData(obj, data_marker) {
    return obj.getAttribute(data_marker);
}

function getParentByTagOf(obj, parentTag) {
    var p = obj.parentNode;
    while (p.tagName !== parentTag)
        p = p.parentNode;
    return p;
}

function getNumberOfChildsByTag(parent, childTag) {
    var n = 0;
    for (var i = 0, len = parent.childNodes.length; i < len; ++i) {
        if (parent.childNodes[i].tagName === childTag)
        ++n;
    }
    return n;
}

function getScreenSize(wh) {
    var w = window,
        d = document,
        e = d.documentElement,
        g = d.getElementsByTagName("body")[0],
        x = w.innerWidth || e.clientWidth || g.clientWidth,
        y = w.innerHeight || e.clientHeight || g.clientHeight;
    return (wh === "width" ? x : y);
}

function getStyleElement(element, style_element) {
    if (style_element !== "" && element !== "") {
        var x = document.querySelector(element);
        var r = new RegExp("[;]+", "g");

        if (x.getAttribute("style")) {
            var t = x.getAttribute("style").split(r);

            var v, r2 = new RegExp("[:]+", "g");
            for (var i = 0, len = t.length; i < len; ++i) {
                v = "";
                t[i] = t[i].replace(" ", "");
                for (var j = 0, lan = t[i].length; j < lan; ++j) {
                    v += t[i][j];
                    if (v === style_element)
                        return t[i].split(r2)[1];
                }
            }
        }
        return "";
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
    var t = document.querySelectorAll("[" + data_marker + "]"),
        x;
    for (var i = 0, len = t.length; i < len; ++i) {
        x = getValueOfData(t[i], data_marker);
        t[i].style.cssText = CSSProperty + ":" + (x === "" ? defaultValue : x) + ";" + t[i].style.cssText;
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

        if (!isDataSetOn(x[i], "data-no-bottom-shadow")) {
            y.setAttribute("class", "imgShadow");

        } else x[i].removeAttribute("data-no-bottom-shadow");

        if (!isDataSetOn(x[i], "data-no-title-caption") && x[i].title !== "") {
            p.removeChild(x[i]);
            var s = x[i].title.length * 9.5;
            var q = document.createElement("div");
            q.setAttribute("class", "img_caption");
            q.innerText = x[i].title;
            q.style.cssText = "width:" + s + "px;margin-left:" + (x[i].width - 10 - s) + "px;";
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
    var tl = document.createElement("p");
    var tr = document.createElement("p");
    var bl = document.createElement("p");
    var br = document.createElement("p");

    tl.setAttribute("class", "slide_number_tl");
    tr.setAttribute("class", "slide_number_tr");
    bl.setAttribute("class", "slide_number_bl");
    br.setAttribute("class", "slide_number_br");

    tl.innerHTML = "<span class='currentSlide'></span>" + getTotalSlide();
    tr.innerHTML = "<span class='currentSlide'></span>" + getTotalSlide();
    bl.innerHTML = "<span class='currentSlide'></span>" + getTotalSlide();
    br.innerHTML = "<span class='currentSlide'></span>" + getTotalSlide();

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
        document.querySelector(".slide_number_tr").style.cssText = "visibility:hidden;-webkit-animation:hideSlideNumberTR .5s;-moz-animation:hideSlideNumberTR .5s;-ms-animation:hideSlideNumberTR .5s;-o-animation:hideSlideNumberTR .5s;animation:hideSlideNumberTR .5s;";
        break;
    case "top-left":
        document.querySelector(".slide_number_tl").style.cssText = "visibility:hidden;-webkit-animation:hideSlideNumberTL .5s;-moz-animation:hideSlideNumberTL .5s;-ms-animation:hideSlideNumberTL .5s;-o-animation:hideSlideNumberTL .5s;animation:hideSlideNumberTL .5s;";
        break;
    case "bottom-right":
        document.querySelector(".slide_number_br").style.cssText = "visibility:hidden;-webkit-animation:hideSlideNumberTR .5s;-moz-animation:hideSlideNumberTR .5s;-ms-animation:hideSlideNumberTR .5s;-o-animation:hideSlideNumberTR .5s;animation:hideSlideNumberTR .5s;";
        break;
    case "bottom-left":
        document.querySelector(".slide_number_bl").style.cssText = "visibility:hidden;-webkit-animation:hideSlideNumberTL .5s;-moz-animation:hideSlideNumberTL .5s;-ms-animation:hideSlideNumberTL .5s;-o-animation:hideSlideNumberTL .5s;animation:hideSlideNumberTL .5s;";
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
        var x = getValueOfData(getPresentSlide(), "data-counter-position");


        //console.log("actuel = " + x);
        //console.log("ancien = " + v);


        for (var i = 0, len = s.length; i < len; ++i)
            s[i].innerText = n;

        if (x !== v || (x === "" && v === "")) {
            hideCounter(v);
            switch (x) {
            case "top-right":
                document.querySelector(".slide_number_tr").style.cssText = "visibility:visible;-webkit-animation:displaySlideNumberTR .5s;-moz-animation:displaySlideNumberTR .5s;-ms-animation:displaySlideNumberTR .5s;-o-animation:displaySlideNumberTR .5s;animation:displaySlideNumberTR .5s;";
                break;
            case "bottom-left":
                document.querySelector(".slide_number_bl").style.cssText = "visibility:visible;-webkit-animation:displaySlideNumberTL .5s;-moz-animation:displaySlideNumberTL .5s;-ms-animation:displaySlideNumberTL .5s;-o-animation:displaySlideNumberTL .5s;animation:displaySlideNumberTL .5s;";
                break;
            case "bottom-right":
                document.querySelector(".slide_number_br").style.cssText = "visibility:visible;-webkit-animation:displaySlideNumberTR .5s;-moz-animation:displaySlideNumberTR .5s;-ms-animation:displaySlideNumberTR .5s;-o-animation:displaySlideNumberTR .5s;animation:displaySlideNumberTR .5s;";
                break;
            case "top-left":
            default:
                document.querySelector(".slide_number_tl").style.cssText = "visibility:visible;-webkit-animation:displaySlideNumberTL .5s;-moz-animation:displaySlideNumberTL .5s;-ms-animation:displaySlideNumberTL .5s;-o-animation:displaySlideNumberTL .5s;animation:displaySlideNumberTL .5s;";
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

    var currentParent, node; //, childs;
    for (var i = 0, len = x.length; i < len; ++i) {
        x[i].style.cssText = (isDataSetOn(x[i], "data-no-shadow") ? "" : "-webkit-box-shadow: 0px 0px 100px 10px rgba(0, 0, 0, 0.3);-moz-box-shadow: 0px 0px 100px 10px rgba(0, 0, 0, 0.3);-ms-box-shadow: 0px 0px 100px 10px rgba(0, 0, 0, 0.3);-o-box-shadow: 0px 0px 100px 10px rgba(0, 0, 0, 0.3);box-shadow: 0px 0px 100px 10px rgba(0, 0, 0, 0.3);") + x[i].style.cssText;
        if (isDataSetOn(x[i], "data-caption")) {
            if (currentParent !== x[i].parentNode) {
                currentParent = x[i].parentNode;
                node = 0;
                //childs = getNumberOfChildsByTag(x[i].parentNode, "PRE");
            } else ++node;

            var s = getValueOfData(x[i], "data-caption").length * 8.2;
            var y = document.createElement("div");
            y.setAttribute("class", "code_caption");
            y.innerText = getValueOfData(x[i], "data-caption");
            y.style.cssText = "width:" + s + "px;margin-left:" + (((getStyleElement(".slides", "width").replace("px", "") * 95) / 100) - s - 20) + "px;margin-top:16px;"; //" + (childs > 1 ? (node === 0 ? "6" : "1") : "16") + "px;";
            x[i].parentNode.insertBefore(y, x[i]);
            x[i].parentNode.insertBefore(document.createElement("br"), y);
            x[i].removeAttribute("data-caption");
        }
    }
}


/*********************************************
 * CONTROLS
 *********************************************/

function displayControls() {
    var x = getPresentSlide();
    if (isDataSetOn(x, "data-controls-position")) {
        switch (getValueOfData(x, "data-controls-position")) {
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
 * INITIALISATION
 *********************************************/

function initDiap() {
    initStyleFormatting();
    initSlideNumber();
    initImages();
    initCodes();
}

function actualizeElements(event) {
    displaySlideNumber(event);
    displayControls();
}

/*********************************************
 * LIGHT
 *********************************************/

function lightOnOff() {
    var x = document.querySelector(".light");
    if(x.innerText === "Turn the light off") {
        x.innerText = "Turn the light on";
        document.querySelector(".reveal").classList.remove("fadeBackgroundOff");
        document.querySelector(".reveal").classList.add("fadeBackgroundOn");
    } else {
        x.innerText = "Turn the light off";
        document.querySelector(".reveal").classList.remove("fadeBackgroundOn");
        document.querySelector(".reveal").classList.add("fadeBackgroundOff");
    }
}