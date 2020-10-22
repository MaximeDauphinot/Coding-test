NOTE: This is markdown file, use a Markdown viewer or editor...

## Problem 1 - JSON handling - 1st Part

We are running a web application which stores it's configuration in a simple JSON file. Here is an example of such configuration:

```json
{
  "page1": {
    "initialSettings": {
      "coordinates": [10,12],
      "color": "white"
    },
    "available-filters": {
      "name-filter": {
        "column": "name",
        "sort": "desc"
      }
    }
  },
  "page2": {
    "initialSettings": {
      "coordinates": [14,20],
      "color": "red"
    },
    "available-filters": {
      ...
    }
  },
}
```

Your task: write a procedure/function/program that modifies arbitrary value in the configuration file on arbitrary position. The program has 2 inputs. One is the configuration file itself and second is a file which contains list of changes to be applied. The resulting json should be printed to the terminal or written to a file on disk. You can use any technology language but preferably Typescript or Python. You are allowed to use a library which parses the JSON file for you. You don't have to parse the files manually - use the best tool that you find.

#### Example:

- Configuration file:

```json
{
  "page1": {
    "initialSettings": {
      "coordinates": [10, 12],
      "color": "white"
    },
    "available-filters": {
      "name-filter": {
        "column": "name",
        "sort": "desc"
      }
    }
  }
}
```

- File containing input changes in the following form:

```
"page1.initiaSettings.color": "green"
"page1.available-filters.name-filter.sort": "asc"
```

- Resulting configuration file should be:

```json
{
  "page1": {
    "initialSettings": {
      "coordinates": [10, 12],
      "color": "green"
    },
    "available-filters": {
      "name-filter": {
        "column": "name",
        "sort": "asc"
      }
    }
  }
}
```

Note that the changes file should be able to handle any valid JSON structure as long as it fits in single line. For instance the following two changes should also be correctly applied:

```
"page1.initialSettings.coordinates": [24,30]
"page1.available-filters.name-filter: { "column": "lastName", "sort": "desc" }
```

## Problem 2 - JSON handling - 2nd Part

If your program works correctly, try to adapt it in a such way that it would allow modifications inside arrays as well. That is the system should be able to inject a JSON value inside and array on given position.

Bellow is the example of such change. The element at position **1** inside the **coordinates** object should be changed for the JSON value:

```
"page1.initialSettings.coordinates[1]": { "value": "Wow JSON injected!!" }
```

Which should result into the following JSON:
"page1.initialSettings.color": "green"
"page1.available-filters.name-filter.sort": "asc"

```json
{
  "page1": {
    "initialSettings": {
      "coordinates": [{ "value": "Wow JSON injected!!" }, 12],
      "color": "green"
    },
    "available-filters": {
      "name-filter": {
        "column": "name",
        "sort": "asc"
      }
    }
  }
}
```
