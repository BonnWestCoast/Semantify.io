/**
 * Created by akorovin on 13.07.2016.
 */

export default function loadXML() {
  return new Promise((resolve) => {
    resolve({
      message: 'xml',
      time: Date.now()
    });
  });
}