import "./List.css";
import { useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import { format } from "date-fns";
import { DateRange } from "react-date-range";
import SearchItem from "../../components/searchItem/searchItem";
import axios from "axios";
import GlobalNav from "../../components/GlobalNav/GlobalNav";

const List = () => {
  const location = useLocation();
  const [destination, setDestination] = useState(location.state.destination);
  const [dates, setDates] = useState(location.state.dates);
  const [openDate, setOpenDate] = useState(false);
  const [options, setOptions] = useState(location.state.options);
  const [data, setData] = useState([])
  const [min, setMin] = useState(undefined);
  const [max, setMax] = useState(undefined);
  const [loading, setLoading] = useState(true)

  //FETCHING DATA FROM DATABASE
  // const [data, setData] = useState([])
  // console.log(data)
// console.log(options)
  // FETCH DATA BY DESTINATIONS

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get(`https://hotel-mazan.up.railway.app/hotel/allhotels?city=${destination}`)
        // console.log(res)
        setData(res.data)

      } catch (e) {
        console.log(e)
      }

    }
    fetchData()

  }, [destination, max, min])

  // SEARCH MIN AND MAX
  const handleClick = async () => {
    try {
      const minmax = await axios.get(`https://hotel-mazan.up.railway.app/hotel/allhotels?city=${destination}&min=${min || 0}&max=${max || 999}`)
      // console.log(minmax)
      setData(minmax.data)

    } catch (e) {
      console.log(e)
    }

  }

  // DATA FETCH LOADER
  useEffect(() => {
    const timeout = setTimeout(() => {
      setLoading(false);
    }, [2000])
    return () => clearTimeout(timeout);
  })
  return (
    <>
      <GlobalNav />
      <div className="listContainer">
        <div className="listWrapper">
          <div className="listSearch">
            <h1 className="lsTitle">Search</h1>
            <div className="lsItem">
              <label>Destination</label>
              <input placeholder={destination} type="text" />
            </div>
            <div className="lsItem">
              <label>Check-in Date</label>
              <span className="Ls__date" onClick={() => setOpenDate(!openDate)}>{`${format(
                dates[0].startDate,
                "MM/dd/yyyy"
              )} to ${format(dates[0].endDate, "MM/dd/yyyy")}`}</span>
              {openDate && (
                <DateRange
                  onChange={(item) => setDates([item.selection])}
                  minDate={new Date()}
                  ranges={dates}
                />
              )}
            </div>
            <div className="lsItem">
              <label>Options</label>
              <div className="lsOptions">
                <div className="lsOptionItem">
                  <span className="lsOptionText">
                    Min price <small>per night</small>
                  </span>
                  <input type="number" className="lsOptionInput" onChange={(e) => setMin(e.target.value)} />
                </div>
                <div className="lsOptionItem">
                  <span className="lsOptionText">
                    Max price <small>per night</small>
                  </span>
                  <input type="number" className="lsOptionInput" onChange={(e) => setMax(e.target.value)} />
                </div>
                <div className="lsOptionItem">
                  <span className="lsOptionText">Adult</span>
                  <input
                    type="number"
                    defaultValue={options.adult}
                    min={1}
                    className="lsOptionInput"
                    placeholder={options.adult}
                  />
                </div>
                <div className="lsOptionItem">
                  <span className="lsOptionText">Children</span>
                  <input
                    type="number"
                    min={0}
                    defaultValue={options.children}
                    className="lsOptionInput"
                    placeholder={options.children}
                  />
                </div>
                <div className="lsOptionItem">
                  <span className="lsOptionText">Room</span>
                  <input
                    type="number"
                    min={1}
                    defaultValue={options.room}
                    className="lsOptionInput"
                    placeholder={options.room}
                  />
                </div>
              </div>
            </div>
            <button onClick={handleClick}>Search</button>
          </div>
          <div className="listResult">
            {

              loading ? ('loading please wait...') : (
                data.map(item => (
                  <SearchItem key={item._id} item={item} />
                ))
              )
            }
          </div>
        </div>
      </div>
    </>
  );
};

export default List;
