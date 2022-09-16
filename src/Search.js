import React,{useEffect,useState} from 'react';
import {streamingAvailAPIKey,movieDbAPIKey} from './keys.js'
import MovieCard from './MovieCard';

function Search({email}){

    const [formMovie,setFormMovie]= useState("")
    const [movies,setMovies]=useState([])
    const [newTitle,setNewTitle]=useState("")
    const [newYear,setNewYear]=useState("")
    const [newImdbID,setNewImdbID]=useState("")
    const [newMovieID,setNewMovieID]=useState(0)
    const [newUserID,setNewUserID]=useState(0)

    function handleSearchChange(e){
        setFormMovie(e.target.value)
    }

    function handleSubmit(e){
        e.preventDefault()
            fetch(`https://movie-database-alternative.p.rapidapi.com/?s=${formMovie}&r=json&page=1`,{
                method:'GET',
                headers: {
                    'X-RapidAPI-Key': movieDbAPIKey,
                    'X-RapidAPI-Host': 'movie-database-alternative.p.rapidapi.com'
                }
            })
            .then(res=>res.json())
            .then(data=>{
                fetch(`https://streaming-availability.p.rapidapi.com/get/basic?country=us&imdb_id=${data.Search[0].imdbID}&output_language=en`,{
                    method:'GET',
                    headers: {
                        'X-RapidAPI-Key': streamingAvailAPIKey,
                        'X-RapidAPI-Host': 'streaming-availability.p.rapidapi.com'
                    }
                })
                .then(res=>res.json())
                .then(data2=>{
                    data.Search[0].streaming=Object.keys(data2.streamingInfo)[0]
                    setMovies(data.Search.slice(0,((data.Search.length>3)?3:data.Search.length)))
                })
                .catch(e=>console.error(e))

                if (data.Search.length>1){
                   fetch(`https://streaming-availability.p.rapidapi.com/get/basic?country=us&imdb_id=${data.Search[1].imdbID}&output_language=en`,{
                        method:'GET',
                        headers: {
                            'X-RapidAPI-Key': streamingAvailAPIKey,
                            'X-RapidAPI-Host': 'streaming-availability.p.rapidapi.com'
                        }
                    })
                    .then(res=>res.json())
                    .then(data2=>{
                         data.Search[1].streaming=Object.keys(data2.streamingInfo)[0]
                         setMovies(data.Search.slice(0,((data.Search.length>3)?3:data.Search.length)))
                    })
                    .catch(e=>console.error(e))
                 }
            
                if (data.Search.length>2){
                    fetch(`https://streaming-availability.p.rapidapi.com/get/basic?country=us&imdb_id=${data.Search[2].imdbID}&output_language=en`,{
                        method:'GET',
                        headers: {
                            'X-RapidAPI-Key': streamingAvailAPIKey,
                            'X-RapidAPI-Host': 'streaming-availability.p.rapidapi.com'
                        }
                    })
                    .then(res=>res.json())
                    .then(data2=>{
                        data.Search[2].streaming=Object.keys(data2.streamingInfo)[0]
                        setMovies(data.Search.slice(0,((data.Search.length>3)?3:data.Search.length)))
                        
                    })
                    .catch(e=>console.error(e))
    
                }
            setMovies(data.Search.slice(0,((data.Search.length>3)?3:data.Search.length)))
            })
            .catch(e=>console.error(e))
    }

     let MovieCards=movies.map(movie=>{
        return <MovieCard key={movie.imdbID} movie={movie} alertMe={alertMe}/>
    })
    
    function handleNewAlertForm(e){
        e.preventDefault()
            fetch('http://localhost:9292/alerts',{
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            "Accept": "application/json",},
            body: JSON.stringify({
                user_id: newUserID,
                movie_id: newMovieID,
              }),
        })
        .then (res=>res.json())
        .then (data=>{
            console.log(data)
            
        })
        .catch(e=>console.error(e))
         setFormVisible('hidden')
    }

    function checkMovie(title,year,imdbID){
        
        fetch (`http://localhost:9292/movies/${imdbID}/check`)
            .then(res=>(res.json()))
            .then(data=>{
                setNewMovieID(data)
               if (data===99999){
                fetch('http://localhost:9292/movies',{
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    "Accept": "application/json",},
                    body: JSON.stringify({
                        title: title,
                        year: year,
                        imdb_id: imdbID
                    }),
                })
                .then (res=>res.json())
                .then (data=>{
                    console.log(data)
                    setNewMovieID(data)
                })
                .catch(e=>console.error(e))
                }
             })
    }

    function checkUser(email){
        fetch (`http://localhost:9292/users/${email}/check`)
            .then(res=>(res.json()))
            .then(data=>{
                setNewUserID(data)
                if (data===99999)
                {
                    fetch('http://localhost:9292/users',{
                        method: "POST",
                        headers: {
                            "Content-Type": "application/json",
                            "Accept": "application/json",},
                        body: JSON.stringify({
                            email: email,
                        }),
                    })
                    .then (res=>res.json())
                    .then (data=>{
                        setNewUserID(data)
                    })
                    .catch(e=>console.error(e))
                }
             })
    }
    const [formVisible,setFormVisible] =useState("hidden")
 
    function alertMe(title,year,imdbID){
        console.log(title +" "+ year + " " + imdbID)
        setNewTitle(title)
        setNewYear(year)
        setNewImdbID(imdbID)
        setFormVisible("visible")
        checkUser(email)
        checkMovie(title,year,imdbID)
    }

    function handleDismiss(){
        setFormVisible("hidden")
    }

    return(
        <div>
            <div>
                <form  style={{visibility:formVisible}} className='newAlertForm' onSubmit={(e)=>handleNewAlertForm(e)}>
                    <h2>Request Alert When Available</h2>
                    <h3>Movie Title: {newTitle}</h3>
                    <h3>Year: {newYear}</h3>
                    <h3>imdb ID: {newImdbID}</h3>
                    <h3>Email: {email}</h3>
                    <button type="submit">Submit</button> <button onClick={()=>handleDismiss()}>Dismiss</button>
                </form>
                <form  onSubmit={(e)=>handleSubmit(e)}>
                 <span><label>Enter any Movie or TV Show Title: </label><input type="search" onChange={(e)=>handleSearchChange(e)}></input><button type="submit">SEARCH</button></span>
                </form>
            </div>
            <div className='movieList'>{MovieCards}</div>

         </div>
    )
}
export default Search;
