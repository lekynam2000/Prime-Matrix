import React from "react"

class TransTable extends React.Component {
    constructor(props) {
        super(props);

    }
    componentDidMount(){
        console.log("yay");
    }
    render() {
       
        var rows = this.props.arr.map((sarr, i) => {
                var entry = sarr.map((el, j) => {
                    var add = "";
                    if(j==this.props.col||i==this.props.row){
                        add = "same";
                    }
                    if(this.props.PrimeMatrix.includes(46*i+j)){
                        add = "prime";
                    }
                    return ( < td key = {j} className = {add}>{ el } </td>);
                    });
                    return ( <tr key = { i } > { entry } </tr>) 
                    });
                return ( 
            <table className = "trans">
                <tbody>
                    {rows}
                </tbody>
            </table>
                )

        }
}

export default TransTable