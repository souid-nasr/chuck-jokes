import back from '../../assets/assets_Homework_Front-End_01/back.svg';
import axios from "axios";
import React, { useEffect, useState } from "react";
import arrow from '../../assets/assets_Homework_Front-End_02/arrow-left@3x.png';
import search from '../../assets/assets_Homework_Front-End_01/search-copy@3x.png';
import dislikeImg from '../../assets/assets_Homework_Front-End_01/hand-copy@3x.png';
import likeImg from '../../assets/assets_Homework_Front-End_01/hand@3x.png';
import "./JokeDescription.scss";
import { Link } from "react-router-dom";
import { useParams } from "react-router";


const JokeDescription = () => {
    const { id } = useParams();
    const [joke, setJoke] = useState("");
    const [jokes, setJokes] = useState("");
    const [like, setLike] = useState(365);
    const [dislike, setDislike] = useState(98);
    const [keyword, setKeyword] = useState('');

    const Disliked = () => {
        if (dislike === 98) {
            setDislike(99);
        } else {
            setDislike(98);
        }
    }
    const Liked = () => {
        if (like === 365) {
            setLike(366)
        } else {
            setLike(365)
        }
    }
    const Research = () => {
        window.location.replace("/" + keyword)

    }
    const NEXT = () => {
        // console.log(Jokes.findIndex((element) => element.id === id));
        const Index = jokes.findIndex((element) => element.id === id);
        const NextId = jokes[Index + 1]["id"];
        window.location.replace("/joke/" + NextId)

    }
    const PREV = () => {
        const Index = jokes.findIndex((element) => element.id === id);
        const prevId = jokes[Index -1]["id"];
        window.location.replace("/joke/" + prevId)
    }
    useEffect(() => {
        axios.get(`https://api.chucknorris.io/jokes/${id}`)
            .then(res => {
                setJoke(res.data);
                axios.get(`https://api.chucknorris.io/jokes/search?query=all`)
                    .then(r => {
                        const array = (r.data)["result"]
                        // console.log(r);
                        setJokes(array.filter(element => (element.categories.find(el => el === (res.data)["categories"][0])) !== undefined))
                    })
                    .catch(err => {
                        console.log(err)
                    })
            })
            .catch(err => {
                console.log(err)
            })
    }
        , [id]);

    return (
        <div>
            <div className="header">
                <h1 className="title">The Joke Bible</h1>
                <h2 className="sub-title">Daily Laughs for you and yours</h2>
                <div className="input-wrapper">
                    <input className="text-input" type="text" placeholder="How can we make you laugh today?" onChange={event => setKeyword(event.target.value)} />
                    <button onClick={() => Research()}><img alt='' className='search' src={search} /></button>
                </div>
            </div>
            <div className="JokeDescription">
                <div>
                    <Link className='Link' to="/" ><img alt='' className='arrow' src={arrow} /><img alt='' className='back' src={back} /></Link>
                </div>
                <div className='JokeDescription-wrapper'>
                    <div className='job-desc'>
                        <div className='job-'>
                            <div className='title-wrap'>
                                {joke&& joke["categories"][0]!==undefined&&
                                <li className="social">{joke["categories"][0].toUpperCase()}</li>
                            }
                            {jokes && joke["categories"][0]===undefined&& 
                                <li className="social">ALL JOKES</li>
                            }
                                <li className="TRENDING">TRENDING</li>
                            </div>
                            <div className='title'>

                                <h1>The Granny Joke</h1>
                                <h4>_________________ </h4>
                                <h4 className='No'>  NO #1</h4>
                            </div>
                            <p className='p'>{joke.value}</p>
                        </div>

                        <div className='like-dislike-container'>
                            <div className='like-dislike'>
                                <button className={like === 366 ? 'like like-press' : 'like'} onClick={Liked}>
                                    <img alt='' className='arrow' src={likeImg} />
                                    <p>{like}</p>
                                </button>
                                <button className={dislike === 99 ? 'dislike dislike-press' : 'dislike'} onClick={Disliked}>
                                    <img alt='' className='arrow' src={dislikeImg} />
                                    {dislike &&
                                        <p>{dislike}</p>
                                    }
                                </button>
                            </div>
                            <div className='prev-next'>
                            {jokes&& jokes.findIndex((element) => element.id === id)!==0&&<button onClick={PREV} ><span><img alt='' className='arrow-prev reversed' src={arrow} /></span>PREV JOKE</button>}
                                {jokes&& jokes.findIndex((element) => element.id === id)<(jokes.length-1)&&<button onClick={NEXT} className="right">NEXT JOKE<span><img alt='' className='arrow-next' src={arrow} /></span></button>}
                            </div>
                        </div>
                    </div>
                    <div className='top10'>
                        <h4>the top 10 jokes this week</h4>
                        <p>Smoking Joke</p>
                        <p>My Boss Joke</p>
                        <p>Dirty Millionaire Joke</p>
                        <p>The annoying neighbour</p>
                        <p>Knock Knock</p>
                        <p>Why Tyson lisps</p>
                        <p>The drunk police officer</p>
                        <p>My hip dad (Dad joke)</p>
                        <p>What not to say in an elevator</p>

                    </div>
                </div>
            </div>
        </div>
    );
}
export default JokeDescription;