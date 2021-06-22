
export default {
    template: `
    <section class="review-add">
        <h2>review area</h2>
        <form @submit.prevent="saveReview" class="review-form">
            <input type="text" ref="user" v-model="review.userName"> 
            <textarea name="reviewText" v-model="review.reviewText" cols="30" rows="10"></textarea>
            <!-- value="Books Reader"> -->
            <button>save</button>
        </form>
    </section>
    `,
    data() {
        return {
            review: {
                userName: 'Reader',
                reviewText: '',
            }
        }
    },
    created() {

    },
    mounted() {
        // this.$refs.user.focus()
        this.$refs.user.select()

    },
    methods: {
        saveReview() {
            // console.log('book', this.book, 'bookid', this.book.id)
            //  bookService.addReview(this.book.id,this.review)
            this.$emit('review', this.review)
            this.review = {
                userName: 'Reader',
                reviewText: ''
            }
        }
    },
    destroyed() {

    },
}