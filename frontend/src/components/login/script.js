export default {
    name: 'login',
    data() {
        return {
            username: '',
            password: ''
        }
    },
    methods: {
        submit() {
            this.$http.post('/user/login', { username: this.username, password: this.password }).then((response) => {
                //console.log(response);
                let token = response.data.token;
                this.$http.defaults.headers.common['Authorization'] = token;
                localStorage.setItem('Authorization', token);
                this.$bus.$emit('logged', 'User logged');
                this.$http.get('/user');
                this.$toastr.success('You\'re now logged in', 'Title');
                this.$router.push('/user');
                //console.log(headers);

            })
                .catch((error) => {
                    this.$toastr.error('Invalid credentials');
                })
        }
        // test(){
        //     this.$http.get('/user').then((response) => {
        //        console.log(response.data);
        //     });
        // }
    }
}
