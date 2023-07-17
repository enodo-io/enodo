# Enodo ToolBox

A library of useful tools to work with Enodo


## Command-line interface

### Help

#### Show help

```bash
$ npx enodo --help
```


### Iam

#### Identify on Enodo

```bash
$ npx enodo iam identify
```

| Option    | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `username`| `string` | username used to create session   |
| `password`| `string` | password associated with username |


#### Get access_token and refresh if necessary

```bash
$ npx enodo iam getAccessToken
```

#### Read JSON Content of access_token stored in ~/.enodo

```bash
$ npx enodo iam readAccessToken
```


### FS

#### Upload a new file

```bash
$ npx enodo iam identify
```

| Option    | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `username`| `string` | username used to create session   |
| `password`| `string` | password associated with username |


## NPM Package

### Installation

Install Enodo Toolbox with npm

```bash
$ npm install --save enodo
```


### API Reference

#### uploadFile(token, file, [createdFrom=null])

Upload a new file to Enodo FS


##### Arguments

> ***token (String)***: Token used to authenticate query **(Required)**

> ***file (String)***: file path or buffer to upload **(Required)**

> ***createdFrom (String)***: Name of application used to upload file


##### Return
> ***JsonAPI Object (Object)*** : the resulting document object


##### Usage/Example

```javascript
import uploadFile from 'enodo/uploadFile';

const token = process.env.ACCESS_TOKEN;
const file = './demo-file.jpg';
const createdFrom = 'Demo;

uploadFile(token, file, createdFrom).then((result) => {
  console.log(result.data);
}).catch((error) => {
  console.error(error);
});
```


## To Do

### Iam

- [ ]  Endpoint to test a token: npx enodo iam test [token]


### Fs

- [ ]  Create a folder
- [ ]  Read a document through its id


### Butterfly

- [ ]  Create a new media
- [ ]  Create a new post
- [ ]  Patch post content (and fs document)
- [ ]  Search a post
- [ ]  Read a post throught its tuple (propertyId, postId)
- [ ]  Create a property (interactive)
  - [ ]  Enter name
  - [ ]  Select locale
  - [ ]  Select owner (me / organizations found in token, only if organizations.length)
  - [ ]  Create demo values? Y/n
  - [ ]  Create 'Tags' taxonomy? Y/n (if n to create demo values)


### Dev kit

- [ ] npx enodo create ./my-app
  - [ ] Retrieve properties informations through API
- [ ] npx enodo install
  - [ ] svelte-gtm
  - [ ] svelte-gam
