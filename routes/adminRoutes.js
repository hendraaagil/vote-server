const AdminBro = require('admin-bro');
const AdminBroExpress = require('admin-bro-expressjs');
const AdminBroMongoose = require('admin-bro-mongoose');
const mongoose = require('mongoose');

// @ts-ignore
AdminBro.registerAdapter(AdminBroMongoose);

// @ts-ignore
const adminBro = new AdminBro({
  databases: [mongoose],
  rootPath: '/admin',
});

const ADMIN = {
  username: process.env.ADMIN_USERNAME || 'admin-vote',
  password: process.env.ADMIN_PASS || 'admin',
};

const adminRoutes = AdminBroExpress.buildAuthenticatedRouter(adminBro, {
  cookieName: process.env.ADMIN_COOKIE_NAME || 'admin-bro',
  cookiePassword: process.env.ADMIN_COOKIE_PASS || 'super-secret-password',
  authenticate: async (username, password) => {
    return username === ADMIN.username && password === ADMIN.password
      ? ADMIN
      : null;
  },
});

module.exports = adminRoutes;
