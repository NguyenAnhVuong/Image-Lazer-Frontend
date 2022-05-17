import React, { useState } from 'react';

const SavedPage = () => {
  const [saved] = useState<any[]>([]);
  return (
    <div>
      <h1>Saved</h1>
      <ul>
        {saved.map((item) => (
          <li key={item.id}>{item.title}</li>
        ))}
      </ul>
    </div>
  );
};

export default SavedPage;
