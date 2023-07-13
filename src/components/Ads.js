import React from "react";

export default function Ads() {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 bg-yellow-50 mb-6 p-4 rounded-xl">
      <div className="max-w-full overflow-hidden">
        <div className="text-3xl text-yellow-700 select-none font-bold tracking-wider mb-2">
          Stake JERO, Earn JERO
        </div>
        <p className="text-yellow-700 font-medium select-none mb-4 text-xs">
          You can now Stake Your JERO tokens and Earn JERO rewards
        </p>
      </div>
      <div className="scroll-smooth flex snap snap-x">
        <div className="snap-center flex mr-4">
          <img
            src="./va.png"
            alt="img"
            className="max-w-full flex h-24 rounded-lg"
          />
        </div>
        <div className="snap-center flex">
          <img src="./v.png" alt="img" className="max-w-full h-24 rounded-lg" />
        </div>
      </div>
    </div>
  );
}
