import React from 'react';
 
const InstallButton = () => {
  const handleInstall = () => {
    // Replace with your GitHub OAuth URL
    window.location.href = 'https://github.com/apps/sidhApp/installations/select_target';
  };
 
  return (
    <button onClick={handleInstall}>
      Install GitHub App
    </button>
  );
};
 
export default InstallButton;