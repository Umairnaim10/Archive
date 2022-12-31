import "./App.css";
import { useEffect, useRef } from "react";
import Player from "./logic/Player";
import Enemy from "./logic/Enemy.js";
import BulletController from "./logic/BulletController.js";

function App() {
  const canvas = useRef(null);

  useEffect(() => {
    const ctx = canvas.current?.getContext("2d");

    canvas.width = 550;
    canvas.height = 600;

    const bulletController = new BulletController(canvas);
    const player = new Player(
      canvas.width / 2.2,
      canvas.height / 1.3,
      bulletController
    );

    const enemies = [
      new Enemy(50, 20, "green", 5),
      new Enemy(150, 20, "red", 5),
      new Enemy(250, 20, "gold", 2),
      new Enemy(350, 20, "green", 2),
      new Enemy(450, 20, "gold", 10),
      new Enemy(50, 100, "green", 5),
      new Enemy(150, 100, "red", 5),
      new Enemy(250, 100, "gold", 2),
      new Enemy(350, 100, "green", 2),
      new Enemy(450, 100, "gold", 20),
    ];

    function gameLoop() {
      setCommonStyle();
      ctx.fillStyle = "black";
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      bulletController.draw(ctx);
      player.draw(ctx);
      enemies.forEach((enemy) => {
        if (bulletController.collideWith(enemy)) {
          if (enemy.health <= 0) {
            const index = enemies.indexOf(enemy);
            enemies.splice(index, 1);
          }
        } else {
          enemy.draw(ctx);
        }
      });
    }
    function setCommonStyle() {
      ctx.shadowColor = "#d53";
      ctx.shadowBlur = 20;
      ctx.lineJoin = "bevel";
      ctx.lineWidth = 5;
    }
    
    const intt = setInterval(gameLoop, 1000 / 60);
    

    return () => {
      clearInterval(intt)
    };
  }, []);

  return (
    <>
      <h1>Shooting Bullets</h1>
      {/* <span className="controls">
        <div>Move</div>
        <div>Arrow Keys</div>
        <div>Shoot</div>
        <div>Space bar</div>
      </span> */}
      <canvas ref={canvas} width={550} height={600}></canvas>
    </>
  );
}

export default App;
