import moment from 'moment'

export default {
    methods: {
        testMoment() {
            alert(moment().format('DD MM YYYY'));
        }
    }
}