

export default {
    props: ['txt'],
    template: `
    <article class="long-text">
        <!-- <p v-if="isReadLess">{{upToOnehundred}}</p>
        <p v-if="isReadMore" class="red">{{this.txt}}</p>
        <button v-if="isReadLess" @click="readMore">read more</button>
        <button v-if="isReadMore" @click="readLess">read less</button>--->
        
     </article> 
    `,
    data() {
        return {
            // text:this.txt
            isReadMore: false,
            isReadLess: true
        }
    },
    methods: {
        readMore() {
            this.isReadLess = false
            this.isReadMore = true
        },
        readLess() {
            this.isReadLess = true
            this.isReadMore = false

        }

    },
    computed: {
        upToOnehundred() {
            // let length= txt.length
            return this.txt.substring(0, 100)
        }
    }
}