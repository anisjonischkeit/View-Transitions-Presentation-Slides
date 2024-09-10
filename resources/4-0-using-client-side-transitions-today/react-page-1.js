const loremipsum =
  "Lorem ipsum dolor sit amet consectetur, adipisicing elit. Impedit nemo atque dignissimos maxime reprehenderit! Nesciunt totam inventore quibusdam neque, mollitia reiciendis sit dolore aperiam odit cum quaerat voluptatum quam atque.Lorem ipsum dolor sit amet consectetur, adipisicing elit. Impedit nemo atque dignissimos maxime reprehenderit! Nesciunt totam inventore quibusdam neque, mollitia reiciendis sit dolore aperiam odit cum quaerat voluptatum quam atque.Lorem ipsum dolor sit amet consectetur, adipisicing elit. Impedit nemo atque dignissimos maxime reprehenderit! Nesciunt totam inventore quibusdam neque, mollitia reiciendis sit dolore aperiam odit cum quaerat voluptatum quam atque.Lorem ipsum dolor sit amet consectetur, adipisicing elit. Impedit nemo atque dignissimos maxime reprehenderit! Nesciunt totam inventore quibusdam neque, mollitia reiciendis sit dolore aperiam odit cum quaerat voluptatum quam atque.Lorem ipsum dolor sit amet consectetur, adipisicing elit. Impedit nemo atque dignissimos maxime reprehenderit! Nesciunt totam inventore quibusdam neque, mollitia reiciendis sit dolore aperiam odit cum quaerat voluptatum quam atque.Lorem ipsum dolor sit amet consectetur, adipisicing elit. Impedit nemo atque dignissimos maxime reprehenderit! Nesciunt totam inventore quibusdam neque, mollitia reiciendis sit dolore aperiam odit cum quaerat voluptatum quam atque.Lorem ipsum dolor sit amet consectetur, adipisicing elit. Impedit nemo atque dignissimos maxime reprehenderit! Nesciunt totam inventore quibusdam neque, mollitia reiciendis sit dolore aperiam odit cum quaerat voluptatum quam atque.Lorem ipsum dolor sit amet consectetur, adipisicing elit. Impedit nemo atque dignissimos maxime reprehenderit! Nesciunt totam inventore quibusdam neque, mollitia reiciendis sit dolore aperiam odit cum quaerat voluptatum quam atque.";

const hiddenStyles = {
  gridArea: "b",
  pointerEvents: "none",
};

const visibleStyles = {
  gridArea: "a",
  pointerEvents: "unset",
};

const initialContainerStyles = { 
  width: "200%",
  transition: "transform 0.5s",
  display: "grid", 
  gridTemplateAreas: '"a b"' 
};

const navCtx = React.createContext();

const Navigator = ({ pages }) => {
  const [containerStyles, setContainerStyles] = React.useState(initialContainerStyles);
  const [navigator, setNavigator] = React.useState({
    visibleContainer: 0,
    containers: ["/", "/"],
  });

  const navigate = (page) => {
    ReactDOM.flushSync(() => { 
      setContainerStyles((prevStyles) => {
        return {...prevStyles, transition: "none",  transform: "translateX(-50%)"}
      })

      setNavigator((prevNav) => {
        const newNav = {
          ...prevNav,
          visibleContainer: prevNav.visibleContainer === 0 ? 1 : 0,
        };
        newNav.containers[newNav.visibleContainer] = page;

        return newNav;
      });
    });
   
    requestAnimationFrame(() => {
      setContainerStyles(initialContainerStyles)
    })
  };

  return (
    <navCtx.Provider value={{ navigate }}>
      <div style={{width: "100%", overflow: "hidden"}}>
        <div style={containerStyles}>
          <div style={ navigator.visibleContainer === 0 ? visibleStyles : hiddenStyles } >
            {pages[navigator.containers[0]]}
          </div>
          <div style={ navigator.visibleContainer === 1 ? visibleStyles : hiddenStyles } >
            {pages[navigator.containers[1]]}
          </div>
        </div>
      </div>
    </navCtx.Provider>
  );
};

const Page1 = () => {
  const { navigate } = React.useContext(navCtx);

  return (
    <div className="page1" style={{}}>
      <h2>Main View </h2>
      <div className="content">
        <p>{loremipsum} </p>
        <a onClick={() => navigate("/page2")}>
          <img src="../img/cute-cat.jpg" />
        </a>
      </div>
    </div>
  );
};

const Page2 = () => {
  const { navigate } = React.useContext(navCtx);

  return (
    <div className="cat">
      <h1>Cat Page </h1>
      <a href="#" onClick={() => navigate("/")}>
        {"<-- Back"}
      </a>
      <a href="./page2.html" style={{ float: "right" }}>
        Go to Page 2
      </a>
      <div className="content">
        <img src="../img/cute-cat.jpg" />
        <p>{loremipsum} </p>
      </div>
    </div>
  );
};

const App = () => {
  return (
    <Navigator
      pages={{
        "/": <Page1 />,
        "/page2": <Page2 />,
      }}
    />
  );
};

ReactDOM.createRoot(document.querySelector("#root")).render(<App />);
