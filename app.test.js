let app = require('./app.js');

describe('search a word in all files of directory', () => {
    it('should return file name with path', () => {
    const expected = ["src/dir1/dir11/file11.js","src/dir1/dir12/dir121/file121.js","src/dir2/module1/file1.js","src/dir1/dir12/file12.js","src/dir2/module1/file2.js","src/dir3/file3.js"];
      return app.getAllFiles("src", "todo")
      .then(data => {
        expect(data).toBeDefined()
        expect(data).toEqual(expect.arrayContaining(expected));
      })
    });
    it('should return empty', () => {
        const expected = [];
          return app.getAllFiles("src", "sampletext")
          .then(data => {
            expect(data).toBeDefined()
            expect(data).toEqual(expect.arrayContaining(expected));
          })
        })
  })