import { useEffect, useState } from "react";
import "./App.css";
import axios from "axios";
type User = {
  gender: string;
  name: {
    title: string;
    first: string;
    last: string;
  };
  location: {
    street: {
      number: number;
      name: string;
    };
    city: string;
    state: string;
    country: string;
    postcode: string;
    coordinates: {
      latitude: string;
      longitude: string;
    };
    timezone: {
      offset: string;
      description: string;
    };
  };
  email: string;
  login: {
    uuid: string;
    username: string;
    password: string;
    salt: string;
    md5: string;
    sha1: string;
    sha256: string;
  };
  dob: {
    date: Date;
    age: number;
  };
  registered: {
    date: Date;
    age: number;
  };
  phone: string;
  cell: string;
  id: {
    name: string;
    value: string;
  };
  picture: {
    large: string;
    medium: string;
    thumbnail: string;
  };
  nat: string;
};
function Toto() {
  const [users, setUsers] = useState<User[]>([]);

  useEffect(() => {
    async function fetchData() {
      const response = await axios.get("https://randomuser.me/api/");
      if (response.status === 200) {
        console.log(response.data);

        setUsers(response.data);
      }
    }

    fetchData();
  }, []);

  return (
    <>
      <h1>Random User</h1>
      {/* 
      {users.map((user) => (
        <article key={user.email} className="card">
          <img src={user.picture.medium} alt="" />
          <h2>
            {user.name.title} {user.name.first} {user.name.last}
          </h2>
          <p>{user.email}</p>
          <button type="button">+ / -</button>
        </article>
      ))} */}
    </>
  );
}

export default Toto;
