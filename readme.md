Example uses are in the examples folder. This is currently just a barebones script i came up with to help our email team use mjml templates within Salesforce Content Builder.\
\
**simple-html** example can be run by navigating to its folder via terminal and running:
```
npm run parse-html
```
**simple-mjml** example can be run by navigating to its folder via terminal and running:
```
npm install
npm run build
```
Each of the above examples will create an outer-template.html that has content blocks built in using the html comments provided. (example `<!-- block email-header-->` becomes `<custom type="content" name="email-header">`). Additionally, the html that exists between two matching content block comments is split into a seperate file to be inserted into the content block or modified further for changing copy/header/etc.\
\
for example, this block of source html:
```
    <!-- block email-header-->
    <h1>Awesome Email Header</h1>
    <!-- block email-header-->
```
is rendered like this in the outer-template.html
```
<custom type="content" name="email-header">
```
and, triggers the creation of a new file with this content:
```
<!-- block email-header-->
        <h1>Awesome Email Header</h1>
        <!-- block email-header-->
```