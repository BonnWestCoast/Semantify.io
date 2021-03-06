import { combineReducers } from 'redux';
import multireducer from 'multireducer';
import { routerReducer } from 'react-router-redux';
import {reducer as reduxAsyncConnect} from 'redux-async-connect';

import auth from './auth';
import counter from './counter';
import {reducer as form} from 'redux-form';
import info from './info';
import instance from './instance'
import widgets from './widgets';
import schema from './schema';
import schemasList from './schemasList';
import ontologySparql from './ontologySparql';
import ontologyList from './ontologyList';
import ontology from './ontology';
import visualizer from './visualizer';

export default combineReducers({
  routing: routerReducer,
  reduxAsyncConnect,
  auth,
  form,
  multireducer: multireducer({
    counter1: counter,
    counter2: counter,
    counter3: counter
  }),
  info,
  instance,
  widgets,
  schema,
  schemasList,
  ontologySparql,
  ontologyList,
  ontology,
  visualizer,
});
