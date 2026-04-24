"use strict";

const $ = selector => document.querySelector(selector);

var evt = {
    attach: function(node, eventName, func) {
        if (node.addEventListener) {
            node.addEventListener(eventName, func, false);
        } else if (node.attachEvent) {
            node.attachEvent("on" + eventName, func);
        }
    },
    preventDefault: function(e) {
        if (e.preventDefault) {
            e.preventDefault();
        } else {
            e.returnValue = false;
        }
    }
};