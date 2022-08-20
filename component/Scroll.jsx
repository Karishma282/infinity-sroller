import React, { useEffect, useState } from 'react';
import ReactPaginate from 'react-paginate';
import { Link } from 'react-router-dom';

const Scroll = () => {
  const [data, setData] = useState([]);
  const [items, setItems] = useState([]);
  const [page, setPage] = useState(1);

  const [pageCount, setpageCount] = useState(0);

  let limit = 10;

  useEffect(() => {
    fetch(
      `https://scroller-app.herokuapp.com/api/launchesPast?_page=${page}&_limit=10`,
    )
      .then((res) => res.json())
      .then((res) => setData(res))
      .catch((err) => console.log(err));
  }, [page]);

  data.sort((a, b) => a.id - b.id);

  return (
    <div >
      <h1 style={{marginTop:'1rem',textAlign:'center',color:'teal'}}>INFINITY - SCROLLING</h1>
      <div
        style={{
          width: '40%',
          height: '350px',
          textAlign: 'center',
          overflow: 'scroll',
          margin: 'auto',
          textDecoration: 'none',
        }}>
        {data.map((item) => {
          return (
            <Link to={`/data/${item.id}`} key={item.id}>
              <div
                style={{ display: 'flex', gap: '20px', marginLeft: '50px' }}
                key={item.id}>
                <h3>{item.id}</h3>
                <h3 style={{ textDecoration: 'none', color: 'black' }}>
                  mission_name :- {item.mission_name}
                </h3>
              </div>
            </Link>
          );
        })}
      </div>

      <div style={{marginLeft:'500px',width:'30',gap:'1em',marginTop:'1rem'}}>
        <button
          disabled={page == 1 ? true : false}
          onClick={() => (page > 1 ? setPage(page - 1) : setPage(page))}>
          Pre
        </button>
        <button
          disabled={page == 10 ? true : false}
          onClick={() => (page < 10 ? setPage(page + 1) : setPage(page))}>
          Next
        </button>
      </div>
    </div>
  );
};

export default Scroll;