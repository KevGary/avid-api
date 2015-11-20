INSERT INTO
  guardians
VALUES
  ( default, 'Rachel Gimp', 'rachelgimp@example.com', 'fruitloops' ),
  ( default, 'Richard Levy', 'richardlevy@example.com', 'down' ),
  ( default, 'Lynold Friedman', 'lynoldfriedman@example.com', 'up' ),
  ( default, 'Mary Cariah', 'marycariah@example.com', 'red' ),
  ( default, 'Tom Strongholde', 'tomstrongholde@example.com', 'blue' ),
  ( default, 'Sally Rallycaps', 'sallyrallycaps@example.com', 'green' );

INSERT INTO
  kids
VALUES
  ( default, 'Childish Gimp', 'male', 8 ),
  ( default, 'Mike Levy', 'male', 5 ),
  ( default, 'Sue Friedman', 'female', 6 ),
  ( default, 'Jackie Cariah', 'female', 7 ),
  ( default, 'Phil Strongholde', 'male', 9),
  ( default, 'Rosie Rallycaps', 'female', 7 );

INSERT INTO
  activities
VALUES
  ( default, 'Basketball' ),
  ( default, 'Baseball' ),
  ( default, 'Running' ),
  ( default, 'Jungle Gym' ),
  ( default, 'Hiking' ),
  ( default, 'Swimming' );


INSERT INTO
  relationships
VALUES
  ( default, (SELECT id FROM guardians WHERE id = 1), (SELECT id FROM kids WHERE id = 1) );

INSERT INTO
  interests
VALUES
  ( default, (SELECT id FROM kids WHERE id = 1), (SELECT id FROM activities WHERE id = 1), 20 );