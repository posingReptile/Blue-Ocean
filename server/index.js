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
import fs from "fs";
import dotenv from "dotenv";
import axios from "axios";
import cors from "cors";
import session from "express-session";
import { fileURLToPath } from 'url';
import pgSession from 'connect-pg-simple';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const createLog = (req, res, next) => {
  res.on("finish", function() {
    console.log(req.method, req.session, decodeURI(req.url), res.statusCode, res.statusMessage);
  });
  next();
};

dotenv.config();
const app = express();
app.use(cors());
app.use(createLog);
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname + "/../dist/")));
app.use(
  session({
    store : new (pgSession(session))({
      createTableIfMissing : true,
      pool : db
    }),
    secret : "secret",
    resave : true,
    unset: 'destroy',
    saveUninitialized : true
  })
)

//---------------------------Session----------------------------
app.get('/session', (req, res) => {
  console.log(req)
  res.send(req.session)
})

//---------------------------login------------------------------
app.get('/logout', (req, res) => {
  console.log('logging out')
  req.session = null;
  res.send('logged out')
})

app.get("/login", (req, res) => {
  db.query("SELECT * FROM users WHERE username = $1 AND password = $2", [
    req.query.username,
    req.query.password,
  ]).then((data, err) => {
    if (data.rows.length === 0) {
      console.log("User does not exist");
      res.send(JSON.stringify("NO USER"));
    } else {
      req.session.username = req.query.username;
      req.session.user_id = data.rows[0].user_id;
      req.session.isadmin = data.rows[0].isadmin;
      res.send(data.rows[0])
    }
  });
});

app.post("/new-user", (req, res) => {
  let formattedDate = new Date(req.body.goal_date)
    .toISOString()
    .substr(0, 10)
    .replace(/-/g, "");
  db.query(
    "INSERT INTO users (username, password, age, height_feet, height_inches, weight, goal_weight, goal_date, calorie_goal, isadmin) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10) RETURNING *",
    [
      req.body.username,
      req.body.password,
      req.body.age,
      req.body.height_feet,
      req.body.height_inches,
      req.body.weight,
      req.body.goal_weight,
      req.body.goal_date,
      req.body.calories,
      req.body.isadmin,
    ]
  )
    .then((data) => {
      console.log("Inserted new user Successfully", data.rows[0]);
      for(key in data.rows[0]){
        req.session(key) = data.rows[0](key)
      }
      req.session.username = req.body.username;
      req.session.user_id = data.rows[0].user_id;
      req.session.isadmin = data.rows[0].isadmin;
      console.log(req.session);
      res.send(data.rows[0]);
    })
    .catch((err) => {
      console.log(err);
      res.send(JSON.stringify("USER EXISTS"));
    });
});

//---------------------------dashboard------------------------------
app.get("/profiles/:profile_id", (req, res) => {
  db.query(
    `SELECT * FROM users WHERE user_id  = ${req.params.profile_id}`
  ).then((userInfo) => {
    // console.log(userInfo.rows)
    res.send(userInfo.rows);
  });
  // get information from db about users based on profile_id
  // res.send { userimglink, age, weight, target weight, height, calorie goal}
});

app.post("/profiles/:profile_id", (req, res) => {
  db.query(
    `UPDATE users SET age = $1, height_feet = $2, height_inches = $3, weight = $4, goal_weight = $5, goal_date = $6, calorie_goal = $7  WHERE user_id = ${req.params.profile_id} `,
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
});

// to get message if there is one from the admin

app.get("/message", (req, res) => {
  db.query("SELECT message FROM messages WHERE date = $1", [
    req.query.date,
  ]).then((message) => {
    res.send(message.rows);
  });
});
//---------------------------workouts------------------------------

app.get("/exercises", (req, res) => {
  // done
  console.log(req.query);
  db.query("SELECT * FROM exercise_details WHERE muscle_group = $1", [
    req.query.muscle,
  ]).then((exercises) => {
    res.send(exercises.rows);
  });
});

app.get("/daily-workout", (req, res) => {
  // done
  db.query(
    "SELECT * FROM exercises FULL OUTER JOIN exercise_details ON exercises.exercise_detail_id = exercise_details.exercise_detail_id WHERE exercises.date = $1 AND user_id = $2 ORDER BY exercises.exercise_id ASC",
    [req.query.date, req.query.userId]
  ).then((workouts) => {
    res.send(workouts.rows);
  });
});

app.post("/new-exercise", (req, res) => {
  //done
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
  // Done
  db.query(
    "UPDATE exercises SET weight = $1, sets = $2 , reps = $3, duration = $4, intensity = $5, calories_burned = $6 WHERE exercise_id = $7",
    [
      req.body.weight,
      req.body.sets,
      req.body.reps,
      req.body.duration,
      req.body.intensity,
      req.body.caloriesBurned,
      req.body.exerciseId,
    ]
  ).then(() => {
    console.log("Update Workout Success");
    res.send(202);
  });
});

app.delete("/delete", (req, res) => {
  db.query("DELETE FROM exercises WHERE exercise_id = $1", [
    req.query.exerciseId,
  ]).then(() => {
    console.log("Deleted Succesfully");
    res.send(202);
  });
});

// app.post("/notes", (req, res) => {
//   db.query("INSERT INTO workouts (user_id, notes, date) VALUES ($1, $2, $3 )", [
//     req.body.userId,
//     req.body.notes,
//     req.body.date,
//   ]).then(() => {
//     console.log("Added Notes Successfully");
//     res.send(202);
//   });
// });

app.get("/notes", (req, res) => {
  db.query("SELECT * FROM workouts WHERE date = $1 AND user_id = $2", [
    req.query.date,
    req.query.userId,
  ]).then((notes) => {
    if (notes.rows.length === 0) {
      db.query(
        "INSERT INTO workouts (user_id, date) VALUES ($1, $2) RETURNING *",
        [req.query.userId, req.query.date]
      ).then((newRow) => {
        res.send(newRow.rows);
      });
    } else {
      res.send(notes.rows);
    }
  })
})
// app.put("/edit-notes", (req, res) => {
//   db.query("UPDATE workouts SET notes = $1 WHERE date = $2 RETURNING *", [
//     req.body.notes,
//     req.body.date,
//   ]).then((newRow) => {
//     res.send(newRow.rows);
//     console.log("Edit notes Sucessfully");
//   });
// });

app.put("/notes", (req, res) => {
  if(req.body.type === 'workout') {
  db.query("UPDATE workouts SET notes = $1 WHERE date = $2 AND user_id = $3 RETURNING *", [
    req.body.notes,
    req.body.date,
    req.body.userId
  ]).then((updatedNotes) => {
    console.log("Added Notes Successfully");
    res.send(updatedNotes.rows);
  });
}
if(req.body.type === 'meal') {
  db.query('UPDATE workouts SET meal_notes = $1 WHERE date = $2 AND user_id = $3 RETURNING *', [
    req.body.notes,
    req.body.date,
    req.body.userId
  ]).then((updatedNotes) => {
    console.log('Edit notes Sucessfully')
    res.send(updatedNotes.rows);
  });
}
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

//----------------------------------admin-------------------------------------------------

app.get("/admin-users", (req, res) => {
  let adminstuff = [];
  db.query("SELECT COUNT(*) FROM users")
    .then((total) => {
      adminstuff.push({
        users: total.rows[0].count,
      });
    })
    .then(() =>
      db.query("SELECT COUNT(*) FROM exercises").then((total) => {
        adminstuff.push({
          exercises: total.rows[0].count,
        });
        res.send(adminstuff);
      })
    );
});

// post a message for users

app.post("/admin-message", (req, res) => {
  db.query("INSERT INTO messages (message, date) VALUES ($1, $2)", [
    req.body.message,
    req.body.date,
  ]).then(() => {
    console.log("Inserted message correctly");
    res.send(202);
  });
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Running on port: ${PORT}`);
});
