import { useState } from "react";
import data from "./data";
import "./style.css";

export default function Accordian() {
  const [selected, setSelected] = useState(null);
  const [enableMultiSelect, setEnableMultiSelect] = useState(false);
  const [multiple, setMultiple] = useState([]);

  function handleSingleSelection(currentId) {
    setSelected(currentId === selected ? null : currentId);
  }
  function handleMultiSelection(currentId) {
    let cpyMultiple = [...multiple];
    const findIndexOfCurrentId = cpyMultiple.indexOf(currentId);

    if(findIndexOfCurrentId === -1) cpyMultiple.push(currentId);
    else cpyMultiple.splice(findIndexOfCurrentId, 1);

    console.log(findIndexOfCurrentId);
    setMultiple(cpyMultiple);
  }

  console.log(selected, multiple);
  return (
    <div className="wrapper">
      <button onClick={ ()=>setEnableMultiSelect(!enableMultiSelect)}>
        Enable Multi Selection
      </button>
      <div className="accordian">
        {data && data.length > 0 ? (
          data.map((dataItem) => (
            <div className="item">
              <div
                onClick={
                  enableMultiSelect
                    ? () => handleMultiSelection(dataItem.id)
                    : () => handleSingleSelection(dataItem.id)
                }
                className="title"
              > 
                <h3>{dataItem.question}</h3>
                <span>+</span>
              </div>
              {
                enableMultiSelect
                ? multiple.indexOf(dataItem.id) !== -1 && (<div className = "content"> {dataItem.answer}</div>)
                : selected === dataItem.id && (<div className = "content"> {dataItem.answer}</div>)
              }
              {/* {selected === dataItem.id ? (
                <div className="content"> {dataItem.answer} </div>
              ) : null} */}
            </div>
          ))
        ) : (
          <div> No data found</div>
        )}
      </div>
    </div>
  );
}
