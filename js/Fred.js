// I wanted to divide the real functionality into these functions
// so the code poem would directly cause the output
// but I couldn't figure it out in time

function Draw(a_circle)	{}
function Name_it(Fred)	{}
function Make_his_dream(to_become_red) {}
function Do(some_magic)	{}           
function Dreams_come(True) {}
function Make_Fred_want(a_different_hue) {}

////// CODE POEM STARTS HERE //////
Draw('a_circle');
Name_it('Fred');

Make_his_dream('to become red');

Do('some_magic');

Dreams_come(true);

Make_Fred_want('a different hue');
///////////////////////////////////


//////////////////// REAL FUNCTIONALITY //////////////////////////
var display_line = function(line, timeout) {
	var poem_div = document.getElementById('poem');
	var new_line = document.createElement('p');
	poem_div.appendChild(new_line);
	var time_taken = 0;
	for(var i = 0; i < line.length; i++) {
		window.setTimeout(function(phrase) {
			new_line.appendChild(document.createTextNode(phrase));
		}, timeout + time_taken, line[i]);
		time_taken += 200
	}
	return time_taken;
}

var init_poem = function() {
	var long_pause = 1000;
	var short_pause = 400;

	var canvas = document.getElementById('display');
	if(!canvas.getContext) {
		console.log('unable to retrieve canvas element');
		return;
	}
	var ctx = canvas.getContext('2d');

	// lines of the limerick broken up into syllables
	var limerick = [
		['There ', 'once ', 'was ', 'a ', 'cir', 'cle ', 'named ', 'Fred'],
		['He ', 'dreamed ', 'to ', 'be ', 'stroked ', 'with ', 'bright ', 'red '],
		['Yay ', 'C', 'S', 'S'],
		['His ', 'dream, ', 'a ', 'suc', 'cess'],
		['But ', 'now ', 'he ', 'wants ', 'yel', 'low ', 'in', 'stead']
	];

	// display first line of poem
	var timeout = 0;
	timeout += display_line(limerick[0], timeout);

	// Draw Fred the circle
	var Fred = new Path2D();
	var Fred_x = canvas.width / 4;
	var Fred_y = 2*canvas.height / 3;
	var Fred_r = 75;
	Fred.arc(Fred_x, Fred_y, Fred_r, 0, 2*Math.PI, true);

	timeout += long_pause;
	window.setTimeout(function(ctx, Fred) {
		ctx.fillStyle = '#fff';
		ctx.strokeStyle = '#bbb';
		ctx.lineWidth = 10;
		ctx.fill(Fred);
		ctx.stroke(Fred);
	}, timeout, ctx, Fred);

	// Label Fred and give him a face
	var Fred_eyes = new Path2D();
	var Fred_eye_radius = 10;
	Fred_eyes.arc(Fred_x - Fred_r / 2, 
				  Fred_y - 10,
				  Fred_eye_radius, 
				  0, 2*Math.PI, true);
	Fred_eyes.arc(Fred_x + Fred_r / 2, 
				  Fred_y - 10,
				  Fred_eye_radius, 
				  0, 2*Math.PI, true);

	var Fred_mouth = new Path2D();
	Fred_mouth.arc(Fred_x, Fred_y, Fred_r - 20,
					 0.4*Math.PI, 0.6*Math.PI, false);

	var text_x = Fred_x + Fred_r + 10;
	var text_y = Fred_y + 20;

	timeout += short_pause;
	window.setTimeout(
	function(ctx, text_x, text_y, Fred_eyes, Fred_mouth) {
		ctx.font = '48px monospace';
		ctx.strokeStyle = '#bbb';
		ctx.lineWidth = 1;
		ctx.strokeText('<-Fred', text_x, text_y);

		ctx.fillStyle = '#bbb';
		ctx.fill(Fred_eyes);

		ctx.lineWidth = 5;
		ctx.stroke(Fred_mouth);
	}, timeout, ctx, text_x, text_y, Fred_eyes, Fred_mouth);

	// display second line of poem
	timeout += long_pause;
	timeout += display_line(limerick[1], timeout);

	// Draw the thought bubble
	var thought_bubble = new Path2D();
	var width = Fred_r * 3;
	var height = Fred_r * 2;
	var x = Fred_x + 1.5*Fred_r;
	var y = Fred_y - 2*Fred_r;
	var radius = 20;
	thought_bubble.moveTo(x,y+radius);
	thought_bubble.lineTo(x,y+height-radius);
	thought_bubble.quadraticCurveTo(x,y+height,x+radius,y+height);
	thought_bubble.lineTo(x+width-radius,y+height);
	thought_bubble.quadraticCurveTo(x+width,y+height,x+width,y+height-radius);
	thought_bubble.lineTo(x+width,y+radius);
	thought_bubble.quadraticCurveTo(x+width,y,x+width-radius,y);
	thought_bubble.lineTo(x+radius,y);
	thought_bubble.quadraticCurveTo(x,y,x,y+radius);

	timeout += long_pause;
	window.setTimeout(function(ctx, thought_bubble, text_x, text_y) {
		ctx.clearRect(text_x, text_y - 50, 200, 100);

		ctx.fillStyle = '#eee';
		ctx.lineWidth = 5;
		ctx.strokeStyle = '#eee';
		ctx.stroke(thought_bubble);
		ctx.fill(thought_bubble);

		ctx.strokeStyle = '#bbb';
		ctx.setLineDash([15, 5]);
		ctx.stroke(thought_bubble);
		ctx.setLineDash([]);
	}, timeout, ctx, thought_bubble, text_x, text_y);

	// Draw the contents of thought bubble
	var inner_circle = new Path2D();
	inner_circle.arc(x+width/2, y+height/2, height/3, 0, Math.PI*2);

	timeout += short_pause;
	window.setTimeout(function(ctx, circle) {
		ctx.strokeStyle = '#FF3D3D';
		ctx.lineWidth = 3;
		ctx.fillStyle = '#fff';
		ctx.fill(circle);
		ctx.stroke(circle);
	}, timeout, ctx, inner_circle);

	// display third line of poem
	timeout += long_pause;
	timeout += display_line(limerick[2], timeout);

	// Change Fred's color to red
	timeout += short_pause;
	window.setTimeout(function(Fred, Fred_eyes, Fred_mouth) {
		ctx.strokeStyle = '#FF3D3D';
		ctx.lineWidth = 10;
		ctx.stroke(Fred);

		ctx.fillStyle = '#FF3D3D';
		ctx.fill(Fred_eyes);

		ctx.lineWidth = 5;
		ctx.stroke(Fred_mouth);
	}, timeout, Fred, Fred_eyes, Fred_mouth);

	// display fourth line of poem
	timeout += short_pause;
	timeout += display_line(limerick[3], timeout);

	// Change Fred's expression to happy
	Fred_mouth = new Path2D();
	Fred_mouth.arc(Fred_x, Fred_y, Fred_r - 20,
					 0.1*Math.PI, 0.9*Math.PI, false)

	timeout += short_pause;
	window.setTimeout(function(Fred_mouth) {
		ctx.strokeStyle = '#FF3D3D';
		ctx.lineWidth = 5;
		ctx.stroke(Fred_mouth);
	}, timeout, Fred_mouth);

	// display last line of poem
	timeout += short_pause;
	timeout += display_line(limerick[4], timeout);

	// Change the contents of the thought bubble
	timeout += long_pause;
	window.setTimeout(function(ctx, circle) {
		ctx.strokeStyle = '#F5FF3D';
		ctx.lineWidth = 5;
		ctx.stroke(circle);
	}, timeout, ctx, inner_circle);

	// Change Fred's facial expression
	Fred_mouth = new Path2D();
	Fred_mouth.arc(Fred_x, Fred_y + Fred_r, Fred_r - 20,
				   1.2*Math.PI, 1.8*Math.PI, false);

	timeout += short_pause;
	window.setTimeout(function(ctx, Fred, eyes, mouth) {
		ctx.strokeStyle = '#FF3D3D';
		ctx.fillStyle = '#fff';
		ctx.lineWidth = 10;
		ctx.fill(Fred);
		ctx.stroke(Fred);

		ctx.fillStyle = '#FF3D3D';
		ctx.fill(Fred_eyes);

		ctx.lineWidth = 5;
		ctx.stroke(Fred_mouth);
	}, timeout, ctx, Fred, Fred_eyes, Fred_mouth);
}

init_poem();