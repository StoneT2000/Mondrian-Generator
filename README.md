# Mondrian Art Generator
Draw Mondrian-esque art by clicking generate, and hover your mouse around the white canvas to draw the art

Working demo provided here https://stonet2000.github.io/Mondrian-Generator/

## Technical
Created using HTML, p5.js, jQuery

How is it generated?

Initially, random x-values and y-values (treating the canvas as a coordinate plane) are chosen. Those values then form up-down or left-right lines respectively, serving as the intial rectangles on the canvas, of which those rectangles are stored in an array.

Then, using a function that randomly chooses an existing rectangle, it chooses either to split the rectangle with a up-down or left-right line, then chooses a random x-value or y-value within the boundary of that rectangle and creates two new rectangles and removes the old rectangle. This process is repeated several times to generate Mondrian-esque art.
