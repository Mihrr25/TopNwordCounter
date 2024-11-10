import React, { useEffect } from 'react';
import * as d3 from 'd3';
import cloud from 'd3-cloud';

const WordCloud = ({ words, id }) => {
  useEffect(() => {
    const size = 400;
    const layout = cloud()
      .size([size, size])
      .words(
        words.map(([word, frequency]) => ({
          text: word,
          size: 10 + frequency * 2,
        }))
      )
      .padding(5)
      .rotate(() => 0)
      .font('Impact')
      .fontSize((d) => d.size)
      .on('end', (wordData) => {
        d3.select(`#${id}`)
          .html('')
          .append('svg')
          .attr('width', size)
          .attr('height', size)
          .append('g')
          .attr('transform', `translate(${size / 2},${size / 2})`)
          .selectAll('text')
          .data(wordData)
          .enter()
          .append('text')
          .style('font-size', (d) => `${d.size}px`)
          .style('fill', () => d3.schemeCategory10[Math.floor(Math.random() * 10)])
          .attr('text-anchor', 'middle')
          .attr('transform', (d) => `translate(${d.x},${d.y}) rotate(${d.rotate})`)
          .text((d) => d.text);
      });

    layout.start();
  }, [words, id]);

  return <div id={id} className="graph" style={{display:'flex', justifyContent:"center"}}></div>;
};

export default WordCloud;
