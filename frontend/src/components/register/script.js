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
                    this.$toastr.success('User registered, you can login!');
                    this.$router.push('/login');
                })
                .catch((error) => {
                    this.$toastr.error('Could not be registered');
                    console.log(error);
                });
        }
    }
}
