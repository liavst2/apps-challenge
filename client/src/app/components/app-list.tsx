
import * as React from "react";
import { Subscribe } from "@storex/react";
import clsx from "clsx";
import ReactHtmlParser from 'react-html-parser';

import { filterStore } from "../storage/filter.store";

import { LinkRounded, ExpandMore } from "@material-ui/icons";
import { Card, CardHeader, makeStyles, CardMedia, CardContent, CardActions, IconButton, Collapse } from "@material-ui/core";

const useStyles = makeStyles(theme => ({
  card: {
    width: 345,
    margin: 20,
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
      <CardActions>
        <IconButton onClick={handleLinkClick}>
          <LinkRounded />
        </IconButton>
        <IconButton
          className={clsx(classes.expand, {
            [classes.expandOpen]: expanded,
          })}
          onClick={handleExpand}
        >
          <ExpandMore />
        </IconButton>
      </CardActions>
      <Collapse in={expanded} timeout="auto" unmountOnExit>
        <CardContent>

        </CardContent>
      </Collapse>
    </Card>
  )
}
