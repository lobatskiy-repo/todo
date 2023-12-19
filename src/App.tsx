import "antd/dist/reset.css";
import { ConfigProvider } from "antd";
import { App } from "./container/App/App";
import { Provider, useDispatch } from "react-redux";
import store from "./store/store";

import ukUA from "antd/lib/locale/uk_UA"; // Імпортуємо українську локалізацію
 
import { HashRouter,BrowserRouter } from "react-router-dom"; 
export const AppPage = () => {
  
 

  return (
    <div>
      <BrowserRouter>
        <ConfigProvider locale={ukUA}>
          <Provider store={store}>
            <App />
          </Provider>
        </ConfigProvider>
      </BrowserRouter>
    </div>
  );
};
