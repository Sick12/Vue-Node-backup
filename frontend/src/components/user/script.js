import axios from 'axios'

export default {
    name: 'users',
    data() {
        return {
            user: [],
            token: true
        }
    },
    mounted() {
        let token = localStorage.getItem('Authorization');
        //console.log(token);
        // axios.get('http://localhost:3000/user').then((response) => {
        //    // console.log(response.data);
        //     this.user = response.data;
        // })
        // .catch((error) => {
        //     console.log(error);
        // });
        axios.get('http://localhost:3000/user?token=' + token)
            .then((response) => {
                this.user = response.data;
                console.log(response)
            })
            .catch((error) => {
                console.log(error);
            })
    }
}