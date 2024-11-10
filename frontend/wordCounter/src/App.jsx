import React, { useState } from 'react';
import axios from 'axios';
import WordCloud from './wordcloud';
import Charts from './charts';
import Table from './Table';

const App = () => {
  const [url, setUrl] = useState('');
  const [count, setCount] = useState(1);
  const [data, setData] = useState([]);
  const [allWords, setAllWords] = useState([]);
  const [topWords, setTopWords] = useState([]);
  const [error, seterror] = useState('');
  const [progress, setProgress] = useState(0);
  
  
  const handleError = (message) => {
    seterror(message);
    setProgress(100); // Start the progress bar at 100%
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev <= 0) {
          clearInterval(interval);
          seterror('');
          return 0;
        }
        return prev - 5; // Decrease progress
      });
    }, 100);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:3000/', { url });
      if (response.data && Array.isArray(response.data.topWords)) {
        const topN = response.data.topWords.slice(0, count);
        setData(topN);
        setAllWords(response.data.topWords);
        setTopWords(topN);
      }
    } catch (err) {
      console.error('Error fetching data:', err);
      handleError('The URL is unable to be processed.');
    }
  };

  const chartData = {
    labels: topWords.map(([word]) => word),
    datasets: [
      {
        label: 'Frequency',
        data: topWords.map(([, frequency]) => frequency),
        backgroundColor: 'rgba(75, 192, 192, 0.6)',
        borderColor: 'rgba(75, 192, 192, 1)',
        borderWidth: 1,
      },
    ],
  };

  const lineData = {
    labels: topWords.map(([word]) => word),
    datasets: [
      {
        label: 'Frequency',
        data: topWords.map(([, frequency]) => frequency),
        borderColor: 'rgba(153, 102, 255, 1)',
        backgroundColor: 'rgba(153, 102, 255, 0.2)',
        fill: true,
        borderWidth: 1,
      },
    ],
  };

  return (
    <div style={{ backgroundColor: '#000', color: '#fff', minHeight: '100vh', padding: '2rem' }}>
      <h1 style={{ textAlign: 'center', marginBottom: '1rem', fontSize: '2rem' }}>Top Frequency Counter</h1>
      <form
        onSubmit={handleSubmit}
        style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: '1rem',
          width: '100%',
          maxWidth: '400px',
          margin: '0 auto',
        }}
      >
        <input
          type="text"
          placeholder="Enter URL"
          value={url}
          onChange={(e) => setUrl(e.target.value)}
          required
          style={{
            padding: '0.5rem',
            width: '100%',
            borderRadius: '5px',
            border: '1px solid #fff',
            backgroundColor: '#1E1E1E',
            color: '#fff',
          }}
        />
        <input
          type="number"
          placeholder="Enter an integer (>= 1)"
          value={count}
          onChange={(e) => setCount(Math.max(1, Number(e.target.value)))}
          required
          style={{
            padding: '0.5rem',
            width: '100%',
            borderRadius: '5px',
            border: '1px solid #fff',
            backgroundColor: '#1E1E1E',
            color: '#fff',
          }}
        />
        <button
          type="submit"
          style={{
            padding: '0.7rem 2rem',
            backgroundColor: '#1DB954',
            color: '#fff',
            border: 'none',
            borderRadius: '5px',
            cursor: 'pointer',
            fontSize: '1rem',
          }}
        >
          Submit
        </button>
      </form>
      {error && (
        <div
          style={{
            position: 'fixed',
            top: '5%',
            left: '80%',
            transform: 'translate(-50%, -50%)',
            backgroundColor: '#FF4C4C',
            color: '#FFFFFF',
            padding: '0.5rem',
            borderRadius: '10px',
            textAlign: 'center',
            zIndex: 1000,
            border: '2px solid #FFFFFF',
            boxShadow: '0 4px 8px rgba(255, 255, 255, 0.2)',
            width: '300px',
          }}
        >
          <p style={{ fontSize: '1.2rem', marginBottom: '0',marginTop:'0' }}>{error}</p>
          <div
            style={{
              backgroundColor: '#FFFFFF',
              borderRadius: '5px',
              overflow: 'hidden',
              height: '10px',
              width: '100%',
              marginTop: '0.2rem',
            }}
          >
            <div
              style={{
                backgroundColor: '#B00020',
                height: '100%',
                width: `${progress}%`,
                transition: 'width 0.1s linear',
              }}
            ></div>
          </div>
        </div>
      )}
      {data.length > 0 && (
        <>
          <Table data={data} />
          <div className="charts-container">
            <div className="chart">
              <h2>All Words Cloud</h2>
              <WordCloud words={allWords} id="all-words-cloud" />
            </div>
            <div className="chart">
              <h2>Top N Words Cloud</h2>
              <WordCloud words={topWords} id="top-words-cloud" />
            </div>
            <div className="chart">
              <h2>Bar Chart</h2>
              <Charts data={chartData} type="bar" />
            </div>
            <div className="chart">
              <h2>Line Chart</h2>
              <Charts data={lineData} type="line" />
            </div>
          </div>
        </>
      )}
       
    </div>
  );
};

export default App;
