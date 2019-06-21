import React from 'react';
import './styles.css';

class QuestionnaireGenerator extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            questions:[],
            currentOption:'',
            currentQuestion:'',
            currentQuesObj:{
                question:'',
                options:[],
                answer:-1
            },
            submitAlertMsg:'',
            submitAlertMsgShown:false,
            openCancelModal:false,
            disableAddOption:true,
            openConfirmModal:false
        }

        this.onClickRemoveOption = this.onClickRemoveOption.bind(this);
        this.addOption = this.addOption.bind(this);
        this.onChangeOption = this.onChangeOption.bind(this);
        this.answerSelected = this.answerSelected.bind(this);
        this.questionChanged = this.questionChanged.bind(this);
        this.cancelClicked = this.cancelClicked.bind(this);
        this.closeCancelModal = this.closeCancelModal.bind(this);
        this.proceedToCancel = this.proceedToCancel.bind(this);
        this.validateAndProceed = this.validateAndProceed.bind(this);
        this.closeConfirmModal = this.closeConfirmModal.bind(this);
        this.proceedToSubmit = this.proceedToSubmit.bind(this);
        this.clearQuesionState = this.clearQuesionState.bind(this);
        this.addQuestion = this.addQuestion.bind(this);
        this.removeQuestion = this.removeQuestion.bind(this);
    }

    onClickRemoveOption(oid){
        let currentObj = this.state.currentQuesObj;
        currentObj.options.splice(oid, 1)
        this.setState({currentQuesObj: currentObj})
    }

    addOption(){
        if(this.state.currentOption!=''){
            let currentObj = this.state.currentQuesObj;
            currentObj.options.push(this.state.currentOption);
            this.setState({currentQuesObj: currentObj});
            this.setState({currentOption:''})
        }
    }

    onChangeOption(e){
        let value = e.target.value;
        if(value != ''){
            this.setState({currentOption: e.target.value})
            this.setState({disableAddOption:false})
        }
        else{
            this.setState({disableAddOption:true})
        }   
    }

    answerSelected(e){
        let currentQuesObj = this.state.currentQuesObj;
        currentQuesObj.answer = e.target.value;
        this.setState({currentQuesObj});
    }

    questionChanged(e){
        this.setState({currentQuestion: e.target.value})
    }   

    cancelClicked(){
        this.setState({openCancelModal:true})
    }

    closeCancelModal(){
        this.setState({openCancelModal:false})
    }

    proceedToCancel(){
        this.closeCancelModal()
        //this.props.modalOnClosed();
    }

    validateAndProceed(){
        this.setState({openConfirmModal: true})
        this.props.onDone(this.state.questions);
    }

    closeConfirmModal(){
        this.setState({openConfirmModal: false, submitAlertMsgShown: false, submitAlertMsg: ''})
    }

    proceedToSubmit(){
        if(this.state.questions.length > 0){
            this.closeConfirmModal()
            //this.props.modalOnClosed(this.state.questions);
        }
        else{
            if(this.state.submitAlertMsgShown){
                this.closeConfirmModal();
                //this.props.modalOnClosed();
            }

            this.setState({submitAlertMsg: 'No questions created!! Click OK to continue.'});
            this.setState({submitAlertMsgShown: true})
        }
    }

    clearQuesionState(){
        let currentQuesObj = {
            question:'',
            options:[],
            answer:-1
        }
        
        this.setState({currentQuestion:'', currentQuesObj})
    }

    addQuestion(){
        if(this.state.currentQuestion != '' && this.state.currentQuesObj.options.length != 0 && this.state.currentQuesObj.answer!=-1){
            let ques = this.state.questions;

            let currentQuesObj = this.state.currentQuesObj
            currentQuesObj.question = this.state.currentQuestion;

            ques.push(this.state.currentQuesObj)
            this.setState({questions: ques});
            this.clearQuesionState();
        }
    }

    removeQuestion(qid){
        let { questions } = this.state;
        questions.splice(qid, 1);
        this.setState({questions});
    }

    render() {
        return(
            <div className="QGenContainer">
                <div className="QGenContainer__center">
                    <div className="QGenQuestion-container">
                        <div className="QGenForm">
                            <div>
                                Question:<br />
                                <textarea className="QGenTextInput" cols="30" value={this.state.currentQuestion} onChange={this.questionChanged}></textarea><br />
                            </div>
                            {this.state.currentQuesObj.options.length?
                            <div className="QGenSpacing">
                                Options:
                                <ul>
                                    {this.state.currentQuesObj.options.map((op, id) => {
                                        return <li key={id}>{op} <span className="QGenCloseIcon" onClick={()=>this.onClickRemoveOption(id)}>&#x2716;</span></li>
                                    })}
                                </ul>
                            </div>:null}
                            <div className="QGenSpacing">
                                Add Options:<br />
                                <input type='text' className="QGenTextInput" onChange={this.onChangeOption} value={this.state.currentOption}/>
                                <button disabled={this.state.disableAddOption} className="QGenButton" onClick={this.addOption}>Add</button>
                            </div>
                            
                            {this.state.currentQuesObj.options.length?
                            
                            <div className="QGenSpacing">
                                Select answer:<br />
                                <select className="QGenSelect" onChange={this.answerSelected}>
                                    <option value="-1">---</option>
                                    {this.state.currentQuesObj.options.map((op, id) => <option key={id} value={id}>{op}</option>)}
                                </select>
                            </div>
                        :null}
                            <div className="QGenAction_button">
                                <button className="QGenButton" onClick={this.addQuestion}>Save question</button>
                            </div>
                        </div>
                        <div className="QGenResult">                        
                            <div>
                                Questions:
                                <ul>
                                    {this.state.questions.map((quesion, index) => {
                                        return <li key={index}>{quesion.question} <span className="QGenCloseIcon" onClick={()=>this.removeQuestion(index)}>&#x2716;</span></li>                        
                                    })}
                                </ul>
                            </div>
                        </div>
                    </div>
                    <div className="QGenAction_container">                        
                        <div className="QGenAction_button">
                            <button className="QGenButton" onClick={this.validateAndProceed}>OK</button>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default QuestionnaireGenerator;