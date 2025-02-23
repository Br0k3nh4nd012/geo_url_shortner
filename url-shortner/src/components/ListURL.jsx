import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { SERVER_ENDPOINT, MOCK_URL_LIST } from '../contants.js'
import { FaRegCopy, FaSlideshare } from "react-icons/fa";
import { TbRosetteDiscountCheckFilled } from "react-icons/tb";



export default function ListURL({urls, setUrls}) {
  const [urlCopied, setUrlCopied] = useState();

  useEffect(() => {
    axios.get(SERVER_ENDPOINT+"api/url_list")
      .then(response => {
        setUrls(response.data);
      })
      .catch(error => {
        console.error('There was an error fetching the URL list!', error);
      });
  }, []);

  const formatOriginalUrl = (value) => {
    return (value && value.length > 80 ? `${decodeURIComponent(value.substring(0, 80))}...` : decodeURIComponent(value))
  }

  const handleCopyInList = (url) => {
    navigator.clipboard.writeText(SERVER_ENDPOINT+url.tag)
    setUrlCopied(url.id) 
    setInterval(() => {
      setUrlCopied(undefined)
    }, 2500);
  }

  const tableHeaderClass = "px-6 py-3 bg-gray-800 text-left text-xs font-medium text-gray-300 uppercase tracking-wider";
  const tableCellClass = "px-6 py-4 whitespace-nowrap text-sm text-gray-300 items-center";

  return (
    <div className="mt-20">
      <table className="min-w-full divide-y divide-gray-700">
        <thead>
          <tr>
            <th className={tableHeaderClass}>Original URL</th>
            <th className={tableHeaderClass}>Shorten URL</th>
            <th className={tableHeaderClass}>Created At</th>
          </tr>
        </thead>
        <tbody className="bg-gray-900 divide-y divide-gray-700">
          {urls.map((url) => (
            <tr key={url.id}>
              <td className={`${tableCellClass} text-left`}>
                {formatOriginalUrl(url.original_url)}
              </td>
              <td className={tableCellClass}>
                <button class="flex items-center justify-evenly cursor-pointer" onClick={() => handleCopyInList(url)}>
                  {SERVER_ENDPOINT}{url.tag}
                  { urlCopied && urlCopied == url.id ? <TbRosetteDiscountCheckFilled class="ml-3 text-green-600" /> : <FaRegCopy class="ml-3"/> }
                </button>
              </td>
              <td className={tableCellClass}>{new Date(url.created_at).toLocaleString()}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}