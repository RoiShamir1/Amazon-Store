import React from "react";
import { useState, useEffect } from "react";
import { Form, FormControl, InputGroup, Button } from "react-bootstrap";
import { useLocation, useNavigate } from "react-router-dom";
import { getFilterUrl } from "../Services/getFilterUrl";

const SearchBox = () => {
  const [query, setQuery] = useState("");
  const navigate = useNavigate();
  const { search } = useLocation();

  useEffect(() => {
    if (!query) return;
    const link = getFilterUrl(search, { query: query || "all" });
    navigate(link);
  }, [query]);

  const submitHandler = (e) => {
    e.preventDefault();
    const link = getFilterUrl(search, { query: query });
    navigate(link);
  };

  return (
    <div>
      <Form onSubmit={submitHandler} className="d-flex me-auto w-120">
        <InputGroup>
          <FormControl
            area-descrybeby="button-search"
            type="text"
            name="q"
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search for products"
          ></FormControl>
          <Button variant="outline-primary" type="submit" id="button-search">
            <i className="fas fa-search"></i>
          </Button>
        </InputGroup>
      </Form>
    </div>
  );
};

export default SearchBox;
