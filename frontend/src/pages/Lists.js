import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Navigate, useNavigate } from 'react-router-dom';

const Lists = () => {
    const [lists, setLists] = useState([]);
    const [movieDetails, setMovieDetails] = useState({});
    const userId = localStorage.getItem('userId'); 
    const apiKey = '2302d946'; 

    const navigate = useNavigate();

    useEffect(() => {
        const fetchLists = async () => {
            try {
                const response = await axios.get(`${process.env.REACT_APP_BACKEND_URL}/api/list/${userId}`);
                setLists(response.data);
            } catch (error) {
                console.error('Error fetching lists:', error);
            }
        };

        fetchLists();
    }, [userId]);

    useEffect(() => {
        const fetchMovieDetails = async (movieId) => {
            if (!movieDetails[movieId]) {
                try {
                    const response = await axios.get(`https://www.omdbapi.com/?apikey=${apiKey}&i=${movieId}`);
                    setMovieDetails(prevDetails => ({ ...prevDetails, [movieId]: response.data }));
                } catch (error) {
                    console.error(`Error fetching details for movie ID ${movieId}:`, error);
                }
            }
        };

        lists.forEach(list => {
            list.movies.forEach(movieId => {
                fetchMovieDetails(movieId);
            });
        });
    }, [lists, apiKey]);

    const moveToHome = async () => {
        navigate("/home");
    }

    return (
        <div className='mylist'>
            <h6>MOVIE LIBRARY</h6>
            <div className='header'>
                <button className='btn' onClick={moveToHome}>Home</button>
                <button className='btn' >My List</button>
            </div>
            <div className="home-container">
            <h1>My Lists</h1>
            <div className="movies-container">
                {lists.map(list => (
                    <div key={list._id} className="mov-it">
                        <h2>{list.name}</h2>
                        <div className='list-movie'>
                            {list.movies && list.movies.length > 0 ? (
                                list.movies.map((movieId, index) => (
                                    movieDetails[movieId] ? (
                                        <div key={index}>
                                            <div className='topic'>
                                            <h3>{movieDetails[movieId].Title}</h3>
                                            <h3>{movieDetails[movieId].Year}</h3>
                                            </div>
                                            <img src={movieDetails[movieId].Poster} alt={movieDetails[movieId].Title} />
                                        </div>
                                    ) : (
                                        <p key={index}>Loading movie details...</p>
                                    )
                                ))
                            ) : (
                                <p>No movies in this list</p>
                            )}
                        </div>
                    </div>
                ))}
            </div>
            </div>
        </div>
    );
};

export default Lists;
