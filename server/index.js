// const path = require('path');
// const express = require('express');
// const bodyParser = require('body-parser');
// const morgan = require('morgan');
// let db = require('../db/index.js').pool;

// require('dotenv').config();
// const app = express();

// app.use(morgan('dev'));
// app.use(bodyParser.json());
// app.use(express.static('index.html'));

// app.get('/get', get);
// app.post('/add', add);

import path from "path";
import express from "express";
import bodyParser from "body-parser";
import { db } from "./connect.js";
import dotenv from "dotenv";
import axios from "axios";
import cors from "cors";
dotenv.config();
const app = express();
app.use(cors());
app.use(bodyParser.json());
app.use(express.static("index.html"));


//---------------------------login------------------------------

app.get('/login', (req, res) =>{
  db.query('SELECT user_id FROM users WHERE username = $1 AND password = $2', [
    req.query.username,
    req.query.password
  ]).then((data, err) => {
    if(data.rows.length === 0) {
      console.log('User does not exist')
      res.send(JSON.stringify('NO USER'))
    } else {
      res.send(202);
    }
  });
});

app.post('/new-user', (req, res) => {
  console.log(req.body)
  let formattedDate = new Date(req.body.goal_date).toISOString().substr(0, 10).replace(/-/g, '');
  console.log(req.body)
  db.query('INSERT INTO users (username, password, age, height_feet, height_inches, weight, goal_weight, goal_date, calorie_goal) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9)', [
    req.body.username,
    req.body.password,
    req.body.age,
    req.body.height_feet,
    req.body.height_inches,
    req.body.weight,
    req.body.goal_weight,
    req.body.goal_date,
    req.body.calories
  ]).then(() => {
    console.log('Inserted new user Successfully')
    res.send(202)
  }).catch((err) => {
    console.log(err)
    res.send(JSON.stringify('USER EXISTS'))
  })

});
//---------------------------dashboard------------------------------
app.get("/profiles", (req, res) => {
  db.query(`SELECT * FROM users WHERE user_id  = ${req.query.profile_id}`).then(
    (userInfo) => {
      console.log(userInfo.rows);
      res.send(userInfo.rows);
    }
  );
  // get information from db about users based on profile_id
  // res.send { userimglink, age, weight, target weight, height, calorie goal}
});

app.post("/profiles", (req, res) => {
  db.query(
    `UPDATE users SET age = $1, height_feet = $2, height_inches = $3, weight = $4, goal_weight = $5, goal_date = $6, calorie_goal = $7  WHERE user_id = ${req.query.profile_id} `,
    [
      req.body.age,
      req.body.height_feet,
      req.body.height_inches,
      req.body.weight,
      req.body.goal_weight,
      req.body.goal_date,
      req.body.calorie_goal,
    ]
  ).then(() => {
    console.log("Update Sucessfully");
    res.send(202);
  });
  // in db find by user profile_id and update the information that has been been passed
  // {imageURL, age, weight, target weight, height, calorie goal}
  //front end will display the new information in a state
});
//---------------------------workouts------------------------------

app.get("/exercises", (req, res) => {
  console.log(req.query);
  db.query("SELECT * FROM exercise_details WHERE muscle_group = $1", [
    req.query.muscle,
  ]).then((exercises) => {
    res.send(exercises.rows);
  });
});

app.get('/daily-workout', (req, res) => {
  db.query('SELECT * FROM exercises FULL OUTER JOIN exercise_details ON exercises.exercise_detail_id = exercise_details.exercise_detail_id WHERE exercises.date = '$1' AND user_id = $2', [req.query.date, req.query.userId]) .then((workouts) => {
    res.send(workouts.rows)
  })
})

app.post("/new-exercise", (req, res) => {
  db.query(
    "INSERT INTO exercises (exercise_detail_id, user_id, date, weight, sets, reps, duration, intensity, calories_burned) VALUES ($1, $2, $3,$4,$5,$6,$7,$8, $9)",
    [
      req.body.exerciseDetail,
      req.body.userId,
      req.body.date,
      req.body.weight,
      req.body.sets,
      req.body.reps,
      req.body.duration,
      req.body.intensity,
      req.body.caloriesBurned,
    ]
  ).then(() => {
    console.log("Insert new workout Succesfully");
    res.send(202);
  });
});

app.put("/edit-workout", (req, res) => {
  db.query(
    "UPDATE exercises SET weight = $1, sets = $2 , reps = $3, duration = $4, intensity = $5 WHERE exercise_id = $6",
    [
      req.body.weight,
      req.body.sets,
      req.body.reps,
      req.body.duration,
      req.body.intensity,
      req.body.exerciseId,
    ]
  ).then(() => {
    console.log("Update Workout Success");
    res.send(202);
  });
});

app.put('/edit-workout', (req, res) => {
  db.query('UPDATE exercises SET weight = $1, sets = $2 , reps = $3, duration = $4, intensity = $5 WHERE exercise_id = $6', [req.body.weight, req.body.sets, req.body.reps, req.body.duration, req.body.intensity, req.body.exerciseId ]).then(() => {
    console.log('Update Workout Success')
    res.send(202)
  })
})

app.delete('/delete', (req, res) => {
    db.query('DELETE FROM exercises WHERE exercise_id = $1', [req.query.exerciseId]).then(() => {
      console.log('Deleted Succesfully')
      res.send(202)
    })
})

app.post('/notes', (req, res) => {
  db.query('INSERT INTO workouts (user_id, notes, date) VALUES ($1, $2, $3 )', [req.body.userId, req.body.notes, req.body.date]).then(() => {
    console.log('Added Notes Successfully')
    res.send(202)
  })
})

app.put('/edit-notes', (req, res) => {
  db.query('UPDATE workouts SET notes = $1 WHERE date = $2', [req.body.notes, req.body.date]).then(() => {
    console.log('Edit notes Sucessfully')
    res.send(202);
  });
});

app.post("/notes", (req, res) => {
  // console.log(req.body);
  // db.query('INSERT INTO workouts (user_id, notes, date) VALUES ($1, $2, $3 )', [req.body.userId, req.body.notes, req.body.date]).then(() => {
  //   console.log('Added Notes Successfully')
  //   res.send(202)
  // })
});

app.put("/edit-notes", (req, res) => {
  // console.log(req.body);
  // db.query('UPDATE workouts SET notes = $1 WHERE date = $2', [req.body.notes, req.body.date]).then(() => {
  //   console.log('Edit notes Sucessfully')
  //   res.send(202);
  // })
});
//---------------------------meals---------------------------------

app.get("/nutrition", (req, res) => {
  console.log(req.query.food);
  axios
    .get("https://api.api-ninjas.com/v1/nutrition/", {
      headers: {
        "X-Api-Key": process.env.API_KEY,
      },
      params: {
        query: req.query.food,
      },
    })
    .then((information) => {
      let foody = information.data[0];
      foody.calories = Math.ceil(foody.calories);
      foody.protein_g = Math.ceil(foody.protein_g);
      foody.serving_size_g = Math.ceil(foody.serving_size_g);
      db.query(
        "INSERT INTO food (user_id, name, date, category, calories, protein, description, quantity) VALUES ($1, $2, $3, $4, $5, $6, $7, $8 )",
        [
          req.query.userId,
          foody.name,
          req.query.date,
          req.query.category,
          foody.calories,
          foody.protein_g,
          req.query.description,
          foody.serving_size_g,
        ]
      ).then(() => {
        console.log("Added to database");
        res.send(foody);
      });
    });
});

app.get("/daily-meals", (req, res) => {
  console.log(req.query);
  db.query(
    "SELECT * FROM food WHERE date = $1 AND user_id =  $2 ORDER BY category DESC",
    [req.query.date, req.query.userId]
  ).then((allMeals) => {
    res.send(allMeals.rows);
  });
});

app.put("/edit-meal", (req, res) => {
  db.query("UPDATE food SET quantity = $2 WHERE id= $1", [
    req.body.foodId,
    req.body.quantity,
  ]).then(() => {
    console.log("Edited food successfully");
    res.send(202);
  });
});

app.delete("/delete-meal", (req, res) => {
  db.query("DELETE FROM food WHERE foodId = $1", [req.body.foodId]).then(() => {
    console.log("Deleted meal successfully");
    res.send(202);
  });
});

//---------------------------calendar------------------------------
// get all the daily meals matching the date given if this is the choice delete one because it's been copy/pasted

// app.get('/daily-meals', (req, res) => {
//   console.log(req.query)
//   db.query('SELECT * FROM food WHERE date = $1 AND user_id =  $2 ORDER BY category DESC', [req.query.date, req.query.userId]).then((allMeals) => {
//     res.send(allMeals.rows)
//   })
// })

// or get all for the month
app.get("/monthly-meals", (req, res) => {
  db.query(
    "SELECT * FROM food WHERE EXTRACT(MONTH FROM date) = $1 AND EXTRACT (YEAR FROM date) = $2",
    [req.query.month, req.query.year]
  ).then((foods) => {
    res.send(foods.rows);
  }); //month year
});

// get all the calories for the monthly, ideally by [date, calorie]
app.get("/monthly-calories", (req, res) => {
  db.query(
    "SELECT date, calories FROM food WHERE EXTRACT(MONTH FROM date) = $1 AND EXTRACT (YEAR FROM date) = $2 AND user_id = $3",
    [req.query.month, req.query.year, req.query.userId]
  ).then((calories) => {
    res.send(calories.rows);
  });
});
//get daily rountine by day if this is the choice delete one because it's copy/pasted

// app.get('/daily-workout', (req, res) => {
//   db.query(`SELECT * FROM exercises  WHERE date = $1 AND user_id = $2`, [req.query.date, req.query.userId]) .then((workouts) => {
//     res.send(workouts.rows)
//   })
// })

//monthly option
app.get("/monthly-workout", (req, res) => {
  db.query(
    "SELECT * FROM exercises WHERE EXTRACT(MONTH FROM date) = $1 AND EXTRACT (YEAR FROM date) = $2 AND user_id = $3",
    [req.query.month, req.query.year, req.query.userId]
  ).then((workouts) => {
    res.send(workouts.rows);
  });
});

// type of training
app.get("/training", (req, res) => {
  db.query(
    "SELECT type FROM exercise_details INNER JOIN exercises ON exercises.exercise_detail_id = exercise_details.exercise_detail_id WHERE exercises.exercise_id = $1",
    [req.query.exerciseId]
  ).then((training) => {
    res.send(training.rows);
  });
});
const PORT = process.env.PORT || 8080;

app.listen(PORT, () => {
  console.log(`Running on port: ${PORT}`);
});
