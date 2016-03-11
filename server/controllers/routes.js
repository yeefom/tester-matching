module.exports = function (app) {
  var data;

  app.get('/api/data', function (req, res) {
    if (!data) {
      // parse data if this is the first API call ever
      require('../utilities/data.js')()
      .then(function (parsedData) {
        data = parsedData;
        res.status(200).send(data);
      });
    } else {
      res.status(200).send(data);
    }
  });
};
