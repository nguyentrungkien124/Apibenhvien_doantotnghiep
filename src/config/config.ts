export const config = {
    port: process.env.PORT || 3000,
      db: {
        host: process.env.DB_HOST || 'localhost',
        port: 3306,
        username: process.env.DB_USERNAME || 'root',
        password: process.env.DB_PASSWORD || 'root',
        database: process.env.DB_NAME || 'benhvien', 
    },     
    jwt: {
      secret: process.env.JWT_SECRET || 'thong tin khoa bi mat',
      expiresIn: process.env.JWT_EXPIRES_IN || '24h',
    }
  };
