document.addEventListener('DOMContentLoaded', function() {
    var checkPageButton = document.getElementById('checkPage');
    checkPageButton.addEventListener('click', function() {
        chrome.tabs.getSelected(null, function(tab) {
            d = document;
            window.open('https://www.google.com/search?q=Zulqadar Idrishi', 'blank');
        });
    }, false);

    var findButton = document.getElementById('btnFind');
    findButton.addEventListener('click', function() {
        chrome.tabs.getSelected(null, function(tab) {
            onWindowLoad();
        });
    }, false);

    var btnFindPhone = document.getElementById("btnFindPhone");
    btnFindPhone.addEventListener('click', function() {
        chrome.tabs.getSelected(null, function(tab) {
            onPhoneClick();
        })
    }, false);

    var btnFindColor = document.getElementById("btnFindColor");
    btnFindColor.addEventListener('click', function() {
        chrome.tabs.getSelected(null, function(tab) {
            onColorPickerClick();
        })
    }, false);

}, false);

chrome.runtime.onMessage.addListener(function(request, sender) {
    debugger
    if (request.action == "getSource") {
        //message.innerText = request.source;
        var htmlString = request.source;
        var extractedEmails = extractEmailsFromString(htmlString);
        console.log(extractedEmails)
        message.innerText = extractedEmails.join('\n');
    } else if (request.action == "getSourcePhone") {
        var htmlString = request.source;
        var extractedPhones = extractPhonesFromString(htmlString);
        console.log(extractedPhones)
        message.innerText = extractedPhones.join('\n');
    } else if (request.action == "getSourceColor") {
        console.log('testcolor')

        chrome.tabs.executeScript(null, {
            file: "pageScript.js",
            allFrames: true
        });
        console.log(request.source)
    }
});

function onWindowLoad() {
    var message = document.querySelector('#message');

    chrome.tabs.executeScript(null, {
        file: "getPagesSource.js"
    }, function() {
        // If you try and inject into an extensions page or the webstore/NTP you'll get an error
        if (chrome.runtime.lastError) {
            message.innerText = 'There was an error injecting script : \n' + chrome.runtime.lastError.message;
        }
    });
}

function onPhoneClick() {
    var phone = document.querySelector('#phones');

    chrome.tabs.executeScript(null, {
        file: "getPagesSourceForPhone.js"
    }, function() {
        // If you try and inject into an extensions page or the webstore/NTP you'll get an error
        if (chrome.runtime.lastError) {
            phone.innerText = 'There was an error injecting script : \n' + chrome.runtime.lastError.message;
        }
    });
}

function onColorPickerClick() {
    var phone = document.querySelector('#phones');

    chrome.tabs.executeScript(null, {
        file: "getPagesColors.js"
    }, function() {
        // If you try and inject into an extensions page or the webstore/NTP you'll get an error
        if (chrome.runtime.lastError) {
            phone.innerText = 'There was an error injecting script : \n' + chrome.runtime.lastError.message;
        }
    });
}

function extractEmailsFromString(text) {
    return text.match(/([a-zA-Z0-9._-]+@[a-zA-Z0-9._-]+\.[a-zA-Z0-9._-]+)/gi);
}

function extractPhonesFromString(text) {
    return text.match(/([0-9._-]{10}+)/gi);
}

//window.onload = onWindowLoad;

//Here followinf code runs on browserAction [START]



//[END]