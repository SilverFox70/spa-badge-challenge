/*!
 * minQuery
 */
"use strict"

 var SweetSelector = {};

 SweetSelector.select = function (cssSelector){
  switch (cssSelector.charAt(0)) {
  case '.':
    return document.getElementsByClassName(cssSelector.slice(1));
  case "#":
    return document.getElementById(cssSelector.slice(1));
  default:
    return document.getElementsByTagName(cssSelector);
  }
 }

var MiniQuery = function (cssSelector) {
  if(typeof(cssSelector) == "function") {
    return $.ready(cssSelector) }
  else {
    return SweetSelector.select(cssSelector)}
};

var $ = MiniQuery;

MiniQuery.ready = function(thing){document.addEventListener('DOMContentLoaded', function(event){thing()})};

HTMLCollection.prototype.hide = function() {
  for (var i = 0; i< this.length; i++) {
  this[i].hide();
  };
}

HTMLElement.prototype.hide = function() {
  this.style.display = "none";
}

HTMLCollection.prototype.show = function() {
  for (var i = 0; i< this.length; i++) {
  this[i].show();
  };
}

HTMLElement.prototype.show = function() {
  this.style.display = "initial";
}

HTMLCollection.prototype.addClass = function(newClassName) {
  for (var i = 0; i< this.length; i++) {
  this[i].addClass(newClassName);
  };
}

HTMLElement.prototype.addClass = function(newClassName) {
  this.className= " " + newClassName;
}

HTMLCollection.prototype.removeClass = function(unwantedClassName) {
  for (var i = 0; i< this.length; i++) {
  this[i].removeClass(unwantedClassName)
  };
}

HTMLElement.prototype.removeClass = function(unwantedClassName) {
  var old_classes = this.className;
  var new_classes = old_classes.replace(unwantedClassName, "");
  this.className = new_classes;
}

HTMLCollection.prototype.on = function(event, action) {
  for (var i = 0; i< this.length; i++) {
    this[i].on(event, action);
  };
}

HTMLElement.prototype.on = function(event, action) {
    this.addEventListener(event, action);
}

HTMLCollection.prototype.trigger = function(event) {
  for (var i = 0; i< this.length; i++) {
    this[i].trigger(event);
  };
}

HTMLElement.prototype.trigger = function(event) {
    this.dispatchEvent(new Event(event));
}

HTMLCollection.prototype.text = function(string) {
  for (var i = 0; i< this.length; i++) {
    this[i].text(string)
  };
}

HTMLElement.prototype.text = function(string) {
  debugger
    return this.nodeValue(string);
}

HTMLCollection.prototype.html = function(string) {
  for (var i = 0; i< this.length; i++) {
    this[i].html(string);
  };
}

HTMLElement.prototype.html = function(string) {
  debugger
    return this.innerHTML(string);
}

HTMLCollection.prototype.append = function(string) {
  for (var i = 0; i< this.length; i++) {
    this[i].append(string);
  };
}

HTMLElement.prototype.append = function(string) {
  var textnode = document.createTextNode(string);
  this.appendChild(textnode);
}

HTMLCollection.prototype.ajax = function(args) {
  for (var i = 0; i< this.length; i++) {
    this[i].request(args);
  };
}

HTMLElement.prototype.ajax = function(request) {
    var promise = new Promise(function(resolve, reject) {
      var oRequest = new XMLHttpRequest();
      oRequest.open(request.type, request.url)
      if (request.data) {
        oRequest.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
        oRequest.send(request.data);
      } else {
        oRequest.send();
      }

      oRequest.onload = function() {
        if (this.status >= 200 && this.status < 300) {
          resolve(this.response);
        }
        else {
          reject(this.statusText);
        }
      }

      oRequest.onerror = function() {
        reject(this.statusText);
      }
    });
    debugger
    return promise;
  };
