import axios from 'axios'

export default {
    name: 'nav',
    data() {
        return {
            isLogged: this.checkIfLogged(),
            searchProduct: ''
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
    },
    computed: {
        filteredProducts: function () {
            this.$router.push('/products');
            return this.products.filter((product) => {
                return product.title.toLowerCase().match(this.searchProduct);
            });
        }
    }
}