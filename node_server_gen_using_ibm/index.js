const cloudant = require('./lib/cloudant.js');
const neatCsv = require('neat-csv');
const fs = require('fs')

var data;

fs.readFile('./signal.csv', async (err, data) => {
    if (err) {
        console.error(err)
        return
    }
    // specific treatment depending on CSV
    someData = await neatCsv(data);
    data = Object.keys(someData[0]).map(number => +number);

    var iter = 0;
    var value = 0;
    setTimeout(function () {
        setInterval(function () {
            try {
                value = data[iter];
                console.log(`${iter}:${value}`);
                iter++;
                if (iter >= data.length) iter = 0

                cloudant
                    .create('someType', value, 'someUserID')
                    .then(data => {
                        if (data.statusCode != 201) {
                            console.log(data.statusCode)
                        } else {
                            console.log(data.data)
                        }
                    })
                    .catch(err => console.error(err));
            } catch (e) { }
        }, 250); // Interval to emulate the sensor update.
    }, 5000); // Timeout to initialize the DB connection. TODO: improve the connector to be async.
})

/* TEST */
// setTimeout(function () {
//     setInterval(function () {
//         try {
//             cloudant
//                 .create('someType', Math.random(), 'someUserID')
//                 .then(data => {
//                     if (data.statusCode != 201) {
//                         console.log(data.statusCode)
//                     } else {
//                         console.log(data.data)
//                     }
//                 })
//                 .catch(err => console.error(err));
//         } catch (e) { }
//     }, 250); // Interval to emulate the sensor update.
// }, 5000); // Timeout to initialize the DB connection. TODO: improve the connector to be async.

/**
 * Get a list of resources
 *
 * The query string may contain the following qualifiers:
 *
 * - type
 * - name
 * - userID
 *
 * A list of resource objects will be returned (which can be an empty list)
 */
// app.get('/api/resource', (req, res) => {
//     const type = req.query.type;
//     const name = req.query.name;
//     const userID = req.query.userID;
//     cloudant
//       .find(type, name, userID)
//       .then(data => {
//         if (data.statusCode != 200) {
//           res.sendStatus(data.statusCode)
//         } else {
//           res.send(data.data)
//         }
//       })
//       .catch(err => handleError(res, err));
//   });