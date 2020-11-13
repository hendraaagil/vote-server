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
  branding: {
    logo:
      'https://www.bcpharmacy.ca/sites/default/files/assets/paragraphs/image/image/Winter2019%20eVoting-01.png',
    companyName: 'E-Voting | Admin',
  },
});

const ADMIN = {
  email: process.env.ADMIN_EMAIL || 'admin@admin.com',
  password: process.env.ADMIN_PASS || 'admin',
};

const adminRoutes = AdminBroExpress.buildAuthenticatedRouter(adminBro, {
  cookieName: process.env.ADMIN_COOKIE_NAME || 'admin-bro',
  cookiePassword: process.env.ADMIN_COOKIE_PASS || 'super-secret-password',
  authenticate: async (email, password) => {
    return email === ADMIN.email && password === ADMIN.password ? ADMIN : null;
  },
});

module.exports = adminRoutes;
