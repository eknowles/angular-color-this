angular-color-this
===

Generate a unique color from a string. Spice up your app and add some color.

## Installation

`bower install angular-color-this --save`

Source the file in your HTML

`<script src="bower_components/angular-color-this/dist/angular-color-this.min.js"></script>`

Add it to your app!

`angualr.module('myApp', ['ngColorThis'])`

## Usage

ngColorThis will set the CSS of an element to a generated color using a string as an input.

For example, we have an API that outputs a unique code, we don't know what the codes will be, but we know there will be duplicates.

Our design team wants these to stand out in our apps, the solution? ngColorThis. We can generate a unique color and use it to modify the style of an element (background-color, color, border-color)
