import React, { Fragment } from "react";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Menu, Transition } from "@headlessui/react";
import {
  LinkIcon,
  TemplateIcon,
  ClipboardCheckIcon,
  ChipIcon,
  SwitchHorizontalIcon,
  CogIcon,
  QuestionMarkCircleIcon,
  CubeTransparentIcon,
  HomeIcon,
} from "@heroicons/react/outline";
import { useLocation } from "react-router-dom";
import { ViewGridIcon } from "@heroicons/react/solid";
import NetworkOverview from "./NetworkOverview";
import MyStack from "./MyStack";
import Ads from "./Ads";
import Referral from "./Referral";
import Web3 from "web3";
import {
  InvestABI,
  InvestAddress,
  stakeToken_address,
  stakeABI,
} from "./config";

const solutions = [
  {
    name: "Nft Marketplace",
    href: "/ComingSoon",
    icon: CogIcon,
  },
  { name: "SMCPAD", href: "/ComingSoon", icon: TemplateIcon },
];
const ab = [
  {
    name: "Staking",
    href: "/ComingSoon",
    icon: CubeTransparentIcon,
  }
];
const sortOptions = [
  { name: "Sign In", href: "/ComingSoon", current: true },
  { name: "Register", href: "/ComingSoon", current: false },
];
const home = [
  {
    name: "Home",
    href: "https://smartmoneycoin.net/",
    current: false,
    icon: HomeIcon,
  },
];
const exchange = [
  {
    name: "Exchange",
    href: "https://smartmoneycoin.net/presale/",
    current: false,
    icon: SwitchHorizontalIcon,
  },
];
function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

export default function Nav() {
  const [_address, setAddress] = useState(null);
  const [isWalletConnected, setisWalletConnected] = useState(false);
  const [IDs, setNetworkID] = useState(false);

  const [totlaInvestment, setTotalInvestment] = useState(0);
  const [totalReward, setwithrawableAmount] = useState("0");
  const [ref_data, set_Ref_data] = useState("0");
  const [ref_data1, set_Ref_data1] = useState("0");
  const [balance, setBalance] = useState(0);


  const [totalbusiness, setbusiness] = useState("0");
  const [minStake, setminStake] = useState("0");
  const [maxStake, setmaxStake] = useState("0");

  const [totalReferrals, settotalReferrals] = useState(0);
  const [referral, setReferral] = useState("0");
  const [ref_from, set_ref_from] = useState("0");

  const [user, setUser] = useState("Connect your wallet");
  const CHAIN_ID = "56";
  const CHAIN_ID1 = "0x38";

  async function connectWallet() {
    if (!window.ethereum) {
      alert(
        "it looks like that you dont have metamask installed,please install"
      );
      return;
    }

    try {
      const accounts = await window.ethereum.request({
        method: "eth_requestAccounts",
      });
      const networkId = await window.ethereum.request({
        method: "net_version",
      });
      setNetworkID(networkId);

      // console.log(IDs)
      if (networkId == CHAIN_ID) {
        setisWalletConnected(true);

        setAddress(window.ethereum.selectedAddress);
      } else {
        window.ethereum.request({
          method: "wallet_switchEthereumChain",
          params: [{ chainId: CHAIN_ID1 }],
        });
      }
    } catch (err) {
      alert("Something went wrong.");
    }
  }

  useEffect(() => {
    connectWallet();
    mount();
  }, []);

  const search = useLocation().search;
  const id = new URLSearchParams(search).get("ref");

  async function mount() {
    try {
      // Get network provider and web3 instance.
      const web3 = new Web3(window.ethereum);

      // Use web3 to get the user's accounts.
      const accounts = await web3.eth.getAccounts();

      // Get the contract instance.
      const networkId = await web3.eth.net.getId();
      // const tokenContract = tokenContractAddress;
      //const investContract = InvestAddress;

      const contract = new web3.eth.Contract(InvestABI, InvestAddress);
      let totalReward = await contract.methods
        .getReward()
        .call({ from: accounts[0].toString() });
      var ref_data = await contract.methods
        .referralLevel_earning()
        .call({ from: accounts[0].toString() });
      let min_stake =await contract.methods.min_Stake_amount().call();
      let max_stake =await contract.methods.max_Stake_amount().call();

      const ref_data1 = await contract.methods
        .referralLevel_count()
        .call({ from: accounts[0].toString() });
      const contract1 = new web3.eth.Contract(stakeABI, stakeToken_address);
      // ref_data=web3.utils.fromWei(ref_data,"ether");

      let balance = await contract1.methods.balanceOf(accounts[0]).call();
      // for(let i=0;i<20;i++)
      // {

      // }

      const ref_from = await contract.methods
        .DUSDinvestor(accounts[0].toString())
        .call();

      const totalStakes = await contract.methods.totalDUSDInvestors().call(); //get stake
      const totalInvest = await contract.methods
        .getTotalInvestmentDUSD()
        .call({ from: accounts[0].toString() });
        



        const business = await contract.methods
        .totalbusiness()
        .call({ from: accounts[0].toString() });
      const totalReferral = await contract.methods
        .DUSDTotalReferrals()
        .call({ from: accounts[0].toString() });
      balance = balance/10**8;
      totalReward = web3.utils.fromWei(totalReward, "ether");

      if (id != null) {
        setReferral(id);
      }

      setTotalInvestment(totalInvest);
      setwithrawableAmount(totalReward);
      setminStake(min_stake);
      setmaxStake(max_stake)

      setBalance(balance);
      setisWalletConnected(true);
      setAddress(window.ethereum.selectedAddress);
      setbusiness(business);
      settotalReferrals(totalReferral);
      set_Ref_data(ref_data);
      set_Ref_data1(ref_data1);
      set_ref_from(ref_from[0]);
      setUser(accounts[0]);
      // Set web3, accounts, and contract to the state, and then proceed with an
      // example of interacting with the contract's methods.
      //this.setState({ web3, accounts, contract: instance }, this.runExample);
    } catch (error) {
      // Catch any errors for any of the above operations.
      console.log('error')
    }
  }

  async function stake(investment) {
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
          if (CHAIN_ID != id.toString()) {
            console.log("done");
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

        if (referral == "0") {
          const contract = new web3.eth.Contract(InvestABI, InvestAddress);
          const result = await contract.methods
            .Stake(investment, 12, noReferral)
            .send({ from: accounts[0] });
          if (result) {
            alert("Your investment is successfully done");
            mount();
          }
        } else {
          const contract = new web3.eth.Contract(InvestABI, InvestAddress);
          const result = await contract.methods
            .Stake(investment, referral)
            .send({ from: accounts[0] });
          if (result) {
            alert("Your investment is successfully done");
            mount();
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
  }
  window.ethereum.on("chainChanged", hello);
  window.ethereum.on("accountsChanged", hello);

  function hello() {
    window.location.reload();
  }

  async function WithdrawReward() {
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
        alert("your investment is successfully done");
        mount();
      }
    } catch (error) {
      // Catch any errors for any of the above operations.
      alert(
        `Failed to load web3, accounts, or contract. Check console for details.`
      );
      console.error(error);
    }
  }

  return (
    <div className="container">
      <div>
        <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="relative z-10 flex items-baseline justify-between pt-2 pb-6 border-b border-gray-200">
            <a href="https://smartmoneycoin.net/" target="_blank">
              <img className="h-16 -mb-8 w-full" src="./jero.png" alt="" />
            </a>
            <div className="flex items-center">
              <Menu as="div" className="relative inline-block text-left">
                {({ open }) => (
                  <>
                    <div className="bg-[#fc8c00] rounded-xl p-2 px-4">
                      <Menu.Button
                        className="group inline-flex justify-center text-sm font-medium text-white"
                        onClick={connectWallet}
                      >
                        {!_address ? "Connect Wallet" : _address.slice(0, 10)}
                        <LinkIcon
                          className="flex-shrink-0 -mr-1 ml-1 h-5 w-5 text-white"
                          aria-hidden="true"
                        />
                      </Menu.Button>
                    </div>
                    
                  </>
                )}
              </Menu>
              <Menu as="div" className="relative inline-block text-left">
                {({ open }) => (
                  <>
                    <Menu.Button className="p-2 -m-2 ml-4 sm:ml-6 text-white hover:text-white lg:hidden">
                      <ViewGridIcon className="w-5 h-5" aria-hidden="true" />
                    </Menu.Button>
                    {open && (
                      <Transition
                        as={Fragment}
                        enter="transition ease-out duration-100"
                        enterFrom="transform opacity-0 scale-95"
                        enterTo="transform opacity-100 scale-100"
                        leave="transition ease-in duration-75"
                        leaveFrom="transform opacity-100 scale-100"
                        leaveTo="transform opacity-0 scale-95"
                      >
                        <Menu.Items className="origin-top-right absolute right-0 mt-4 w-40 rounded-md shadow-2xl bg-white ring-1 ring-black ring-opacity-5 focus:outline-none">
                          <div className="py-1">
                            {home.map((options) => (
                              <Menu.Item key={options.name}>
                                {({ active }) => (
                                  <a
                                    href={options.href}
                                    className={classNames(
                                      options.current
                                        ? "font-medium text-gray-900"
                                        : "text-gray-500",
                                      active ? "bg-gray-100" : "",
                                      "block px-4 py-2 text-sm"
                                    )}
                                  >
                                    {options.name}
                                  </a>
                                )}
                              </Menu.Item>
                            ))}
                            {ab.map((options) => (
                              <Menu.Item key={options.name}>
                                {({ active }) => (
                                  <Link
                                    to={options.href}
                                    className={classNames(
                                      options.current
                                        ? "font-medium text-gray-900"
                                        : "text-gray-500",
                                      active ? "bg-gray-100 " : "",
                                      "block px-4 py-2 text-sm"
                                    )}
                                  >
                                    {options.name}
                                  </Link>
                                )}
                              </Menu.Item>
                            ))}
                          </div>
                        </Menu.Items>
                      </Transition>
                    )}
                  </>
                )}
              </Menu>
            </div>
          </div>

          <section aria-labelledby="products-heading" className="pt-6 pb-24">
            <h2 id="products-heading" className="sr-only">
              Products
            </h2>

            <div className="grid grid-cols-1 lg:grid-cols-4 gap-x-8 gap-y-10">
              {/* SideBar */}
              <div className="hidden lg:block mt-6">
                <nav className="grid  gap-y-8">
                  {home.map((item) => (
                    <a
                      key={item.name}
                      href={item.href}
                      className="-m-3 p-3 flex items-center rounded-md hover:bg-black"
                    >
                      <item.icon
                        className="flex-shrink-0 h-6 w-6 text-[#fc8c00]"
                        aria-hidden="true"
                      />
                      <span className="ml-4 text-base font-medium text-white">
                        {item.name}
                      </span>
                    </a>
                  ))}

                  {ab.map((item) => (
                    <Link
                      key={item.name}
                      to={item.href}
                      className="-m-3 p-3 flex items-center rounded-md hover:bg-black"
                    >
                      <item.icon
                        className="flex-shrink-0 h-6 w-6 text-[#fc8c00]"
                        aria-hidden="true"
                      />
                      <span className="ml-4 text-base font-medium text-white">
                        {item.name}
                      </span>
                    </Link>
                  ))}
                </nav>
              </div>

              {/* Content */}
              <div className="lg:col-span-3">
                <div className="h-full">
                  <Ads />
                  <p className="text-[#dbd6f3] font-bold mb-4 text-xl select-none">
                    Network Overview
                  </p>
                  <NetworkOverview
                    totalStakes={totlaInvestment}
                    totalReward={totalReward}
                    totalbusiness={totalbusiness}
                  />
                  <p className="text-[#dbd6f3] font-bold mt-8 mb-4 text-xl select-none">
                    My Stake
                  </p>
                  <MyStack
                    mount={mount}
                    totalReward={totalReward}
                    referral={referral}
                    isWalletConnected={isWalletConnected}
                    balance={balance}
                    totlaInvestment={totlaInvestment}
                    minStake={minStake}
                    maxStake={maxStake}
                    ref_from={ref_from}
                  />
                  <p className="text-[#dbd6f3] font-bold mt-8 mb-4 text-xl select-none">
                    Referral
                  </p>

                  <Referral
                    referral={user}
                    ref_data={ref_data}
                    ref_data1={ref_data1}
                  />
                </div>
              </div>
            </div>
          </section>
        </main>
      </div>
    </div>
  );
}
