import React from 'react';

const CoursePart = ({ part }) => {
    return (
        <p>{part.name} {part.exercises}</p>
    )
}

const Course = ({ courses }) => {

    let totalExercises1 = courses[0].parts.reduce((total, element) => {
      return total + element.exercises }, 0);
  
    let totalExercises2 = courses[1].parts.reduce((total, element) => {
      return total + element.exercises }, 0);
  
      return (
          <div>
              <h1>Web development curriculum</h1>
              <h2>{courses[0].name}</h2>
              <div>{courses[0].parts.map(part => <CoursePart key={part.id} part={part} />)}</div>
              <p><strong>total of {totalExercises1} exercises</strong></p>
  
              <h2>{courses[1].name}</h2>
              <div>{courses[1].parts.map(part => <CoursePart key={part.id} part={part} />)}</div>
              <p><strong>total of {totalExercises2} exercises</strong></p>
          </div>
      )
}

export default Course;