
// CryptoJSLogin constructor
// formId - the id of the form CryptoJSLogin takes care of
// salt	  - the salt to use against the login
function CryptoJSLogin(formId, salt) {
	try {
		if(!formId || formId === "") {
			throw new Error("WARNING: <form> ID is invalid! Aborting...");
		}

		this.form = document.getElementById(formId);

		if(!this.form) {
			throw new Error("WARNING: Cannot find <form>! Aborting...");
		}

		if(!salt) {
			this.salt = "Q3J5cHRvSlNMb2dpbg==";
		}

		this.safeData = "0368afda4fbf4d4c23df9b0f89e2620ea863f8c789abc398fec7504a37fa5486d3428159f3466e2a9f43c8cb8c3261ef97cd5775faf9a9a3fc928e30572e1f5c";

	} catch(error) {
		console.log(error.message);
	}
};

// Launches the login procedure
// object - An object meeting this specification:
//		var object = {
//			mode: 	"id" / "type" ,
//			inputs: [login, password]
//		};
// where the mode define how to get the inputs
// and the inputs is an array containing strings representing the inputs following the given mode
// N.B: the login must comes first, the password in second
CryptoJSLogin.prototype.login = function(object) {
	var elements = this.getFormElements(object.mode, object.inputs);
	var login 	 = elements[0];
	var password = elements[1];

	try {
		if(!login) {
			throw new Error("WARNING: Cannot find login <input>! Aborting...");
		}

		if(!password) {
			throw new Error("WARNING: Cannot find password <input>! Aborting...");
		}

		var feedbackSpan = document.getElementById("feedbackLogin");
		if(this.encrypt(login.value + this.salt + password.value) === this.safeData) {
			feedbackSpan.setAttribute("class", "success");
			feedbackSpan.innerText = "Successfully logged in!";
		} else {
			feedbackSpan.setAttribute("class", "failure");
			feedbackSpan.innerText = "Wrong email/password combination";
		}

	} catch(error) {
		console.log(error.message);
	}
};

// Returns the input of the form given its type
// type - A string representing the type of the wanted input
// return an HTML Node representing the wanted input
CryptoJSLogin.prototype.getFormElementByType = function(type) {
	for(var i = 0; i < this.form.length; ++i) {
		if(this.form.elements[i].type === type) {
			return this.form.elements[i];
		}
	}
	return null;
};

// Returns all the inputs of the form given their types
// mode   - A string indicating the search mode to adopt
// inputs - An array containing strings representing the inputs following the given mode
// return an array containing HTML Nodes representing the wanted inputs
CryptoJSLogin.prototype.getFormElements = function(mode, inputs) {
	var elements = [];
	for(var i = 0; i < inputs.length; ++i) {
		switch(mode) {
			case "id":
				elements.push(document.getElementById(inputs[i]));
			break;

			case "type":
				elements.push(this.getFormElementByType(inputs[i]));
			break;

			default:
				elements.push(null);
			break;
		}
	}
	return elements;
};

// Encrypts data
// data - the data to be encryted
CryptoJSLogin.prototype.encrypt = function(data) {
	var pbkdf2 = this.toPBKDF2(this.toSHA3(data), 512/32, 200);
	return this.toSHA3(this.fromRC4_DROP(this.toRC4_DROP(data, pbkdf2, 3072/4), pbkdf2, 3072/4));
};


// Hashes data with SHA3 algorithm from crypto-js
// data - the data to be hashed
CryptoJSLogin.prototype.toSHA3 = function(data) {
	return CryptoJS.SHA3(data).toString();
};

// Encrypts data with PBKDF2 algorithm from crypto-js
// data       - the data to be encrypted
// keySize    - the size of the key to use
// iterations - the number of iterations the algorithm will process
CryptoJSLogin.prototype.toPBKDF2 = function(data, keySize, iterations) {
	return CryptoJS.PBKDF2(data, this.salt, { keySize: keySize, iterations: iterations }).toString();
};

// Ciphers data with RC4Drop algorithm from crypto-js
// data 	  - the data to be ciphered
// passphrase - the passphrase to be used to cipher the data
// drop 	  - the number of words to be droped to keep the ciphering safe
CryptoJSLogin.prototype.toRC4_DROP = function(data, passphrase, drop) {
	return CryptoJS.RC4Drop.encrypt(data, passphrase, { drop: drop }).toString();
};

// Deciphers data with RC4Drop algorithm from crypto-js
// data 	  - the data to be deciphered
// passphrase - the passphrase used to cipher the data
// drop 	  - the number of words droped to keep the ciphering safe
CryptoJSLogin.prototype.fromRC4_DROP = function(data, passphrase, drop) {
	return CryptoJS.RC4Drop.decrypt(data, passphrase, { drop: drop }).toString();
};