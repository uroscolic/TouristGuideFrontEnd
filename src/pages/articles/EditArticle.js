import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../../utils/api';
import '../../form.css';
import { useEffect } from 'react';
import { useParams } from 'react-router-dom';

const EditArticle = () => {
    const [title, setTitle] = useState('');
    const [text, setText] = useState('');
    const [destinations, setDestinations] = useState('');
    const [activities, setActivities] = useState('');
    const [selectedDestination, setSelectedDestination] = useState([]);
    const [selectedActivities, setSelectedActivities] = useState([]);
    const { id } = useParams();
    const [error, setError] = useState('');
    const navigate = useNavigate();
    const jwt = localStorage.getItem('jwt');


    const fetchArticle = async () => {
        try {
            const response = await api.get(`/api/articles/${id}`,{
                headers: {
                    'Authorization': `Bearer ${jwt}`
                }
            
            });
            setTitle(response.data.title);
            setText(response.data.text);
            setSelectedDestination(response.data.destinationId);
            setSelectedActivities(response.data.activities);
            console.log(response.data);
        }
        catch (error) {
            if(error.response.status === 401)
                setError('Unauthorized!');
            else
                setError('Error fetching article!');
        }
    };


    const fetchDestinations = async () => {
        try {
          const response = await api.get('/api/destinations',{
            headers: {
                'Authorization': `Bearer ${jwt}`
            }
        
        });
        const destinationsMap = response.data.destinations.reduce((acc, destination) => {
            acc[destination.id] = destination.name;
            return acc;
          }, {});
          
          setDestinations(destinationsMap);
        } catch (err) {
          setError('Error fetching destinations');
        }
      };
    
      const fetchActivities = async () => {
        try {
            const response = await api.get('/api/activities',{
            headers: {
                'Authorization': `Bearer ${jwt}`
            }
        
        });
        const activitiesMap = response.data.reduce((acc, activity) => {
            acc[activity.id] = activity.name;
            return acc;
          }, {});
          
          setActivities(activitiesMap);
        } catch (err) {
          setError('Error fetching activities');
        }
      };
      useEffect(() => {
        fetchDestinations();
        fetchActivities();
        fetchArticle();
      }, [jwt]);
    

    const handleSubmit = async (e) => {
    e.preventDefault();


    try {
        const response = await api.put('/api/articles', { 
            id : id,
            title : title,
            text : text,
            author : localStorage.getItem('name'),
            destinationId : selectedDestination,
            activities : selectedActivities,
            date : new Date().toISOString().substring(0,10).toString()
        

        },{
          headers: {
              'Authorization': `Bearer ${jwt}`
          }
      });

        console.log(response.data);
        navigate('/articles');
    } catch (error) {
      if(error.response.status === 401)
        setError('Unauthorized!');
      else
        setError('Error editing article!');
    }
    };
    const handleDestinationChange = (event) => {
        setSelectedDestination(event.target.value);
    };
    const handleActivitiesChange = (event) => {
        const options = event.target.options;
        const selectedValues = [];
        for (let i = 0; i < options.length; i++) {
        if (options[i].selected) {
            selectedValues.push(options[i].value);
        }
        }
        setSelectedActivities(selectedValues);
    };




  return (
    <div className="form-container">
      <h2>Edit Article</h2>
      <form onSubmit={handleSubmit} className="form-form"> 
        <input
          type="text"
          placeholder="Title"
          required
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <textarea
          type="text"
          placeholder="Text"
          required
          value={text}
          onChange={(e) => setText(e.target.value)}
        />
        <select value = {selectedDestination} onChange = {handleDestinationChange} required> 
        <option value="" disabled>Select Destination</option>
            {
                Object.keys(destinations).map(destinationId => (
                    <option key={destinationId} value={destinationId}>{destinations[destinationId]}</option>
                ))
                
            }

        </select>
        <select multiple value={selectedActivities} onChange={handleActivitiesChange} required>
        {
            
            Object.keys(activities).map((activityId) => (
            <option key={activityId} value={activityId}>
                {activities[activityId]}
            </option>
        ))}
      </select>
      <button type="submit">Confirm Changes</button>
        {error && <p className="error-message">{error}</p>}

        


        
      </form>
      
    </div>
  );
};

export default EditArticle;