// import React from 'react'
// import { render } from 'react-dom'


// class Panel extends React.Component{
//     state = {
//         active: false,
//         component: null
//     };

//     close = () =>{
//         this.setState({active:false})
//     };

//     open = elements =>{
//         const {component} = elements
//         const _component = React.createElement(component)
//         this.setState({component:_component})
//         this.setState({active:true})
//     };

//     render(){
//         const current_state = {
//             true: 'panel-wrapper active',
//             false: "panel-wrapper"
//         }
//         return(
//             <div className={current_state[this.state.active]}>
//                 <div className="over-layer" onClick={this.close}></div>
//                 <div className="panel">
//                     <div className="head">
//                         <span className="close" onClick={this.close}></span>
//                         {this.state.component}
//                     </div>
//                 </div>
//             </div>
//         )
//     }
// }

// const _div = document.createElement('div');
// document.body.appendChild(_div);
// const _panel = render(<Panel/>,_div);
// export default _panel;