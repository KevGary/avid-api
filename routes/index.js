var express = require('express');
var router = express.Router();
var Promise = require('promise');
var jwt = require('jsonwebtoken');
var expressJwt = require('express-jwt');
var bcrypt = require('bcrypt');

var jwtSecret = process.env.SECRET;

//pg config
var pg = require('pg');
var conString = process.env.DATABASE_URL;

var storedUser = {
      name: 'kev',
      email: 'money@m.com',
      password: 'p'
}
router.use(expressJwt({secret: process.env.SECRET}).unless({ path: [ '/', '/login', '/register' ] }));
//Authenticate
// router.get('/random-user', function(req, res, next) {
//   pg.connect(conString, function(err, client, done) {
//     if (err) {
//       return console.error('error fetching client from pool', err);
//     }
//     console.log("connected to database");
//     var random = Math.floor(Math.random() * (6)) + 1;
//     client.query('SELECT * FROM guardians WHERE id = $1', [random], function(err, result) {
//       done();
//       if (err) {
//         return console.error('error running query', err);
//       }
//       res.send(result);
//     });
//   });
// });
// router.post('/register', function(req, res, next) {
//   pg.connect(conString, function(err, client, done) {
//     if (err) {
//       return console.error('error fetching client from pool', err);
//     }
//     console.log("connected to database");
//       // var hash = bcrypt.hashSync(req.body.data.attributes.password, 8);
//     client.query('INSERT INTO guardians(name, email, password) VALUES($1, $2, $3) returning id', [req.body.user.name, req.body.user.email, req.body.user.password], function(err, result) {
//       done();
//       if(err) {
//         return console.error('error running query', err);
//       }
//       res.send(result);
//     });
//   });

//   console.log(req.body)
//   var token = jwt.sign({
//     email: storedUser.email
//   }, jwtSecret);
//   res.send({
//     token: token,
//     user: storedUser
//   })
// });
router.post('/login', function(req, res, next) {
  if(req.body.user.email == "" || req.body.user.password == "") {
    res.status(400).end('Must provide username and password');
  }
  pg.connect(conString, function(err, client, done) {
    if (err) {
      return console.error('error fetching client from pool', err);
    }
    console.log("connected to database");
    client.query('SELECT * FROM guardians WHERE email = $1 AND password = $2', [req.body.user.email, req.body.user.password], function(err, result) {
      done();
      console.log(req.body.user)
      if (err) {
        return console.error('error running query', err);
      } else if (result.rows.length < 1) {
        res.status(400).end('User or password incorrect');
      } else {
        var token = jwt.sign({
          id: result.rows[0].id
        }, jwtSecret);
        res.send({
          token: token,
          user: result.rows[0]
        })
      }
    });
  });

});

//UTIL FNCS
// function authenticate(req, res, next) {
//   if(req.body.user.email == "" || req.body.user.password == "") {
//     res.status(400).end('Must provide username and password');
//   }
//   if(req.body.user.email !== storedUser.email || req.body.user.password !== storedUser.password) {
//     res.status(400).end('User or password incorrect');
//   }
//   next();
// }

//Guardians
//get all
router.get('/guardians', function(req, res, next) {
  pg.connect(conString, function(err, client, done) {
    if (err) {
      return console.error('error fetching client from pool', err);
    }
    console.log("connected to database");
    client.query('SELECT * FROM guardians', function(err, result) {
      done();
      if (err) {
        return console.error('error running query', err);
      }
      res.send(result);
    });
  });
});

//post guardian
router.post('/guardians', function(req, res, next) {
  pg.connect(conString, function(err, client, done) {
    if (err) {
      return console.error('error fetching client from pool', err);
    }
    console.log("connected to database");
    // var hash = bcrypt.hashSync(req.body.data.attributes.password, 8);
    client.query('INSERT INTO guardians(name, email, password) VALUES($1, $2, $3) returning id', [req.body.data.attributes.name, req.body.data.attributes.email, req.body.data.attributes.password], function(err, result) {
      done();
      if(err) {
        return console.error('error running query', err);
      }
      res.send(result);
    });
  });
});
//get one
router.get('/guardians/:id', function(req, res, next) {
  pg.connect(conString, function(err, client, done) {
    if (err) {
      return console.error('error fetching client from pool', err);
    }
    console.log("connected to database");
    client.query('SELECT * FROM guardians WHERE id = $1', [req.params.id], function(err, result) {
      done();
      console.log(req.params.id)
      if (err) {
        return console.error('error running query', err);
      }
      res.send(result);
    });
  });
});
// update one
router.put('/guardians/update/:id', function(req, res, next) {
  pg.connect(conString, function(err, client, done) {
    if (err) {
      return console.error('error fetching client from pool', err);
    }
    console.log("connected to database");
    //query for password (storedPW)
    //compare with .compareSync(req.body.data.attributes.password, storedPW)
    client.query('UPDATE guardians SET name = $2, email = $3, password = $4  WHERE id = $1', [req.params.id, req.body.data.attributes.name, req.body.data.attributes.email, req.body.data.attributes.password], function(err, result) {
      done();
      console.log(req.params.id)
      if (err) {
        return console.error('error running query', err);
      }
      res.send(result);
    });
  });
});
//delete all
router.delete('/guardians/delete', function(req, res, next) {
  pg.connect(conString, function(err, client, done) {
     console.log(conString)
    if (err) {
      return console.error('error fetching client from pool', err);
    }
    console.log("connected to database");
    client.query('DELETE FROM guardians', function(err, result) {
      done();
      if (err) {
        return console.error('error running query', err);
      }
      res.send(result);
    });
  });
});
//delete one
router.delete('/guardians/delete/:id', function(req, res, next) {
  pg.connect(conString, function(err, client, done) {
     console.log(conString)
    if (err) {
      return console.error('error fetching client from pool', err);
    }
    console.log("connected to database");
    client.query('DELETE FROM guardians WHERE id = $1',[req.params.id], function(err, result) {
      done();
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
//insert one
router.post('/kids', function(req, res, next) {
  pg.connect(conString, function(err, client, done) {
    if (err) {
      return console.error('error fetching client from pool', err);
    }
    console.log("connected to database");
    client.query('INSERT INTO kids(name, gender, age) VALUES($1, $2, $3) returning id', [req.body.data.attributes.name, req.body.data.attributes.gender, req.body.data.attributes.age], function(err, result) {
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
router.get('/kids/:id', function(req, res, next) {
  pg.connect(conString, function(err, client, done) {
    if (err) {
      return console.error('error fetching client from pool', err);
    }
    console.log("connected to database");
    client.query('SELECT * FROM kids WHERE id = $1', [req.params.id], function(err, result) {
      done();
      console.log(req.params.id)
      if (err) {
        return console.error('error running query', err);
      }
      res.send(result);
    });
  });
});
// update one
router.put('/kids/update/:id', function(req, res, next) {
  pg.connect(conString, function(err, client, done) {
    if (err) {
      return console.error('error fetching client from pool', err);
    }
    console.log("connected to database");
    client.query('UPDATE kids SET name = $1 WHERE id = $2', [req.body.data.attributes.name, req.params.id], function(err, result) {
      done();
      console.log(req.params.id)
      if (err) {
        return console.error('error running query', err);
      }
      res.send(result);
    });
  });
});
//delete all
router.delete('/kids/delete', function(req, res, next) {
  pg.connect(conString, function(err, client, done) {
     console.log(conString)
    if (err) {
      return console.error('error fetching client from pool', err);
    }
    console.log("connected to database");
    client.query('DELETE FROM kids', function(err, result) {
      done();
      if (err) {
        return console.error('error running query', err);
      }
      res.send(result);
    });
  });
});
//delete one
router.delete('/kids/delete/:id', function(req, res, next) {
  pg.connect(conString, function(err, client, done) {
     console.log(conString)
    if (err) {
      return console.error('error fetching client from pool', err);
    }
    console.log("connected to database");
    client.query('DELETE FROM kids WHERE id = $1',[req.params.id], function(err, result) {
      done();
      if (err) {
        return console.error('error running query', err);
      }
      res.send(result);
    });
  });
});

//Activities
//get all
router.get('/activities', function(req, res, next) {
  pg.connect(conString, function(err, client, done) {
    console.log(conString)
    if (err) {
      return console.error('error fetching client from pool', err);
    }
    console.log("connected to database");
    client.query('SELECT * FROM activities', function(err, result) {
      done();
      if (err) {
        return console.error('error running query', err);
      }
      res.send(result);
    });
  });
});

//insert one
router.post('/activities', function(req, res, next) {
  pg.connect(conString, function(err, client, done) {
    if (err) {
      return console.error('error fetching client from pool', err);
    }
    console.log("connected to database");
    client.query('INSERT INTO activities(name) VALUES($1) returning id', [req.body.data.attributes.name], function(err, result) {
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
router.get('/activities/:id', function(req, res, next) {
  pg.connect(conString, function(err, client, done) {
    if (err) {
      return console.error('error fetching client from pool', err);
    }
    console.log("connected to database");
    client.query('SELECT * FROM activities WHERE id = $1', [req.params.id], function(err, result) {
      done();
      console.log(req.params.id)
      if (err) {
        return console.error('error running query', err);
      }
      res.send(result);
    });
  });
});
// //get one using kid id
// router.get('/activities/kid/:id', function(req, res, next) {
//   pg.connect(conString, function(err, client, done) {
//     if (err) {
//       return console.error('error fetching client from pool', err);
//     }
//     console.log("connected to database");
//     client.query('SELECT * FROM activities WHERE kid_id = $1', [req.params.id], function(err, result) {
//       done();
//       console.log(req.params.id)
//       if (err) {
//         return console.error('error running query', err);
//       }
//       res.send(result);
//     });
//   });
// });
// //get one using kid id
// router.get('/activities/guardian/:id', function(req, res, next) {
//   pg.connect(conString, function(err, client, done) {
//     if (err) {
//       return console.error('error fetching client from pool', err);
//     }
//     console.log("connected to database");
//     client.query('SELECT * FROM activities WHERE guardian = $1', [req.params.id], function(err, result) {
//       done();
//       console.log(req.params.id)
//       if (err) {
//         return console.error('error running query', err);
//       }
//       res.send(result);
//     });
//   });
// });
// update one
router.put('/activities/update/:id', function(req, res, next) {
  pg.connect(conString, function(err, client, done) {
    if (err) {
      return console.error('error fetching client from pool', err);
    }
    console.log("connected to database");
    client.query('UPDATE activities SET name = $1 WHERE id = $2', [req.body.data.attributes.name, req.params.id], function(err, result) {
      done();
      console.log(req.params.id)
      if (err) {
        return console.error('error running query', err);
      }
      res.send(result);
    });
  });
});
//delete all
router.delete('/activities/delete', function(req, res, next) {
  pg.connect(conString, function(err, client, done) {
     console.log(conString)
    if (err) {
      return console.error('error fetching client from pool', err);
    }
    console.log("connected to database");
    client.query('DELETE FROM activities', function(err, result) {
      done();
      if (err) {
        return console.error('error running query', err);
      }
      res.send(result);
    });
  });
});
//delete one
router.delete('/activities/delete/:id', function(req, res, next) {
  pg.connect(conString, function(err, client, done) {
     console.log(conString)
    if (err) {
      return console.error('error fetching client from pool', err);
    }
    console.log("connected to database");
    client.query('DELETE FROM activities WHERE id = $1',[req.params.id], function(err, result) {
      done();
      if (err) {
        return console.error('error running query', err);
      }
      res.send(result);
    });
  });
});

//Relationships
//get all
router.get('/relationships', function(req, res, next) {
  pg.connect(conString, function(err, client, done) {
    console.log(conString)
    if (err) {
      return console.error('error fetching client from pool', err);
    }
    console.log("connected to database");
    client.query('SELECT * FROM relationships', function(err, result) {
      done();
      if (err) {
        return console.error('error running query', err);
      }
      res.send(result);
    });
  });
});
//post one
router.post('/relationships', function(req, res, next) {
  pg.connect(conString, function(err, client, done) {
    if (err) {
      return console.error('error fetching client from pool', err);
    }
    console.log("connected to database");
    client.query('INSERT INTO relationships(guardian_id, kid_id) VALUES($1, $2) returning id', [req.body.data.attributes.guardian_id, req.body.data.attributes.kid_id], function(err, result) {
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
router.get('/relationships/:id', function(req, res, next) {
  pg.connect(conString, function(err, client, done) {
    if (err) {
      return console.error('error fetching client from pool', err);
    }
    console.log("connected to database");
    client.query('SELECT * FROM relationships WHERE guardian_id = $1', [req.params.id], function(err, result) {
      done();
      console.log(req.params.id)
      if (err) {
        return console.error('error running query', err);
      }
      res.send(result);
    });
  });
});
// update one
router.put('/relationships/update/:id', function(req, res, next) {
  pg.connect(conString, function(err, client, done) {
    if (err) {
      return console.error('error fetching client from pool', err);
    }
    console.log("connected to database");
    console.log(req.body);
    client.query('UPDATE relationships SET guardian_id = $2, kid_id = $3 WHERE id = $1', [req.params.id, req.body.data.attributes.guardian_id, req.body.data.attributes.kid_id], function(err, result) {
      done();
      if (err) {
        return console.error('error running query', err);
      }
      res.send(result);
    });
  });
});
//delete all
router.delete('/relationships/delete', function(req, res, next) {
  pg.connect(conString, function(err, client, done) {
     console.log(conString)
    if (err) {
      return console.error('error fetching client from pool', err);
    }
    console.log("connected to database");
    client.query('DELETE FROM relationships', function(err, result) {
      done();
      if (err) {
        return console.error('error running query', err);
      }
      res.send(result);
    });
  });
});
//delete one
router.delete('/relationships/delete/:id', function(req, res, next) {
  pg.connect(conString, function(err, client, done) {
     console.log(conString)
    if (err) {
      return console.error('error fetching client from pool', err);
    }
    console.log("connected to database");
    client.query('DELETE FROM relationships WHERE id = $1',[req.params.id], function(err, result) {
      done();
      if (err) {
        return console.error('error running query', err);
      }
      res.send(result);
    });
  });
});

//Interests
//get all
router.get('/interests', function(req, res, next) {
  pg.connect(conString, function(err, client, done) {
    console.log(conString)
    if (err) {
      return console.error('error fetching client from pool', err);
    }
    console.log("connected to database");
    client.query('SELECT * FROM interests', function(err, result) {
      done();
      if (err) {
        return console.error('error running query', err);
      }
      res.send(result);
    });
  });
});
//post one
router.post('/interests', function(req, res, next) {
  pg.connect(conString, function(err, client, done) {
    if (err) {
      return console.error('error fetching client from pool', err);
    }
    console.log("connected to database");
    client.query('INSERT INTO interests(kid_id, activity_id, duration) VALUES($1, $2, $3) returning id', [req.body.data.attributes.kid_id, req.body.data.attributes.activity_id, req.body.data.attributes.duration], function(err, result) {
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
router.get('/interests/:id', function(req, res, next) {
  pg.connect(conString, function(err, client, done) {
    if (err) {
      return console.error('error fetching client from pool', err);
    }
    console.log("connected to database");
    client.query('SELECT * FROM interests WHERE id = $1', [req.params.id], function(err, result) {
      done();
      if (err) {
        return console.error('error running query', err);
      }
      res.send(result);
    });
  });
});
// update one
router.put('/interests/update/:id', function(req, res, next) {
  pg.connect(conString, function(err, client, done) {
    if (err) {
      return console.error('error fetching client from pool', err);
    }
    console.log("connected to database");
    client.query('UPDATE interests SET kid_id = $2, activity_id = $3, duration = $4 WHERE id = $1', [req.params.id, req.body.data.attributes.kid_id, req.body.data.attributes.activity_id, req.body.data.attributes.duration], function(err, result) {
      done();
      if (err) {
        return console.error('error running query', err);
      }
      res.send(result);
    });
  });
});
//delete all
router.delete('/interests/delete', function(req, res, next) {
  pg.connect(conString, function(err, client, done) {
     console.log(conString)
    if (err) {
      return console.error('error fetching client from pool', err);
    }
    console.log("connected to database");
    client.query('DELETE FROM interests', function(err, result) {
      done();
      if (err) {
        return console.error('error running query', err);
      }
      res.send(result);
    });
  });
});
//delete one
router.delete('/interests/delete/:id', function(req, res, next) {
  pg.connect(conString, function(err, client, done) {
     console.log(conString)
    if (err) {
      return console.error('error fetching client from pool', err);
    }
    console.log("connected to database");
    client.query('DELETE FROM interests WHERE id = $1',[req.params.id], function(err, result) {
      done();
      if (err) {
        return console.error('error running query', err);
      }
      res.send(result);
    });
  });
});




module.exports = router;
