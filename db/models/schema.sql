CREATE TABLE IF NOT EXISTS users (
  user_id SERIAL PRIMARY KEY,
  username VARCHAR(50) NOT NULL UNIQUE,
  password VARCHAR(30) NOT NULL,
  age INT NOT NULL,
  height_feet INT NOT NULL,
  height_inches INT NOT NULL,
  weight INT NOT NULL,
  goal_weight INT NOT NULL,
  goal_date DATE,
  calorie_goal INT,
  isAdmin BOOLEAN NOT NULL
);

CREATE TABLE IF NOT EXISTS workouts (
  workout_id SERIAL PRIMARY KEY,
  user_id INT NOT NULL REFERENCES users(user_id),
  notes VARCHAR (5000),
  meal_notes VARCHAR (5000),
  date DATE NOT NULL
);

CREATE TABLE IF NOT EXISTS exercise_details (
  exercise_detail_id SERIAL PRIMARY KEY,
  name VARCHAR (100) UNIQUE,
  type VARCHAR (50),
  muscle_group VARCHAR (50),
  equipment VARCHAR (50),
  difficulty VARCHAR (50),
  instructions VARCHAR(5000)
);

CREATE TABLE IF NOT EXISTS exercises (
  exercise_id SERIAL PRIMARY KEY,
  exercise_detail_id INT NOT NULL REFERENCES exercise_details(exercise_detail_id),
  user_id INT NOT NULL REFERENCES users(user_id),
  weight INT,
  sets INT,
  reps INT,
  duration INT,
  intensity INT,
  calories_burned INT,
  date DATE NOT NULL
);

CREATE TABLE IF NOT EXISTS food (
  food_id SERIAL PRIMARY KEY,
  user_id INT NOT NULL REFERENCES users(user_id),
  name VARCHAR(50) NOT NULL,
  date DATE NOT NULL,
  category VARCHAR (50),
  quantity INT NOT NULL,
  calories INT NOT NULL,
  protein INT NOT NULL,
  description VARCHAR(5000)
);

CREATE TABLE IF NOT EXISTS quotes (
  quote_id SERIAL PRIMARY KEY,
  quote_text VARCHAR(5000)
);

CREATE TABLE IF NOT EXISTS messages (
  message_id SERIAL PRIMARY KEY,
  message VARCHAR(5000),
  date DATE NOT NULL
);

