import { useEffect, useRef, useState } from "react";
import "./App.css";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";
import Card from "./components/Card";
import ClipLoader from "react-spinners/ClipLoader";

toast.configure();

function App() {
  const [inpVal, setInpVal] = useState("");
  const [inpNumVal, setNumInpVal] = useState(0);
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const inpRef = useRef();
  const inpNumRef = useRef();

  useEffect(() => {
    if (!inpVal) {
      setData([]);
    }
  }, [inpVal]);

  const errorNotify = (text) => {
    toast.error(text, { autoClose: 1500 });
  };
  const getResults = async () => {
    if (inpRef.current.value && inpNumRef.current.value) {
      setLoading(true);
      try {
        const config = {
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
          },
          params: {
            q: inpRef.current.value,
            numResults: inpNumRef.current.value,
          },
        };
        const { data } = await axios.get(
          `https://asia-south1-socialboat-dev.cloudfunctions.net/assignmentVideos`,
          config
        );
        setData(data.results);
        setLoading(false);
      } catch (error) {
        errorNotify(error.message);
        setLoading(false);
      }
    }
  };

  const allItems = data.map((item) => (
    <Card url={item.video} heading={item.heading} tags={item.tags} />
  ));
  return (
    <div className="App">
      <header className="header">
        <div>
          <img
            className="logo"
            src="https://cdn3d.iconscout.com/3d/premium/thumb/fitness-5000933-4165628.png"
            alt=""
          />
        </div>
        <div className="search_container">
          <span>
            <strong>Count:</strong>{" "}
          </span>
          <input
            className="num_inp"
            onChange={(e) => {
              setNumInpVal(e.target.value);
              getResults();
            }}
            value={inpNumVal}
            type="number"
            ref={inpNumRef}
          />
          <span>
            <strong>Keyword:</strong>{" "}
          </span>
          <input
            className="text_inp"
            onChange={(e) => {
              setInpVal(e.target.value);
              getResults();
            }}
            ref={inpRef}
            value={inpVal}
            type="search"
          />
        </div>
        <div>
          <img
            className="profile_pic"
            src="https://res.cloudinary.com/skdtech/image/upload/v1639648949/dnfv9qt2zi0ltx7sig6v.png"
            alt=""
          />
        </div>
      </header>
      <main>
        {loading ? (
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              flexDirection: "column",
              height: "55vh",
              width: "100%",
              color: "#161d25",
            }}
          >
            <ClipLoader color="#161d25" loading={loading} size={30} />
            <p>Loading</p>
          </div>
        ) : (
          <>
            <span
              style={{
                marginLeft: "10px",
                marginTop: "10px",
                fontSize: "large",
                fontWeight: "bold",
              }}
            >
              Fitness Videos
            </span>
            <div className="allItems_box">
              {allItems}
              {data.length === 0 ? <p>No Items. Please Search</p> : ""}
            </div>
          </>
        )}
      </main>
    </div>
  );
}

export default App;
