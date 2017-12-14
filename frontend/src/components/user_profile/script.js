import axios from 'axios'

export default {
    name: 'user_profile',
    data() {
        return {
            users: []
            //isLogged: this.checkIfLogged()
        }
    },
    // created() {
    //     this.$bus.$on('logged', () => {
    //         this.isLogged = this.checkIfLogged();
    //     });
    // },
    mounted() {
        let token = localStorage.getItem('Authorization');
        axios.get('http://localhost:3000/user/?token=' + token)
            .then((response) => {
                this.users = response.data;

            })
            .catch((error) => {
                console.log(error);
            })
    },
    methods: {
        // checkIfLogged() {
        //     let token = localStorage.getItem('Authorization');
        //     if (token) {
        //         return true;
        //     } else {
        //         return false;
        //     }
        // },
        deleteUser(users, id, index) {
            var confirmDelete = confirm('Are you sure you want to delete the user?');
            if (confirmDelete) {
                axios.delete('http://localhost:3000/user/profile/' + id)
                    .then((response) => {
                        this.users.splice(index, 1);
                        window.location.reload();
                    })
                    .catch((error) => {
                        console.log(error);
                    })
            }
        }
    }
}