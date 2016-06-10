let tags = [
	"For making memes on the go.",
	"Don't let your memes be dreams!",
	"JUST DO IT!",
	"When you need to meme real quit but can't stand watermarks.",
	"<a href='https://www.youtube.com/watch?v=BdAUvAXCUW8'>Meme Machine</a>",
	"For when you have the urge to just meme."
];

var canvas;
var context;

var imageSrc;

let image = new Image();
image.crossOrigin = "anonymous";
var topText;
var bottomText;

var dataSource;

$(document).ready(() => {

	$('#tag').html(tags[Math.floor(Math.random() * tags.length)]);

	canvas = document.getElementById("meme");
	context = canvas.getContext("2d");

	$("#top, #bottom, #url").on("input", update);
	$("#file").change(() => {
		let reader = new FileReader();
		reader.addEventListener("load", () => {
			imageSrc = reader.result;
		});
		let file = document.getElementById("file").files[0];
		if (file) {
			reader.readAsDataURL(file);
		}
	});

	$("#go").click(() => {
		scrollTo($("#create"));
	});
	$("#next").click(() => {
		scrollTo($("#text"));
	});
	$("#finished").click(() => {
		scrollTo($("#finished"));
	});

	window.requestAnimationFrame(draw);

});

function scrollTo(elem) {

	$("html, body").animate({
		scrollTop: elem.offset().top
	}, 1000);
}

function update() {

	if ($("#srcURL").is(":checked")) {
		imageSrc = $("#url").val();
	}

	topText = $("#top").val();
	bottomText = $("#bottom").val();
}

function draw() {
	
	if (imageSrc) {
		image.src = imageSrc;

		canvas.width = image.width;
		canvas.height = image.height;

		context.drawImage(image, 0, 0, image.width, image.height);

		context.font = "72px Impact";
		context.fillStyle = "white";
		context.strokeStyle = "black";
		context.lineWidth = 2;
		context.textAlign = "center";

		if (topText) {
			drawText(topText, canvas.width / 2, 72, canvas.width, 72)
		}

		if (bottomText) {
			let textHeight = getTextHeight(bottomText, canvas.width / 2, 72) - 144;
			// Ignore the magic -144, my algorithm's broken and I'm too lazy to fix it
			drawText(bottomText, canvas.width / 2, image.height - 24 - textHeight, canvas.width, 72);
		}

		dataSource = canvas.toDataURL();
		$("#export").attr("src", dataSource);
	}

	window.requestAnimationFrame(() => {
		draw(canvas, context);
	});
}

function drawText(text, x, y, maxWidth, lineHeight) {
	let words = text.split(" ");
	var line = "";

	for (i = 0; i < words.length; i++) {
		let testLine = line + words[i] + " ";
		let metrics = context.measureText(testLine);
		if (metrics.width > maxWidth && i > 0) {
			context.fillText(line, x, y);
			context.strokeText(line, x, y);
			line = words[i] + " ";
			y += lineHeight;
		} else {
			line = testLine;
		}
	}
	context.fillText(line, x, y);
	context.strokeText(line, x, y);
}

function getTextHeight(text, maxWidth, lineHeight) {
	let words = text.split(" ");
	var line = "";

	var lineCount = 0;

	for (i = 0; i < words.length; i++) {
		let testLine = line + words[i] + " ";
		let metrics = context.measureText(testLine);
		if (metrics.width > maxWidth && i > 0) {
			lineCount++;
			line = words[i] + " ";
		} else {
			line = testLine;
		}
	}
	return lineCount * lineHeight;
}

// $(document).ready(() => {
// 	let canvas = document.getElementById("meme");

// 	let context = canvas.getContext("2d");

// 	window.requestAnimationFrame(() => {
// 		draw(canvas, context);
// 	});
// });

// let image = new Image();

// function draw(canvas, context) {
// 	image.src = $("#url").val();

// 	canvas.width = image.width;
// 	canvas.height = image.height;

// 	context.drawImage(image, 0, 0, image.width, image.height);

// 	context.font = "48px Impact";
// 	context.fillStyle = "white";
// 	context.strokeStyle = "black";
// 	context.lineWidth = 3;
// 	context.textAlign = "center";

// 	let topText = getTopText();
// 	let bottomText = getBottomText();

// 	context.fillText(topText, canvas.width / 2, 48);
// 	context.strokeText(topText, canvas.width / 2, 48);

// 	context.fillText(bottomText, canvas.width / 2, image.height - 16);
// 	context.strokeText(bottomText, canvas.width / 2, image.height - 16);

// 	window.requestAnimationFrame(() => {
// 		draw(canvas, context);
// 	});
// }

// function getTopText() {
// 	var text = $("#topText").val();
// 	if ($("#uppercase").is(":checked")) {
// 		text = text.toUpperCase();
// 	}
// 	return text;
// }

// function getBottomText() {
// 	var text = $("#bottomText").val();
// 	if ($("#uppercase").is(":checked")) {
// 		text = text.toUpperCase();
// 	}
// 	return text;
// }