import { Pool } from 'pg';

const pool = new Pool({
  host: 'localhost',
  user: 'postgres',
  password: '042317',
  database: 'likeme',
  allowExitOnIdle: true
});
export default pool;