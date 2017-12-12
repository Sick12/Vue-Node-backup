import axios from 'axios'

export default {
    name: 'products',
    data() {
        return {
            products: [],
            search: '',
            isLogged: this.checkIfLogged()
        }
    },
    mounted() {
        let token = localStorage.getItem('Authorization');
        axios.get('http://localhost:3000/product?token=' + token)
            .then((response) => {
                this.products = response.data;
                
            })
            .catch((error) => {
                console.log(error);
            })
    },
    computed: {
        filteredProducts: function () {
            return this.products.filter((product) => {
                return product.title.toLowerCase().match(this.search);
            });
        }
    },
    created() {
        this.$bus.$on('searchProduct', (search) => {
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
        }
    }
}