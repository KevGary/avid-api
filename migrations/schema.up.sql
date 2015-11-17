CREATE TABLE guardians (
  id serial primary key,
  name varchar(60)
);

CREATE TABLE kids (
  id serial primary key,
  name varchar(60),
  gender varchar(10),
  age integer
);

CREATE TABLE activities (
  id serial primary key,
  name varchar(60)
);

CREATE TABLE relationships (
  id serial primary key,
  guardian_id int references guardians(id) ON DELETE cascade,
  kid_id int references kids(id) ON DELETE CASCADE
);

CREATE TABLE interests (
  id serial primary key,
  kid_id int references kids(id) ON DELETE CASCADE,
  activity_id int references activities(id) ON DELETE cascade
);