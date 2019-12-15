import React from "react"
import TransTable from "./TransTable.js"
class Problem extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            time:0,
            result:null,
            value:null,
            position:null
        }
        this.hightlight = this.hightlight.bind(this);
        this.answer = React.createRef();
        this.tick = this.tick.bind(this);
        this.submit = this.submit.bind(this);
    }
    componentDidMount(){
        this.MyInterval = setInterval(()=>this.tick(),1000);
       
    }
    tick(){
        this.setState((state)=>({
            time:state.time+1,
        }))
    }
    hightlight(e){
        const ele = e.target;
        ele.style.background = "#3C156F";
        ele.style.color = "#E2D521";
        this.setState({
            value: ele.innerHTML,
            position:ele.getAttribute("data-pos")
        })
    }
    unhightlight(e){
        const ele = e.target;
        ele.style.background = "#224";
        ele.style.color = "#F2EE0C";
    }
    submit(e){
        if(!this.state.result){
            var status = this.answer.current.value==this.props.result?"success":"failed"
            this.setState({result:status,});
            clearInterval(this.MyInterval);
        }
        
    }
    render() {
       
        var time = this.state.time;
        var hour = Math.floor(time/3600);
        var minute = Math.floor(time/60 - 60*hour);
        var second = Math.floor(time-60*minute-3600*hour);
        var toRightForm = (num) => (num).toLocaleString(undefined, { minimumIntegerDigits: 2, useGrouping: false });
        var transtable = (!this.state.result)?null:<TransTable col={this.props.col} row={this.props.row} PrimeMatrix={this.props.PrimeMatrix} arr={this.props.arr}/>
        var rows =   this.props.arr.map((sarr,i) => {
                    var entry = sarr.map((el,j)=>{
                        return (<td key = {j} data-pos = {i+", "+j}
                            onMouseOver={this.hightlight}
                            onMouseOut={this.unhightlight}> {el} </td>)
                    });
                    return (<tr key={i}>{entry}</tr>) 
                });
        return(
            <>
            <div className="result" >{this.state.result}</div>
            <table>
                <tbody>
                    {rows}
                </tbody>
            </table>
            <div className="data">
                <div className="value">{this.state.value}</div>
                <div className="position">{this.state.position}</div>
                <input type="number" name="result" id="answer" ref = {this.answer} placeholder="Enter your answer"/>
                <button className="submit" onClick={this.submit}>OK</button>
                <div className="clock">
                    {toRightForm(hour)}:
                    {toRightForm(minute)}:
                    {toRightForm(second)}
                </div>
            </div>
            {transtable}
            </>
        )
            }
        
    
}
export default Problem