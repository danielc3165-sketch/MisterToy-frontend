import { useState,useEffect } from "react"
import { useSelector } from "react-redux"

import { loadReviews } from "../store/actions/review.action.js"

import { reviewService } from "../services/review.service.js"

export function UserDetails() {
    const [userReviews, setUserReviews] = useState(null)
    const loggedInUser = useSelector(storeState => storeState.userModule.loggedInUser)

    useEffect(() => {
        loadUserReviews()
    }, [])

    async function loadUserReviews() {
        const filterBy = reviewService.getDefultFilter() 
        filterBy.byUserId = loggedInUser._id
        const reviews = await loadReviews(filterBy)
        setUserReviews(reviews)
    }

    if (!userReviews) return <div>Loading...</div>

    return <section className="user-details">
     <h2>Profile</h2>
     <p>Name: {loggedInUser.fullName}</p>
     <p>ID: {loggedInUser._id}</p>
     <div className="user-reviews">
      <h3>Reviews</h3>
      {userReviews && userReviews.map(review => (
       <div key={review._id} className="review">
        <p>{review.txt}</p>
       </div>
      ))}
     </div>
    </section>
}