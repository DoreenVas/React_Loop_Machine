function Square(props) {
    let status;
      if (props.value == false) {
        status = 'OFF';
      } else {
        status = 'ON';
      }
   
    return (
        <button 
            className="square" 
            onClick={props.onClick}>
        {status}
        </button>
    );
  }

  export default Square;