import React, { useEffect } from 'react';

function Clock({ taskList }) {

  return (
    <div style={styles.circle}>
      {Array.isArray(taskList) && taskList.map((task, index) => {
        const { startDegrees, endDegrees } = task;

        // Create a dynamic gradient for each task
        const gradientBackground = `conic-gradient(transparent ${startDegrees}deg, #0000ff ${startDegrees}deg ${endDegrees}deg, transparent ${endDegrees}deg)`;

        return (
          <div
            key={index}
            style={{
              ...styles.gradientSegment,
              background: gradientBackground,
            }}
          />
        );
      })}
      <img src="/assets/24hrClock.avif" alt="Clock" style={styles.image} />
    </div>
  );
}

const styles = {
  circle: {
    position: 'relative', // Make the circle position relative so that child elements can be absolutely positioned inside it
    width: '400px',
    height: '400px',
    borderRadius: '50%',  // Make it a circle
    boxShadow: '0 0 10px rgba(0, 0, 0, 0.2)', // Optional, adds a shadow
    overflow: 'hidden', // Ensure child elements don't overflow the circle
  },

  image: {
    position: 'absolute', // Position the image absolutely inside the circle
    top: '50%', // Center vertically
    left: '50%', // Center horizontally
    transform: 'translate(-50%, -50%)', // Adjust for exact centering
    width: '350px', // Adjust size of image
    height: '350px', // Adjust size of image
  },

  gradientSegment: {
    position: 'absolute', // Make the gradient segment position absolute within the circle
    top: '0',
    left: '0',
    right: '0',
    bottom: '0',
    borderRadius: '50%', // Keep the segments circular
  },
};

export default Clock;
