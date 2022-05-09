document.addEventListener('DOMContentLoaded', () => {
  const grid = document.querySelector('.grid');
  let width = 10;
  let bombAmount = 20;
  let squares = [];

  // create board
  function createBoard() {
    // get shuffled game array with random bombs
    const bombsArray = Array(bombAmount).fill('bomb');
    const emptyArray = Array(width * width - bombAmount).fill('valid');
    // concatenate bombs array with empty array
    const gameArray = emptyArray.concat(bombsArray);
    // shuffle items in array using math random
    const shuffArr = gameArray.sort(() => Math.random() - 0.5);

    // creates grid of squares while i is less than 100 (width times width)
    for (let i = 0; i < width * width; i++) {
      const square = document.createElement('div');
      square.setAttribute('id', i);
      square.classList.add(shuffArr[i]);
      grid.appendChild(square);
      squares.push(square);
    }

    // numbers to show # of bombs surrounding square that was clicked
    for (let i = 0; i < squares.length; i++) {
      // initiate total for counter
      let total = 0;
      const leftEdge = i % width === 0;
      const rightEdge = i % width === width - 1;

      if (squares[i].classList.contains('valid')) {
        // checking left for bomb
        if (i > 0 && !leftEdge && squares[i - 1].classList.contains('bomb'))
          total++;
        // checking right for bomb
        if (
          i > 9 &&
          !rightEdge &&
          squares[i + 1 - width].classList.contains('bomb')
        )
          total++;

        if (i > 10 && squares[i - width].classList.contains('bomb')) total++;
        if (
          i > 11 &&
          !leftEdge &&
          squares[i - 1 - width].classList.contains('bomb')
        )
          total++;
        if (i < 98 && !rightEdge && squares[i + 1].classList.contains('bomb'))
          total++;
        if (
          i < 90 &&
          !leftEdge &&
          squares[i - 1 + width].classList.contains('bomb')
        )
          total++;
        if (
          i < 88 &&
          !rightEdge &&
          squares[i + 1 + width].classList.contains('bomb')
        )
          total++;

        // add total of bombs surrounding square to a class attribute
        squares[i].setAttribute('data', total);
        console.log(squares[i]);
      }
    }
  }

  createBoard();
});
