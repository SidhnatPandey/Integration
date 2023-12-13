import React, { useEffect, useState } from 'react';
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
    setSelectedRepo(repoId);
  };

  return (
    <div style={{ textAlign: 'center', marginTop: '20vh' }}>
      <h2>Welcome to the App!</h2>
      {/* <p>Access Token: {accessToken}</p> */}
      <h3>Your Repositories:</h3>
      <select
        value={selectedRepo}
        onChange={(e) => handleSelectRepo(e.target.value)}
        style={{ width: '200px' }} // Set the width of the dropdown
      >
        <option value={null}>Select a Repository</option>
        {repositories.map(repo => (
          <option key={repo.id} value={repo.id}>{repo.full_name}</option>
        ))}
      </select>
      {/* {selectedRepo && (
        <div>
          <h4>Selected Repository:</h4>
          <p>{repositories.find(repo => repo.id === selectedRepo)?.full_name}</p>
        </div>
      )} */}

      {/* <button onClick={() => window.location.href = "http://localhost:9090/"}>Open with Visual Studio Code</button> */}
    </div>
  );
};

export default WelcomePage;

