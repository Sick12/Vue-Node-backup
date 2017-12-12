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
        onEnter() {
            this.$router.push({ path: 'products', query: { search: this.search } })
            if (this.$route.name == 'products')
                this.$bus.$emit('searchProduct', this.search);
        }
    }
    // computed: {
    //     filteredProducts: function () {
    //         return this.products.filter((product) => {
    //             return product.title.toLowerCase().match(this.search);
    //         });
    //     }
    // },
    // mounted() {
    //     let token = localStorage.getItem('Authorization');
    //     axios.get('http://localhost:3000/product?token=' + token)
    //         .then((response) => {
    //             this.products = response.data;
    //         })
    //         .catch((error) => {
    //             console.log(error);
    //         })
    // }
}