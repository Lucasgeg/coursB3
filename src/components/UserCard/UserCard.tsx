import { useState } from "react";
import { User } from "../../ApiResponseType";
import "./UserCard.css";

const UserCard = ({ user }: { user: User }) => {
  const [moreInfo, setMoreInfo] = useState(false);

  const handleButtonHandler = () => {
    setMoreInfo((prevState) => !prevState);
  };

  return (
    <div className="user-card">
      <img
        src={user.picture.large}
        alt={`${user.name.first} ${user.name.last}`}
      />
      <div className="name">
        <dl>
          <dt>Name:</dt>
          <dd>
            {user.name.title} {user.name.first} {user.name.last}
          </dd>
        </dl>
      </div>
      <div className="email">
        <dl>
          <dt>Email :</dt>
          <dd>{user.email}</dd>
        </dl>
      </div>
      <button className="button" onClick={handleButtonHandler}>
        {moreInfo ? "-" : "+"}
      </button>
      {moreInfo && (
        <>
          <div className="adress">
            <dl>
              <dt>Adress:</dt>
              <dd>
                {user.location.city} {user.location.street.number}{" "}
                {user.location.street.name}
              </dd>
            </dl>
          </div>
          <div className="phone">
            <dl>
              <dt>Phone:</dt>
              <dd>{user.cell}</dd>
            </dl>
          </div>
        </>
      )}
    </div>
  );
};

export default UserCard;
