import axios from 'axios'

export default {
    name: "product_add",
    data() {
        return {
            isLogged: this.checkIfLogged(),
            Product: {
                title: '',
                price: '',
                description: ''
            }
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
        product_add() {
            let newProduct = {
                title: this.Product.title,
                price: this.Product.price,
                description: this.Product.description

            }
            //console.log(newProduct);
            axios.post('http://localhost:3000/product/add', newProduct)
                .then((response) => {
                    //console.log(response);
                    this.$toastr.success('Product added succesfully');
                    this.$router.push('/products');
                })
                .catch((error) => {
                    this.$toastr.error('Invalid product');
                    console.log(error);
                });
        }
    }
}

