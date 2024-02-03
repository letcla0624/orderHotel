import { useEffect, useState, ReactElement } from "react";
import { useLocation, Link } from "react-router-dom";

export default function Breadcrumbs() {
  const location = useLocation();
  const [breadcrumbs, setBreadcrumbs] = useState<ReactElement[]>([]);

  useEffect(() => {
    const pathName = location.pathname.split("/").filter((item) => item !== "");
    let currentPath = "";

    const breadcrumbArr = pathName.map((item, index) => {
      currentPath += `/${item}`;
      const isLast = index === pathName.length - 1;

      return (
        <span key={currentPath}>
          <Link
            to={currentPath}
            className={isLast ? "text-black-60" : "text-black-100"}
          >
            {item}
          </Link>
          {!isLast && <span className="text-black-60"> / </span>}
        </span>
      );
    });

    setBreadcrumbs(breadcrumbArr);
  }, [location.pathname]);

  return <div>{breadcrumbs}</div>;
}
