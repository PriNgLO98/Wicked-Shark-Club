import { faqs, roadmaps } from "./data";
import { useEffect, useState } from "react";
import AOS from "aos";
import "aos/dist/aos.css";
import Web3 from "web3";
import Web3Modal from "web3modal";

function Home() {
  AOS.init();
  const [navActive, setNavActive] = useState(false);
  const [sidebarActive, setSidebarActive] = useState(false);
  const [faqIndex, setFaqIndex] = useState();
  const [activeIndex, setActiveIndex] = useState(1);
  // =====================scrill navber fiexd================
  // ===========================menu toggle===============
  const _toggleSidebar = () => {
    setSidebarActive(!sidebarActive);
  };
  console.log(activeIndex);

  // ==========================mint valu ==================
  const [walletConnected, setWalletConnected] = useState(false);

  const [totalMinted, setTotalMinted] = useState(0);
  const [value, setValue] = useState(1);

  // Contract Info
  const CONTRACT_ADDRESS = "0x3a3138E49ac51255eDcB9A3C5cFcf8206160a042";
  const CONTRACT_ABI = [
    { inputs: [], stateMutability: "nonpayable", type: "constructor" },
    {
      anonymous: false,
      inputs: [
        {
          indexed: true,
          internalType: "address",
          name: "owner",
          type: "address",
        },
        {
          indexed: true,
          internalType: "address",
          name: "approved",
          type: "address",
        },
        {
          indexed: true,
          internalType: "uint256",
          name: "tokenId",
          type: "uint256",
        },
      ],
      name: "Approval",
      type: "event",
    },
    {
      anonymous: false,
      inputs: [
        {
          indexed: true,
          internalType: "address",
          name: "owner",
          type: "address",
        },
        {
          indexed: true,
          internalType: "address",
          name: "operator",
          type: "address",
        },
        {
          indexed: false,
          internalType: "bool",
          name: "approved",
          type: "bool",
        },
      ],
      name: "ApprovalForAll",
      type: "event",
    },
    {
      anonymous: false,
      inputs: [
        {
          indexed: true,
          internalType: "address",
          name: "previousOwner",
          type: "address",
        },
        {
          indexed: true,
          internalType: "address",
          name: "newOwner",
          type: "address",
        },
      ],
      name: "OwnershipTransferred",
      type: "event",
    },
    {
      anonymous: false,
      inputs: [
        {
          indexed: true,
          internalType: "address",
          name: "from",
          type: "address",
        },
        { indexed: true, internalType: "address", name: "to", type: "address" },
        {
          indexed: true,
          internalType: "uint256",
          name: "tokenId",
          type: "uint256",
        },
      ],
      name: "Transfer",
      type: "event",
    },
    {
      inputs: [
        { internalType: "address[]", name: "_addrs", type: "address[]" },
      ],
      name: "addArrayToWhiteList",
      outputs: [],
      stateMutability: "nonpayable",
      type: "function",
    },
    {
      inputs: [{ internalType: "address", name: "_addr", type: "address" }],
      name: "addToWhiteList",
      outputs: [],
      stateMutability: "nonpayable",
      type: "function",
    },
    {
      inputs: [{ internalType: "address", name: "", type: "address" }],
      name: "addressMintedBalance",
      outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
      stateMutability: "view",
      type: "function",
    },
    {
      inputs: [
        { internalType: "address", name: "to", type: "address" },
        { internalType: "uint256", name: "tokenId", type: "uint256" },
      ],
      name: "approve",
      outputs: [],
      stateMutability: "nonpayable",
      type: "function",
    },
    {
      inputs: [{ internalType: "address", name: "owner", type: "address" }],
      name: "balanceOf",
      outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
      stateMutability: "view",
      type: "function",
    },
    {
      inputs: [{ internalType: "uint256", name: "tokenId", type: "uint256" }],
      name: "getApproved",
      outputs: [{ internalType: "address", name: "", type: "address" }],
      stateMutability: "view",
      type: "function",
    },
    {
      inputs: [],
      name: "hiddenMetadataUri",
      outputs: [{ internalType: "string", name: "", type: "string" }],
      stateMutability: "view",
      type: "function",
    },
    {
      inputs: [
        { internalType: "address", name: "owner", type: "address" },
        { internalType: "address", name: "operator", type: "address" },
      ],
      name: "isApprovedForAll",
      outputs: [{ internalType: "bool", name: "", type: "bool" }],
      stateMutability: "view",
      type: "function",
    },
    {
      inputs: [{ internalType: "address", name: "_addr", type: "address" }],
      name: "isInWhiteList",
      outputs: [{ internalType: "bool", name: "", type: "bool" }],
      stateMutability: "view",
      type: "function",
    },
    {
      inputs: [],
      name: "maxMintAmountPerTx",
      outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
      stateMutability: "view",
      type: "function",
    },
    {
      inputs: [],
      name: "maxSupply",
      outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
      stateMutability: "view",
      type: "function",
    },
    {
      inputs: [
        { internalType: "uint256", name: "_mintAmount", type: "uint256" },
      ],
      name: "mint",
      outputs: [],
      stateMutability: "payable",
      type: "function",
    },
    {
      inputs: [
        { internalType: "uint256", name: "mintAmount", type: "uint256" },
        { internalType: "address", name: "receiver", type: "address" },
      ],
      name: "mintForAddress",
      outputs: [],
      stateMutability: "nonpayable",
      type: "function",
    },
    {
      inputs: [],
      name: "name",
      outputs: [{ internalType: "string", name: "", type: "string" }],
      stateMutability: "view",
      type: "function",
    },
    {
      inputs: [],
      name: "nftPerAddressLimit",
      outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
      stateMutability: "view",
      type: "function",
    },
    {
      inputs: [],
      name: "nftPresalePerAddressLimit",
      outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
      stateMutability: "view",
      type: "function",
    },
    {
      inputs: [],
      name: "onlyWhitelisted",
      outputs: [{ internalType: "bool", name: "", type: "bool" }],
      stateMutability: "view",
      type: "function",
    },
    {
      inputs: [],
      name: "owner",
      outputs: [{ internalType: "address", name: "", type: "address" }],
      stateMutability: "view",
      type: "function",
    },
    {
      inputs: [
        { internalType: "uint256", name: "_mintAmount", type: "uint256" },
      ],
      name: "ownerMint",
      outputs: [],
      stateMutability: "nonpayable",
      type: "function",
    },
    {
      inputs: [{ internalType: "uint256", name: "_tokenId", type: "uint256" }],
      name: "ownerMintSpecific",
      outputs: [],
      stateMutability: "nonpayable",
      type: "function",
    },
    {
      inputs: [{ internalType: "uint256", name: "tokenId", type: "uint256" }],
      name: "ownerOf",
      outputs: [{ internalType: "address", name: "", type: "address" }],
      stateMutability: "view",
      type: "function",
    },
    {
      inputs: [],
      name: "paused",
      outputs: [{ internalType: "bool", name: "", type: "bool" }],
      stateMutability: "view",
      type: "function",
    },
    {
      inputs: [],
      name: "presale",
      outputs: [{ internalType: "bool", name: "", type: "bool" }],
      stateMutability: "view",
      type: "function",
    },
    {
      inputs: [],
      name: "presaleCost",
      outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
      stateMutability: "view",
      type: "function",
    },
    {
      inputs: [],
      name: "publicsaleCost",
      outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
      stateMutability: "view",
      type: "function",
    },
    {
      inputs: [{ internalType: "address", name: "_addr", type: "address" }],
      name: "removeFromWhiteList",
      outputs: [],
      stateMutability: "nonpayable",
      type: "function",
    },
    {
      inputs: [],
      name: "renounceOwnership",
      outputs: [],
      stateMutability: "nonpayable",
      type: "function",
    },
    {
      inputs: [],
      name: "revealed",
      outputs: [{ internalType: "bool", name: "", type: "bool" }],
      stateMutability: "view",
      type: "function",
    },
    {
      inputs: [
        { internalType: "address", name: "from", type: "address" },
        { internalType: "address", name: "to", type: "address" },
        { internalType: "uint256", name: "tokenId", type: "uint256" },
      ],
      name: "safeTransferFrom",
      outputs: [],
      stateMutability: "nonpayable",
      type: "function",
    },
    {
      inputs: [
        { internalType: "address", name: "from", type: "address" },
        { internalType: "address", name: "to", type: "address" },
        { internalType: "uint256", name: "tokenId", type: "uint256" },
        { internalType: "bytes", name: "_data", type: "bytes" },
      ],
      name: "safeTransferFrom",
      outputs: [],
      stateMutability: "nonpayable",
      type: "function",
    },
    {
      inputs: [
        { internalType: "address", name: "operator", type: "address" },
        { internalType: "bool", name: "approved", type: "bool" },
      ],
      name: "setApprovalForAll",
      outputs: [],
      stateMutability: "nonpayable",
      type: "function",
    },
    {
      inputs: [
        { internalType: "string", name: "_hiddenMetadataUri", type: "string" },
      ],
      name: "setHiddenMetadataUri",
      outputs: [],
      stateMutability: "nonpayable",
      type: "function",
    },
    {
      inputs: [{ internalType: "uint256", name: "_cost", type: "uint256" }],
      name: "setNFTPerAddressLimit",
      outputs: [],
      stateMutability: "nonpayable",
      type: "function",
    },
    {
      inputs: [{ internalType: "uint256", name: "_cost", type: "uint256" }],
      name: "setNFTPresalePerAddressLimit",
      outputs: [],
      stateMutability: "nonpayable",
      type: "function",
    },
    {
      inputs: [{ internalType: "bool", name: "_state", type: "bool" }],
      name: "setOnlyWhitelisted",
      outputs: [],
      stateMutability: "nonpayable",
      type: "function",
    },
    {
      inputs: [{ internalType: "bool", name: "_state", type: "bool" }],
      name: "setPaused",
      outputs: [],
      stateMutability: "nonpayable",
      type: "function",
    },
    {
      inputs: [{ internalType: "bool", name: "_state", type: "bool" }],
      name: "setPresale",
      outputs: [],
      stateMutability: "nonpayable",
      type: "function",
    },
    {
      inputs: [{ internalType: "uint256", name: "_cost", type: "uint256" }],
      name: "setPresaleCost",
      outputs: [],
      stateMutability: "nonpayable",
      type: "function",
    },
    {
      inputs: [{ internalType: "uint256", name: "_cost", type: "uint256" }],
      name: "setPublicsaleCost",
      outputs: [],
      stateMutability: "nonpayable",
      type: "function",
    },
    {
      inputs: [{ internalType: "bool", name: "_state", type: "bool" }],
      name: "setRevealed",
      outputs: [],
      stateMutability: "nonpayable",
      type: "function",
    },
    {
      inputs: [{ internalType: "string", name: "_uriPrefix", type: "string" }],
      name: "setUriPrefix",
      outputs: [],
      stateMutability: "nonpayable",
      type: "function",
    },
    {
      inputs: [{ internalType: "string", name: "_uriSuffix", type: "string" }],
      name: "setUriSuffix",
      outputs: [],
      stateMutability: "nonpayable",
      type: "function",
    },
    {
      inputs: [{ internalType: "bytes4", name: "interfaceId", type: "bytes4" }],
      name: "supportsInterface",
      outputs: [{ internalType: "bool", name: "", type: "bool" }],
      stateMutability: "view",
      type: "function",
    },
    {
      inputs: [],
      name: "symbol",
      outputs: [{ internalType: "string", name: "", type: "string" }],
      stateMutability: "view",
      type: "function",
    },
    {
      inputs: [{ internalType: "uint256", name: "_tokenId", type: "uint256" }],
      name: "tokenURI",
      outputs: [{ internalType: "string", name: "", type: "string" }],
      stateMutability: "view",
      type: "function",
    },
    {
      inputs: [],
      name: "totalSupply",
      outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
      stateMutability: "view",
      type: "function",
    },
    {
      inputs: [
        { internalType: "address", name: "from", type: "address" },
        { internalType: "address", name: "to", type: "address" },
        { internalType: "uint256", name: "tokenId", type: "uint256" },
      ],
      name: "transferFrom",
      outputs: [],
      stateMutability: "nonpayable",
      type: "function",
    },
    {
      inputs: [{ internalType: "address", name: "newOwner", type: "address" }],
      name: "transferOwnership",
      outputs: [],
      stateMutability: "nonpayable",
      type: "function",
    },
    {
      inputs: [],
      name: "uriPrefix",
      outputs: [{ internalType: "string", name: "", type: "string" }],
      stateMutability: "view",
      type: "function",
    },
    {
      inputs: [],
      name: "uriSuffix",
      outputs: [{ internalType: "string", name: "", type: "string" }],
      stateMutability: "view",
      type: "function",
    },
    {
      inputs: [{ internalType: "address", name: "_owner", type: "address" }],
      name: "walletOfOwner",
      outputs: [{ internalType: "uint256[]", name: "", type: "uint256[]" }],
      stateMutability: "view",
      type: "function",
    },
    {
      inputs: [{ internalType: "address", name: "", type: "address" }],
      name: "whitelistedAddressesList",
      outputs: [{ internalType: "bool", name: "", type: "bool" }],
      stateMutability: "view",
      type: "function",
    },
    {
      inputs: [],
      name: "withdraw",
      outputs: [],
      stateMutability: "nonpayable",
      type: "function",
    },
  ];

  // Connect Wallet
  const connectWallet = async () => {
    if (Web3.givenProvider) {
      const providerOptions = {};

      const web3Modal = new Web3Modal({
        network: "mainnet",
        cacheProvider: true,
        providerOptions,
      });

      const provider = await web3Modal.connect();
      const web3 = new Web3(provider);

      web3.eth.net.getId();

      const addresses = await web3.eth.getAccounts();
      const address = addresses[0];

      const { ethereum } = window;

      const networkId = await ethereum.request({
        method: "net_version",
      });

      setWalletConnected(true);
    } else {
      window.open("https://metamask.io/download/");
    }
  };

  // Fetch
  useEffect(async () => {
    if (Web3.givenProvider) {
      if (walletConnected) {
        const web3 = new Web3(Web3.givenProvider);
        await Web3.givenProvider.enable();

        const contract = new web3.eth.Contract(CONTRACT_ABI, CONTRACT_ADDRESS);

        contract.methods
          .totalSupply()
          .call()
          .then((response) => {
            setTotalMinted(response);
          })
          .catch((err) => {
            console.log(err);
          });
      }
    }
  }, [walletConnected]);

  // useEffect(() => {
  //   axios
  //     .get(
  //       "https://api.etherscan.io/api?module=stats&action=tokensupply&contractaddress=0x27caC31B750990Eea77EE1bAc612F60590A0195c&apikey=P65RXADWW83PQUNRMN4K7H2NTK8RZ1XPYS"
  //     )
  //     .then(function (response) {
  //       setTotalMinted(response.data.result);
  //     })
  //     .catch(function (error) {
  //       console.log(error);
  //     });
  // }, []);

  // Mint
  const mint = async () => {
    if (value > 0) {
      if (Web3.givenProvider) {
        connectWallet();

        const web3 = new Web3(Web3.givenProvider);
        await Web3.givenProvider.enable();

        const price = 0 * value;
        var tokens = web3.utils.toWei(price.toString(), "ether");
        var bntokens = web3.utils.toBN(tokens);

        const contract = new web3.eth.Contract(CONTRACT_ABI, CONTRACT_ADDRESS);

        const addresses = await web3.eth.getAccounts();
        const address = addresses[0];

        contract.methods
          .mint(value)
          .send({ gasLimit: "300000", from: address, value: bntokens })
          .then((nft) => {
            alert(
              "Congratulations you have successfully minted your Wlcked Shark! Check Opensea."
            );

            contract.methods
              .totalSupply()
              .call()
              .then((response) => {
                setTotalMinted(response);
              })
              .catch((err) => {
                console.log(err);
              });

            console.log(nft);
          })
          .catch((err) => {
            console.log(err);
          });
      } else {
        window.open("https://metamask.io/download/");
      }
    } else {
      alert("Please choose quantity");
    }
  };
  return (
    <>
      <div className="wrapper">
        <div className="header">
          <div className="container">
            <div className="header-menu">
              <div className="logo desktop">
                <a href="" className="logo-link">
                  <img src="assets/img/logo.png" alt="" />
                </a>
              </div>
              <div className="nav-btn" onClick={_toggleSidebar}>
                <svg
                  width="38"
                  height="20"
                  viewBox="0 0 38 20"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <rect x="8" width="30" height="4" rx="2" fill="#fff"></rect>
                  <rect
                    x="8"
                    y="16"
                    width="30"
                    height="4"
                    rx="2"
                    fill="#fff"
                  ></rect>
                  <rect y="8" width="30" height="4" rx="2" fill="#fff"></rect>
                </svg>
              </div>
              <div
                className={`navigation-menu ${sidebarActive ? "active" : ""}`}
              >
                <div className="logo mobile-logo">
                  <a href="" className="logo-link">
                    <img src="assets/img/logo.png" alt="" />
                  </a>
                </div>
                <button className="close-btn" onClick={_toggleSidebar}>
                  X
                </button>
                <ul className="manu-ul">
                  <li className="manu-list">
                    <a
                      onClick={() => {
                        const location =
                          document.querySelector(".hero").offsetTop;

                        window.scrollTo({
                          left: 0,
                          top: location,
                        });
                      }}
                      className="nav-link"
                    >
                      Home
                    </a>
                  </li>
                  <li className="manu-list">
                    <a
                      onClick={() => {
                        const location =
                          document.querySelector(".roadmap").offsetTop;

                        window.scrollTo({
                          left: 0,
                          top: location,
                        });
                      }}
                      className="nav-link"
                    >
                      roadmap
                    </a>
                  </li>
                  <li className="manu-list">
                    <a
                      onClick={() => {
                        const location =
                          document.querySelector(".team-area").offsetTop;

                        window.scrollTo({
                          left: 0,
                          top: location,
                        });
                      }}
                      className="nav-link"
                    >
                      team
                    </a>
                  </li>
                  <li className="manu-list">
                    <a
                      onClick={() => {
                        const location =
                          document.querySelector(".faq-area").offsetTop;

                        window.scrollTo({
                          left: 0,
                          top: location,
                        });
                      }}
                      className="nav-link"
                    >
                      faqs
                    </a>
                  </li>
                </ul>

                <div className="social-sec">
                  <ul className="social-ul">
                    <li>
                      <a
                        href="https://discord.gg/meCwgKrbaX"
                        className="social-link"
                      >
                        <svg
                          width="39"
                          height="39"
                          viewBox="0 0 39 39"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            fill-rule="evenodd"
                            clip-rule="evenodd"
                            d="M19.3455 38.6909C30.0296 38.6909 38.6909 30.0296 38.6909 19.3455C38.6909 8.66125 30.0296 0 19.3455 0C8.66125 0 0 8.66125 0 19.3455C0 30.0296 8.66125 38.6909 19.3455 38.6909ZM22.9303 8.00343C24.9229 8.34037 26.8283 8.93291 28.6059 9.73459C28.6214 9.74077 28.6342 9.75231 28.6419 9.76712C31.7917 14.3239 33.3463 19.4663 32.7654 25.3847C32.764 25.3972 32.76 25.4093 32.7535 25.4201C32.7471 25.431 32.7385 25.4403 32.7282 25.4475C30.6155 26.9867 28.2578 28.1577 25.7547 28.911C25.7371 28.9163 25.7183 28.916 25.7008 28.9101C25.6833 28.9043 25.6681 28.8932 25.6571 28.8784C25.1308 28.1569 24.6521 27.3971 24.2339 26.5989C24.2282 26.5879 24.2249 26.5758 24.2242 26.5634C24.2236 26.551 24.2256 26.5387 24.2301 26.5271C24.2346 26.5156 24.2415 26.5051 24.2504 26.4964C24.2592 26.4878 24.2699 26.4811 24.2815 26.4769C25.0402 26.1957 25.7629 25.8576 26.4577 25.4579C26.47 25.4506 26.4804 25.4403 26.4878 25.4279C26.4953 25.4156 26.4995 25.4016 26.5002 25.3872C26.5009 25.3728 26.498 25.3585 26.4918 25.3455C26.4856 25.3325 26.4763 25.3212 26.4646 25.3127C26.3171 25.2047 26.1718 25.092 26.0324 24.9781C26.0196 24.9679 26.0043 24.9616 25.988 24.9597C25.9718 24.9579 25.9554 24.9606 25.9406 24.9676C21.4315 27.0172 16.4901 27.0172 11.9275 24.9676C11.9128 24.961 11.8966 24.9586 11.8806 24.9606C11.8646 24.9627 11.8495 24.9691 11.8369 24.9793C11.6975 25.092 11.5511 25.2047 11.4047 25.3127C11.3932 25.3214 11.384 25.3328 11.378 25.3459C11.372 25.359 11.3693 25.3734 11.3702 25.3878C11.3711 25.4022 11.3756 25.4162 11.3833 25.4284C11.3909 25.4406 11.4015 25.4508 11.414 25.4579C12.1112 25.8543 12.8384 26.1954 13.589 26.4781C13.6378 26.4966 13.661 26.5524 13.6366 26.5989C13.2276 27.3982 12.749 28.1593 12.2122 28.8796C12.2008 28.8939 12.1855 28.9044 12.168 28.9098C12.1506 28.9152 12.132 28.9152 12.1146 28.9098C9.61583 28.1544 7.26198 26.984 5.1516 25.4475C5.14157 25.4398 5.13321 25.4302 5.12702 25.4192C5.12083 25.4083 5.11694 25.3961 5.11558 25.3836C4.62877 20.2645 5.61983 15.0803 9.23551 9.7648C9.24442 9.75079 9.25739 9.73985 9.27269 9.73343C11.0515 8.93059 12.9569 8.33804 14.9483 8.0011C14.9663 7.99825 14.9847 8.00095 15.0011 8.00884C15.0175 8.01673 15.0311 8.02943 15.0401 8.04525C15.3054 8.50793 15.5448 8.98503 15.757 9.47433C17.8703 9.15858 20.0188 9.15858 22.1321 9.47433C22.3226 9.03283 22.5945 8.47398 22.8385 8.04525C22.8476 8.02963 22.8613 8.0172 22.8777 8.00971C22.8942 8.00222 22.9125 8.00002 22.9303 8.00343ZM11.8125 19.5011C11.8125 21.0243 12.9453 22.2663 14.3186 22.2663C15.714 22.2663 16.8247 21.0255 16.8247 19.5011C16.8468 17.9872 15.7245 16.7359 14.3186 16.7359C12.9232 16.7359 11.8125 17.9768 11.8125 19.5011ZM21.0783 19.5011C21.0783 21.0243 22.2099 22.2663 23.5844 22.2663C24.9914 22.2663 26.0905 21.0255 26.0905 19.5011C26.1126 17.9872 24.9902 16.7359 23.5844 16.7359C22.1878 16.7359 21.0783 17.9768 21.0783 19.5011Z"
                            fill="white"
                          />
                        </svg>
                      </a>
                    </li>
                    <li>
                      <a
                        href="https://twitter.com/wickedsharkclub"
                        className="social-link"
                      >
                        <svg
                          width="39"
                          height="39"
                          viewBox="0 0 39 39"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            d="M19.7363 0.691406C9.24392 0.691406 0.736328 9.199 0.736328 19.6914C0.736328 30.1838 9.24392 38.6914 19.7363 38.6914C30.2287 38.6914 38.7363 30.1838 38.7363 19.6914C38.7363 9.199 30.2287 0.691406 19.7363 0.691406ZM28.8674 15.0135C28.8801 15.2128 28.8801 15.4206 28.8801 15.6242C28.8801 21.8501 24.1386 29.0218 15.4741 29.0218C12.8022 29.0218 10.3254 28.2456 8.23878 26.9097C8.62048 26.9521 8.98521 26.9691 9.37539 26.9691C11.5807 26.9691 13.608 26.2227 15.2238 24.9588C13.1542 24.9164 11.4153 23.5593 10.8216 21.6932C11.5468 21.7992 12.1999 21.7992 12.9464 21.6084C11.8807 21.3919 10.9229 20.8131 10.2355 19.9704C9.54825 19.1277 9.17388 18.073 9.17606 16.9856V16.9262C9.7995 17.2782 10.5332 17.4945 11.3008 17.5242C10.6555 17.0942 10.1263 16.5115 9.7601 15.8279C9.3939 15.1443 9.20203 14.381 9.20151 13.6055C9.20151 12.7276 9.43052 11.926 9.84191 11.2305C11.0248 12.6866 12.5008 13.8775 14.174 14.7258C15.8473 15.5741 17.6803 16.0609 19.554 16.1544C18.8881 12.9523 21.2801 10.361 24.1555 10.361C25.5127 10.361 26.7341 10.9294 27.595 11.8454C28.6595 11.6461 29.6774 11.2474 30.585 10.7131C30.233 11.803 29.495 12.7233 28.5153 13.3044C29.4653 13.2026 30.3814 12.9396 31.2296 12.5706C30.5892 13.5122 29.7877 14.3477 28.8674 15.0135V15.0135Z"
                            fill="white"
                          />
                        </svg>
                      </a>
                    </li>
                    <li>
                      <a
                        href="https://www.instagram.com/wickedsharkclub"
                        className="social-link"
                      >
                        <svg
                          width="40"
                          height="39"
                          viewBox="0 0 40 39"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            fill-rule="evenodd"
                            clip-rule="evenodd"
                            d="M20.1345 38.6909C30.8187 38.6909 39.48 30.0296 39.48 19.3455C39.48 8.66125 30.8187 0 20.1345 0C9.45032 0 0.789062 8.66125 0.789062 19.3455C0.789062 30.0296 9.45032 38.6909 20.1345 38.6909ZM14.7129 6.24535C16.1156 6.18409 16.5645 6.16797 20.1344 6.16797H20.1311C23.706 6.16797 24.1516 6.18409 25.5559 6.24535C26.9552 6.30822 27.9122 6.52586 28.7509 6.84506C29.6289 7.16852 30.4242 7.67639 31.0809 8.33305C31.7501 8.97737 32.268 9.75691 32.5987 10.6174C32.9226 11.4364 33.1446 12.3746 33.2104 13.7466C33.2729 15.1233 33.2893 15.5618 33.2893 19.0649C33.2893 22.5681 33.2729 23.0066 33.2104 24.3817C33.1446 25.7552 32.9226 26.6919 32.5987 27.5125C32.2616 28.3604 31.8127 29.0794 31.0809 29.7968C30.4245 30.4531 29.6299 30.9609 28.7525 31.2848C27.9155 31.604 26.9569 31.82 25.5575 31.8845C24.1532 31.9458 23.7076 31.9619 20.1344 31.9619C16.5612 31.9619 16.1139 31.9458 14.7096 31.8845C13.3086 31.8217 12.3549 31.604 11.5163 31.2848C10.6514 30.9559 9.91797 30.5142 9.18787 29.7968C8.45613 29.0794 8.00722 28.3604 7.67013 27.5125C7.34454 26.6919 7.1242 25.7552 7.05842 24.3817C6.99594 23.0066 6.97949 22.5681 6.97949 19.0665C6.97949 15.5618 6.99594 15.1233 7.05842 13.7449C7.12255 12.3746 7.34454 11.4364 7.67013 10.6174C8.00082 9.75694 8.51874 8.97741 9.18787 8.33305C9.84478 7.67663 10.64 7.1688 11.5179 6.84506C12.3549 6.52586 13.3103 6.30984 14.7129 6.24535ZM20.136 8.49265H18.9554V8.48942C16.5036 8.49104 16.0334 8.50716 14.8198 8.56197C13.5372 8.62001 12.8416 8.82958 12.3779 9.00691C11.7629 9.24067 11.3255 9.51957 10.8651 9.97096C10.4047 10.4224 10.1186 10.8528 9.88015 11.4541C9.69927 11.9087 9.4855 12.5923 9.4263 13.8497C9.36382 15.2087 9.35066 15.615 9.35066 19.0585C9.35066 22.5036 9.36382 22.9115 9.4263 24.2705C9.48386 25.5279 9.69927 26.2115 9.8785 26.6645C10.0902 27.2249 10.4273 27.7318 10.8651 28.1476C11.2896 28.5758 11.8065 28.9052 12.3779 29.1117C12.8416 29.289 13.5372 29.4986 14.8198 29.5566C16.206 29.6179 16.6237 29.6324 20.136 29.6324C23.6484 29.6324 24.0644 29.6179 25.4506 29.5566C26.7349 29.4986 27.4321 29.289 27.8925 29.1117C28.5075 28.8779 28.9449 28.599 29.4053 28.1476C29.8428 27.7324 30.1794 27.2261 30.3903 26.6661C30.5695 26.2115 30.7849 25.5295 30.8425 24.2721C30.9066 22.9131 30.9198 22.5036 30.9198 19.0617C30.9198 15.6198 30.9066 15.212 30.8425 13.853C30.7849 12.5955 30.5712 11.912 30.3903 11.459C30.1519 10.856 29.8674 10.4272 29.407 9.9758C28.9465 9.52441 28.5075 9.2439 27.8941 9.01014C27.4304 8.83442 26.7332 8.62323 25.4506 8.5668C24.0644 8.50393 23.6484 8.49265 20.136 8.49265ZM26.5534 10.7514C26.7449 10.6736 26.9502 10.6335 27.1575 10.6335C27.5761 10.6335 27.9777 10.7966 28.2737 11.0868C28.5697 11.3771 28.7361 11.7707 28.7361 12.1812C28.7361 12.5916 28.5697 12.9853 28.2737 13.2755C27.9777 13.5658 27.5761 13.7288 27.1575 13.7288C26.9502 13.7288 26.7449 13.6888 26.5534 13.611C26.3619 13.5332 26.1878 13.4192 26.0412 13.2755C25.8947 13.1318 25.7784 12.9612 25.699 12.7734C25.6197 12.5857 25.5789 12.3844 25.5789 12.1812C25.5789 11.9779 25.6197 11.7767 25.699 11.5889C25.7784 11.4012 25.8947 11.2305 26.0412 11.0868C26.1878 10.9431 26.3619 10.8291 26.5534 10.7514ZM17.5182 12.9165C18.3501 12.5898 19.24 12.4286 20.136 12.4423C21.9096 12.4695 23.6011 13.1792 24.8455 14.4184C26.0899 15.6576 26.7873 17.3268 26.7873 19.0657C26.7873 20.8047 26.0899 22.4739 24.8455 23.7131C23.6011 24.9523 21.9096 25.662 20.136 25.6891C19.24 25.7029 18.3501 25.5417 17.5182 25.215C16.6863 24.8882 15.929 24.4026 15.2904 23.7862C14.6517 23.1698 14.1446 22.435 13.7984 21.6246C13.4522 20.8142 13.274 19.9443 13.274 19.0657C13.274 18.1871 13.4522 17.3173 13.7984 16.5069C14.1446 15.6965 14.6517 14.9617 15.2904 14.3453C15.929 13.7289 16.6863 13.2432 17.5182 12.9165ZM23.2371 16.0247C22.4146 15.2184 21.2992 14.7654 20.136 14.7654C18.9729 14.7654 17.8575 15.2184 17.035 16.0247C16.2126 16.831 15.7505 17.9246 15.7505 19.0649C15.7505 20.2052 16.2126 21.2988 17.035 22.1052C17.8575 22.9115 18.9729 23.3645 20.136 23.3645C21.2992 23.3645 22.4146 22.9115 23.2371 22.1052C24.0595 21.2988 24.5216 20.2052 24.5216 19.0649C24.5216 17.9246 24.0595 16.831 23.2371 16.0247Z"
                            fill="white"
                          />
                        </svg>
                      </a>
                    </li>
                    <li>
                      <a
                        href="https://opensea.io/collection/wicked-shark-club"
                        className="social-link"
                      >
                        <svg
                          width="39"
                          height="39"
                          viewBox="0 0 39 39"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            fill-rule="evenodd"
                            clip-rule="evenodd"
                            d="M38.3517 19.084C38.3517 29.6233 29.8069 38.1681 19.2676 38.1681C8.72839 38.1681 0.183594 29.6233 0.183594 19.084C0.183594 8.5448 8.72839 0 19.2676 0C29.8091 0 38.3517 8.5448 38.3517 19.084ZM9.59856 19.7254L9.68089 19.5959L14.6454 11.8296C14.718 11.7159 14.8885 11.7276 14.9434 11.8512C15.7728 13.7099 16.4885 16.0216 16.1532 17.4608C16.0101 18.0529 15.6179 18.8548 15.1767 19.5959C15.1199 19.7038 15.0572 19.8097 14.9905 19.9116C14.9591 19.9587 14.9062 19.9861 14.8493 19.9861H9.74363C9.60638 19.9861 9.526 19.8371 9.59856 19.7254ZM31.7277 22.3979V21.1686C31.7277 21.0548 31.6179 20.9725 31.51 21.0039L25.7044 22.6822C25.673 22.6901 25.6456 22.7077 25.624 22.7312C25.0022 23.4181 24.4738 23.879 24.3338 24.0011L24.3241 24.0096C23.9633 24.3155 23.5162 24.4822 23.0457 24.4822H20.9438V22.3391H22.6143C22.6575 22.3391 22.6986 22.3234 22.73 22.296L22.9457 22.0979C23.0378 22.0136 23.1477 21.9117 23.279 21.7803C23.2902 21.7691 23.3015 21.7578 23.313 21.7464C23.382 21.6776 23.4557 21.6041 23.528 21.5235C23.6143 21.4391 23.6986 21.345 23.777 21.2529C23.9084 21.1117 24.0339 20.9646 24.1653 20.8097C24.2594 20.7078 24.3456 20.5921 24.43 20.4764C24.5241 20.3666 24.6162 20.2431 24.7025 20.1255C24.7346 20.0783 24.7688 20.0306 24.8037 19.9819C24.837 19.9354 24.8709 19.888 24.9044 19.8392C24.9672 19.7451 25.0299 19.6451 25.0829 19.551C25.2476 19.2961 25.3868 19.0235 25.5044 18.751C25.5584 18.6343 25.6016 18.5114 25.6435 18.3919C25.6488 18.3769 25.6541 18.362 25.6593 18.3471C25.7064 18.2079 25.7456 18.0765 25.775 17.9373C25.8456 17.6099 25.8613 17.2844 25.8299 16.9589C25.8221 16.857 25.8142 16.757 25.7907 16.6629V16.6472C25.7828 16.5805 25.7671 16.506 25.7456 16.4374C25.675 16.1197 25.5652 15.8021 25.426 15.4903C25.3789 15.3747 25.324 15.257 25.2711 15.1492C25.1456 14.9159 25.0142 14.6825 24.8652 14.4571C24.8353 14.4094 24.8023 14.3612 24.7693 14.313C24.7439 14.2759 24.7185 14.2389 24.6946 14.2022C24.6003 14.0566 24.4942 13.9163 24.3912 13.7801C24.368 13.7494 24.3449 13.7188 24.3221 13.6885C24.2613 13.6087 24.1948 13.5289 24.1278 13.4485C24.0911 13.4045 24.0543 13.3603 24.0182 13.3159C23.9162 13.1924 23.8162 13.0748 23.7143 12.9591C23.3496 12.5473 22.9673 12.1748 22.6261 11.8572C22.5633 11.7944 22.4947 11.7317 22.4241 11.6709C22.1594 11.4297 21.9183 11.2199 21.7163 11.0572C21.6556 11.0105 21.6012 10.9645 21.5506 10.9217C21.5161 10.8926 21.4834 10.865 21.4516 10.8396C21.3904 10.7939 21.3373 10.7535 21.2927 10.7195C21.2645 10.698 21.2396 10.6791 21.2183 10.6631C21.2026 10.6513 21.185 10.6435 21.1673 10.6376L20.9438 10.5749V8.72395C20.9438 8.422 20.8222 8.15142 20.6281 7.95337C20.434 7.75535 20.1635 7.63379 19.8654 7.63379C19.2694 7.63379 18.787 8.122 18.787 8.72395V9.97093L18.6753 9.9396L18.3713 9.8533L18.0949 9.77685C18.0941 9.77685 18.0933 9.77651 18.0923 9.77611C18.091 9.77555 18.0894 9.77487 18.0871 9.77487H18.0812L15.9832 9.20627C15.8911 9.18078 15.8126 9.28078 15.8597 9.36509L16.195 9.98467C16.214 10.0323 16.2381 10.0799 16.2629 10.1288C16.2789 10.1605 16.2953 10.1927 16.3107 10.2259C16.3656 10.3356 16.4205 10.4513 16.4734 10.567C16.5205 10.669 16.5675 10.769 16.6224 10.8788C16.6455 10.9304 16.669 10.9826 16.6929 11.0356C16.7805 11.2302 16.8727 11.4348 16.9636 11.6552L16.9636 11.6553C17.042 11.8415 17.1204 12.0278 17.1891 12.2219C17.3773 12.7101 17.5557 13.2316 17.7106 13.7669C17.7492 13.8867 17.78 14.0026 17.8112 14.1201C17.8244 14.1699 17.8378 14.22 17.8518 14.2708L17.8733 14.3649C17.9361 14.6139 17.991 14.861 18.0302 15.11C18.0616 15.2805 18.091 15.4433 18.1067 15.608C18.1302 15.7942 18.1537 15.9805 18.1616 16.1668C18.1773 16.3374 18.1851 16.5158 18.1851 16.6864C18.1851 17.1216 18.1459 17.5412 18.0537 17.9373C18.0479 17.9586 18.0422 17.9801 18.0364 18.0019C18.0105 18.0982 17.9838 18.1981 17.9518 18.2942C17.9228 18.397 17.8853 18.4998 17.8463 18.6066C17.8325 18.6444 17.8185 18.6826 17.8047 18.7216C17.8021 18.7285 17.7995 18.7355 17.797 18.7424C17.7681 18.8201 17.7388 18.8991 17.7028 18.9765C17.5086 19.4431 17.2675 19.9078 17.0185 20.3431C16.6538 20.9882 16.2871 21.5548 16.0303 21.9195C16.0146 21.9431 15.9992 21.9655 15.9845 21.9871C15.9661 22.014 15.9486 22.0396 15.9323 22.0646C15.8519 22.1783 15.9342 22.3391 16.0734 22.3391H18.787V24.4822H16.042C15.3048 24.4822 14.6225 24.0645 14.2931 23.3959C14.1225 23.0606 14.0558 22.692 14.0951 22.3312C14.1048 22.2234 14.0245 22.1215 13.9147 22.1215H8.36979C8.27567 22.1215 8.19922 22.1979 8.19922 22.292V22.4057C8.19922 25.9429 11.056 28.8094 14.5813 28.8094H24.528C26.3925 28.8094 27.4512 27.1104 28.4918 25.4404C28.7819 24.9749 29.0705 24.5116 29.3749 24.088C29.9219 23.3273 31.2375 22.7234 31.6218 22.5587C31.6846 22.5312 31.7277 22.4685 31.7277 22.3979Z"
                            fill="white"
                          />
                        </svg>
                      </a>
                    </li>
                    {/* <li>
                      <a href="#" className="social-link">
                        <svg
                          width="39"
                          height="39"
                          viewBox="0 0 39 39"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            fill-rule="evenodd"
                            clip-rule="evenodd"
                            d="M19.1543 38.1681C29.6936 38.1681 38.2384 29.6233 38.2384 19.084C38.2384 8.5448 29.6958 0 19.1543 0C8.61511 0 0.0703125 8.5448 0.0703125 19.084C0.0703125 29.6233 8.61511 38.1681 19.1543 38.1681ZM14.0268 25.9813C17.6919 25.9813 20.663 23.0102 20.663 19.3452C20.663 15.6801 17.6919 12.709 14.0268 12.709C10.3617 12.709 7.39062 15.6801 7.39062 19.3452C7.39062 23.0102 10.3617 25.9813 14.0268 25.9813ZM26.8567 19.3451C26.8567 23.0102 25.6683 25.9813 24.2023 25.9813C22.7362 25.9813 21.5478 23.0102 21.5478 19.3451C21.5478 15.6801 22.7362 12.709 24.2023 12.709C25.6683 12.709 26.8567 15.6801 26.8567 19.3451ZM29.0684 25.9813C29.8015 25.9813 30.3957 23.0102 30.3957 19.3452C30.3957 15.6801 29.8015 12.709 29.0684 12.709C28.3354 12.709 27.7412 15.6801 27.7412 19.3452C27.7412 23.0102 28.3354 25.9813 29.0684 25.9813Z"
                            fill="white"
                          />
                        </svg>
                      </a>
                    </li> */}
                  </ul>
                  <div className="wallet-btn">
                    <a onClick={connectWallet} className="wallet-link">
                      {walletConnected ? "Connected" : "Connect Wallet"}
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        {/* ====================hero section=============== */}
        <div className="hero">
          <div className="container">
            <div className="row justify-content-center">
              <div className="col-md-9">
                <div className="hero-content-area" data-aos="fade-up">
                  <h1 className="hero-title">ABOUT WICKED SHARK CLUB</h1>
                  <p className="hero-des">
                    Sharks star in blockbuster movies as blood-seeking villains,
                    but in reality, they’re far more fascinating and complicated
                    than they’re often depicted in pop culture. And here we have
                    10,000 of them, join our community so we can explore them
                    more.
                  </p>

                  <a
                    href="https://discord.gg/meCwgKrbaX"
                    className="discord-btn"
                  >
                    <svg
                      width="261"
                      height="119"
                      viewBox="0 0 261 119"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        fill-rule="evenodd"
                        clip-rule="evenodd"
                        d="M19 9C13.4772 9 9 13.4772 9 19V75C9 80.5229 13.4772 85 19 85H209.882C209.697 93.4951 208.353 109.522 204 119C211.995 113.538 228.712 99.4107 234.298 85H251C256.523 85 261 80.5229 261 75V19C261 13.4772 256.523 9 251 9H19Z"
                        fill="#0F1134"
                      />
                      <mask id="path-2-inside-1_11_2480" fill="white">
                        <path
                          fill-rule="evenodd"
                          clip-rule="evenodd"
                          d="M10 0C4.47715 0 0 4.47715 0 10V66C0 71.5229 4.47716 76 10 76H200.882C200.697 84.4951 199.353 100.522 195 110C202.995 104.538 219.712 90.4107 225.298 76H242C247.523 76 252 71.5229 252 66V10C252 4.47715 247.523 0 242 0H10Z"
                        />
                      </mask>
                      <path
                        fill-rule="evenodd"
                        clip-rule="evenodd"
                        d="M10 0C4.47715 0 0 4.47715 0 10V66C0 71.5229 4.47716 76 10 76H200.882C200.697 84.4951 199.353 100.522 195 110C202.995 104.538 219.712 90.4107 225.298 76H242C247.523 76 252 71.5229 252 66V10C252 4.47715 247.523 0 242 0H10Z"
                        fill="white"
                      />
                      <path
                        d="M200.882 76L202.881 76.0434L202.926 74H200.882V76ZM195 110L193.183 109.165L190.172 115.72L196.128 111.651L195 110ZM225.298 76V74H223.929L223.434 75.2771L225.298 76ZM2 10C2 5.58172 5.58172 2 10 2V-2C3.37258 -2 -2 3.37258 -2 10H2ZM2 66V10H-2V66H2ZM10 74C5.58173 74 2 70.4183 2 66H-2C-2 72.6274 3.37259 78 10 78V74ZM200.882 74H10V78H200.882V74ZM196.817 110.835C199.114 105.833 200.571 99.2313 201.483 92.9175C202.4 86.57 202.788 80.357 202.881 76.0434L198.882 75.9566C198.791 80.1381 198.414 86.1862 197.525 92.3456C196.63 98.5387 195.238 104.689 193.183 109.165L196.817 110.835ZM223.434 75.2771C220.783 82.1136 215.423 89.0193 209.622 94.9583C203.843 100.874 197.767 105.687 193.872 108.349L196.128 111.651C200.228 108.851 206.508 103.87 212.483 97.7534C218.435 91.6606 224.227 84.2971 227.163 76.7229L223.434 75.2771ZM242 74H225.298V78H242V74ZM250 66C250 70.4183 246.418 74 242 74V78C248.627 78 254 72.6274 254 66H250ZM250 10V66H254V10H250ZM242 2C246.418 2 250 5.58172 250 10H254C254 3.37258 248.627 -2 242 -2V2ZM10 2H242V-2H10V2Z"
                        fill="#0F1134"
                        mask="url(#path-2-inside-1_11_2480)"
                      />
                      <path
                        d="M113.275 31.725L107 29.475L102.125 29.275L102.35 46.75L107.35 46.475L113.475 44.1L113.275 31.725ZM109.25 35.725L108.275 41.175L106.6 41.65L106.425 35.15L109.25 35.725ZM115.678 29.25L115.603 46.75H119.678L120.478 29.575L115.678 29.25ZM133.661 36.8L126.786 34.825L127.036 33.65L133.036 34.225L133.661 29.275H122.436L122.786 40.25L129.736 41.525L129.211 42.425L122.386 41.95L122.936 47L133.936 46.075L133.661 36.8ZM140.812 42.425L140.562 33.675L147.137 34.8V29.25L136.187 30.025L135.987 46.15L147.137 46.75L147.612 40.9L140.812 42.425ZM160.614 30.025L149.439 29.525L149.664 46.75L160.814 46.15L160.614 30.025ZM156.239 33.675L155.989 42.425L153.914 41.95L153.689 34.1L156.239 33.675ZM171.413 39.825L173.788 39.075L173.038 29.25H163.263L163.088 46.425L167.463 46.75L167.438 41.075L167.888 40.95L170.488 47.175L174.888 45.775L171.413 39.825ZM169.238 33.35L169.938 36.825L167.438 37.95L167.413 33.15L169.238 33.35ZM187.518 31.725L181.243 29.475L176.368 29.275L176.593 46.75L181.593 46.475L187.718 44.1L187.518 31.725ZM183.493 35.725L182.518 41.175L180.843 41.65L180.668 35.15L183.493 35.725Z"
                        fill="#0F1134"
                      />
                      <path
                        fill-rule="evenodd"
                        clip-rule="evenodd"
                        d="M56.0136 22H82.2573C82.7857 22.0014 83.3087 22.1068 83.7964 22.3102C84.284 22.5137 84.7269 22.8112 85.0996 23.1858C85.4723 23.5605 85.7675 24.0048 85.9685 24.4935C86.1695 24.9822 86.2722 25.5057 86.2708 26.0342V61.1667L82.0573 57.4438L79.6888 55.2504L77.18 52.919L78.2211 56.545H56.0136C53.8017 56.545 52 54.7433 52 52.5108V26.0342C51.9987 25.5057 52.1014 24.9822 52.3024 24.4935C52.5033 24.0048 52.7986 23.5605 53.1713 23.1858C53.544 22.8112 53.9868 22.5137 54.4745 22.3102C54.9622 22.1068 55.4851 22.0014 56.0136 22ZM73.4056 45.9865C73.9911 46.7348 74.6961 47.5758 74.6961 47.5758C78.9517 47.4401 80.6314 44.6946 80.6871 44.6035C80.6881 44.602 80.6886 44.6012 80.6886 44.6012C80.6886 38.2954 77.8686 33.1852 77.8686 33.1852C75.0506 31.0681 72.3667 31.1279 72.3667 31.1279L72.0925 31.4412C75.4217 32.4596 76.9698 33.9273 76.9698 33.9273C73.9687 32.2742 70.516 31.6288 67.1204 32.0864C67.0238 32.0864 66.9398 32.1004 66.8477 32.1156C66.8277 32.1189 66.8074 32.1223 66.7865 32.1256C66.1 32.1854 64.4365 32.441 62.3421 33.3604C61.6185 33.6923 61.1856 33.9273 61.1856 33.9273C61.1856 33.9273 62.8121 32.3812 66.3371 31.3608L66.1412 31.1258C66.1412 31.1258 63.4594 31.066 60.6394 33.1831C60.6394 33.1831 57.8194 38.2933 57.8194 44.5992C57.8194 44.5992 59.4623 47.4377 63.7892 47.5758C63.7892 47.5758 64.5148 46.6915 65.1023 45.9494C62.6142 45.2052 61.6742 43.6385 61.6742 43.6385C61.6742 43.6385 61.87 43.7746 62.2225 43.9684C62.2446 43.9944 62.272 44.0155 62.3029 44.0302C62.3299 44.0485 62.3569 44.0619 62.3842 44.0754C62.4151 44.0907 62.4463 44.1061 62.4781 44.1292C62.9381 44.3832 63.4155 44.6043 63.9067 44.7909C64.838 45.16 65.8013 45.4429 66.7844 45.636C69.4449 46.1469 72.197 45.8615 74.6961 44.8156C75.3825 44.56 76.1452 44.1848 76.9492 43.6571C76.9492 43.6571 75.97 45.2609 73.4056 45.9865ZM63.5934 40.6062C63.5934 39.4106 64.4736 38.4314 65.5909 38.4314C66.7061 38.4314 67.609 39.4085 67.5863 40.6062C67.5863 41.7977 66.7061 42.781 65.5909 42.781C64.4942 42.781 63.5934 41.7977 63.5934 40.6062ZM70.7423 40.6062C70.7423 39.4106 71.6225 38.4314 72.7398 38.4314C73.855 38.4314 74.7332 39.4085 74.7352 40.6062C74.7352 41.7977 73.855 42.781 72.7398 42.781C71.6431 42.781 70.7423 41.7977 70.7423 40.6062Z"
                        fill="#0F1134"
                      />
                    </svg>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
        {/* ==================hero section end =============== */}

        <div className="full-area">
          <div className="buble-bg">
            {/* ==============mint section ================= */}
            <div className="mint-section cpy-6">
              <div className="container">
                <div className="row">
                  <div className="section-title mb-5">
                    <h2 className="sec-title">MINTING PAGE</h2>
                  </div>
                </div>
                <div className="row">
                  <div className="col-xl-7 col-lg-6 col-md-12 mb-4">
                    <div className="mint-img" data-aos="fade-up">
                      <img src="assets/img/mint-book.png" alt="" />
                    </div>
                  </div>
                  <div className="col-xl-5 col-lg-6 col-md-12 mb-4">
                    <div className="mint-form" data-aos="fade-up">
                      <div className="mint-form-title">
                        <h2>{totalMinted}/10,000</h2>
                      </div>
                      <div className="mint-form-content">
                        <button
                          className="incriment-btn"
                          onClick={() => {
                            if (value > 1) {
                              setValue(value - 1);
                            }
                          }}
                        >
                          -
                        </button>
                        <span className="mint-value">{value}</span>
                        <button
                          className="incriment-btn"
                          onClick={() => {
                            if (value < 2) {
                              setValue(value + 1);
                            }
                          }}
                        >
                          +
                        </button>
                      </div>

                      <div className="mb-4">
                        <div className="mint-btn">
                          <a className="wallet-link" onClick={mint}>
                            Mint
                          </a>
                        </div>
                      </div>

                      <p className="mint-des">
                        "Lorem ipsum dolor sit amet, consectetur adipiscing
                        elit, sed do eiusmod tempor incididunt ut labore et
                        dolore magna aliqua. Ut enim ad min
                      </p>
                    </div>
                  </div>
                </div>
              </div>
              <div className="tree-img" data-aos="fade-up">
                <img src="assets/img/tree.png" alt="" />
              </div>
              <div className="mint-footer-img" data-aos="fade-up">
                <img src="assets/img/mint-f.png" alt="" />
              </div>
            </div>
            {/* =============mint section end ==================== */}

            <div className="video">
              <div className="container">
                <div className="row justify-content-center">
                  <div className="col-md-8">
                    <div className="video-content">
                      <video controls loop>
                        <source
                          src="https://res.cloudinary.com/dpxhwcs6p/video/upload/v1646768410/shark/Promotional_Video_kochn7.mp4"
                          type="video/mp4"
                        />
                      </video>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            {/* =============road map area ========================== */}
            <div className="roadmap">
              <div className="container">
                <div className="row justify-content-center">
                  <div className="col-lg-10">
                    <div className="row">
                      <div className="section-title cpb-6">
                        <h2 className="sec-title">ROADMAP</h2>
                      </div>
                    </div>
                    <div className="row">
                      <div className="col-12 mb-4" data-aos="fade-up">
                        <div className="road-map-card">
                          <div className="row col-revers">
                            <div className="col-lg-7">
                              <p className="road-map-text">
                                Community! Community! Community! We are nothing
                                without all of you! Community is everything.
                                We're looking forward to meeting, creating, and
                                learning from all of you!
                              </p>
                            </div>
                            <div className="col-lg-5">
                              <div className="road-map-img">
                                <img
                                  src="assets/img/1.png"
                                  className="img-a"
                                  alt=""
                                />
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="col-12 mb-4" data-aos="fade-up">
                        <div className="road-map-card">
                          <div className="row">
                            <div className="col-lg-5">
                              <div className="road-map-img-l">
                                <img
                                  src="assets/img/2.png"
                                  className="img-b"
                                  alt=""
                                />
                              </div>
                            </div>
                            <div className="col-lg-7">
                              <p className="road-map-text">
                                COLLECTION LAUNCH 10,000 Sharks will finally be
                                stampeding their way into the Ocean!
                              </p>
                            </div>
                          </div>
                        </div>
                      </div>

                      <div className="col-12 mb-4" data-aos="fade-up">
                        <div className="road-map-card">
                          <div className="row col-revers">
                            <div className="col-lg-7">
                              <p className="road-map-text">
                                After launch we will be having a lot giveaways
                                in our Discord server.
                              </p>
                            </div>
                            <div className="col-lg-5">
                              <div className="road-map-img">
                                <img
                                  src="assets/img/3.png"
                                  className="img-c"
                                  alt=""
                                />
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="col-12 mb-4" data-aos="fade-up">
                        <div className="road-map-card">
                          <div className="row">
                            <div className="col-lg-5">
                              <div className="road-map-img-l">
                                <img
                                  src="assets/img/4.png"
                                  className="img-d"
                                  alt=""
                                />
                              </div>
                            </div>
                            <div className="col-lg-7">
                              <p className="road-map-text">
                                5% of every single sale will be donated to the V
                                Foundation for Cancer Research.
                              </p>
                            </div>
                          </div>
                        </div>
                      </div>

                      <div className="col-12 mb-4" data-aos="fade-up">
                        <div className="road-map-card">
                          <div className="row col-revers">
                            <div className="col-lg-7">
                              <p className="road-map-text">
                                After the whole collection sold out, we’ll
                                celebrate by giving every Wicked Shark holder a
                                free Sharkholic NFT (our next collection).
                              </p>
                            </div>
                            <div className="col-lg-5">
                              <div className="road-map-img">
                                <img
                                  src="assets/img/5.png"
                                  className="img-e"
                                  alt=""
                                />
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            {/* =============road map area ========================== */}

            {/* ======================bot area ======================= */}
            <div className="bot-area">
              <div className="container">
                <div className="row">
                  <div className="both-img">
                    <img src="assets/img/both.png" data-aos="fade-up" alt="" />
                    <div className="cloud-img" data-aos="zoom-in">
                      <img src="assets/img/cloud.png" alt="" />
                    </div>
                  </div>
                </div>
              </div>
            </div>
            {/* ======================bot area ======================= */}

            {/* =====================our team=================== */}
            <div className="team-area">
              <div className="container">
                <div className="section-title cpy-6">
                  <h2 className="sec-title">OUR TEAM</h2>
                </div>
                <div className="row justify-content-center">
                  <div className="col-md-4 col-lg-3 col-sm-6 mb-4">
                    <div className="team-card" data-aos="fade-up">
                      <div className="team-img">
                        <img src="assets/img/team-1.png" alt="" />
                      </div>
                      <div className="member-details">
                        <div className="membar-title">
                          <p>FOUNDER</p>
                        </div>
                        <h4 className="name">Dr.Abdul Hadi</h4>
                      </div>
                    </div>
                  </div>
                  <div className="col-md-4 col-lg-3 col-sm-6 mb-4">
                    <div className="team-card" data-aos="fade-up">
                      <div className="team-img">
                        <img src="assets/img/team-2.png" alt="" />
                      </div>
                      <div className="member-details">
                        <div className="membar-title">
                          <p>CO-FOUNDER</p>
                        </div>
                        <h4 className="name">Hussain Ali</h4>
                      </div>
                    </div>
                  </div>
                  <div className="col-md-4 col-lg-3 col-sm-6 mb-4">
                    <div className="team-card" data-aos="fade-up">
                      <div className="team-img">
                        <img src="assets/img/team-3.png" alt="" />
                      </div>
                      <div className="member-details">
                        <div className="membar-title">
                          <p>ARTIST</p>
                        </div>
                        <h4 className="name">Abdul Aziz Harbi</h4>
                      </div>
                    </div>
                  </div>
                  <div className="col-md-4 col-lg-3 col-sm-6 mb-4">
                    <div className="team-card" data-aos="fade-up">
                      <div className="team-img">
                        <img src="assets/img/team-4.png" alt="" />
                      </div>
                      <div className="member-details">
                        <div className="membar-title">
                          <p>MARKETING MANAGER</p>
                        </div>
                        <h4 className="name">Ali Sultan</h4>
                      </div>
                    </div>
                  </div>
                  <div className="col-md-4 col-lg-3 col-sm-6 mb-4">
                    <div className="team-card" data-aos="fade-up">
                      <div className="team-img">
                        <img src="assets/img/team-5.png" alt="" />
                      </div>
                      <div className="member-details">
                        <div className="membar-title">
                          <p>COMMUNITY OUTREACH</p>
                        </div>
                        <h4 className="name">Mohammed Ali</h4>
                      </div>
                    </div>
                  </div>
                  <div className="col-md-4 col-lg-3 col-sm-6 mb-4">
                    <div className="team-card" data-aos="fade-up">
                      <div className="team-img">
                        <img src="assets/img/team-6.png" alt="" />
                      </div>
                      <div className="member-details">
                        <div className="membar-title">
                          <p>ADVISOR</p>
                        </div>
                        <h4 className="name">Muhammed Furaydi</h4>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            {/* =====================our team=================== */}
            {/* ====================faq====================== */}
            <div className="faq-area">
              <div className="container">
                <div className="row justify-content-center">
                  <div className="col-md-10">
                    <div className="section-title cpy-6">
                      <h2 className="sec-title">FREQUENTLY ASKED QUESTIONS</h2>
                    </div>

                    <div className="row ">
                      {faqs.map((item, index) => (
                        <div
                          key={index}
                          className={`faq-item col-md-12 ${
                            faqIndex === index ? "active" : ""
                          }`}
                        >
                          <div
                            className="question"
                            onClick={() => {
                              if (faqIndex === index) {
                                setFaqIndex();
                              } else {
                                setFaqIndex(index);
                              }
                            }}
                          >
                            <h3>{item.question}</h3>
                            <svg
                              width="25"
                              height="20"
                              viewBox="0 0 36 25"
                              fill="none"
                              xmlns="http://www.w3.org/2000/svg"
                            >
                              <path
                                d="M18 25L0.679491 0.250001L35.3205 0.250004L18 25Z"
                                fill="#0F1134"
                              />
                            </svg>
                          </div>
                          <div className="answer">
                            <p>{item.answer}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
            {/* ====================faq end====================== */}

            {/* ================footer================ */}

            <div className="footer">
              <div className="container">
                <div className="row">
                  <div className="footer-content">
                    <div className="footer-social">
                      <ul className="social-ul">
                        <li>
                          <a
                            href="https://twitter.com/wickedsharkclub"
                            className="social-link"
                          >
                            <svg
                              width="39"
                              height="39"
                              viewBox="0 0 39 39"
                              fill="none"
                              xmlns="http://www.w3.org/2000/svg"
                            >
                              <path
                                d="M19.7363 0.691406C9.24392 0.691406 0.736328 9.199 0.736328 19.6914C0.736328 30.1838 9.24392 38.6914 19.7363 38.6914C30.2287 38.6914 38.7363 30.1838 38.7363 19.6914C38.7363 9.199 30.2287 0.691406 19.7363 0.691406ZM28.8674 15.0135C28.8801 15.2128 28.8801 15.4206 28.8801 15.6242C28.8801 21.8501 24.1386 29.0218 15.4741 29.0218C12.8022 29.0218 10.3254 28.2456 8.23878 26.9097C8.62048 26.9521 8.98521 26.9691 9.37539 26.9691C11.5807 26.9691 13.608 26.2227 15.2238 24.9588C13.1542 24.9164 11.4153 23.5593 10.8216 21.6932C11.5468 21.7992 12.1999 21.7992 12.9464 21.6084C11.8807 21.3919 10.9229 20.8131 10.2355 19.9704C9.54825 19.1277 9.17388 18.073 9.17606 16.9856V16.9262C9.7995 17.2782 10.5332 17.4945 11.3008 17.5242C10.6555 17.0942 10.1263 16.5115 9.7601 15.8279C9.3939 15.1443 9.20203 14.381 9.20151 13.6055C9.20151 12.7276 9.43052 11.926 9.84191 11.2305C11.0248 12.6866 12.5008 13.8775 14.174 14.7258C15.8473 15.5741 17.6803 16.0609 19.554 16.1544C18.8881 12.9523 21.2801 10.361 24.1555 10.361C25.5127 10.361 26.7341 10.9294 27.595 11.8454C28.6595 11.6461 29.6774 11.2474 30.585 10.7131C30.233 11.803 29.495 12.7233 28.5153 13.3044C29.4653 13.2026 30.3814 12.9396 31.2296 12.5706C30.5892 13.5122 29.7877 14.3477 28.8674 15.0135V15.0135Z"
                                fill="white"
                              />
                            </svg>
                          </a>
                        </li>
                        <li>
                          <a
                            href="https://www.instagram.com/wickedsharkclub"
                            className="social-link"
                          >
                            <svg
                              width="40"
                              height="39"
                              viewBox="0 0 40 39"
                              fill="none"
                              xmlns="http://www.w3.org/2000/svg"
                            >
                              <path
                                fill-rule="evenodd"
                                clip-rule="evenodd"
                                d="M20.1345 38.6909C30.8187 38.6909 39.48 30.0296 39.48 19.3455C39.48 8.66125 30.8187 0 20.1345 0C9.45032 0 0.789062 8.66125 0.789062 19.3455C0.789062 30.0296 9.45032 38.6909 20.1345 38.6909ZM14.7129 6.24535C16.1156 6.18409 16.5645 6.16797 20.1344 6.16797H20.1311C23.706 6.16797 24.1516 6.18409 25.5559 6.24535C26.9552 6.30822 27.9122 6.52586 28.7509 6.84506C29.6289 7.16852 30.4242 7.67639 31.0809 8.33305C31.7501 8.97737 32.268 9.75691 32.5987 10.6174C32.9226 11.4364 33.1446 12.3746 33.2104 13.7466C33.2729 15.1233 33.2893 15.5618 33.2893 19.0649C33.2893 22.5681 33.2729 23.0066 33.2104 24.3817C33.1446 25.7552 32.9226 26.6919 32.5987 27.5125C32.2616 28.3604 31.8127 29.0794 31.0809 29.7968C30.4245 30.4531 29.6299 30.9609 28.7525 31.2848C27.9155 31.604 26.9569 31.82 25.5575 31.8845C24.1532 31.9458 23.7076 31.9619 20.1344 31.9619C16.5612 31.9619 16.1139 31.9458 14.7096 31.8845C13.3086 31.8217 12.3549 31.604 11.5163 31.2848C10.6514 30.9559 9.91797 30.5142 9.18787 29.7968C8.45613 29.0794 8.00722 28.3604 7.67013 27.5125C7.34454 26.6919 7.1242 25.7552 7.05842 24.3817C6.99594 23.0066 6.97949 22.5681 6.97949 19.0665C6.97949 15.5618 6.99594 15.1233 7.05842 13.7449C7.12255 12.3746 7.34454 11.4364 7.67013 10.6174C8.00082 9.75694 8.51874 8.97741 9.18787 8.33305C9.84478 7.67663 10.64 7.1688 11.5179 6.84506C12.3549 6.52586 13.3103 6.30984 14.7129 6.24535ZM20.136 8.49265H18.9554V8.48942C16.5036 8.49104 16.0334 8.50716 14.8198 8.56197C13.5372 8.62001 12.8416 8.82958 12.3779 9.00691C11.7629 9.24067 11.3255 9.51957 10.8651 9.97096C10.4047 10.4224 10.1186 10.8528 9.88015 11.4541C9.69927 11.9087 9.4855 12.5923 9.4263 13.8497C9.36382 15.2087 9.35066 15.615 9.35066 19.0585C9.35066 22.5036 9.36382 22.9115 9.4263 24.2705C9.48386 25.5279 9.69927 26.2115 9.8785 26.6645C10.0902 27.2249 10.4273 27.7318 10.8651 28.1476C11.2896 28.5758 11.8065 28.9052 12.3779 29.1117C12.8416 29.289 13.5372 29.4986 14.8198 29.5566C16.206 29.6179 16.6237 29.6324 20.136 29.6324C23.6484 29.6324 24.0644 29.6179 25.4506 29.5566C26.7349 29.4986 27.4321 29.289 27.8925 29.1117C28.5075 28.8779 28.9449 28.599 29.4053 28.1476C29.8428 27.7324 30.1794 27.2261 30.3903 26.6661C30.5695 26.2115 30.7849 25.5295 30.8425 24.2721C30.9066 22.9131 30.9198 22.5036 30.9198 19.0617C30.9198 15.6198 30.9066 15.212 30.8425 13.853C30.7849 12.5955 30.5712 11.912 30.3903 11.459C30.1519 10.856 29.8674 10.4272 29.407 9.9758C28.9465 9.52441 28.5075 9.2439 27.8941 9.01014C27.4304 8.83442 26.7332 8.62323 25.4506 8.5668C24.0644 8.50393 23.6484 8.49265 20.136 8.49265ZM26.5534 10.7514C26.7449 10.6736 26.9502 10.6335 27.1575 10.6335C27.5761 10.6335 27.9777 10.7966 28.2737 11.0868C28.5697 11.3771 28.7361 11.7707 28.7361 12.1812C28.7361 12.5916 28.5697 12.9853 28.2737 13.2755C27.9777 13.5658 27.5761 13.7288 27.1575 13.7288C26.9502 13.7288 26.7449 13.6888 26.5534 13.611C26.3619 13.5332 26.1878 13.4192 26.0412 13.2755C25.8947 13.1318 25.7784 12.9612 25.699 12.7734C25.6197 12.5857 25.5789 12.3844 25.5789 12.1812C25.5789 11.9779 25.6197 11.7767 25.699 11.5889C25.7784 11.4012 25.8947 11.2305 26.0412 11.0868C26.1878 10.9431 26.3619 10.8291 26.5534 10.7514ZM17.5182 12.9165C18.3501 12.5898 19.24 12.4286 20.136 12.4423C21.9096 12.4695 23.6011 13.1792 24.8455 14.4184C26.0899 15.6576 26.7873 17.3268 26.7873 19.0657C26.7873 20.8047 26.0899 22.4739 24.8455 23.7131C23.6011 24.9523 21.9096 25.662 20.136 25.6891C19.24 25.7029 18.3501 25.5417 17.5182 25.215C16.6863 24.8882 15.929 24.4026 15.2904 23.7862C14.6517 23.1698 14.1446 22.435 13.7984 21.6246C13.4522 20.8142 13.274 19.9443 13.274 19.0657C13.274 18.1871 13.4522 17.3173 13.7984 16.5069C14.1446 15.6965 14.6517 14.9617 15.2904 14.3453C15.929 13.7289 16.6863 13.2432 17.5182 12.9165ZM23.2371 16.0247C22.4146 15.2184 21.2992 14.7654 20.136 14.7654C18.9729 14.7654 17.8575 15.2184 17.035 16.0247C16.2126 16.831 15.7505 17.9246 15.7505 19.0649C15.7505 20.2052 16.2126 21.2988 17.035 22.1052C17.8575 22.9115 18.9729 23.3645 20.136 23.3645C21.2992 23.3645 22.4146 22.9115 23.2371 22.1052C24.0595 21.2988 24.5216 20.2052 24.5216 19.0649C24.5216 17.9246 24.0595 16.831 23.2371 16.0247Z"
                                fill="white"
                              />
                            </svg>
                          </a>
                        </li>
                        <li>
                          <a
                            href="https://opensea.io/collection/wicked-shark-club"
                            className="social-link"
                          >
                            <svg
                              width="39"
                              height="39"
                              viewBox="0 0 39 39"
                              fill="none"
                              xmlns="http://www.w3.org/2000/svg"
                            >
                              <path
                                fill-rule="evenodd"
                                clip-rule="evenodd"
                                d="M19.1543 38.1681C29.6936 38.1681 38.2384 29.6233 38.2384 19.084C38.2384 8.5448 29.6958 0 19.1543 0C8.61511 0 0.0703125 8.5448 0.0703125 19.084C0.0703125 29.6233 8.61511 38.1681 19.1543 38.1681ZM14.0268 25.9813C17.6919 25.9813 20.663 23.0102 20.663 19.3452C20.663 15.6801 17.6919 12.709 14.0268 12.709C10.3617 12.709 7.39062 15.6801 7.39062 19.3452C7.39062 23.0102 10.3617 25.9813 14.0268 25.9813ZM26.8567 19.3451C26.8567 23.0102 25.6683 25.9813 24.2023 25.9813C22.7362 25.9813 21.5478 23.0102 21.5478 19.3451C21.5478 15.6801 22.7362 12.709 24.2023 12.709C25.6683 12.709 26.8567 15.6801 26.8567 19.3451ZM29.0684 25.9813C29.8015 25.9813 30.3957 23.0102 30.3957 19.3452C30.3957 15.6801 29.8015 12.709 29.0684 12.709C28.3354 12.709 27.7412 15.6801 27.7412 19.3452C27.7412 23.0102 28.3354 25.9813 29.0684 25.9813Z"
                                fill="white"
                              />
                            </svg>
                          </a>
                        </li>
                      </ul>
                    </div>
                    <p className="footer-des">
                      Brought To You By
                      <a
                        href="https://www.nftconstructer.com/"
                        className="dev-link"
                      >
                        <img
                          src="assets/img/creator.svg"
                          alt=""
                          className="nft-logo"
                        />
                        NFT Constractor
                      </a>
                    </p>
                    <p className="footer-des">
                      Wicked Shark Club 2021. All Rights Reserved
                    </p>
                  </div>
                </div>
              </div>
            </div>
            {/* ================footer end================ */}
          </div>
        </div>
      </div>
    </>
  );
}
export default Home;
