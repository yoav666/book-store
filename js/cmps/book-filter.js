export default {
    template: `
    <section class="book-filter">
         <!-- <form @submit.prevent="filter">  -->
            <!-- <select @change="onChange($event)" name="" id="">
                <option  value="text">normalSearch</option>
                <option  value="number">priceSearch</option>
            </select>  -->
            <label>search:</label>
            <input type="text" v-model="filterBy.title" @input="filter" placeholder="search">
            <label>search price:</label>
            <input type="number" v-model="filterBy.fromPrice" @input="filter" placeholder="from price">
            <input type="number" v-model="filterBy.toPrice" @input="filter" placeholder="to price">
         <!-- </form>  -->
    </section>
    `,
    data() {
        return {
            filterBy: {
                title: '',
                fromPrice: 0,
                toPrice: Infinity,
            },
        }
    },
    methods: {
        filter() {
            this.$emit('filtered', { ...this.filterBy })
        },
      
    }
}
