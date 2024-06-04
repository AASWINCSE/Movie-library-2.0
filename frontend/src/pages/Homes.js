
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './styles.css'; 
import { Navigate, useNavigate } from 'react-router-dom';

const Homes = () => {
    const [searchTerm, setSearchTerm] = useState('');
    const [movies, setMovies] = useState([]);
    const [lists, setLists] = useState([]);
    const [listName, setListName] = useState('');
    const apiKey = '2302d946'; 
    const userId = localStorage.getItem('userId'); 
    const [listId, setListId] = useState("");
    const [listMovies, setListMovies] = useState([]);
    const [error, setError] = useState('');
    const [successMessage, setSuccessMessage] = useState('');

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

    const handleSearch = async () => {
        try {
            const response = await axios.get(`https://www.omdbapi.com/?apikey=${apiKey}&s=${searchTerm.trim()}`);
            console.log('Response:', response.data);
            setMovies(response.data.Search || []);
        } catch (error) {
            console.error('Error searching movies:', error);
        }
    };

    const handleCreateList = async () => {
        try {
            const response = await axios.post('${process.env.REACT_APP_BACKEND_URL}/api/list/create', {
                name: listName,
                userId,
                isPublic: true
            });
            setLists([...lists, response.data]);
            setListId(response.data._id);
            setListName('');
            setSuccessMessage('List created successfully!');
        } catch (error) {
            console.error('Error creating list:', error);
            setError('Error creating list. Please try again.');
        }
    };

    const handleAddToList = async (movieId) => {
        if (!listId) {
            setError('Please select a list.');
            return;
        }

        try {
            const response = await axios.put('${process.env.REACT_APP_BACKEND_URL}/api/list/add-movie', {
                listId,
                movies: [movieId] 
            });
            console.log('Movie added to list:', response.data);
            setListMovies(response.data.movies);
            setSuccessMessage('Movie added to list successfully!');
        } catch (error) {
            console.error('Error adding movie to list:', error);
            setError('Error adding movie to list. Please try again.');
        }
    };

    const handleListChange = async (event) => {
        const selectedListId = event.target.value;
        setListId(selectedListId);
        try {
            const response = await axios.get(`${process.env.REACT_APP_BACKEND_URL}/api/list/${selectedListId}`);
            setListMovies(response.data.movies || []);
        } catch (error) {
            console.error('Error fetching list movies:', error);
        }
    };

    const moveToList = async() => {
        navigate("/lists");
    }

    return (
        <div>
            <h6><i class="fa-solid fa-film"></i>MOVIE LIBRARY</h6>
            <div className='header'>
                <button className='btn'>Home</button>
                <button className='btn' onClick={moveToList}>My List</button>
            </div>
            <div className="home-container">
                <div className="section-search">
                    <div className="input-list">
                        <input 
                            type="text" 
                            value={searchTerm} 
                            onChange={(e) => setSearchTerm(e.target.value)} 
                            placeholder="Search Movies" 
                            className="search-input"
                        />
                        <button onClick={handleSearch} className="search-button">Search</button>
                    </div>
                    <div className="input-list">
                        <h2>Create a New List</h2>
                        <input
                            type="text"
                            value={listName}
                            onChange={(e) => setListName(e.target.value)}
                            placeholder="List Name"
                            className="list-input"
                        />
                        <button onClick={handleCreateList} className="create-list-button">Create List</button>
                        
                    </div>
                </div>
                <div className="movies-container">
                    {movies.map(movie => (
                        <div key={movie.imdbID} className="movie-item">
                            <div>
                                <div className='topic'>
                                <h2>{movie.Title}</h2>
                                <h2>{movie.Year}</h2>
                                </div>
                                <img src={movie.Poster} alt={movie.Title} />
                            </div>
                            <div>
                                <h2>Select a List</h2>
                                <select onChange={handleListChange} value={listId} className="select-list">
                                    <option value="">Select a list</option>
                                    {lists.map(list => (
                                        <option key={list._id} value={list._id}>{list.name}</option>
                                    ))}
                                </select>
                            </div>
                            <button onClick={() => handleAddToList(movie.imdbID)} className="add-to-list">Add to List</button>
                            {error && <p className="error">{error}</p>}
                            {successMessage && <p className="success">{successMessage}</p>}
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default Homes;
