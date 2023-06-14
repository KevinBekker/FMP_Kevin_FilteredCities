var fs = require("fs");

fs.readFile("population.json", "utf-8", function (err, data) {
    // Throw error if importing fails
    if (err) throw err;

    // Parse data from JSON file into array with objects. Define empty array to push filtered data in
    var obj = JSON.parse(data);
    let similarArray = [];

    // Map over all objects (cities) in the array, filtering all with a population between 240.000 and 300.000 citizens.
    obj.map((x, index) => {
        if (x.population > 240000 && x.population < 300000) {
            let tempObj = {
                cityName: x.name,
                country: x.country_code,
                coordinates: x.coordinates,
                population: x.population,
                modification_date: x.modification_date,
            };
            //Push city name, coordinates and population number in new array to be used for analysis.
            similarArray.push(tempObj);
        }
    });

    // Sort the array by country code from A to Z
    const sortedData = similarArray.sort((a, b) => {
        if (a.country < b.country) return -1;
        if (a.country > b.country) return 1;
        return 0;
    });

    // Create a JSON format string of the array with similar sized cities to Eindhoven
    const jsonData = JSON.stringify(sortedData, null, 2);
    // Write it to a file called 'export.json'
    fs.writeFile("export.json", jsonData, (err) => {
        if (err) {
            console.error("Error:", err);
        } else {
            console.log("JSON file saved.");
        }
    });

    // The code below is used for some quick data for writing my report.
    console.log(
        "Number of cities with a similar population size to Eindhoven: " +
            sortedData.length
    );
});
