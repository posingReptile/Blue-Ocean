import pkg from 'pg';
const {Pool} = pkg;


const db = new Pool ({
  host: "localhost",
  port: 5432,
  database:"shredded"
})

export{db};