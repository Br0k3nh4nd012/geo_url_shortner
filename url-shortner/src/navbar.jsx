function Navbar() {
  return (
    <div>
      <nav class="">
        <div class="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
          <a href="/" class="flex items-center space-x-3">
              {/* <img src="https://flowbite.com/docs/images/logo.svg" class="h-8" alt="Flowbite Logo" /> */}
              <span class="self-center text-2xl font-semibold whitespace-nowrap dark:text-white">GeoShort URL</span>
          </a>

          <ul class="flex">
            <li>
              <a href="/" class="block py-2 px-3 text-white hover:text-blue-500 text-lg">
                Shorten URL
              </a>
            </li>
            <li>
              <a href="/shorten_urls" class="block py-2 px-3 text-white hover:text-blue-500 text-lg">
                List
              </a>
            </li>
          </ul>
        </div>
      </nav>
    </div>
  )
}
export default Navbar