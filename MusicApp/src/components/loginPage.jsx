import { useEffect, useState, useRef } from "react"

export default function RotatingHeader(props) {
  const headers = ["Welcome to MUSAI", "Your Personal Music Dashboard"];
  const [index, setIndex] = useState(0);
  const headerCount = useRef(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prev) => prev + 1);
    }, 2000);

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    headerCount.current += 1;
    if (headerCount.current === 3) {
      props.setLogin(true);
    }
  }, [index]);

  return (
    <h1 key={index} className="login-page-headers">
      {headers[index]}
    </h1>
  );
}