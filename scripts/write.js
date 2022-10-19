const fs = require("fs");

let content = [];

// add json to content
content.push({ a: 1, b: 2 });

try {
  fs.writeFile("results.json", JSON.stringify(content), (err) => {
    if (err) throw err;
    console.log("The file has been saved!");
  });
  // file written successfully
} catch (err) {
  console.error(err);
}
