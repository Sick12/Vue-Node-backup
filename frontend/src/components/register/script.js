import axios from 'axios'

export default {
    name: 'register',
    data() {
        return {
            User: {
                username: '',
                email: '',
                password: ''
            }

        }
    },
    methods: {
        register() {
            let newUser = {
                username: this.User.username,
                email: this.User.email,
                password: this.User.password
            }
            console.log(newUser);
            axios.post('http://localhost:3000/user/add', newUser)
                .then((response) => {
                    console.log(response);
                })
                .catch((error) => {
                    console.log(error);
                });
        }
    }
}