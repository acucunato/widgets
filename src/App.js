import React, { useState } from "react";
import Dropdown from "./components/Dropdown";
import Translate from "./components/Translate";
import Accordion from "./components/Accordion";
import Search from "./components/Search";
import Route from "./components/Route";
import Header from "./components/Header";

const items = [
  {
    title: "what is react?",
    content: "react is a front end js framework",
  },
  {
    title: "why use react?",
    content: "react is a favorite js library among engineers",
  },
  {
    title: "how do you use react?",
    content: "you use react by creating components",
  },
];

const options = [
  {
    label: "the color red",
    value: "red",
  },
  {
    label: "the color green",
    value: "green",
  },
  {
    label: "a shade of blue",
    value: "blue",
  },
];

export default () => {
  const [selected, setSelected] = useState(options[0]);
  return (
    <div>
      <Header />
      <Route path="/">
        <Accordion items={items} />
      </Route>
      <Route path="/list">
        <Search />
      </Route>
      <Route path="/dropdown">
        <Dropdown
          label="select a color"
          options={options}
          selected={selected}
          onSelectedChange={setSelected}
        />
      </Route>
      <Route path="/translate">
        <Translate />
      </Route>
    </div>
  );
};
