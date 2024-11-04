import { ApiResponse } from "./ApiResponseType";
import "./App.css";
import UserCard from "./components/UserCard/UserCard";
import { useFetch } from "./hooks/useFecth";

function App() {
  const { results, loading, error } = useFetch<ApiResponse>({
    url: "https://randomuser.me/api/?results=10",
  });

  if (loading) {
    return (
      <span>Loading</span>
      // <div className="loader-container">
      //   <div className="loader"></div>
      // </div>
    );
  }

  if (error) {
    return <div className="">An error has occured: {error}</div>;
  }

  return (
    <>
      <main className="user-grid">
        {results?.results.map((user) => (
          <UserCard key={user.login.uuid} user={user} />
        ))}
      </main>
    </>
  );
}

export default App;
