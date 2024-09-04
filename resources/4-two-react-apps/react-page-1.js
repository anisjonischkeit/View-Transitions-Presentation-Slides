const loremipsum =
  "Lorem ipsum dolor sit amet consectetur, adipisicing elit. Impedit nemo atque dignissimos maxime reprehenderit! Nesciunt totam inventore quibusdam neque, mollitia reiciendis sit dolore aperiam odit cum quaerat voluptatum quam atque.Lorem ipsum dolor sit amet consectetur, adipisicing elit. Impedit nemo atque dignissimos maxime reprehenderit! Nesciunt totam inventore quibusdam neque, mollitia reiciendis sit dolore aperiam odit cum quaerat voluptatum quam atque.Lorem ipsum dolor sit amet consectetur, adipisicing elit. Impedit nemo atque dignissimos maxime reprehenderit! Nesciunt totam inventore quibusdam neque, mollitia reiciendis sit dolore aperiam odit cum quaerat voluptatum quam atque.Lorem ipsum dolor sit amet consectetur, adipisicing elit. Impedit nemo atque dignissimos maxime reprehenderit! Nesciunt totam inventore quibusdam neque, mollitia reiciendis sit dolore aperiam odit cum quaerat voluptatum quam atque.Lorem ipsum dolor sit amet consectetur, adipisicing elit. Impedit nemo atque dignissimos maxime reprehenderit! Nesciunt totam inventore quibusdam neque, mollitia reiciendis sit dolore aperiam odit cum quaerat voluptatum quam atque.Lorem ipsum dolor sit amet consectetur, adipisicing elit. Impedit nemo atque dignissimos maxime reprehenderit! Nesciunt totam inventore quibusdam neque, mollitia reiciendis sit dolore aperiam odit cum quaerat voluptatum quam atque.Lorem ipsum dolor sit amet consectetur, adipisicing elit. Impedit nemo atque dignissimos maxime reprehenderit! Nesciunt totam inventore quibusdam neque, mollitia reiciendis sit dolore aperiam odit cum quaerat voluptatum quam atque.Lorem ipsum dolor sit amet consectetur, adipisicing elit. Impedit nemo atque dignissimos maxime reprehenderit! Nesciunt totam inventore quibusdam neque, mollitia reiciendis sit dolore aperiam odit cum quaerat voluptatum quam atque.";

const App = () => {
  const [pageNo, setPageNo] = React.useState(1);

  const updateTheDOM = (pageNo) => {
    setPageNo(pageNo);
  };

  const navigate = (pageNo) => {
    // Fallback for browsers that don't support this API:
    if (!document.startViewTransition) {
      updateTheDOM(pageNo);
      return;
    }

    // With a View Transition:
    document.startViewTransition(() =>
      ReactDOM.flushSync(() => updateTheDOM(pageNo)),
    );
  };

  return pageNo ? (
    <div className="page1">
      <h2>Main View</h2>
      <div className="content">
        <p>{loremipsum}</p>
        <a onClick={() => navigate(0)}>
          <img
            src="../img/cute-cat.jpg"
            style={{ viewTransitionName: "img" }}
          />
        </a>
      </div>
    </div>
  ) : (
    <div className="cat">
      <h1>Cat Page</h1>
      <a href="#" onClick={() => navigate(1)}>
        {"<-- Back"}
      </a>
      <a href="./page2.html" style={{ float: "right" }}>
        Go to Page 2
      </a>
      <div className="content">
        <img src="../img/cute-cat.jpg" style={{ viewTransitionName: "img" }} />
        <p>{loremipsum}</p>
      </div>
    </div>
  );
};

ReactDOM.createRoot(document.querySelector("#root")).render(<App />);
