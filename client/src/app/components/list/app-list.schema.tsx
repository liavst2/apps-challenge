
import * as React from "react";

import { LinkRounded } from "@material-ui/icons";
import ReactHTMLParser from "react-html-parser";

export const collapseTableSchema = {
  id: {
    title: "ID"
  },
  name: {
    title: "Name"
  },
  category: {
    title: "Category"
  },
  external_id: {
    title: "External ID",
  },
  rating: {
    title: "Rating",
  },
  install_count: {
    title: "Number of installs",
  },
  description: {
    title: "Description",
    display: (desc: string) => ReactHTMLParser(desc)
  },
  url: {
    title: "URL",
    display: (url: string) => (
      <LinkRounded
        color="primary"
        style={{ cursor: "pointer" }}
        onClick={() => window.open(url)}
      />
    )
  },
  publisher: {
    title: "Publisher",
  },
  icon: {
    title: "Icon source",
    display: (iconURL: string) => (
      <LinkRounded
        color="primary"
        style={{ cursor: "pointer" }}
        onClick={() => window.open(iconURL)}
      />
    )
  },
  min_age: {
    title: "Minimum age",
  }
}