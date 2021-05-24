const users = [];
const B = [
  [-1, -1, -1],
  [-1, -1, -1],
  [-1, -1, -1],
];

exports.addUser = ({ id, Name, room }) => {
  console.log(Name, room);
  if (!Name || !room) {
    console.log("Username and room are required");
    return { error: "Username and room are required" };
  }

  const foundUser = users.find(
    (user) => user.room === room && user.name === Name
  );
  if (foundUser) {
    console.log("Username is taken");
    return { error: "Username is taken" };
  }

  const findUsers = users.filter((user) => user.room === room);
  if (findUsers.length > 1) {
    console.log("This room is full");
    return { error: "This room is full" };
  }

  const findUserWithRoom = users.find((user) => user.room === room);

  let symbol;
  console.log(findUserWithRoom);
  if (findUserWithRoom) {
    symbol = 0;
  } else {
    symbol = 1;
  }
  console.log(symbol);

  const user = {
    id,
    name: Name,
    room,
    symbol,
    board: [
      [-1, -1, -1],
      [-1, -1, -1],
      [-1, -1, -1],
    ],
  };
  console.log(user);
  users.push(user);

  return { user };
};

exports.getUser = (id) => users.find((user) => user.id === id);

exports.getUsersInRoom = (room) => users.filter((user) => user.room == room);

exports.getOtherUser = (id, room) =>
  users.find((user) => user.room === room && user.id !== id);

exports.removeUser = (id) => {
  const index = users.findIndex((user) => {
    // console.log(user);
    return user.id === id;
  });

  if (index !== -1) {
    return users.splice(index, 1)[0];
  }
};

exports.userMove = (id, row, col) => {
  users.forEach((user) => {
    if (user.id === id) {
      console.log(user.symbol, "symbol");

      user.board[row][col] = user.symbol;
    }
  });

  const user = users.find((u) => u.id === id);
  //   console.log(user, "user");
  const BoardGame = user.board;

  const Board = user.board;
  if (
    Board[0][0] === Board[0][1] &&
    Board[0][1] === Board[0][2] &&
    Board[0][2] !== -1
  ) {
    return { winner: true, board: user.board };
  }
  if (
    Board[1][0] === Board[1][1] &&
    Board[1][1] === Board[1][2] &&
    Board[1][2] !== -1
  ) {
    return { winner: true, board: user.board };
  }
  if (
    Board[2][0] === Board[2][1] &&
    Board[2][1] === Board[2][2] &&
    Board[2][2] !== -1
  ) {
    return { winner: true, board: user.board };
  }
  if (
    Board[0][0] === Board[1][0] &&
    Board[1][0] === Board[2][0] &&
    Board[2][0] !== -1
  ) {
    return { winner: true, board: user.board };
  }
  if (
    Board[0][1] === Board[1][1] &&
    Board[1][1] === Board[2][1] &&
    Board[2][1] !== -1
  ) {
    return { winner: true, board: user.board };
  }
  if (
    Board[0][2] === Board[1][2] &&
    Board[1][2] === Board[2][2] &&
    Board[2][2] !== -1
  ) {
    return { winner: true, board: user.board };
  }
  if (
    Board[0][0] === Board[1][1] &&
    Board[1][1] === Board[2][2] &&
    Board[2][2] !== -1
  ) {
    return { winner: true, board: user.board };
  }
  if (
    Board[0][2] === Board[1][1] &&
    Board[1][1] === Board[2][0] &&
    Board[2][0] !== -1
  ) {
    return { winner: true, board: user.board };
  }

  let unfilled = 0;
  Board.forEach((boxes) => {
    boxes.forEach((box) => {
      if (box == -1) unfilled++;
    });
  });

  console.log(unfilled);

  if (unfilled == 0) {
    // user.board = B;
    // const otherUser = getOtherUser(id, user.room);
    // otherUser.board = B;
    return { draw: true, board: B };
  }
  // for(let i=0;i<3;i++){
  //     let c=0;
  //     for(let j=1; j<3; j++){
  //         if()
  //     }
  // }
  //   console.log(user.board, "3");

  return { winner: false, draw: false, board: user.board };
};

exports.otherUserMove = (id, row, col) => {
  users.forEach((user) => {
    console.log(user);
    if (user.id === id) {
      console.log(user.symbol);
      console.log(user.symbol == 1);
      if (user.symbol == 1) user.board[row][col] = 0;
      else user.board[row][col] = 1;
      //   user.board[row][col] = !user.symbol;

      //   let unfilled = 0;
      //   user.board.forEach((boxes) => {
      //     boxes.forEach((box) => {
      //       if (box == -1) unfilled++;
      //     });
      //   });

      //   if (unfilled == 0) {
      //     user.board = B;
      //     const otherUser = getOtherUser(id, user.room);
      //     otherUser.board = B;
      //   }
    }

    // console.log(user.board);
  });

  const user = users.find((u) => u.id === id);

  return { board: user.board };
};
