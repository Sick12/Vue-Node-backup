import axios from 'axios'
//import Vue from 'vue'


export default {
    name: 'users',
    data() {
        return {
            users: [],
            search: '',
            isLogged: this.checkIfLogged()
        }
    },
    mounted() {
        let token = localStorage.getItem('Authorization');
        //console.log(token);
        // axios.get('http://localhost:3000/user').then((response) => {
        //    // console.log(response.data);
        //     this.user = response.data;
        // })
        // .catch((error) => {
        //     console.log(error);
        // });
        axios.get('http://localhost:3000/user?token=' + token)
            .then((response) => {
                //this.users = response.data;
                this.users = response.data;
                //console.log(response)
            })
            .catch((error) => {
                console.log(error);
            });
    },
    created() {
        //this.fetchUsers();
        this.$bus.$on('searchUser', (search) => {
            this.search = search;
        });
        this.search = this.$route.query.search;
        this.$bus.$on('logged', () => {
            this.isLogged = this.checkIfLogged();
        });
    },
    methods: {
        checkIfLogged() {
            let token = localStorage.getItem('Authorization');
            if (token) {
                return true;
            } else {
                return false;
            }
        },
        // fetchUsers() {
        //     //let token = localStorage.getItem('Authorization');
        //     axios.get('http://localhost:3000/user')              // axios.get('http://localhost:3000/user?token=' + token)
        //         .then((response) => {
        //             this.users = response.data;
        //         })
        //         .catch((error) => {
        //             console.log(error);
        //         });
        // }
    }
    // computed: {
    //     filteredUsers() {
    //         return this.users.filter((user) => {
    //             return user.username.toLowerCase().match(this.search);
    //         });
    //     }
    // }
}