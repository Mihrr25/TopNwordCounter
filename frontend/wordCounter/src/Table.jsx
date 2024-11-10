import React from 'react';

const Table = ({ data }) => {
  return (
    <table
      style={{
        width: '100%',
        maxWidth: '600px',
        margin: '2rem auto',
        borderCollapse: 'collapse',
        backgroundColor: '#1E1E1E',
        color: '#fff',
        border: '1px solid #fff',
        textAlign: 'left',
      }}
    >
      <thead>
        <tr>
          <th style={{ padding: '0.5rem', borderBottom: '1px solid #fff' }}>Word</th>
          <th style={{ padding: '0.5rem', borderBottom: '1px solid #fff' }}>Frequency</th>
        </tr>
      </thead>
      <tbody>
        {data.map(([word, frequency], index) => (
          <tr key={index}>
            <td style={{ padding: '0.5rem', borderBottom: '1px solid #fff' }}>{word}</td>
            <td style={{ padding: '0.5rem', borderBottom: '1px solid #fff' }}>{frequency}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default Table;
