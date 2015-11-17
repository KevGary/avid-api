CREATE TABLE gaurdians (
  id serial primary key,
  name varchar(60)
);

CREATE TABLE kids (
  id serial primary key,
  name varchar(60),
  gender varchar(10),
  age integer
);