var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var UserSchema = new Schema(
    {
        first_name: {type: String, required: true, max: 100},
        last_name: {type: String, required: true, max: 100},
        password: {type: String, required: true, max: 100},
        username: {type: String, required: true, max: 100},
        zipcode: {type: String, required: true, max: 5},
        date_of_birth: {type: Date}
    }
)

UserSchema
    .virtual('name')
    .get(function() {
        var fullname = '';
        if(this.first_name && this.last_name) {
            fullname = this.first_name + ' ' + this.last_name;
        } else {
            fullname = '';
        }
        return fullname;
    });

module.exports = mongoose.model('User', UserSchema);