import becrypt from 'bcryptjs';

const users = [
    {
        name: "user_1",
        email: "user_1@io.io",
        password: becrypt.hashSync('hadi', 10),
        isAdmin: true
    },
    {
        name: "user_2",
        email: "user_2@io.io",
        password: becrypt.hashSync('hadi', 10),

    },
    {
        name: "user_3",
        email: "user_3@io.io",
        password: becrypt.hashSync('hadi', 10),
    },
    {
        name: "user_4",
        email: "user_4@io.io",
        password: becrypt.hashSync('hadi', 10),
    },
]

export default users