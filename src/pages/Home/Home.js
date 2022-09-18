import axios from "axios";
import React, { useEffect, useState } from "react";
import search from '../../assets/assets_Homework_Front-End_01/search-copy@3x.png';
import arrow from '../../assets/assets_Homework_Front-End_01/path-copy-7.png';
import "./Home.scss";
import JokeCard from "../../components/JokeCard/JokeCard";
import { useParams } from "react-router";
import { AiOutlineStop } from "react-icons/ai"

const Home = () => {
    const { item } = useParams();

    const [allCategories, setAllCategories] = useState();
    const [categories, setCategories] = useState();
    const [selectedCategory, setSelectedCategory] = useState("");
    const [toggle, setToggle] = useState(false);
    const [keyword, setKeyword] = useState('');
    const [jokes, setJokes] = useState();
    const [loadedJokes, setLoadedJokes] = useState();
    const [, setIsPending] = useState(false);
    
    const searchByCategory = (category) => {
        setToggle(false)
        setSelectedCategory(category.toUpperCase())
        // console.log(test.filter(element => (element.categories.find(el => el === category)) !== undefined))   
        axios.get(`https://api.chucknorris.io/jokes/search?query=all`)
            .then(res => {
                // console.log(res.data)
                const array1 = (res.data)["result"]
                // console.log(array1);
                setJokes(array1.filter(element => (element.categories.find(el => el === category)) !== undefined))
                const array2 = (array1.filter(element => (element.categories.find(el => el === category)) !== undefined))
                // console.log(array2);
                if (array2.length > 6) {
                    setLoadedJokes(array2.slice(0, 6));
                } else {
                    setLoadedJokes(array2);
                }
                setIsPending(false)
            })
            .catch(err => {
                console.log(err)
            })
    }
    const research = () => {
        // console.log(Keyword);
        if (keyword === '') {
            axios.get(`https://api.chucknorris.io/jokes/search?query=all`)
                .then(res => {
                    // console.log(res.data)
                    setJokes(res.data["result"])
                    setLoadedJokes((res.data["result"]).slice(0, 6));
                    setIsPending(false)
                })
                .catch(err => {
                    console.log(err)
                })
        } else {
            axios.get(`https://api.chucknorris.io/jokes/search?query=${keyword}`)
                .then(res => {
                    // console.log(res.data)
                    setJokes(res.data["result"])
                    setLoadedJokes((res.data["result"]).slice(0, 6));
                    setIsPending(false)
                })
                .catch(err => {
                    console.log(err)
                })
        }
    }
    const LoadMore = () => {
        if (loadedJokes.length + 6 < jokes.length) {
            setLoadedJokes(jokes.slice(0, loadedJokes.length + 6))
        } else {
            setLoadedJokes(jokes)
        }

    }
    const hideShowCategories = () => {
        if (categories.length !== allCategories.length) {
            setCategories(allCategories)
        } else {
            setCategories(allCategories.slice(0, 7))
        }
    }
    const colors = [

        "rgb(51, 255,   0)",
        "#a3fcb3",
        "rgb(204, 255,   0)",
        "rgb(255, 255,   0)",
        "rgb(255, 204,   0)",
        "rgb(255, 102,   0)",
        "rgb(255,   0,   0)",
        "rgb(255,   0, 102)",
        "rgb(  0, 204, 255)",
        "#e3e891",
        "#92e8d5",
        "#96c8f2",
        "#ada8ff",
        "#ce94f7",
        "#ed94dd",
        "#fea8bb"
    ]
    useEffect(() => {
        console.log(item)
        axios.get("https://api.chucknorris.io/jokes/categories")
            .then(res => {
                // console.log(res.data)
                setAllCategories(res.data);
                setIsPending(false)
                setCategories((res.data).slice(0, 7))

                // console.log((AllCategories));
                // console.log(Categories);
            })
            .catch(err => {
                console.log(err)
            });
        if (item !== undefined) {
            axios.get(`https://api.chucknorris.io/jokes/search?query=${item}`)
                .then(res => {
                    setJokes(res.data["result"]);
                    setLoadedJokes((res.data["result"]).slice(0, 6));
                    // console.log(LoadedJokes);
                    setIsPending(false);
                })
                .catch(err => {
                    console.log(err)
                })
        } else {
            axios.get("https://api.chucknorris.io/jokes/search?query=all")
                .then(res => {
                    setJokes(res.data["result"]);
                    setLoadedJokes((res.data["result"]).slice(0, 6));
                    // console.log(LoadedJokes);
                    setIsPending(false);
                })
                .catch(err => {
                    console.log(err)
                })
        }


    }
        , [item]);

    return (
        <div>
            {/* <Navbar /> */}
            <div className="header">
                <h1 className="title">The Joke Bible</h1>
                <h2 className="sub-title">Daily Laughs for you and yours</h2>
                <div className="input-wrapper">
                    <input value={item} className="text-input" type="text" placeholder="How can we make you laugh today?" onChange={event => setKeyword(event.target.value)} />
                    <button onClick={() => research()}><img alt="" className='search' src={search} /></button>
                </div>
            </div>
            <div className="jokes-wrapper">
                <div className="jokes-buttons">
                    {categories && categories.map((category, index) => {
                        return (
                            <button key={index} onClick={() => searchByCategory(category)} style={{ backgroundColor: colors[index] }}>{category.toUpperCase()}</button>
                        );
                    }
                    )}
                    {categories && categories.length !== allCategories.length && (
                        <button className="viewAll" onClick={() => hideShowCategories()}>VIEW ALL<span><img alt="" className='arrow' src={arrow} /></span></button>
                    )}
                    {categories && categories.length === allCategories.length && (
                        <button className="viewAll" onClick={() => hideShowCategories()}>VIEW LESS<span><img alt="" className='arrow Reversed' src={arrow} /></span></button>
                    )}
                </div>
                <div className="jokes-buttons-M">
                    <button className="btn" onClick={() => setToggle(!toggle)}>Choose a Category</button>
                    {toggle &&
                        <div className="popup-wrap">
                            {categories && categories.map((category, index) => {
                                return (
                                    <button key={index} onClick={() => searchByCategory(category)} style={{ backgroundColor: colors[index] }}>{category.toUpperCase()}</button>
                                );
                            }
                            )}
                            {categories && categories.length !== allCategories.length && (
                                <button className="viewAll" onClick={() => hideShowCategories()}>VIEW ALL<span><img alt="" className='arrow' src={arrow} /></span></button>
                            )}
                            {categories && categories.length === allCategories.length && (
                                <button className="viewAll" onClick={() => hideShowCategories()}>VIEW LESS<span><img alt="" className='arrow Reversed' src={arrow} /></span></button>
                            )}
                        </div>
                    }
                </div>
                <div className="jokes-cards-container">
                    <hr />
                    {selectedCategory !== "" && (
                        <p className="social">{selectedCategory}</p>
                    )}
                    {selectedCategory === "" && (
                        <p className="social">All JOKES</p>
                    )}
                    <div className="jokes-List">
                        {loadedJokes && loadedJokes.map((joke, index) => {
                            return (
                                <JokeCard key={index} Joke={joke} />
                            );
                        })}
                        {loadedJokes && loadedJokes.length === 0 &&
                            <div className="stop-wrapper">
                                <AiOutlineStop className="Stop" />
                                <h3>No Jokes Available</h3>
                            </div>
                        }
                    </div>
                    {loadedJokes && !(loadedJokes.length < 7 && loadedJokes.length === jokes.length) &&
                        <button className="viewAll" onClick={() => LoadMore()}>VIEW More<span><img alt="" className='arrow Reversed' src={arrow} /></span></button>
                    }

                </div>
            </div>
            {/* <Footer /> */}
        </div>
    );
}
export default Home;