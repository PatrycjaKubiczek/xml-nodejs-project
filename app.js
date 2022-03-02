const fs = require("fs");
const { create } = require("xmlbuilder2");

const driverArr = [];

//----------------------------//
// below values can be modified

const driversNumber = 20;

const driverNames = [
  "John Doe",
  "Mikolaj Matenka",
  "Patrycja Kubiczek",
  "Floki",
];

const countryNames = ["POL", "DEU", "GBR", "FRA", "ITA", "AUT", "AUS", "CAN"];

const driverLiveryNames = [
  "2000 Ferrari 3#",
  "2000 McLaren-Mercedes 1#",
  "2000 McLaren-Mercedes 2#",
  "2000 Ferrari 4#",
  "2000 Williams-BMW 9#",
  "2000 Benetton-Playlife 11#",
  "2000 Williams-BMW 10#",
  "2000 Jordan-Mugen Honda 6#",
  "2000 Sauber-Petronas 17#",
  "2000 Arrows-Supertec 19#",
  "2000 Jaguar-Cosworth 7#",
  "2000 BAR-Honda 23#",
  "2000 Prost-Peugeot 14#",
  "2000 Toyota 25#",
  "2000 Minardi-Fondmetal 21#",
  "2000 Sauber-Petronas 16#",
  "2000 Arrows-Supertec 18#",
  "2000 Jaguar-Cosworth 8#",
  "2000 Minardi-Fondmetal 20#",
  "2000 BAR-Honda 22#",
  "2000 Prost-Peugeot 15#",
  "2000 Jordan-Mugen Honda 5#",
  "2000 Benetton-Playlife 12#",
  "2000 Toyota 24#",
];

// don't modify code below
//----------------------------//

function randomInteger(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

const getRandom = (function (array) {
  let notGivenItems = array.map(function (el) {
    return el;
  });
  let getIndex = function () {
    return Math.floor(Math.random() * notGivenItems.length);
  };

  return function () {
    if (notGivenItems.length === 0) {
      return;
    }
    return notGivenItems.splice(getIndex(), 1)[0];
  };
})(driverNames); // items, in your case

for (var i = 0; i < driversNumber; i++) {
  driverArr.push({
    "@livery_name":
      driverLiveryNames[Math.floor(randomInteger(1, driverLiveryNames.length)) - 1],
    name: getRandom(),
    country: countryNames[randomInteger(1, countryNames.length)],
    race_skill: randomInteger(0.6, 1).toFixed(2),
    qualifying_skill: randomInteger(0.6, 1).toFixed(2),
    aggression: randomInteger(0.6, 1).toFixed(2),
    defending: randomInteger(0.6, 1).toFixed(2),
    stamina: randomInteger(0.6, 1).toFixed(2),
    consistency: randomInteger(0.6, 1).toFixed(2),
    start_reactions: randomInteger(0.6, 1).toFixed(2),
    wet_skill: randomInteger(0.6, 1).toFixed(2),
    tyre_management: randomInteger(0.6, 1).toFixed(2),
    blue_flag_conceding: randomInteger(0.6, 1).toFixed(2),
    weather_tyre_changes: randomInteger(0.6, 1).toFixed(2),
  });
}

const jsonString = `{
  "custom_ai_drivers": {
      "driver": ${JSON.stringify(driverArr)}
    }
}`;

const doc = create(jsonString);
const xml = doc.end({ prettyPrint: true });
// console.log(xml);

// change saved file name here
fs.writeFile("test.xml", xml, function (err) {
  if (err) {
    return console.log(err);
  }
  console.log("The file was saved!");
});
