import { Cell } from './Cell.js';
import { Board} from './Board.js';


function check_winner(cell_list){
  let num_occupied = 0;
  let num_white=0;
  let num_blacks = 0;
  for (let i = 0; i < cell_list.length; i++){
    if (cell_list[i].occupied==true){
      num_occupied++;
      if(cell_list[i].color==true){
        num_white++;
      }
      else{
        num_blacks++;
      }
    }
  }
  console.log("&&&&&&&&&&&&&&&&&&&&&66")
  console.log("ocupadas")
  console.log(num_occupied)
  if(num_occupied==64){
    if(num_white>num_blacks){
      console.log("ganaron las blancas")
    }else if (num_white==num_blacks){
      console.log("empate")
    }else{
      console.log("ganaron las negras")
    }
    

  }

}
function extract_ids(movements){
  let  id_list = []
  for (let i = 0; i < movements.length; i++){
    id_list.push(movements[i].id);
  }
  return id_list;
}
function change_turn(turn){
  if (turn == true)
  {
    return false;

  }
  else {
    return true;
  }
}
//these values are used to dtermine the coordinates of the cells
const X_START = 23  
const Y_START = 23
const X_JUMP = 50
const Y_JUMP = 50 
const CELL_WIDTH = 5;
const CELL_HEIGHT= 5;
const CIRCLE_RADIUS = 10;

//console.log("hola");
 //initializes cells
 let my_board = new Board();

 //console.log("adios");
 

//player turn iniialization
let white_turn = true;

//canvas initialization
const canvas = document.getElementById('myCanvas');

//canvas context, I'm not sure what this is for
const ctx = canvas.getContext('2d');

//load the board image into the canvas
const board_image = new Image();

board_image.onload = function(){

  let movements = my_board.get_movements(white_turn);
  drawGame();
}

//ads mouse mover listener to the canvas
canvas.addEventListener('click', function(event){
  const x = event.offsetX;
  const y = event.offsetY;
 // console.log(`Mouse moved to coordinates x: ${x}, y: ${y}`);
  let movements = my_board.get_movements(white_turn);
  if (movements.length==0){
    white_turn = change_turn(white_turn); //xor operation
    drawGame();

  }else{
  for (let j = 0; j <my_board.cell_list.length; j++){

    let distance = Math.sqrt(Math.pow(my_board.cell_list[j].x -x, 2) + Math.pow(my_board.cell_list[j].y -y, 2));
    if (distance < 10){
  
      if (my_board.cell_list[j].available==true){
        /*console.log("movements----------");
        console.log(movements);
        console.log(movements[0].id)
        */
        for (let k = 0; k < movements.length; k++){
          //console.log(`mov id: ${movements[k].id}`)
          if (my_board.cell_list[j].id == movements[k].id){
            my_board.execute_movement(movements[k], white_turn)
            check_winner(my_board.cell_list);
            white_turn = change_turn(white_turn); //xor operation
            drawGame();
          }
        }
      }
    
    //console.log('booom dfdfd');
    }
  }
    
  }
});


board_image.src= "board.svg";
function drawGame(){
  let movements_list = my_board.get_movements(white_turn);
  // Clear the entire canvas
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  ctx.drawImage(board_image,0 ,0, 400,400);

  

  ctx.font = '10px Arial';

  white_turn? ctx.fillText(`Turno de blancas!`, 400, 50): ctx.fillText(`Turno de negras!`, 400, 50);
  ctx.fillText(`blancas: ${my_board.num_whites} negras: ${my_board.num_blacks}`, 50,410);
  
  

    let available_list = extract_ids(movements_list);
    for (let j = 0; j <my_board.cell_list.length; j++){
      
      ctx.fillStyle="grey";
      if (my_board.cell_list[j].available){
      ctx.fillText(` ${my_board.cell_list[j].id}`, my_board.cell_list[j].x,my_board.cell_list[j].y+11 );
      }
      ctx.fillText(`i ${my_board.cell_list[j].i} j ${my_board.cell_list[j].j}`, my_board.cell_list[j].x,my_board.cell_list[j].y);
      //ctx.fillText(`x ${my_board.cell_list[j].x} y ${my_board.cell_list[j].y}`, my_board.cell_list[j].x,my_board.cell_list[j].y);

      if (available_list.includes(my_board.cell_list[j].id)){
        if (white_turn){
          ctx.fillStyle = 'red';
        }else{
          ctx.fillStyle = 'black';
        }
        ctx.fillRect( my_board.cell_list[j].x, my_board.cell_list[j].y , CELL_WIDTH, CELL_HEIGHT);
      }
    

    if (my_board.cell_list[j].occupied){
      //console.log('occupied');
      ctx.beginPath();

      // Draw circle using arc method
      ctx.arc(my_board.cell_list[j].x, my_board.cell_list[j].y , CIRCLE_RADIUS, 0, 2 * Math.PI);

      // Fill circle
      if (my_board.cell_list[j].color==1){
        ctx.fillStyle = 'red';
      }else{
        ctx.fillStyle = 'black';
      }
     
      ctx.fill();
          }
   }
 }

  
  //??????
  // Add the canvas to the DOM, I don't know why we need to do this
  //document.body.appendChild(canvas);