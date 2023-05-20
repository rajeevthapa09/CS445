const jsonString = `{
    "window": {
        "title": "Sample Widget",
        "width": 500,
        "height": 500
    },
    "image": {
        "src": "images/logo.png",
        "coords": [250, 150, 350, 400],
        "alignment": "center"
    },
    "messages": [
        { "text": "Save", "offset": [10, 30] },
        { "text": "Help", "offset": [0, 50] },
        { "text": "Quit", "offset": [30, 10] }
    ],
    "debug": "true"
}`;

const obj = JSON.parse(jsonString);
console.log(obj.window.title);
console.log(obj.image.coords[2]);
console.log(obj.messages.length);

const len = obj.messages.length -1;
obj.message[len].offset[0]
obj.messages.at(-1).offset[0]

