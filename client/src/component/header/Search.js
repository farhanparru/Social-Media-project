import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getDataAPI } from "../../utlis/fetchData";
import { GLOBALTYPES } from "../../redux/actions/globalTypes";
import UserCard from "../UserCard";
import LoadinIcon from "../../images/loading.gif";


const Search = () => {



  const [search, setSearch] = useState("");
  const [users, setUsers] = useState([]);
  const [load, setLoad] = useState(false);

  const { auth } = useSelector((state) => state);
  const dispatch = useDispatch();

  const handleSearch = async (e) => {
    e.preventDefault();
    if (!search) return;

    try {
      setLoad(true);
      const res = await getDataAPI(`search?username=${search}`, auth.token);
      setUsers(res.data.users);
      setLoad(false);
    } catch (err) {
      dispatch({
        type: GLOBALTYPES.ALERT,
        payload: { error: err.response.data.msg },
      });
    }
  };

  const handleClose = () => {
    setSearch("");
    setUsers([]);
  };

  return (
    <form className="search_form" onSubmit={handleSearch}>
      <input
        type="text"
        name="search"
        value={search}
        id="search"
        title="Enter to search"
        onChange={(e) =>
        setSearch(e.target.value.toLowerCase().replace(/ /g, ""))
        }
      />

      <div className="search_icon" style={{ opacity: search ? 0 : 0.3 }}>
        <span className="material-icons">search</span>
        <span>Enter to frindes</span>
      </div>
      <div
        className="close_search"
        onClick={handleClose}
        style={{ opacity: users.length === 0 ? 0 : 1 }}
      >
        &times;
      </div>

      <button type="submit" style={{ display: "none" }}>
        search
      </button>

      {load && <img className="loading" src={LoadinIcon} alt="loading" />}

    <div className="users">
  {search &&
    users.map((user) => (
      <UserCard
        key={user._id} 
        user={user}
        border="border"  // or border={true} or any truthy value
        handleClose={handleClose}
      />
    ))}
</div>

    </form>
  );
};

export default Search;
