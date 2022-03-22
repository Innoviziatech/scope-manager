import { useEffect, useRef } from "react";
import lottie from "lottie-web";
const Home = () => {
  const element = useRef(null);

  useEffect(() => {
    const Lottie = lottie.loadAnimation({
      container: element.current,
      renderer: "svg",
      loop: true,
      autoplay: true,

      path: "https://assets4.lottiefiles.com/packages/lf20_puciaact.json",
    });

    Lottie.setSpeed(0.5);
  }, []);

  return (
    <div style={{ maxWidth: "40rem" }} className="home">
      <h1
        style={{
          textAlign: "center",
          marginTop: "-5rem",
          fontSize: "3rem",
          color: "#ec4154",
        }}
      >
        Scope Manager
      </h1>
      {process.env.REACT_APP_ENVIRONMENT === "development" && (
        <div className="flex-center" ref={element}></div>
      )}
    </div>
  );
};

export default Home;
