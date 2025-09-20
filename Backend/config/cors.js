// config/cors.js
export const corsOptions = {
  // origin: 'http://vgw4k0og4cw48oww0k4sw400.31.97.71.226.sslip.io', // change in production
  origin: '*', // change in production
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  credentials: true,
}
