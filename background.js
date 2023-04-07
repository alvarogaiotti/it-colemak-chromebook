/*
Copyright 2018 The Extra Keyboards for Chrome OS Authors.
Licensed under the Apache License, Version 2.0 (the "License");
you may not use this file except in compliance with the License.
You may obtain a copy of the License at
    http://www.apache.org/licenses/LICENSE-2.0
Unless required by applicable law or agreed to in writing, software
distributed under the License is distributed on an "AS IS" BASIS,
WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
See the License for the specific language governing permissions and
limitations under the License.
*/

var contextID = 0;

var lut = {

    "Backquote"     : [ "\\","|", "¦", ""],
    "Digit0"        : ["0","=", "”", "’"],
    "Digit1"        : ["1","!", "¡", "¹"],
    "Digit2"        : ["2","\"", "ª", "²"],
    "Digit3"        : ["3", "£", "º", "³"],
    "Digit4"        : ["4", "$", "£", "¥"],
    "Digit5"        : ["5", "%", "€", "¢"],
    "Digit6"        : ["6", "&", "^", "ˇ"],
    "Digit7"        : ["7", "/", "˚", "¯"],
    "Digit8"        : ["8", "(", "„", "‚"],
    "Digit9"        : ["9", ")", "“", "‘"],
    "Minus"         : ["'","?", "`", "✗"],
    "Equal"         : ["ì","^", "~", "÷"],


    "KeyQ"          : ["q", "Q", "", ""],
    "KeyE"          : [ "f", "F" , "", ""],
    "KeyR"          : [ "p", "P" , "", ""],
    "KeyT"          : [ "b", "B" , "", ""],
    "KeyY"          : [ "j", "J" , "", ""],
    "KeyU"          : [ "l", "L" , "", ""],
    "KeyI"          : [ "u", "U" , "", ""],
    "KeyO"          : [ "y", "Y" , "", ""],
    "KeyP"          : [ "ò", "ç", "@", "·" ],
    "BracketLeft"   : ["è", "é", "[", "{"],
    "BracketRight"  : ["+", "*", "]", "}"],

    "KeyA"          : [ "a", "A" ,"",""],
    "KeyS"          : [ "r", "R" ,"",""],
    "KeyD"          : [ "s", "S" ,"",""],
    "KeyF"          : [ "t", "T" ,"",""],
    "KeyG"          : [ "g", "G" ,"",""],
    "KeyH"          : [ "m", "M" ,"",""],
    "KeyJ"          : [ "n", "N" ,"",""],
    "KeyK"          : [ "e", "E" ,"",""],
    "KeyL"          : [ "i", "I" ,"",""],
    "Semicolon"     : [ "o", "O", "ö", "Ö" ],
    "Quote"         : ["à","°", "#", ""],
    "Backslash"     : ["ù","§", "´", "¨"],

    "IntlBackslash" : ["z","Z", "", ""],
    "KeyZ"          : [ "x", "X" ,"",""],
    "KeyX"          : [ "c", "C" ,"",""],
    "KeyC"          : [ "d", "D" ,"",""],
    "KeyV"          : [ "v", "V" ,"",""],
    "KeyB"          : [ "<", ">" ,"",""],
    "KeyN"          : [ "k", "K" ,"",""],
    "KeyM"          : [ "h", "H" ,"",""],
    "Comma"         : [",", ";", "ò", "Ò"],
    "Period"        : [".", ":", "ó", "Ó"],
    "Slash"         : ["-", "_", "¿", "…"],
};


chrome.input.ime.onFocus.addListener(
    function(context) {
        contextID = context.contextID;
    }
);

chrome.input.ime.onBlur.addListener(() => {
    contextID = 0;
})


// TODO: Add support for virtual keyboard input.

chrome.input.ime.onKeyEvent.addListener(
    function(engineID, keyData) {
        var handled = false;

        if (keyData.type == "keydown") {
            if (lut[keyData.code]) {
                let shifted = keyData.capsLock ^ keyData.shiftKey;
                let altgr = keyData.altgrKey ^ (keyData.altKey && keyData.ctrlKey);
                let emit = lut[keyData.code][(2 * algr) + shifted];

                if (emit != null && contextID != 0) {
                    chrome.input.ime.commitText({
                        "contextID": contextID,
                        "text": emit,
                    }, () => {
                        if (chrome.runtime.lastError) {
                            console.error('Error committing text:', chrome.runtime.lastError);
                            return;
                        }
                    });
                }
                handled = true;
            }
        }
        return handled;
    });
