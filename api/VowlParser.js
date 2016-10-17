// Semantic web library
const rdfstore = require('rdfstore');
const fs = require('fs');
const _ = require('lodash');
import Ontology from './Ontology';

/**
 * Class for parsing owl format json file
 * To vis.js library format for visualization
 */
export default class VowlParser {
  /**
   * Parse ontology to vis.js format
   * @param ontology
   * @param cb
     */
  parse(ontology, cb) {
    rdfstore.create((err, store) => {
      store.load('text/turtle', ontology, 'graph', (err, results) => {
        if (err) {
          console.log('Error loading file in rdfstore: ' + err);
        } else {
          store.graph('graph', (err, graph) => {
            if (err) {
              console.log('Error loading the graph', err);
            } else {

              const triples = graph.toArray();

              if (triples.length !== 0) {
                const ont = new Ontology(triples);
                const edges = this.getEdges(ont);
                const nodes = this.getNodes(ont);
                const root = this.getRoot(ont.filter, nodes);

                const finalObj = {
                  root: {
                    'nodes' : root,
                    'edges': []
                  },
                  // mapping from - to (subject - object) + edge info
                  edges: edges,
                  // mapping to - from (object - subject)
                  toFromLookup: ont.toFromLookup
                };

                cb(finalObj);
              }
            }
          });
        }
      });
      store.close();
    });
  }

  /**
   * Get nodes that are root
   * (They are elements which are not keys
   * in edge dictionary)
   * @param edges
   * @param nodes
   * @returns {*}
     */
  getRoot(edges, nodes) {
    return nodes.filter((triple) => {
      let subjectName = triple.id;
      return !(subjectName in edges);
    });
  }

  /**
   * Get Nodes from vowl file
   * @return {[type]} [description]
   */
  getNodes(ont) {
    const nodes = ont.nodes;

    let nodeDict = nodes.reduce(function(dict, item, i) {
      let subj = {
        id: item.subject.trim(),
        label: item.subject.trim()
      };
      let obj = {
        id: item.object.trim(),
        label: item.object.trim()
      };

      dict[subj.id] = subj;
      dict[obj.id] = obj;

      return dict;
    }, {});

    return _.values(nodeDict);
  }

  /**
   * Gets edges from ontologies object
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
    const triples = ont.edges;

    _.each(triples, (triple) => {
      let item = {
        // subject
        from: triple.subject.trim(),
        // object
        to: triple.object.trim(),
        // predicate
        predicate: triple.predicate.trim(),
        label: triple.label.trim(),
        arrows: 'from',
        filter: [],
        interf: triple.interf
      };

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

      ont.addFilter(item.from, item.to, item.label, item.arrows, item.filter);
    });

    return ont.filter;
  }
}
