export default{
    props:['review'],
    template:`
    <section class="review-preview">
        <h4>{{review.userName}}</h4>
        <p>{{review.reviewText}}</p>
    </section>
    `
}