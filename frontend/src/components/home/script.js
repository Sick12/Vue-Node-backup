// import axios from 'axios'

// export default {
//     name: 'products',
//     data() {
//         return {
//             products: [],
//             search: ''
//         }
//     },
//     mounted() {
//         axios.get('http://localhost:3000/product/')
//             .then((response) => {
//                 this.products = response.data;
//                 //console.log(response.data);
//             }).catch((error) => {
//                 console.log(error);
//             });
//     },
//     computed: {
//         filteredProducts: function () {
//             return this.products.filter((product) => {
//                 return product.title.toLowerCase().match(this.search);
//                 //return product.title.match(this.search);
//             });
//         }
//     }
// }

import toastr from 'toastr'
export default {

    methods: {
        testAlert:() => {
            toastr.info(';awkd;oakdo;adk;ado;wadkwadk');
        }
    }
}