export default {
    props: ['book'],
    template: `
    <div class="book-preview">
        <router-link :to="'/book/'+book.id">
        <h2 >{{book.title}}</h2>
        </router-link>
        <h3>price: {{makeCurrencySymbol}}</h3>
    </div>
    `,
    data() {
        return {
            amount: this.book.listPrice.amount,
            currencyCode: this.book.listPrice.currencyCode
        }
    },
    computed: {
        makeCurrencySymbol() {
            return this.amount.toLocaleString('en-us', { style: 'currency', currency: this.currencyCode })
        }
    }
}