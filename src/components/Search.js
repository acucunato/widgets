import React, { Fragment, useEffect, useState } from "react";
import axios from "axios";

const Search = () => {
  const [term, setTerm] = useState("programming");
  // const [debouncedTerm, setDebouncedTerm] = useState(term);
  const [results, setResults] = useState([]);

  useEffect(() => {
    const search = async () => {
      const { data } = await axios.get("https://en.wikipedia.org/w/api.php", {
        params: {
          action: "query",
          list: "search",
          origin: "*",
          format: "json",
          srsearch: term,
        },
      });
      setResults(data.query.search);
    };

    if (term && !results.length) {
      search();
    } else {
      const timeoutId = setTimeout(() => {
        if (term) {
          search();
        }

        return () => {
          clearTimeout(timeoutId);
        };
      }, 1000);
    }
    // eslint-disable-next-line
  }, [term]);

  // useEffect(() => {
  //   const search = async () => {
  //     const { data } = await axios.get("https://en.wikipedia.org/w/api.php", {
  //       params: {
  //         action: "query",
  //         list: "search",
  //         origin: "*",
  //         format: "json",
  //         srsearch: debouncedTerm,
  //       },
  //     });

  //     setResults(data.query.search);
  //   };
  //   if (debouncedTerm) {
  //     search();
  //   }
  // }, [debouncedTerm]);

  const renderedResults = results.map((result) => {
    return (
      <Fragment key={result.pageid}>
        <div className="item">
          <div className="right floated content">
            <a
              href={`https://en.wikipedia.org?curid=${result.pageid}`}
              className="ui button"
            >
              go
            </a>
          </div>
          <div className="content">
            <div className="header">{result.title}</div>
            <span dangerouslySetInnerHTML={{ __html: result.snippet }}></span>
          </div>
        </div>
      </Fragment>
    );
  });

  return (
    <div>
      <div className="ui form">
        <div className="field">
          <label>enter search term</label>
          <input
            value={term}
            onChange={(e) => setTerm(e.target.value)}
            className="input"
          />
        </div>
      </div>
      <div className="ui celled list">{renderedResults}</div>
    </div>
  );
};

export default Search;
