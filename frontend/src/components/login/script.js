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
            this.$http.post('/user/login', {username: this.username, password: this.password}).then((response) => {
                //console.log(response);
                let token = response.data.token;
                if(!token)
                    return this.$router.push('/login');
                this.$http.defaults.headers.common['Authorization'] = token;
                localStorage.setItem('Authorization', token);
                this.$http.get('/user');
                this.$router.push('/user');
                //console.log(headers);
                
            })
        }
        // test(){
        //     this.$http.get('/user').then((response) => {
        //        console.log(response.data);
        //     });
        // }
    }
}
