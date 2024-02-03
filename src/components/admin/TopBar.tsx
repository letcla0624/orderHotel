export default function TopBar() {
  return (
    <div className="flex justify-between items-center py-7 bg-white shadow-lg">
      <button
        data-drawer-target="default-sidebar"
        data-drawer-toggle="default-sidebar"
        aria-controls="default-sidebar"
        type="button"
        className="inline-flex items-center p-3 rounded-lg ml-6 lg:hidden"
      >
        <span className="sr-only">Open sidebar</span>
        <svg
          className="w-6 h-6"
          aria-hidden="true"
          fill="currentColor"
          viewBox="0 0 20 20"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            clipRule="evenodd"
            fillRule="evenodd"
            d="M2 4.75A.75.75 0 012.75 4h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 4.75zm0 10.5a.75.75 0 01.75-.75h7.5a.75.75 0 010 1.5h-7.5a.75.75 0 01-.75-.75zM2 10a.75.75 0 01.75-.75h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 10z"
          ></path>
        </svg>
      </button>
      <div className="w-full flex justify-end gap-3 px-10">
        <div className="flex items-center gap-3">
          <p>aa@aa.aa</p>
          <img
            src="img/mobile/avatar/asset1.png"
            alt="頭像"
            className="w-10 h-10"
          />
        </div>
      </div>
    </div>
  );
}
