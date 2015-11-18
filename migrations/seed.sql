INSERT INTO
  guardians
VALUES
  ( default, 'Rachel Gimp' ),
  ( default, 'Richard Levy' ),
  ( default, 'Lynold Friedman' ),
  ( default, 'Mary Cariah' ),
  ( default, 'Tom Strongholde' ),
  ( default, 'Sally Rallycaps' );

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
  ( default, (SELECT id FROM kids WHERE id = 1), (SELECT id FROM activities WHERE id = 1) );