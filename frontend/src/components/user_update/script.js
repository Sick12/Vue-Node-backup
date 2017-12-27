import axios from 'axios'
import toastr from 'toastr'

export default {
    name: 'user_update',
    data() {
        return {
            user: {}
        }
    },
    created() {
        this.fetchOneUser(this.$route.params.id);
    },
    methods: {
        fetchOneUser(id) {
            console.log(id);
            axios.get('http://localhost:3000/user/oneUser/' + id)
                .then((response) => {
                    this.user = response.data;
                })
                .catch((error) => {
                    console.log(error);
                })
        },
        updatedUser() {
            let update_User = {
                username: this.user.username,
                email: this.user.email,
                password: this.user.password
            };
            axios.put('http://localhost:3000/user/update-user/' + this.$route.params.id, update_User)
                .then((response) => {
                    console.log(update_User);
                    this.$router.push('/users');
                    toastr.success('User updated!');


                })
                .catch((error) => {
                    toastr.error('E-mail or username already exists, choose another');
                    console.log(error);
                })
        }
    }

}