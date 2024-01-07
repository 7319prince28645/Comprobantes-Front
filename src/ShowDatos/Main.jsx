import React from "react";
import { useContext } from "react";
import { ApiContext } from "../Service/GetApi";
import {SpinnerComponent }from "./Skeleton";
import Instruccion from "../Instruction/Instruccion";
import HeaderShow from './HeaderShow'
function Main() {
    const { data, loading, error } = useContext(ApiContext);
  return (
    <div className="px-8">
      {data.length === 0 && loading === false && <Instruccion />}
      {loading ? (
        <SpinnerComponent />
      ) : (
        data && data.length > 0 && <HeaderShow />
      )}
      {error && (
        <div className="bg-red-500 text-white p-3 rounded-md">{error}</div>
      )}
    </div>
  );
}

export default Main;
