const http = require("http");

const person = require("./person");

const parseURLParams = (value) => {
    const params = new URLSearchParams(value);

    return Array.from(params.entries()).reduce(
      (acc, [key, value]) => ({ ...acc, [key]: value }),
      {}
    );
  };
  
  const server = http.createServer(async (req, res) => {
    const [basePath, paramsString] = req.url.split("?");
  
    if (basePath === "/assignment/people" && req.method === "GET") {
      const params = parseURLParams(paramsString);
      
      
      const { data, code } = await person.getAll(params);
  
      res.writeHead(code, { "Content-Type": "application/json" });
      res.end(data);
    } else if (basePath.match(/\/assignment\/people\/\w+/) && req.method === "GET") {
      const id = basePath.split("/")[3];
      
  
      const { data, code } = await data.getById(id);
  
      res.writeHead(code, { "Content-Type": "application/json" });
      res.end(data);
    } 
      else {
      res.writeHead(404, { "Content-Type": "application/json" });
      res.end(JSON.stringify({ message: "Not Found" }));
    }
  });

  server.listen(8888, () => console.log(`Running`));

  module.exports = server;

