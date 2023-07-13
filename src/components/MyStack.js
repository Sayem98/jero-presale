import React, { useRef, useState } from "react";
import Web3 from "web3";
import "../App.css";
import {
  InvestABI,
  InvestAddress,
  stakeToken_address,
  stakeABI,
  rewardToken_address,
} from "./config";

export default function MyStack(props) {
  const [depositAmount, setDepositAmount] = useState(0);
  const [referral, setReferral] = useState("0");
  const [investment, setInvestment] = useState(0);
  console.log("Console val", depositAmount);

  const CHAIN_ID = "0x38";

  async function Max() {
    if (props.isWalletConnected) {
      try {
        let web3;
        // Get network provider and web3 instance.
        if (window.ethereum) {
          web3 = new Web3(window.ethereum);
          const id = await window.ethereum.request({ method: "eth_chainId" });
          console.log("id from async func is: " + id);
          if (CHAIN_ID != id.toString()) {
            alert("please change your network to Ropsten");
            return;
          }
        } else {
          alert(
            "its look like you dont have metmask extension installed in you browser"
          );
          return;
        }

        // Use web3 to get the user's accounts.
        const accounts = await web3.eth.getAccounts();

        // Get the contract instance.
        const networkId = await web3.eth.net.getId();
        // const tokenContract = tokenContractAddress;
        //const investContract = InvestAddress;

        const contract = new web3.eth.Contract(stakeABI, stakeToken_address);

        let balance = await contract.methods.balanceOf(accounts[0]).call();
        if (balance == 0) {
          alert("you dont have SMC tokens to stake ");
        } else {
          balance = balance / 10 ** 8;
          setInvestment(balance);
        }
      } catch (error) {
        // Catch any errors for any of the above operations.
        alert(
          `Failed to load web3, accounts, or contract. Check console for details.`
        );
        console.error(error);
      }
    } else {
      alert("kindly connect your wallet");
    }
  }

  async function stake(investment) {
    console.log(investment + " minstak" + props.minStake);
    if (props.isWalletConnected) {
      const noReferral = "0x0000000000000000000000000000000000000000";
      if (investment > 0) {
        try {
          let web3;
          // Get network provider and web3 instance.
          if (window.ethereum) {
            web3 = new Web3(window.ethereum);
            const id = await window.ethereum.request({ method: "eth_chainId" });
            console.log(
              "id from async func is: " + CHAIN_ID + "hello" + id.toString()
            );
            console.log("my bal: " + props.balance);

            if (Number(props.balance) < investment) {
              alert("you dont have enough balance to stake");
              return;
            } else if (CHAIN_ID != id.toString()) {
              console.log("done");
              alert("please change your network to Ropsten");
              return;
            } else if (investment < Number(props.minStake)) {
              alert("you can't stake less than " + props.minStake);
              return;
            } else if (investment > Number(props.maxStake)) {
              alert("you can't stake more than " + props.maxStake);
              return;
            }
          } else {
            alert(
              "its look like you dont have metmask extension installed in you browser"
            );
            return;
          }

          // Use web3 to get the user's accounts.
          const accounts = await web3.eth.getAccounts();

          // Get the contract instance.
          const networkId = await web3.eth.net.getId();
          // const tokenContract = tokenContractAddress;
          //const investContract = InvestAddress;
          console.log("its prop" + props.referral);
          const temp = investment * 10 ** 8;
          if(props.ref_from!=noReferral) {
            console.log("with referral");
            const contractStake = new web3.eth.Contract(
              stakeABI,
              stakeToken_address
            );

            let balance = await contractStake.methods
              .approve(InvestAddress, temp)
              .send({ from: accounts[0] });
            const contract = new web3.eth.Contract(InvestABI, InvestAddress);
            const result = await contract.methods
              .Stake(investment, props.ref_from)
              .send({ from: accounts[0] });
            if (result) {
              window.location.reload();
            }
          }
          else if (props.referral == "0") {
            console.log("without referral");

            const contract = new web3.eth.Contract(InvestABI, InvestAddress);
            const contractStake = new web3.eth.Contract(
              stakeABI,
              stakeToken_address
            );

            let balance = await contractStake.methods
              .approve(InvestAddress, temp)
              .send({ from: accounts[0] });
            const result = await contract.methods
              .Stake(investment, noReferral)
              .send({ from: accounts[0] });
            if (result) {
              window.location.reload();
            }
          } else {
            console.log("with referral");
            const contractStake = new web3.eth.Contract(
              stakeABI,
              stakeToken_address
            );

            let balance = await contractStake.methods
              .approve(InvestAddress, temp)
              .send({ from: accounts[0] });
            const contract = new web3.eth.Contract(InvestABI, InvestAddress);
            const result = await contract.methods
              .Stake(investment, props.referral)
              .send({ from: accounts[0] });
            if (result) {
              window.location.reload();
            }
          }
        } catch (error) {
          // Catch any errors for any of the above operations.
          alert(
            `Failed to load web3, accounts, or contract. Check console for details.`
          );
          console.error(error);
        }
      } else if (investment <= 0 || investment == "") {
        alert("please write amount ");
      }
    } else {
      alert("kindly connect your wallet");
    }
  }
  // window.ethereum.on('chainChanged', hello);
  // window.ethereum.on('accountsChanged', hello )

  function hello() {
    window.location.reload();
  }

  async function WithdrawReward() {
    if (props.isWalletConnected) {
      try {
        let web3;
        // Get network provider and web3 instance.
        if (window.ethereum) {
          web3 = new Web3(window.ethereum);
          const id = await window.ethereum.request({ method: "eth_chainId" });
          console.log("id from async func is: " + id);
          if (CHAIN_ID != id.toString()) {
            alert("please change your network to Ropsten");
            return;
          }
        } else {
          alert(
            "its look like you dont have metmask extension installed in you browser"
          );
          return;
        }

        // Use web3 to get the user's accounts.
        const accounts = await web3.eth.getAccounts();

        // Get the contract instance.
        const networkId = await web3.eth.net.getId();
        // const tokenContract = tokenContractAddress;
        //const investContract = InvestAddress;

        const contract = new web3.eth.Contract(InvestABI, InvestAddress);

        const result = await contract.methods
          .withdrawReward()
          .send({ from: accounts[0] });
        if (result) {
          window.location.reload();
        }
      } catch (error) {
        // Catch any errors for any of the above operations.
        alert(
          `Failed to load web3, accounts, or contract. Check console for details.`
        );
        console.error(error);
      }
    } else {
      alert("kindly connect your wallet");
    }
  }

  async function unStake() {
    if (props.isWalletConnected) {
      try {
        let web3;
        // Get network provider and web3 instance.
        if (window.ethereum) {
          web3 = new Web3(window.ethereum);
          const id = await window.ethereum.request({ method: "eth_chainId" });
          console.log("id from async func is: " + id);
          if (CHAIN_ID != id.toString()) {
            alert("please change your network to mumbai");
            return;
          }
        } else {
          alert(
            "its look like you dont have metmask extension installed in you browser"
          );
          return;
        }
        if (props.totalInvestment == 0) {
          alert("you dont have staked tokens");
          return;
        }

        // Use web3 to get the user's accounts.
        const accounts = await web3.eth.getAccounts();

        // Get the contract instance.
        const networkId = await web3.eth.net.getId();
        // const tokenContract = tokenContractAddress;
        //const investContract = InvestAddress;

        const contract = new web3.eth.Contract(InvestABI, InvestAddress);

        const result = await contract.methods
          .unStake()
          .send({ from: accounts[0] });
        if (result) {
          window.location.reload();
        }
      } catch (error) {
        // Catch any errors for any of the above operations.
        alert(
          `Failed to load web3, accounts, or contract. Check console for details.`
        );
        console.error(error);
      }
    } else {
      alert("kindly connect your wallet");
    }
  }

  return (
    <div className="grid grid-cols-1 select-none lg:grid-cols-3 lg:gap-4">
      <div className="max-w-full rounded-xl mb-4 bg-white p-3 overflow-hidden shadow-lg bg-transparent border-2">
        <div className=" text-md font-bold tracking-wider text-center text-yellow-700 mt-2 mb-6">
          Stake JERO
        </div>
        <form>
          <div className="flex justify-between">
            <label className="text-xs font-medium  text-yellow-700">
              Stake JERO
            </label>
            <label className="text-xs font-medium  text-yellow-700">
              Available for Stake:{props.balance}
            </label>
          </div>
          <div className="mt-1 flex rounded-md hover:border-white border-0 bg-gray-50 shadow-sm">
            <input
              type="number"
              name="company-website"
              id="company-website"
              value={investment}
              onChange={(e) => setInvestment(e.target.value)}
              className=" bg-gray-50 focus:ring-white flex-1 block w-full rounded-md border-0 sm:text-sm p-1 "
              placeholder="0"
              min="10000"
              max="5000000"
            />
            <span className="inline-flex items-center px-1 rounded-l-md border-0 bg-gray-50 text-gray-500 text-xs">
              SMC
            </span>
            <button
              type="button"
              className="glass-btn"
              onClick={Max}
            >
              Max
            </button>
          </div>
          <div className=" mt-4 w-full">
            <div className="flex justify-between">
              <button
                type="button"
                className="bg-red-500 w-half  text-center rounded-md mb-4 mt-2 p-2 text-sm font-medium text-white"
                onClick={() => {
                  unStake();
                }}
              >
                Unstake
              </button>
              <button
                type="button"
                className="bg-[#fc8c00] w-half text-center rounded-md mb-4 mt-2 p-2 text-sm font-medium text-white"
                onClick={() => {
                  stake(investment);
                }}
              >
                Stake
              </button>
              
            </div>
            <div className="flex justify-between">
              
              <p className="text-xs font-medium  text-yellow-700 mb-2">
                Available for UnStake: {props.totlaInvestment}
              </p>
            </div>
            <div>
              <label className="text-xs font-medium  text-yellow-700">
                JERO Reward
              </label>
            </div>
            <div className="mt-1 flex rounded-md hover:border-white border-0 mb-4 bg-gray-50 shadow-sm">
              <input
                type="number"
                name="company-website"
                id="company-website"
                className=" bg-gray-50 p-1 focus:ring-white flex-1 block w-full rounded-md border-0 sm:text-sm "
                placeholder="null"
                value={props.totalReward}
                readOnly
              />
              <span className="inline-flex items-center px-1 rounded-l-md border-0 bg-gray-50 text-gray-500 text-xs">
                JERO
              </span>
              <button
                type="button"
                className="inline-flex items-center p-1 px-4 rounded-md border-2 m-2 border-yellow-700 bg-gray-50 text-yellow-700 text-xs"
                onClick={() => {
                  WithdrawReward();
                }}
              >
                Claim
              </button>
            </div>
          </div>
        </form>
      </div>
      <div className="max-w-full col-span-2 mb-4 rounded-xl border-0 p-3 bg-white overflow-hidden shadow-lg">
        <div className=" text-md font-bold tracking-wider text-yellow-700 mb-2">
          Staking Calculator
        </div>
        <form>
          <div className="flex justify-between mt-4">
            <div className="max-w-xs overflow-hidden">
              <div className=" text-xs font-medium tracking-wider text-yellow-700">
                Minimum Staking Limit
              </div>
              <p className="text-yellow-700 font-bold text-xl">
                {depositAmount == 0 ? "10,000" : depositAmount * 10000}
              </p>
            </div>
            <div className="max-w-xs overflow-hidden">
              <div className=" text-xs font-medium tracking-wider text-yellow-700">
                Yearly Return
              </div>
              <p className="text-yellow-700 font-bold text-xl">+182.5%</p>
            </div>
          </div>
          <input
            type="range"
            className="text-blue-900 slider mt-6 mx-2"
            id="depositAmount"
            min={0}
            max={100}
            step={2}
            value={depositAmount}
            onChange={(event) => setDepositAmount(event.target.value)}
          />
          <div className="grid grid-cols-3 mt-6">
            <div className="max-w-xs overflow-hidden border-r-2">
              <div className=" text-xs font-medium tracking-wider text-center text-yellow-700">
                Daily
              </div>
              <p className="text-yellow-700 text-center font-bold text-sm lg:text-xl mb-1">
                {/* {(depositAmount / 365).toFixed(2)} SMC */}
                {/* {depositAmount==} */}
                {depositAmount == 0 ? "0.5 JERO" : depositAmount * 0.5}{" "}
                {depositAmount == 0 ? "" : "JERO"}
              </p>
              <div className="text-xs lg:text-sm font-bold tracking-wider text-center text-yellow-700">
                {/* $0 */}
              </div>
            </div>
            <div className="max-w-xs overflow-hidden  border-r-2">
              <div className=" text-xs font-medium tracking-wider text-center text-yellow-700">
                Monthly
              </div>
              <p className="text-yellow-700 text-center font-bold text-sm lg:text-xl mb-1">
                {/* {((depositAmount / 12) * 0.16).toFixed(2)} SMC */}
                {/* {depositAmount * 15}  */}
                {depositAmount == 0 ? "15 JERO" : depositAmount * 15}{" "}
                {depositAmount == 0 ? "" : "JERO"}
              </p>
              <div className=" text-xs lg:text-sm font-bold tracking-wider text-center text-yellow-700">
                {/* $0.01 */}
              </div>
            </div>
            <div className="max-w-xs overflow-hidden">
              <div className=" text-xs font-medium tracking-wider text-center text-yellow-700">
                Yearly
              </div>
              <p className="text-yellow-700 text-center font-bold text-sm lg:text-xl mb-1">
                {/* {(depositAmount * 1.99).toFixed(2)} SMC */}
                {/* {depositAmount * 180} JERO */}
                {depositAmount == 0 ? "180 JERO" : depositAmount * 180}{" "}
                {depositAmount == 0 ? "" : "JERO"}
              </p>
              <div className=" text-xs lg:text-sm font-bold tracking-wider text-center text-yellow-700">
                {/* $0.18 */}
              </div>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}
