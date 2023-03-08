INSERT INTO users (username, password, age, height_feet, height_inches, weight, goal_weight, goal_date, calorie_goal, isAdmin)
VALUES
  ('JimBrah', 'admin', 28, 6, 0, 180, 170, '2023-12-31', 2000, true),
  ('SwoletrainJohnson', 'password123', 28, 5, 10, 180, 170, '2023-12-31', 2000, false),
  ('RonnyRipped-stein', 'pass1234', 35, 5, 5, 150, 140, '2023-09-30', 1800, false),
  ('HerculesHernandez', 'letmein', 42, 6, 0, 200, 190, '2024-06-30', 2200, false),
  ('FlexLuger', '123456', 25, 5, 3, 120, 115, '2023-11-15', 1600, false),
  ('BulkHogan', 'password', 30, 5, 8, 170, 160, '2023-10-01', 1900, false),
  ('MuscleMary', 'password123', 32, 5, 6, 145, 135, '2023-11-30', 1800, false),
  ('TheRockHard', 'pass1234', 29, 5, 11, 200, 190, '2023-10-31', 2200, false),
  ('BrawnThunder', 'letmein', 27, 5, 7, 160, 150, '2023-12-31', 1900, false),
  ('MightyMolly', '123456', 33, 5, 4, 120, 110, '2023-11-15', 1600, false),
  ('TheHulkster', 'password', 36, 5, 10, 190, 180, '2023-10-01', 2100, false);


INSERT INTO exercises (exercise_detail_id, user_id, weight, sets, reps, duration, intensity, calories_burned, date)
VALUES
  (1, 1, 100, 3, 10, NULL, NULL, NULL, '2023-03-09'),
  (2, 2, 80, 4, 12, NULL, NULL, NULL, '2023-03-09'),
  (1, 1, 95, 3, 12, NULL, NULL, 450, '2023-03-10'),
  (2, 2, 75, 4, 15, NULL, NULL, NULL, '2023-03-10'),
  (1, 3, 120, 5, 8, NULL, NULL, 280, '2023-03-09'),
  (2, 3, 130, 5, 10, NULL, NULL, 320, '2023-03-09'),
  (3, 3, 140, 5, 12, NULL, NULL, 360, '2023-03-10'),
  (4, 3, 150, 5, 15, NULL, NULL, 400, '2023-03-10'),
  (1, 5, 100, 3, 10, NULL, NULL, NULL, '2023-03-09'),
  (2, 6, 80, 4, 12, NULL, NULL, NULL, '2023-03-09'),
  (1, 5, 95, 3, 12, NULL, NULL, NULL, '2023-03-10'),
  (2, 6, 75, 4, 15, NULL, NULL, NULL, '2023-03-12'),
  (1, 7, 120, 5, 8, NULL, NULL, 280, '2023-03-09'),
  (2, 7, 130, 5, 10, NULL, NULL, 320, '2023-03-09'),
  (3, 7, 140, 5, 12, NULL, NULL, 360, '2023-03-10'),
  (4, 7, 150, 5, 15, NULL, NULL, 400, '2023-03-12'),
  (1, 8, 90, 4, 10, NULL, NULL, 210, '2023-03-09'),
  (2, 9, 100, 3, 12, NULL, NULL, NULL, '2023-03-09'),
  (1, 8, 85, 3, 12, NULL, NULL, NULL, '2023-03-10'),
  (2, 9, 90, 4, 15, NULL, NULL, NULL, '2023-03-10'),
  (1, 4, 110, 5, 8, NULL, NULL, 280, '2023-03-09'),
  (2, 4, 120, 5, 10, NULL, NULL, 320, '2023-03-09'),
  (3, 10, 130, 5, 12, NULL, NULL, 360, '2023-03-12'),
  (4, 10, 140, 5, 15, NULL, NULL, 400, '2023-03-10'),
  (1, 5, 110, 4, 10, NULL, NULL, NULL, '2023-03-09'),
  (2, 6, 90, 3, 12, NULL, NULL, NULL, '2023-03-09'),
  (1, 5, 105, 3, 12, NULL, NULL, NULL, '2023-03-10'),
  (2, 6, 70, 4, 15, NULL, NULL, NULL, '2023-03-11'),
  (1, 7, 125, 5, 8, NULL, NULL, 280, '2023-03-09'),
  (2, 7, 135, 5, 10, NULL, NULL, 320, '2023-03-09');

INSERT INTO workouts (user_id, notes, date)
VALUES
  (1, 'Leg day!', '2023-03-09'),
  (1, 'Chest and triceps', '2023-03-10'),
  (1, 'Back and biceps', '2023-03-13'),
  (2, 'Back and biceps', '2023-03-09'),
  (2, 'Shoulders and abs', '2023-03-10'),
  (2, 'Chest and triceps', '2023-03-14'),
  (3, 'Full body workout', '2023-03-09'),
  (3, 'Leg day!', '2023-03-10'),
  (3, 'HIIT training', '2023-03-11'),
  (4, 'Chest and triceps', '2023-03-09'),
  (4, 'Full body workout', '2023-03-10'),
  (4, 'Shoulders and abs', '2023-03-14'),
  (5, 'Back and biceps', '2023-03-09'),
  (5, 'Leg day!', '2023-03-11'),
  (5, 'Shoulders and abs', '2023-03-12'),
  (6, 'Full body workout', '2023-03-09'),
  (6, 'Leg day!', '2023-03-10'),
  (6, 'Back and biceps', '2023-03-13');

INSERT INTO messages (message, date) VALUES
('Please remember to log your meals and exercises today.', '2023-03-08'),
('Friendly reminder to drink plenty of water throughout the day.', '2023-03-10'),
('Don''t forget to take rest days for optimal muscle recovery!', '2023-03-11'),
('Great job on your workouts this week, keep up the good work!', '2023-03-14'),
('If you have any questions or concerns, please don''t hesitate to reach out to us!', '2023-03-15');

INSERT INTO quotes (quote_text) VALUES
  ('I don''t believe in leg day. Every day is leg day when you''re trying to get jacked.'),
  ('I don''t need a gym buddy, I''ve got my reflection in the mirror.'),
  ('The only way to stop me from lifting is if I''m on my death bed, and even then I''ll probably ask for a spotter.'),
  ('I don''t skip leg day, I skip rest day.'),
  ('Abs are made in the kitchen, but biceps are made in the gym.'),
  ('May the gains be with you.'),
  ('Keep your friends close, but your dumbbells closer'),
  ('The greatest trick the devil ever pulled was convincing the world he wasn''t swole.'),
  ('If you lift it, gains will come.'),
  ('The future belongs to those who lift in the present.'),
  ('The gains of the many outweigh the gains of the few.'),
  ('Ask not what your muscles can do for you, ask what you can do for your muscles.');






