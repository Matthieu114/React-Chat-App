## Changelog file

Tried using EJS to send HTML to the web page but i did not find it efficient.

Tried using a forEach Loop to send out all the channels with res.send() but it did not work
so changed to res.write

Managed to dynamically display all available channels with by using res.write and array.Foreach to display all channel names
but they were not displayed like a list

Used the array.map instead of array.foreach to dynamically display all the channels and also to
be able to format them as lists and links using html <li> and <a>
