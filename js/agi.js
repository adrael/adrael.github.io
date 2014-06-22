/*!
 * agi.js
 * https://github.com/Adrael/adrael.github.io
 * 
 * Copyright (C) 2014
 */

'use strict';

function AGI() {

	var projects = [
						{
							title: "Protect It!",
							titleMuted: "Protect It!",
							titleLeft: " &mdash; It'll blow your mind.",
							img: "protectit.png",
							imgBig: "protectit_big.png",
							urlAccess: "http://adrael.github.io/projects/protectit/index.html",
							urlGit: "https://github.com/Adrael/ProtectIt",
							text: "\"Protect It!\" is a web-based solution created for a Developpez.com project. The goal of this application is to help create safe and secure passwords, while remembering them without having to write them down somewhere."
						},

						{
							title: "Diap.",
							titleMuted: "Diap.",
							titleLeft: " &mdash; What's up?",
							img: "diap.png",
							imgBig: "diap_big.png",
							urlAccess: "http://adrael.github.io/projects/diap/index.html",
							urlGit: "https://github.com/Adrael/Diap",
							text: "If you ever heard of <a href=\"https://github.com/hakimel/reveal.js\" target=\"_blank\" class=\"clearLink\">Reveal.js</a>, then you'll be glad to use \"Diap\". It's Reveal.js with a lot of improvements. Now you can do whatever you always wanted to do, easily. Take a look, and don't hesistate to give me your feedback!<br><br>"
						},

						{
							title: "EPSI Courses",
							titleMuted: "EPSI Courses.",
							titleLeft: " &mdash; Exactly.",
							img: "epsicourses.png",
							imgBig: "epsicourses_big.png", 
							urlAccess: "http://adrael.github.io/projects/epsicourses/index.html", 
							urlGit: "https://github.com/Adrael/EPSICourses",
							text: "Made with Diap. \"EPSI Courses\" intend to give access to all of the fourth year students of the EPSI Engineering School to the courses materials. Made by a student for the students.<br><br>"
						},

						{
							title: "GHaLDoS",
							titleMuted: "GHaLDoS!",
							titleLeft: " &mdash; Run Forrest.",
							img: "ghaldos.png",
							imgBig: "ghaldos_big.png", 
							urlAccess: "http://adrael.github.io/projects/ghaldos/index.html", 
							urlGit: "https://github.com/Adrael/GHaLDoS",
							text: "An amazing Perceptron 2.0 made by two students from EPSI Bordeaux. Recognition. Ammunition. Demolition.<br><br>"
						},

						{
							title: "CryptoJSLogin",
							titleMuted: "CryptoJSLogin",
							titleLeft: " &mdash; The safer the better.",
							img: "cryptojslogin.png",
							imgBig: "cryptojslogin_big.png", 
							urlAccess: "http://adrael.github.io/projects/cryptojslogin/index.html", 
							urlGit: "https://github.com/Adrael/CryptoJSLogin",
							text: "Ever dreamed of a beautiful and nevertheless secured way of log in somewhere? Now with CryptoJSLogin thanks to crypto-js and Bootstrap, you got it.<br>"
						},

						{
							title: "RPJS [Paused]",
							titleMuted: "RPJS",
							titleLeft: " &mdash; Knowledge is power. [Paused]",
							img: "rpjs.png",
							imgBig: "rpjs_big.png", 
							urlAccess: "http://adrael.github.io/projects/rpjs/index.html", 
							urlGit: "https://github.com/Adrael/rpjs",
							text: "Right bottom left up right bottom left up. Wait, I've seen this place already!<br><br>"
						},






						{
							title: "IMADS",
							titleMuted: "IMADS",
							titleLeft: " &mdash; Because power is never enough.",
							img: "imads.png",
							imgBig: "imads_big.png", 
							urlAccess: "http://adrael.github.io/projects/jarvis/Jarvis2.0/index.html", 
							urlGit: "https://github.com/Adrael/jarvis/tree/master/Jarvis2.0",
							text: "Experiments on Experts Systems learned at school. Enjoy the Iron Man Armor Diagnostic System!!<br><br>"
						},

						{
							title: "J.A.R.V.I.S",
							titleMuted: "J.A.R.V.I.S",
							titleLeft: " &mdash; IMADS you say? Too mainstream.",
							img: "jarvis.png",
							imgBig: "jarvis_big.png", 
							urlAccess: "http://adrael.github.io/projects/jarvis/Jarvis3.0/index.html", 
							urlGit: "https://github.com/Adrael/jarvis/tree/master/Jarvis3.0",
							text: "Improvements of the experiments on Experts Systems learned at school. Level up, suit up, we've got some bad guys' asses to kick-off!<br>"
						},

						{
							title: "Termites",
							titleMuted: "Termites",
							titleLeft: " &mdash; *Crunch* *Crunch* Wot? Am bosy eatun wod!",
							img: "termites.png",
							imgBig: "termites_big.png", 
							urlAccess: "http://adrael.github.io/projects/termites/index.html", 
							urlGit: "https://github.com/Eptwalabha/termites-projet-ia",
							text: "Experiments on Multi-Agent Systems + AStar pathfinding + Genetic Algorithm learned at school. Sounds awesome? That's because it is.<br>"
						},






						{
							title: "FindOnCraig",
							titleMuted: "FindOnCraig",
							titleLeft: " &mdash; Looking for something?",
							img: "foc.png",
							imgBig: "foc_big.png", 
							urlAccess: "http://findoncraig.com", 
							urlGit: "",
							text: "Ever dreamed of finding stuff on all Craigslist's websites? Dreaming is over.<br><br>"
						},

						{
							title: "goalmap",
							titleMuted: "goalmap",
							titleLeft: " &mdash; Set, Track, Reach",
							img: "goalmap.png",
							imgBig: "goalmap_big.png", 
							urlAccess: "http://www.goalmap.com", 
							urlGit: "",
							text: "The platform to set, track and reach all your goals. It's free, it's easy, and you'll love it!<br><br>"
						}
					];

	// Switch between the projects list and the projects grid
	// requestedPage - the requested page to display
	this.switch = function(requestedPage) {
		if(requestedPage === 'grid') {
			window.location.assign("index.html");
		} else if(requestedPage === 'list') {
			window.location.assign("index_list.html")
		}
	};

	// Create and display projects dynamically
	this.makeProjects = function() {
		var container = document.getElementById("row");
		for(var i = 0; i < projects.length; ++i) {
			var div = document.createElement("div");
			div.setAttribute("class", "col-lg-4 text-center");

				var img = document.createElement("img");
				img.setAttribute("class", "img-circle img-deep");
				img.setAttribute("alt", "140x140");
				img.setAttribute("style", "width: 140px; height: 140px;");
				img.setAttribute("src", "../img/" + projects[i].img);

				var h2 = document.createElement("h2");
				h2.innerHTML = projects[i].title;

				var p_desc = document.createElement("p");
				p_desc.setAttribute("class", "justify");
				p_desc.innerHTML = projects[i].text;

				var p_butt = document.createElement("p");
				p_butt.setAttribute("class", "text-center");

				if(projects[i].urlAccess !== "") {
					var a_accs = document.createElement("a");
					a_accs.setAttribute("class", "btn btn-warning");
					a_accs.setAttribute("target", "_blank");
					a_accs.setAttribute("href", projects[i].urlAccess);
					a_accs.setAttribute("role", "button");
					a_accs.innerHTML = "Launch »";
					p_butt.appendChild(a_accs);
				}

				if(projects[i].urlGit !== "") {
					var a_git = document.createElement("a");
					a_git.setAttribute("class", "btn btn-info");
					a_git.setAttribute("target", "_blank");
					a_git.setAttribute("href", projects[i].urlGit);
					a_git.setAttribute("role", "button");
					a_git.setAttribute("style", "margin-left: 10px;")
					a_git.innerHTML = "View on Github »";
					p_butt.appendChild(a_git);
				}

			div.appendChild(img);
			div.appendChild(h2);
			div.appendChild(p_desc);
			div.appendChild(p_butt);

			container.appendChild(div);
		}
	};

	this.makeBigProjects = function() {
		var starter = true;
		var container = document.getElementById("projectsContainer");
		for(var i = 0; i < projects.length; ++i) {
			var hr = document.createElement("hr");
			hr.setAttribute("class", "featurette-divider");

			var div_row = document.createElement("div");
			div_row.setAttribute("class", "row featurette");

				var div_col = document.createElement("div");
				div_col.setAttribute("class", "col-md-7");

					var h2 = document.createElement("h2");
					h2.setAttribute("class", "featurette-heading");

						var span = document.createElement("span");
						span.setAttribute("class", "text-muted");
						span.innerHTML = projects[i].titleMuted;

						var span2 = document.createElement("span");
						span2.innerHTML = projects[i].titleLeft;

					var p_lead = document.createElement("p");
					p_lead.setAttribute("class", "lead justify");
					p_lead.innerHTML = projects[i].text;

					var p_center = document.createElement("p");
					p_center.setAttribute("class", "text-center")

						if(projects[i].urlAccess !== "") {
							var a_accs = document.createElement("a");
							a_accs.setAttribute("class", "btn btn-lg btn-warning");
							a_accs.setAttribute("target", "_blank");
							a_accs.setAttribute("href", projects[i].urlAccess);
							a_accs.setAttribute("role", "button");
							a_accs.innerHTML = "Launch »";
							p_center.appendChild(a_accs);
						}

						if(projects[i].urlGit !== "") {
							var a_git = document.createElement("a");
							a_git.setAttribute("class", "btn btn-lg btn-info");
							a_git.setAttribute("target", "_blank");
							a_git.setAttribute("href", projects[i].urlGit);
							a_git.setAttribute("role", "button");
							a_git.setAttribute("style", "margin-left: 10px;")
							a_git.innerHTML = "View on Github »";
							p_center.appendChild(a_git);
						}

				var div_col5 = document.createElement("div");
				div_col5.setAttribute("class", "col-md-5");

					var img_feat = document.createElement("img");
					img_feat.setAttribute("class", "featurette-image img-responsive img-thumbnail img-deep");
					img_feat.setAttribute("alt", "500x500");
					img_feat.setAttribute("src", "../img/" + projects[i].imgBig);

				div_col.appendChild(h2);
					h2.appendChild(span);
					h2.appendChild(span2)
				div_col.appendChild(p_lead);
				div_col.appendChild(p_center);

				div_col5.appendChild(img_feat);

			if(!starter)
				div_row.appendChild(div_col5);
			
			div_row.appendChild(div_col);
			
			if(starter)
				div_row.appendChild(div_col5);

			container.appendChild(hr);
			container.appendChild(div_row);

			starter = !starter;
		}
	};

}

// AGI INITIALIZATION
var agi = new AGI();