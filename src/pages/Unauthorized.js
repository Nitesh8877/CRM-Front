import {useNavigate} from "react-router-dom"
import not from '../assets/error-403.jpeg'

const Unauthorized=()=>{
  const navigate=useNavigate()
  const goBack=()=>navigate(-1)
  return (
    <section className="bg-light vh-100 d-flex justify-content-center align-center text-center">
      <div>
        <h1>Page Not Found</h1>
        <img src={not}/>
        <br/>
        <p>You do not have access to the requried page..</p>
        <div className="flexGrow">
          <button className="btn btn-primary" onClick={goBack} >
            Go Back
          </button>
        </div>
      </div>
    </section>
  )
}

export default Unauthorized;