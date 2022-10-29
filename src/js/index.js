import querystring from querystring;
import r2 from r2;
const DOG_API_URL = "https://api.thedogapi.com/";
const DOG_API_KEY =
    "live_7IDL9LYkxP6IxPbPe1pDBsoD4cUsobqA9YVrI1AY9mQrEJ91ls2IAmYwQPVEm3a3";

async function loadImage(sub_id) {
    // you need an API key to get access to all the iamges, or see the requests you've made in the stats for your account
    let headers = {
        "X-API-KEY": DOG_API_KEY,
    };
    let query_params = {
        has_breeds: true, // we only want images with at least one breed data object - name, temperament etc
        mime_types: "jpg,png", // we only want static images as Discord doesn't like gifs
        size: "small", // get the small images as the size is prefect for Discord's 390x256 limit
        sub_id: sub_id, // pass the message senders username so you can see how many images each user has asked for in the stats
        limit: 1, // only need one
    };
    // convert this obejc to query string
    let queryString = querystring.stringify(query_params);
    let _url = DOG_API_URL + `v1/images/search?${queryString}`;
    
    return await r2.get(_url, {
        headers
    }).json;;
}