import React, { useState } from 'react';

export const StudySet = () => {
  const [cards, setCards] = useState([
    { term: '동네', definition: 'neighborhood' },
    { term: '동네', definition: 'neighborhood' },
    { term: '동네', definition: 'neighborhood' },
    { term: '동네', definition: 'neighborhood' },
    { term: '동네', definition: 'neighborhood' },
    { term: '동네', definition: 'neighborhood' },
    { term: '동네', definition: 'neighborhood' },
    { term: '동네', definition: 'neighborhood' },
    { term: '동네', definition: 'neighborhood' },
  ]);
  return (
    <div className="current-set">
      <h1 className="title">October - November</h1>
      <button className="learn-btn">Learn</button>
      <div className="cards">
        {cards.map((card, index) => {
          return (
            <div key={index} className="card">
              <div className="term-col">
                <div className="term" contentEditable>
                  <p>{card.term}</p>
                </div>
              </div>
              <div className="definition-col">
                <div className="definition" contentEditable>
                  {card.definition}
                </div>
              </div>
            </div>
          );
        })}
      </div>
      <div className="fade"></div>
    </div>
  );
};
