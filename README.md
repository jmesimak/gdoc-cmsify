# gdoc-cmsify

Turn your Google Docs into a headless CMS

## So what does it do?

Initially the goal is to provide the following functionality

- Given a google doc id, it will return a JSON version of the text nodes in the document
- Given a google drive id, such JSONs will be returned for all the docs

## API (sketch)

**gdocJsonify(docId, config)**
Example

```javascript
import { gdocJsonify } from "gdoc-cmsify";
const docData = await gdocJsonify("<documentId", {});
// docData === {...}
```

**gdriveJsonify(directoryId, config)**

```javascript
import { gdriveJsonify } from "gdoc-cmsify";
const driveData = await gdriveJsonify("<documentId", {});
// driveData === [{...}, {...}]
```
