import React from 'react'
import { useHistory, Redirect} from 'react-router-dom';

function Logout() {
    let history = useHistory();
    return (
        <div className="background">
            <main>
                <div className="content">
                    <h2>Logout</h2> <br />
                    <p>You have successfully Logged Out! <br />
                    </p>
                </div>
            </main>
        </div>
    )
}

export default Logout
