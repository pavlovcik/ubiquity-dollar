type SidebarProps = {
  isOpened: boolean;
};

export default function Sidebar({ isOpened }: SidebarProps) {
  return (
    <div
      className={`${isOpened ? "w-[300px]" : "w-[0vw]"} absolute h-screen shadow-md z-50 bg-[#00000060] overflow-hidden flex flex-col`}
      style={{ transition: ".15s width ease-in-out" }}
    >
      <ul className="relative mt-8">
        <li className="relative">
          <a
            className="flex items-center !text-accent text-sm py-4 px-6 h-12 overflow-hidden text-gray-700 text-ellipsis whitespace-nowrap rounded hover:text-gray-900 hover:bg-gray-100/20 transition duration-300 ease-in-out"
            href="/intro"
            data-mdb-ripple="true"
            data-mdb-ripple-color="dark"
          >
            <span>Introduction</span>
          </a>
        </li>
        <li className="relative" id="sidenavEx1">
          <a
            className="flex items-center !text-accent text-sm py-4 px-6 h-12 overflow-hidden text-gray-700 text-ellipsis whitespace-nowrap rounded hover:text-gray-900 hover:bg-gray-100/20 transition duration-300 ease-in-out cursor-pointer"
            data-mdb-ripple="true"
            data-mdb-ripple-color="dark"
            data-bs-toggle="collapse"
            data-bs-target="#collapseSidenavEx1"
            aria-expanded="true"
            aria-controls="collapseSidenavEx1"
          >
            <span>Apps</span>
            <svg
              aria-hidden="true"
              focusable="false"
              data-prefix="fas"
              className="w-3 h-3 ml-auto"
              role="img"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 448 512"
            >
              <path
                fill="currentColor"
                d="M207.029 381.476L12.686 187.132c-9.373-9.373-9.373-24.569 0-33.941l22.667-22.667c9.357-9.357 24.522-9.375 33.901-.04L224 284.505l154.745-154.021c9.379-9.335 24.544-9.317 33.901.04l22.667 22.667c9.373 9.373 9.373 24.569 0 33.941L240.971 381.476c-9.373 9.372-24.569 9.372-33.942 0z"
              ></path>
            </svg>
          </a>
          <ul className="relative accordion-collapse collapse" id="collapseSidenavEx1" aria-labelledby="sidenavEx1" data-bs-parent="#sidenavExample">
            <li className="relative">
              <a
                href="/price-stabilization"
                className="flex items-center !text-accent text-xs py-4 pl-12 pr-6 h-6 overflow-hidden text-gray-700 text-ellipsis whitespace-nowrap rounded hover:text-gray-900 hover:bg-gray-100/20 transition duration-300 ease-in-out"
                data-mdb-ripple="true"
                data-mdb-ripple-color="dark"
              >
                Price Stabilization
              </a>
            </li>
            <li className="relative">
              <a
                href="/liquidity-mining"
                className="flex items-center !text-accent text-xs py-4 pl-12 pr-6 h-6 overflow-hidden text-gray-700 text-ellipsis whitespace-nowrap rounded hover:text-gray-900 hover:bg-gray-100/20 transition duration-300 ease-in-out"
                data-mdb-ripple="true"
                data-mdb-ripple-color="dark"
              >
                Liquidity Mining
              </a>
            </li>
            <li className="relative">
              <a
                href="/yield-farming"
                className="flex items-center !text-accent text-xs py-4 pl-12 pr-6 h-6 overflow-hidden text-gray-700 text-ellipsis whitespace-nowrap rounded hover:text-gray-900 hover:bg-gray-100/20 transition duration-300 ease-in-out"
                data-mdb-ripple="true"
                data-mdb-ripple-color="dark"
              >
                Yield Farming
              </a>
            </li>
            <li className="relative">
              <a
                href="/launch-party"
                className="flex items-center !text-accent text-xs py-4 pl-12 pr-6 h-6 overflow-hidden text-gray-700 text-ellipsis whitespace-nowrap rounded hover:text-gray-900 hover:bg-gray-100/20 transition duration-300 ease-in-out"
                data-mdb-ripple="true"
                data-mdb-ripple-color="dark"
              >
                Launch Party
              </a>
            </li>
          </ul>
        </li>
        <li className="relative">
          <a
            className="flex items-center !text-accent text-sm py-4 px-6 h-12 overflow-hidden text-gray-700 text-ellipsis whitespace-nowrap rounded hover:text-gray-900 hover:bg-gray-100/20 transition duration-300 ease-in-out"
            href="/markets"
            data-mdb-ripple="true"
            data-mdb-ripple-color="dark"
          >
            <span>Markets</span>
          </a>
        </li>
        <li className="relative">
          <a
            className="flex items-center !text-accent text-sm py-4 px-6 h-12 overflow-hidden text-gray-700 text-ellipsis whitespace-nowrap rounded hover:text-gray-900 hover:bg-gray-100/20 transition duration-300 ease-in-out"
            href="/docs"
            data-mdb-ripple="true"
            data-mdb-ripple-color="dark"
          >
            <span>Docs</span>
          </a>
        </li>
        <li className="relative">
          <a
            className="flex items-center !text-accent text-sm py-4 px-6 h-12 overflow-hidden text-gray-700 text-ellipsis whitespace-nowrap rounded hover:text-gray-900 hover:bg-gray-100/20 transition duration-300 ease-in-out"
            href="/dao"
            data-mdb-ripple="true"
            data-mdb-ripple-color="dark"
          >
            {/* <svg
              aria-hidden="true"
              focusable="false"
              data-prefix="fas"
              className="w-3 h-3 mr-3"
              role="img"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 512 512"
            >
              <path
                fill="currentColor"
                d="M192 208c0-17.67-14.33-32-32-32h-16c-35.35 0-64 28.65-64 64v48c0 35.35 28.65 64 64 64h16c17.67 0 32-14.33 32-32V208zm176 144c35.35 0 64-28.65 64-64v-48c0-35.35-28.65-64-64-64h-16c-17.67 0-32 14.33-32 32v112c0 17.67 14.33 32 32 32h16zM256 0C113.18 0 4.58 118.83 0 256v16c0 8.84 7.16 16 16 16h16c8.84 0 16-7.16 16-16v-16c0-114.69 93.31-208 208-208s208 93.31 208 208h-.12c.08 2.43.12 165.72.12 165.72 0 23.35-18.93 42.28-42.28 42.28H320c0-26.51-21.49-48-48-48h-32c-26.51 0-48 21.49-48 48s21.49 48 48 48h181.72c49.86 0 90.28-40.42 90.28-90.28V256C507.42 118.83 398.82 0 256 0z"
              ></path>
            </svg> */}
            <span>DAO</span>
          </a>
        </li>
        <li className="relative">
          <a
            className="flex items-center !text-accent text-sm py-4 px-6 h-12 overflow-hidden text-gray-700 text-ellipsis whitespace-nowrap rounded hover:text-gray-900 hover:bg-gray-100/20 transition duration-300 ease-in-out"
            href="/blog"
            data-mdb-ripple="true"
            data-mdb-ripple-color="dark"
          >
            <span>Blog</span>
          </a>
        </li>
      </ul>
    </div>
  );
}