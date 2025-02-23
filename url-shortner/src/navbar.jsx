function Navbar() {
  return (
    <div>
      <nav class="">
        <div class="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4 mb-7">
          <a href="/" class="flex items-center space-x-3">
              {/* <img src="https://flowbite.com/docs/images/logo.svg" class="h-8" alt="Flowbite Logo" /> */}
              <span class="self-center text-2xl font-semibold whitespace-nowrap dark:text-white">GeoShort URL</span>
          </a>
          <div class="flex flex-col items-end">
            <span class="text-sm text-gray-500">Simple and fast URL shortener</span>
            <span class="text-sm text-gray-500">Shorten, share and track</span>
          </div>
        </div>
      </nav>
    </div>
  )
}
export default Navbar