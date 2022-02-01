import {useStore} from "./index";
import {RoutesData} from "./routesData";
import {BrowserRouter as Router, Route, Routes} from "react-router-dom";
import React from "react";

function App() {
    const {control} = useStore();
    return (
        <div className="App" id={control}>
            <Router basename={process.env.REACT_APP_BASE_NAME}>
                <Routes>
                    {RoutesData.map((route, idx) =>
                        <Route key={idx}
                               exact={route.exact}
                               path={route.path}
                               element={<route.element/>}/>
                    )}
                </Routes>
            </Router>
        </div>
    );
}

export default App;

