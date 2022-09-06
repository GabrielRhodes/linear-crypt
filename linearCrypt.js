/*

Linear Crypt is a linear algebra based encryption software that focuses on encrypting messages and metadata in a simple and fairly secure way.

Included is a variety of helper functions, encryption options, and console printing helpers
Above each function will be a description which you can read to better understand the code and alter if needed.

*/

class LinearCrypter {
  // Construct using the size of string segements, the channel on which two people communicate, and the 'salt' used
  // Salt is the number of elementary matrices that will be added into the encryption matrix later on.
  constructor(size, channel, salt = 10) {
    this.size = size >= 1 ? (size <= 10 ? parseInt(size) : 5) : 5 // 1 <= size <= 10 to limit opperations for determinants
    this.channel = channel >= 1 ? channel : 10 // channel must be a positive integer
    this.salt = salt >= 1 ? (salt <= 100 ? parseInt(salt) : 10) : 10 // salt minimum is 1, defaults to 10
  }

  // returns the encrypted matrix by multiplying the matrified message with the encryption matrix
  encrypt(msg) {
    return this.matrixMultiply(this.encryptMatrix(), this.matrifyMessage(msg))
  }

  // returns the decrypted matrix by multiplying the encrypted message matrix with the decryption matrix
  decrypt(matrix) {
    return this.matrixToText(
      this.matrixMultiply(this.decryptMatrix(), matrix).round()
    )
  }

  // We multiply two matrices, and return an error if they are unable to be multiplied
  matrixMultiply(a, b) {
    // ensure that we are using two arrays
    a = a.matrix || a
    b = b.matrix || b
    // return if a.sub.m doesn't equal b.sub.n or the arrays are not in the form [[a11, a12, ...], [a21, ...] ... [am1, ...., amn]]
    if (a[0].length !== b.length || isNaN(a[0][0]) || isNaN(b[0][0])) {
      return 'Not a valid Multiplication'
    }
    // create the array of our solutions' values
    let arr = new Array(a.length)
      .fill()
      .map((val) => Array(b[0].length).fill(0))
    for (let i = 0; i < a.length; i++) {
      for (let j = 0; j < b[0].length; j++) {
        for (let k = 0; k < a[0].length; k++) {
          // Iterate through the rows of a, columns of b, and then columns of a, to multiply and add values
          arr[i][j] += a[i][k] * b[k][j]
        }
      }
    }
    // Return a new matrix created using the values we just got
    return new Matrix(a.length, b[0].length, arr.flat())
  }

  // We convert a message into a matrix by taking the ascii codes of each character
  matrifyMessage(msg) {
    // Create our matrix
    let matrix = new Matrix(
      this.size,
      Math.ceil(msg.length / this.size),
      Array(Math.ceil(msg.length / this.size) * this.size).fill(0)
    )
    // convert each char into a code
    let arr = msg.split('').map((char) => char.charCodeAt(0))
    for (let i = 0; i < arr.length; i++) {
      matrix.matrix[i % this.size][Math.floor(i / this.size)] = arr[i]
    }
    // return our matrix with the codes
    return matrix
  }

  // We calculate the encryption matrix given the salt and channel
  encryptMatrix() {
    // Gather elementary matrices
    let matrixes = this.elementaryMatrixes()
    // create our new encrypted matrix, begining as the identity matrix
    let elemMatrix = new Matrix(this.size, this.size)
    for (let i = 0; i < matrixes.length; i++) {
      // iterate through each elementary matrix, multiplying them with the elem matrix to get our encryption matrix
      elemMatrix = this.matrixMultiply(elemMatrix, matrixes[i])
    }
    // return our encryption matrix
    return elemMatrix
  }

  // Here, we provide an encrypted message matrix for the user
  sendEncrypted(msg) {
    // multiply the encryption matrix with the matrified matrix
    let m = this.matrixMultiply(this.encryptMatrix(), this.matrifyMessage(msg))
    console.log('Sending Message...')
    m.prettyPrint(10)
    console.log('Raw Data:', m.matrix)
    // return the encrypted matrix
    return m
  }

  // Provides the decryption matrix
  decryptMatrix() {
    // returns the inverse of the encryption matrix (E^-1)
    return this.encryptMatrix().inverse()
  }

  // A function which provides the original message from an encrypted message matrix
  readDecrypted(m) {
    console.log('Decrypting Message...')
    let matrix = this.matrixMultiply(this.decryptMatrix(), m).round()
    matrix.prettyPrint(10)
    let str = this.decrypt(m)
    console.log(`Reading Message: ${str}`)
    // Returns the Text after logging
    return str
  }

  // A function for generating an array of elementary matrices which make up the encryption matrix
  elementaryMatrixes() {
    let arr = []
    // iterate through the salt number
    for (let i = 1; i < this.salt; i++) {
      let elemMatrix = Array(this.size)
        .fill()
        .map((nil, j) =>
          Array(this.size)
            .fill()
            .map((val, k) => (k === j ? 1 : 0))
        )
      // We modulate i by 3 to determine the type of matrix we generate: i % 3 = 0 makes type I, i % 3 = 1 makes type II, and i % 3 = 2 makes type III
      switch (i % 3) {
        case 0:
          let a = (i % this.channel) % 4
          // we determine the value we multiply a single row by, and 'randomly' decide the row to multiply
          elemMatrix[i % this.size][i % this.size] =
            a === 0 ? 1 : i % 5 === 0 ? a : 1 / a
          arr.push(new Matrix(this.size, this.size, elemMatrix.flat()))
          break
        case 1:
          let row1 = elemMatrix[i % this.size]
          let row2 = elemMatrix[this.channel % this.size]
          // we 'randomly' decide the rows to swap and swap them
          elemMatrix[i % this.size] = row2
          elemMatrix[this.channel % this.size] = row1
          arr.push(new Matrix(this.size, this.size, elemMatrix.flat()))
          break
        case 2:
          // we 'randomly' determine a cell in the matrix to turn into -1. This can create a type I matrix occassionally
          elemMatrix[i % this.size][Math.round(this.channel / i) % this.size] =
            -1
          arr.push(new Matrix(this.size, this.size, elemMatrix.flat()))
          break
        default:
          break
      }
    }
    return arr
  }

  // Coverts a matrix into text by taking the ascii codes
  matrixToText(matrix) {
    let arr = []
    // collect all ascii codes
    for (let i = 0; i < matrix.matrix.flat().length; i++) {
      arr.push(matrix.matrix[i % matrix.length][Math.floor(i / matrix.length)])
    }
    // remove all 0 values, since they were added and are now unnecessary
    arr = arr.filter(function (val) {
      return val !== 0
    })
    let str = arr.map((val) => String.fromCharCode(val)).join('')
    // return the string from the codes
    return str
  }
}

class Matrix {
  // Construct a matrix from a length, width, and any values sent.
  constructor(length, width, values) {
    this.length = parseInt(length) || 2
    this.width = parseInt(width) || 2
    // If no values and square, create identity matrix, if values, add as possible, then add 0, otherwise create O matrix
    this.matrix = values
      ? this.matrify(values)
      : length === width
      ? this.identity(length)
      : new Array(length).fill().map(() => Array(width).fill(0))
  }

  // add array of values to matrix
  matrify(arr) {
    return new Array(this.length).fill().map((a, i) =>
      Array(this.width)
        .fill()
        .map((b, j) => arr[i * this.width + j] || 0)
    )
  }

  // create identity matrix
  identity(n) {
    return new Array(n).fill().map((a, i) =>
      Array(n)
        .fill()
        .map((b, j) => (i === j ? 1 : 0))
    )
  }

  // Round all values inside matrix, used for fixing calculation errors in final ascii codes.
  round() {
    for (let i = 0; i < this.length; i++) {
      for (let j = 0; j < this.width; j++) {
        this.matrix[i][j] = Math.round(this.matrix[i][j])
      }
    }
    return this
  }

  // Code taken from GeeksforGeeks Inverse of a Matrix Post and altered to be used inside a class
  getCofactor(A, temp, p, q, n) {
    let i = 0,
      j = 0

    // Looping for each element of the matrix
    for (let row = 0; row < n; row++) {
      for (let col = 0; col < n; col++) {
        // Copying into temporary matrix only those element
        // which are not in given row and column
        if (row !== p && col !== q) {
          temp[i][j++] = A[row][col]

          // Row is filled, so increase row index and
          // reset col index
          if (j === n - 1) {
            j = 0
            i++
          }
        }
      }
    }
  }

  /* Recursive function for finding determinant of matrix.
n is current dimension of A[][]. */
  determinant(A, n) {
    let D = 0 // Initialize result

    // Base case : if matrix contains single element
    if (n === 1) return A[0][0]

    let temp = new Array(n).fill().map(() => Array(n))

    let sign = 1 // To store sign multiplier

    // Iterate for each element of first row
    for (let f = 0; f < n; f++) {
      // Getting Cofactor of A[0][f]
      this.getCofactor(A, temp, 0, f, n)
      D += sign * A[0][f] * this.determinant(temp, n - 1)

      // terms are to be added with alternate sign
      sign = -sign
    }
    return D
  }

  // Function to get adjoint of A[N][N] in adj[N][N]
  adjoint(A, n) {
    if (n === 1) {
      return [[1]]
    }
    let adj = new Matrix(n, n)
    // temp is used to store cofactors of A[][]
    let sign = 1
    let temp = new Array(n).fill().map(() => Array(n))

    for (let i = 0; i < n; i++) {
      for (let j = 0; j < n; j++) {
        // Get cofactor of A[i][j]
        this.getCofactor(A, temp, i, j, n)

        // sign of adj[j][i] positive if sum of row
        // and column indexes is even.
        sign = (i + j) % 2 === 0 ? 1 : -1

        // Interchanging rows and columns to get the
        // transpose of the cofactor matrix
        adj.matrix[j * this.length + i] = sign * this.determinant(temp, n - 1)
      }
    }
    return adj
  }

  // Function to calculate and store inverse, returns false if
  // matrix is singular
  inverse() {
    let inverse = new Matrix(
      this.length,
      this.length,
      Array(this.length ** 2).fill(0)
    )
    // Find determinant of A[][]
    let det = this.determinant(this.matrix, this.length)
    if (det === 0) {
      return false
    }

    // Find adjoint
    let adj = this.adjoint(this.matrix, this.length)
    // Find Inverse using formula "inverse(A) = adj(A)/det(A)"
    for (let i = 0; i < this.length; i++)
      for (let j = 0; j < this.length; j++) {
        inverse.matrix[i][j] = adj.matrix[i * this.length + j] / det
      }
    return inverse
  }

  // Pretty Prints a matrix. customize as needed if you wish
  prettyPrint(num = 5) {
    let a = ''
    for (let i = 3; i < num - 1; i++) {
      a += ' '
    }
    let arr = this.matrix
    console.log('\nMatrix: \n')
    for (let i = 0; i < this.length; i++) {
      let str =
        `         ${i === 0 ? '⎧' : i === this.length - 1 ? '⎩' : '|'}` + a
      for (let j = 0; j < this.width; j++) {
        let val = arr[i][j]
        let a = String(val).length
        let space = ''
        for (let i = 0; i < num - a; i++) {
          space += ' '
        }
        str += `${val}` + space
      }
      str += i === 0 ? '⎫' : i === this.length - 1 ? '⎭' : '| '
      console.log(str + '\r')
    }
    console.log('\n')
  }
}

// Create an encryption network based off a private channel, matrix size, and 'salt' number

// Below is an example of the basic driver code which will iterate through an example encryption and decryption

// let crypto = new LinearCrypter(10, 100, 100)
// crypto.sendEncrypted('Hello World!')
// crypto.readDecrypted(crypto.sendEncrypted('Hello World!'))

export { LinearCrypter, Matrix }
