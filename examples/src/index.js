import React from 'react';
import { render} from 'react-dom';
import QuestionnaireGenerator from '../../src';
const App = () => (
    <QuestionnaireGenerator 
        onDone={(data)=>{console.log(data)}}
    />
);
render(<App />, document.getElementById("root"));