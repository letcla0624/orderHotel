// react
import { useState, useEffect } from "react";
// components
import Logo from "./Logo";
// interface
import { ContactList } from "@/interface/List";

export default function Footer() {
  const contact: ContactList[][] = [
    [
      {
        id: 1,
        title: "TEL",
        text: "+886-7-1234567",
        link: "tel:+886-7-1234567",
      },
      {
        id: 2,
        title: "FAX",
        text: "+886-7-1234567",
        link: "",
      },
    ],
    [
      {
        id: 1,
        title: "MAIL",
        text: "elh@hexschool.com",
        link: "mailto:elh@hexschool.com",
      },
      {
        id: 2,
        title: "WEB",
        text: "www.elhhexschool.com.tw",
        link: "#",
      },
    ],
  ];

  const socialLink = [
    {
      id: 1,
      link: "#",
      path: `M1118.5,607.3c-296,0-536.9,195.4-536.9,435.7c0,191.2,150.6,354.8,364.9,413c33.4,9.1,78.7,12,107.4,23.8
      c2.9,1.2,5.7,2.5,8.3,3.9c24.2,13.5,20.7,39.6,17.4,64.1c0,0-6.3,37.9-7.7,46c-12.5,72.5,81.5,15.8,115.6-0.7
      c205.3-100,467.8-326.3,467.8-550.1C1655.4,802.7,1414.5,607.3,1118.5,607.3z M929.1,1171.2c0,5.8-4.7,10.5-10.4,10.5H768.2
      c-2.8,0-5.3-1.1-7.2-2.9c0,0-0.1-0.1-0.1-0.1c-0.1,0-0.1-0.1-0.1-0.1c-1.8-1.9-2.9-4.4-2.9-7.2V937.3c0-5.8,4.7-10.4,10.4-10.4
      h37.7c5.8,0,10.4,4.7,10.4,10.4v185.8h102.3c5.8,0,10.4,4.7,10.4,10.5V1171.2z M1019.9,1171.2c0,5.8-4.7,10.4-10.4,10.4h-37.7
      c-5.8,0-10.5-4.7-10.5-10.4V937.3c0-5.8,4.7-10.4,10.5-10.4h37.7c5.8,0,10.4,4.7,10.4,10.4V1171.2z M1279.1,1171.2
      c0,5.8-4.7,10.4-10.5,10.4H1231c-1,0-1.9-0.1-2.7-0.4c0,0-0.1,0-0.1,0c-0.2-0.1-0.5-0.1-0.7-0.2c-0.1,0-0.2-0.1-0.3-0.1
      c-0.2-0.1-0.3-0.1-0.5-0.2c-0.2-0.1-0.3-0.2-0.5-0.3c-0.1,0-0.2-0.1-0.3-0.1c-0.2-0.1-0.4-0.3-0.6-0.4c0,0-0.1-0.1-0.1-0.1
      c-1-0.7-1.9-1.5-2.6-2.6l-107.3-144.9v138.9c0,5.8-4.7,10.4-10.4,10.4H1067c-5.8,0-10.5-4.7-10.5-10.4V937.3
      c0-5.8,4.7-10.4,10.5-10.4h38c0.2,0,0.4,0,0.5,0c0.2,0,0.4,0,0.5,0.1c0.1,0,0.3,0,0.4,0.1c0.2,0,0.4,0.1,0.6,0.1
      c0.1,0,0.3,0.1,0.4,0.1c0.2,0.1,0.4,0.1,0.6,0.2c0.1,0,0.2,0.1,0.3,0.1c0.2,0.1,0.4,0.2,0.6,0.3c0.1,0,0.2,0.1,0.3,0.1
      c0.2,0.1,0.4,0.2,0.5,0.3c0.1,0.1,0.2,0.1,0.3,0.2c0.2,0.1,0.4,0.3,0.5,0.4c0.1,0.1,0.2,0.1,0.3,0.2c0.2,0.1,0.4,0.3,0.5,0.5
      c0.1,0,0.1,0.1,0.2,0.2c0.2,0.2,0.4,0.4,0.6,0.6c0,0,0,0,0.1,0.1c0.3,0.3,0.5,0.7,0.8,1.1l107.2,144.8v-139
      c0-5.8,4.7-10.4,10.5-10.4h37.6c5.8,0,10.5,4.7,10.5,10.4V1171.2z M1487,975c0,5.8-4.7,10.5-10.4,10.5h-102.3v39.5h102.3
      c5.8,0,10.4,4.7,10.4,10.5v37.6c0,5.8-4.7,10.5-10.4,10.5h-102.3v39.5h102.3c5.8,0,10.4,4.7,10.4,10.5v37.6
      c0,5.8-4.7,10.5-10.4,10.5h-150.5c-2.8,0-5.4-1.1-7.2-2.9c-0.1,0-0.1-0.1-0.1-0.1c-0.1,0-0.1-0.1-0.1-0.1c-1.8-1.9-2.9-4.4-2.9-7.2
      V937.3c0-2.8,1.1-5.3,2.9-7.2c0-0.1,0.1-0.1,0.2-0.2c0,0,0.1-0.1,0.1-0.1c1.9-1.8,4.4-3,7.3-3h150.5c5.8,0,10.4,4.7,10.4,10.5V975z`,
    },
    {
      id: 2,
      link: "#",
      path: `M1401.6,774.8c-34.6,0-62.7,28.1-62.7,62.7c0,34.6,28.1,62.7,62.7,62.7c34.6,0,62.7-28.1,62.7-62.7
      C1464.3,802.8,1436.2,774.8,1401.6,774.8z M1122.9,855.2c-145.2,0-263.3,118.1-263.3,263.3c0,145.2,118.1,263.3,263.3,263.3
      c145.2,0,263.3-118.1,263.3-263.3C1386.2,973.3,1268.1,855.2,1122.9,855.2z M1122.9,1287.2c-93,0-168.7-75.7-168.7-168.7
      s75.7-168.7,168.7-168.7c93,0,168.7,75.7,168.7,168.7S1215.9,1287.2,1122.9,1287.2z M1331.9,583.9H905
      c-177.1,0-321.2,144.1-321.2,321.2V1332c0,177.1,144.1,321.2,321.2,321.2h426.9c177.1,0,321.2-144.1,321.2-321.2V905
      C1653.1,727.9,1509,583.9,1331.9,583.9z M1552.5,1332c0,121.6-99,220.6-220.6,220.6H905c-121.6,0-220.6-98.9-220.6-220.6V905
      c0-121.6,98.9-220.6,220.6-220.6h426.9c121.6,0,220.6,98.9,220.6,220.6V1332z`,
    },
  ];

  const [year, setYear] = useState(2024);
  useEffect(() => {
    setYear(new Date().getFullYear());
  }, []);

  return (
    <div className="">
      <div className="max-w-screen-xl mx-auto px-3 py-20 lg:py-[120px]">
        <div className="flex flex-col lg:flex-row justify-between text-primary-40">
          <div className="w-full lg:w-1/2">
            <Logo />
            <div className="flex items-center gap-4 my-10">
              {socialLink.map((item) => {
                return (
                  <a
                    href={item.link}
                    className="rounded-full border border-white hover:bg-primary-100 hover:border-primary-100 transition duration-300"
                    key={item.path}
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      x="0px"
                      y="0px"
                      viewBox="0 0 2237 2237"
                      className="w-10 h-10"
                    >
                      <path className="fill-white" d={item.path} />
                    </svg>
                  </a>
                );
              })}
            </div>
          </div>
          <div className="w-full lg:w-1/2">
            <div className="flex flex-col lg:flex-row lg:justify-end gap-x-20">
              {contact.map((item, idx) => {
                return (
                  <ul key={idx}>
                    {item.map((innerItem) => {
                      return (
                        <li className="mb-10" key={innerItem.title}>
                          <h6 className="text-white font-bold mb-3">
                            {innerItem.title}
                          </h6>
                          <a
                            href={innerItem.link}
                            className="text-black-40 hover:text-primary-100 transition duration-300"
                          >
                            {innerItem.text}
                          </a>
                        </li>
                      );
                    })}
                  </ul>
                );
              })}
            </div>
          </div>
        </div>
        <div className="w-full flex flex-col lg:flex-row justify-between lg:items-center text-white tracking-wide mt-20 lg:mt-5">
          <p className="mb-5 lg:mb-0">806023 台灣高雄市新興區六角路123號</p>
          <p className="">&copy; 享樂酒店 {year} All Rights Reserved.</p>
        </div>
      </div>
    </div>
  );
}
