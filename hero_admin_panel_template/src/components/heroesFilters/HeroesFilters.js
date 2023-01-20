// Задача для этого компонента:
// Фильтры должны формироваться на основании загруженных данных
// Фильтры должны отображать только нужных героев при выборе
// Активный фильтр имеет класс active
// Изменять json-файл для удобства МОЖНО!
// Представьте, что вы попросили бэкенд-разработчика об этом

import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { setFilter, heroesFetchingError, fetchFilter } from "../../actions";
import { useHttp } from "../../hooks/http.hook";
import classNames from "classnames";

const HeroesFilters = () => {
  const { request } = useHttp();
  const { activeFilter } = useSelector((state) => state);

  useEffect(() => {
    request(`http://localhost:3001/filters`)
      .then((data) => dispatch(fetchFilter(data)))
      .catch(() => dispatch(heroesFetchingError()));
  }, []);

  const { filters } = useSelector((state) => state);
  const dispatch = useDispatch();

  const onFilter = (e, name) => {
    e.preventDefault();
    request("http://localhost:3001/heroes")
      .then(dispatch(setFilter(name)))
      .catch(() => dispatch(heroesFetchingError()));
  };

  return (
    <div className="card shadow-lg mt-4">
      <div className="card-body">
        <p className="card-text">Отфильтруйте героев по элементам</p>
        <div className="btn-group">
          {filters.map((el, i) => (
            <Btn
              onFilter={(e) => onFilter(e, el)}
              name={el}
              key={i}
              activeFilter={activeFilter}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default HeroesFilters;

const setClassName = (element) => {
  switch (element) {
    case "all":
      return "outline-dark";
    case "fire":
      return "danger";
    case "water":
      return "primary";
    case "wind":
      return "success";
    case "earth":
      return "secondary";
    default:
      return "outline-dark";
  }
};

const Btn = ({ name, onFilter, activeFilter }) => {
  return (
    <button
      onClick={onFilter}
      className={classNames(`btn btn-${setClassName(name)}`, {
        active: activeFilter,
      })}
    >
      {name}
    </button>
  );
};
