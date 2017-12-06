import axios from 'axios'

export default {
    mounted() {
        let token = localStorage.getItem('Authorization');
        axios.get('http://localhost:3000/user?token=' + token)
            .then((response) => {
                localStorage.removeItem('Authorization');
                console.log(response);
                this.$router.push('/login');
            })
            .catch((error) => {
                console.log(error);
            })
    }
}