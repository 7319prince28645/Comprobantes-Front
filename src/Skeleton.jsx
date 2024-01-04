"use client";
import { Spinner } from "keep-react";

export const SpinnerComponent = () => {
  return (
    <div className="flex justify-center items-center">
      <Spinner color="info" size="xl" />
    </div>
  );
}