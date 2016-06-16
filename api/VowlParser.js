// Semantic web library
const rdfstore = require('rdfstore');
const fs = require('fs');
const _ = require('lodash');
import Ontology from './Ontology';

/**
 * Class for parsing vowl format json file
 * That can be got from Java OWL2VOWL library
 * To vis.js library format for visualization
 */
export default class VowlParser {
  /**
   * Parse vowl to vis.js format
   * @param  {Object} vowlJson [vowl json object]
   * @return {Object}          [vis.js format object]
   */
  parse(path, callback) {
    const ontology = fs.readFileSync(__dirname + path).toString();

    rdfstore.create((err, store) => {
      store.load('text/turtle', ontology, 'graph', (err, results) => {
        if (err) {
          console.log('Error loading file in rdfstore');
        } else {
          store.graph('graph', (err, graph) => {
            if (err) {
              console.log('Error loading the graph', err);
            } else {
              const triples = graph.toArray();
              console.log('Successfully fetched graph ', triples.length, 'triples');

              if (triples.length !== 0) {
                console.log('load ontology');
                const ont = new Ontology(triples);
                const finalObj = {
                  nodes: this.getNodes(ont),
                  edges: this.getEdges(ont)
                };
                // fs.writeFile(_dirname + './../fixtures/owl/res.json', finalObj, (err) => {
                //   console.log('finished writing');
                // });
                console.log(finalObj.edges);
                callback(finalObj);
              }
            }
          });
        }
      });
      store.close();
    });
  }

  /**
   * Get Nodes from vowl file
   * @return {[type]} [description]
   */
  getNodes(ont) {
    const nodes = ont.nodes;

    // get subjects from all nodes
    const triples = _.map(nodes, (item) => {
      return {
        id: item.subject.trim(),
        label: item.subject.trim()
      };
    });

    // get objects from all nodes
    const objects = _.map(nodes, (item) => {
      return {
        id: item.object.trim(),
        label: item.object.trim()
      };
    });

    // combine triples and objects together
    const triplesAndObjects = _.union(triples, objects);

    return _.filter(triplesAndObjects, (item, index) => {
      for (index += 1; index < triplesAndObjects.length; index += 1) {
        if (_.isEqual(item, triplesAndObjects[index])) {
          return false;
        }
      }
      return true;
    });
  }

  /**
   * construct the array of edges
   * @param  {[type]} ont [description]
   * @return {[type]}     [description]
   */
  getEdgeTriples(ont) {
    return ont.edges.map((item) => {
      return {
        // subject
        from: item.subject.trim(),
        // object
        to: item.object.trim(),
        // predicate
        predicate: item.predicate.trim(),
        label: item.label.trim(),
        arrows: 'from',
        filter: [],
        interf: item.interf
      };
    });
  }

  /**
   * Gets edges from ontology object
   * @return {[type]} [description]
   */
  getEdges(ont) {
    // metrics (counters for initializing indices for blank nodes)
    let cl = 0;
    let ind = 0;
    let lit = 0;
    let bn = 0;
    let dp = 0;
    let op = 0;
    const triples = this.getEdgeTriples(ont);

    _.each(triples, (item) => {
      if (item.predicate === 'type') {
        if (item.to === 'ObjectProperty') {
          item.filter.push('object-property');
          op++;
        } else if (item.to === 'DatatypeProperty') {
          item.filter.push('data-property');
          dp++;
        } else if (item.to === 'Class') {
          // if item is blank node
          if (item.from.substring(0, 1) !== '_') {
            item.filter.push('class');
            cl++;
          }
        } else if (item.to === 'NamedIndividual') {
          item.filter.push('individual');
          ind++;
        }
      }
      // LITERAL
      if (item.interf === 'Literal') {
        item.filter.push('literal');
        lit++;
      }
      // BLANK NODE
      if (item.interf === 'BlankNode') {
        item.filter.push('blanknode');
        bn++;
      }
      // if item comes from blank node
      if (item.from.substring(0, 1) === '_'
        || item.from !== '_') {
          // add info that it comes from resource
        item.filter.push('resource');
      }
    });

    _.each(triples, (item) => {
      ont.addFilter(item.from, item.to, item.label, item.arrows, item.filter);
    });

    return ont.filter;
  }
}
