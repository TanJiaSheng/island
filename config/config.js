module.exports = {
  // prod
  environment: 'dev',
  database: {
    dbName: 'island',
    host: 'localhost',
    port: 3306,
    user: 'root',
    password: 'root'
  },
  security: {
    secretKey: "abcdefgvhndfjkvndfvndfjkvnsdfkslnsdikvldnsa",
    expiresIn: 60*60
  }
}