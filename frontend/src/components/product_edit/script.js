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
            //console.log(id);
            axios.get('http://localhost:3000/product/one-product/' + id)
                .then((response) => {
                    this.product = response.data;
                })
                .catch((error) => {
                    console.log(error);
                });
        },
        deleteProduct() {

        },
        updateProduct() {

        }
    }
}