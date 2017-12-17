// import moment from 'moment'
// import axios from 'axios'
// export default {
//     name: 'test',
//     data() {
//         return {
//             user: ''
//         }
//     },
//     methods: {
//         fetchUser(userId) {
//             axios.get('http://localhost:3000/user')
//                 .then((response) => {
//                     this.user = response.data;
//                 })
//         }
//     },
//     created: function () {
//         this.fetchUser(this.$route.params.id);
//     }
// }