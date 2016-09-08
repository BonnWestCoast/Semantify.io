import React from 'react';
import {IndexRoute, Route} from 'react-router';
import { isLoaded as isAuthLoaded, load as loadAuth } from 'redux/modules/auth';
import {
    App,
    Home,
    About,
    Login,
    LoginSuccess,
    NotFound,
    SchemaUpload,
    XMLVisualizer,
    SchemasList,
    Schema,
    Ontology,
    UploadInstance,
    UploadSchema
  } from 'containers';

export default (store) => {
  const requireLogin = (nextState, replace, cb) => {
    function checkAuth() {
      const { auth: { user }} = store.getState();
      if (!user) {
        // oops, not logged in, so can't be here!
        replace('/');
      }
      cb();
    }

    if (!isAuthLoaded(store.getState())) {
      store.dispatch(loadAuth()).then(checkAuth);
    } else {
      checkAuth();
    }
  };

  /**
   * Please keep routes in alphabetical order
   */
  return (
    <Route path="/" component={App}>
      { /* Home (main) route */ }
      <IndexRoute component={Home}/>

      { /* Routes requiring login */ }
      <Route onEnter={requireLogin}>
        <Route path="loginSuccess" component={LoginSuccess}/>
        <Route path="uploadSchema" component={SchemaUpload}/>
        <Route path="schemasList" component={SchemasList}/>
        <Route path="schema/:id" component={Schema}/>
        <Route path="xmlVisualizer" component={XMLVisualizer}/>
        <Route path="ontology" component={Ontology}/>
        <Route path="upload">
          <IndexRoute component={NotFound}/>
          <Route path="schema" component={UploadSchema}/>
          <Route path="instance" component={UploadInstance}/>
        </Route>
      </Route>

      { /* Routes */ }
      <Route path="about" component={About}/>
      <Route path="login" component={Login}/>

      { /* Catch all route */ }
      <Route path="*" component={NotFound} status={404} />
    </Route>
  );
};
