import { pool } from './index.js';

import { abdominals } from '../sample_data/abdominals.js';
import { biceps } from '../sample_data/biceps.js';
import { calves } from '../sample_data/calves.js';
import { chest } from '../sample_data/chest.js';
import { glutes } from '../sample_data/glutes.js';
import { hamstring } from '../sample_data/hamstring.js';
import { lats } from '../sample_data/lats.js';
import { lower_back } from '../sample_data/lower_back.js';
import { quads } from '../sample_data/quads.js';
import { traps } from '../sample_data/traps.js';
import { triceps } from '../sample_data/triceps.js';

async function seedExerciseDetails(data, name) {
  const client = await pool.connect();

  try {
    await client.query('BEGIN');

    for (let i = 0; i < data.length; i++) {
      const { name, type, muscle, equipment, difficulty, instructions } =
        data[i];

      const result = await client.query(
        'INSERT INTO exercise_details (name, type, muscle_group, equipment, difficulty, instructions) VALUES ($1, $2, $3, $4, $5, $6) RETURNING exercise_detail_id',
        [name, type, muscle, equipment, difficulty, instructions]
      );
    }

    await client.query('COMMIT');
  } catch (error) {
    await client.query('ROLLBACK');
    console.log(error);
    throw error;
  } finally {
    console.log(`${name} exercises added!`);
    client.release();
  }
}

async function runExerciseDetailSeed() {
  try {
    await seedExerciseDetails(biceps, 'bicep');
    await seedExerciseDetails(calves, 'calf');
    await seedExerciseDetails(abdominals, 'abdominal');
    await seedExerciseDetails(chest, 'chest');
    await seedExerciseDetails(glutes, 'glute');
    await seedExerciseDetails(hamstring, 'hamstring');
    await seedExerciseDetails(lats, 'lat');
    await seedExerciseDetails(lower_back, 'lower back');
    await seedExerciseDetails(quads, 'quad');
    await seedExerciseDetails(traps, 'trap');
    await seedExerciseDetails(triceps, 'tricep');
  } catch (error) {
    console.error(error);
  }
}

runExerciseDetailSeed();
