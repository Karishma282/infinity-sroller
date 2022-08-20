import react, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

export const Data = () => {
  const [data, setData] = useState([]);
  const params = useParams();
  const id = params.id;
  // console.log(id)

  useEffect(() => {
    fetch(`https://scroller-app.herokuapp.com/api/launchesPast`)
      .then((res) => res.json())
      .then((res) => {
        // console.log(res);
        setData(res.filter((item) => item.id === id));
      })
      .catch((err) => console.log(err));
  }, [id]);
  // console.log(data);

  return (
    <div style={{width:'50%',height:'400px',textAlign:'center',margin:"auto",textDecoration:'none'}}>
      {data.map((item) => {
        return (
          <div key={item.id} style={{boxShadow: 'rgba(0, 0, 0, 0.35) 0px 5px 15px',padding:'1em'}}>
            <h1>{item.mission_name}</h1>
            <p>launch_date_local :- {item.launch_date_local}</p>
            <p>launch_site :- {item.launch_site.site_name_long}</p>
            <p>ships name :- {item.ships.map((item) => item.name)}</p>
            <p>home_port :- {item.ships.map((item) => item.home_port)}</p>
          </div>
        );
      })}
    </div>
  );
};
