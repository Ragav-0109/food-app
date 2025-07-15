import React from 'react';
import mapp from '../assert/mapp.js';

function FreeMapEmbed() {
  return (
    <div style={{ width: '100%', height: '500px' }}>
      <iframe
        title="Simple Map"
        width="100%"
        height="100%"
        loading="lazy"
        allowFullScreen
        referrerPolicy="no-referrer-when-downgrade"
        src="https://www.google.com/maps/embed/v1/place?q=New+Delhi,India&key=YOUR_GOOGLE_EMBED_API_KEY"
      ></iframe>
    </div>
  );
}

export default FreeMapEmbed;
