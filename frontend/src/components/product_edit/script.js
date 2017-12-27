import axios from 'axios'
import toastr from 'toastr'

export default {
    name: 'product_edit',
    data() {
        return {
            product: ''
        }
    },
    created() {
        this.fetchProduct(this.$route.params.id);
    },
    methods: {
        fetchProduct(id) {
            console.log(id);
            axios.get('http://localhost:3000/product/one-product/' + id)
                .then((response) => {
                    this.product = response.data;
                })
                .catch((error) => {
                    console.log(error);
                });
        },
        deleteProduct(productId) {
            console.log(productId);
            var answer = confirm('Are you sure you want to delete this product?');
            if (answer) {
                axios.delete('http://localhost:3000/product/delete/' + productId)
                    .then((response) => {
                        this.$router.push('/products');
                        toastr.success('Product deleted');
                    })

                    .catch((error) => {
                       // toastr.error('Product NOT deleted');
                        console.log(error);
                    })
            }
        }
    }
}