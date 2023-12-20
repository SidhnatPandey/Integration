import React, { useEffect, useState } from 'react';
import OpenRepositoryButton from './OpenRepositoryButton'
import axios from 'axios';
 
const WelcomePage = ({ location }) => {
  const [repositories, setRepositories] = useState([]);
  const [selectedRepo, setSelectedRepo] = useState(null); // Track the selected repository
  const searchParams = new URLSearchParams(location.search);
  const accessToken = searchParams.get('token');
 

 
  useEffect(() => {
    const fetchRepositories = async () => {
      try {
        // Fetch user repositories using the access token
        const response = await axios.get('https://api.github.com/user/repos', {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        });
 
 
        setRepositories(response.data);
        console.log(response.data)
      } catch (error) {
        console.error('Error fetching repositories:', error);
      }
    };
 
    if (accessToken) {
      fetchRepositories();
    }
  }, [accessToken]);
 
  const handleSelectRepo = (repoId) => {
    // Handle the selected repository, e.g., redirect to a page or perform an action
    setSelectedRepo(parseInt(repoId, 10));
    console.log('Selected Repo ID:', repoId);
  };
 
  return (
    <div style={{ textAlign: 'center', marginTop: '20vh' }}>
      <h2>Welcome to the App!</h2>
      {/* <p>Access Token: {accessToken}</p> */}
      <h3>Your Repositories:</h3>
      <select
        value={selectedRepo}
        onChange={(e) => handleSelectRepo(e.target.value)}
        style={{ width: '300px', height: '30px' }} // Set the width of the dropdown
      >
        <option value={null}>Select a Repository</option>
        {repositories.map(repo => (
          <option key={repo.id} value={String(repo.id)}>{repo.full_name}</option>
        ))}
      </select>
      
      {selectedRepo && (
        <div>
          <p>Selected Repository: {repositories.find((repo) => repo.id === selectedRepo)?.name}</p>
        </div>
      )}
        
     <OpenRepositoryButton repositoryUrl={repositories.find((repo) => repo.id === selectedRepo)?.full_name} />
    </div>
  );
};
 
export default WelcomePage;