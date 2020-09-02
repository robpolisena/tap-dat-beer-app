import React, { useState, useEffect, Fragment } from "react";
import logo from "./logo.svg";
import Navbar from "./components/Navbar/Navbar";
import Login from "./components/Login/Login";
import axios from "axios";

import "./App.css";
import Register from "./components/Register/Register";
import Banner from "./components/Banner/Banner";
import Category from "./components/Category/Category";
import CategoryList from "./components/Category/CategoryList";
import ProductDetail from "./components/ProductDetail/ProductDetail";
import Search from "./components/Search/Search";
import Review from "./components/ReviewForm/Review";
import Account from "./components/Account/Account";
import Wishlist from "./components/Wishlist/Wishlist";
import ShareOption from "./components/ShareOption/ShareOption";
import Button from "@material-ui/core/Button";
import Snackbar from "./components/Small-Components/Snackbar";
import MyAccount from "./components/Account/MyAccount";
import CustomAlert from "./components/Alert/CustomAlert";
import Scanner from "./components/Scanner/Scanner";
import BeerCategoryRow from "./components/BeerCategory/BeerCategoryRow";

function App() {
  const [registerOpen, setRegisterOpen] = useState(false);
  const [loginOpen, setLoginOpen] = useState(false);
  const [beerDetailOpen, setBeerDetailOpen] = useState(false);
  const [accuontOpen, setAccuontOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [popularSearch, setPopularSearch] = useState([]);
  const [reviewOpen, setReviewOpen] = useState(false);
  const [shareOpen, setShareOpen] = useState(false);
  const [myWishlistOpen, setMyWishlistOpen] = useState(false);
  const [myReviewsOpen, setMyReviewsOpen] = useState(false);
  const [userNote, setUserNote] = useState(false);
  const [errMessage, setErrMessage] = useState(null);
  const [scannerOpen, setScannerOpen] = useState(false);

  const [state, setState] = useState({
    firstName: null,
    lastName: null,
    email: null,
    password: null,
    passwordConfirmation: null,
    currentUser: null,
    beers: [],
    currentBeer: {},
    currentBeerReviews: [],
    currentWishList: [],
    recommendedBeers: [],
    recentlyViewed: [],
  });
  const [openSB, setOpenSB] = useState(false);
  const [textSB, setTextSB] = useState(false);

  const handleClickSB = (text) => {
    setOpenSB(true);
    setTextSB(text);
  };

  const handleCloseSB = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    setOpenSB(false);
  };
  const filterBeerCategories = () => {
    const categories = [];

    state.beers.forEach((beer) => {
      if (!categories.includes(beer.type)) {
        categories.push(beer.type);
      }
    });
    console.log("categories function: ", categories);
    return categories;
  };

  const beersByCategory = (category) => {
    const beerListCategory = state.beers.filter(
      (beer) => beer.type === category
    );
    return beerListCategory;
  };
  const onChangeSearch = (e) => {
    setSearchQuery(e.target.value);
  };

  const handleSearchOpen = (e) => {
    setSearchOpen(true);
    return axios
      .get("/api/search/analytics")
      .then((data) => setPopularSearch(data.data.finalData))
      .catch((e) => null);
  };
  const handleSearchClose = (e) => {
    setSearchOpen(false);
  };

  const handleShareOptionOpen = (e) => {
    setShareOpen(true);
  };

  const handleShareOptionClose = (e) => {
    setShareOpen(false);
  };

  const handleReviewOpen = (e) => {
    setReviewOpen(true);
  };

  const handleReviewClose = (e) => {
    setReviewOpen(false);
  };

  const handleLoginOpen = (e) => {
    console.log("Open Login modal");
    setLoginOpen(true);
  };

  const handleLoginChange = (e) => {
    e.persist();
    setState((prev) => ({
      ...prev,
      [e.target.name]: e.target.value.trim(),
    }));
  };

  const handleLoginClose = (e) => {
    setLoginOpen(false);
    setState((prev) => ({
      ...prev,
      email: null,
      password: null,
    }));
    setErrMessage(null);
  };

  const handleLoginSubmit = (e) => {
    e.preventDefault();
    console.log("Here");

    if (!state.email || !state.password) {
      setErrMessage("Please fill out both fields to login");
      return;
    }
    return axios
      .post("/api/login", {
        email: state.email,
        password: state.password,
      })
      .then((data) => {
        console.log("login promise data:  ", data);
        setState((prev) => ({
          ...prev,
          currentUser: data.data.user,
        }));
        handleLoginClose();
      })
      .catch((err) => {
        setErrMessage("Invalid email or password");
      });
  };

  const handleRegisterOpen = (e) => {
    console.log("Open Register modal");
    // Uncomment this when the modal is here:
    setRegisterOpen(true);
  };

  const handleRegisterChange = (e) => {
    e.persist();
    console.log("e.target.value", e.target.value);
    console.log("e.target.name", e.target.name);
    setState((prev) => ({
      ...prev,
      [e.target.name]: e.target.value.trim(),
    }));
  };

  const handleRegisterClose = (e) => {
    setRegisterOpen(false);
    setState((prev) => ({
      ...prev,
      firstName: null,
      lastName: null,
      email: null,
      password: null,
    }));
    setErrMessage(null);
  };

  useEffect(() => {
    axios
      .get(`/api/search?q=${encodeURI(searchQuery)}`)
      .then((data) => {
        setSearchResults(data.data.data);
      })
      .catch((e) => console.log("Error on search query:", e));
  }, [searchQuery]);

  const handleRegisterSubmit = (e) => {
    e.preventDefault();

    if (
      !state.firstName ||
      !state.lastName ||
      !state.email ||
      !state.password ||
      !state.passwordConfirmation
    ) {
      setErrMessage("Please fill out all fields");
      return;
    } else if (state.password !== state.passwordConfirmation) {
      setErrMessage("Passwords do not match");
      return;
    }

    const newUser = {
      firstName: state.firstName,
      lastName: state.lastName,
      email: state.email,
      password: state.password,
    };
    return axios
      .post("/api/register", newUser)
      .then((data) => {
        console.log("Register promise data: ", data);
        setState((prev) => ({
          ...prev,
          currentUser: data.data.user,
        }));
        handleRegisterClose();
      })
      .catch((err) => {
        setErrMessage("That email already exists");
      });
  };

  const handleLogout = (e) => {
    e.preventDefault();

    console.log("Logout clicked");
    return axios.post("/api/logout").then((data) => {
      setState((prev) => ({
        ...prev,
        currentUser: null,
        currentWishList: [],
      }));
      handleClickSB(`You are now logged out`);
    });
  };

  const handleClickFromSearchResult = (id) => {
    handleBeerDetailClick(id);

    const body = {
      beer_id: id,
      query: searchQuery,
      user_id: state.currentUser && state.currentUser.id,
    };
    return axios
      .post("/api/search/analytics", body)
      .then((data) => console.log("added search analytics:", data))
      .catch((e) => console.log("Search analytics failed", e));
  };

  const isBeerInRecentlyViewedList = (id) => {
    const filteredList = state.recentlyViewed.filter((beer) => beer.id === id);
    return filteredList;
  };
  const handleBeerDetailClick = async (id) => {
    setBeerDetailOpen(true);
    let userId = null;
    if (state.currentUser) {
      userId = state.currentUser.id;
    }

    if (isBeerInRecentlyViewedList(id).length === 0) {
      console.log("thijierotiejotjeroitjeorijt");
      await axios.post("/api/search/analytics", {
        user_id: userId,
        beer_id: id,
      });
    }

    return axios.get(`/api/beers/${id}`).then((data) => {
      console.log("single beer data: ", data.reviews);
      setState((prev) => ({
        ...prev,
        currentBeer: data.data.beer,
        currentBeerReviews: data.data.reviews,
      }));
    });
  };

  const handleBeerDetailClose = (e) => {
    setBeerDetailOpen(false);

    setTimeout(() => {
      setState((prev) => ({
        ...prev,
        currentBeer: null,
        currentBeerReviews: [],
      }));
    }, 300);
  };

  const handleAccountOpen = (e) => {
    // Uncomment when modal is here
    const prevFirstName = state.currentUser.first_name;
    const prevLastName = state.currentUser.last_name;
    const prevEmail = state.currentUser.email;
    setState((prev) => ({
      ...prev,
      firstName: prevFirstName,
      lastName: prevLastName,
      email: prevEmail,
    }));
    setAccuontOpen(true);
    return axios.get("/api/reviews/user").then((res) => {
      setState((prev) => ({
        ...prev,
        currentBeerReviews: [...res.data.data],
      }));
    });
  };

  // Handle account detail change form submit
  const handleAccountChangeSubmit = (e) => {
    e.preventDefault();
    const newAccountDetails = {
      first_name: state.firstName,
      last_name: state.lastName,
      email: state.email,
      password: state.currentUser.password,
    };

    return axios
      .put("/api/user", newAccountDetails)
      .then((res) => {
        setState((prev) => ({
          ...prev,
          currentUser: res.data.data,
        }));
      })
      .catch((err) => console.log("Error Updating Account: ", err));
  };
  // Get list of beers wishlisted by the currently logged in user
  const handleMyWishlistOpen = (e) => {
    setMyWishlistOpen(true);

    return axios
      .get("/api/wishlists")
      .then((res) => {
        setState((prev) => ({
          ...prev,
          currentWishList: [...res.data.data],
        }));
      })
      .catch((err) => console.log("Error: ", err));
  };

  // Check if user has already wishlisted that beer
  const hasUserWishlistedBeer = (id) => {
    const filteredList = state.currentWishList.filter((beer) => {
      return id === beer.id;
    });
    return filteredList;
  };

  // Removes the deleted beer from the state list of currentWishlist
  const removeDeletedBeer = (id) => {
    const filteredList = state.currentWishList.filter((beer) => {
      return id !== beer.id;
    });
    return filteredList;
  };

  // Add an item to your wishlist if it isn't already liked
  const handleAddToWishlist = (e) => {
    if (!state.currentUser) {
      setLoginOpen(true);
      return;
    }

    // Check to see if the user has already wishlisted a beer
    // and remove it from the wishlist if they have
    if (hasUserWishlistedBeer(state.currentBeer.id).length > 0) {
      return axios
        .post("/api/wishlists/delete", {
          beer_id: state.currentBeer.id,
          user_id: state.currentUser.id,
        })
        .then((res) => {
          const newWishList = removeDeletedBeer(state.currentBeer.id);
          setState((prev) => ({
            ...prev,
            currentWishList: [...newWishList],
          }));
          handleClickSB(
            `${state.currentBeer.name} was removed from your wishlist`
          );
        });
    }

    if (state.currentUser && state.currentBeer) {
      return axios
        .post("/api/wishlists", {
          beer_id: state.currentBeer.id,
          user_id: state.currentUser.id,
        })
        .then((res) => {
          const newWishList = [...state.currentWishList, state.currentBeer];
          setState((prev) => ({
            ...prev,
            currentWishList: newWishList,
          }));
          handleClickSB(`${state.currentBeer.name} was saved to wishlist`);
        })
        .catch((err) => console.log("err, ", err));
    }
  };

  const handleMyReviewsOpen = (e) => {
    // setMyReviewsOpen(true);
    console.log("review");
  };
  // Sort beers by highest rated
  const sortTopBeers = () => {
    const beers = [...state.beers];

    beers.sort((a, b) => {
      return Number(a.avg_rank) - Number(b.avg_rank);
    });
    return beers.reverse();
  };

  // Sort beers by most reviewed
  const sortReviewedBeers = () => {
    const beers = [...state.beers];
    beers.sort((a, b) => {
      return a.num_reviews - b.num_reviews;
    });
    return beers.reverse();
  };

  // Open scanner
  const handleScannerOpen = (e) => {
    setScannerOpen(true);
  };

  const handleScannerClose = (e) => {
    setScannerOpen(false);
  };

  // Get all the beers once the home page is loaded
  useEffect(() => {
    Promise.resolve(axios.get("/api/beers"))
      .then((res) => {
        console.log("beers api :", res.data.data);
        setState((prev) => ({
          ...prev,
          beers: [...res.data.data],
        }));
      })
      .catch((err) => {
        console.log("Error getting beers: ", err);
      });
  }, []);

  useEffect(() => {
    Promise.resolve(axios.get("/api/user")).then((data) => {
      setState((prev) => ({
        ...prev,
        currentUser: data.data.data,
      }));
    });
  }, []);
  useEffect(() => {
    Promise.all([
      Promise.resolve(axios.get("/api/wishlists")),
      Promise.resolve(axios.get("/api/beers/recommendations")),
      Promise.resolve(axios.get("/api/beers/recently")),
    ])
      .then((all) => {
        setState((prev) => ({
          ...prev,
          currentWishList: [...all[0].data.data],
          recommendedBeers: [...all[1].data.data],
          recentlyViewed: [...all[2].data.data],
        }));
      })
      .then((res) => {
        return axios.get("/api/beers/recommendations");
      })
      .then((res) => {
        console.log("res recommendation: ", res);
        // setState((prev) => ({
        //   ...prev,
        //   recommendedBeers: [...res.data.data],
        // }));
      })
      .catch((err) => {
        console.log("Error getting beers: ", err);
      });
  }, [state.currentUser]);
  console.log("State.recommeneded", state.recommendedBeers);
  return (
    <div className="App">
      <Navbar
        handleSearchOpen={handleSearchOpen}
        handleRegisterOpen={handleRegisterOpen}
        handleLoginOpen={handleLoginOpen}
        currentUser={state.currentUser}
        handleLogout={handleLogout}
        handleAccountOpen={handleAccountOpen}
        handleMyWishlistOpen={handleMyWishlistOpen}
        handleMyReviewsOpen={handleMyReviewsOpen}
        handleScannerOpen={handleScannerOpen}
      />
      <Login
        open={loginOpen}
        onChange={handleLoginChange}
        handleClose={handleLoginClose}
        onSubmit={handleLoginSubmit}
        errMessage={errMessage}
      />
      <Register
        open={registerOpen}
        onChange={handleRegisterChange}
        handleClose={handleRegisterClose}
        onSubmit={handleRegisterSubmit}
        errMessage={errMessage}
      />

      <Banner />

      {state.currentUser && (
        <Fragment>
          {state.recommendedBeers.length != 0 && (
            <Category
              category={"Recommended"}
              beers={state.recommendedBeers}
              onClick={handleBeerDetailClick}
            />
          )}
          {state.recentlyViewed.length != 0 && (
            <Category
              category={"Recently Viewed"}
              beers={state.recentlyViewed}
              onClick={handleBeerDetailClick}
            />
          )}
        </Fragment>
      )}
      {state.beers.length > 0 && (
        <Fragment>
          <Category
            category={"Top Rated Beers"}
            beers={sortTopBeers()}
            onClick={handleBeerDetailClick}
          />
          {/* <Category category={"Most Wanted"} beers={sortWishlistedBeers()} /> */}
          <Category
            category={"Most Reviewed"}
            beers={sortReviewedBeers()}
            onClick={handleBeerDetailClick}
          />
        </Fragment>
      )}
      <BeerCategoryRow />
      {state.beers.length > 0 &&
        filterBeerCategories().map((type) => {
          return (
            <Category
              category={type}
              beers={beersByCategory(type)}
              onClick={handleBeerDetailClick}
            />
          );
        })}

      {state.currentBeer && (
        <ProductDetail
          open={beerDetailOpen}
          handleClose={handleBeerDetailClose}
          currentBeer={state.currentBeer}
          beers={state.beers}
          reviews={state.currentBeerReviews}
          openForm={handleReviewOpen}
          currentUser={state.currentUser}
          handleAddToWishlist={handleAddToWishlist}
          handleShareOptionOpen={handleShareOptionOpen}
          userNote={userNote}
          setOpenSB={handleClickSB}
          onClick={handleBeerDetailClick}
          setUserNote={setUserNote}
        />
      )}
      <Search
        popularSearch={popularSearch}
        onChangeSearch={onChangeSearch}
        searchQuery={searchQuery}
        open={searchOpen}
        close={handleSearchClose}
        searchResults={searchResults}
        onClick={handleClickFromSearchResult}
      />
      <h1>TAP DAT BEER APP</h1>
      <Review
        currentBeer={state.currentBeer}
        open={reviewOpen}
        close={handleReviewClose}
      />
      <ShareOption open={shareOpen} close={handleShareOptionClose} />

      <Wishlist
        open={myWishlistOpen}
        close={() => setMyWishlistOpen(false)}
        beers={state.currentWishList}
        onClick={handleBeerDetailClick}
      />
      <Snackbar handleClose={handleCloseSB} open={openSB} textSB={textSB} />
      {state.firstName && state.currentUser && (
        <MyAccount
          firstNameBeforeUpdate={state.currentUser.first_name}
          lastNameBeforeUpdate={state.currentUser.last_name}
          first_name={state.firstName}
          last_name={state.lastName}
          email={state.email}
          open={accuontOpen}
          handleClose={() => setAccuontOpen(false)}
          handleAccountChange={handleRegisterChange}
          beers={state.currentWishList}
          reviews={state.currentBeerReviews}
          onSubmit={handleAccountChangeSubmit}
        />
      )}
      <Scanner
        open={scannerOpen}
        handleClose={handleScannerClose}
        openBeer={handleBeerDetailClick}
        beers={state.beers}
      />
    </div>
  );
}

export default App;
