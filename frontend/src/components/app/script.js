import axios from 'axios'
//import Vue from 'vue'


export default {
    name: 'nav',
    data() {
        return {
            isLogged: this.checkIfLogged()
        }
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