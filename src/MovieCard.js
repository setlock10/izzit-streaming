import React from 'react';
import netflixLogo from './images/netflix.png'
import huluLogo from './images/hulu.png'
import hboLogo from './images/hbo.png'
import disneyLogo from './images/disney.png'
import starzLogo from './images/starz.png'
import primeLogo from './images/prime.png'
import peacockLogo from './images/peacock.png'
import paramountLogo from './images/paramount.png'
import appleLogo from './images/apple.png'
import showtimeLogo from './images/showtime.png'

function MovieCard({movie, alertMe}){
    var src

    switch (movie.streaming){
        case "hulu":
            src=huluLogo;
            break;
        case "netflix":
            src=netflixLogo;
            break;
        case "hbo":
            src=hboLogo;
            break;
        case "disney":
            src=disneyLogo;
            break;
        case "starz":
            src=starzLogo;
            break;
        case "prime":
            src=primeLogo;
            break;
        case "peacock":
            src=peacockLogo;
            break;
        case "paramount":
            src=paramountLogo;
            break;
        case "apple":
            src=appleLogo;
            break;
        case "showtime":
            src=showtimeLogo;
            break;
        default:
            src="netflixLogo";
    }

    let streaming=(movie.streaming!==undefined)?(<img className='logoCardImage' alt={movie.streaming} src={src} /> ):(<button onClick={()=>alertMe(movie.Title, movie.Year, movie.imdbID)} className="alertButton">Alert Me When Available</button>)

    console.log(movie)
    return(
        
        <div className='movieTile'>
            <h2>{streaming}</h2>
            <h2>{movie.Title} {movie.Year}</h2> 
            <img className="movieCardImage"   alt={movie.Title} src={movie.Poster} />
          </div>
    )
}
export default MovieCard;