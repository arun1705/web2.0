'use strict'

const user = require('../lotteryInfoSchema');


exports.save_user_information = (data) =>
    new Promise((resolve, reject) => {
        const newUser = new user({
            email: data.email,
            amount: data.amount,

        });
        newUser.save().then(info => {
                resolve('Succesful');
            })
            .catch(err => {
                reject('could not insert into lottery information');
            })
    });

exports.get_total_amount = () =>
    new Promise((resolve, reject) => {

        user.aggregate([{
                $group: {
                    _id: '',
                    amount: {
                        $sum: '$amount'
                    }
                }
            }, {
                $project: {
                    _id: 0,
                    total_amount: '$amount'
                }
            }]).then(data => {
                resolve(data);
            })
            .catch(err => {
                reject('Could not get total amount');
            })
    });


exports.get_list_of_participants = () =>
    new Promise((resolve, reject) => {

        user.find().select({
                email: 1,
                _id: 0
            }).then(data => {
                resolve(data);
            })
            .catch(err => {
                reject('Could not fetch list of participants');
            })
    });

exports.delete_users = () =>
    new Promise((resolve, reject) => {

        user.remove().then(data => {
                resolve("success on  deleting all users");
            })
            .catch(err => {
                reject("Could not delete all users");
            })
    });