import React from "react";
import {  StyleLoading } from "./style";
import { useLoading } from "contexts/LoadingContext";
import loading from 'assets/images/loading2.gif'  

export default function CustomLoading() {
  const { isLoading } = useLoading();
  return (
    <>
      {isLoading && (
        <StyleLoading>
          <img src={loading} alt="img loading"/>
        </StyleLoading>
      )}
    </>
  );
}
