import React, { useRef, useState } from "react";

interface Props {
  className?: string;
}

export function StudyDetails(props: Props): JSX.Element {

  const [studyDetails, setStudyDetails] = useState<string[]>([]);
  const inputStudyDetail = useRef<HTMLInputElement | null>(null);
  const [checkedItems, setCheckedItems] = useState<boolean[]>([]);

  const handleAddDetail = (): void => {
    if (inputStudyDetail.current) {
      const detail = inputStudyDetail.current.value;
      setStudyDetails(prevDetails => [...prevDetails, detail]);
      setCheckedItems(prevChecked => [...prevChecked, false]); // Add unchecked state for new item
      inputStudyDetail.current.value = ""; // Clear the input after adding
    }
  };

  const toggleChecked = (index: number) => {
    setCheckedItems(prevChecked => {
      const updatedChecked = [...prevChecked];
      updatedChecked[index] = !updatedChecked[index];
      return updatedChecked;
    });
  }

  return (
    <div className={props.className}>
      <div style={{display: "flex", justifyContent: ""}}>
        <button 
          className="button-add-details"
          onClick={handleAddDetail}
        >
          Add
        </button>
        <input 
          ref={inputStudyDetail}
          type="text" 
          className="input-add-task"
        />
      </div>

      <div style={{marginTop: "15px"}}>
        <span>Study details: </span>
        {studyDetails.map((detail, index) => (
          <div key={index}>
            <div style={{display: "flex", alignItems: "center"}}>
              <span style={{textDecoration: checkedItems[index] ? "line-through" : "none",}}>
                {detail}
              </span>
              <input 
                className="checkbox-custom"
                type="checkbox"
                checked={checkedItems[index]}
                onChange={() => {toggleChecked(index)}}
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}