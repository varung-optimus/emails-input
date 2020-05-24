<p align="center"><img src="https://raw.githubusercontent.com/varung-optimus/emails-input/develop/demo.png" /></p>

<h1 align="center"> Email Input </h1>

<p align="center"> Emails input component to allow users to be able to create fancy chip style email input </p>

<hr/>

<p> Emails input component to allow users to be able to create fancy chip style email input </p>

<h3> Demo -> Show me what you got </h3>

<a href="https://varung-optimus.github.io/"> Demo Link </a>

<h3> Download & Installation </h3>

```shell
$ npm i emails-input
```

<h3> List of features </h3>

<ul>
  <li> Supported on: <img width="70px" src="https://miro.medium.com/max/3408/1*wOZwg0CzSPtzTEDBlZhaEQ.png" /></li>
  <li>Easily create a chip style email input in vanilla project</li>
  <li>Quick & Easy installation using npm</li>
  <li>Customizable events to create chip - blur, enter, comma, space</li>
  <li>Ability to replace/copy the existing long list to the input</li>
  <li>Subscribe/Listen to value changes of the input</li>
</ul>

<h3> Code Demo </h3>

Load the script
```javascript
<script type="text/javascript" src="node_modules/emails-input/dist/main.js"></script>
```

e.g. If you want to use emails-input with below element - `emails-input`

```html
<div id="emails-input"></div>
```

```javascript

var emailInput = new EmailInput(document.getElementById('emails-input'), { textElementClasses: 'form-control', domain: '@miro.com' });
emailInput.listenToChanges(() => {
    console.log('listened');
});
emailInput.addEmail();
emailInput.addEmail();
emailInput.addEmail();
emailInput.replaceEmails(['something@something.com', 'me@me.com', 'do@something.com']);

```

<h3>Contributing</h3>
Keep it simple. Keep it minimal. Don't put every single feature just because you can.

<h3>Authors or Acknowledgments</h3>
<ul>
  <li>Varun Goel</li>
</ul>
