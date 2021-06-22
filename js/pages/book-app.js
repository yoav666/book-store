import { bookService } from '../services/book-service.js';
import bookList from '../cmps/book-list.js';
import bookFilter from '../cmps/book-filter.js';
// import bookDetails from '../pages/book-details.js';

export default {
    template: `
    <section class="book-app">
    <book-filter @filtered="setfilter" />
    <book-list :books="booksToShow" />
    </section>
    `,
    data() {
        return {
            books: [],
            filterBy: null,
        }
    },
    created() {
        this.loadBooks()
    },
    methods: {
        loadBooks() {
            bookService.query()
                .then(books => this.books = books)
        },
        setfilter(filterBy) {
            this.filterBy = filterBy
        },
    },
    computed: {
        booksToShow() {
            if (!this.filterBy || this.filterBy.title === '' &&
                this.filterBy.fromPrice === '' && this.filterBy.toPrice === '') return this.books
            if (this.filterBy.fromPrice === '') this.filterBy.fromPrice = 0;
            if (this.filterBy.toPrice === '') this.filterBy.toPrice = Infinity;
            let regex = new RegExp(this.filterBy.title, 'i')
            let booksToShow = this.books.filter(book => {
                return regex.test(book.title) &&
                    this.filterBy.fromPrice < book.listPrice.amount &&
                    this.filterBy.toPrice > book.listPrice.amount;
            });
            return booksToShow;
        },
    },
    components: {
        bookList,
        bookFilter,
    }
}