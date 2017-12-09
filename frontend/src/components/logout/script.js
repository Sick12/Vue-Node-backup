import axios from 'axios'

export default {
    mounted() {
        let token = localStorage.getItem('Authorization');
        axios.get('http://localhost:3000/user?token=' + token)
            .then((response) => {
                localStorage.removeItem('Authorization');
                //console.log(response);
                location.reload();
                this.$toastr.success('Logged out successfuly');
                this.$router.push('/login');
            })
            .catch((error) => {
                this.$toastr.error('Something happened');
                console.log(error);
            })
    }

}