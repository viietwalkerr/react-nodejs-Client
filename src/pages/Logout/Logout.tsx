import React from 'react'
import Page from '../../components/Layout/Common/Page/Page'

const Logout: React.FC = () => {
    return (
        <Page>
            <div className="background">
                <main>
                    <div className="content">
                        <h2>Logout</h2> <br />
                        <p>You have successfully Logged Out! <br />
                        </p>
                    </div>
                </main>
            </div>
        </Page>
    )
}

export default Logout
