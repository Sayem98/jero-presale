import React from "react";
import InnerChart from "./InnerChart";

export default function NetworkOverview(props) {
  return (
    <div className="grid select-none grid-cols-2 md:grid-cols-3 grid-rows-2 gap-4">
      <div className="max-w-xs rounded-xl bg-[#fc8c00] p-3 overflow-hidden shadow-lg">
        <div className="text-xs lg:text-sm font-medium tracking-wider text-white mb-2">
          Current APY
        </div>
        <p className="text-white font-bold text-xl">182.5%</p>
      </div>
      <div className="max-w-full md:col-span-2 rounded-xl border-2 bg-white border-[#d3ccf3] p-3 overflow-hidden shadow-lg bg-transparent">
        <div className="text-xs lg:text-sm text-yellow-700 font-medium tracking-wider">
          Total Stake JERO
        </div>
        {/* <p className="text-yellow-700 font-bold text-xl">$3 533 006</p> */}
        <p className="text-yellow-700 font-bold text-xl">{props.totalbusiness} </p>
        {/* <p className="text-gray-600 font-bold text-xs">38 851 147 SMC</p> */}
      </div>
      <div className="max-w-xs rounded-xl bg-white p-3 overflow-hidden grid grid-cols-1 md:grid-cols-2 shadow-lg">
        <div>
          <div className="text-xs lg:text-sm font-medium tracking-wider text-yellow-700 mb-2">
            MY STAKED JERO
          </div>
          <p className="text-yellow-700 font-bold text-xl">
            {props.totalStakes}
          </p>
        </div>
        <InnerChart />
      </div>
      <div className="max-w-full md:col-span-2 rounded-xl bg-white p-3 overflow-hidden shadow-lg bg-transparent border-2">
        <div className="text-xs lg:text-sm text-yellow-700 font-medium tracking-wider">
          My JERO Rewards
        </div>
        <p className="text-yellow-700 font-bold text-xl">{props.totalReward}</p>
        {/* <p className="text-gray-600 font-bold text-xs">$186 188</p> */}
      </div>
    </div>
  );
}
