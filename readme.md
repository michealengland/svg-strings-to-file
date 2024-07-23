## About

I created this quick script to quickly convert a large number of inlined SVGs on a project I was working on. At the time, I encountered around 90+ inlined SVGs and it was very time consuming to manually convert these into files.

## Example Data

```text
'arrow-right' => '<svg aria-hidden="true" focusable="false" role="img" xmlns="http://www.w3.org/2000/svg" height="0.8em" viewBox="0 0 448 512"><path fill="currentColor" d="M190.5 66.9l22.2-22.2c9.4-9.4 24.6-9.4 33.9 0L441 239c9.4 9.4 9.4 24.6 0 33.9L246.6 467.3c-9.4 9.4-24.6 9.4-33.9 0l-22.2-22.2c-9.5-9.5-9.3-25 .4-34.3L311.4 296H24c-13.3 0-24-10.7-24-24v-32c0-13.3 10.7-24 24-24h287.4L190.9 101.2c-9.8-9.3-10-24.8-.4-34.3z" class=""></path></svg>',

'check-square' => '<svg aria-hidden="true" focusable="false" role="img" xmlns="http://www.w3.org/2000/svg" height="1em" viewBox="0 0 448 512"><path fill="currentColor" d="M400 480H48c-26.51 0-48-21.49-48-48V80c0-26.51 21.49-48 48-48h352c26.51 0 48 21.49 48 48v352c0 26.51-21.49 48-48 48zm-204.686-98.059l184-184c6.248-6.248 6.248-16.379 0-22.627l-22.627-22.627c-6.248-6.248-16.379-6.249-22.628 0L184 302.745l-70.059-70.059c-6.248-6.248-16.379-6.248-22.628 0l-22.627 22.627c-6.248 6.248-6.248 16.379 0 22.627l104 104c6.249 6.25 16.379 6.25 22.628.001z" class=""></path></svg>'
```

## Data Structure

```js
[
	{
		label: 'arrow-right'
		value: '<svg>.......</svg>'
	}
]
```

## File creation

With node installed do the following:

1. Add your data to `data.js` based on the example.
2. Run `node convertDataToFiles.js`.
3. Files will be generated in the `build` directory.

_NOTE: You may need to update `formatData()` as needed depending on your source data._