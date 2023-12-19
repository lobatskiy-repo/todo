import React, { useEffect } from "react";
import { TodosContainer } from "../todos";

import "./styles.css";
import { collection, onSnapshot } from "firebase/firestore";
import { useDispatch } from "react-redux";
import { addTodos } from "../../store/action";
import { db } from "../../utils/firebase";
export const App = () => {
  const dispatch = useDispatch();

  //@ts-ignore
  onSnapshot(collection(db, "todos"), (snapshot) => {
    const listData = snapshot.docs.map((doc) => doc.data());
    console.log("listData", listData);

    dispatch(addTodos(listData));
  });

  return (
    <div className="wrap_Todo">
      <TodosContainer />
    </div>
  );
};
