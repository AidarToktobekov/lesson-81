import {FormEvent, useState} from "react";
import axiosApi from "../axiosApi.ts";

const Converter = ()=>{
    const [linkInput, setLinkInput] = useState('');
    const [shortUrl, setShortUrl] = useState('');

    const run = async (event: FormEvent)=>{
        event.preventDefault()
        const alphabet = "qwertyuiopasdfghjklzxcvbnm";
        let url = ''
        while (url.length < 4) {
            url += alphabet[Math.floor(Math.random() * alphabet.length)];
        }
        if (url.length === 4) {
            while (url.length < 7) {
                url += alphabet[Math.floor(Math.random() * alphabet.length)].toUpperCase();
            }
        }
        setShortUrl(url)
        await axiosApi.post('/converter', {originalUrl: linkInput, shortUrl: url});

    }

    return(
        <>
            <div className="container">
                <h1 className="my-4 text-center">Shorten your link!</h1>
                <form onSubmit={run}>
                    <div className="mb-3">
                        <input type="text" value={linkInput} onChange={(event)=>setLinkInput(event.target.value)} required className="form-control" placeholder="Your link" />
                    </div>
                    <button className="btn btn-dark" type="submit">Shorten</button>
                </form>
                {shortUrl ? (
                    <a className="btn btn-dark mt-3" href={`http://localhost:8000/`+shortUrl}>{`http://localhost:8000/`+shortUrl}</a>
                ) : (
                    <>
                        <p className="mt-3">Fill in the field</p>
                    </>
                )}
            </div>
        </>
    )
}

export default Converter;