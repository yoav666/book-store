import reviewPreview from './review-preview.js'


export default {
    props:['list'],
    template:`
    <section class="review-list">
        <ul v-for="review in list" :key="review.id" class="review-list">
            <li class=review-preview-container>
                <button @click="removeReview(review.id)">x</button>
                <review-preview :review="review"></review-preview>
            </li>
        </ul>
    </section>
    `,
    methods:{
        removeReview(reviewId){
           this.$emit('removeReview',reviewId)
        }
    },
    components:{
        reviewPreview
    }
}