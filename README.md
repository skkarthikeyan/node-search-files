# Search a word in directory and return the files containing the search word.
Used Node.js for creating this application.

How to Test manually:
-----------------------
1. clone the project in local.
2. Do "npm start" in the respective directory.
3. Search a word using the api "/search?searchText". Replace "searchText" with the word you want to search.
4. It will run in port 3001, so use URL "http://localhost:3001/search?todo"
5. I have created some sample file structure, so the above URL will return all the files, because all the files have the string "todo" in it.
6. Change the search text and test for others scenarios.
7. If you want to change the directory("src") to child directory like ("src/dir1"). change the variable "dir_config" in app.js

Test:
------
1. Used Jest package for testing.
2. Do npm install.
2. Run command "npm test" to test for searchtext "todo" and another sample text with zero results.
3. Mocked the output response.

Coding:
--------
1. Created the project using Node.js, Not used any frameworks.
2. Used the node.js "fs module" for reading the file.
3. Created two functions, "getAllFiles" will return all the files under the given directory.
4. Function "searchWordFromFile" will return the files which are having the "string" sent to it through request.
5. These two functions are used to create a API "/search?searchtext" which will return the files names with path which are having the specific word.


Node.js:
--------
1. Just used simple node.js
2. Used modules like fs, http and url.
3. fs for file reading, checking the directory.
4. http for creating the server, server is listening to port 3001.
5. url for getting the url parameters.
6. Used ES6 and some of ES8 features like async/await. 