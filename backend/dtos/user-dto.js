module.exports = class UserDto {
    email;
    id;
    role;
    firstname;
    firstname;
    constructor(model) {
        this.email = model.email;
        this.id = model._id;
        this.role = model.role;
        this.firstname = model.firstname;
        this.lastname = model.lastname;
    }
}