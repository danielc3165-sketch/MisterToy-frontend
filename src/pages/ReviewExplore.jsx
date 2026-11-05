import { useEffect, useState } from "react"
import { useSelector } from "react-redux"
import { loadReviews } from "../store/actions/review.action.js"

export  function ReviewExplore() {
    const [reviews,setReviews] = useState()
    
    useEffect(()=>{
        getReviews() 
    },[])
    
    async function getReviews() {
        const reviews = await loadReviews()
        //console.log('reviews:', reviews)
        setReviews(reviews)
    }

    if(!reviews) return <div>Loading...</div>

    return <section className="review-explore">
        <h2>Edit Reviews</h2>
        <div className="reviews-list">
            {reviews.map(review => (
                <div key={review._id} className="review-item">
                    <h3>{review.user?.fullName}</h3>
                    <p>{review.toy?.name}</p>
                    <p>{review.txt}</p>
                </div>
            ))}
        </div>
    </section>
}
