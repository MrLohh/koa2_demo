const userSchema = {
    type: "object",
    properties: {
        username: {
            type: "string",
            pattern: '^[a-zA-Z0-9]+([-_.][a-zA-Z0-9]+)*@[a-zA-Z0-9]+([-_.][a-zA-Z0-9]+)*\\.[a-z]{2,}$',
            maxLength: 255,
            minLength: 3
        },
        password: {
            type: "string",
            pattern: '(?=.*[0-9])(?=.*[a-zA-Z])(?=.*[^a-zA-Z0-9]).{8,20}',
            maxLength: 20,
            minLength: 6
        },
        gender: {
            type: "string",
            pattern: '[男,女,妖]'
        }
    },
    required: ["username", "password"]
}
module.exports = userSchema;