import axios from 'axios'

export default {
    name: 'nav',
    data() {
        return {
            isLogged: this.checkIfLogged(),
            search: ''
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
        },
        searchProducts() {
            this.$router.push({ path: 'products', query: { search: this.search } })
            if (this.$route.name == 'products')
                this.$bus.$emit('searchProduct', this.search);
            //if it matches a username redirect to users page instead
        }
    }
}