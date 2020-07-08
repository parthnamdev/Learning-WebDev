import React, { useState } from "react";

function CreateArea(props) {

  const [inputNote, setNote] = useState({
    title:"",
    content:""
  });



  function handleChange(event){
    const {name, value} = event.target;

    return setNote(prevValue => {
      return {
        ...prevValue,
        [name]:value
      }
    });
  }

  function submitNote(event){
    props.onAdd(inputNote);
    setNote({
      title:"",
      content:""
    });
    event.preventDefault();
  }

  return (
    <div>
      <form>
        <input name="title" value={inputNote.title} placeholder="Title" onChange={handleChange} />
        <textarea name="content" value={inputNote.content} placeholder="Take a note..." rows="3" onChange={handleChange} />
        <button onClick={submitNote}>Add</button>
      </form>
    </div>
  );
}

export default CreateArea;
