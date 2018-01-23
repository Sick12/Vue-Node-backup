import axios from 'axios'
import toastr from 'toastr'

export default {
    name: 'product_update',
    data() {
        return {
            product: {}
        }
    },
    created() {
        this.fetchProduct(this.$route.params.id);
    },
    methods: {
        fetchProduct(id) {
            //console.log(id);
            axios.get('http://localhost:3000/product/one-product/' + id)
                .then((response) => {
                    this.product = response.data;
                })
                .catch((error) => {
                    console.log(error);
                });
        },
        updateProduct(id) {
            let updatedProduct = {
                title: this.product.title,
                price: this.product.price,
                description: this.product.description
            };
            axios.put('http://localhost:3000/product/update/' + this.$route.params.id, updatedProduct)
                .then((response) => {
                    this.$router.push('/products');
                    toastr.success('Product updated');

                })
                .catch((error) => {
                    toastr.info('Product name already exists, choose another one'); //to be modified later
                    console.log(error);
                });
        }
    }
}