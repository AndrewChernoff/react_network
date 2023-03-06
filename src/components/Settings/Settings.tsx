import { ComponentType } from "react"
import { compose } from "redux"
import { withAuthRedirect } from "../../HOC/WithAuthRedirect"

const Settings = () => {
    return <div>
        <h2>Settings</h2>
    </div>
}

export default compose<ComponentType>(withAuthRedirect)(Settings)