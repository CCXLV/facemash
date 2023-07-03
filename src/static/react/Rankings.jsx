import React, { useState, useEffect } from 'react';
import { createRoot } from 'react-dom/client';
import axios from 'axios';
import '../css/styles.css';
import '../css/rankings.css';


const App = () => {
    const [data, setData] = useState(null);

    useEffect(() => {
        fetchData();
    }, []);
  
    const fetchData = async () => {
        try {
            const response = await axios.get('/api/data/images');
            setData(response.data);
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <div>
            <div className='main-header'>
                <a href='/' className='main-header-p'>FACEMASH</a>
            </div>
            {data ? (
                <div className='main-div'>
                    {data
                    .sort((a, b) => b.rating - a.rating) 
                    .map((item, index) => (
                        <React.Fragment key={index}>
                            <div className='ranking-divs'>
                                <div className='ranking-left-side'>
                                    <span className='ranking-span'>{index + 1}.</span>
                                    <span>{item.rating}</span>
                                </div>
                                <div className='ranking-image-div'>
                                    <img src={`data:image/png;base64,${item.data}`} alt={`Ranking ${index + 1}`} />
                                </div>
                            </div>
                            <hr />
                        </React.Fragment>
                    ))}
                </div>
            ) : (
                <p className='no-data'></p>
            )}

        </div>
    )
};

createRoot(document.getElementById('main-container')).render(<App />);