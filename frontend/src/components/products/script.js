import axios from 'axios'
import toastr from 'toastr'
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
        filteredProducts() {
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
        },
        deleteProduct(products, productId, index) {
            var answer = confirm('Are you sure you want to delete this product?');
            if (answer) {
                axios.delete('http://localhost:3000/product/' + productId)
                    .then((response) => {
                        this.products.splice(index, 1);
                        window.location.reload();
                    })

                    .catch((error) => {
                        console.log(error);
                    })
            }
            //toastr.info('Product wasn\'t deleted');
            alert('Action cancelled');

        }
    }
}