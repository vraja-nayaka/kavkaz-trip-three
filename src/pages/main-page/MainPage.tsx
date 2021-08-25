import React from "react";
import { useHistory } from "react-router-dom";
import { routeNames } from "../../routes";
import { Phone } from "./phone";

const MainPage: React.FC = () => {
  const history = useHistory();

  return (
    <>
      <div className="container">
        <h1>Возьми байк</h1>
        <p>
          Присоединяйся к незабываемой велопрогулке по вечерним горам Кавказа!
        </p>
        <button type="button" onClick={() => history.push(routeNames.trip)}>
          Поехали
        </button>
      </div>
      <Phone />
    </>
  );
};

export { MainPage };
