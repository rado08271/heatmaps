document.getElementById('data').placeholder = "Pass data generated by simulation...\n\n48.7083349|21.2620832|0\n48.704875|21.2584312|0\n...";

function parseInput(data) {
    var object = [];
    var addressPoints = [];

    var lines = data.split("\n");

    lines.forEach((i) => parseLines(i));

    function parseLines(line) {
        var parsed = line.split('|');
        if (parsed.length < 3){
            return
        }
        var value = parseFloat(parsed[0]) + parseFloat(parsed[1]);
        if (object[value] == null) {
            object[value.toString()] = [parsed[0], parsed[1], 0];
        }
        object[value.toString()][2] += 1
    }

    Object.keys(object).forEach(function (key) {
        addressPoints.push(object[key])
    });

    return addressPoints
}

function loadMap() {
    addressPoints = parseInput(document.getElementById('data').value);
    document.getElementById('configMenu').hidden = true;
    document.getElementById('mapContainer').hidden = false;

    var map = L.map('map').setView([parseFloat(document.getElementById('lat').value), parseFloat(document.getElementById('lon').value)], 15);

    console.log(addressPoints);

    var tiles = L.tileLayer('https://cartodb-basemaps-{s}.global.ssl.fastly.net/light_all/{z}/{x}/{y}.png', {
        attribution: '&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors',
    }).addTo(map);

    addressPoints = addressPoints.map(function (p) {
        return [p[0], p[1]];
    });

    var heat = L.heatLayer(addressPoints).addTo(map);
}