const process = require("process");
const fs = require("fs");
const configurationFile = process.argv[2];
const changesFile = process.argv[3];

// Read fucntion
const readData = (file) => {
  return fs.readFileSync(file, "utf-8", (err) => {
    if (err) return console.error(err);
  });
};

// write json updated object into json file
const writeData = (file, datas) => {
  fs.writeFile(file, JSON.stringify(datas, null, 2), (err) => {
    if (err) return console.log(err);
    console.log("writted to " + file);
  });
};

// set values to json obj
const setValue = (obj, str, val) => {
  str = str.split(".");
  // transform string into valid path to add the value at the correct place
  while (str.length > 1) obj = obj[str.shift()];
  // check if it's an array
  if (str[0].slice(-1) === "]") {
    // cut the string to get the index of the array
    var index = str[0].split("[").slice(1);
    index = index[0].slice(0, -1);
    // get the name of the array
    str[0] = str[0].split("[");
    var lastObj = str[0][0];
    // get the current datas of the array to inject the value at the good place
    var tabDatas = obj[lastObj];
    // inject the new datas
    tabDatas[index] = val;
    // return the new array
    return (obj[lastObj] = tabDatas);
  }
  // return the new json object
  return (obj[str.shift()] = val);
};

// check if there's 2 arguments
if (process.argv[2] && process.argv[3]) {
  let configuration = JSON.parse(readData(configurationFile));
  const changes = readData(changesFile).split("\n");

  changes.forEach((line) => {
    // remove the quotes to only get the string
    const lineSplitted = line.replace(/\"/g, "").split(": ");
    // check if it's a single value like string/int or a json object
    if (lineSplitted.length > 2) {
      var tmp = lineSplitted[0];
      lineSplitted.shift();
      lineSplitted[1] = JSON.parse(
        // put back the quotes to json object
        lineSplitted
          .join('": "')
          .replace("{ ", '{ "')
          .replace(" }", '" }')
          .replace(", ", '", "')
      );
      lineSplitted[0] = tmp;
    }
    // setting the new values
    setValue(configuration, lineSplitted[0], lineSplitted[1]);
  });
  // writting the final object into the file
  writeData(configurationFile, configuration);
} else {
  console.log("[USAGE]: node main.js configurationFile.json change.txt");
}
