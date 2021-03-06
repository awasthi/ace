/* ***** BEGIN LICENSE BLOCK *****
 * Distributed under the BSD license:
 *
 * Copyright (c) 2010, Ajax.org B.V.
 * All rights reserved.
 * 
 * Redistribution and use in source and binary forms, with or without
 * modification, are permitted provided that the following conditions are met:
 *     * Redistributions of source code must retain the above copyright
 *       notice, this list of conditions and the following disclaimer.
 *     * Redistributions in binary form must reproduce the above copyright
 *       notice, this list of conditions and the following disclaimer in the
 *       documentation and/or other materials provided with the distribution.
 *     * Neither the name of Ajax.org B.V. nor the
 *       names of its contributors may be used to endorse or promote products
 *       derived from this software without specific prior written permission.
 * 
 * THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS "AS IS" AND
 * ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED
 * WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE
 * DISCLAIMED. IN NO EVENT SHALL AJAX.ORG B.V. BE LIABLE FOR ANY
 * DIRECT, INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES
 * (INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES;
 * LOSS OF USE, DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND
 * ON ANY THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT
 * (INCLUDING NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS
 * SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
 *
 * ***** END LICENSE BLOCK ***** */

define(function(require, exports, module) {
"use strict";

var oop = require("./lib/oop");
var dom = require("./lib/dom");
var event = require("./lib/event");
var EventEmitter = require("./lib/event_emitter").EventEmitter;

/**
 * class ScrollBar
 *
 * A set of methods for setting and retrieving the editor's scrollbar. 
 *
 **/

/**
 * new ScrollBar(parent)
 * - parent (DOMElement): A DOM element 
 *
 * Creates a new `ScrollBar`. `parent` is the owner of the scroll bar.
 *
 **/
var ScrollBar = function(parent) {
    this.element = dom.createElement("div");
    this.element.className = "ace_scrollbar";

    this.inner = dom.createElement("div");
    this.inner.className = "ace_scrollbar-inner";
    this.element.appendChild(this.inner);

    parent.appendChild(this.element);

    // in OSX lion the scrollbars appear to have no width. In this case resize
    // the to show the scrollbar but still pretend that the scrollbar has a width
    // of 0px
    // in Firefox 6+ scrollbar is hidden if element has the same width as scrollbar
    // make element a little bit wider to retain scrollbar when page is zoomed 
    this.width = dom.scrollbarWidth(parent.ownerDocument);
    this.element.style.width = (this.width || 15) + 5 + "px";

    event.addListener(this.element, "scroll", this.onScroll.bind(this));
};

(function() {
    oop.implement(this, EventEmitter);

    /**
     * ScrollBar@scroll(e)
     * - e (Object): Contains one property, `"data"`, which indicates the current scroll top position
     *
     * Emitted when the scroll bar, well, scrolls.
     *
     **/
    this.onScroll = function() {
        this._emit("scroll", {data: this.element.scrollTop});
    };

    /**
     * ScrollBar.getWidth() -> Number
     *
     * Returns the width of the scroll bar.
     *
     **/
    this.getWidth = function() {
        return this.width;
    };

    /**
     * ScrollBar.setHeight(height)
     * - height (Number): The new height
     *
     * Sets the height of the scroll bar, in pixels.
     *
     **/
    this.setHeight = function(height) {
        this.element.style.height = height + "px";
    };

    /**
     * ScrollBar.setInnerHeight(height)
     * - height (Number): The new inner height
     *
     * Sets the inner height of the scroll bar, in pixels.
     *
     **/
    this.setInnerHeight = function(height) {
        this.inner.style.height = height + "px";
    };

    /**
     * ScrollBar.setScrollTop(scrollTop)
     * - scrollTop (Number): The new scroll top
     *
     * Sets the scroll top of the scroll bar.
     *
     **/
    // TODO: on chrome 17+ for small zoom levels after calling this function
    // this.element.scrollTop != scrollTop which makes page to scroll up.
    this.setScrollTop = function(scrollTop) {
        this.element.scrollTop = scrollTop;
    };

}).call(ScrollBar.prototype);

exports.ScrollBar = ScrollBar;
});
