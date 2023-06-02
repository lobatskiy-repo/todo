import "antd/dist/reset.css";
import { ConfigProvider } from "antd";
import { App } from "./container/App/App";
import { Provider } from "react-redux";
import store from "./store/store";

import uk from "antd/locale/uk_UA";
import ukUA from "antd/lib/locale/uk_UA"; // Імпортуємо українську локалізацію

import { BrowserRouter, HashRouter } from "react-router-dom";
export const AppPage = () => {
  return (
    <div>
      <HashRouter> 
          <ConfigProvider locale={ukUA}>
            <Provider store={store}>
              <App />
            </Provider>
          </ConfigProvider> 
      </HashRouter>
    </div>
  );
};
