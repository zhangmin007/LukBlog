// 需要导入REACT ，不然后面在网址传入参数会报错；
import React , { useState, useEffect } from "react";
// 无法获取到env中的参数, 文件位置应该在client下
const API_KEY = import.meta.env.VITE_GIPHY_API;
// const API_KEY = "SYYecnLnP6EyiMTTWOR4K64C1sNJA0KP";

// keyword参数需要用花括号括起来，不然会认定为object，无法识别
const useFetch = (keyword) => {
    const [gifUrl, setGifUrl] = useState('');
    const Keyword = keyword.split(' ')[0];
    // const Keyword  = keyword[0];
    // const Keyword = "test";
    const URL = "https://api.giphy.com/v1/gifs/search?api_key="+API_KEY+"&q="+Keyword+"&limit=1"
    
    const fetchGifs = async() => {
        try {
            const response = await fetch(URL);
            
            const { data } = await response.json();
            setGifUrl(data[0]?.images?.downsized_medium?.url)
            // setGifUrl(data[0]?.embed_url)
        } catch (error) {
            setGifUrl('https://metro.co.uk/wp-content/uploads/2015/05/pokemon_crying.gif?quality=90&strip=all&zoom=1&resize=500%2C284')
        }
    }
    useEffect(()=>{
        if(keyword) fetchGifs();
    },[keyword]);

    return gifUrl
}

export default useFetch