import { ComponentType } from "react"
import { compose } from "redux"
import { withAuthRedirect } from "../../HOC/WithAuthRedirect"

const Music = () => {
    
    return <div>
        <h2>Music</h2>
    </div>
}

export default compose<ComponentType>(withAuthRedirect)(Music)