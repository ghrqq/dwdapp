import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";

export default function Loader() {
  const { msg, color } = useSelector((state) => state.loader);
  const [isVisible, setisVisible] = useState(false);

  useEffect(() => {
    setisVisible(true);

    const timer = setTimeout(() => {
      setisVisible(false);
    }, 5000);

    return () => {
      clearInterval(timer);
      //   setisVisible(false);
    };
  }, [msg]);

  return (
    <div className={isVisible ? null : "hidden"}>
      <div
        className={`${color} p-2 text-gray-50 text-center mx-auto inline-block rounded`}
      >
        {msg}
      </div>
    </div>
  );
}
