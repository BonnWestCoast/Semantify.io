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
  parse(vowl) {
    return {
      nodes: {},
      edges: {}
    };
  }

  /**
   * Get Nodes from vowl file
   * @return {[type]} [description]
   */
  getNodes(vowl) {
    return {};
  }

  /**
   * Get edges from vowl file
   * @return {[type]} [description]
   */
  getEdges(vowl) {
    return {};
  }
}
