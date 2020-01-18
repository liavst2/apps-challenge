
import * as React from "react";
import { Subscribe } from "@storex/react";
import clsx from "clsx";

import { filterStore } from "../../storage/filter.store";

import { LinkRounded, ExpandMore } from "@material-ui/icons";
import { Card, CardHeader, makeStyles, CardMedia, CardContent, CardActions, IconButton, Collapse, Tooltip } from "@material-ui/core";
import { collapseTableSchema } from "./app-list.schema";
import { CollapseTable } from "./collapse-table";

const useStyles = makeStyles(theme => ({
  card: {
    width: 345,
    height: 375,
    display: "flex",
    flexDirection: "column"
  },
  media: {
    height: 0,
    paddingTop: '56.25%', // 16:9
  },
  expand: {
    transform: 'rotate(0deg)',
    marginLeft: 'auto',
    transition: theme.transitions.create('transform', {
      duration: theme.transitions.duration.shortest,
    }),
  },
  expandOpen: {
    transform: 'rotate(180deg)',
  },
  actions: {
    display: "flex",
    justifyContent: "flex-end"
  },
  collapse: {
    width: 345,
    overflow: "hidden",
    background: "white",
    boxShadow: "0px 2px 1px -1px rgba(0,0,0,0.2), 0px 1px 1px 0px rgba(0,0,0,0.14), 0px 1px 3px 0px rgba(0,0,0,0.12)"
  },
  collapseContent: {
    display: "flex",
    height: 260
  }
}));

export function AppsList() {
  return (
    <Subscribe to={filterStore}>
      {() => {
        const { appList } = filterStore;
        if (!!appList.length) {
          return <>
            <div className="header">
              Your recommended Apps:
            </div>
            <div className="app-list">
              {appList.map(app => <AppCard key={app.id} app={app} />)}
            </div>
          </>
        }
        return null;
      }}
    </Subscribe>
  )
}

function AppCard({ app }) {
  const classes = useStyles({});
  const [expanded, setExpanded] = React.useState(false);
  const handleExpand = () => {
    setExpanded(!expanded);
  }
  const handleLinkClick = () => {
    window.open(app.url);
  }

  return (
    <div className="column">
      <Card className={classes.card}>
        <CardHeader
          title={app.name}
          subheader={app.publisher}
        />
        <span style={{ flex: 1 }} />
        <CardMedia
          className={classes.media}
          image={app.icon}
        />
        <CardActions className={classes.actions}>
          <Tooltip title="Link to app">
            <IconButton onClick={handleLinkClick}>
              <LinkRounded />
            </IconButton>
          </Tooltip>
          <Tooltip title={`show ${expanded ? "less" : "more"}`}>
            <IconButton
              className={clsx(classes.expand, {
                [classes.expandOpen]: expanded,
              })}
              onClick={handleExpand}
            >
              <ExpandMore />
            </IconButton>
          </Tooltip>
        </CardActions>
      </Card>
      <Collapse
        className={classes.collapse}
        in={expanded}
        timeout="auto"
        unmountOnExit
      >
        <CardContent className={classes.collapseContent}>
          <CollapseTable details={app} schema={collapseTableSchema} />
        </CardContent>
      </Collapse>
    </div>
  )
}
