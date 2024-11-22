
import mysql from 'mysql2/promise'

const connection = await mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password:'mysecret',
    database: 'Proyecto'
})

export default connection;