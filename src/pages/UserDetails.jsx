import { useState,useEffect } from "react"
import { useSelector } from "react-redux"
import { Link } from "react-router-dom"

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
     <p><strong>Name:</strong> {loggedInUser.fullName}</p>
     <p><strong>ID:</strong> {loggedInUser._id}</p>
     
     {loggedInUser.imgUrl ? 
     <img src={loggedInUser.imgUrl} alt="" max-width={500} max-height={400} />
     : <p style={{margin:100,fontWeight:'bold'}}>No Img</p>}
     
     <div className="user-reviews">
         <h3>Reviews</h3>
      <ul className="reviews-list">
      {userReviews.length!=0 ? userReviews.map(review => (
       <li key={review._id} className="review">
        <p><strong>Toy:</strong> {review.toy.name}</p>
        <p>{review.txt}</p>
       </li>
       )) : <strong style={{gridColumn: 2, marginTop:20}}>No Reviews</strong>}
      </ul>
     </div>
     <div className="back-link">
    <Link to={'/toy'}>Back</Link>
    </div>
    </section>
}