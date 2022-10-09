const sequelize = require ('../../config/connection');
const { User, Post } = require('../../models');

const userData = require ('./userData.json');
const postData = require('./postData.json');