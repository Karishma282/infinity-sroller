import React, { useEffect, useState } from 'react';
import ReactPaginate from 'react-paginate';
import { Link } from 'react-router-dom';

const Scroll = () => {
  const [data, setData] = useState([]);
  const [items, setItems] = useState([]);

  const [pageCount, setpageCount] = useState(0);

  let limit = 10;

  useEffect(() => {
    fetch('https://scroller-app.herokuapp.com/api/launchesPast')
      .then((res) => res.json())
      .then((res) => setData(res))
      .catch((err) => console.log(err));
  });
  useEffect(() => {
    const getdata = async () => {
      const res = await fetch(
        `https://scroller-app.herokuapp.com/api/launchesPast=${limit}`,
      );
      const data = await res.json();
      const total = res.headers.get('x-total-count');
      setpageCount(Math.ceil(total / limit));
      // console.log(Math.ceil(total/12));
      setItems(data);
    };

    getdata();
  }, [limit]);
  const fetchdata = async (currentPage) => {
    const res = await fetch(
      `https://scroller-app.herokuapp.com/api/launchesPast=${currentPage}&_limit=${limit}`,
    );
    const data = await res.json();
    return data;
  };

  const handlePageClick = async (data) => {
    console.log(data.selected);

    let currentPage = data.selected + 1;

    const commentsFormServer = await fetchdata(currentPage);

    setItems(commentsFormServer);
  };
  return (
    <div
      style={{
        marginTop:"10px",
        width: '50%',
        height: '500px',
        textAlign: 'center',
        overflow: 'scroll',
        margin: 'auto',
        textDecoration: 'none',
      }}>
      {data.map((item) => {
        return (
          <Link to={`/data/${item.id}`} key={item.id}>
            <div key={item.id}>
              <h3 style={{ textDecoration: 'none', color: 'black' }}>
                mission_name :- {item.mission_name}
              </h3>
            </div>
          </Link>
        );
      })}
      <ReactPaginate
        previousLabel={'previous'}
        nextLabel={'next'}
        breakLabel={'...'}
        pageCount={pageCount}
        marginPagesDisplayed={2}
        pageRangeDisplayed={3}
        onPageChange={handlePageClick}
        containerClassName={'pagination justify-content-center'}
        pageClassName={'page-item'}
        pageLinkClassName={'page-link'}
        previousClassName={'page-item'}
        previousLinkClassName={'page-link'}
        nextClassName={'page-item'}
        nextLinkClassName={'page-link'}
        breakClassName={'page-item'}
        breakLinkClassName={'page-link'}
        activeClassName={'active'}
      />
    </div>
  );
};

export default Scroll;
