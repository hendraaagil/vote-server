const AdminBro = require('admin-bro');
const AdminBroExpress = require('admin-bro-expressjs');
const AdminBroMongoose = require('admin-bro-mongoose');
const mongoose = require('mongoose');
require('../models/Candidate');
require('../models/Result');

AdminBro.registerAdapter(AdminBroMongoose);

const adminBro = new AdminBro({
  databases: [mongoose],
  rootPath: '/admin',
  branding: {
    logo:
      'https://gist.githubusercontent.com/hendraaagil/5ad1e9b1b44135aee414c53be2de31d8/raw/288e17cbb9e70f17386d1b387f551b2df42d2801/vote-logo.svg',
    companyName: 'E-Voting | Admin',
  },
});

const ADMIN = {
  email: process.env.ADMIN_EMAIL || 'admin@admin.com',
  password: process.env.ADMIN_PASS || 'admin',
};

const adminRoutes = AdminBroExpress.buildAuthenticatedRouter(
  adminBro,
  {
    cookieName: process.env.ADMIN_COOKIE_NAME || 'admin-bro',
    cookiePassword: process.env.ADMIN_COOKIE_PASS || 'super-secret-password',
    authenticate: async (email, password) => {
      return email === ADMIN.email && password === ADMIN.password
        ? ADMIN
        : null;
    },
  },
  null,
  {
    resave: false,
    saveUninitialized: true,
  }
);

module.exports = adminRoutes;
