export default function load(req) {
  console.log(req);
  return Promise.resolve(`uploaded`);
}
