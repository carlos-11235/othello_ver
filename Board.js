
import {Cell} from './Cell.js';
import {Movement} from './Movement.js'
//these values are used to dtermine the coordinates of the cells
const X_START = 23  
const Y_START = 23
const X_JUMP = 50
const Y_JUMP = 50 
const CELL_WIDTH = 3;
const CELL_HEIGHT= 3;


export class Board{

    constructor(){

        this.cell_list=[];
        

        let rows = 8;
        let columns = 8;
        this.cells_2d = new Array(rows);
        
        for (let i = 0; i < rows; i++) {
            this.cells_2d[i] = new Array(columns);
        }
        


        this.init_cells();
        this.num_whites =0;
        this.num_blacks=0;
        //console.log('Entre a consturctor board');

        this.get_cell(3,3).put_disk(false);
        this.get_cell(3,4).put_disk(true);
        this.get_cell(4,3).put_disk(true);
        this.get_cell(4,4).put_disk(false);

    }
    get_all_movements(turn, id){
        let changed_cells=[];
        let cell = this.cell_list[id];
        for (var i = 0; i <8; i++){
                changed_cells=changed_cells.concat(this.get_cell_movements(turn, id,i));
            }
            //changed_cells=changed_cells.concat(this.get_cell_movements(turn, id,1));

        let myMov = new Movement(id, changed_cells)
        return myMov;

    }
    get_cell_movements(turn, id, code){
        //console.log(`en get right movement, id: ${id}`)
        let return_list =[];
        let cell = this.cell_list[id];

        let neighbor_id = cell.get_neighbor(code);
        while (neighbor_id != -1){
            let neighbor = this.cell_list[neighbor_id];
            
            if (neighbor.color==turn){
                //console.log('sali bien de get right movements')
                return return_list;
            }
            return_list.push(neighbor_id)
            neighbor_id=neighbor.get_neighbor(code);

        }
  
        return [];
          
    }


    init_cells(){
        //console.log('Entre a init cells');
        let id = 0;
        for (let i = 0; i < 8; i++) {
        for (let j = 0; j <8; j++){
            
            let myCell = new Cell( id,X_START+i*X_JUMP, Y_START+j*Y_JUMP , i , j, this )
            this.cell_list.push(myCell)
            this.cells_2d[i][j]=id;
            id++;
           }
        }

        
    }
    get_cell(i,j){
        //console.log(`entro ${i}, ${j}`)
        //console.log(`regrese i ${this.cell_list[this.cells_2d[i][j]].i}, j ${this.cell_list[this.cells_2d[i][j]].j} `);
        return this.cell_list[this.cells_2d[i][j]];

    }
    get_movements(turn){
        let movements_list=[];
        let prospect_list=this.get_available(turn)

        //console.log("-----------------------------------------------")
        //console.log("estoy en get movments")
        //console.log(prospect_list);
        for (let j = 0; j <prospect_list.length; j++){
            let mov = this.get_all_movements(turn, prospect_list[j]);
            //console.log(`en get movements, turn ${turn}`)
            //console.log(`mov id ${mov.id} `)
            //console.log("mov list")
            //console.log(mov.list)
            if (mov.list.length != 0){

                movements_list.push(mov);
            }
            


        }

        return movements_list;
    }
    get_available(turn){
        let prospect_list = [];
        
        for (let i = 0; i < this.cell_list.length; i++){
            if (this.cell_list[i].available == true ){
                if (this.check_available(turn, i))
                prospect_list.push(i);
            }
        }

        
        //console.log("return list ");
        //console.log(prospect_list);



        return prospect_list;
    }
    execute_movement(movement, turn){

        this.cell_list[movement.id].put_disk(turn);
        for (var i = 0; i < movement.list.length; i++){
            console.log(this.cell_list[movement.list[i]].id)
            this.cell_list[movement.list[i]].color=turn;
        }
    }
    
    check_available(turn, id){
        //console.log(`voy a checar ${id}`)
        let cell = this.cell_list[id];
        if (cell.i > 0) {
            let neighbor = this.get_cell(cell.i - 1, cell.j);
            //console.log(`neighbour ${neighbor.id} occupied ${neighbor.occupied}`);
            if ((neighbor.occupied==true) &&(neighbor.color!=turn)){
              return true;
            }
            
          }
          
          if (cell.j > 0) {
            let neighbor =this.get_cell(cell.i, cell.j - 1);
            //console.log(`neighbour ${neighbor.id} occupied ${neighbor.occupied}`);
            if ((neighbor.occupied==true) &&(neighbor.color!=turn)){
                return true;
              }
            
          }
          
          if (cell.i < 7) {
            let neighbor =this.get_cell(cell.i + 1, cell.j);
            //+console.log(`neighbour ${neighbor.id} occupied ${neighbor.occupied}`);
            if ((neighbor.occupied==true) &&(neighbor.color!=turn)){
                return true;
              }
            
          }
          
          if (cell.j < 7) {
            let neighbor =this.get_cell(cell.i, cell.j + 1);
            //console.log(`neighbour ${neighbor.id} occupied ${neighbor.occupied}`);
            if ((neighbor.occupied==true) &&(neighbor.color!=turn)){
                return true;
              }
            
          }
    
          if ((cell.i > 0)&& (cell.j>0)) {
            let neighbor =this.get_cell(cell.i - 1, cell.j-1);
           // console.log(`neighbour ${neighbor.id} occupied ${neighbor.occupied}`);
            if ((neighbor.occupied==true) &&(neighbor.color!=turn)){
                return true;
              }
            
          }
          if ((cell.i > 0)&& (cell.j<7)) {
            let neighbor =this.get_cell(cell.i - 1, cell.j+1);
            //console.log(`neighbour ${neighbor.id} occupied ${neighbor.occupied}`);
            if ((neighbor.occupied==true) &&(neighbor.color!=turn)){
                return true;
              }
            
          }
          
          if ((cell.i < 7)&& (cell.j>0)) {
            let neighbor =this.get_cell(cell.i + 1, cell.j-1);
            //console.log(`neighbour ${neighbor.id} occupied ${neighbor.occupied}`);
            if ((neighbor.occupied==true) &&(neighbor.color!=turn)){
                return true;
              }
            
          }
          if ((cell.i < 7)&& (cell.j<7)) {
            let neighbor =this.get_cell(cell.i + 1, cell.j+1);
            //console.log(`neighbour ${neighbor.id} occupied ${neighbor.occupied}`);
            if ((neighbor.occupied==true) &&(neighbor.color!=turn)){
                return true;
              }
            
          }
          return false;
    }


    
}