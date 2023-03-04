CREATE DATABASE shredded_db

CREATE SCHEMA shredded

CREATE TABLE IF NOT EXISTS users (
  user_id SERIAL PRIMARY KEY,
  username VARCHAR(30) NOT NULL,
  password VARCHAR(30) NOT NULL,
  age INT NOT NULL,
  height_feet INT NOT NULL,
  height_inches INT NOT NULL,
  weight INT NOT NULL,
  goal_weight INT NOT NULL,
  goal_date DATE,
  calorie_goal INT
)

CREATE TABLE IF NOT EXISTS workouts (
  workout_id SERIAL PRIMARY KEY,
  user_id INT NOT NULL REFERENCES users(user_id),
  date DATE NOT NULL
)

CREATE TABLE IF NOT EXISTS exercise_details (
  exercise_detail_id SERIAL PRIMARY KEY,
  name VARCHAR (100),
  type VARCHAR (50),
  muscle_group VARCHAR (50),
  equipment VARCHAR (50),
  difficulty VARCHAR (50),
  date DATE NOT NULL
)

CREATE TABLE IF NOT EXISTS exercises (
  exercise_id SERIAL PRIMARY KEY,
  workout_id INT NOT NULL REFERENCES workouts(workout_id),
  exercise_detail_id INT NOT NULL REFERENCES exercise_details(exercise_detail_id),
  weight INT,
  sets INT,
  reps INT,
  duration INT,
  intensity INT,
  notes VARCHAR (2000),
  calories_burned INT NOT NULL
)

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
)


