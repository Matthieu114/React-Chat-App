## Changelog file

Tried using `EJS` to send HTML to the web page but i did not find it efficient.

Tried using a `array.forEach()` Loop to send out all the channels with `res.send()` but it did not work as res.send() can only be sent once
so changed to `res.write()` which works with arrays

Managed to dynamically display all available channels with by using `res.write()` and `array.Foreach()` to display all channel names
but they were not displayed like a list

Used the `array.map()` instead of array.foreach to dynamically display all the channels and also to
be able to format them as lists and links using html `<li>` `ul` `<a>`
