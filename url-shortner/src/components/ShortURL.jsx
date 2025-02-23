import { useState } from 'react'
import axios from 'axios';
import { FaRegCopy } from "react-icons/fa";
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import { SERVER_ENDPOINT } from '../contants.js'



export default function ShortURL({urls, setUrls}) {
  const [userLink, setUserLink] = useState('')
  const [validUrl, setValidUrl] = useState(true)
  const [loading, setLoading] = useState(false)
  const [shortLink, setShortLink] = useState('')
  const [copied, setCopied] = useState(false)
  

  const handleKeyDown = (e) => {
    validateURL(e.target.value)
    if (validUrl) {
      setUserLink(e.target.value.toString().toLowerCase().trim())
    }
  } 

  const validateURL = (value)  => {
    if(value.length == 0) {
      setValidUrl(true);
    }

    const urlPattern = new RegExp(
      '^(https?:\\/\\/)?' + // protocol
      '((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.?)+[a-z]{2,63}|' + // domain name
      '((\\d{1,3}\\.){3}\\d{1,3}))' + // OR ip (v4) address
      '(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*' + // port and path
      '(\\?[;&a-z\\d%_.~+=-]*)?' + // query string
      '(\\#[-a-z\\d_]*)?$', 'i'
    )

    if (urlPattern.test(value)) {
      setValidUrl(true);
    } else {
      setValidUrl(false)
    }
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    if(userLink.length == 0) return 

    setLoading(true)
    getShortLink();
  }

  const getShortLink = async () => {
    const link = { url: encodeURIComponent(userLink) }
    axios.post(
        SERVER_ENDPOINT+'api/get_short_link', { link }
    )
    .then((response) => {
      console.log(response.data)
          setLoading(false);
          setShortLink(response.data.tag);
          setUrls([{
            id: response.data.id, 
            tag: response.data.tag, 
            original_url: userLink,
            created_at: new Date()
          }, ...urls])
    })
    .catch((error) => {
      console.error("Error fetching short link:", error);
      setLoading(false);
      alert("Something went wrong, try again.");
    });
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(SERVER_ENDPOINT+shortLink)
    setCopied(true)
    setInterval(() => {
      setCopied(false)
    }, 4000);
  }


  return (
    <>
      <span>
        { 
          !validUrl &&  
          "Invalid URL provided."
        }
      </span>
      <form onSubmit={(e) => handleSubmit(e)}>
        <div class="">
          <textarea 
            class="bg-gray-800 h-32 min-w-3xl border-2 border-slate-700 rounded-2xl p-3 focus:border-0"
            placeholder="Paste the URL here...."
            onChange={handleKeyDown}
          />
        </div>

        <div class="mt-4">
          <button
            type="submit"
            class='w-3xs h-10 bg-gray-800 rounded-md hover:border-2 hover:border-gray-700 cursor-pointer'
            disabled={!validUrl || loading}
          >
            { loading ?  ( 
                <span class="flex justify-center animate-spin mx-auto"><AiOutlineLoading3Quarters /></span> 
              ): 'Shorten URL' }
          </button>
        </div>
      </form>
      <div class="flex justify-center">
        { shortLink &&
          ( 
            <div>
            <button 
              class={
                copied ? "bg-gray-700 min-w-lg h-10 mt-5 text-gray-400 font-light font-mono items-center flex justify-center cursor-pointer rounded-md" : "bg-gray-800 min-w-lg h-10 mt-5 text-gray-400 font-light font-mono items-center flex justify-center cursor-pointer rounded-md"
              }
              onClick={handleCopy}
            >
                <FaRegCopy className='mr-10'/>
                {SERVER_ENDPOINT}{shortLink}
            </button>
            {copied && (<span class="text-lg font-mono">copied!</span>)}
            </div>
          )
        }
      </div>
    </>
  )
}