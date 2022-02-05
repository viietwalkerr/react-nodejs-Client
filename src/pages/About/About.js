import React from 'react'
import Page from '../../components/Layout/Common/Page/Page'
import SubArea from '../../components/Layout/Common/SubArea/SubArea'


function About() {
    return (
        <>
        <Page>
        {/* <div className="background">
            <main> */}
                {/* <div className="page-content"> */}
                    <h2>About Page</h2>
                    <div className="content">
                        <p>I had previously created a website using my prior <br />
                        knowledge in HTML, CSS, JAVASCRIPT and PHP <br />
                        I had recently started self-learning REACT.</p>

                        <p>This webapp utilises React, NodeJS, Express and MySQL</p>
                    </div>
                    
                {/* </div> */}
            {/* </main> */}
            
        {/* </div> */}
        
        {/* <sub>
            <main>
                
                <h2>Sub area</h2>
                <p>This is a test for the sub content</p>
                <div className="subcontent">
                    <div className="firstArea">
                        <p>This is a test for the sub content area 1 <br></br>
                            Trying to find the correct size for these
                            paragraphs.<br></br>
                            -----------------------------------------<br></br>
                            -----------------------------------------<br></br>
                            -----------------------------------------<br></br></p></div>
                    <div className="secondArea"><p>This is a test for the sub content area 2<br></br>
                        -----------------------------------------<br></br>
                        -----------------------------------------<br></br>
                        -----------------------------------------<br></br>
                        -----------------------------------------<br></br>
                        -----------------------------------------<br></br>
                        -----------------------------------------<br></br></p></div>
                    <div className="thirdArea"><p>This is a test for the sub content area 3<br></br>
                        -----------------------------------------<br></br>
                        -----------------------------------------<br></br>
                        -----------------------------------------<br></br>
                        -----------------------------------------<br></br>
                        -----------------------------------------<br></br>
                        -----------------------------------------<br></br>
                        -----------------------------------------<br></br>
                        -----------------------------------------<br></br>
                        -----------------------------------------<br></br>
                        -----------------------------------------<br></br>
                       
                        -------------------------------------WEEEE<br></br></p></div>
                </div>
            </main>
            
        </sub> */}
        {/* <div className="third">
            <main>
                <h2>Third Area</h2>
                <p>This is a test for the third area</p>
            </main>
            
        </div> */}
        </Page>
        <SubArea heading={"Sub Content"}>
        <p>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.
        </p>
        <p>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.</p>
        <p>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.
            </p>
        </SubArea>
        </>
    )
}

export default About
