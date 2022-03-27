import React from "react";
import { Link } from "react-router-dom";
import { usePageviewGenerator } from "./logic";
import "./logic.css";

export const PageviewGenerator: React.FC = () => {
  const { generate, pageview } = usePageviewGenerator();

  return (
    <>
      <Link className="table-button" to="/table">
        View Table
      </Link>
      <button style={{ fontSize: 24, marginBottom: 40 }} onClick={generate}>
        Generate pageview
      </button>

      {pageview && (
        <>
          <h3>Last pageview</h3>
          <p>Event ID: {pageview?.id}</p>
          <p>Event date: {pageview?.created_at.toISOString()}</p>
          <p>Page title: {pageview?.page?.title}</p>
          <p>Page description: {pageview?.page?.description}</p>
          <p>Page tags: {pageview.page?.tags?.join(", ")}</p>
          <p>User ID: {pageview?.user?.id}</p>
          <p>User joined: {pageview?.user?.created_at.toISOString()}</p>
        </>
      )}
    </>
  );
};
