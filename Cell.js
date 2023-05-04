export class Cell{
  constructor(id, x, y, i, j, board){
    this.id = id;
    this.x = x;
    this.y = y;
    this.occupied = false;
    this.color = false;
    this.i = i;
    this.j= j;
    this.available = false;
    this.board = board;
  }
  get_neighbor(code){
     //console.log(`get neighbor ${code}`)
      switch(code) {
        case 0:
          return this.get_right_neighbor();
          break;
        case 1:
          return this.get_left_neighbor();
          break;
        case 2:
          return this.get_up_neighbor();
          break;
        case 3:
          return this.get_down_neighbor();
          break;
        case 4:
          return this.get_right_up_neighbor();
          break;
        case 5:
          return this.get_right_down_neighbor();
          break;
        case 6:
          return this.get_left_up_neighbor();
          break;
        case 7:
          return this.get_left_down_neighbor();
          break;
        default:
          console.log("FATAL ERROR GET NEIGHBOR");
          return -1;
      }
  }
  get_right_neighbor(){
    //console.log(`------get right neighbour ${this.id}  `)
    if (this.i > 0) {
      let neighbor = this.board.get_cell(this.i - 1, this.j);
      if (neighbor.occupied==true){
        //console.log(`-------esta ocupado  ${neighbor.id} `);
        return neighbor.id;
      }
    }
    return -1;

  }

  get_left_neighbor(){
    //console.log(`------get left neighbour ${this.id}  `)
    if (this.i <7) {
      //console.log('cumpli condicoin')
      let neighbor = this.board.get_cell(this.i + 1, this.j);
      if (neighbor.occupied==true){
          //console.log(`-------esta ocupado  ${neighbor.id} `);
        return neighbor.id;
      }
      //console.log('esta libre')
    }
    return -1;

  }

  get_up_neighbor(){
    //console.log(`------get right neighbour ${this.id}  `)
    if (this.j > 0) {
      let neighbor = this.board.get_cell(this.i, this.j-1);
      if (neighbor.occupied==true){
        //console.log(`-------esta ocupado  ${neighbor.id} `);
        return neighbor.id;
      }
    }
    return -1;

  }

  get_down_neighbor(){
    //console.log(`------get right neighbour ${this.id}  `)
    if (this.j < 7) {
      let neighbor = this.board.get_cell(this.i, this.j+1);
      if (neighbor.occupied==true){
        //console.log(`-------esta ocupado  ${neighbor.id} `);
        return neighbor.id;
      }
    }
    return -1;

  }

  get_right_up_neighbor(){
    //console.log(`------get right neighbour ${this.id}  `)
    if ( (this.i > 0) &&(this.j > 0)) {
      let neighbor = this.board.get_cell(this.i-1, this.j-1);
      if (neighbor.occupied==true){
        //console.log(`-------esta ocupado  ${neighbor.id} `);
        return neighbor.id;
      }
    }
    return -1;

  }

  get_right_down_neighbor(){
    //console.log(`------get right neighbour ${this.id}  `)
    if ( (this.i > 0) &&(this.j < 7)) {
      let neighbor = this.board.get_cell(this.i-1, this.j+1);
      if (neighbor.occupied==true){
        //console.log(`-------esta ocupado  ${neighbor.id} `);
        return neighbor.id;
      }
    }
    return -1;

  }

  get_left_up_neighbor(){
    //console.log(`------get right neighbour ${this.id}  `)
    if ( (this.i < 7) &&(this.j > 0)) {
      let neighbor = this.board.get_cell(this.i+1, this.j-1);
      if (neighbor.occupied==true){
        //console.log(`-------esta ocupado  ${neighbor.id} `);
        return neighbor.id;
      }
    }
    return -1;

  }

  get_left_down_neighbor(){
    //console.log(`------get right neighbour ${this.id}  `)
    if ( (this.i < 7) &&(this.j < 7)) {
      let neighbor = this.board.get_cell(this.i+1, this.j+1);
      if (neighbor.occupied==true){
        //console.log(`-------esta ocupado  ${neighbor.id} `);
        return neighbor.id;
      }
    }
    return -1;

  }


  put_disk(color){
      this.color = color;
      this.occupied=true;
      this.available=false;
      color? this.board.num_whites++ : this.board.num_blacks++;
      //console.log('Entre a put disk');

      //console.log(`blancas: ${this.board.num_whites} negras: ${this.board.num_blacks}`);
      //console.log(`i: ${this.i} j: ${this.j}`)
      if (this.i > 0) {
        let neighbor = this.board.get_cell(this.i - 1, this.j);
        if (neighbor.occupied==false){
          neighbor.available=true;
        }
      }
      
      if (this.j > 0) {
        let neighbor =this.board.get_cell(this.i, this.j - 1);
        if (neighbor.occupied==false){
          neighbor.available=true;
        }
        
      }
      
      if (this.i < 7) {
        let neighbor =this.board.get_cell(this.i + 1, this.j);
        if (neighbor.occupied==false){
          neighbor.available=true;
        }
        
      }
      
      if (this.j < 7) {
        let neighbor =this.board.get_cell(this.i, this.j + 1);
        if (neighbor.occupied==false){
          neighbor.available=true;
        }
        
      }

      if ((this.i > 0)&& (this.j>0)) {
        let neighbor =this.board.get_cell(this.i - 1, this.j-1);
        if (neighbor.occupied==false){
          neighbor.available=true;
        }
        
      }
      if ((this.i > 0)&& (this.j<7)) {
        let neighbor =this.board.get_cell(this.i - 1, this.j+1);
        if (neighbor.occupied==false){
          neighbor.available=true;
        }
        
      }
      
      if ((this.i < 7)&& (this.j>0)) {
        let neighbor =this.board.get_cell(this.i + 1, this.j-1);
        if (neighbor.occupied==false){
          neighbor.available=true;
        }
        
      }
      if ((this.i < 7)&& (this.j<7)) {
        let neighbor =this.board.get_cell(this.i + 1, this.j+1);
        if (neighbor.occupied==false){
          neighbor.available=true;
        }
        
      }

      
  }
}