import path from "path";
import fs from "fs/promises";
const dbPath = path.join(import.meta.dirname, "data.json");
const errorPath = path.join(import.meta.dirname , "errors.json") //new
export function createDb() {
  return {
    //Utl for Users
    async getById(resource, id) {
      const data = await fs.readFile(dbPath, { encoding: "utf-8" });
      const json = JSON.parse(data);
      return json[resource].find((u) => String(u.id) === String(id));
    },
    async getAll(resource) {
      const data = await fs.readFile(dbPath, { encoding: "utf-8" });
      const json = JSON.parse(data);
      return json[resource];
    },
    async create(resource, obj) {
      const data = await fs.readFile(dbPath, { encoding: "utf-8" });
      const json = JSON.parse(data);
      const newObj = { ...obj, id: getId() };
      const newResource = [...json[resource], newObj];
      const newData = {
        ...json,
        [resource]: newResource,
      };
      await fs.writeFile(dbPath, JSON.stringify(newData));
      return newObj;
    },
    async update(resource, id, updates) {
      const data = await fs.readFile(dbPath, { encoding: "utf-8" });
      const json = JSON.parse(data);
      const newResource = json[resource].map((x) => {
        if (x.id !== id) {
          return x;
        } else {
          return {
            ...x,
            ...updates,
            id: x.id,
          };
        }
      });
      const newData = {
        ...json,
        [resource]: newResource,
      };
      await fs.writeFile(dbPath, JSON.stringify(newData));
    },

    async delete(resource, id) {
      const data = await fs.readFile(dbPath, { encoding: "utf-8" });
      const json = JSON.parse(data);
      const newResource = json[resource].filter((x) => x.id !== id);
      const newData = {
        ...json,
        [resource]: newResource,
      };
      await fs.writeFile(dbPath, JSON.stringify(newData));
    },
    async search(resource, name) {
      const data = await fs.readFile(dbPath, { encoding: "utf-8" });
      const json = JSON.parse(data);
      return json[resource].filter((auth) =>
        auth.name.toLowerCase().startsWith(name.toLowerCase()),
      );
    },
    async logError(errorData) { // new
      const data = await fs.readFile(errorPath, { encoding: "utf-8" });
      const json = JSON.parse(data);

      const newError = {
        ...errorData,
      };

      const existingErrors = json.errors || [];
      const newData = {
        ...json,
        errors: [...existingErrors, newError],
      };

      await fs.writeFile(errorPath, JSON.stringify(newData, null, 2));
      return newError;
    },
  };
}

function getId() {
  return String(Math.floor(Math.random() * 999) + 1);
}
