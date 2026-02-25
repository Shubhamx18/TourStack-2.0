const mysql = require('mysql2/promise');
const fs = require('fs');
const path = require('path');
require('dotenv').config();

(async () => {
    const conn = await mysql.createConnection({
        host: process.env.DB_HOST,
        user: process.env.DB_USER,
        password: process.env.DB_PASSWORD,
        database: process.env.DB_NAME,
        multipleStatements: true
    });

    const sql = fs.readFileSync(path.join(__dirname, '../../../tourstack_db.sql'), 'utf8');

    // Execute each statement separately to handle errors gracefully
    const statements = sql.split(';').map(s => s.trim()).filter(s => s.length > 0);
    let success = 0, errors = 0;

    for (const stmt of statements) {
        try {
            await conn.query(stmt);
            success++;
        } catch (e) {
            if (!e.message.includes('already exists') && !e.message.includes('Duplicate entry')) {
                console.log(`⚠️ Warning: ${e.message.substring(0, 80)}`);
                errors++;
            }
        }
    }

    console.log(`\n✅ Schema applied: ${success} statements OK, ${errors} warnings`);
    await conn.end();
})().catch(e => { console.error('Fatal:', e.message); process.exit(1); });
