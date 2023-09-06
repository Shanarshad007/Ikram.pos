const mongoose = require('mongoose');

const URL = 'mongodb+srv://shanarshad004:MFwsgUbsc6Rmh4aE@cluster0.wnhmhfp.mongodb.net/IKRAMPOS';

mongoose.connect(URL);

const connectionObj = mongoose.connection;

connectionObj.on('connected', () => {
  console.log('MongoDB Connection successfull');
});

connectionObj.on('error', (err) => {
  console.log('MongoDB Connection Failed:', err);
});
