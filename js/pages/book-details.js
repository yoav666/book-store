import longText from '../cmps/long-text.js'
import reviewAdd from '../cmps/review-add.js'
import reviewList from '../cmps/review-list.js'
import { bookService } from '../services/book-service.js'
import { eventBus } from '../services/bus-service.js'

export default {
    template: `
    <section v-if="book" class="book-details">
        <h2>{{book.title}}</h2>
        <h3>{{book.subtitle}}</h3>
        <long-text :txt="book.description"/>
        <p>{{pageCountMsg}}</p>
        <p>{{publishedMsg}}</p>
        <img :src="book.thumbnail" alt="book-pic"/>
        <h2 v-if="this.book.listPrice.isOnSale">on sale</h2>
        <h2 :class="priceColor">{{makeCurrencySymbol}}</h2>
        <button @click="isReviewOn" v-if="!isReview">add review</button> 
        <button @click="isReviewOn"v-if="isReview">close review</button> 
        <review-add  v-if="isReview" @review="reviewAdd"></review-add>
        <review-list :list="this.book.reviews" @removeReview="removeReview"></review-list>
        <router-link :to="'/book/' + nextBookId">Next Book</router-link>
        <router-link :to="'/book/' + prevBookId">Prev Book</router-link>
        <router-link  to="/book">back to list</router-link>
    </section>
    `,
    data() {
        return {
            book: null,
            isReview: false,
            nextBookId: null,
            prevBookId: null,
        }
    },
    created() {
        // const { id } = this.$route.params
        // bookService.getById(id)
        //     .then(book => this.book = book)
    },
    watch: {
        '$route.params.id': {
            immediate: true,
            handler() {
                const { id } = this.$route.params
                bookService.getById(id)
                    .then(book => this.book = book);
                bookService.getNextId(id)
                    .then(id => this.nextBookId = id)
                bookService.getPrevId(id)
                    .then(id => this.prevBookId = id)
            }
        }
    },
    methods: {
        isReviewOn() {
            return this.isReview = !this.isReview
        },
        reviewAdd(review) {
            bookService.addReview(this.book.id, review)
                .then(book => {
                    this.book = book
                    console.log('imhere')
                    const msg = {
                        txt: 'add review successfuly',
                        type: 'success'
                    };
                    console.log('imandhere')
                    eventBus.$emit('show-msg', msg);
                    // })
                })
                    .catch(err => {
                        console.log(err);
                        const msg = {
                            txt: 'Error, please try again',
                            type: 'error'
                        };
                        eventBus.$emit('show-msg', msg);
                    });
                // })
        },
        removeReview(reviewId) {
            console.log(reviewId)
            bookService.removeReview(this.book.id, reviewId)
                .then(book => {
                    this.book = book
                })
        }

    },
    computed: {
        pageCountMsg() {
            if (this.book.pageCount > 500) {
                return 'long reading'
            } else if (this.book.pageCount > 200) {
                return 'decent reading'
            } else if (this.book.pageCount > 100) {
                return 'medium reading'
            } else if (this.book.pageCount < 100) {
                return 'light reading'
            }
        },
        publishedMsg() {
            const year = new Date().getFullYear();
            if (year - this.book.publishedDate > 10) {
                return 'Veteran Book';
            } else if (year - this.book.publishedDate < 1) {
                return 'New Book'
            }
        },
        makeCurrencySymbol() {
            return this.book.listPrice.amount.toLocaleString('en-us', { style: 'currency', currency: this.book.listPrice.currencyCode })
        },
        priceColor() {
            if (this.book.listPrice.amount >= 150) return 'red';
            else if (this.book.listPrice.amount < 20) return 'green'
        },

    },
    components: {
        longText,
        reviewAdd,
        reviewList
    }
}