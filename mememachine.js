var tags = [
	"For making memes on the go.",
	"Don't let your memes be dreams!",
	"JUST DO IT!",
	"When you need to meme real quick but can't stand watermarks.",
	"<a href='https://www.youtube.com/watch?v=BdAUvAXCUW8'>Meme Machine</a>",
	"For when you have the urge to just meme."
];

var canvas;
var context;

var imageSrc;

var image = new Image();
image.crossOrigin = "anonymous";
var topText;
var bottomText;

var dataSource;

$(document).ready(function() {

	$('#tag').html(tags[Math.floor(Math.random() * tags.length)]);

	canvas = document.getElementById("meme");
	context = canvas.getContext("2d");

	$("#top, #bottom, #url").on("input", update);
	$("#file").change(function() {
		var reader = new FileReader();
		reader.addEventListener("load", function() {
			imageSrc = reader.result;
		});
		var file = document.getElementById("file").files[0];
		if (file) {
			reader.readAsDataURL(file);
		}
	});

	$("#go").click(function() {
		scrollTo($("#create"));
	});
	$("#next").click(function() {
		scrollTo($("#text"));
	});
	$("#finished").click(function() {
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

		context.font = "72px Impact, League Gothic";
		context.fillStyle = "white";
		context.strokeStyle = "black";
		context.lineWidth = 2.5;
		context.textAlign = "center";

		if (topText) {
			drawText(topText, canvas.width / 2, 72, canvas.width, 72)
		}

		if (bottomText) {
			var textHeight = getTextHeight(bottomText, canvas.width, 72);
			drawText(bottomText, canvas.width / 2, image.height - 24 - textHeight, canvas.width, 72);
		}

		dataSource = canvas.toDataURL();
		$("#export").attr("src", dataSource);
	}

	window.requestAnimationFrame(function() {
		draw(canvas, context);
	});
}

function drawText(text, x, y, maxWidth, lineHeight) {
	var words = text.split(" ");
	var line = "";

	for (var i = 0; i < words.length; i++) {
		var testLine = line + words[i] + " ";
		var metrics = context.measureText(testLine);
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
	var words = text.split(" ");
	var line = "";

	var lineCount = 0;

	for (var i = 0; i < words.length; i++) {
		var testLine = line + words[i] + " ";
		var metrics = context.measureText(testLine);
		if (metrics.width > maxWidth && i > 0) {
			lineCount++;
			line = words[i] + " ";
		} else {
			line = testLine;
		}
	}
	return lineCount * lineHeight;
}