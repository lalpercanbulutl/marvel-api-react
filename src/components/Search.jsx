import "../styles/Search.scss";
import { useState, useEffect } from "react";
import md5 from "md5";
import Characters from "./Characters";
import Comics from "./Comics";
import InfiniteScroll from "react-infinite-scroll-component";

export default function Search() {
  const [characterName, setCharacterName] = useState("");
  const [characterData, setCharacterData] = useState(null);
  //holding previeous 30 data:
  const prevCharacterData = characterData ? [...characterData.results] : [];

  //To prevent an error when characterData is empty (for length method):
  const dataLength = characterData ? characterData.results.length : 0;
  const [comicData, setComicData] = useState(null);
  //importing the public key:
  const privateKey = import.meta.env.VITE_PRIVATE_KEY;
  const publicKey = import.meta.env.VITE_PUBLIC_KEY;
  //created online with hash online generator (ts+privateKey+publicKey):
  const hash = "a18435d9db26ee9f666f4b1aadef0bc6";
  const [offset, setOffset] = useState(0);
  const [hasMore, setHasMore] = useState(true);

  useEffect(() => {
    getAllCharacters();
  }, [offset]);

  const getAllCharacters = () => {
    const url = `http://gateway.marvel.com/v1/public/characters?ts=1&apikey=${publicKey}&hash=${hash}&limit=30&orderBy=name&offset=${offset}`;

    fetch(url)
      .then((response) => response.json())
      .then((result) => {
        if (
          characterName === "" ||
          result.data.results[0].name.startsWith(characterName)
        ) {
          setCharacterData((prevData) => ({
            ...result.data,
            results: [...prevCharacterData, ...result.data.results],
          }));
        } else {
          setCharacterData(null);
        }
        console.log("result: ", result);
      })
      .catch((error) => {
        console.log("Error: ", error);
      });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    getCharacterData();
    setCharacterName("");
  };

  const getCharacterData = () => {
    // console.log(" inside getCharacterData ");
    //reset old data when call :
    setCharacterData(null);
    setComicData(null);
    //When typing with "startwith" it fetches all matching comic characters:
    //limit 30 characters:
    const url = `https://gateway.marvel.com:443/v1/public/characters?apikey=${publicKey}&hash=${hash}&ts=1&nameStartsWith=${characterName}&limit=100`;

    //API request and set characters:
    fetch(url)
      .then((response) => response.json())
      .then((result) => {
        setCharacterData(result.data);
        //console.log("result: ", result);
      })
      .catch((error) => {
        console.log("Error: ", error);
      });
  };
  const getComicData = (characterId) => {
    window.scrollTo({ top: 0, left: 0 });
    const timeStamp = new Date().getTime();
    const hash = generateHash(timeStamp);
    //limit 10 comics, order by old to new and list comics where the character appears by id:
    const url = `https://gateway.marvel.com:443/v1/public/characters/${characterId}/comics?apikey=${publicKey}&hash=${hash}&ts=${timeStamp}&limit=10&orderBy=onsaleDate`;
    fetch(url)
      .then((response) => response.json())
      .then((result) => {
        setComicData(result.data);
        console.log("result: ", result);
      })
      .catch((error) => {
        console.log("Error: ", error);
      });
  };
  const generateHash = (timeStamp) => {
    //for securtiy used md5 (It does not store the password explicitly, it stores it in a summarized form):
    return md5(timeStamp + privateKey + publicKey);
  };
  const handleChange = (event) => {
    setCharacterName(event.target.value);
  };
  const handleReset = () => {
    setCharacterName("");
    setCharacterData(null);
    setComicData(null);
    setOffset(0);
    getAllCharacters();
  };

  const handleScroll = () => {
    if (
      window.innerHeight + document.documentElement.scrollTop ===
      document.documentElement.offsetHeight
    ) {
      setOffset((prevOffset) => prevOffset + 30); // Increase the offset by 30 each time when scrool down
    }
  };
  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <>
      <form className="search" onSubmit={handleSubmit}>
        <input
          placeholder="Enter Character Name"
          type="text"
          onChange={handleChange}
        ></input>
        <div className="buttons">
          <button type="submit">Shearch Character </button>
          <button type="reset" className="reset" onClick={handleReset}>
            Clear
          </button>
        </div>
      </form>

      <InfiniteScroll
        dataLength={dataLength}
        next={getAllCharacters}
        hasMore={hasMore}
        loader={<h4>Loading...</h4>}
        key={offset}
      >
        {!comicData && characterData && characterData.results[0] && (
          //send data and methods to child compoents with props:
          <Characters data={characterData.results} onClick={getComicData} />
        )}
      </InfiniteScroll>
      {comicData && comicData.results[0] && (
        <Comics data={comicData.results} onClick={() => {}} />
      )}
    </>
  );
}
