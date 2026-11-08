import { useEffect, useState } from "react"
import { useSelector } from "react-redux"

//import { loadReviews } from "../store/actions/review.action.js"
import { addReview } from "../store/actions/review.action.js"

//import { toyService } from "../services/review.service.js"

export function ToyReviews({ toyReviews, toyId, loadToyReviews }) {
    const loggedInUser = useSelector(storeState => storeState.userModule.loggedInUser)
    const [ currReview, setCurrReview ] = useState({txt:'', userId: loggedInUser?._id, toyId: toyId})
    
    useEffect(()=>{
          
    },[])

    async function sendReview(ev) {
            ev.preventDefault()
            if (!currReview.txt.trim() || !loggedInUser) return
            await addReview(currReview)
            loadToyReviews(toyId)
            setCurrReview({...currReview, txt: ''})
        }
    
    return <section className="toy-reviews">
           <h2>Reviews</h2>
    <form onSubmit={sendReview}>
                    <input
                        type="text"
                        value={currReview.txt}
                        onChange={ev => setCurrReview({...currReview, txt: ev.target.value})}
                        placeholder="Type a review..."
                        autoComplete="off"
                    />
                    <button className="btn">Send</button>
                </form>
    {toyReviews && toyReviews.map(review => (
        <div key={review._id} className="review">
          <h4>{review.user?.fullName}</h4>
          <p>{review.txt}</p>
        </div>
      ))}
    </section>
}