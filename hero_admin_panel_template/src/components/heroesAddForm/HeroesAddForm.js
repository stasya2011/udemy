// Задача для этого компонента:
// Реализовать создание нового героя с введенными данными. Он должен попадать
// в общее состояние и отображаться в списке + фильтроваться
// Уникальный идентификатор персонажа можно сгенерировать через uiid
// Усложненная задача:
// Персонаж создается и в файле json при помощи метода POST
// Дополнительно:
// Элементы <option></option> желательно сформировать на базе
// данных из фильтров

import { v4 as uuidv4 } from "uuid";
import { useRef, useEffect } from "react";
import { useDispatch } from "react-redux";
import { useHttp } from "../../hooks/http.hook";
import { heroAdd, heroesFetchingError } from "../../actions";

const HeroesAddForm = () => {
  const nameRef = useRef();
  const descriptionRef = useRef();
  const elementRef = useRef();
  const { request } = useHttp();
  const dispatch = useDispatch();

  const collectDataForm = (e) => {
    e.preventDefault();

    if (
      nameRef.current.value.trim() === "" ||
      descriptionRef.current.value.trim() === ""
    )
      return;

    const obj = {
      name: nameRef.current.value,
      description: descriptionRef.current.value,
      element: elementRef.current.value,
      id: uuidv4(),
    };

    request("http://localhost:3001/heroes", "POST", JSON.stringify(obj))
      .then(dispatch(heroAdd(obj)))
      .catch(() => dispatch(heroesFetchingError()));

    nameRef.current.value = "";
    descriptionRef.current.value = "";
    elementRef.current.value = "Я владею элементом...";
  };

  return (
    <form className="border p-4 shadow-lg rounded">
      <div className="mb-3">
        <label htmlFor="name" className="form-label fs-4">
          Имя нового героя
        </label>
        <input
          ref={nameRef}
          required
          type="text"
          name="name"
          className="form-control"
          id="name"
          placeholder="Как меня зовут?"
        />
      </div>

      <div className="mb-3">
        <label htmlFor="text" className="form-label fs-4">
          Описание
        </label>
        <textarea
          ref={descriptionRef}
          required
          name="text"
          className="form-control"
          id="text"
          placeholder="Что я умею?"
          style={{ height: "130px" }}
        />
      </div>

      <div className="mb-3">
        <label htmlFor="element" className="form-label">
          Выбрать элемент героя
        </label>
        <select
          ref={elementRef}
          required
          className="form-select"
          id="element"
          name="element"
        >
          <option>Я владею элементом...</option>
          <option value="fire">Огонь</option>
          <option value="water">Вода</option>
          <option value="wind">Ветер</option>
          <option value="earth">Земля</option>
        </select>
      </div>

      <button
        type="submit"
        onClick={(e) => collectDataForm(e)}
        className="btn btn-primary"
      >
        Создать
      </button>
    </form>
  );
};

export default HeroesAddForm;
