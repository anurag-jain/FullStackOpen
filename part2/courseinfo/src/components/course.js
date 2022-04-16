const Header = ({courseName})=> {
    return (
      <h3>{courseName}</h3>
    )
  }
  
  const Part = ({part, count}) => {
    return (
      <p>{part} {count}</p>
    );
  }
  
  const Content = ({parts})=> {
    return (
      <div>
        {parts.map((part)=> <Part key={part.id} part={part.name} count={part.exercises}/>)}
      </div>
    )
  }
  
  const Total = ({parts})=> {
    let total = parts.reduce((prev, part) => { return prev + part.exercises}, 0);
    return (
      <b>Number of exercises {total}</b>
    )
  }
  
  const Course = ({course})=> {
    return (
      <>
        <Header courseName={course.name}/>
        <Content parts={course.parts}/>
        <Total parts={course.parts}/>
      </>
    );
  }

export default Course