import axios from 'axios'
//import Vue from 'vue'


export default {
    name: 'users',
    data() {
        return {
            user: [],
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
                this.user = response.data;
                console.log(response)
            })
            .catch((error) => {
                console.log(error);
            })
    },
    created() {
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
        }
    }
}