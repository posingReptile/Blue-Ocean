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

async function seedDatabase(data, name) {
  const client = await pool.connect();

  try {
    await client.query('BEGIN');

    for (let i = 0; i < data.length; i++) {
      const { name, type, muscle_group, equipment, difficulty, instructions } =
        data[i];

      const result = await client.query(
        'INSERT INTO exercise_details (name, type, muscle_group, equipment, difficulty, instructions) VALUES ($1, $2, $3, $4, $5, $6) RETURNING exercise_detail_id',
        [name, type, muscle_group, equipment, difficulty, instructions]
      );
    }

    await client.query('COMMIT');
  } catch (error) {
    await client.query('ROLLBACK');
    throw error;
  } finally {
    console.log(`${name} exercises added!`);
    client.end();
  }
}

seedDatabase(abdominals, 'abdominal');
seedDatabase(biceps, 'bicep');
seedDatabase(calves, 'calf');
seedDatabase(chest, 'chest');
seedDatabase(glutes, 'glute');
seedDatabase(hamstring, 'hamstring');
seedDatabase(lats, 'lat');
seedDatabase(lower_back, 'lower back');
seedDatabase(quads, 'quad');
seedDatabase(traps, 'trap');
seedDatabase(triceps, 'tricep');
