var express = require('express');
var router = express.Router();

//pg config
var pg = require('pg');
var conString = 'postgres://@localhost/avidapi';

//Gaurdians
//get all
router.get('/gaurdians', function(req, res, next) {
  pg.connect(conString, function(err, client, done) {
     console.log(conString)
    if (err) {
      return console.error('error fetching client from pool', err);
    }
    console.log("connected to database");
    client.query('SELECT * FROM gaurdians', function(err, result) {
      done();
      if (err) {
        return console.error('error running query', err);
      }
      res.send(result);
    });
  });
});

//post gaurdian
router.post('/gaurdians', function(req, res, next) {
  pg.connect(conString, function(err, client, done) {
    if (err) {
      return console.error('error fetching client from pool', err);
    }
    console.log("connected to database");
    client.query('INSERT INTO gaurdians(name) VALUES($1) returning id', [req.body.data.attributes.name], function(err, result) {
      done();
      if(err) {
        return console.error('error running query', err);
      }
      res.send(result);
      //output: 1 
    });
  });
});

//get one
router.get('/gaurdians/:id', function(req, res, next) {
  pg.connect(conString, function(err, client, done) {
    if (err) {
      return console.error('error fetching client from pool', err);
    }
    console.log("connected to database");
    client.query('SELECT * FROM gaurdians WHERE id = $1', [req.params.id], function(err, result) {
      done();
      console.log(req.params.id)
      if (err) {
        return console.error('error running query', err);
      }
      res.send(result);
    });
  });
});

//Kids
//get all
router.get('/kids', function(req, res, next) {
  pg.connect(conString, function(err, client, done) {
    console.log(conString)
    if (err) {
      return console.error('error fetching client from pool', err);
    }
    console.log("connected to database");
    client.query('SELECT * FROM kids', function(err, result) {
      done();
      if (err) {
        return console.error('error running query', err);
      }
      res.send(result);
    });
  });
});

// //insert one
// router.post('/kids', function(req, res, next) {
//   pg.connect(conString, function(err, client, done) {
//     if (err) {
//       return console.error('error fetching client from pool', err);
//     }
//     console.log("connected to database");
//     client.query('INSERT INTO kids(name) VALUES($1) returning id', [req.body.data.attributes.name], function(err, result) {
//       done();
//       if(err) {
//         return console.error('error running query', err);
//       }
//       res.send(result);
//       //output: 1 
//     });
//   });
// });

// //get one
// router.get('/kids/:id', function(req, res, next) {
//   pg.connect(conString, function(err, client, done) {
//     if (err) {
//       return console.error('error fetching client from pool', err);
//     }
//     console.log("connected to database");
//     client.query('SELECT * FROM kids WHERE id = $1', [req.params.id], function(err, result) {
//       done();
//       console.log(req.params.id)
//       if (err) {
//         return console.error('error running query', err);
//       }
//       res.send(result);
//     });
//   });
// });

module.exports = router;
