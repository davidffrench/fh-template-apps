var Validator = require('jsonschema').Validator;
var v = new Validator();

var rawTemplates = require('fs').readFileSync('./global.json');

// reading raw text first, then parsing allows better error reporting
// for invalid JSON compared to 'require'ing the file
templates = JSON.parse(rawTemplates);

var projectTemplateSchema = {
  "id": "/ProjectTemplate",
  "type": "object",
  "properties": {
    "id": {
      "type": "string"
    },
    "priority": {
      "type": "number"
    },
    "name": {
      "type": "string"
    },
    "description": {
      "type": "string"
    },
    "type": {
      "type": "string"
    },
    "icon": {
      "type": "string"
    },
    "category": {
      "type": "string"
    },
    "appTemplates": {
      "type": "array",
      "items": {
        "$ref": "/AppTemplate"
      }
    }
  },
  "required": ["id", "priority", "name", "description", "type", "icon", "category", "appTemplates"]
};

var appTemplateSchema = {
  "id": "/AppTemplate",
  "type": "object",
  "properties": {
    "id": {
      "type": "string"
    },
    "name": {
      "type": "string"
    },
    "type": {
      "type": "string"
    },
    "repoUrl": {
      "type": "string"
    },
    "repoBranch": {
      "type": "string"
    },
    "icon": {
      "type": "string"
    },
    "category": {
      "type": "string"
    }
  },
  "required": ["id", "name", "type", "repoUrl", "repoBranch", "icon", "category"]
};

v.addSchema(appTemplateSchema, '/AppTemplate');
const validation = v.validate(templates.show.projectTemplates[1], projectTemplateSchema);
console.error(validation);
console.log(validation.errors);
