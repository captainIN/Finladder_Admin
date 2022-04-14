import React, { Component, useEffect, useState } from "react";
import ReactDOM from "react-dom";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import { connect } from "react-redux";
import { courseById, updateTopics } from "./api";
import { useParams } from "react-router-dom";
import MainWrapper from "../../components/MainWrapper";
import { editCourse } from "../../store/actions";

// fake data generator


// a little function to help us with reordering the result


const grid = 12;

const getItemStyle = (isDragging, draggableStyle) => ({
  // some basic styles to make the items look a bit nicer
  userSelect: "none",
  padding: grid * 2,
  margin: `0 0 ${grid}px 0`,

  // change background colour if dragging
  background: isDragging ? "lightgreen" : "lightgrey",
textAlign:'center',
  // styles we need to apply on draggables
  border: "2px solid grey",
  ...draggableStyle
});

const getListStyle = isDraggingOver => ({
  
  
 margin: grid,
 // width: 500,
  fontSize:20,
  padding:8,
  borderRadius:10,
});

function RearrageCourses()  {
    const [items, setItems] = useState([]);
    let history=useParams().id
 useEffect(() => {
     getCourse(history)
    }, [])
    const getCourse = async (history) => {
    let res= await courseById(history)
    console.log(res)
    setItems(res.data.topics)
    }
  
 const onDragEnd=(result)=> {
    // dropped outside the list
    if (!result.destination) {
      return;
    }

    const dragResponse = reorder(
      items,
      result.source.index,
      result.destination.index
    );
console.log(result)
 setItems(dragResponse);
  }

  const reorder = (list, startIndex, endIndex) => {
    const result = Array.from(list);
    console.log(list, startIndex, endIndex)
    const [removed] = result.splice(startIndex, 1);
    result.splice(endIndex, 0, removed);
  
    return result;
  };
  const handleSubmit = async (e) => {
    e.preventDefault()  
    let data = {
         topics:items
    }
    console.log(data)
    await updateTopics(history, data)
    alert("Successfully Updated!")
   // fetchCourse()
}
    return (
        <MainWrapper current="9">
             <br/>
            <div className="course-wizard" style={{backgroundColor:'#fff', padding: '10px 20px'}}>
            <h2>Rearrange Course Wizard</h2>
            <hr/>
            <div className="row">
                <div className="col-md-10">
                    </div>
                    <div className="col-md-2">
                        <button className="btn btn-primary" onClick={handleSubmit}>Save</button>
                    </div>
            </div>
            <div className="container ml-4 text-center">

            
      <DragDropContext onDragEnd={onDragEnd}>
        <Droppable droppableId="droppable">
          {(provided, snapshot) => (
            <div
              {...provided.droppableProps}
              ref={provided.innerRef}
              style={getListStyle(snapshot.isDraggingOver)}
            >
              {items.map((item, index) => {
                  console.log(item)
               return (
                <Draggable key={item.topicName} draggableId={item.topicName} index={index}>
                  {(provided, snapshot) => (
                    <div
                      ref={provided.innerRef}
                      {...provided.draggableProps}
                      {...provided.dragHandleProps}
                      style={getItemStyle(
                        snapshot.isDragging,
                        provided.draggableProps.style
                      )}
                    >
                      {item.topicName}
                    </div>
                  )}
                </Draggable>
                )
                      })}
              {provided.placeholder}
            </div>
          )}
        </Droppable>
      </DragDropContext>
      </div>
            </div>
      </MainWrapper>
    );
  
}

// Put the thing into the DOM!
//ReactDOM.render(<App />, document.getElementById("root"));
const mapStateToProps = state => {
    console.log(state)
    return {
       // eqr: state.main.eqr
    }
}
export default connect(mapStateToProps, {editCourse })(RearrageCourses)
