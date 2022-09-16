import React from 'react';
// import petsee_logo from './images/petsee_logo.png'

function About(){

    return(
        <div>
            <h1>About this Project</h1>
            <ul>
                <li>Searching for any movie or tv show will return up to three films or shows from the  Movie Database Alternative API.</li>
                <li>Those films are then checked, using their IMDB id, using the Streaming Availability API.</li>
                <li> If the film is available for streaming, a logo for the streaming service will appear above the title.</li>
                <li>If it isn't available a button will allow the user to sign up for an email alert when the film becomes available for streaming.</li>
            </ul>
        </div>
    )



}
export default About;