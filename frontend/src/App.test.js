import { shallow, configure } from "enzyme";
import Adapter from "@wojtekmaj/enzyme-adapter-react-17";
import { Route } from "react-router-dom";
import App from "./App";
import AllAlerts from "./components/AllAlerts";
import AlertNew from "./components/AlertNew";
import AlertEdit from "./components/AlertEdit";
import AlertDelete from "./components/AlertDelete";
import PageNotFound from "./components/PageNotFound";

configure({ adapter: new Adapter() });

let pathMap = {};

describe("Testing routes using different routes", () => {
  beforeAll(() => {
    const component = shallow(<App />);
    pathMap = component.find(Route).reduce((pathMap, route) => {
      const routeProps = route.props();
      pathMap[routeProps.path] = routeProps.component;
      return pathMap;
    }, {});
  });

  it("Should show AllAlerts for / route", () => {
    expect(pathMap["/"]).toBe(AllAlerts);
  });

  it("Should show AlertNew for /alert/new route", () => {
    expect(pathMap["/alert/new"]).toBe(AlertNew);
  });

  it("Should show AlertEdit for alert/edit/:id route", () => {
    expect(pathMap["/alert/edit/:id"]).toBe(AlertEdit);
  });

  it("Should show AlertDelete for /alert/delete/:id route", () => {
    expect(pathMap["/alert/delete/:id"]).toBe(AlertDelete);
  });

  it("Should show PageNotFound for not defined route", () => {
    expect(pathMap["undefined"]).toBe(PageNotFound);
  });
});
