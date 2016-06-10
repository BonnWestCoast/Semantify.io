const _ = require('lodash');

export default class Ontology {
  constructor(data) {
    this.ontologyName = '';
    this.triples = [];
    this.nodes = [];
    this.edges = [];
    this.filter = [];
    this.metrics = [];
    this.id = 0;

    this.parseVowl(data);
  }

  /**
   * foreach item in vowl json do:
   * @param  {[type]} data [description]
   * @return {[type]}      [description]
   */
  parseVowl(data) {
    console.log('start parse');
    console.log(data.length);
    let isSubject = true;
    let subject = null;
    let predicate = null;
    let object = null;
    let interfaceName = null;
    let label = null;
    let filter = '';
    let ontologyName = '';
    let context = this.getDefaultContext();
    console.log('conl ' + context.length);
    let contextArr = _.map(context, (item) => {
      return {
        name: item.name,
        uri: item.uri
      }
    });

    // console.log(data);
    _.each(data, item => {
      subject = this.extractId(item.subject.nominalValue);
      predicate = this.extractId(item.predicate.nominalValue);
      object = this.extractId(item.object.nominalValue);
      interfaceName = item.object.interfaceName;
      label = this.extractLabel(item.predicate.nominalValue,
        predicate,
        ontologyName,
        contextArr);
      console.log('5');
      if (subject !== '' && isSubject) {
        ontologyName = this.extractOntologyName(item.subject.nominalValue);
        console.log('Extracting the ontology name', this.ontologyName);
        // options.ontologyNamespace = this.extractOntologyNamespace(item.subject.nominalValue);
        isSubject = false;
      }
      this.addEdge(subject, predicate, object, label, filter, interfaceName);
      this.addTriple(subject, predicate, object);
      this.addNode(subject, predicate, object);
    });
  }

  extractId(uri) {
    console.log('start extraction');
    const item = uri.split('#')[1];
    console.log(item);
    let ontologyName = '';
    if (!item) {
      const endIndex = uri.lastIndexOf('/');

      if (endIndex !== -1) {
        ontologyName = uri.substring(endIndex + 1, uri.length);
      } else {
        ontologyName = uri;
      }
    }
    return item || ontologyName;
  }

  extractOntologyName(uri) {
    let ontologyName = '';
    const startIndex = uri.lastIndexOf('/');
    const endIndex = uri.lastIndexOf('#');

    if (endIndex !== -1 && startIndex !== -1) {
      ontologyName = uri.substring(startIndex + 1, endIndex);
    } else {
      if (endIndex === -1) {
        ontologyName = uri.substring(startIndex + 1, uri.length);
      }
    }

    return ontologyName;
  }

  /**
   * finds by URI value
   * and looks in context array to get the shortname
   * for URI
   * @param  {[type]} uri [description]
   * @return {[type]}     [description]
   */
  findPrefix(uri, context) {
    console.log('findPref for '+ uri);
    const prefix = _.find(
      context, ['uri', uri]);
    console.log('show context');
    if (_.isEmpty(prefix)) {
      return '';
    } else {
      return prefix.name;
    }
  }

  extractLabel(uri, pred, ontName, context) {
    console.log('extract label');
    const itemContext = uri.split('#')[0];
    const item = uri.split('#')[1];
    let label = '';

    if (this.findPrefix(itemContext, context) !== '') {
      if (item !== undefined) {
        label = this.findPrefix(itemContext, context) + ':' + pred;
      }
    } else {
      if (item !== undefined) {
        label = ontName + ':' + pred;
      } else {
        label = pred;
      }
    }

    return label;
  }

  extractOntologyNamespace(uri) {
    let ontologyNamespace = '';
    const endIndex = uri.lastIndexOf('/');
    const startIndex = 0;

    if (endIndex !== -1 ) {
      ontologyNamespace = uri.substring(startIndex, endIndex);
    }
    return ontologyNamespace;
  }

  addTriple(subj, pred, obj) {
    const item = {subject: subj, predicate: pred, object: obj};
    this.triples.push(item);
    return item;
  }

  addNode(subj, pred, obj) {
    const item = {subject: subj, predicate: pred, object: obj};
    this.nodes.push(item);
    return item;
  }

  addEdge(subj, pred, obj, label, filter, interf) {
    const item = {
      subject: subj,
      predicate: pred,
      object: obj,
      label: label,
      filter: filter,
      interf: interf
    };
    this.edges.push(item);
    return item;
  }

  addFilter(from, to, label, arrows, filter) {
    const item = {
      from: from,
      to: to,
      label: label,
      arrows: 'from',
      filter: filter
    };
    this.filter.push(item);
    return item;
  }

  addMetric(metricName, metricValue) {
    const item = {
      name: metricName,
      value: metricValue
    };
    this.metrics.push(item);
    return item;
  }

  resetMetric() {
    this.metrics = [];
  }

  getDefaultContext() {
    return [
      {name: 'rdf', uri: 'http://www.w3.org/1999/02/22-rdf-syntax-ns'},
      {name: 'rdfs', uri: 'http://www.w3.org/2000/01/rdf-schema'},
      {name: 'owl', uri: 'http://www.w3.org/2002/07/owl'},
      {name: 'xsd', uri: 'http://www.w3.org/2001/XMLSchema'},
      {name: 'dcterms', uri: 'http://purl.org/dc/terms/'},
      {name: 'foaf', uri: 'http://xmlns.com/foaf/0.1/'},
      {name: 'cal', uri: 'http://www.w3.org/2002/12/cal/ical'},
      {name: 'vcard', uri: 'http://www.w3.org/2006/vcard/ns '},
      {name: 'geo', uri: 'http://www.w3.org/2003/01/geo/wgs84_pos'},
      {name: 'cc', uri: 'http://creativecommons.org/ns'},
      {name: 'sioc', uri: 'http://rdfs.org/sioc/ns'},
      {name: 'doap', uri: 'http://usefulinc.com/ns/doap'},
      {name: 'com', uri: 'http://purl.org/commerce'},
      {name: 'ps', uri: 'http://purl.org/payswarm'},
      {name: 'gr', uri: 'http://purl.org/goodrelations/v1'},
      {name: 'sig', uri: 'http://purl.org/signature'},
      {name: 'ccard', uri: 'http://purl.org/commerce/creditcard'}
    ];
  }

}

