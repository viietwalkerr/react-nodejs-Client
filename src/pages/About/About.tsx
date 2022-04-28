import React from 'react'
import Page from '../../components/Layout/Common/Page/Page'
import SubArea from '../../components/Layout/Common/SubArea/SubArea'


function About() {
    return (
        <>
            <Page>
                <h2>About illumin8</h2>
                <div className="content">
                    <p>I had previously created a website using my prior <br />
                    knowledge in HTML, CSS, JAVASCRIPT and PHP <br />
                    I had recently started self-learning REACT.</p>

                    <p>This webapp utilises React, NodeJS, Express and MySQL</p>
                </div>
            </Page>
            <SubArea heading={"The illumin8 Journey"}>
                <p>
                    I wanted the name of this website to have some sort of signature to it.
                    Considering I go by the name Nate, I thought of having something with n8 in it.
                    I thought of the name illumin8, which means to create light.
                </p>
                <p>
                    This is the 4th iteration of illumin8, gradually progressing, implementing new
                    features. This iteration has changed from using general state management to utilising
                    react-redux.
                </p>
                <p>   
                    
                </p>
            </SubArea>
        </>
    )
}

export default About
