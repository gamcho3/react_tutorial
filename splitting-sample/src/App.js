import "./App.css";

import React, { Suspense } from "react";
import { useState } from "react";
import loadable from "@loadable/component";

// const SplitMe = React.lazy(() => import("./SplitMe"));
const SplitMe = loadable(() => import("./SplitMe"), {
  fallback: <div>loading...</div>,
});
const App = () => {
  const [vsible, setVisible] = useState(false);

  const onClick = () => {
    setVisible(true);
  };

  const onMouseOver = () => {
    SplitMe.preload();
  };

  return (
    <div>
      <p onClick={onClick} onMouseOver={onMouseOver}>
        Hello react
      </p>

      {/* <Suspense fallback={<div>loading..</div>}>
    
      </Suspense> */}
      {vsible && <SplitMe />}
    </div>
  );
};

export default App;
