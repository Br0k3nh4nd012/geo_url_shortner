import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { SERVER_ENDPOINT, MOCK_URL_LIST } from '../contants.js'

export default function ListURL({urls, setUrls}) {

  useEffect(() => {
    axios.get(SERVER_ENDPOINT+"api/url_list")
      .then(response => {
        setUrls(response.data);
      })
      .catch(error => {
        console.error('There was an error fetching the URL list!', error);
      });
  }, []);

  const tableHeaderClass = "px-6 py-3 bg-gray-800 text-left text-xs font-medium text-gray-300 uppercase tracking-wider";
  const tableCellClass = "px-6 py-4 whitespace-nowrap text-sm text-gray-300";

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
          {console.log(urls)}
          {urls?.map((url) => (
            <tr key={url.id}>
              <td className={`${tableCellClass} text-left`}>
                {url.original_url && url.original_url.length > 100 ? `${decodeURIComponent(url.original_url.substring(0, 100))}...` : decodeURIComponent(url.original_url)}
              </td>
              <td className={tableCellClass}>{SERVER_ENDPOINT}{url.tag}</td>
              <td className={tableCellClass}>{new Date(url.created_at).toLocaleString()}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}