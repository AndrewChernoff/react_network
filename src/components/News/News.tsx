import { ComponentType } from "react"
import { compose } from "redux"
import { withAuthRedirect } from "../../HOC/WithAuthRedirect"

const News = () => {
        
    return <div>
        <h2>News</h2>
    </div>
}

export default compose<ComponentType>(withAuthRedirect)(News)