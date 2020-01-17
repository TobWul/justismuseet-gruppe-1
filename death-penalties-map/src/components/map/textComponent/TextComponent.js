
import React from "react";

const TextComponent = () => {

    let midlertidelig = "LINK";

    hasHistory(his)=()=>{
        return his == "";
    }

    let text;
    let img; 

    getText(his)=()=>{
        text = midlertidelig.history.children.text == "" ? "Ukjent historie"  : midlertidelig.history.children.text ;
        img = midlertidelig.history.asset._ref == "" ? "" : midlertidelig.history.asset._ref ;
    
    }



    return(
        <div>
            <div id="header">
                <p id="placement">{midlertidelig.county}</p>
                <h1 id="name">{midlertidelig.prisoner.name}</h1>
                <p>Skarpetter: {midlertidelig.executioner.VETIKKEHVAHER}</p>
                <p>Forbrytelse: {midlertidelig.crime}</p>
            </div>
            <div id ="information">
                <div id="image">{img}</div>
                <div id = "text">{text}</div>
            </div>
        </div>
    );
};

export default TextComponent;