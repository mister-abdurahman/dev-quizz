import React from "react";
import reactLogo from "../assets/react.svg";

export default function Header() {
  return (
    <div className="flex gap-4">
      <img src={reactLogo} alt="react logo" className="block w-20 h-20" />
      <h1 className="font-primary text-7xl font-bold text-white">
        The Dev. Quiz{" "}
      </h1>
    </div>
  );
}
