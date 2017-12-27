import axios from 'axios'
import toastr from 'toastr'

export default {
    name: 'user_profile',
    data() {
        return {
            user: '',
            isLogged: this.checkIfLogged()
        }
    },
    created() {
        this.fetchOneUser(this.$route.params.id);
        this.$bus.$on('logged', () => {
            this.isLogged = this.checkIfLogged();
        });
    },
    // mounted() {
    //     let token = localStorage.getItem('Authorization');
    //     axios.get('http://localhost:3000/user/?token=' + token)
    //         .then((response) => {
    //             this.users = response.data;

    //         })
    //         .catch((error) => {
    //             console.log(error);
    //         })
    // },
    methods: {
        checkIfLogged() {
            let token = localStorage.getItem('Authorization');
            if (token) {
                return true;
            } else {
                return false;
            }
        },
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
        deleteUser(userId) {
            var confirmDelete = confirm('Are you sure you want to delete this user?');
            if (confirmDelete) {
                axios.delete('http://localhost:3000/user/delete-user/' + userId)
                    .then((response) => {
                        this.$router.push('/users');
                        toastr.success('User deleted');

                    })
                    .catch((error) => {
                        console.log(error);
                    })
            }
        }
    }
}