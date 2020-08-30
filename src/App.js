import React, { useState, useEffect } from "react";

import api from "./services/api";

import "./styles.css";

function App() {
  const [repositories, setRepositories] = useState([]);
  const [repository, setRepository] = useState({
    title: "Teste reactjs",
    url: "http://das;dsdas/qwe",
    techs: ["NodeJS", "ReactJS"],
  });
  const [refresh, setRefresh] = useState(false);

  useEffect(() => {
    setRefresh(true);
  }, []);

  useEffect(() => {
    api.get("/repositories").then((res) => {
      setRepositories(res.data);
    });
  }, [refresh]);

  async function handleAddRepository() {
    try {
      const res = await api.post("/repositories", repository);

      if (res.status === 200) {
        setRefresh(!refresh);
      }
    } catch (err) {
      console.log("erro", err);
    }
  }

  const handleLikeRepository = async (id) => {
    const res = await api.post(`/repositories/${id}/like`);

    if (res.status === 200) {
      setRefresh(!refresh);
    }
  };

  async function handleRemoveRepository(id) {
    const res = await api.delete(`/repositories/${id}`);

    if (res.status === 204) {
      setRefresh(!refresh);
    }
  }

  return (
    <div>
      <ul data-testid="repository-list">
        {repositories.map((repository, index) => {
          console.log(repository, index);
          return (
            <li key={repository.id}>
              {repository.title} - {repository.likes}
              <button onClick={() => handleLikeRepository(repository.id)}>
                Curtir
              </button>
              <button
                onClick={() => handleRemoveRepository(repository.id, index)}
              >
                Remover
              </button>
            </li>
          );
        })}
      </ul>

      <button onClick={handleAddRepository}>Adicionar</button>
    </div>
  );
}

export default App;
