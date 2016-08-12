/**
 * Created by akorovin on 13.08.2016.
 */

const fs = require('fs');

export default function runQuery() {
  return new Promise((resolve) => {
    const testData = true;

    resolve({
      message: testData,
      time: Date.now()
    });
  });
}
