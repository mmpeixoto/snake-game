const controller = {
  boardInit() {
    var center = document.createElement("center");
    var snakeBoard = document.createElement("table");
    for (var i = 0; i < 17; i++) {
      var tr = document.createElement("tr");
      for (var j = 0; j < 17; j++) {
        var td = document.createElement("td");

        if ((i + j) % 2 == 0) {
          td.setAttribute("class", "cell lightcell");
          tr.appendChild(td);
        } else {
          td.setAttribute("class", "cell darkcell");
          tr.appendChild(td);
        }
      }

      snakeBoard.appendChild(tr);
    }
    center.appendChild(snakeBoard);

    snakeBoard.setAttribute("cellspacing", "0");
    document.body.appendChild(center);
  },

  snakeInit() {
    var trs = document.getElementsByTagName("tr");
    snake.map((body) => {
      trs[body[0]]?.children[body[1]].classList.add("snake");
    });
  },

  moveSnake() {
    let aux0, aux1;
    aux0 = snake[snake.length - 1][0];
    aux1 = snake[snake.length - 1][1];
    if (snakeDirection === "up") {
      var trs = document.getElementsByTagName("tr");
      trs[snake[snake.length - 1][0]].children[
        snake[snake.length - 1][1]
      ].classList.remove("snake");

      let auxArray = JSON.parse(JSON.stringify(snake));

      snake = snake.map((body, index) => {
        if (index === 0) {
          body[0]--;
        } else {
          body[0] = auxArray[index - 1][0];
          body[1] = auxArray[index - 1][1];
        }
        return body;
      });
    } else if (snakeDirection === "down") {
      var trs = document.getElementsByTagName("tr");
      trs[snake[snake.length - 1][0]].children[
        snake[snake.length - 1][1]
      ].classList.remove("snake");
      let auxArray = JSON.parse(JSON.stringify(snake));
      snake = snake.map((body, index) => {
        if (index === 0) {
          body[0]++;
        } else {
          body[0] = auxArray[index - 1][0];
          body[1] = auxArray[index - 1][1];
        }
        return body;
      });
    } else if (snakeDirection === "left") {
      var trs = document.getElementsByTagName("tr");
      trs[snake[snake.length - 1][0]].children[
        snake[snake.length - 1][1]
      ].classList.remove("snake");
      let auxArray = JSON.parse(JSON.stringify(snake));
      snake = snake.map((body, index) => {
        if (index === 0) {
          body[1]--;
        } else {
          body[0] = auxArray[index - 1][0];
          body[1] = auxArray[index - 1][1];
        }
        return body;
      });
    } else if (snakeDirection === "right") {
      var trs = document.getElementsByTagName("tr");
      trs[snake[snake.length - 1][0]].children[
        snake[snake.length - 1][1]
      ].classList.remove("snake");
      let auxArray = JSON.parse(JSON.stringify(snake));
      snake = snake.map((body, index) => {
        if (index === 0) {
          body[1]++;
        } else {
          body[0] = auxArray[index - 1][0];
          body[1] = auxArray[index - 1][1];
        }
        return body;
      });
    }
    if (snake[0][0] === foodPosition[0] && snake[0][1] === foodPosition[1]) {
      snake.push([aux0, aux1]);
      var trs = document.getElementsByTagName("tr");
      trs[snake[snake.length - 1][0]].children[
        snake[snake.length - 1][1]
      ].classList.add("snake");
      snakeSize++;
      controller.eatFood();
    }

    snake.map((body, index) => {
      if (snake[0][0] === body[0] && snake[0][1] === body[1] && index != 0) {
        this.loseGame();
      }
    });
    if (
      snake[0][0] > 16 ||
      snake[0][1] > 16 ||
      snake[0][0] < 0 ||
      snake[0][1] < 0
    ) {
      snake[0][0] = snake[1][0];
      snake[0][1] = snake[1][1];
      this.loseGame();
    }
  },

  generateFood() {
    var colocou = 0;
    var erro;
    var aux0;
    var aux1;

    while (!colocou) {
      erro = 0;
      aux0 = Math.floor(Math.random() * 17);
      aux1 = Math.floor(Math.random() * 17);

      snake.map((body) => {
        if (body[0] === aux0 && body[1] === aux1) {
          erro = 1;
        }
      });
      if (erro) {
        continue;
      }

      colocou = 1;
    }

    var trs = document.getElementsByTagName("tr");
    trs[aux0].children[aux1].classList.add("food");

    foodPosition[0] = aux0;
    foodPosition[1] = aux1;
  },

  eatFood() {
    points++;
    var trs = document.getElementsByTagName("tr");
    trs[foodPosition[0]].children[foodPosition[1]].classList.remove("food");
    this.generateFood();
  },

  gameInit() {
    controller.generateFood();
    control = setInterval(function () {
      controller.moveSnake();
      controller.snakeInit();
    }, 200);
  },

  restartGame() {
    var trs = document.getElementsByTagName("tr");
    trs[foodPosition[0]].children[foodPosition[1]].classList.remove("food");
    points = 0;
    snakeSize = 3;
    snakeDirection = "";
    snake.map((body) => {
      trs = document.getElementsByTagName("tr");
      trs[body[0]].children[body[1]].classList.remove("snake");
    });
    snake = [];
    snake.push([8, 4]);
    snake.push([8, 3]);
    snake.push([8, 2]);
    controller.snakeInit();
    controller.gameInit();
    document.querySelector("#game-over-modal").classList.toggle("active");
  },

  loseGame() {
    clearInterval(control);
    let btn = document.createElement("button");
    btn.innerHTML = "Repetir!";
    btn.onclick = function () {
      controller.restartGame();
    };
    document.querySelector("#game-over-modal").classList.toggle("active");
    document.querySelector(
      "#game-over"
    ).innerHTML = `Você fez ${points} pontos!`;
    document.querySelector("#game-over").appendChild(btn);
  },
};

function checkKey(e) {
  e = e || window.event;

  if (e.keyCode == "38" && snakeDirection !== "down") {
    snakeDirection = "up";
  } else if (e.keyCode == "40" && snakeDirection !== "up") {
    snakeDirection = "down";
  } else if (e.keyCode == "37" && snakeDirection !== "right") {
    snakeDirection = "left";
  } else if (e.keyCode == "39" && snakeDirection !== "left") {
    snakeDirection = "right";
  }
}

var snake = new Array();
snake.push([8, 4]);
snake.push([8, 3]);
snake.push([8, 2]);

var foodPosition = new Array();

controller.boardInit();
controller.snakeInit();
controller.gameInit();

document.onkeydown = checkKey;

var points = 0;
var snakeSize = 3;
var snakeDirection = "";
var control;
